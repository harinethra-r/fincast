import { useState } from "react";
import { ALLOCATION } from "@/data/portfolio";

export function AllocationBars() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="glass-card p-4">
      <p className="label-caps mb-1">Sky coverage</p>
      <p className="body-sub mb-3">Tap a row or strip segment to highlight it.</p>
      <div className="flex flex-col gap-2.5">
        {ALLOCATION.map((row) => {
          const isOn = active === row.name;
          return (
            <button
              key={row.name}
              type="button"
              onClick={() => setActive((prev) => (prev === row.name ? null : row.name))}
              className={`w-full rounded-lg border text-left transition-colors ${
                isOn
                  ? "border-[var(--sun-border)] bg-[var(--sun-glass)] p-2"
                  : "border-transparent p-2 hover:bg-[rgba(255,255,255,0.04)]"
              }`}
            >
              <div className="mb-1 flex justify-between text-[10px] text-[var(--sub)]">
                <span className={isOn ? "font-semibold text-[var(--text)]" : ""}>{row.name}</span>
                <span className="font-data text-[var(--sun)]">{row.pct}%</span>
              </div>
              <div className="h-1 w-full rounded-full bg-[rgba(255,255,255,0.08)]">
                <div
                  className="h-full rounded-full transition-opacity"
                  style={{
                    width: `${row.pct}%`,
                    backgroundColor: row.color,
                    opacity: active && !isOn ? 0.35 : 1,
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex h-1.5 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.08)]">
        {ALLOCATION.map((row) => {
          const isOn = active === row.name;
          return (
            <button
              key={row.name}
              type="button"
              title={row.name}
              onClick={() => setActive((prev) => (prev === row.name ? null : row.name))}
              className="min-h-0 min-w-0 border-0 p-0 transition-opacity duration-200"
              style={{
                width: `${row.pct}%`,
                backgroundColor: row.color,
                opacity: active && !isOn ? 0.3 : 1,
                boxShadow: isOn ? "inset 0 0 0 2px rgba(255,209,102,0.9)" : undefined,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
