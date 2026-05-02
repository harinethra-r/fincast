import type { CSSProperties } from "react";

export function GlassCard({
  children,
  className = "",
  active = false,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`glass-card ${active ? "border-[var(--sun-border)] bg-[var(--sun-glass)]" : ""} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
