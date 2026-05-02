/**
 * Streams from Anthropic Messages API in the browser.
 * Header `anthropic-dangerous-direct-browser-access` is for hackathon / demos only —
 * production apps should proxy through a backend.
 */

export type Message = { role: "user" | "assistant"; content: string };

const SYSTEM_PROMPT = `
You are Fincast AI — a friendly financial advisor who explains everything using weather metaphors. You speak in plain English. You never use financial jargon without immediately explaining it in weather terms.

Alex Kim's portfolio context:
- Total value: $124,830 | Today: +2.67% (+$3,240) | All-time: +18.4%
- Storm Risk: 5.8/10 (Moderate) | Turbulence (volatility): 14.2% annualized
- Sky Coverage: 40% US Stocks, 25% Bonds, 20% Intl Stocks, 10% Real Estate, 5% Cash
- Positions: VTI (34% — overheating), BND (20% — thin coverage), VXUS (20% — clear), AAPL (7% — clear), MSFT (5% — neutral), FXAIX (8% — clear), VNQ (7% — thin coverage), CASH (<1% — idle)
- Pressure front: Sell $7,488 VTI → Buy $6,241 BND + $1,247 VNQ
- Milestones: Home down payment 67% ($53,600/$80,000, ahead of schedule 2027), Kids college 24% ($36k/$150k, 2038), Retirement 7% ($124,830/$1.8M, 2052)

Weather glossary — always use these:
- Overweight → overheating / high pressure zone
- Underweight → thin coverage / low pressure
- On target → clear skies
- Rebalancing → pressure release / clearing the front
- Bonds → shelter assets / umbrella
- Recession → cold front
- Market crash → category 4 storm
- Bull market → high pressure system / clear skies rally
- Rate hikes → headwinds
- Volatility → turbulence
- Risk exposure → storm risk
- Goals on track → tailwinds
- Compound interest → snowball / accumulation front
- Expense ratio → drag coefficient

Keep responses to 3–5 sentences unless more detail is requested. Be warm and encouraging. Use weather metaphors naturally — never say "in weather terms" or explain the metaphor. Just use it.
`.trim();

const WHAT_IF_SYSTEM_PROMPT = `
You are Fincast's What-If engine. Users ask hypothetical "what if" questions about markets and this portfolio. You answer only in plain English with weather metaphors (cold fronts, squalls, shelter, tailwinds, etc.).

Portfolio (Alex Kim): total ~$124,830; storm risk ~5.8/10; turbulence ~14.2% annualized; mix roughly 40% US stocks, 25% bonds, 20% intl, 10% real estate, 5% cash; VTI overweight (overheating), bonds/real estate somewhat thin on shelter.

Rules:
- Give intuitive, educational answers — not personalized investment advice, not timing instructions, not guarantees.
- If they ask for numbers, give rough directional ranges or order-of-magnitude sketches and label them as illustrations ("for example, roughly…") not predictions.
- If the question is vague, ask one short clarifying question OR pick a reasonable assumption and state it in one line.
- Keep answers focused: about 4–8 sentences for a first reply unless they ask for depth.
- Always remind briefly that this is illustrative thinking, not a forecast.

The UI may tell you which preset scenario card is currently selected — use it as optional context, not a constraint if the user asks something different.
`.trim();

/** Trimmed key from env, or undefined if missing / whitespace-only. */
export function anthropicKey(): string | undefined {
  const k = import.meta.env.VITE_ANTHROPIC_API_KEY;
  const t = typeof k === "string" ? k.trim() : "";
  return t.length > 0 ? t : undefined;
}

export function hasAnthropicKey(): boolean {
  return anthropicKey() !== undefined;
}

function textFromStreamEvent(raw: unknown): string | null {
  if (!raw || typeof raw !== "object") return null;
  const evt = raw as Record<string, unknown>;
  if (evt.type !== "content_block_delta" || !evt.delta || typeof evt.delta !== "object") {
    return null;
  }
  const d = evt.delta as Record<string, unknown>;
  if (typeof d.text === "string" && d.text.length > 0) {
    return d.text;
  }
  if (d.type === "text_delta" && typeof d.text === "string") {
    return d.text;
  }
  return null;
}

export function buildWhatIfSystemPrompt(selectedScenarioLine: string): string {
  return `${WHAT_IF_SYSTEM_PROMPT}\n\nCurrent preset focus on screen: ${selectedScenarioLine}`;
}

export async function streamToFincast(
  messages: Message[],
  onToken: (token: string) => void,
  onDone: () => void,
  onError?: (e: Error) => void,
  signal?: AbortSignal,
  systemOverride?: string,
) {
  const system = systemOverride ?? SYSTEM_PROMPT;
  const key = anthropicKey();
  if (!key) {
    // Callers should branch to local replies (Scenarios, Forecaster). This is a fallback only.
    onToken(
      systemOverride
        ? "Deep stress tests depend on earnings, credit, and policy—not just the headline shock. Use the scenario line you picked as a coarse rehearsal of how your mix might feel; compare that to goals and cash needs, not to a single forecast."
        : "Your sky is mostly sunny with one overheating pocket in US stocks — trimming toward shelter clears the front without timing the market.",
    );
    onDone();
    return;
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        system,
        stream: true,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
      }),
      signal,
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || `HTTP ${res.status}`);
    }

    const reader = res.body?.getReader();
    if (!reader) throw new Error("No response stream");

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      if (signal?.aborted) {
        await reader.cancel().catch(() => {});
        onDone();
        return;
      }
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const trimmed = line.replace(/\r$/, "").trim();
        if (!trimmed.startsWith("data: ")) continue;
        const payload = trimmed.slice(6);
        if (payload === "[DONE]") continue;
        try {
          const evt = JSON.parse(payload) as unknown;
          const piece = textFromStreamEvent(evt);
          if (piece) onToken(piece);
        } catch {
          /* ignore malformed JSON line */
        }
      }
    }
    onDone();
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") {
      onDone();
      return;
    }
    const err = e instanceof Error ? e : new Error(String(e));
    onError?.(err);
  }
}

/** @deprecated use streamToFincast */
export async function streamForecast(
  messages: Message[],
  onToken: (t: string) => void,
  onDone: () => void,
  onError: (e: Error) => void,
  signal?: AbortSignal,
) {
  await streamToFincast(messages, onToken, onDone, onError, signal);
}

export type ChatMessage = Message;
