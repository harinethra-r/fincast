const LABELS: Record<string, string> = {
  overheating: "Overheating",
  "thin-coverage": "Thin Coverage",
  "clear-skies": "Clear Skies",
  neutral: "Neutral",
  idle: "Idle",
};

const CLS: Record<string, string> = {
  overheating: "badge-base badge-overheating",
  "thin-coverage": "badge-base badge-thin",
  "clear-skies": "badge-base badge-clear",
  neutral: "badge-base badge-neutral",
  idle: "badge-base badge-neutral",
};

export function WeatherBadge({ status }: { status: keyof typeof LABELS | string }) {
  const c = CLS[status] ?? "badge-base badge-neutral";
  return <span className={c}>{LABELS[status] ?? status}</span>;
}
