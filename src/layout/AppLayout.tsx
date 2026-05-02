import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { PORTFOLIO } from "@/data/portfolio";

const ROUTE_META: Record<string, { title: string; subtitle: string; conditionChip: string }> = {
  "/": {
    title: "Today's Forecast",
    subtitle: "Portfolio weather at a glance",
    conditionChip: "Mostly sunny",
  },
  "/sky": {
    title: "Your Sky",
    subtitle: "Stocks, ETFs & funds together",
    conditionChip: "Mostly sunny",
  },
  "/storm-risk": {
    title: "Storm Risk",
    subtitle: "Turbulence and exposure",
    conditionChip: "Moderate",
  },
  "/scenarios": {
    title: "What If...",
    subtitle: "Scenarios → rebalancing ideas",
    conditionChip: "Explore",
  },
  "/storm-warnings": {
    title: "Storm Warnings",
    subtitle: "Trades, costs & why",
    conditionChip: "Action needed",
  },
  "/horizon": {
    title: "Your Horizon",
    subtitle: "Goals along the way",
    conditionChip: "On track",
  },
  "/weather-profile": {
    title: "Weather Profile",
    subtitle: "Risk tolerance quiz",
    conditionChip: "Quiz",
  },
  "/forecaster": {
    title: "Ask Fincast AI",
    subtitle: "Research-style market guidance",
    conditionChip: "Chat",
  },
};

export function AppLayout() {
  const { pathname } = useLocation();
  const meta = ROUTE_META[pathname] ?? ROUTE_META["/"];
  const chip = pathname === "/" ? PORTFOLIO.condition : meta.conditionChip;

  return (
    <div className="flex min-h-dvh">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={meta.title} subtitle={meta.subtitle} conditionChip={chip} />
        <main className="relative z-[1] flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
