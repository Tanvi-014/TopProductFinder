import React from "react";
import { Product } from "../types";
import { ExternalLink, ShoppingBag } from "lucide-react";
import { getProductVisual, getSafeBuyUrl, normalizeBuyOptions } from "../utils";

interface WinnersLayoutProps {
  products: Product[];
  category: string;
  bestOverall: string;
  isDefaultWirelessHeadphones: boolean;
  onSelectProduct: (product: Product) => void;
  isDark?: boolean;
}

export function WinnersLayout({ 
  products, 
  category, 
  bestOverall,
  isDefaultWirelessHeadphones,
  onSelectProduct,
  isDark = false
}: WinnersLayoutProps) {
  
  // Clean dots component helper (circles)
  const renderDots = (score: number) => {
    return (
      <div className="flex gap-1.5 items-center select-none" aria-label={`Score: ${score} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => {
          const isFilled = i < score;
          return (
            <span
              key={i}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                isFilled 
                  ? (isDark ? "bg-amber-400 border border-amber-400" : "bg-stone-900 border border-stone-900") 
                  : (isDark ? "bg-transparent border border-stone-700" : "bg-transparent border border-stone-300")
              }`}
            />
          );
        })}
      </div>
    );
  };

  // Find Winner (Rank 1 / bestOverall matching product)
  const winner = products.find(p => p.rank === 1 || p.name.includes(bestOverall)) || products[0];
  
  // Find other contenders
  const others = products.filter(p => p.id !== winner?.id);
  
  // Budget Pick (cheapest of the others, or rank 2)
  let budgetPick = others.find(p => p.id.includes("budget") || p.id.includes("value") || p.id.includes("anker"));
  if (!budgetPick && others.length > 0) {
    // find cheaper price of remaining items
    budgetPick = others.reduce((prev, curr) => {
      const p1 = parseInt(prev.price.replace(/[^0-9]/g, "")) || 0;
      const p2 = parseInt(curr.price.replace(/[^0-9]/g, "")) || 0;
      return p1 < p2 ? prev : curr;
    });
  }

  // Premium Pick (the other contender)
  let premiumPick = others.find(p => p.id.includes("premium") || p.id.includes("bose") || p.id.includes("ultra"));
  if (!premiumPick && others.length > 0) {
    premiumPick = others.find(p => p.id !== budgetPick?.id) || others[0];
  }

  // Define feature scoring rows based on category type
  let featureRows: { label: string; score: number }[] = [];
  
  if (isDefaultWirelessHeadphones) {
    featureRows = [
      { label: "Noise Cancelling", score: 5 },
      { label: "Comfort & Fit", score: 5 },
      { label: "Sound Quality", score: 4 },
      { label: "Battery Life", score: 4 }
    ];
  } else {
    // Dynamically derive 4 features for other categories in a clean manner
    const catLower = category.toLowerCase();
    if (catLower.includes("vacuum") || catLower.includes("mop")) {
      featureRows = [
        { label: "Suction Power", score: 5 },
        { label: "Smart Navigation", score: 5 },
        { label: "Mopping Quality", score: 4 },
        { label: "Dustbin Space", score: 4 }
      ];
    } else if (catLower.includes("fryer") || catLower.includes("cook")) {
      featureRows = [
        { label: "Cooking Speed", score: 5 },
        { label: "Even Crisping", score: 5 },
        { label: "Size & Capacity", score: 4 },
        { label: "Outer Safety", score: 4 }
      ];
    } else {
      featureRows = [
        { label: "Build Quality", score: 5 },
        { label: "Speed & Ease of Use", score: 5 },
        { label: "How Long It Lasts", score: 4 },
        { label: "User Rating Score", score: 4 }
      ];
    }
  }

  // Make sure we have a layout safety if winner is missing
  if (!winner) return null;
  const winnerImage = getProductVisual(winner, category);
  const winnerBuyOptions = normalizeBuyOptions(winner, 4);

  return (
    <div id="winners-section" className="space-y-8 animate-fade-in">
      
      {/* 1. Winner Card (Editors' Pick) */}
      <div 
        id="winner-card-container"
        className={`w-full p-6 md:p-8 flex flex-col justify-between relative mt-4 group border-2 transition-all ${
          isDark 
            ? "bg-[#18181c] border-amber-400 text-stone-105" 
            : "bg-white border-stone-900 text-stone-900"
        }`}
      >
        {/* Dark Filled Pill Badge */}
        <div id="editors-pick-badge" className="absolute top-6 left-6 md:left-8 animate-pulse">
          <span className={`text-[10px] md:text-[11px] font-bold tracking-wider px-3 py-1 rounded-full uppercase ${
            isDark ? "bg-amber-400 text-stone-950" : "bg-stone-900 text-white"
          }`}>
            Editors' Pick
          </span>
        </div>

        <button
          type="button"
          onClick={() => onSelectProduct(winner)}
          className="relative mt-8 h-56 w-full overflow-hidden border cursor-pointer text-left group/image"
        >
          <img
            src={winnerImage}
            alt={`${winner.name} product preview`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover/image:scale-105"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-200 block">Top visual pick</span>
            <span className="font-serif text-xl font-extrabold">{winner.brand}</span>
          </div>
        </button>

        {/* Brand, Name, and Price Block */}
        <div className={`flex flex-row justify-between items-start pt-8 pb-6 border-b w-full ${
          isDark ? "border-[#26262b]" : "border-stone-100"
        }`}>
          {/* Left Aligned Name and Brand */}
          <div className="text-left space-y-1">
            <span className="text-xs uppercase tracking-widest text-stone-400 font-semibold font-sans block">
              {winner.brand}
            </span>
            <h2 className={`font-serif text-2xl md:text-3xl font-extrabold leading-tight group-hover:underline cursor-pointer ${
              isDark ? "text-[#f5f5f7]" : "text-stone-900"
            }`} onClick={() => onSelectProduct(winner)}>
              {winner.name}
            </h2>
          </div>

          {/* Right Aligned Price */}
          <div className="text-right pl-4">
            <span className={`font-serif text-2xl md:text-3xl font-extrabold block ${
              isDark ? "text-amber-400" : "text-stone-955"
            }`}>
              {winner.price}
            </span>
            <span className="text-[10px] font-sans text-stone-400 uppercase tracking-widest block mt-1">
              Average Price
            </span>
          </div>
        </div>

        {/* Feature rows - Left text, Right score dots */}
        <div className="pt-6 space-y-4">
          <h4 className={`text-xs uppercase tracking-widest font-bold mb-4 text-left ${
            isDark ? "text-stone-300" : "text-[#111111]"
          }`}>
            Ratings for Key Features
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1.5">
            {featureRows.map((row, idx) => (
              <div 
                key={idx} 
                className={`flex items-center justify-between py-3 border-b last:border-b-0 md:last:border-b ${
                  isDark ? "border-[#212126]" : "border-stone-100"
                }`}
              >
                {/* Left aligned label */}
                <span className={`font-sans text-sm font-medium text-left ${
                  isDark ? "text-stone-300" : "text-stone-700"
                }`}>
                  {row.label}
                </span>

                {/* Right aligned dots */}
                {renderDots(row.score)}
              </div>
            ))}
          </div>
        </div>

        {/* View Detail & Direct Purchase buttons */}
        <div className={`pt-6 border-t mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isDark ? "border-[#212126]" : "border-stone-100"
        }`}>
          <span className="text-xs text-stone-550 font-sans italic text-left">
            Found your match? Buy direct or see full technical rating.
          </span>
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => onSelectProduct(winner)}
              className={`text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer inline-flex items-center gap-1 ${
                isDark ? "text-stone-400 hover:text-white" : "text-stone-600 hover:text-stone-950"
              }`}
            >
              See full rating →
            </button>
            <a
              href={getSafeBuyUrl(winnerBuyOptions[0], winner.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-stone-955 text-xs font-extrabold tracking-wide transition-colors flex items-center gap-1.5 shrink-0 rounded-[2px]"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>Shop Now</span>
              <ExternalLink className="h-3 w-3 opacity-80" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. Smaller Cards Grid (Budget Pick & Premium Pick) */}
      {others.length > 0 && (
        <div id="sub-picks-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          
          {/* Budget Pick Card */}
          {budgetPick && (
            <div 
              id="budget-pick-card"
              className={`p-6 flex flex-col justify-between relative min-h-[160px] group transition-all text-left animate-fade-in border ${
                isDark 
                  ? "bg-[#18181c] border-[#26262b] hover:border-amber-400 text-stone-100" 
                  : "bg-white border-[#e5e5e5] hover:border-stone-900 text-stone-900"
              }`}
            >
              <div>
                {/* Light gray pill badge */}
                <span className={`inline-block text-[10px] md:text-[11px] font-bold tracking-wider px-3 py-1 rounded-full uppercase mb-4 ${
                  isDark ? "bg-stone-900 text-amber-400" : "bg-stone-100 text-stone-700"
                }`}>
                  Budget Pick
                </span>

                <div className="flex justify-between items-start pt-2">
                  <div className="text-left space-y-1 pr-4">
                    <span className="text-xs uppercase tracking-widest text-stone-400 font-semibold block">
                      {budgetPick.brand}
                    </span>
                    <h3 className={`font-serif text-xl font-bold leading-snug group-hover:underline cursor-pointer ${
                      isDark ? "text-stone-100" : "text-stone-900"
                    }`} onClick={() => onSelectProduct(budgetPick!)}>
                      {budgetPick.name}
                    </h3>
                  </div>

                  <span className={`font-serif text-xl font-extrabold text-right shrink-0 ${
                    isDark ? "text-amber-400" : "text-stone-955"
                  }`}>
                    {budgetPick.price}
                  </span>
                </div>
              </div>

              <div className={`pt-4 mt-6 border-t flex items-center justify-between gap-2 ${
                isDark ? "border-[#212126]" : "border-stone-100"
              }`}>
                <button
                  onClick={() => onSelectProduct(budgetPick!)}
                  className={`text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer ${
                    isDark ? "text-stone-400 hover:text-white" : "text-stone-500 hover:text-stone-900"
                  }`}
                >
                  See specs →
                </button>
                <a
              href={getSafeBuyUrl(normalizeBuyOptions(budgetPick, 4)[0], budgetPick.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-stone-955 text-[11px] font-extrabold tracking-wide transition-colors flex items-center gap-1 rounded-[2px]"
                >
                  <ShoppingBag className="h-3 w-3" />
                  <span>Shop Now</span>
                </a>
              </div>
            </div>
          )}

          {/* Premium Pick Card */}
          {premiumPick && (
            <div 
              id="premium-pick-card"
              className={`p-6 flex flex-col justify-between relative min-h-[160px] group transition-all text-left animate-fade-in border ${
                isDark 
                  ? "bg-[#18181c] border-[#26262b] hover:border-amber-400 text-stone-100" 
                  : "bg-white border-[#e5e5e5] hover:border-stone-900 text-stone-900"
              }`}
            >
              <div>
                {/* Light gray pill badge */}
                <span className={`inline-block text-[10px] md:text-[11px] font-bold tracking-wider px-3 py-1 rounded-full uppercase mb-4 ${
                  isDark ? "bg-stone-900 text-amber-400" : "bg-stone-100 text-stone-700"
                }`}>
                  Premium Pick
                </span>

                <div className="flex justify-between items-start pt-2">
                  <div className="text-left space-y-1 pr-4">
                    <span className="text-xs uppercase tracking-widest text-stone-400 font-semibold block">
                      {premiumPick.brand}
                    </span>
                    <h3 className={`font-serif text-xl font-bold leading-snug group-hover:underline cursor-pointer ${
                      isDark ? "text-stone-100" : "text-stone-900"
                    }`} onClick={() => onSelectProduct(premiumPick!)}>
                      {premiumPick.name}
                    </h3>
                  </div>

                  <span className={`font-serif text-xl font-extrabold text-right shrink-0 ${
                    isDark ? "text-amber-400" : "text-stone-955"
                  }`}>
                    {premiumPick.price}
                  </span>
                </div>
              </div>

              <div className={`pt-4 mt-6 border-t flex items-center justify-between gap-2 ${
                isDark ? "border-[#212126]" : "border-stone-100"
              }`}>
                <button
                  onClick={() => onSelectProduct(premiumPick!)}
                  className={`text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer ${
                    isDark ? "text-stone-400 hover:text-white" : "text-stone-500 hover:text-stone-900"
                  }`}
                >
                  See specs →
                </button>
                <a
                  href={getSafeBuyUrl(normalizeBuyOptions(premiumPick, 4)[0], premiumPick.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-stone-955 text-[11px] font-extrabold tracking-wide transition-colors flex items-center gap-1 rounded-[2px]"
                >
                  <ShoppingBag className="h-3 w-3" />
                  <span>Shop Now</span>
                </a>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
