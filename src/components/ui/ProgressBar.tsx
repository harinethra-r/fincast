export function ProgressBar({
  value,
  max = 100,
  variant = "gold",
}: {
  value: number;
  max?: number;
  variant?: "gold" | "green";
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const fill =
    variant === "green" ? "bg-[var(--green)]" : "bg-[var(--sun)]";
  return (
    <div className="h-[2px] w-full bg-[var(--sky-raised)]">
      <div
        className={`h-full transition-[width] duration-1000 ease-out ${fill}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
