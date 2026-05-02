import { GlassCard } from "@/components/ui/GlassCard";
import { KpiTile } from "@/components/ui/KpiTile";
import { GOALS } from "@/data/portfolio";
import { fmtUsd } from "@/lib/format";

export default function Horizon() {
  const active = GOALS.filter((g) => g.status === "active").length;
  const complete = GOALS.filter((g) => g.status === "complete").length;

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6 grid grid-cols-3 gap-3">
        <KpiTile label="Goals tracked" value={String(GOALS.length)} />
        <KpiTile label="Clear skies" value={String(complete)} sub="Completed" />
        <KpiTile label="Building" value={String(active)} sub="Active" />
      </div>

      <p className="body-lead mb-6 max-w-2xl">
        Your horizon lines up milestones like weather along a route — tailwinds when you&apos;re ahead,
        headwinds when the path tightens.
      </p>

      <div className="flex flex-col gap-4">
        {GOALS.map((g) => {
          const pct = Math.min(100, Math.round((g.saved / g.target) * 100));
          const isDone = g.status === "complete";
          const isActive = g.status === "active";
          const border = isDone
            ? "border-l-[3px] border-l-[var(--green)] bg-[rgba(74,222,128,0.08)]"
            : isActive
              ? "border-l-[3px] border-l-[var(--sun)] bg-[rgba(255,209,102,0.08)]"
              : "";
          return (
            <GlassCard key={g.name} className={`p-5 ${border}`}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                <h3 className="text-[13px] font-semibold text-[var(--text)]">{g.name}</h3>
                <span className="font-data text-[9px] text-[var(--dim)]">{g.year}</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3 text-[10px] text-[var(--sub)]">
                <div>
                  <p className="label-caps text-[7px]">Target</p>
                  <p className="font-data mt-1 text-[var(--text)]">{fmtUsd(g.target)}</p>
                </div>
                <div>
                  <p className="label-caps text-[7px]">Saved</p>
                  <p className="font-data mt-1 text-[var(--text)]">{fmtUsd(g.saved)}</p>
                </div>
                <div>
                  <p className="label-caps text-[7px]">Monthly</p>
                  <p className="font-data mt-1 text-[var(--text)]">{fmtUsd(g.monthly)}</p>
                </div>
              </div>
              <div className="mt-4 h-[5px] w-full rounded-full bg-[rgba(255,255,255,0.08)]">
                <div
                  className={`h-full rounded-full ${isDone ? "bg-[var(--green)]" : "bg-[var(--sun)]"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-[10px]">
                <span className="text-[var(--dim)]">{g.outlook}</span>
                <span className="font-data text-[var(--text)]">{pct}%</span>
              </div>
              <p className="body-sub mt-2 text-[10px]">{g.note}</p>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
