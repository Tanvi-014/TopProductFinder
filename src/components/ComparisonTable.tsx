import React from "react";
import { Product } from "../types";

interface ComparisonTableProps {
  products: Product[];
  isDefaultWirelessHeadphones: boolean;
  isDark?: boolean;
}

export function ComparisonTable({ products, isDefaultWirelessHeadphones, isDark = false }: ComparisonTableProps) {
  
  // Custom helper to detect checkmark vs cross, or render styled text
  const renderCellContent = (value: string) => {
    const lowerValue = value.toLowerCase().trim();
    if (lowerValue === "yes" || lowerValue === "true" || lowerValue === "y" || lowerValue === "✓" || lowerValue === "✔") {
      return (
        <span className="text-emerald-500 font-bold text-base block text-left" title="Yes">
          ✔
        </span>
      );
    }
    if (lowerValue === "no" || lowerValue === "false" || lowerValue === "n" || lowerValue === "✗" || lowerValue === "✘") {
      return (
        <span className={`${isDark ? "text-stone-700" : "text-stone-300"} font-bold text-base block text-left`} title="No">
          ✘
        </span>
      );
    }
    return <span className={`font-medium text-sm block text-left ${isDark ? "text-stone-350" : "text-stone-750"}`}>{value}</span>;
  };

  // 1. Column Headers definition
  // We'll map the product list to names. Let's clean the names slightly to match layout (e.g., "Sony XM5" instead of "Sony WH-1000XM5 Wireless Headphones")
  const getCleanShortName = (fullName: string) => {
    if (fullName.includes("Sony WH-1000XM5")) return "Sony XM5";
    if (fullName.includes("Anker")) return "Anker Q45";
    if (fullName.includes("Bose QuietComfort") || fullName.includes("Bose QC")) return "Bose QC45";
    // General fallback
    return fullName.replace("Wireless Headphones", "").replace("Self-Emptying", "").trim().slice(0, 16);
  };

  // 2. Headings & Rows definition
  let rows: { feature: string; values: { [productId: string]: string } }[] = [];

  if (isDefaultWirelessHeadphones) {
    // Exact requested columns & rows for wireless headphones:
    // rows: Price, ANC, Battery, Foldable, Multipoint
    rows = [
      {
        feature: "Price",
        values: {
          "sony-xm5": "$348",
          "anker-q45": "$129",
          "bose-qc45": "$329"
        }
      },
      {
        feature: "ANC",
        values: {
          "sony-xm5": "✔",
          "anker-q45": "✔",
          "bose-qc45": "✔"
        }
      },
      {
        feature: "Battery",
        values: {
          "sony-xm5": "30h",
          "anker-q45": "50h",
          "bose-qc45": "24h"
        }
      },
      {
        feature: "Foldable",
        values: {
          "sony-xm5": "✘",
          "anker-q45": "✔",
          "bose-qc45": "✔"
        }
      },
      {
        feature: "Multipoint",
        values: {
          "sony-xm5": "✔",
          "anker-q45": "✔",
          "bose-qc45": "✔"
        }
      }
    ];
  } else {
    // Generate dynamic comparison table based on search result products specs
    // We start with price
    const priceRow: { [productId: string]: string } = {};
    products.forEach((p) => {
      priceRow[p.id] = p.price;
    });
    rows.push({ feature: "Price", values: priceRow });

    // Gather unique spec names across all products
    const specNamesSet = new Set<string>();
    products.forEach((p) => {
      p.specs?.forEach((s) => specNamesSet.add(s.name));
    });

    const uniqueSpecNames = Array.from(specNamesSet).slice(0, 6); // Limit specs for clean layout

    uniqueSpecNames.forEach((specName) => {
      const specVals: { [productId: string]: string } = {};
      products.forEach((p) => {
        const matchingSpec = p.specs?.find(s => s.name?.toLowerCase() === specName?.toLowerCase());
        specVals[p.id] = matchingSpec ? matchingSpec.value : "N/A";
      });
      rows.push({ feature: specName, values: specVals });
    });
  }

  // Determine the headers mapping.
  // If it's default mode, we want exactly: Feature, Sony XM5, Anker Q45, Bose QC45
  const productColumns = isDefaultWirelessHeadphones 
    ? [
        { id: "sony-xm5", label: "Sony XM5" },
        { id: "anker-q45", label: "Anker Q45" },
        { id: "bose-qc45", label: "Bose QC45" }
      ]
    : products.map(p => ({ id: p.id, label: getCleanShortName(p.name) }));

  return (
    <div id="comparison-ledger-container" className="pt-8">
      {/* Title */}
      <h3 className={`font-serif text-lg md:text-xl font-bold border-b pb-3 mb-6 text-left ${
        isDark ? "text-stone-105 border-[#26262b]" : "text-stone-900 border-stone-200"
      }`}>
        Side-by-Side Compare
      </h3>

      {/* Grid table */}
      <div className={`w-full overflow-x-auto border ${
        isDark ? "border-[#26262b] bg-[#111113]" : "border-[#e5e5e5] bg-white"
      }`}>
        <table className="w-full text-left border-collapse min-w-[550px]">
          <thead>
            <tr className={`border-b ${isDark ? "border-[#26262b] bg-[#18181c]" : "border-[#e5e5e5] bg-stone-50/50"}`}>
              <th className="py-4 px-4 font-sans text-xs uppercase tracking-widest text-stone-400 font-semibold w-1/4 select-none text-left">
                Feature
              </th>
              {productColumns.map((col) => (
                <th 
                  key={col.id} 
                  className={`py-4 px-4 font-serif text-sm font-bold border-l text-left ${
                    isDark ? "text-stone-200 border-[#26262b]" : "text-stone-900 border-[#e5e5e5]"
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`divide-y ${isDark ? "divide-[#26262b]" : "divide-[#e5e5e5]"}`}>
            {rows.map((row, idx) => (
              <tr key={idx} className={`transition-colors ${isDark ? "hover:bg-stone-900/30" : "hover:bg-stone-50/20"}`}>
                {/* Feature Label Cell */}
                <td className={`py-3.5 px-4 font-sans text-xs md:text-sm font-semibold text-left ${
                  isDark ? "text-stone-400" : "text-stone-600"
                }`}>
                  {row.feature}
                </td>

                {/* Values columns */}
                {productColumns.map((col) => {
                  const val = row.values[col.id] || "N/A";
                  return (
                    <td 
                      key={col.id} 
                      className={`py-3.5 px-4 border-l text-left ${
                        isDark ? "border-[#26262b]" : "border-[#e5e5e5]"
                      }`}
                    >
                      {renderCellContent(val)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
