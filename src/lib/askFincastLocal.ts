/**
 * Local Ask Fincast replies when the live assistant is unavailable.
 * Aligns with portfolio context in claude.ts; illustrative only, not advice.
 */
export function answerAskFincastLocal(question: string): string {
  const raw = question.trim();
  const qUpper = raw.toUpperCase();
  const q = raw.toLowerCase();

  if (/crash|market crash|bear market|down 30|down 40|meltdown|panic|2008|covid/.test(q)) {
    return `If you mean a real “category 4 storm” (say stocks down ~30–40%), here’s a clean playbook.

1) First, protect the next 12–24 months: keep/raise a cash + bond runway so you won’t be forced to sell stocks to pay bills or fund your near goals.
2) Second, reduce single-pocket heat: if US stocks are already overheating, trim a bit into shelter (bonds) so the drop feels survivable.
3) Third, set rules now: “I rebalance at -20% / -30%” beats “I’ll decide later” when emotions are loud.

If you tell me your #1 goal (home soon vs retirement later) and whether you might need money in the next year, I’ll tailor the move sizes and what to sell first.`;
  }

  if (qUpper.includes("WHY THE FRONT") || /pressure front|rebalance|sell vti|trim|rebalancing/.test(q)) {
    return `The “pressure front” is a simple rebalance: trim the overheating US total-market slice (VTI), add to core bonds (BND) for shelter, and top up real estate (VNQ) where coverage is thin.

Why this is recommended: it reduces “one big bet” risk and makes the portfolio easier to stick with in a squall. It’s maintenance — not a prediction about next week.`;
  }

  if (qUpper.includes("HOME GOAL") || /down payment|house|home\b|mortgage goal/.test(q)) {
    return `For a home goal, the #1 rule is “match the bucket to the date.” If the purchase is within ~1–3 years, you want more shelter (cash / short bonds) so a stock squall doesn’t delay the move.

If it’s 5+ years out, you can keep more growth exposure — but still avoid being so stock-heavy that you’ll panic-sell during the first ugly headline.`;
  }

  if (qUpper.includes("RECESSION") || /recession|cold front|downturn|hard landing/.test(q)) {
    return `In a recession, stocks often fall before the headlines peak, and recover before the headlines improve — which is why “wait for clarity” usually backfires.

Practical approach: keep enough shelter for near goals, rebalance back toward your target mix when stocks drop (instead of fleeing), and don’t turn a short-term forecast into a permanent plan.`;
  }

  if (qUpper.includes("WHY BONDS") || /^why bonds|bonds\?|bnd\b|fixed income/.test(q)) {
    return `Bonds are the umbrella: they’re there to make the ride survivable, not exciting. They often help when stocks are sliding, and they give you “dry powder” to rebalance without selling stocks at lows.

How much you want comes down to when you’ll need the money and how big of a drawdown you can sit through without bailing.`;
  }

  if (qUpper.includes("EXPENSE RATIO") || /expense ratio|mer\b|fee drag|fund fee/.test(q)) {
    return `Expense ratios are small, recurring leaks. Even 0.20% vs 0.03% compounds into real money over years.

Rule of thumb: for broad market exposure, low-cost index funds usually win because you keep more of the market’s return.`;
  }

  if (qUpper.includes("COMPOUND") || /compound|snowball|time in market/.test(q)) {
    return `Compounding is the snowball: time + consistency beats “perfect timing.”

The trap is panic-selling — a few missed rebound weeks can do more damage than a year of bad headlines. The best plan is the one you can actually hold through storms.`;
  }

  if (/crypto|bitcoin|btc|ethereum/.test(q)) {
    return `Crypto sits outside traditional diversification research: very high volatility, evolving regulation, and unstable correlation to stocks. If you use it, size it as risk capital—small relative to goals—and assume deep drawdowns. It’s not a substitute for bonds as shelter.`;
  }

  if (/tax|ira\b|401k|capital gain/.test(q)) {
    return `Taxes can change the “real” outcome a lot. In taxable accounts, selling winners can create capital-gains tax; in retirement accounts it’s usually deferred.

If you’re rebalancing in taxable, the two levers are: (1) sell the lots with the smallest gains, (2) use new contributions/dividends to drift back toward target before you sell anything.`;
  }

  if (/rate|fed|inflation|cpi/.test(q)) {
    return `Rates are the headwind/tailwind for pricing. Higher rates can hit growthy stocks harder and make bonds/cash more competitive; inflation changes what “a good return” feels like in real life.

The move that tends to age well is diversification + a little more shelter if you have near goals — not trying to outguess the next Fed meeting.`;
  }

  if (/retire|withdraw|safe withdrawal/.test(q)) {
    return `The first 5–10 years of retirement are the danger zone: bad returns early hurt more (because you’re withdrawing while the portfolio is down).

Simple defense: keep a few years of spending in calmer shelter so you’re not forced to sell stocks in a deep freeze.`;
  }

  return `Tell me two things and I’ll give you a crisp, step-by-step answer: (1) what’s the goal (home soon, safety buffer, retirement, school), and (2) when you might need the money.

For now, a strong default is: keep broad diversification, keep costs low, hold enough bonds/cash that you won’t panic-sell, and rebalance back toward targets when markets shove your mix around. Your question was: “${raw}.”`;
}
