export const PORTFOLIO = {
  clientName: "Alex Kim",
  totalValue: 124_830,
  todayGain: 3240,
  todayPct: 2.67,
  allTimeReturn: 18.4,
  allTimeGain: 19_380,
  stormRisk: 5.8,
  turbulence: 14.2,
  dividends: 1840,
  condition: "Mostly Sunny",
  conditionSub: "Low turbulence · Your portfolio is healthy",
  actionsCount: 3,
} as const;

/** How this holding is held — for a unified stocks + funds dashboard without jargon. */
export type ProductKind = "etf" | "stock" | "mutual_fund" | "cash";

export const HOLDINGS = [
  {
    ticker: "VTI",
    name: "Vanguard Total Market ETF",
    assetClass: "US Stocks",
    productKind: "etf" as const,
    weatherStatus: "overheating" as const,
    value: 34_200,
    ret: 24.1,
    weight: 34,
  },
  {
    ticker: "BND",
    name: "Vanguard Total Bond ETF",
    assetClass: "Fixed Income",
    productKind: "etf" as const,
    weatherStatus: "thin-coverage" as const,
    value: 31_200,
    ret: -2.1,
    weight: 20,
  },
  {
    ticker: "VXUS",
    name: "Vanguard Total Intl ETF",
    assetClass: "Intl Stocks",
    productKind: "etf" as const,
    weatherStatus: "clear-skies" as const,
    value: 24_960,
    ret: 11.2,
    weight: 20,
  },
  {
    ticker: "AAPL",
    name: "Apple Inc.",
    assetClass: "US Stock",
    productKind: "stock" as const,
    weatherStatus: "clear-skies" as const,
    value: 8993,
    ret: 38.4,
    weight: 7,
  },
  {
    ticker: "MSFT",
    name: "Microsoft Corp.",
    assetClass: "US Stock",
    productKind: "stock" as const,
    weatherStatus: "neutral" as const,
    value: 6268,
    ret: 22.7,
    weight: 5,
  },
  {
    ticker: "FXAIX",
    name: "Fidelity S&P 500 Index Fund",
    assetClass: "Mutual Fund",
    productKind: "mutual_fund" as const,
    weatherStatus: "clear-skies" as const,
    value: 9926,
    ret: 19.3,
    weight: 8,
  },
  {
    ticker: "VNQ",
    name: "Vanguard Real Estate ETF",
    assetClass: "Real Estate",
    productKind: "etf" as const,
    weatherStatus: "thin-coverage" as const,
    value: 8829,
    ret: 6.8,
    weight: 7,
  },
  {
    ticker: "CASH",
    name: "Money Market — Sweep",
    assetClass: "Cash",
    productKind: "cash" as const,
    weatherStatus: "idle" as const,
    value: 454,
    ret: 4.9,
    weight: 0,
  },
];

export const FORECAST_STRIP = [
  { day: "Today", condition: "Sunny", ret: 2.67, note: "" },
  { day: "Fri", condition: "Partly Clear", ret: 0.4, note: "" },
  { day: "Sat", condition: "Mixed", ret: 0.1, note: "" },
  { day: "Mon", condition: "Cloudy", ret: -0.8, note: "Jobs data" },
  { day: "Tue", condition: "Mixed", ret: 0.2, note: "Fed speech" },
  { day: "Wed", condition: "Partly Clear", ret: 1.1, note: "Earnings" },
  { day: "Thu", condition: "Sunny", ret: 1.8, note: "" },
];

export const ALLOCATION = [
  { name: "US Stocks", pct: 40, color: "rgba(255,209,102,0.7)" },
  { name: "Fixed Income", pct: 25, color: "rgba(255,255,255,0.4)" },
  { name: "Intl Stocks", pct: 20, color: "rgba(100,180,255,0.6)" },
  { name: "Real Estate", pct: 10, color: "rgba(74,222,128,0.6)" },
  { name: "Cash", pct: 5, color: "rgba(255,255,255,0.2)" },
];

