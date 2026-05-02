import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GlassCard } from "@/components/ui/GlassCard";
import { SCENARIO_REBALANCE, SCENARIOS } from "@/data/portfolio";
import { useCountTo } from "@/hooks/useCountTo";
import { buildWhatIfSystemPrompt, hasAnthropicKey, streamToFincast, type Message } from "@/lib/claude";
import { answerWhatIfLocal } from "@/lib/whatIfLocal";
import { fmtPct, fmtUsd } from "@/lib/format";

const QUICK_WHATIFS = [
  "What if the market drops 20%?",
  "What if inflation stays high?",
  "What if I need 20% of my money next year?",
];

export default function Scenarios() {
  const [selected, setSelected] = useState(0);
  const s = SCENARIOS[selected];
  const rebalance = SCENARIO_REBALANCE[s.id];
  const animatedImpact = useCountTo(s.impact, selected, 650);
  const animatedPct = useCountTo(s.pct, selected, 650);

  const [aiMessages, setAiMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "I'm the What-If engine — ask anything about markets and your mix. I answer in weather language, grounded in how strategists and long-run data usually frame these risks. Illustrative only, not personal advice.",
    },
  ]);
  const [aiInput, setAiInput] = useState("");
  const [aiStreaming, setAiStreaming] = useState(false);
  const [aiWaiting, setAiWaiting] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const aiBottomRef = useRef<HTMLDivElement>(null);

  function stopAi() {
    abortRef.current?.abort();
    abortRef.current = null;
  }

  async function sendWhatIf(text: string) {
    if (!text.trim() || aiStreaming) return;
    stopAi();

    const userMsg: Message = { role: "user", content: text.trim() };
    const thread = [...aiMessages, userMsg];
    setAiInput("");

    const selectedLine = `${s.weatherEvent} — ${s.financialName} (${s.pct > 0 ? "+" : ""}${s.pct}% sketch)`;

    if (!hasAnthropicKey()) {
      const reply = answerWhatIfLocal(userMsg.content, selectedLine);
      setAiMessages([...thread, { role: "assistant", content: reply }]);
      requestAnimationFrame(() => aiBottomRef.current?.scrollIntoView({ behavior: "smooth" }));
      return;
    }

    setAiStreaming(true);
    setAiWaiting(true);
    setAiMessages([...thread, { role: "assistant", content: "" }]);

    const system = buildWhatIfSystemPrompt(selectedLine);

    const ac = new AbortController();
    abortRef.current = ac;

    let out = "";
    try {
      await streamToFincast(
        thread,
        (tok) => {
          setAiWaiting(false);
          out += tok;
          setAiMessages((m) => {
            const copy = [...m];
            copy[copy.length - 1] = { role: "assistant", content: out };
            return copy;
          });
        },
        () => {
          aiBottomRef.current?.scrollIntoView({ behavior: "smooth" });
        },
        () => {
          setAiMessages((m) => {
            const copy = [...m];
            copy[copy.length - 1] = {
              role: "assistant",
              content:
                copy[copy.length - 1].content ||
                "We couldn’t finish that answer. Check your connection and try again.",
            };
            return copy;
          });
        },
        ac.signal,
        system,
      );
    } finally {
      abortRef.current = null;
      setAiStreaming(false);
      setAiWaiting(false);
      aiBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="p-4 sm:p-6">
      <p className="body-lead mb-6 max-w-2xl">
        Pick a stress test, see a rough dollar sketch, then get a <strong className="text-[var(--text)]">plain-English
        rebalancing idea</strong> you could actually execute — costs, taxes, and goals spelled out below.
      </p>

      <div className="grid gap-3 md:grid-cols-3">
        {SCENARIOS.map((sc, i) => (
          <button
            key={sc.id}
            type="button"
            onClick={() => setSelected(i)}
            className={`glass-card rise-in p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sun)] ${
              selected === i
                ? "border-[rgba(255,209,102,0.5)] bg-[rgba(255,209,102,0.12)]"
                : ""
            }`}
            style={{ animationDelay: `${i * 35}ms` }}
          >
            <p className="label-caps">{sc.weatherEvent}</p>
            <p className="mt-2 text-[12px] font-semibold text-[var(--text)]">{sc.financialName}</p>
            <p className="body-sub mt-2 text-[10px]">{sc.desc}</p>
            <p
              className={`font-data mt-3 text-[14px] font-semibold ${
                sc.pct >= 0 ? "text-[var(--green)]" : "text-[var(--red)]"
              }`}
            >
              {sc.impactKind === "withdrawal" ? (
                <>
                  ≈ {fmtUsd(Math.abs(sc.impact))}{" "}
                  <span className="body-sub font-normal text-[10px] text-[var(--sub)]">
                    (~{Math.abs(sc.pct)}% to raise)
                  </span>
                </>
              ) : (
                <>
                  {fmtUsd(sc.impact)} ({sc.pct > 0 ? "+" : ""}
                  {sc.pct}%)
                </>
              )}
            </p>
          </button>
        ))}
      </div>

      <div className="rise-in mt-6" style={{ animationDelay: "80ms" }}>
        <GlassCard className="border-l-[3px] border-l-[var(--sun)] p-5">
          <p className="label-caps">Selected scenario</p>
          <h4 className="font-playfair mt-2 text-[22px] font-semibold text-[var(--text)]">
            {s.weatherEvent}
          </h4>
          <p className="font-data mt-3 text-[20px] font-bold text-[var(--text)]">
            {s.impactKind === "withdrawal" ? "≈ " : ""}
            {fmtUsd(Math.round(Math.abs(animatedImpact)))}
            <span
              className={`ml-2 text-[15px] ${s.pct >= 0 ? "text-[var(--green)]" : "text-[var(--red)]"}`}
            >
              (
              {s.impactKind === "withdrawal" ? "~" : ""}
              {fmtPct(Math.abs(animatedPct), 1)} of portfolio
              {s.impactKind === "withdrawal" ? " to raise" : ""})
            </span>
          </p>
          <p className="body-sub mt-3">
            {s.impactKind === "withdrawal" ? (
              <>
                This is the <strong className="text-[var(--text)]">cash you&apos;d aim to free up</strong> — not a market
                loss. Plan sales ahead of the bill so you&apos;re not forced out at a bad time.
              </>
            ) : (
              <>
                A <strong className="text-[var(--text)]">{s.financialName.toLowerCase()}</strong> shifts pressure across
                stocks and shelter. The line animates toward a rough sketch — not a prediction.
              </>
            )}
          </p>
        </GlassCard>
      </div>

      <GlassCard className="rise-in mt-6 border-l-[3px] border-l-[rgba(74,222,128,0.6)] p-5" style={{ animationDelay: "100ms" }}>
        <p className="label-caps">Rebalancing plan for this scenario</p>
        <h4 className="mt-2 text-[16px] font-semibold text-[var(--text)]">{rebalance.headline}</h4>
        <p className="body-sub mt-2 text-[11px] leading-relaxed">{rebalance.logicInPlainEnglish}</p>
        <ul className="mt-4 space-y-2 border-t border-[var(--glass-border)] pt-4">
          {rebalance.moves.map((m) => (
            <li key={m.title} className="text-[11px] text-[var(--text)]">
              <span className="font-semibold text-[var(--sun)]">{m.title}</span>
              <span className="body-sub block text-[10px]">{m.detail}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 grid gap-3 border-t border-[var(--glass-border)] pt-4 sm:grid-cols-2">
          <div>
            <p className="label-caps text-[8px]">Costs (straightforward)</p>
            {rebalance.estimatedCosts.map((c) => (
              <p key={c.label} className="body-sub mt-1 text-[10px]">
                <span className="text-[var(--sub)]">{c.label}: </span>
                <span className="font-data text-[var(--text)]">{c.amount}</span>
              </p>
            ))}
          </div>
          <div>
            <p className="label-caps text-[8px]">Tax note</p>
            <p className="body-sub mt-1 text-[10px] leading-relaxed">{rebalance.taxNote}</p>
          </div>
        </div>
        <p className="body-sub mt-4 border-t border-[var(--glass-border)] pt-4 text-[10px] leading-relaxed">
          <span className="font-semibold text-[var(--text)]">Goals: </span>
          {rebalance.goalsAlignment}
        </p>
        <Link
          to="/storm-warnings"
          className="mt-4 inline-block text-[11px] font-semibold text-[var(--sun)] hover:underline"
        >
          Open the trade list & full transparency →
        </Link>
      </GlassCard>

      <GlassCard className="mt-8 flex flex-col overflow-hidden p-0">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--glass-border)] px-4 py-3">
          <div>
            <p className="label-caps">Live what-if engine</p>
            <p className="body-sub mt-0.5 max-w-xl">
              Uses your selected card as context. Ask your own question — answers are illustrative, not
              advice.
            </p>
          </div>
          {aiStreaming ? (
            <button type="button" onClick={stopAi} className="btn-ghost text-[10px] font-semibold text-[var(--sun)]">
              Stop
            </button>
          ) : null}
        </div>

        <div className="max-h-[280px] min-h-[120px] overflow-y-auto p-4">
          {aiMessages.map((m, i) => (
            <div
              key={i}
              className={`mb-3 flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[8px] font-bold ${
                  m.role === "assistant"
                    ? "border-[var(--sun-border)] bg-[rgba(255,209,102,0.15)] text-[var(--sun)]"
                    : "border-[var(--glass-border)] bg-[var(--glass)] text-[var(--sub)]"
                }`}
              >
                {m.role === "assistant" ? "WI" : "You"}
              </div>
              <div
                className={`max-w-[92%] rounded-md border px-3 py-2 text-[12px] font-light leading-relaxed ${
                  m.role === "assistant"
                    ? "border-[var(--glass-border)] bg-[rgba(255,255,255,0.06)] text-[var(--text)]"
                    : "border-[rgba(255,209,102,0.3)] bg-[rgba(255,209,102,0.1)] text-[var(--text)]"
                }`}
              >
                {m.content}
                {!m.content && aiWaiting && i === aiMessages.length - 1 && m.role === "assistant" ? (
                  <span className="inline-flex gap-1">
                    <span className="h-1 w-1 animate-bounce rounded-full bg-[var(--sun)] [animation-delay:-0.15s]" />
                    <span className="h-1 w-1 animate-bounce rounded-full bg-[var(--sun)]" />
                    <span className="h-1 w-1 animate-bounce rounded-full bg-[var(--sun)] [animation-delay:0.15s]" />
                  </span>
                ) : null}
              </div>
            </div>
          ))}
          <div ref={aiBottomRef} />
        </div>

        <div className="border-t border-[var(--glass-border)] p-3">
          <div className="mb-2 flex flex-wrap gap-2">
            {QUICK_WHATIFS.map((q) => (
              <button
                key={q}
                type="button"
                disabled={aiStreaming}
                onClick={() => sendWhatIf(q)}
                className="rounded-md border border-[rgba(255,255,255,0.15)] px-2 py-1 text-[10px] text-[var(--sub)] transition-colors hover:border-[var(--sun-border)] hover:text-[var(--sun)] disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendWhatIf(aiInput)}
              placeholder="Ask any what-if…"
              disabled={aiStreaming}
              className="focus-sun glass-card min-h-[40px] flex-1 rounded-lg border border-[var(--glass-border)] px-3 py-2 text-[12px] text-[var(--text)] placeholder:text-[var(--dim)] disabled:opacity-60"
            />
            <button
              type="button"
              disabled={aiStreaming}
              onClick={() => sendWhatIf(aiInput)}
              className="btn-gold shrink-0 px-4 py-2 text-[11px] disabled:opacity-50"
            >
              Ask
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
