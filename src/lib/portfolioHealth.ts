/** Simple 0–100 score from storm risk + chop — higher is healthier for a novice “at a glance” read. */
export function portfolioHealthScore(p: { stormRisk: number; turbulence: number }): {
  score: number;
  label: string;
  sub: string;
} {
  const raw = 100 - p.stormRisk * 5.2 - p.turbulence * 0.22;
  const score = Math.round(Math.min(96, Math.max(48, raw)));
  const label = score >= 82 ? "Strong" : score >= 68 ? "Good" : "Fair";
  const sub =
    score >= 82
      ? "Balanced mix for your goals with room to ride normal bumps."
      : score >= 68
        ? "Mostly on track — a little more shelter could smooth the ride."
        : "Consider more bond and cash cushion if big expenses are near.";
  return { score, label, sub };
}
