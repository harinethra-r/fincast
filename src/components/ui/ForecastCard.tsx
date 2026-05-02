import { GlassCard } from "@/components/ui/GlassCard";
import { fmtPct } from "@/lib/format";

export function ForecastCard({
  day,
  condition,
  ret,
  note,
  isToday,
  staggerDelayMs = 0,
}: {
  day: string;
  condition: string;
  ret: number;
  note: string;
  isToday: boolean;
  staggerDelayMs?: number;
}) {
  const retCls =
    ret > 0 ? "text-[var(--green)]" : ret < 0 ? "text-[var(--red)]" : "text-[var(--sub)]";
  return (
    <GlassCard
      className={`rise-in p-3 transition-transform hover:-translate-y-px ${
        isToday
          ? "!border-[rgba(255,209,102,0.4)] !bg-[rgba(255,209,102,0.18)]"
          : ""
      }`}
      style={staggerDelayMs ? { animationDelay: `${staggerDelayMs}ms` } : undefined}
    >
      <p className="label-caps">{day}</p>
      <p className="mt-1 text-[10px] text-[var(--sub)]">{condition}</p>
      <p className={`font-data mt-2 text-[13px] font-medium ${retCls}`}>{fmtPct(ret)}</p>
      {note ? (
        <p className="mt-1 text-[7px] text-[var(--dim)]">{note}</p>
      ) : (
        <p className="mt-1 text-[7px] opacity-0">—</p>
      )}
    </GlassCard>
  );
}
