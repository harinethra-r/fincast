import { NavLink } from "react-router-dom";
import {
  IconBolt,
  IconChat,
  IconCloud,
  IconCompass,
  IconFlag,
  IconLayers,
  IconSun,
  IconSunLogo,
} from "@/components/layout/Icons";
import { APP_VERSION } from "@/buildInfo";
import { PORTFOLIO } from "@/data/portfolio";

const shell =
  "glass-shell border-r border-[rgba(255,255,255,0.16)]";

const navBase =
  "flex items-center gap-2.5 rounded-lg px-2 py-2 text-[13px] font-medium text-[var(--sub)] transition-colors";

const navInactive = `${navBase} hover:bg-[var(--glass)] hover:text-[var(--text)]`;

const navActive =
  "bg-[rgba(255,209,102,0.18)] text-[var(--sun)] border border-[rgba(255,209,102,0.25)]";

function NavItem({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        `${navBase} ${isActive ? navActive : navInactive} w-full`
      }
    >
      <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[7px] bg-[var(--glass)] [&_svg]:h-4 [&_svg]:w-4 [&_svg]:stroke-[currentColor]">
        {icon}
      </span>
      {label}
    </NavLink>
  );
}

export function Sidebar() {
  return (
    <aside className={`flex w-[200px] shrink-0 flex-col ${shell}`}>
      <div className="border-b border-[rgba(255,255,255,0.16)] p-4">
        <div className="flex items-start gap-2.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[rgba(255,209,102,0.4)] bg-[rgba(255,209,102,0.2)]">
            <IconSunLogo className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[16px] font-bold leading-tight text-[var(--text)]">Fincast</p>
            <p className="mt-0.5 text-[9px] text-[var(--dim)]">Your money, clear skies</p>
            <p className="mt-2 text-[8px] leading-snug text-[var(--dim)]">v{APP_VERSION}</p>
          </div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-5 overflow-y-auto px-2 py-4">
        <div>
          <p className="mb-2 px-2 text-[8px] font-bold uppercase tracking-[0.12em] text-[var(--dim)]">
            Forecast
          </p>
          <div className="flex flex-col gap-1">
            <NavItem to="/" icon={<IconSun />} label="Today's Forecast" />
          </div>
        </div>
        <div>
          <p className="mb-2 px-2 text-[8px] font-bold uppercase tracking-[0.12em] text-[var(--dim)]">
            Understand
          </p>
          <div className="flex flex-col gap-1">
            <NavItem to="/sky" icon={<IconCloud />} label="Your Sky" />
            <NavItem to="/storm-risk" icon={<IconBolt />} label="Storm Risk" />
          </div>
        </div>
        <div>
          <p className="mb-2 px-2 text-[8px] font-bold uppercase tracking-[0.12em] text-[var(--dim)]">
            Plan
          </p>
          <div className="flex flex-col gap-1">
            <NavItem to="/scenarios" icon={<IconLayers />} label="What If..." />
            <NavItem to="/storm-warnings" icon={<IconFlag />} label="Storm Warnings" />
            <NavItem to="/horizon" icon={<IconCompass />} label="Your Horizon" />
            <NavItem to="/weather-profile" icon={<IconBolt />} label="Weather Profile" />
            <NavItem to="/forecaster" icon={<IconChat />} label="Ask Fincast AI" />
          </div>
        </div>
      </nav>

      <div className="border-t border-[rgba(255,255,255,0.16)] p-3">
        <div className="glass-card flex items-center gap-2.5 rounded-[10px] border border-[var(--glass-border)] bg-[var(--glass)] p-2">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[rgba(255,209,102,0.5)] bg-[rgba(255,209,102,0.2)] text-[10px] font-bold text-[var(--sun)]"
            aria-hidden
          >
            AK
          </div>
          <div className="min-w-0">
            <p className="truncate text-[12px] font-semibold text-[var(--text)]">{PORTFOLIO.clientName}</p>
            <p className="text-[9px] text-[var(--dim)]">Moderate · Private</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
