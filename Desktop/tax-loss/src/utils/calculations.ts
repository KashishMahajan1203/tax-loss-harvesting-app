import type { CapitalGains, Holding, SelectedHoldings } from "../types";

// Calculate the updated capital gains based on selected holdings
export const calculateUpdatedGains = (
  originalGains: CapitalGains,
  holdings: Holding[],
  selectedHoldings: SelectedHoldings
): CapitalGains => {
  // Start with original gains
  const updatedGains: CapitalGains = {
    stcg: { ...originalGains.stcg },
    ltcg: { ...originalGains.ltcg },
  };

  // For each selected holding, adjust the gains
  holdings.forEach((holding) => {
    if (selectedHoldings[holding.coin]) {
      // Handle STCG adjustments
      if (holding.stcg.gain > 0) {
        updatedGains.stcg.profits -= holding.stcg.gain;
      } else if (holding.stcg.gain < 0) {
        updatedGains.stcg.losses -= Math.abs(holding.stcg.gain);
      }

      // Handle LTCG adjustments
      if (holding.ltcg.gain > 0) {
        updatedGains.ltcg.profits -= holding.ltcg.gain;
      } else if (holding.ltcg.gain < 0) {
        updatedGains.ltcg.losses -= Math.abs(holding.ltcg.gain);
      }
    }
  });

  // Ensure we don't have negative profits or losses
  updatedGains.stcg.profits = Math.max(0, updatedGains.stcg.profits);
  updatedGains.stcg.losses = Math.max(0, updatedGains.stcg.losses);
  updatedGains.ltcg.profits = Math.max(0, updatedGains.ltcg.profits);
  updatedGains.ltcg.losses = Math.max(0, updatedGains.ltcg.losses);

  return updatedGains;
};

// Calculate the total realized gains
export const calculateTotalRealized = (gains: CapitalGains): number => {
  const stcgNet = gains.stcg.profits - gains.stcg.losses;
  const ltcgNet = gains.ltcg.profits - gains.ltcg.losses;
  return stcgNet + ltcgNet;
};

// Calculate tax savings
export const calculateSavings = (
  originalGains: CapitalGains,
  updatedGains: CapitalGains
): number => {
  const originalTotal = calculateTotalRealized(originalGains);
  const updatedTotal = calculateTotalRealized(updatedGains);

  return originalTotal > updatedTotal ? originalTotal - updatedTotal : 0;
};
