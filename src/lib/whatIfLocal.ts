/**
 * Local what-if replies when the live assistant is unavailable.
 * Uses dollar figures from the demo portfolio in portfolio.ts (tailored to that “account”).
 */
import { HOLDINGS, type Scenario } from "@/data/portfolio";
import { fmtPct, fmtUsd } from "@/lib/format";
import {
  estimateRiskSleeveShock,
  formatWhatIfIntro,
  getWhatIfSnapshot,
  parseMarketDropPercent,
  parseWithdrawalPercent,
  scenarioSketchLine,
} from "@/lib/whatIfTailoring";

function holdingValue(ticker: string): number {
  return HOLDINGS.find((h) => h.ticker === ticker)?.value ?? 0;
}

function reitValue(): number {
  return HOLDINGS.filter((h) => h.assetClass === "Real Estate").reduce((a, h) => a + h.value, 0);
}

function withIntro(body: string): string {
  return `${formatWhatIfIntro(getWhatIfSnapshot())}\n\n${body}`;
}

export function answerWhatIfLocal(question: string, selectedPreset: string, scenario: Scenario): string {
  const q = question.toLowerCase();
  const cardHint = scenarioSketchLine(scenario);
  const snap = getWhatIfSnapshot();

  const wPct = parseWithdrawalPercent(question);
  if (
    wPct != null ||
    /raise cash|cash need|need cash|liquidat|need \d+%|take out|pull out|free up|withdraw\s+\d/.test(q)
  ) {
    const pct = wPct ?? Math.abs(scenario.pct);
    const need = Math.round(snap.total * (pct / 100));
    const after = snap.total - need;
    return withIntro(
      `**Cash need ~${pct}%** of the account: on **${fmtUsd(snap.total)}**, that’s about **${fmtUsd(need)}** to raise, leaving roughly **${fmtUsd(after)}** invested (before taxes/fees). In real life you’d usually sell mostly from the **risk sleeve** first, not your bond umbrella, unless your timeline forces otherwise. ${cardHint}`,
    );
  }

  let drop = parseMarketDropPercent(question);
  if (drop == null && /crash|bear|meltdown|tank|plunge|selloff/.test(q)) {
    drop = scenario.type === "downside" ? Math.abs(scenario.pct) : 20;
  }
  if (drop != null) {
    const { lossOnRisk, newTotalApprox, pctOfAccount } = estimateRiskSleeveShock(drop);
    return withIntro(
      `**Market shock ~${drop}%** (illustration): if that hit your whole **risk sleeve** evenly, you’d be down about **${fmtUsd(lossOnRisk)}** on those positions — roughly **${fmtPct(-pctOfAccount, 1)}** of your full account. Ballpark balance after that shock (bonds/cash unchanged in this sketch): **~${fmtUsd(newTotalApprox)}**. ${cardHint} Preset on screen: “${selectedPreset}.”`,
    );
  }

  if (/crypto|bitcoin|btc|ethereum|solana|defi|altcoin/.test(q)) {
    const tiny = Math.round(snap.total * 0.05);
    return withIntro(
      `Crypto isn’t in this demo account. If you added **5%** of today’s balance as “satellite” risk, that’d be about **${fmtUsd(tiny)}** on a **${fmtUsd(snap.total)}** book — still not shelter. ${cardHint}`,
    );
  }

  if (/mortgage|housing|home price|refinance|real estate(?!\s+etf)|rent\b/.test(q)) {
    return withIntro(
      `Housing is mostly a life expense; your **VNQ / real-estate sleeve** here is about **${fmtUsd(reitValue())}** of **${fmtUsd(snap.total)}** — it can move with real-estate sentiment but isn’t the same as your rent/mortgage. ${cardHint}`,
    );
  }

  if (/oil|opec|energy|commodit|gold|silver/.test(q)) {
    return withIntro(
      `Commodity shocks hit wallets and some sectors harder than a balanced fund. Your diversification here is doing most of the work: **${fmtUsd(snap.risk)}** in risk assets vs **${fmtUsd(snap.shelter)}** in shelter. ${cardHint}`,
    );
  }

  if (/tax|capital gain|wash sale|ira\b|401k|roth/.test(q)) {
    const vti = holdingValue("VTI");
    return withIntro(
      `Taxes depend on account type. As an example only: trimming **${fmtUsd(Math.round(snap.total * 0.06))}** from an overweight stock fund could be a realistic rebalance size on a **${fmtUsd(snap.total)}** account — your **VTI** line is **${fmtUsd(vti)}** today. ${cardHint}`,
    );
  }

  if (/retire|withdraw|4%|safe withdrawal|social security/.test(q)) {
    const four = Math.round(snap.total * 0.04);
    return withIntro(
      `Rule-of-thumb people talk about: **~4%** of the starting balance per year in retirement — on **${fmtUsd(snap.total)}** that’s about **${fmtUsd(four)}/yr** as a classroom illustration, not a promise. ${cardHint}`,
    );
  }

  if (/job|unemployment|labor|wage|nfp/.test(q)) {
    return withIntro(
      `Labor weakness often hits stocks before it feels “real” in daily life. Your mix has **${fmtUsd(snap.risk)}** in risk assets — that’s the part that would feel a recession first; **${fmtUsd(snap.shelter)}** in shelter is the cushion. ${cardHint}`,
    );
  }

  if (/war|geopolit|china|taiwan|russia|sanction|election/.test(q)) {
    return withIntro(
      `Shock headlines usually gap risk assets. You’re carrying **${fmtUsd(snap.risk)}** in risk vs **${fmtUsd(snap.shelter)}** in shelter — the dollars show why a cushion matters. ${cardHint}`,
    );
  }

  if (/tech|nasdaq|mag 7|growth stock|ai\b/.test(q)) {
    const aapl = holdingValue("AAPL");
    const msft = holdingValue("MSFT");
    return withIntro(
      `Growth concentration shows up in line items: **AAPL ~${fmtUsd(aapl)}**, **MSFT ~${fmtUsd(msft)}** inside a **${fmtUsd(snap.total)}** book — together that’s material single-name wind exposure if tech hiccups. ${cardHint}`,
    );
  }

  if (/bank|credit|default|lehman|liquidity crunch/.test(q)) {
    return withIntro(
      `Credit crunches are when “diversified” still hurts. Your **${fmtUsd(snap.shelter)}** in bonds/cash is the reason a **${fmtUsd(snap.total)}** account isn’t 100% equity risk. ${cardHint}`,
    );
  }

  if (/emerging|developing|frontier|china market/.test(q)) {
    const vxus = holdingValue("VXUS");
    return withIntro(
      `International diversification here is mostly **VXUS at ~${fmtUsd(vxus)}** on a **${fmtUsd(snap.total)}** total — that’s the sleeve that catches overseas weather. ${cardHint}`,
    );
  }

  if (/crash|recession|bear|downturn|drawdown|cold front|heavy weather|depression/.test(q)) {
    const d = scenario.type === "downside" ? Math.abs(scenario.pct) : 20;
    const { lossOnRisk, newTotalApprox, pctOfAccount } = estimateRiskSleeveShock(d);
    return withIntro(
      `Heavy-weather rehearsal: a **~${d}%** shock applied across your **risk sleeve** (~**${fmtUsd(snap.risk)}**) pencils out to about **${fmtUsd(lossOnRisk)}** (~**${fmtPct(-pctOfAccount, 1)}** of the account), ballpark **~${fmtUsd(newTotalApprox)}** left if shelter held steady in this sketch. ${cardHint}`,
    );
  }

  if (/inflation|cpi|ppi|stagflation|prices/.test(q)) {
    return withIntro(
      `High inflation is hardest on cash and nominal bonds. Your **shelter sleeve** is **${fmtUsd(snap.shelter)}** today — big enough to matter, but not so large that you give up all growth. ${cardHint}`,
    );
  }

  if (/rate|fed|interest|hike|yield curve|tightening|headwind|powell/.test(q)) {
    const bnd = holdingValue("BND");
    return withIntro(
      `Rising rates hit long growth hardest; your **bond umbrella (BND ~${fmtUsd(bnd)})** is partly why a **${fmtUsd(snap.total)}** account isn’t all rate-sensitive stocks. ${cardHint}`,
    );
  }

  if (/bond|shelter|umbrella|fixed income|duration|treasury/.test(q)) {
    const bnd = holdingValue("BND");
    return withIntro(
      `More shelter means moving dollars toward bonds/cash. Today you already hold **${fmtUsd(bnd)}** in core bonds and **${fmtUsd(snap.shelter)}** total shelter on **${fmtUsd(snap.total)}**. ${cardHint}`,
    );
  }

  if (/stock|equity|sell|all-?in|100%|go to cash/.test(q)) {
    const trim = Math.round(snap.risk * 0.1);
    return withIntro(
      `Selling **all** stocks is rarely necessary; trimming **~10% of your risk sleeve** is about **${fmtUsd(trim)}** on this **${fmtUsd(snap.total)}** account — a realistic “take some heat off” move in a demo plan. ${cardHint}`,
    );
  }

  if (/dollar|currency|fx|international|overseas|yen|euro/.test(q)) {
    return withIntro(
      `FX shows up most in your **international sleeve (~${fmtUsd(holdingValue("VXUS"))})** vs **${fmtUsd(snap.total)}** total. ${cardHint}`,
    );
  }

  if (/diversif|correlation|portfolio theory|risk parity/.test(q)) {
    return withIntro(
      `Diversification in dollars: **${fmtUsd(snap.risk)}** risk vs **${fmtUsd(snap.shelter)}** shelter inside **${fmtUsd(snap.total)}**. ${cardHint}`,
    );
  }

  return withIntro(
    `On “${question.trim()}” with “${selectedPreset}” selected: your live numbers are **${fmtUsd(snap.total)}** total, **${fmtUsd(snap.risk)}** risk sleeve, **${fmtUsd(snap.shelter)}** shelter. ${cardHint} Ask a % move (e.g. “market down 20%”) and I’ll pencil the dollar hit on your risk sleeve.`,
  );
}
