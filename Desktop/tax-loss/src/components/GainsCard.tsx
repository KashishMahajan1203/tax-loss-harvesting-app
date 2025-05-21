import React from "react";
import { formatCurrency } from "../utils/formatters";
import type { CapitalGains } from "../types";

interface GainsCardProps {
  title: string;
  gains: CapitalGains;
  savings?: number;
  variant: "pre" | "post";
}

const GainsCard: React.FC<GainsCardProps> = ({
  title,
  gains,
  savings,
  variant,
}) => {
  // Calculate net gains
  const stcgNet = gains.stcg.profits - gains.stcg.losses;
  const ltcgNet = gains.ltcg.profits - gains.ltcg.losses;
  const totalRealized = stcgNet + ltcgNet;

  return (
    <div
      className={`rounded-xl p-6 w-full h-full ${
        variant === "pre" ? "bg-gray-900 text-white" : "bg-blue-600 text-white"
      }`}
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      {/* Short-term Capital Gains */}
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Short-term</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-gray-300 text-sm">Profits</p>
            <p className="text-green-300 font-medium">
              {formatCurrency(gains.stcg.profits)}
            </p>
          </div>
          <div>
            <p className="text-gray-300 text-sm">Losses</p>
            <p className="text-red-300 font-medium">
              {formatCurrency(gains.stcg.losses)}
            </p>
          </div>
          <div className="col-span-2 mt-1 pt-1 border-t border-gray-500">
            <p className="text-gray-300 text-sm">Net Capital Gains</p>
            <p
              className={`font-medium ${
                stcgNet >= 0 ? "text-green-300" : "text-red-300"
              }`}
            >
              {formatCurrency(stcgNet)}
            </p>
          </div>
        </div>
      </div>

      {/* Long-term Capital Gains */}
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Long-term</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-gray-300 text-sm">Profits</p>
            <p className="text-green-300 font-medium">
              {formatCurrency(gains.ltcg.profits)}
            </p>
          </div>
          <div>
            <p className="text-gray-300 text-sm">Losses</p>
            <p className="text-red-300 font-medium">
              {formatCurrency(gains.ltcg.losses)}
            </p>
          </div>
          <div className="col-span-2 mt-1 pt-1 border-t border-gray-500">
            <p className="text-gray-300 text-sm">Net Capital Gains</p>
            <p
              className={`font-medium ${
                ltcgNet >= 0 ? "text-green-300" : "text-red-300"
              }`}
            >
              {formatCurrency(ltcgNet)}
            </p>
          </div>
        </div>
      </div>

      {/* Total Realized Gains */}
      <div className="mt-4 pt-3 border-t border-gray-500">
        <p className="text-gray-300 text-sm">Realized Capital Gains</p>
        <p
          className={`text-xl font-bold ${
            totalRealized >= 0 ? "text-green-300" : "text-red-300"
          }`}
        >
          {formatCurrency(totalRealized)}
        </p>
      </div>

      {/* Savings Display */}
      {variant === "post" && savings !== undefined && savings > 0 && (
        <div className="mt-4 p-3 bg-green-500 bg-opacity-20 rounded-lg">
          <p className="text-green-100 font-medium">
            You're going to save {formatCurrency(savings)}
          </p>
        </div>
      )}
    </div>
  );
};

export default GainsCard;