export const SCENARIOS = [
  {
    id: "downdraft-20",
    weatherEvent: "Downdraft",
    financialName: "Market drops ~20%",
    desc: "Broad stock decline similar to the early phase of a typical bear market",
    impact: -24_966,
    pct: -20,
    type: "downside" as const,
    impactKind: "market" as const,
  },
  {
    id: "heat-wave",
    weatherEvent: "Heat Wave",
    financialName: "Inflation stays high",
    desc: "Prices stay elevated — like prices rising faster than usual for a year or more",
    impact: -6241,
    pct: -5,
    type: "downside" as const,
    impactKind: "market" as const,
  },
  {
    id: "liquidity-20",
    weatherEvent: "Dry Season",
    financialName: "Withdraw 20% next year",
    desc: "You need about a fifth of the portfolio in cash for a house, safety, or a big bill",
    impact: -24_966,
    pct: -20,
    type: "downside" as const,
    impactKind: "withdrawal" as const,
  },
  {
    id: "cold-front",
    weatherEvent: "Cold Front",
    financialName: "Mild recession",
    desc: "Economy slows, hiring cools, people spend a bit less",
    impact: -14_980,
    pct: -12,
    type: "downside" as const,
    impactKind: "market" as const,
  },
  {
    id: "market-crash",
    weatherEvent: "Category 4 Storm",
    financialName: "Severe crash",
    desc: "Very large stock drop — similar in depth to 2008-style stress",
    impact: -37_449,
    pct: -30,
    type: "downside" as const,
    impactKind: "market" as const,
  },
  {
    id: "rate-hikes",
    weatherEvent: "Headwinds",
    financialName: "Rates keep rising",
    desc: "Borrowing costs stay higher for longer — headwind for growth stocks",
    impact: -8738,
    pct: -7,
    type: "downside" as const,
    impactKind: "market" as const,
  },
  {
    id: "bull-run",
    weatherEvent: "High Pressure",
    financialName: "Strong bull market",
    desc: "Broad rally — stocks up a lot in one year",
    impact: 31_207,
    pct: 25,
    type: "upside" as const,
    impactKind: "upside" as const,
  },
  {
    id: "geo-shock",
    weatherEvent: "Squall Line",
    financialName: "Geopolitical shock",
    desc: "Disruption abroad — energy and supply chains spike",
    impact: -12_483,
    pct: -10,
    type: "downside" as const,
    impactKind: "market" as const,
  },
] as const;

/** Plain-language rebalance guidance per scenario (prototype — illustrative). */
export type ScenarioRebalancePlan = {
  headline: string;
  logicInPlainEnglish: string;
  moves: { title: string; detail: string }[];
  estimatedCosts: { label: string; amount: string }[];
  taxNote: string;
  goalsAlignment: string;
};

