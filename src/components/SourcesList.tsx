import { SearchResult } from "../types";

interface SourcesListProps {
  sources: SearchResult["sources"];
  isDark?: boolean;
}

export function SourcesList({ sources, isDark = false }: SourcesListProps) {
  if (!sources || sources.length === 0) return null;

  return (
    <div id="sources-citation-panel" className={`border-t pt-8 mt-12 transition-colors duration-300 ${
      isDark ? "border-stone-850" : "border-stone-300"
    }`}>
      
      {/* Title */}
      <div className="mb-4">
        <h3 className="font-serif text-sm font-bold uppercase tracking-widest text-stone-900 dark:text-stone-100">
          Sources & Citations Evaluated
        </h3>
        <p className={`font-serif text-xs italic ${isDark ? "text-stone-450" : "text-stone-550"} mt-0.5`}>
          The specifications and reviews referenced in this comparative matrix are grounded in the following independent reports:
        </p>
      </div>

      {/* Bibliography table/links list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
        {sources.map((src, i) => (
          <a
            key={i}
            href={src.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-baseline gap-2 py-1.5 focus:outline-none transition-all group border-b ${
              isDark 
                ? "border-stone-850 hover:border-orange-500 text-stone-300 hover:text-white" 
                : "border-stone-200 hover:border-[#8A1C14] text-stone-850 hover:text-[#8A1C14]"
            }`}
          >
            {/* Citation sequence */}
            <span className="font-mono text-[9px] font-bold text-stone-400 select-none">
              [{i + 1}]
            </span>
            
            <div className="overflow-hidden flex-grow">
              <p className="font-serif text-xs font-bold truncate group-hover:underline">
                {src.title}
              </p>
              <p className="font-mono text-[9.5px] text-stone-500 truncate">
                {src.url.replace(/^https?:\/\/(www\.)?/, "")}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
