const styles: Record<string, string> = {
  reduce: "bg-[var(--red-glass)] text-[var(--red)] border-[var(--red-border)]",
  increase: "bg-[var(--green-glass)] text-[var(--green)] border-[var(--green-border)]",
  maintain: "bg-[rgba(255,255,255,0.06)] text-[var(--sub)] border-[var(--glass-border)]",
};

const labels: Record<string, string> = {
  reduce: "REDUCE",
  increase: "INCREASE",
  maintain: "MAINTAIN",
};

export function Badge({ kind }: { kind: keyof typeof styles }) {
  return (
    <span
      className={`badge-base ${styles[kind] ?? styles.maintain}`}
    >
      {labels[kind] ?? kind}
    </span>
  );
}
