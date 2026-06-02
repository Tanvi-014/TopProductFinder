import React from "react";
import { Product, SearchResult } from "../types";
import { getProductImage } from "../utils";
import { Sparkles, ArrowRight, Award, Compass, HeartHandshake } from "lucide-react";

interface HomepageHubProps {
  onCategoryLaunch: (category: string) => void;
  onDirectProductLaunch: (product: Product, result: SearchResult) => void;
  isDark?: boolean;
}

// Prepare static mock search outcomes representing the default categories
// so our quick-click buttons can feed actual valid data structures to the detail page!
const FEATURED_PRODUCTS_MOCK = [
  {
    category: "Wireless Headphones",
    resultSource: {
      category: "Over-Ear ANC Headphones",
      summary: "High-end Active Noise Cancelling (ANC) is benchmarked by Sony WH-1000XM5.",
      bestOverall: "Sony WH-1000XM5",
      products: [], // Loaded runtime below
      compareMatrix: [],
      sources: []
    },
    brand: "Sony",
    name: "WH-1000XM5",
    price: "$348",
    rating: 4.9,
    badge: "Top Choice",
    reason: "Unmatched noise cancel levels paired with comfortable featherweight arch.",
    fullProduct: {
      id: "sony-xm5",
      name: "Sony WH-1000XM5 Wireless Headphones",
      brand: "Sony",
      price: "$348",
      rating: 4.9,
      imageSearchQuery: "headphones wireless black",
      keyFeatures: ["8 mics for active filtering", "30-hr battery with fast charge", "LDAC support"],
      specs: [
        { name: "Battery Life", value: "30 Hours (ANC On)" },
        { name: "Weight", value: "250g" },
        { name: "ANC Strength", value: "Absolute Class-Leading" },
        { name: "Bluetooth Version", value: "Bluetooth 5.2" }
      ],
      pros: ["Industry-defining active noise cancellation", "Extremely lightweight comfort arc"],
      cons: ["Design does not fold down completely", "Not officially water resistant"],
      verdict: "The absolute best benchmark for daily commuters seeking pure silence.",
      rank: 1,
      wishFeedback: "A peerless quality standard that handles premium requirements flawlessly.",
      buyOptions: [
        { retailer: "Amazon", price: "$348", url: "https://www.amazon.com/dp/B09XS7JWHH" }
      ]
    }
  },
  {
    category: "Robot Vacuums",
    resultSource: {
      category: "Robot Vacuums & Mops",
      summary: "Autonomous hard floor scrubbing benchmarked by Roborock Q Revo.",
      bestOverall: "Roborock Q Revo MaxV",
      products: [],
      compareMatrix: [],
      sources: []
    },
    brand: "Roborock",
    name: "Q Revo S",
    price: "$679",
    rating: 4.8,
    badge: "Smart Wash",
    reason: "Spinning dual mop pads paired with autonomous auto-refill base system.",
    fullProduct: {
      id: "roborock-revo",
      name: "Roborock Q Revo Spinning mop robot",
      brand: "Roborock",
      price: "$679",
      rating: 4.8,
      imageSearchQuery: "robot vacuum mop dock",
      keyFeatures: ["Dual spinning mops", "Auto wash & dry dock", "5500Pa HyperForce suction"],
      specs: [
        { name: "Suction Power", value: "5500 Pa" },
        { name: "Mop Type", value: "Dual Spin (200 RPM)" },
        { name: "Water Tank", value: "4L Clean / 3.5L Dirty" },
        { name: "Docking Actions", value: "Auto Wash, Warm Dry, Empty" }
      ],
      pros: ["Exceptional hard floor mop mechanism", "Low-maintenance self-dry system"],
      cons: ["Obstacle detection is based on bumper first", "Stiffer rugs require manual boundary"],
      verdict: "The perfect companion for tile, hardwood, and multi-room layouts.",
      rank: 1,
      wishFeedback: "Superb dual spinning mops make continuous dry cycles highly independent.",
      buyOptions: [
        { retailer: "Amazon", price: "$679", url: "https://www.amazon.com/dp/B0CQRV5M89" }
      ]
    }
  },
  {
    category: "Smart Air Fryers",
    resultSource: {
      category: "Air Fryers & Convection",
      summary: "High-efficiency kitchen roasting led by Ninja Foodi AF101.",
      bestOverall: "Ninja AF101 Air Fryer",
      products: [],
      compareMatrix: [],
      sources: []
    },
    brand: "Ninja",
    name: "AF101",
    price: "$99",
    rating: 4.8,
    badge: "Easiest Cook",
    reason: "Consistent crisper fan layout with robust temperature controls.",
    fullProduct: {
      id: "ninja-af101",
      name: "Ninja AF101 Air Fryer (4 Quart)",
      brand: "Ninja",
      price: "$99",
      rating: 4.8,
      imageSearchQuery: "air fryer black premium",
      keyFeatures: ["4-quart ceramic basket", "Wide 105°F to 400°F range", "Dehydrate function"],
      specs: [
        { name: "Capacity", value: "4 Quarts" },
        { name: "Temperature Range", value: "105°F - 400°F" },
        { name: "Basket Coating", value: "Ceramic Nonstick" },
        { name: "Wattage", value: "1550 Watts" }
      ],
      pros: ["Consistently even crisping without hot spots", "Dishwasher-safe parts are incredibly easy to preserve"],
      cons: ["Requires a standard pre-heating run (3 minutes)", "The fan can make a moderate humming pitch"],
      verdict: "The undisputed champion of single-family snack preps and healthy air-crunching.",
      rank: 1,
      wishFeedback: "Premium ceramic basket coating provides a clean, toxic-free cooking field.",
      buyOptions: [
        { retailer: "Amazon", price: "$99", url: "https://www.amazon.com/dp/B07FDJMC9Q" }
      ]
    }
  }
];

