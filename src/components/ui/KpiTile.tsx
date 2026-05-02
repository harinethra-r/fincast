export function KpiTile({
  label,
  value,
  sub,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  sub?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="glass-card relative p-4 transition-transform hover:-translate-y-px">
      {icon ? (
        <div className="pointer-events-none absolute right-3 top-3 opacity-30 [&_svg]:stroke-[var(--sun)]">
          {icon}
        </div>
      ) : null}
      <p className="text-[11px] font-medium text-[var(--dim)]">{label}</p>
      <div className="mt-2 font-data text-[var(--text)]">{value}</div>
      {sub ? <p className="body-sub mt-1.5">{sub}</p> : null}
    </div>
  );
}
