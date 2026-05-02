import { Link } from "react-router-dom";
import { PORTFOLIO } from "@/data/portfolio";

export function Topbar({
  title,
  subtitle,
  conditionChip,
}: {
  title: string;
  subtitle: string;
  conditionChip: string;
}) {
  return (
    <header
      className={`glass-shell flex h-[50px] min-h-[50px] shrink-0 flex-wrap items-center justify-between gap-2 border-b border-[rgba(255,255,255,0.16)] px-4`}
    >
      <div className="min-w-0">
        <h1 className="truncate text-[14px] font-semibold text-[var(--text)]">{title}</h1>
        <p className="truncate text-[10px] font-light text-[var(--sub)]">{subtitle}</p>
      </div>

      <div className="hidden items-center gap-2 sm:flex">
        <span className="inline-flex items-center gap-1.5 rounded-[20px] border border-[rgba(74,222,128,0.3)] bg-[rgba(74,222,128,0.15)] px-2.5 py-1 text-[10px] font-medium text-[var(--green)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--green)] pulse-gold" aria-hidden />
          Markets open
        </span>
        <span className="text-[10px] text-[var(--dim)]">{conditionChip}</span>
      </div>

      <div className="flex items-center gap-2">
        <Link
          to="/storm-warnings"
          className="btn-ghost focus-sun text-[10px] transition-colors hover:border-[var(--glass-border-hover)]"
        >
          ⚡ {PORTFOLIO.actionsCount} warnings
        </Link>
        <Link to="/forecaster" className="btn-gold focus-sun inline-block text-[10px]">
          ✦ Ask AI
        </Link>
      </div>
    </header>
  );
}
