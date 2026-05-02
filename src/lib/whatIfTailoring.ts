import { HOLDINGS, PORTFOLIO, type Scenario } from "@/data/portfolio";
import { fmtPct, fmtSignedUsd, fmtUsd } from "@/lib/format";

export type WhatIfSnapshot = {
  clientName: string;
  total: number;
  risk: number;
  shelter: number;
  stormRisk: number;
  turbulence: number;
  topHoldingsLine: string;
};

/** Risk sleeve = everything that isn’t bonds or cash (stocks, stock funds, REITs, etc.). */
export function getWhatIfSnapshot(): WhatIfSnapshot {
  const total = HOLDINGS.reduce((a, h) => a + h.value, 0);
  const shelter = HOLDINGS.filter((h) => h.assetClass === "Fixed Income" || h.productKind === "cash").reduce(
    (a, h) => a + h.value,
    0,
  );
  const risk = Math.max(0, total - shelter);
  const top = [...HOLDINGS]
    .filter((h) => h.productKind !== "cash")
    .sort((a, b) => b.value - a.value)
    .slice(0, 6)
    .map((h) => `${h.ticker} ${fmtUsd(h.value)}`)
    .join(", ");
  return {
    clientName: PORTFOLIO.clientName,
    total,
    risk,
    shelter,
    stormRisk: PORTFOLIO.stormRisk,
    turbulence: PORTFOLIO.turbulence,
    topHoldingsLine: top,
  };
}

export function formatWhatIfIntro(s: WhatIfSnapshot): string {
  const riskPct = s.total > 0 ? (s.risk / s.total) * 100 : 0;
  const shelPct = s.total > 0 ? (s.shelter / s.total) * 100 : 0;
  return `**${s.clientName} — your account (this prototype):** Total **${fmtUsd(s.total)}**. Risk sleeve (stocks, funds, REITs — approx.) **${fmtUsd(s.risk)}** (${riskPct.toFixed(1)}% of the account). Shelter (bonds + cash) **${fmtUsd(s.shelter)}** (${shelPct.toFixed(1)}%). Storm risk **${s.stormRisk}/10**; chop ~**${s.turbulence}%** annualized. Largest lines: ${s.topHoldingsLine}.`;
}

/** If broad risk assets fall `equityDropPct`%, applied evenly across the whole risk sleeve (illustration). */
export function estimateRiskSleeveShock(equityDropPct: number): {
  snap: WhatIfSnapshot;
  lossOnRisk: number;
  newTotalApprox: number;
  pctOfAccount: number;
} {
  const snap = getWhatIfSnapshot();
  const lossOnRisk = Math.round(snap.risk * (equityDropPct / 100));
  const newTotalApprox = snap.total - lossOnRisk;
  const pctOfAccount = snap.total > 0 ? (lossOnRisk / snap.total) * 100 : 0;
  return { snap, lossOnRisk, newTotalApprox, pctOfAccount };
}

export function parseMarketDropPercent(question: string): number | null {
  const q = question.toLowerCase();
  const m = q.match(
    /(\d+(?:\.\d+)?)\s*%|(\d+(?:\.\d+)?)\s*percent|(?:drop|drops|dropped|fall|falls|fell|down|lose|loses|lost)\s+(?:by\s+)?(\d+(?:\.\d+)?)\s*%?|crash(?:es|ed)?\s+(\d+(?:\.\d+)?)/,
  );
  if (!m) return null;
  const raw = m[1] ?? m[2] ?? m[3] ?? m[4];
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : null;
}

export function parseWithdrawalPercent(question: string): number | null {
  const q = question.toLowerCase();
  // Avoid treating "market down 20%" as a withdrawal — require cash/need language.
  if (!/(need|withdraw|raising|raise|pull|take out|cash|liquidat|spend)/.test(q)) return null;
  const m = q.match(/(\d+(?:\.\d+)?)\s*%/);
  if (!m) return null;
  const n = parseFloat(m[1]);
  return Number.isFinite(n) ? n : null;
}

export function buildWhatIfNumericContextForLLM(): string {
  const s = getWhatIfSnapshot();
  return `NUMERIC PORTFOLIO CONTEXT — use these exact figures when the user asks for dollars or % moves:
- Client name: ${s.clientName}
- Total account value: ${fmtUsd(s.total)}
- Approx. risk sleeve (non-bond, non-cash): ${fmtUsd(s.risk)} (${s.total > 0 ? ((s.risk / s.total) * 100).toFixed(1) : "0"}% of account)
- Approx. shelter (bonds + cash): ${fmtUsd(s.shelter)}
- Storm risk: ${s.stormRisk}/10 | Turbulence: ${s.turbulence}% annualized
- Largest holdings: ${s.topHoldingsLine}

When the user says "market down X%" or similar, unless they specify otherwise assume the shock applies to the **risk sleeve only** (not bonds/cash), then give:
1) estimated $ loss on the risk sleeve
2) that loss as % of the **full account**
3) a rough new total (total minus that loss) as an illustration only.`;
}

export function scenarioSketchLine(scenario: Scenario): string {
  const total = getWhatIfSnapshot().total;
  if (scenario.impactKind === "withdrawal") {
    return `The stress card you’re viewing sketches raising **${fmtUsd(Math.abs(scenario.impact))}** (~**${Math.abs(scenario.pct)}%** of the account) for cash needs — not a market loss.`;
  }
  if (scenario.type === "upside") {
    return `The stress card you’re viewing sketches about **${fmtSignedUsd(scenario.impact)}** (~**${fmtPct(scenario.pct, 0)}** illustrative) on your **${fmtUsd(total)}** account.`;
  }
  return `The stress card you’re viewing sketches about **${fmtSignedUsd(scenario.impact)}** (~**${scenario.pct}%** of the account) on your **${fmtUsd(total)}** total — a portfolio-level illustration tied to this demo mix.`;
}
