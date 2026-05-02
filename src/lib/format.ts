export function fmtUsd(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function fmtSignedUsd(n: number): string {
  const sign = n >= 0 ? "+" : "";
  return sign + fmtUsd(Math.abs(n));
}

export function fmtPct(n: number, digits = 2): string {
  const sign = n >= 0 ? "+" : "";
  return sign + n.toFixed(digits) + "%";
}
