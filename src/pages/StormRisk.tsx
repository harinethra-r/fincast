import { useMemo, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { KpiTile } from "@/components/ui/KpiTile";
import { PORTFOLIO } from "@/data/portfolio";

const classes = [
  { label: "US Stocks", risk: 7.2 },
  { label: "Fixed Income", risk: 2.1 },
  { label: "Intl Stocks", risk: 6.4 },
  { label: "Real Estate", risk: 5.5 },
  { label: "Cash", risk: 0.5 },
];

function narrativeForLevel(level: number): string {
  if (level <= 3) {
    return "Calm air — small squalls barely move the needle. You can focus more on long-horizon goals than day-to-day noise.";
  }
  if (level <= 6) {
    return "Mixed skies — bumps are normal. A balanced mix of growth and shelter keeps the ride steadier when fronts roll through.";
  }
  if (level <= 8) {
    return "Active weather — swings feel bigger. Shelter assets and diversification matter more than chasing the sunniest headline.";
  }
  return "Heavy turbulence — this is when thin coverage hurts most. Trimming overheated pockets and adding shelter can steady the horizon.";
}

export default function StormRisk() {
  const [level, setLevel] = useState(6);
  const segments = 10;
  const here = Math.round(PORTFOLIO.stormRisk);
  const sliderStory = useMemo(() => narrativeForLevel(level), [level]);

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiTile label="Storm risk" value={PORTFOLIO.stormRisk.toFixed(1)} sub="Out of 10" />
        <KpiTile label="Turbulence" value={`${PORTFOLIO.turbulence}%`} sub="Annualized" />
        <KpiTile label="Worst squall" value="-30%" sub="Category 4 scenario" />
        <KpiTile label="Best sunshine" value="+25%" sub="Bull market scenario" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <GlassCard className="p-5">
          <p className="label-caps mb-4">Storm risk gauge</p>
          <div className="flex gap-[3px]">
            {Array.from({ length: segments }).map((_, i) => {
              const active = i < here;
              const tone =
                i < 4 ? "bg-[var(--green)]" : i < 7 ? "bg-[var(--amber)]" : "bg-[rgba(255,255,255,0.12)]";
              return (
                <div
                  key={i}
                  className="h-[7px] flex-1 rounded-[3px] bg-[rgba(255,255,255,0.08)]"
                  title={`Segment ${i + 1}`}
                >
                  <div className={`h-full rounded-[3px] ${active ? tone : ""}`} />
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-[10px] font-semibold text-[var(--sun)]">
            ▲ You&apos;re here · {PORTFOLIO.stormRisk.toFixed(1)} / 10
          </p>
          <div className="mt-4 border-l-[3px] border-[var(--sun)] bg-[rgba(255,255,255,0.06)] p-3">
            <p className="body-sub">
              Storm risk rolls turbulence into one dial. When the front strengthens, shelter assets and
              coverage matter more than headline returns.
            </p>
          </div>
          <div className="mt-5">
            <label className="label-caps block" htmlFor="storm-slider">
              Move the dial (demo) — watch the story update
            </label>
            <input
              id="storm-slider"
              type="range"
              min={1}
              max={10}
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
              className="mt-2 w-full cursor-ew-resize accent-[var(--sun)]"
            />
            <p className="font-data mt-2 text-[12px] text-[var(--sun)]">Level {level} / 10</p>
            <div className="mt-3 flex gap-[3px] opacity-80">
              {Array.from({ length: segments }).map((_, i) => {
                const active = i < level;
                const tone =
                  i < 4 ? "bg-[var(--green)]" : i < 7 ? "bg-[var(--amber)]" : "bg-[rgba(255,255,255,0.12)]";
                return (
                  <div key={i} className="h-[5px] flex-1 rounded-[2px] bg-[rgba(255,255,255,0.08)]">
                    <div className={`h-full rounded-[2px] transition-all duration-200 ${active ? tone : ""}`} />
                  </div>
                );
              })}
            </div>
            <p className="body-sub mt-4 text-[11px] leading-relaxed text-[var(--text)] transition-colors duration-300">
              {sliderStory}
            </p>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <p className="label-caps mb-4">Risk by asset class</p>
          <div className="flex flex-col gap-4">
            {classes.map((c) => (
              <div key={c.label}>
                <div className="mb-1 flex justify-between text-[10px] text-[var(--sub)]">
                  <span>{c.label}</span>
                  <span
                    className={`font-data ${
                      c.risk > 6 ? "text-[var(--amber)]" : c.risk > 3 ? "text-[var(--sun)]" : "text-[var(--green)]"
                    }`}
                  >
                    {c.risk.toFixed(1)}
                  </span>
                </div>
                <div className="h-[5px] w-full rounded-[5px] bg-[rgba(255,255,255,0.08)]">
                  <div
                    className="h-full rounded-[5px] bg-[var(--sun)]"
                    style={{ width: `${c.risk * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