export const SCENARIO_REBALANCE: Record<string, ScenarioRebalancePlan> = {
  "downdraft-20": {
    headline: "Steady the mix before the next leg down",
    logicInPlainEnglish:
      "If a ~20% drop is the worry, the priority is to avoid being forced to sell stocks at lows. We trim the most overweight growth pocket (broad US stocks), add to bonds for shelter, and top up real estate modestly so your balance isn’t only riding one bet.",
    moves: [
      { title: "Trim US total market (VTI)", detail: "Move ~$7,500 toward targets — reduces overlap with single stocks and index funds." },
      { title: "Add to bonds (BND)", detail: "Put ~$6,200 into core bonds — more cushion when stocks wobble." },
      { title: "Top up real estate (VNQ)", detail: "Add ~$1,200 — diversifies beyond plain stocks and bonds." },
    ],
    estimatedCosts: [
      { label: "Commissions (typical online broker)", amount: "$0 for many ETFs" },
      { label: "Bid–ask spread (rough)", amount: "~$15–$40 on this trade size" },
    ],
    taxNote:
      "In a taxable account, selling VTI can trigger capital gains tax on profits. In an IRA or 401(k), taxes are usually deferred until withdrawal. Check statements for gains/losses before selling.",
    goalsAlignment:
      "Keeps your home down-payment and retirement timelines funded by avoiding an all-stock bet; aligns with needing money in the next 5–10 years without timing the market.",
  },
  "heat-wave": {
    headline: "Add shelter when prices run hot",
    logicInPlainEnglish:
      "High inflation hurts cash and nominal bonds more than stocks with pricing power. We still trim the hottest US sleeve slightly and add shelter (bonds + real estate) so you’re not 100% riding growth names.",
    moves: [
      { title: "Small trim to VTI", detail: "~$4,000 — take a little off the table from the warmest zone." },
      { title: "Build BND", detail: "~$3,500 — more ballast; consider shorter-duration bond funds in real life if rates are volatile." },
      { title: "VNQ to target", detail: "~$800 — real assets sometimes help when inflation sticks (not guaranteed)." },
    ],
    estimatedCosts: [
      { label: "Commissions", amount: "$0 typical for ETFs" },
      { label: "Spread / slippage (estimate)", amount: "~$10–$30" },
    ],
    taxNote:
      "Inflation doesn’t change tax rules: sales in taxable accounts can still produce taxable gains. Prefer funding withdrawals from the account type your tax pro recommends.",
    goalsAlignment:
      "Protects purchasing power for goals with dates (house, college) by not relying on cash alone while inflation is high.",
  },
  "liquidity-20": {
    headline: "Raise cash in a controlled way",
    logicInPlainEnglish:
      "Needing ~20% of the portfolio next year means planning sales now—not panic-selling later. We take mostly from the overweight US stock pile and a slice of international, then park proceeds in short shelter (bonds + money market) until you spend.",
    moves: [
      { title: "Sell part of VTI + FXAIX", detail: "Together ~$18,000 — broad US is the largest pocket." },
      { title: "Trim VXUS slightly", detail: "~$4,000 — spreads the withdrawal across regions." },
      { title: "Keep BND/VNQ unless you must", detail: "Only tap if you need more than stock sales raise; bonds are your stability layer." },
    ],
    estimatedCosts: [
      { label: "Commissions", amount: "$0 typical" },
      { label: "Spread (estimate)", amount: "~$25–$50" },
    ],
    taxNote:
      "Large sales for a withdrawal often mean capital gains in taxable accounts. If part of the need is for a first-time home, some rules may help—confirm with a tax professional.",
    goalsAlignment:
      "Matches a near-term cash need (down payment or buffer) while leaving the rest invested for 2038 college and 2052 retirement.",
  },
  "cold-front": {
    headline: "Rebalance into shelter before the slowdown bites",
    logicInPlainEnglish:
      "A mild recession usually hits earnings first. We reduce the hottest stock weight and add bonds so you’re not fully exposed to the cycle.",
    moves: [
      { title: "VTI → bonds", detail: "~$6,000 from broad US to BND." },
      { title: "VNQ toward 10%", detail: "~$1,200 — fills the real estate gap." },
    ],
    estimatedCosts: [
      { label: "Commissions", amount: "$0 typical" },
      { label: "Spread (estimate)", amount: "~$12–$28" },
    ],
    taxNote: "Same as other trades: taxable sales may create gains. Lot selection matters if your broker allows it.",
    goalsAlignment: "Supports staying invested through a rough year without abandoning long-term goals.",
  },
  "market-crash": {
    headline: "Maximum shelter — prepare for a deep freeze",
    logicInPlainEnglish:
      "A crash scenario means we move meaningfully out of the riskiest overlap (US growth-heavy) and rebuild shelter first.",
    moves: [
      { title: "Large VTI reduction", detail: "~$10,000+ toward bonds and cash-like stability." },
      { title: "Raise BND aggressively", detail: "Bring bonds well above 25% until the storm passes (illustrative)." },
      { title: "Hold some international", detail: "VXUS stays for diversification—not all crises are US-only." },
    ],
    estimatedCosts: [
      { label: "Commissions", amount: "$0 typical" },
      { label: "Spread in stress (higher)", amount: "~$40–$120 if markets are chaotic" },
    ],
    taxNote: "In a real crash, selling at lows in taxable accounts locks in losses for taxes but may also harvest losses to offset gains—ask a pro.",
    goalsAlignment: "Emotional rehearsal: you still fund near-term goals from shelter, not from selling everything at the bottom.",
  },
  "rate-hikes": {
    headline: "Shorten risk where rates hurt most",
    logicInPlainEnglish:
      "Higher rates hit long-duration stocks hardest. We trim broad US equity a bit and favor bonds that behave more predictably (core aggregate in this demo).",
    moves: [
      { title: "Trim VTI", detail: "~$5,000." },
      { title: "Add BND", detail: "~$4,200." },
      { title: "VNQ nudge", detail: "~$800 — rate-sensitive but still diversification." },
    ],
    estimatedCosts: [
      { label: "Commissions", amount: "$0 typical" },
      { label: "Spread (estimate)", amount: "~$15–$35" },
    ],
    taxNote: "Ordinary income on bond interest is taxable in taxable accounts; stocks mainly trigger gains when sold.",
    goalsAlignment: "Reduces drama when your goals need steady progress, not hero trades.",
  },
  "bull-run": {
    headline: "Take profits without going to cash",
    logicInPlainEnglish:
      "In a strong rally, the risk is being too hot. We rebalance back to targets—sell a little of what ran, not because we predict a top.",
    moves: [
      { title: "Trim VTI / winners", detail: "~$5,000 into shelter." },
      { title: "Lock in balance", detail: "Top up BND + VNQ to policy weights." },
    ],
    estimatedCosts: [
      { label: "Commissions", amount: "$0 typical" },
      { label: "Spread (estimate)", amount: "~$10–$25" },
    ],
    taxNote: "Rebalancing in taxable accounts can mean paying tax on gains—sometimes worth it for risk control.",
    goalsAlignment: "Keeps college and retirement on track by avoiding an accidental ‘all-in growth’ drift.",
  },
  "geo-shock": {
    headline: "Spread risk when the world gets messy",
    logicInPlainEnglish:
      "Shocks often spike commodities and hurt global supply chains. We keep international exposure, trim concentrated US if needed, and add a bit of shelter.",
    moves: [
      { title: "Hold VXUS", detail: "Diversification—not all damage is US-only." },
      { title: "Trim VTI slightly", detail: "~$4,500 to BND for stability." },
      { title: "VNQ small add", detail: "~$600 — indirect real-asset tilt (still volatile)." },
    ],
    estimatedCosts: [
      { label: "Commissions", amount: "$0 typical" },
      { label: "Spread (estimate)", amount: "~$15–$40" },
    ],
    taxNote: "Same capital-gains considerations on any sells in taxable accounts.",
    goalsAlignment: "Avoids betting everything on one country when headlines are scary.",
  },
};

