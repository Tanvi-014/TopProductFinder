import React from "react";
import { Product, SearchResult } from "../types";
import { getProductVisual } from "../utils";
import { ArrowRight, ShoppingBag, Trophy } from "lucide-react";

interface VisualShowdownProps {
  result: SearchResult;
  onSelectProduct: (product: Product) => void;
  isDark?: boolean;
}

export function VisualShowdown({ result, onSelectProduct, isDark = false }: VisualShowdownProps) {
  const products = result.products;
  if (!products || products.length < 2) return null;

  const first = products.find((p) => p.rank === 1) || products[0];
  const second = products.find((p) => p.rank === 2) || products[1];

  const specsToCompare = [
    { label: "Price", getVal: (p: Product) => p.price },
    { label: "Expert Rating", getVal: (p: Product) => `${p.rating} / 5.0` },
    ...first.specs.slice(0, 3).map((s) => ({
      label: s.name,
      getVal: (p: Product) => p.specs.find((val) => val.name.toLowerCase() === s.name.toLowerCase())?.value || "N/A",
    })),
  ];

  const renderProductCard = (product: Product, label: string, isWinner: boolean) => {
    const imageUrl = getProductVisual(product, result.category);
    const firstStore = product.buyOptions?.[0];

    return (
      <div
        id={`showdown-${product.id}`}
        className={`p-5 flex flex-col justify-between relative border transition-all ${
          isWinner
            ? isDark
              ? "bg-[#18181c] border-amber-400 text-stone-100"
              : "bg-white border-2 border-stone-900 text-stone-900"
            : isDark
              ? "bg-[#18181c] border-[#26262b] text-stone-100"
              : "bg-white border border-[#e5e5e5] text-stone-900"
        }`}
      >
        <span
          className={`absolute top-4 left-4 z-20 font-mono text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider ${
            isWinner
              ? isDark
                ? "bg-amber-400 text-stone-950"
                : "bg-stone-900 text-white"
              : isDark
                ? "bg-stone-900 text-stone-300 border border-[#26262b]"
                : "bg-stone-100 text-stone-700 border border-stone-200"
          }`}
        >
          {label} | Rank {product.rank}
        </span>

        <button
          type="button"
          onClick={() => onSelectProduct(product)}
          className="group relative h-52 w-full overflow-hidden border text-left cursor-pointer"
        >
          <img
            src={imageUrl}
            alt={`${product.name} product preview`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4 text-white">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-200 block">
              {isWinner ? "Best overall" : "Strong alternative"}
            </span>
            <span className="font-serif text-2xl font-black block">{product.rating}</span>
          </div>
        </button>

        <div className="space-y-4 pt-4">
          <div className="text-left">
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block">{product.brand}</span>
            <h4 className={`font-serif text-lg font-extrabold leading-tight mt-0.5 ${isDark ? "text-[#f5f5f7]" : "text-stone-900"}`}>
              {product.name}
            </h4>
            <p className={`font-sans text-xs mt-2 line-clamp-2 italic ${isDark ? "text-stone-400" : "text-stone-500"}`}>
              "{product.verdict}"
            </p>
          </div>

          <div className={`space-y-2 border-t pt-4 text-left ${isDark ? "border-[#26262b]" : "border-stone-100"}`}>
            {specsToCompare.map((s) => (
              <div key={s.label} className={`flex justify-between items-center py-1.5 border-b text-xs ${isDark ? "border-[#212126]" : "border-stone-50"}`}>
                <span className="text-stone-400 font-semibold uppercase tracking-wider text-[10px]">{s.label}</span>
                <span className={`font-bold text-right ${isDark ? "text-stone-200" : "text-stone-800"}`}>{s.getVal(product)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-5">
          <button
            onClick={() => onSelectProduct(product)}
            className={`font-sans text-xs font-bold py-2.5 transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              isWinner
                ? isDark
                  ? "bg-amber-400 text-stone-950 hover:bg-amber-500"
                  : "bg-[#111111] hover:bg-stone-800 text-white"
                : isDark
                  ? "bg-stone-900 text-stone-200 hover:bg-[#212126] border border-[#2d2d34]"
                  : "bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-300"
            }`}
          >
            See Details
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
          {firstStore && (
            <a
              href={firstStore.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-extrabold py-2.5 flex items-center justify-center gap-1.5"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              {firstStore.retailer}
            </a>
          )}
        </div>
      </div>
    );
  };

  return (
    <div id="visual-showdown-block" className="space-y-6 pt-6 select-none animate-fade-in text-left">
      <h3 className={`font-serif text-lg md:text-xl font-bold border-b pb-3 mb-6 text-left flex items-center gap-2 ${
        isDark ? "text-[#f5f5f7] border-[#26262b]" : "text-stone-900 border-stone-200"
      }`}>
        <Trophy className="h-5 w-5 text-stone-400 shrink-0" />
        Top Two Option Comparison
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {renderProductCard(first, "Winner", true)}
        {renderProductCard(second, "Contender", false)}
      </div>
    </div>
  );
}