export function HomepageHub({ onCategoryLaunch, onDirectProductLaunch, isDark = false }: HomepageHubProps) {
  
  const handleSpotlightClick = (item: typeof FEATURED_PRODUCTS_MOCK[0]) => {
    // Construct simulated result state to allow details view
    const simulatedResult: SearchResult = {
      category: item.resultSource.category,
      summary: item.resultSource.summary,
      bestOverall: item.resultSource.bestOverall,
      products: [
        item.fullProduct,
        {
          id: "peer-alternate",
          name: "Peer Contender Choice",
          brand: "Alternative",
          price: "$120",
          rating: 4.3,
          imageSearchQuery: "placeholder generic",
          keyFeatures: ["Standard battery duration", "Eco design frame"],
          specs: [],
          pros: ["Approachable price point"],
          cons: ["Basic feature layout"],
          verdict: "A robust second option.",
          rank: 2,
          buyOptions: []
        }
      ],
      compareMatrix: [],
      sources: []
    };

    onDirectProductLaunch(item.fullProduct, simulatedResult);
  };

  return (
    <div id="homepage-hub-v2" className="space-y-12 animate-fade-in text-left">
      
      {/* SECTION 1: Spotlight picks */}
      <div className="space-y-6">
        <div className={`flex items-center justify-between border-b pb-2.5 ${
          isDark ? "border-[#26262b]" : "border-stone-200"
        }`}>
          <h3 className={`font-serif text-lg md:text-xl font-bold flex items-center gap-2 ${
            isDark ? "text-[#f5f5f7]" : "text-stone-900"
          }`}>
            <Award className="h-5 w-5 text-stone-400 shrink-0" />
            Spotlight Picks: Highly Recommended
          </h3>
          <span className="text-xs font-sans text-stone-400 font-medium font-mono">Updated today</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_PRODUCTS_MOCK.map((item, idx) => {
            const imageUrl = getProductImage(item.brand, item.name, item.category);
            return (
              <div 
                key={idx} 
                className={`p-5 flex flex-col justify-between group transition-all cursor-pointer relative border ${
                  isDark 
                    ? "bg-[#18181c] border-[#222226] text-stone-200 hover:border-amber-400 hover:bg-[#1d1d23]" 
                    : "bg-white border-[#e5e5e5] text-stone-850 hover:border-stone-955"
                }`}
                onClick={() => handleSpotlightClick(item)}
              >
                {/* Visual Label */}
                <span className={`absolute top-4 right-4 text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider border ${
                  isDark 
                    ? "bg-stone-900 border-stone-800 text-amber-400" 
                    : "bg-stone-50 border-stone-200 text-stone-600"
                }`}>
                  {item.badge}
                </span>

                <div className="space-y-4">
                  {/* Category small pill block */}
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold font-sans block">
                    {item.category}
                  </span>

                  {/* Spec Scoreboard Emblem */}
                  <div className={`w-full h-36 flex flex-col justify-center items-start p-5 mb-2 border relative select-none ${
                    isDark ? "bg-[#111113] border-[#202025]" : "bg-stone-50 border-stone-200"
                  }`}>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 block border-b pb-1 w-full">
                      Expert Lab Rating
                    </span>
                    <span className={`font-serif text-3xl font-black block mt-2 ${isDark ? "text-amber-400" : "text-stone-900"}`}>
                      ★ {item.rating}
                    </span>
                    <span className="text-[10px] text-stone-400 block font-sans">Verified Consensus</span>
                  </div>

                  {/* Text details */}
                  <div className="space-y-1 text-left">
                    <h4 className={`font-serif text-base font-extrabold leading-snug group-hover:underline ${
                      isDark ? "text-stone-100" : "text-stone-900"
                    }`}>
                      {item.brand} {item.name}
                    </h4>
                    <p className={`font-sans text-xs font-medium pt-1 line-clamp-2 ${
                      isDark ? "text-stone-405" : "text-stone-500"
                    }`}>
                      {item.reason}
                    </p>
                  </div>
                </div>

                <div className={`flex justify-between items-center border-t pt-4 mt-6 ${
                  isDark ? "border-[#212126]" : "border-stone-100"
                }`}>
                  <span className={`font-serif text-base font-extrabold ${
                    isDark ? "text-amber-400" : "text-stone-955"
                  }`}>
                    {item.price}
                  </span>
                  
                  <span className={`text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 group-hover:underline transition-all ${
                    isDark ? "text-stone-300 group-hover:text-white" : "text-stone-600 group-hover:text-stone-950"
                  }`}>
                    See Details
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Trending Categories Browse Grid */}
      <div className="space-y-4">
        <div className={`flex items-center gap-2 border-b pb-2.5 ${
          isDark ? "border-[#26262b]" : "border-stone-200"
        }`}>
          <Compass className="h-5 w-5 text-stone-400 shrink-0" />
          <h3 className={`font-serif text-lg font-bold ${
            isDark ? "text-[#f5f5f7]" : "text-stone-900"
          }`}>
            Popular Categories
          </h3>
        </div>
        
        <p className={`font-sans text-xs leading-relaxed max-w-xl ${
          isDark ? "text-stone-450" : "text-stone-500"
        }`}>
          Don't know what to search? Check out our quick guides below to find the best-performing products instantly.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {[
            { label: "Wireless Headphones", query: "wireless headphones" },
            { label: "Robot Vacuums", query: "robot vacuum" },
            { label: "Smart Air Fryers", query: "air fryer" },
            { label: "Mechanical Keyboards", query: "mechanical keyboard" }
          ].map((cat, idx) => (
            <button
              key={idx}
              onClick={() => onCategoryLaunch(cat.query)}
              className={`p-4 border text-left transition-all cursor-pointer group ${
                isDark 
                  ? "bg-[#111113] border-[#222226] hover:border-amber-400 hover:bg-[#18181c]" 
                  : "bg-stone-50 border-stone-200 hover:border-stone-950 hover:bg-white"
              }`}
            >
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block select-none">
                Popular Guides
              </span>
              <span className={`font-serif text-sm font-bold block mt-1.5 group-hover:underline ${
                isDark ? "text-stone-105" : "text-stone-900"
              }`}>
                {cat.label}
              </span>
              <span className={`text-[10px] font-sans font-bold block mt-3 select-none ${
                isDark ? "text-amber-400" : "text-stone-500"
              }`}>
                See Reviews →
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 3: Our Core Mission */}
      <div className={`p-6 border flex flex-col md:flex-row items-center justify-between gap-6 ${
        isDark ? "border-[#212126] bg-[#111113]/50" : "border-stone-200 bg-stone-50/50"
      }`}>
        <div className="space-y-2 text-left max-w-2xl">
          <h4 className={`font-serif text-base font-bold flex items-center gap-2 ${
            isDark ? "text-[#f5f5f7]" : "text-stone-900"
          }`}>
            <HeartHandshake className="h-4 w-4 text-stone-500 shrink-0" />
            Our Simple Mission
          </h4>
          <p className={`font-sans text-xs leading-relaxed ${
            isDark ? "text-stone-400" : "text-stone-600"
          }`}>
            Finding honest advice online is hard. Most review sites are full of ads and paid sponsors. Our goal is to make it easy for you: we look at real expert tests and details to find the absolute best options for you, completely free.
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className={`font-serif text-sm font-black select-none block uppercase tracking-tighter ${
            isDark ? "text-[#f5f5f7]" : "text-stone-900"
          }`}>
            EST. 2026 LABS
          </span>
          <span className="text-[10px] font-mono tracking-widest text-stone-400 block mt-0.5">
            EXPERT APPROVED
          </span>
        </div>
      </div>

    </div>
  );
}