export const GOALS = [
  {
    name: "New car",
    year: 2024,
    target: 28_000,
    saved: 28_000,
    monthly: 0,
    status: "complete" as const,
    outlook: "CLEAR",
    note: "Clear skies — reached 2 months ahead of schedule.",
  },
  {
    name: "First home — down payment",
    year: 2027,
    target: 80_000,
    saved: 53_600,
    monthly: 1200,
    status: "active" as const,
    outlook: "BUILDING",
    note: "Tailwinds strong — you'll reach this in 22 months, ahead of your 2027 target.",
  },
  {
    name: "Kids college fund",
    year: 2038,
    target: 150_000,
    saved: 36_000,
    monthly: 500,
    status: "future" as const,
    outlook: "TRADE WINDS",
    note: "12-year horizon with trade winds. Compound growth at 7%/yr keeps you on track.",
  },
  {
    name: "Retire comfortably",
    year: 2052,
    target: 1_800_000,
    saved: 124_830,
    monthly: 1500,
    status: "future" as const,
    outlook: "DISTANT HORIZON",
    note: "26 years of compounding is your strongest tailwind. At $1,500/mo + 7% returns, you'll reach this by 2050.",
  },
];

export const REBALANCE_TRADES = [
  {
    action: "reduce" as const,
    ticker: "VTI",
    name: "Vanguard Total Market ETF",
    detail: "Overheating at 34% → bring to 28% target",
    amount: -7488,
  },
  {
    action: "increase" as const,
    ticker: "BND",
    name: "Vanguard Total Bond ETF",
    detail: "Thin coverage at 20% → build to 25%",
    amount: 6241,
  },
  {
    action: "increase" as const,
    ticker: "VNQ",
    name: "Vanguard Real Estate ETF",
    detail: "Below target at 7% → fill to 10%",
    amount: 1247,
  },
  {
    action: "maintain" as const,
    ticker: "ALL",
    name: "VXUS, AAPL, MSFT, FXAIX, Cash",
    detail: "Pressure balanced — no action needed",
    amount: 0,
  },
];

export const PERFORMANCE_12M = [
  { month: "May", value: 105_000 },
  { month: "Jun", value: 107_200 },
  { month: "Jul", value: 109_800 },
  { month: "Aug", value: 108_400 },
  { month: "Sep", value: 111_200 },
  { month: "Oct", value: 113_900 },
  { month: "Nov", value: 110_500 },
  { month: "Dec", value: 114_800 },
  { month: "Jan", value: 117_200 },
  { month: "Feb", value: 119_600 },
  { month: "Mar", value: 121_400 },
  { month: "Apr", value: 124_830 },
];
