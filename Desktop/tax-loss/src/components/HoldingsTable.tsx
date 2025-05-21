import React from "react";
import type { Holding, SelectedHoldings } from "../types";
import { formatCurrency, formatNumber } from "../utils/formatters";

interface HoldingsTableProps {
  holdings: Holding[];
  selectedHoldings: SelectedHoldings;
  onSelectHolding: (coin: string, selected: boolean) => void;
  isLoading: boolean;
}

const HoldingsTable: React.FC<HoldingsTableProps> = ({
  holdings,
  selectedHoldings,
  onSelectHolding,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-6 gap-4">
                <div className="h-10 bg-gray-200 rounded col-span-1"></div>
                <div className="h-10 bg-gray-200 rounded col-span-1"></div>
                <div className="h-10 bg-gray-200 rounded col-span-1"></div>
                <div className="h-10 bg-gray-200 rounded col-span-1"></div>
                <div className="h-10 bg-gray-200 rounded col-span-1"></div>
                <div className="h-10 bg-gray-200 rounded col-span-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Your Holdings
      </h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  checked={
                    holdings.length > 0 &&
                    holdings.every((h) => selectedHoldings[h.coin])
                  }
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    holdings.forEach((h) => onSelectHolding(h.coin, isChecked));
                  }}
                />
                <span>Select All</span>
              </div>
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Asset
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Holdings
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Short-term Gain
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Long-term Gain
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {holdings.map((holding) => {
            const stcgValue = holding.stcg.gain;
            const ltcgValue = holding.ltcg.gain;

            return (
              <tr
                key={holding.coin}
                className="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
              >
                <td className="px-4 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    checked={!!selectedHoldings[holding.coin]}
                    onChange={(e) =>
                      onSelectHolding(holding.coin, e.target.checked)
                    }
                  />
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={holding.logo}
                      alt={holding.coin}
                      className="h-8 w-8 rounded-full mr-3"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg";
                      }}
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {holding.coin}
                      </div>
                      <div className="text-sm text-gray-500">
                        {holding.coinName}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right font-medium text-gray-900">
                  {formatCurrency(holding.currentPrice)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right">
                  <div className="font-medium text-gray-900">
                    {formatNumber(holding.totalHolding)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatCurrency(
                      holding.totalHolding * holding.currentPrice
                    )}
                  </div>
                </td>
                <td
                  className={`px-4 py-4 whitespace-nowrap text-right font-medium ${
                    stcgValue >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {formatCurrency(stcgValue)}
                </td>
                <td
                  className={`px-4 py-4 whitespace-nowrap text-right font-medium ${
                    ltcgValue >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {formatCurrency(ltcgValue)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HoldingsTable;
