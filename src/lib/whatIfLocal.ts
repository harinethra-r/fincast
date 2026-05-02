/**
 * Local what-if replies when the live assistant is unavailable.
 * Tone: mainstream market research framing; illustrative only, not advice.
 */
export function answerWhatIfLocal(question: string, selectedPreset: string): string {
  const q = question.toLowerCase();

  if (/crypto|bitcoin|btc|ethereum|solana|defi|altcoin/.test(q)) {
    return `You’re anchored near “${selectedPreset}.” Crypto has shown extreme drawdowns and sharp rebounds; correlations with stocks aren’t stable, and liquidity can vanish in stress. Most diversified wealth plans treat it as a small, deliberate “satellite,” not the core shelter. If you’re weighing more exposure, the research question is whether it fits your timeline and whether you can hold through 50–80% squalls without selling the bottom.`;
  }

  if (/mortgage|housing|home price|refinance|real estate(?!\s+etf)|rent\b/.test(q)) {
    return `With “${selectedPreset}” on screen: housing ties to rates, local supply, and jobs. Higher mortgage rates historically cool prices with a lag; your portfolio’s real-estate sleeve (e.g. REITs) can move differently than your primary home. Research usually separates “where I live” from “how I invest”—both affect cash flow, but they’re not the same risk.`;
  }

  if (/oil|opec|energy|commodit|gold|silver/.test(q)) {
    return `Commodity and energy shocks often show up as inflationary gusts: energy inputs squeeze margins, and consumers feel it at the pump. Gold and broad commodities can behave like diversifiers in some decades and dead weight in others. Against “${selectedPreset},” think about whether you need a hedge or simply less sensitivity to market swings—those are different fixes.`;
  }

  if (/tax|capital gain|wash sale|ira\b|401k|roth/.test(q)) {
    return `Taxes change the after-tax weather without changing the radar picture. Realized gains, income brackets, and account type (taxable vs. deferred) determine what you keep. The research takeaway: location of assets and turnover often matter as much as picking the next hot front. I can’t see your brackets here—treat this as a reminder to map gains against a real tax plan.`;
  }

  if (/retire|withdraw|4%|safe withdrawal|social security/.test(q)) {
    return `Withdrawal research (Trinity-style studies and updates) suggests sustainable rates depend on start-date valuations and sequence-of-returns risk—the first decade out matters enormously. “${selectedPreset}” is a stress sketch, not your retirement path. The durable idea: keep a few years of spending in steadier “shelter” so you aren’t forced to sell equities in a deep freeze.`;
  }

  if (/job|unemployment|labor|wage|nfp/.test(q)) {
    return `Labor cooling often precedes easier inflation but can coincide with earnings cuts—bad for risk assets short term, not always bad for bonds. Your mix feels that tug-of-war through stocks (cyclical) vs. shelter sleeves. Anchored on “${selectedPreset},” the lesson from cycles is that job markets turn slowly; portfolios should assume stretches of ugly headlines.`;
  }

  if (/war|geopolit|china|taiwan|russia|sanction|election/.test(q)) {
    return `Geopolitical shocks are fat-tail events: equities can gap down, safe-haven flows can help bonds and gold, and supply chains rewrite inflation. No one forecasts the timing well. With “${selectedPreset}” as context, the research-consistent move is diversification and liquidity—so you’re not forced to trade in the first hours of a crisis.`;
  }

  if (/tech|nasdaq|mag 7|growth stock|ai\b/.test(q)) {
    return `Concentrated growth sleeves can outperform for years, then deliver deeper drawdowns when rates or sentiment shift. Research on concentration risk: a few names can drive most of your ups and downs. Against “${selectedPreset},” ask whether you’re harvesting a deliberate bet or accidental overlap (e.g. US large-cap + mega-cap tech).`;
  }

  if (/bank|credit|default|lehman|liquidity crunch/.test(q)) {
    return `Credit stress is a different storm than a normal equity correction: it can freeze funding markets and hit “safe” assets unevenly. Diversification helps but doesn’t eliminate systemic risk. Looking at “${selectedPreset},” the historical pattern is that quality and duration choices matter as much as stock/bond mix when credit breaks.`;
  }

  if (/emerging|developing|frontier|china market/.test(q)) {
    return `Emerging markets can offer diversification and higher long-run returns in some periods, with extra currency and political squall lines. Your international sleeve is where that story often lives. Paired with “${selectedPreset},” remember EM is not monolithic—regional and FX effects can dominate index moves.`;
  }

  if (/crash|recession|bear|downturn|drawdown|cold front|heavy weather|depression/.test(q)) {
    return `Severe drawdowns are the “heavy weather” of wealth: depth and length depend on earnings, credit, policy, and whether inflation or deflation wins. Historical bear markets vary wildly—some months, some years. The preset cards sketch rough damage bands so you can rehearse emotions and liquidity needs before anything real breaks. Use them to ask: “If this happened, would I still fund goals and sleep?”—not to pick the exact bottom.`;
  }

  if (/inflation|cpi|ppi|stagflation|prices/.test(q)) {
    return `Sustained inflation erodes cash and nominal bonds, rewards pricing power in equities unevenly, and sometimes lifts real assets and inflation-linked debt. Your mix would feel it differently than a 100% stock book. Against “${selectedPreset},” the research-consistent framing is real returns: focus on what you keep after inflation, not headline portfolio gains.`;
  }

  if (/rate|fed|interest|hike|yield curve|tightening|headwind|powell/.test(q)) {
    return `Higher policy rates raise the bar for risky assets: discount rates climb, growth gets scrutinized, and cash and short bonds become more competitive. For “${selectedPreset},” equities—especially long-duration growth—often feel the headwind first; shelter sleeves can look better on a relative basis even if nothing is “safe” in absolute terms. The path of cuts and cuts-not-coming is what markets argue about; your plan should survive being wrong on timing.`;
  }

  if (/bond|shelter|umbrella|fixed income|duration|treasury/.test(q)) {
    return `Adding bonds is adding shelter when the forecast is bumpier: you trade some long-run expected return for cushioning when equities stumble. Duration matters—long bonds move more on rate news; short bonds behave more like ballast with less drama. How much shelter fits you depends on horizon, other income, and how much volatility lets you stay invested. “${selectedPreset}” is one stress color on that map.`;
  }

  if (/stock|equity|sell|all-?in|100%|go to cash/.test(q)) {
    return `Moving from stocks to cash is relief in the moment but timing risk on the way back in—miss the best weeks and long-run returns collapse. Research on trimming vs. fleeing: partial de-risking and rebalancing toward policy weights beats all-or-nothing for most goals. With “${selectedPreset}” in view, consider whether you need less market exposure or just less concentration in the overheating pockets.`;
  }

  if (/dollar|currency|fx|international|overseas|yen|euro/.test(q)) {
    return `A weaker dollar can help global earners when they translate profits home; a stronger dollar does the opposite and can tighten conditions abroad. Your international sleeve is where that FX “weather” often appears. It’s noisy quarter to quarter—strategic diversification is the research-backed idea, not betting each FX swing.`;
  }

  if (/diversif|correlation|portfolio theory|risk parity/.test(q)) {
    return `Diversification doesn’t guarantee gains—it spreads failure modes. When correlations spike in crises, many hedges disappoint at once; that’s why level of savings and cash flow matter too. “${selectedPreset}” is one scenario line; the broader lesson from research is to build a mix you can hold through correlated selloffs without abandoning the plan at the lows.`;
  }

  return `You’re asking about “${question.trim()}” while looking at “${selectedPreset}.” Across cycles, outcomes for diversified investors hinge on horizon, starting valuations, and whether shocks hit growth, inflation, or credit hardest. Equities carry higher long-run expected return with deeper drawdowns; bonds and cash reduce swings but don’t remove uncertainty. The cards above are coarse stress illustrations—use them to think through timelines, liquidity, and how you’d behave in a real squall, not to nail a single forecast.`;
}
