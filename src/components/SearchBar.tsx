import React from "react";

interface SearchBarProps {
  query: string;
  setQuery: (q: string) => void;
  wishes: string;
  setWishes: (w: string) => void;
  priority: string;
  setPriority: (p: string) => void;
  onSearch: (q: string, wishes: string, priority: string) => void;
  isLoading: boolean;
  isDark?: boolean;
}

const PRIORITIES = [
  { id: "balanced", label: "Value Consensus", desc: "Highest cost-to-performance ratio." },
  { id: "premium", label: "Top-Tier Premium", desc: "Prioritizes premium build materials and luxury standards." },
  { id: "portable", label: "Compact & Light", desc: "Favors small layouts and mobile convenience." },
  { id: "high_tech", label: "Max Specification", desc: "Prioritizes cutting-edge speed and extreme power ratings." }
];

export function SearchBar({ 
  query, 
  setQuery, 
  wishes, 
  setWishes, 
  priority, 
  setPriority, 
  onSearch, 
  isLoading,
  isDark = false
}: SearchBarProps) {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim(), wishes.trim(), priority);
    }
  };

  const handleClear = () => {
    setQuery("");
  };

  const applyWishPreset = (presetText: string, presetPriority: string) => {
    setWishes(presetText);
    setPriority(presetPriority);
  };

  const accentColor = isDark ? "border-[#C2410C]" : "border-[#8A1C14]";
  const accentText = isDark ? "text-orange-400" : "text-[#8A1C14]";
  const accentBg = isDark ? "bg-[#3f1915]" : "bg-[#8A1C14]";
  const accentBgHover = isDark ? "hover:bg-[#4f231e]" : "hover:bg-[#72150e]";

  return (
    <div id="search-section" className="w-full text-left space-y-6">
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Step 1: Main Category Input */}
        <div className="space-y-2">
          <label 
            htmlFor="product-search-input" 
            className={`font-serif text-sm font-bold tracking-tight block ${
              isDark ? "text-stone-300" : "text-stone-800"
            }`}
          >
            I. Enter Product Class or Category
          </label>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <input
                id="product-search-input"
                type="text"
                className={`w-full py-3.5 px-4 rounded-none border outline-none font-sans text-base transition-all ${
                  isDark 
                    ? "bg-stone-900 border-stone-700 text-stone-100 placeholder-stone-500 focus:border-orange-500" 
                    : "bg-white border-stone-300 text-stone-950 placeholder-stone-400 focus:border-[#8A1C14]"
                }`}
                placeholder="E.g., wireless headphones, robot vacuum, dual air fryer..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isLoading}
              />
              
              {query && !isLoading && (
                <button
                  type="button"
                  id="clear-query-button"
                  onClick={handleClear}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 text-xs uppercase tracking-widest font-mono select-none ${
                    isDark ? "text-stone-400 hover:text-white" : "text-stone-500 hover:text-stone-800"
                  }`}
                  title="Clear input"
                >
                  [Clear]
                </button>
              )}
            </div>

            <button
              id="search-submit-button"
              type="submit"
              className={`py-3.5 px-6 font-serif uppercase tracking-widest text-xs font-bold transition-colors text-white rounded-none cursor-pointer select-none text-nowrap ${accentBg} ${accentBgHover}`}
              disabled={isLoading || !query.trim()}
            >
              {isLoading ? "Running Analysis..." : "Compile Consensus"}
            </button>
          </div>
        </div>

        {/* Step 2: Custom Constraints & Priorities */}
        <div className={`border-t border-b py-6 ${
          isDark ? "border-stone-800" : "border-stone-200"
        } space-y-6`}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Custom wishes column */}
            <div className="space-y-3">
              <div>
                <label 
                  htmlFor="user-wishes-textarea" 
                  className={`font-serif text-sm font-bold block ${
                    isDark ? "text-stone-300" : "text-[#1a1a1a]"
                  }`}
                >
                  II. Tailor to Custom Demands
                </label>
                <span className={`text-xs block mt-0.5 ${isDark ? "text-stone-500" : "text-stone-500"}`}>
                  Specify budgets, dimensions, or strictly desired attributes.
                </span>
              </div>

              <textarea
                id="user-wishes-textarea"
                maxLength={150}
                placeholder="E.g., Must be under $150, fits small cabinets, prefer durable metal build..."
                className={`w-full text-xs p-3 rounded-none outline-none font-sans resize-none h-20 transition-all ${
                  isDark 
                    ? "bg-stone-900 border-stone-700 text-stone-200 placeholder-stone-500 focus:border-orange-500" 
                    : "bg-white border-stone-300 text-stone-800 placeholder-stone-400 focus:border-[#8A1C14]"
                }`}
                value={wishes}
                onChange={(e) => setWishes(e.target.value)}
                disabled={isLoading}
              />
              <div className="flex justify-between text-[11px] font-mono text-stone-450">
                <span>Add any specific target requirements</span>
                <span>{wishes.length}/150 char limit</span>
              </div>
            </div>

            {/* Custom rank priority criteria */}
            <div className="space-y-3">
              <div>
                <span className={`font-serif text-sm font-bold block ${
                  isDark ? "text-stone-300" : "text-[#1a1a1a]"
                }`}>
                  III. Weighted Choice Focus
                </span>
                <span className="text-xs block mt-0.5 text-stone-500">
                  Select the main metric our scoring engine should favor.
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {PRIORITIES.map((p) => {
                  const isSelected = priority === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPriority(p.id)}
                      className={`text-left p-3 border rounded-none transition-all select-none cursor-pointer ${
                        isSelected 
                          ? isDark
                            ? "bg-stone-800 border-orange-500 text-white"
                            : "bg-amber-50/70 border-[#8A1C14] text-stone-950"
                          : isDark
                            ? "bg-stone-900/50 border-stone-800 text-stone-400 hover:border-stone-700"
                            : "bg-stone-50/50 border-stone-205 text-stone-600 hover:border-stone-400"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className={`h-2.5 w-2.5 rounded-none border border-current flex items-center justify-center text-[8px] font-mono ${
                          isSelected ? accentText : "text-stone-400"
                        }`}>
                          {isSelected ? "■" : ""}
                        </span>
                        <p className={`text-xs font-bold ${isSelected ? accentText : ""}`}>{p.label}</p>
                      </div>
                      <p className={`text-[10px] mt-1 leading-snug line-clamp-1 ${
                        isSelected ? "text-stone-800 dark:text-stone-300" : "text-stone-500"
                      }`}>
                        {p.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Quick presets row */}
          <div className="pt-4 border-t border-dashed border-stone-300 dark:border-stone-800 flex flex-wrap items-center gap-3 text-xs">
            <span className="font-serif italic text-stone-500">Preset alignment templates:</span>
            {[
              { label: "High-Value Budget", text: "Price is under $150, durable but high consumer scoring", prio: "balanced" },
              { label: "Quiet & Heavy-duty", text: "Quiet operation levels, commercial build reliability", prio: "premium" },
              { label: "Ultra Portable", text: "Folds flat or compact, fits in baggage, travel optimized", prio: "portable" }
            ].map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => applyWishPreset(preset.text, preset.prio)}
                className={`py-1 px-2.5 border rounded-none text-[11px] font-mono transition-all cursor-pointer ${
                  isDark 
                    ? "bg-stone-900 border-stone-700 text-stone-300 hover:border-orange-500 hover:text-white" 
                    : "bg-white border-stone-300 text-stone-700 hover:border-[#8A1C14] hover:text-[#8A1C14]"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

        </div>

      </form>
    </div>
  );
}
