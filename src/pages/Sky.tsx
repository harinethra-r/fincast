import { KpiTile } from "@/components/ui/KpiTile";
import { WeatherBadge } from "@/components/ui/WeatherBadge";
import { GlassCard } from "@/components/ui/GlassCard";
import { HOLDINGS, PORTFOLIO } from "@/data/portfolio";
import { fmtPct, fmtUsd } from "@/lib/format";
import { dashboardHoldingsSplit } from "@/lib/holdingsSummary";

function kindLabel(k: (typeof HOLDINGS)[number]["productKind"]): string {
  if (k === "stock") return "Stock";
  if (k === "mutual_fund") return "Mutual fund";
  if (k === "etf") return "ETF";
  return "Cash";
}

export default function Sky() {
  const overheating = HOLDINGS.filter((h) => h.weatherStatus === "overheating").length;
  const split = dashboardHoldingsSplit();

  return (
    <div className="p-4 sm:p-6">
      <p className="body-lead mb-6 max-w-2xl">
        One view for <strong className="text-[var(--text)]">individual stocks, ETFs, and mutual funds</strong> — no
        separate wall of numbers. Tap-friendly cards instead of a giant spreadsheet.
      </p>

      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiTile label="Total value" value={fmtUsd(PORTFOLIO.totalValue)} />
        <KpiTile label="Stocks & funds" value={fmtUsd(split.growthValue)} sub={`${split.stockCount} stocks · ${split.fundAndEtfCount} funds/ETFs`} />
        <KpiTile label="Bonds & cash" value={fmtUsd(split.shelterValue)} sub="Shelter sleeve" />
        <KpiTile label="Overheating" value={String(overheating)} sub="High-pressure zones" />
      </div>

      <GlassCard className="overflow-hidden p-0">
        <div className="border-b border-[var(--glass-border)] px-4 py-3">
          <p className="text-[13px] font-semibold text-[var(--text)]">Holdings</p>
          <p className="body-sub mt-0.5">
            Each card shows what it is (stock vs fund), how it&apos;s doing, and how big it is — no finance-exam
            vocabulary.
          </p>
        </div>
        <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3">
          {HOLDINGS.map((h) => (
            <div
              key={h.ticker}
              className="glass-card rounded-lg border border-[var(--glass-border)] p-4 transition-colors hover:border-[rgba(255,209,102,0.25)]"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-data text-[13px] text-[var(--sun)]">{h.ticker}</p>
                  <p className="mt-0.5 text-[10px] leading-snug text-[var(--dim)]">{h.name}</p>
                </div>
                <span className="shrink-0 rounded border border-[var(--glass-border)] px-1.5 py-0.5 text-[8px] uppercase tracking-wide text-[var(--sub)]">
                  {kindLabel(h.productKind)}
                </span>
              </div>
              <p className="body-sub mt-2 text-[9px] text-[var(--sub)]">{h.assetClass}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <WeatherBadge status={h.weatherStatus} />
              </div>
              <div className="mt-3 flex flex-wrap justify-between gap-2 border-t border-[var(--glass-border)] pt-3 text-[10px]">
                <span className="text-[var(--sub)]">Value</span>
                <span className="font-data text-[var(--text)]">{fmtUsd(h.value)}</span>
              </div>
              <div className="mt-1 flex flex-wrap justify-between gap-2 text-[10px]">
                <span className="text-[var(--sub)]">Return</span>
                <span className={`font-data ${h.ret >= 0 ? "text-[var(--green)]" : "text-[var(--red)]"}`}>
                  {fmtPct(h.ret, 1)}
                </span>
              </div>
              <div className="mt-2">
                <div className="mb-0.5 flex justify-between text-[9px] text-[var(--sub)]">
                  <span>Slice of portfolio</span>
                  <span className="font-data">{h.weight}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[rgba(255,255,255,0.08)]">
                  <div className="h-full rounded-full bg-[var(--sun)]" style={{ width: `${Math.min(100, h.weight)}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
