import { useState } from "react";
import { 
  ExternalLink, 
  X,
  Plus
} from "lucide-react";
import { Product } from "../types";
import { getProductImage } from "../utils";
import { motion, AnimatePresence } from "motion/react";

interface ContenderGridProps {
  products: Product[];
  bestOverall: string;
  isDark?: boolean;
}

export function ContenderGrid({ products, bestOverall, isDark = false }: ContenderGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Sort products by rank ascending (rank 1 at top/first)
  const sortedProducts = [...products].sort((a, b) => a.rank - b.rank);

  const handleOpenQuickView = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseQuickView = () => {
    setSelectedProduct(null);
  };

  // Maps score to classic five-point filled dots: ●●●●○
  const renderDots = (rating: number) => {
    // Normalize rating to standard 5-point score
    const scoreOutof5 = rating > 5 ? rating / 2 : rating;
    const filled = Math.round(scoreOutof5);
    const empty = 5 - filled;
    return (
      <span className={`font-mono font-bold whitespace-nowrap ${isDark ? "text-orange-400" : "text-[#8A1C14]"}`} title={`Score: ${rating.toFixed(1)}/10`}>
        {"●".repeat(Math.max(0, Math.min(5, filled)))}
        <span className="opacity-30">{"●".repeat(Math.max(0, Math.min(5, empty)))}</span>
      </span>
    );
  };

  const accentBorder = isDark ? "border-orange-500" : "border-[#8A1C14]";
  const accentText = isDark ? "text-orange-400" : "text-[#8A1C14]";

  return (
    <div id="contender-grid-container" className="my-12">
      
      {/* Newspaper Section Title */}
      <div className={`border-b pb-2 mb-6 flex flex-col sm:flex-row items-baseline justify-between gap-2 ${
        isDark ? "border-stone-800" : "border-stone-300"
      }`}>
        <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          Top-Ranked Evaluated Candidates
        </h2>
        <span className="text-[11px] font-mono text-stone-500">
          Showing {products.length} models indexed by professional consensus
        </span>
      </div>

      {/* Classic Newspaper-style column grid */}
      <div id="contenders-deck" className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sortedProducts.map((product) => {
          const isWinner = product.rank === 1 || product.name === bestOverall;
          const productImage = getProductImage(product.brand, product.name, product.imageSearchQuery || "");

          return (
            <div
              key={product.id}
              id={`product-card-${product.id}`}
              className={`flex flex-col rounded-none border-b md:border-b-0 md:border-r last:border-r-0 pb-6 md:pb-0 md:pr-6 last:pr-0 transition-colors ${
                isDark ? "border-stone-800" : "border-stone-200"
              }`}
            >
              
              {/* Product Photo Replacement - Elegant spec scoring scoreboard */}
              <div className={`relative h-44 border mb-4 rounded-none p-5 flex flex-col justify-between items-start select-none ${
                isWinner 
                  ? isDark ? "bg-[#1f1915] border-orange-500 text-stone-100" : "bg-stone-50 border-[#8A1C14] text-stone-900" 
                  : "bg-stone-100 dark:bg-stone-900 border-stone-300 dark:border-stone-800 text-stone-700 dark:text-stone-305"
              }`}>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 block border-b pb-1 w-full">
                    Consensus Rating Scorecard
                  </span>
                  <div className="flex items-center gap-2 pt-3">
                    <span className="font-serif text-3xl font-black">★ {product.rating}</span>
                    <span className="text-[9px] text-[#8A1C14] dark:text-orange-400 font-bold uppercase tracking-wider block">RANK #{product.rank}</span>
                  </div>
                </div>

                <div className="w-full flex items-center justify-between">
                  {/* Left floating price anchor */}
                  <span className="px-2 py-0.5 bg-[#1a1a1a] text-white font-mono text-[10px] tracking-wider select-none">
                    Average: {product.price}
                  </span>

                  {isWinner && (
                    <div className="bg-[#8A1C14] dark:bg-orange-650 text-white font-serif uppercase text-[8px] tracking-wider font-bold px-1.5 py-0.5 select-none">
                      CONSUMS FAVORITE
                    </div>
                  )}
                </div>
              </div>

              {/* Product metadata */}
              <div className="flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between gap-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#8A1C14] dark:text-orange-400 font-bold">
                      {product.brand}
                    </span>
                    <span className="text-xs font-mono text-stone-500">
                      Rank #{product.rank}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold leading-tight tracking-tight text-stone-900 dark:text-stone-100">
                    {product.name}
                  </h3>

                  {/* Rating dots & price block */}
                  <div className="flex items-center gap-3 py-1 border-t border-b border-dashed border-stone-200 dark:border-stone-800 text-xs">
                    <span className="font-serif italic text-stone-500">Scorecard:</span>
                    {renderDots(product.rating)}
                  </div>

                  {/* Highlights Bullet-points with solid indicators */}
                  <div className="space-y-1.5 pt-1.5">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-stone-500 block">
                      Tested Merits
                    </span>
                    <ul className="space-y-1 text-xs text-stone-700 dark:text-stone-305 pr-2">
                      {product.keyFeatures.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className={`${accentText} font-mono select-none`}>•</span>
                          <span className="leading-tight">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Wish Feedback details tailored cleanly with high content density */}
                  {product.wishFeedback && (
                    <div className="mt-4 p-3 bg-[#FCFBF8] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs space-y-1">
                      <span className="text-[9px] font-mono font-bold tracking-wider text-[#8A1C14] dark:text-orange-400 uppercase block">
                        Constraint Check
                      </span>
                      <p className="font-serif italic leading-relaxed text-stone-700 dark:text-stone-300">
                        "{product.wishFeedback}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Square layout controls (Zero pill shapes) */}
                <div className="mt-6 pt-4 border-t border-dashed border-stone-200 dark:border-stone-800 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenQuickView(product)}
                    className="flex-grow py-2 px-3 border border-stone-400 dark:border-stone-700 hover:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-serif text-xs font-bold rounded-none select-none transition-colors cursor-pointer text-center"
                  >
                    View Ledger Specs
                  </button>
                  
                  <a
                    href={product.buyOptions[0]?.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 bg-[#1a1a1a] search-submit-button hover:bg-stone-800 text-white font-mono text-xs rounded-none transition-colors cursor-pointer flex items-center justify-center`}
                    title={`Buy ${product.name}`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Sheet style overlay details panel */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseQuickView}
              className="absolute inset-0 bg-[#000]/40 backdrop-blur-[1px]"
            ></motion.div>

            {/* Panel styled like a physical review ledger folder */}
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`relative w-full max-w-2xl rounded-none border border-stone-400 shadow-xl z-10 flex flex-col max-h-[90vh] bg-[#FDFBF7] text-[#1a1a1a] dark:bg-stone-900 dark:text-stone-100`}
            >
              {/* Folder tab close */}
              <button
                onClick={handleCloseQuickView}
                className="absolute top-4 right-4 p-1.5 border border-stone-300 dark:border-stone-700 hover:bg-[#8A1C14] hover:text-white transition-colors cursor-pointer"
                title="Return to list"
              >
                <X className="h-3.5 w-3.5" />
              </button>

              <div className="overflow-y-auto flex-grow p-6 sm:p-8 space-y-6">
                
                {/* Heading Block */}
                <div className="space-y-1.5 border-b pb-4 border-stone-300 dark:border-stone-700">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8A1C14] dark:text-orange-400">
                      Specification Folder: {selectedProduct.brand}
                    </span>
                    {selectedProduct.name === bestOverall && (
                      <span className="border border-[#8A1C14] text-[#8A1C14] dark:border-orange-500 dark:text-orange-400 font-serif text-[8px] font-bold uppercase tracking-widest px-1 py-0.2 select-none">
                        Top Pick
                      </span>
                    )}
                  </div>
                  <h2 className="font-serif text-2xl font-bold leading-tight tracking-tight">
                    {selectedProduct.name}
                  </h2>
                </div>

                {/* specs values in catalog table layout */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-stone-500 block">
                    Product Alignment Ledger Log
                  </h4>
                  <div className="grid grid-cols-2 gap-2 border border-stone-200 dark:border-stone-800 bg-[#FAF7F2] dark:bg-stone-950 p-2">
                    {selectedProduct.specs.map((spec, i) => (
                      <div key={i} className="p-3 border-b border-r border-stone-200 last:border-b-0 dark:border-stone-800 flex justify-between items-baseline gap-2">
                        <span className="text-[10px] font-mono uppercase text-stone-500 font-semibold">{spec.name}:</span>
                        <span className="font-serif text-xs font-bold text-stone-800 dark:text-stone-200">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Custom Fit box */}
                {selectedProduct.wishFeedback && (
                  <div className="p-4 border border-[#8A1C14]/30 bg-[#FFFDFC] dark:bg-[#201010] text-[#1a1a1a] dark:text-stone-250">
                    <span className="text-[9px] font-mono font-bold tracking-widest text-[#8A1C14] dark:text-orange-400 uppercase block mb-1">
                      Custom Fit Matrix Fit Evaluation
                    </span>
                    <p className="font-serif text-sm leading-relaxed italic">
                      "{selectedProduct.wishFeedback}"
                    </p>
                  </div>
                )}

                {/* Pros & Cons layout styled like strict ledger listings */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Advantages */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#15803d]" style={{ contentVisibility: "auto" }}>
                      [✔] Positive Qualities Verified
                    </span>
                    <ol className="list-decimal list-inside space-y-1.5 text-xs font-serif text-stone-700 dark:text-stone-300">
                      {selectedProduct.pros.map((pro, i) => (
                        <li key={i} className="leading-relaxed border-b border-stone-200/50 dark:border-stone-800/50 pb-1 last:border-none">
                          <span className="font-sans pl-1 text-[11px] font-medium">{pro}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Drawbacks */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#b91c1c]" style={{ contentVisibility: "auto" }}>
                      [✘] Drawbacks & Vulnerabilities Indicated
                    </span>
                    <ol className="list-decimal list-inside space-y-1.5 text-xs font-serif text-stone-700 dark:text-stone-300">
                      {selectedProduct.cons.map((con, i) => (
                        <li key={i} className="leading-relaxed border-b border-stone-200/50 dark:border-stone-800/50 pb-1 last:border-none">
                          <span className="font-sans pl-1 text-[11px] font-medium">{con}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                </div>

                {/* Expert Verdict */}
                <div className="p-4 border border-stone-300 dark:border-stone-700 bg-stone-100/50 dark:bg-stone-900 leading-relaxed font-serif text-xs italic">
                  <span className="text-[9px] font-mono font-bold text-stone-500 uppercase block tracking-widest not-italic mb-1">
                    Editorial Summary Verdict
                  </span>
                  "{selectedProduct.verdict}"
                </div>

              </div>

              {/* BUYING AND SALES FOOTER - HIGH DENSITY DETAILS */}
              <div className="p-6 border-t border-stone-300 dark:border-stone-700 flex flex-col sm:flex-row items-baseline sm:items-center justify-between gap-4 bg-stone-100/80 dark:bg-stone-950/80">
                <div>
                  <span className="text-[9px] font-mono uppercase text-stone-500 block">Est. Market pricing index</span>
                  <span className="font-serif text-2xl font-black">{selectedProduct.price}</span>
                </div>

                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleCloseQuickView}
                    className="flex-grow sm:flex-none border border-stone-400 hover:border-stone-900 py-2.5 px-4 rounded-none font-serif text-xs font-bold transition-colors cursor-pointer text-center bg-white dark:bg-stone-900"
                  >
                    Dismiss Sheet
                  </button>

                  {selectedProduct.buyOptions.map((opt, i) => (
                    <a
                      key={i}
                      href={opt.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-grow sm:flex-none py-2.5 px-4 font-mono text-xs uppercase tracking-wider text-center transition-colors border shadow-3xs cursor-pointer ${
                        i === 0 
                          ? "bg-[#8A1C14] hover:bg-[#72150e] border-[#8A1C14] text-white" 
                          : "bg-[#1a1a1a] hover:bg-stone-800 border-black text-white"
                      }`}
                    >
                      Buy at {opt.retailer} ({opt.price})
                    </a>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
