interface SummarySectionProps {
  category: string;
  summary: string;
  bestOverall: string;
  isDark?: boolean;
}

export function SummarySection({ category, summary, bestOverall, isDark = false }: SummarySectionProps) {
  const accentBorder = isDark ? "border-orange-500" : "border-[#8A1C14]";
  const accentText = isDark ? "text-orange-400" : "text-[#8A1C14]";
  const accentLightBg = isDark ? "bg-[#301614]" : "bg-[#fcf8f2]";

  return (
    <div id="summary-section-container" className="my-10">
      {/* Category header modeled like a physical newspaper page tracker */}
      <div id="category-badge-row" className={`flex items-center justify-between border-b pb-2 mb-6 ${
        isDark ? "border-stone-800" : "border-stone-300"
      }`}>
        <span className={`text-xs font-mono uppercase tracking-widest ${
          isDark ? "text-stone-400" : "text-stone-600"
        }`}>
          Section III — Product Evaluation: <span className="font-bold underline decoration-dotted">{category}</span>
        </span>
        <span className="text-[10px] font-mono tracking-wider uppercase text-stone-500">
          Independent Consensus Review
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Market Consensus styled as a newspaper review article snippet */}
        <div id="market-consensus-block" className="md:col-span-2 space-y-4">
          <h2 className="font-serif text-2xl lg:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100 leading-tight">
            The Consensus: A Thorough Diagnostic Synthesis
          </h2>
          
          <div className="flex gap-4">
            {/* Elegant Drop cap-inspired or vertical accent marker representing custom quality control */}
            <span className={`h-full w-1 flex-shrink-0 ${
              isDark ? "bg-orange-500" : "bg-[#8A1C14]"
            }`} style={{ minHeight: "80px" }}></span>
            
            <p className={`font-serif text-base leading-relaxed text-stone-880 dark:text-stone-300`}>
              {summary}
            </p>
          </div>
        </div>

        {/* Editors' Pick Spotlight block - styled like a letterpress ink stamp box */}
        <div 
          id="featured-winner-block" 
          className={`p-6 border rounded-none flex flex-col justify-between transition-colors ${accentLightBg} ${
            isDark ? "border-stone-800" : "border-stone-300"
          }`}
        >
          <div className="space-y-4">
            {/* The Classic Ink Stamp style badge */}
            <div className={`border-2 border-double ${accentBorder} ${accentText} px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-widest text-center w-max select-none`}>
              Editors' Pick
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 block">
                Recommended Model
              </span>
              <h3 className="font-serif text-xl font-bold leading-snug tracking-tight text-stone-950 dark:text-stone-100">
                {bestOverall}
              </h3>
            </div>
          </div>

          <div className={`mt-6 pt-4 border-t border-dashed ${
            isDark ? "border-stone-800 text-stone-400" : "border-stone-300 text-stone-600"
          } text-xs leading-relaxed font-sans`}>
            Evaluating specs, diagnostic failure logs, and professional reports indicates this product stands as the market-best.
          </div>
        </div>

      </div>
    </div>
  );
}
