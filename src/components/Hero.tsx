import React, { useState } from "react";
import { Search, SlidersHorizontal, ChevronDown, ChevronUp, Check } from "lucide-react";

interface HeroProps {
  onSearch: (query: string, wishes: string, priority: string) => void;
  isLoading: boolean;
  currentQuery: string;
  isDark?: boolean;
}

export function Hero({ onSearch, isLoading, currentQuery, isDark = false }: HeroProps) {
  const [inputValue, setInputValue] = useState("");
  const [showPrefs, setShowPrefs] = useState(false);
  const [wishes, setWishes] = useState("");
  const [priority, setPriority] = useState("balanced"); // balanced, budget, premium

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSearch(inputValue.trim(), wishes, priority);
    }
  };

  const suggestions = [
    { label: "Wireless headphones", query: "wireless headphones" },
    { label: "Air fryer", query: "air fryer" },
    { label: "Robot vacuum", query: "robot vacuum" },
    { label: "Mechanical keyboard", query: "mechanical keyboard" }
  ];

  const handleSuggestionClick = (query: string) => {
    setInputValue(query);
    onSearch(query, wishes, priority);
  };

  const handlePrioritySelect = (p: string) => {
    setPriority(p);
  };

  return (
    <div 
      id="hero-section" 
      className={`w-full text-center py-10 md:py-14 px-4 transition-colors duration-200 border-b ${
        isDark 
          ? "bg-[#161619] border-[#26262b] text-white" 
          : "bg-white border-stone-100 text-stone-900"
      }`}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Centered Heading */}
        <h1 className={`font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
          isDark ? "text-stone-50" : "text-stone-900"
        }`}>
          Stop guessing. Find what's actually worth buying.
        </h1>

        {/* Small Subtext */}
        <p className={`font-sans text-sm md:text-base max-w-xl mx-auto font-normal leading-relaxed ${
          isDark ? "text-stone-400" : "text-stone-500"
        }`}>
          We analyze hundreds of expert tests and owner reviews to find products that actually do what they promise—completely free from advertising and paid placements.
        </p>

        {/* Search Bar Container */}
        <div className="max-w-xl mx-auto mt-8 space-y-3">
          <form 
            onSubmit={handleSubmit} 
            className={`flex items-center gap-2 p-1 transition-colors border ${
              isDark 
                ? "border-[#2d2d34] bg-[#1d1d22] focus-within:border-stone-500" 
                : "border-[#e5e5e5] bg-white focus-within:border-stone-400"
            }`}
          >
            <div className="flex-grow flex items-center pl-3">
              <Search className="h-4 w-4 text-stone-400 shrink-0" />
              <input
                type="text"
                className={`w-full py-2 bg-transparent pl-2.5 outline-none font-sans text-sm md:text-base ${
                  isDark ? "text-stone-100 placeholder-stone-500" : "text-stone-900 placeholder-stone-400"
                }`}
                placeholder="What are you shopping for? (e.g. wireless headphones)"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            {/* Preferences trigger inside form */}
            <button
              type="button"
              onClick={() => setShowPrefs(!showPrefs)}
              className={`p-2 transition-colors hidden sm:flex items-center gap-1.5 border-l pr-3 cursor-pointer text-xs font-semibold select-none ${
                isDark 
                  ? "border-[#2d2d34] hover:bg-stone-900 text-stone-300" 
                  : "border-stone-250 hover:bg-stone-50 text-stone-600"
              } ${showPrefs ? (isDark ? "text-white bg-stone-900" : "text-stone-900 bg-stone-50") : ""}`}
              title="Toggle preferences ledger"
            >
              <SlidersHorizontal className="h-4 w-4 shrink-0 text-stone-500" />
              <span>Filters</span>
              {showPrefs ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>

            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className={`font-sans text-[11px] md:text-xs font-bold tracking-wide py-2 px-5 transition-colors select-none rounded-[2px] disabled:opacity-50 cursor-pointer text-nowrap ${
                isDark 
                  ? "bg-[#ffffff] text-[#121214] hover:bg-stone-200" 
                  : "bg-stone-900 text-white hover:bg-stone-800"
              }`}
            >
              {isLoading ? "Searching..." : "Show me the best"}
            </button>
          </form>

          {/* Core preference panel */}
          {showPrefs && (
            <div className={`p-4 border text-left space-y-4 animate-fade-in ${
              isDark 
                ? "border-[#26262b] bg-[#111113]/60" 
                : "border-stone-250 bg-stone-50/50"
            }`}>
              <div className="space-y-1 block text-left">
                <label className={`text-[11px] font-bold block ${isDark ? "text-stone-405" : "text-stone-600"}`}>
                  Any must-haves? (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Under $150, lightweight, waterproof, extra battery..."
                  value={wishes}
                  onChange={(e) => setWishes(e.target.value)}
                  className={`w-full text-xs p-2 outline-none font-sans border ${
                    isDark 
                      ? "bg-[#1c1c21] border-[#2d2d34] text-stone-100 focus:border-stone-500" 
                      : "bg-white border-stone-250 text-stone-900 focus:border-stone-250"
                  }`}
                />
              </div>

              <div className="space-y-2 text-left block">
                <span className={`text-[11px] font-bold block ${isDark ? "text-stone-405" : "text-stone-600"}`}>
                  What matters most?
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { id: "balanced", label: "Best overall", desc: "Good quality & fair price" },
                    { id: "budget", label: "Lowest price", desc: "Save the most money" },
                    { id: "premium", label: "Best in class", desc: "Best quality & top features" }
                  ].map((p) => {
                    const isSelected = priority === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handlePrioritySelect(p.id)}
                        className={`flex-grow sm:flex-grow-0 p-2 border-2 text-left cursor-pointer transition-all ${
                          isSelected 
                            ? (isDark ? "border-amber-400 bg-[#1d1d22]" : "border-stone-950 bg-white") 
                            : (isDark ? "border-[#26262b] bg-[#161619] hover:border-stone-700 hover:bg-[#1d1d22]" : "border-[#e5e5e5] bg-stone-50 hover:border-stone-450 hover:bg-white")
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                            isSelected 
                              ? (isDark ? "bg-amber-400 border-amber-400" : "bg-stone-900 border-stone-900") 
                              : "bg-transparent border-stone-400"
                          }`}>
                            {isSelected && <Check className="h-2 w-2 text-white" />}
                          </span>
                          <span className={`text-xs font-bold ${isDark ? "text-stone-250" : "text-stone-900"}`}>{p.label}</span>
                        </div>
                        <p className={`text-[9px] font-medium pl-4.5 ${isDark ? "text-stone-500" : "text-stone-400"}`}>{p.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Trigger preference for mobile screen since we hid the icon in the input bar */}
          <div className="flex sm:hidden justify-center">
            <button
              type="button"
              onClick={() => setShowPrefs(!showPrefs)}
              className={`inline-flex items-center gap-1 text-xs font-bold decoration-dotted underline cursor-pointer ${
                isDark ? "text-stone-400 hover:text-stone-100" : "text-stone-600 hover:text-stone-950"
              }`}
            >
              <SlidersHorizontal className="h-3 w-3" />
              <span>{showPrefs ? "Hide search preferences" : "Set custom preferences"}</span>
            </button>
          </div>
        </div>

        {/* Pill suggestion button list */}
        <div className={`flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-sans ${isDark ? "text-stone-400" : "text-stone-500"}`}>
          <span className="mr-1 select-none text-[11px] font-semibold">Today's Quick Ledger:</span>
          {suggestions.map((sug, idx) => {
            const isActive = currentQuery.toLowerCase() === sug.query.toLowerCase();
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSuggestionClick(sug.query)}
                className={`px-3 py-1 border rounded-full transition-all text-xs font-medium cursor-pointer ${
                  isActive 
                    ? (isDark ? "border-[#ffffff] bg-[#ffffff] text-[#121214] font-bold" : "border-stone-900 text-stone-900 font-bold") 
                    : (isDark ? "border-[#26262b] bg-stone-900/60 text-stone-300 hover:border-stone-600 hover:text-stone-100" : "border-[#e5e5e5] bg-white text-stone-600 hover:border-stone-400 hover:text-stone-900")
                }`}
              >
                {sug.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

