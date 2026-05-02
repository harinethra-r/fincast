import { useEffect, useState } from "react";

/** Animates from 0 toward `target` when `resetKey` changes (ease-out). */
export function useCountTo(target: number, resetKey: string | number, durationMs = 600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(0);
    const t0 = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / durationMs);
      const eased = 1 - (1 - p) * (1 - p);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [resetKey, target, durationMs]);

  return value;
}
