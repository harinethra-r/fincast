import { Link } from "react-router-dom";
import { RebalanceChart } from "@/components/charts/RebalanceChart";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { REBALANCE_TRADES } from "@/data/portfolio";
import { fmtUsd } from "@/lib/format";

function WarningIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3L2 20h20L12 3z"
        stroke="var(--amber)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12 9v5M12 17h.01" stroke="var(--amber)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function StormWarnings() {
  return (
    <div className="p-4 sm:p-6">
      <GlassCard className="mb-6 flex flex-col gap-4 border-l-[3px] border-l-[var(--amber)] bg-[var(--amber-glass)] p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--amber-glass)]">
            <WarningIcon />
          </div>
          <div>
            <h2 className="text-[15px] font-semibold text-[var(--text)]">
              A pressure front is moving in — rebalancing needed
            </h2>
            <p className="body-sub mt-2 max-w-2xl">
              US stocks run warm while shelter is thin. These trades release pressure and bring coverage
              back in line with your plan — same list you see from the{" "}
              <Link to="/scenarios" className="font-semibold text-[var(--sun)] hover:underline">
                What If
              </Link>{" "}
              stress tests, shown here as concrete orders.
            </p>
          </div>
        </div>
        <button type="button" className="btn-gold shrink-0 px-5 py-2.5 text-[11px]">
          Execute all 3
        </button>
      </GlassCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <GlassCard className="p-5">
          <p className="label-caps">How we decided (simple logic)</p>
          <ol className="body-sub mt-3 list-decimal space-y-2 pl-4 text-[11px] leading-relaxed">
            <li>Compare each holding to a target mix for your goals (not for beating the market).</li>
            <li>Trim pockets that are <em>overheated</em> — mostly broad US stocks here.</li>
            <li>Add <em>shelter</em> (bonds) and fill real estate to target so one bet doesn’t carry the whole sky.</li>
            <li>No timing signals — just bringing the map back to the plan after markets moved it.</li>
          </ol>
        </GlassCard>
        <GlassCard className="p-5">
          <p className="label-caps">Costs & taxes (transparent)</p>
          <ul className="body-sub mt-3 space-y-2 text-[11px] leading-relaxed">
            <li>
              <strong className="text-[var(--text)]">Trading costs:</strong> Many brokers charge $0 commission on
              ETFs like these; you may still pay a small spread (the gap between buyers and sellers), often tens of
              dollars on this size — not hidden fees from us.
            </li>
            <li>
              <strong className="text-[var(--text)]">Taxes:</strong> Selling funds you’ve made money on in a{" "}
              <em>taxable</em> account can mean capital-gains tax. In an IRA or 401(k), taxes are usually deferred until
              you withdraw in retirement. We don’t know your accounts — check your statement or tax pro.
            </li>
            <li>
              <strong className="text-[var(--text)]">Expense ratios:</strong> Your funds already charge a tiny annual
              percent — rebalancing doesn’t change that; it only changes how much sits in each fund.
            </li>
          </ul>
        </GlassCard>
      </div>

      <GlassCard className="mt-4 p-5">
        <p className="label-caps">Why this helps your goals</p>
        <p className="body-sub mt-2 text-[11px] leading-relaxed">
          Your next big milestones (home down payment, kids’ school, retirement) need a mix that can ride out squalls
          without bailing at the wrong moment. Trimming the overheating US sleeve and adding shelter lines up with
          needing money in the next 5–15 years — not with guessing where the market goes next month.
        </p>
      </GlassCard>

      <GlassCard className="mt-6 divide-y divide-[rgba(255,255,255,0.04)] overflow-hidden p-0">
        {REBALANCE_TRADES.map((t) => (
          <div
            key={t.ticker + t.action}
            className="flex flex-col gap-2 p-4 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="flex flex-wrap items-start gap-3">
              <Badge kind={t.action} />
              <div>
                <p className="text-[11px] font-medium text-[var(--text)]">
                  {t.ticker} · {t.name}
                </p>
                <p className="body-sub mt-1 max-w-xl text-[9px]">{t.detail}</p>
              </div>
            </div>
            <p className="font-data text-right text-[14px] text-[var(--text)]">
              {t.amount !== 0 ? fmtUsd(Math.abs(t.amount)) : "—"}
            </p>
          </div>
        ))}
      </GlassCard>

      <div className="mt-6">
        <RebalanceChart />
      </div>

      <GlassCard className="mt-6 p-5">
        <p className="label-caps">Why rebalancing?</p>
        <p className="body-sub mt-2">
          When one pocket overheats, small squalls feel bigger. Trimming the hot zone and adding shelter
          steadies the sky without trying to time the market — it’s maintenance, not a bet on headlines.
        </p>
      </GlassCard>
    </div>
  );
}
