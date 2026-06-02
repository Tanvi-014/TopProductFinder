import React from "react";
import { Product, SearchResult } from "../types";
import { getProductImage } from "../utils";
import { Trophy, HelpCircle, ArrowRight, ShieldCheck } from "lucide-react";

interface VisualShowdownProps {
  result: SearchResult;
  onSelectProduct: (product: Product) => void;
  isDark?: boolean;
}

export function VisualShowdown({ result, onSelectProduct, isDark = false }: VisualShowdownProps) {
  const products = result.products;
  if (!products || products.length < 2) return null;

  // Isolate the top 2 products for head-to-head showdown
  const first = products.find(p => p.rank === 1) || products[0];
  const second = products.find(p => p.rank === 2) || products[1];

  // Images
  const imgFirst = getProductImage(first.brand, first.name, result.category);
  const imgSecond = getProductImage(second.brand, second.name, result.category);

  // CommonSpecs to compare
  const specsToCompare = [
    { label: "Price", key: "Price", getVal: (p: Product) => p.price },
    { label: "Expert Rating", key: "Score", getVal: (p: Product) => `★ ${p.rating} / 5.0` },
    ...first.specs.slice(0, 3).map(s => ({
      label: s.name,
      key: s.name.toLowerCase(),
      getVal: (p: Product) => {
        const matching = p.specs.find(val => val.name.toLowerCase() === s.name.toLowerCase());
        return matching ? matching.value : "N/A";
      }
    }))
  ];

  return (
    <div id="visual-showdown-block" className="space-y-6 pt-6 select-none animate-fade-in text-left">
      {/* Title */}
      <h3 className={`font-serif text-lg md:text-xl font-bold border-b pb-3 mb-6 text-left flex items-center gap-2 ${
        isDark ? "text-[#f5f5f7] border-[#26262b]" : "text-stone-900 border-stone-200"
      }`}>
        <Trophy className="h-5 w-5 text-stone-400 shrink-0" />
        Top Two Option Comparison
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* Product 1 Card */}
        <div 
          id={`showdown-${first.id}`} 
          className={`p-6 flex flex-col justify-between relative border-2 transition-all ${
            isDark 
              ? "bg-[#18181c] border-amber-400 text-stone-105" 
              : "bg-white border-2 border-stone-900 text-stone-900 animate-fade-in"
          }`}
        >
          <span className={`absolute top-4 left-4 font-mono text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider ${
            isDark ? "bg-amber-400 text-stone-950" : "bg-stone-900 text-[#ffffff]"
          }`}>
            WINNER • RANK 1
          </span>

          <div className="space-y-4 pt-4">
            {/* Visual Frame */}
            <div 
              className={`w-full h-48 flex flex-col justify-center items-start p-6 cursor-pointer border relative select-none ${
                isDark ? "bg-[#111113] border-[#222226]" : "bg-stone-50 border-stone-200"
              }`} 
              onClick={() => onSelectProduct(first)}
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-500 font-extrabold block mb-1">BEST ON MARKET</span>
              <span className={`font-serif text-3xl font-black block hover:underline ${isDark ? "text-amber-400" : "text-stone-900"}`}>
                ★ {first.rating}
              </span>
              <span className="text-xs text-stone-400 mt-2 font-medium">Industry Benchmark Rating</span>
              <span className="text-[10px] text-stone-500 mt-0.5 uppercase tracking-wider font-mono">100% SPEC COMPLIANT</span>
            </div>

            {/* Header info */}
            <div className="text-left">
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block">{first.brand}</span>
              <h4 className={`font-serif text-lg font-extrabold leading-tight truncate mt-0.5 ${
                isDark ? "text-[#f5f5f7]" : "text-stone-900"
              }`}>{first.name}</h4>
              <p className={`font-sans text-xs mt-2 line-clamp-2 italic ${
                isDark ? "text-stone-400" : "text-stone-500"
              }`}>"{first.verdict}"</p>
            </div>

            {/* Wishes Feedback if present */}
            {first.wishFeedback && (
              <div className={`p-3 border-l text-left ${
                isDark ? "bg-[#141d18]/60 text-emerald-400 border-emerald-500/50" : "bg-emerald-50/50 text-emerald-800 border-l border-emerald-300"
              }`}>
                <span className="text-[9px] font-bold uppercase tracking-wider block">Fits your preferences</span>
                <p className="text-xs">{first.wishFeedback}</p>
              </div>
            )}

            {/* Spec breakdown */}
            <div className={`space-y-2 border-t pt-4 text-left ${isDark ? "border-[#26262b]" : "border-stone-100"}`}>
              {specsToCompare.map((s, idx) => (
                <div key={idx} className={`flex justify-between items-center py-1.5 border-b text-xs ${
                  isDark ? "border-[#212126]" : "border-stone-50"
                }`}>
                  <span className="text-stone-400 font-semibold uppercase tracking-wider text-[10px]">{s.label}</span>
                  <span className={`font-bold ${isDark ? "text-stone-200" : "text-stone-800"}`}>{s.getVal(first)}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onSelectProduct(first)}
            className={`w-full mt-6 font-sans text-xs font-bold py-2.5 transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              isDark 
                ? "bg-amber-400 text-stone-950 hover:bg-amber-500" 
                : "bg-[#111111] hover:bg-stone-800 text-white"
            }`}
          >
            See Details & Pros/Cons
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Product 2 Card */}
        <div 
          id={`showdown-${second.id}`} 
          className={`p-6 flex flex-col justify-between relative border transition-all ${
            isDark 
              ? "bg-[#18181c] border-[#26262b] text-stone-100" 
              : "bg-white border border-[#e5e5e5] text-stone-900"
          }`}
        >
          <span className={`absolute top-4 left-4 font-mono text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider border ${
            isDark ? "bg-stone-900 text-stone-300 border-[#26262b]" : "bg-stone-100 text-stone-700 border-stone-200"
          }`}>
            CONTENDER • RANK 2
          </span>

          <div className="space-y-4 pt-4">
            {/* Visual Frame */}
            <div 
              className={`w-full h-48 flex flex-col justify-center items-start p-6 cursor-pointer border relative select-none ${
                isDark ? "bg-[#111113] border-[#222226]" : "bg-stone-50 border-stone-200"
              }`} 
              onClick={() => onSelectProduct(second)}
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#1877f2] font-extrabold block mb-1">TOP CONTENDER</span>
              <span className={`font-serif text-3xl font-black block hover:underline ${isDark ? "text-stone-300" : "text-stone-900"}`}>
                ★ {second.rating}
              </span>
              <span className="text-xs text-stone-400 mt-2 font-medium">Alternative Consumer Choice</span>
              <span className="text-[10px] text-stone-500 mt-0.5 uppercase tracking-wider font-mono">HIGH-RANK VALUE</span>
            </div>

            {/* Header info */}
            <div className="text-left">
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block">{second.brand}</span>
              <h4 className={`font-serif text-lg font-extrabold leading-tight truncate mt-0.5 ${
                isDark ? "text-[#f5f5f7]" : "text-stone-900"
              }`}>{second.name}</h4>
              <p className={`font-sans text-xs mt-2 line-clamp-2 italic ${
                isDark ? "text-stone-400" : "text-stone-500"
              }`}>"{second.verdict}"</p>
            </div>

            {/* Wishes Feedback if present */}
            {second.wishFeedback && (
              <div className={`p-3 border-l text-left ${
                isDark ? "bg-[#212128]/50 text-stone-300 border-stone-700" : "p-3 bg-stone-50 text-stone-600 border-l border-stone-300"
              }`}>
                <span className="text-[9px] font-bold uppercase tracking-wider block">Fits your preferences</span>
                <p className="text-xs">{second.wishFeedback}</p>
              </div>
            )}

            {/* Spec breakdown */}
            <div className={`space-y-2 border-t pt-4 text-left ${isDark ? "border-[#26262b]" : "border-stone-100"}`}>
              {specsToCompare.map((s, idx) => (
                <div key={idx} className={`flex justify-between items-center py-1.5 border-b text-xs ${
                  isDark ? "border-[#212126]" : "border-stone-50"
                }`}>
                  <span className="text-stone-400 font-semibold uppercase tracking-wider text-[10px]">{s.label}</span>
                  <span className={`font-bold ${isDark ? "text-stone-200" : "text-stone-800"}`}>{s.getVal(second)}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onSelectProduct(second)}
            className={`w-full mt-6 font-sans text-xs font-bold py-2.5 transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              isDark 
                ? "bg-stone-900 text-stone-200 hover:bg-[#212126] border border-[#2d2d34]" 
                : "bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-350"
            }`}
          >
            See Details & Pros/Cons
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
