/** Simple 1–10 “how bumpy” meter — plain language, no Greek letters. */
export function RiskMeter({ value, label }: { value: number; label: string }) {
  const v = Math.min(10, Math.max(0, value));
  const pct = (v / 10) * 100;
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-[9px] text-[var(--sub)]">
        <span>{label}</span>
        <span className="font-data text-[var(--text)]">{v.toFixed(1)} / 10</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.08)]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[rgba(100,200,255,0.5)] via-[var(--sun)] to-[var(--amber)]"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="body-sub mt-1.5 text-[9px]">Lower usually feels calmer day to day; higher means bigger swings.</p>
    </div>
  );
}
