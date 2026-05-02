import { HOLDINGS } from "@/data/portfolio";

/** Unified “stocks + funds” vs “bonds & cash” for the dashboard — plain language, no jargon. */
export function dashboardHoldingsSplit() {
  const growth = HOLDINGS.filter((h) => h.assetClass !== "Fixed Income" && h.productKind !== "cash");
  const shelter = HOLDINGS.filter((h) => h.assetClass === "Fixed Income" || h.productKind === "cash");

  const growthValue = growth.reduce((s, h) => s + h.value, 0);
  const shelterValue = shelter.reduce((s, h) => s + h.value, 0);

  const stockCount = growth.filter((h) => h.productKind === "stock").length;
  const fundAndEtfCount = growth.filter((h) => h.productKind === "etf" || h.productKind === "mutual_fund").length;

  return {
    growthValue,
    shelterValue,
    growthPct: Math.round((growthValue / (growthValue + shelterValue)) * 100),
    shelterPct: Math.round((shelterValue / (growthValue + shelterValue)) * 100),
    stockCount,
    fundAndEtfCount,
    growthLabel: "Stocks, ETFs & mutual funds",
    shelterLabel: "Bonds & cash",
  };
}
