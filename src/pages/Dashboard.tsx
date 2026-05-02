import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AllocationBars } from "@/components/charts/AllocationBars";
import { PerformanceChart } from "@/components/charts/PerformanceChart";
import { GlassCard } from "@/components/ui/GlassCard";
import { ForecastCard } from "@/components/ui/ForecastCard";
import { KpiTile } from "@/components/ui/KpiTile";
import { RiskMeter } from "@/components/ui/RiskMeter";
import { SunGraphic } from "@/components/ui/SunGraphic";
import { Term } from "@/components/ui/Term";
import { IconBolt, IconCloud } from "@/components/layout/Icons";
import { FORECAST_STRIP, HOLDINGS, PORTFOLIO } from "@/data/portfolio";
import { fmtSignedUsd, fmtUsd } from "@/lib/format";
import { dashboardHoldingsSplit } from "@/lib/holdingsSummary";
import { portfolioHealthScore } from "@/lib/portfolioHealth";

export default function Dashboard() {
  const sorted = [...HOLDINGS].sort((a, b) => b.ret - a.ret);
  const best = sorted[0];
  const worst = sorted[sorted.length - 1];
  const milestonesOnTrack = 3;
  const split = dashboardHoldingsSplit();
  const health = portfolioHealthScore(PORTFOLIO);
  const [showOnboardingBanner, setShowOnboardingBanner] = useState(false);

  useEffect(() => {
    setShowOnboardingBanner(typeof localStorage !== "undefined" && localStorage.getItem("fincast-onboarding") !== "1");
  }, []);

  const eyebrow = `FINCAST · ${new Date(2026, 4, 1).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }).toUpperCase()}`;

  return (
    <div className="p-4 sm:p-6">
      {showOnboardingBanner ? (
        <div className="rise-in mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[rgba(255,209,102,0.35)] bg-[rgba(255,209,102,0.1)] px-4 py-3">
          <p className="body-sub max-w-xl text-[12px] text-[var(--text)]">
            <strong className="text-[var(--sun)]">First time here?</strong> Set your comfort with risk and what you&apos;re
            saving for — no finance-exam words, just a few taps.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link to="/weather-profile" className="btn-gold shrink-0 px-4 py-2 text-[11px]">
              Start guided setup
            </Link>
            <button
              type="button"
              className="btn-ghost px-3 py-2 text-[10px] text-[var(--sub)]"
              onClick={() => {
                localStorage.setItem("fincast-onboarding", "1");
                setShowOnboardingBanner(false);
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      ) : null}

      <GlassCard className="rise-in relative overflow-hidden p-0" style={{ animationDelay: "0ms" }}>
        <div className="relative p-5 sm:p-6 pr-28 sm:pr-36">
          <p className="label-caps">{eyebrow}</p>
          <h2 className="mt-3 text-[30px] font-bold leading-tight text-[var(--text)]">
            {PORTFOLIO.condition}
          </h2>
          <p className="body-sub mt-2 max-w-md">{PORTFOLIO.conditionSub}</p>
          <p className="font-data mt-4 text-[38px] font-bold leading-none text-white">
            {fmtUsd(PORTFOLIO.totalValue)}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="badge-base badge-clear text-[9px]">
              {fmtSignedUsd(PORTFOLIO.todayGain)} today
            </span>
            <span className="badge-base badge-neutral text-[9px]">
              +{PORTFOLIO.allTimeReturn}% all time
            </span>
          </div>
          <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 sm:block">
            <SunGraphic />
          </div>
        </div>

        <div className="grid grid-cols-2 border-t border-[var(--glass-border)] sm:grid-cols-4">
          {[
            {
              label: "Total gained",
              value: fmtSignedUsd(PORTFOLIO.todayGain),
              sub: "Today",
              tip: null as string | null,
            },
            {
              label: "Storm risk",
              value: PORTFOLIO.stormRisk.toFixed(1),
              sub: "Out of 10",
              tip: "How bumpy your mix might feel — higher means more ups and downs.",
            },
            {
              label: "Dividends/yr",
              value: fmtUsd(PORTFOLIO.dividends),
              sub: "Illustrative",
              tip: null,
            },
            {
              label: "Turbulence",
              value: `${PORTFOLIO.turbulence}%`,
              sub: "Annualized",
              tip: "How much your balance might swing over a year — like chop on the water.",
            },
          ].map((cell, i) => (
            <div
              key={cell.label}
              className={`border-[var(--glass-border)] px-4 py-4 sm:border-l ${i === 0 ? "sm:border-l-0" : ""}`}
            >
              <p className="label-caps">
                {cell.tip ? (
                  <Term hint={cell.tip}>{cell.label}</Term>
                ) : (
                  cell.label
                )}
              </p>
              <p
                className={`font-data mt-2 text-[15px] font-bold ${
                  cell.label === "Total gained" && PORTFOLIO.todayGain >= 0
                    ? "text-[var(--green)]"
                    : "text-[var(--text)]"
                }`}
              >
                {cell.value}
              </p>
              <p className="body-sub mt-1">{cell.sub}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="rise-in mt-8 grid gap-4 lg:grid-cols-3" style={{ animationDelay: "60ms" }}>
        <GlassCard className="p-5">
          <p className="label-caps">Unified holdings</p>
          <p className="body-sub mt-2 text-[11px]">
            Individual stocks, ETFs, and mutual funds in one place — no separate jargon for each product type.
          </p>
          <div className="mt-4 space-y-3">
            <div>
              <div className="flex justify-between text-[10px] text-[var(--sub)]">
                <span>{split.growthLabel}</span>
                <span className="font-data text-[var(--sun)]">{fmtUsd(split.growthValue)}</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.08)]">
                <div
                  className="h-full rounded-full bg-[rgba(255,209,102,0.55)]"
                  style={{ width: `${split.growthPct}%` }}
                />
              </div>
              <p className="body-sub mt-1 text-[9px]">
                {split.stockCount} stocks · {split.fundAndEtfCount} funds/ETFs
              </p>
            </div>
            <div>
              <div className="flex justify-between text-[10px] text-[var(--sub)]">
                <span>{split.shelterLabel}</span>
                <span className="font-data text-[var(--text)]">{fmtUsd(split.shelterValue)}</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.08)]">
                <div
                  className="h-full rounded-full bg-[rgba(255,255,255,0.35)]"
                  style={{ width: `${split.shelterPct}%` }}
                />
              </div>
            </div>
          </div>
          <Link to="/sky" className="body-sub mt-4 inline-block text-[10px] font-semibold text-[var(--sun)] hover:underline">
            See each holding →
          </Link>
        </GlassCard>

        <GlassCard className="p-5">
          <p className="label-caps">Portfolio health</p>
          <p className="font-data mt-3 text-[42px] font-bold leading-none text-[var(--text)]">{health.score}</p>
          <p className="mt-1 text-[13px] font-semibold text-[var(--sun)]">{health.label}</p>
          <p className="body-sub mt-2 text-[11px]">{health.sub}</p>
          <p className="body-sub mt-3 border-t border-[var(--glass-border)] pt-3 text-[9px] text-[var(--dim)]">
            A simple score from how bumpy your mix might feel — not a grade on you.
          </p>
        </GlassCard>

        <GlassCard className="p-5">
          <p className="label-caps">Risk meter</p>
          <div className="mt-4">
            <RiskMeter value={PORTFOLIO.stormRisk} label="How bumpy (storm risk)" />
          </div>
          <p className="body-sub mt-4 text-[9px] text-[var(--dim)]">
            Chop reading: {PORTFOLIO.turbulence}% annualized — like how much your balance might swing over a year.
          </p>
        </GlassCard>
      </div>

      <div className="mt-8">
        <p className="label-caps mb-3">7-day outlook</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7 lg:gap-3">
          {FORECAST_STRIP.map((d, i) => (
            <ForecastCard
              key={d.day}
              day={d.day}
              condition={d.condition}
              ret={d.ret}
              note={d.note}
              isToday={i === 0}
              staggerDelayMs={i * 40}
            />
          ))}
        </div>
      </div>

      <div className="rise-in mt-8 grid gap-4 lg:grid-cols-2" style={{ animationDelay: "120ms" }}>
        <PerformanceChart />
        <AllocationBars />
      </div>

      <div className="mt-8">
        <p className="label-caps mb-3">At a glance</p>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <div className="rise-in" style={{ animationDelay: "160ms" }}>
            <KpiTile
              label="Clearest sky"
              value={best.ticker}
              sub={best.name}
              icon={<IconCloud className="h-4 w-4" />}
            />
          </div>
          <div className="rise-in" style={{ animationDelay: "200ms" }}>
            <KpiTile
              label="Most turbulent"
              value={worst.ticker}
              sub={worst.name}
              icon={<IconBolt className="h-4 w-4" />}
            />
          </div>
          <div className="rise-in" style={{ animationDelay: "240ms" }}>
            <KpiTile label="Positions" value={String(HOLDINGS.length)} sub="In your sky" />
          </div>
          <div className="rise-in" style={{ animationDelay: "280ms" }}>
            <KpiTile label="Milestones on track" value={String(milestonesOnTrack)} sub="Goals" />
          </div>
        </div>
      </div>
    </div>
  );
}
