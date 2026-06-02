import React from "react";
import { Product, SearchResult } from "../types";
import { getProductVisual, normalizeBuyOptions } from "../utils";
import { ArrowRight, Award, Compass, HeartHandshake } from "lucide-react";

interface HomepageHubProps {
  onCategoryLaunch: (category: string) => void;
  onDirectProductLaunch: (product: Product, result: SearchResult) => void;
  isDark?: boolean;
}

type FeaturedProduct = {
  category: string;
  resultSource: Pick<SearchResult, "category" | "summary" | "bestOverall">;
  badge: string;
  reason: string;
  fullProduct: Product;
};

const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    category: "Wireless Headphones",
    resultSource: {
      category: "Over-Ear ANC Headphones",
      summary: "High-end active noise cancelling is benchmarked by Sony WH-1000XM5.",
      bestOverall: "Sony WH-1000XM5",
    },
    badge: "Top Choice",
    reason: "Unmatched noise cancellation paired with a comfortable lightweight build.",
    fullProduct: {
      id: "sony-xm5",
      name: "Sony WH-1000XM5 Wireless Headphones",
      brand: "Sony",
      price: "$348",
      rating: 4.9,
      imageSearchQuery: "sony wh1000xm5 headphones",
      keyFeatures: ["8 mics for active filtering", "30-hr battery with fast charge", "LDAC support"],
      specs: [
        { name: "Battery Life", value: "30 Hours (ANC On)" },
        { name: "Weight", value: "250g" },
        { name: "ANC Strength", value: "Class-leading" },
        { name: "Bluetooth Version", value: "Bluetooth 5.2" },
      ],
      pros: ["Industry-defining active noise cancellation", "Extremely lightweight comfort arc"],
      cons: ["Design does not fold down completely", "Not officially water resistant"],
      verdict: "The benchmark pick for daily commuters seeking quiet, comfort, and polish.",
      rank: 1,
      wishFeedback: "A premium quality standard that handles high-end requirements cleanly.",
      buyOptions: [
        { retailer: "Amazon", price: "$348", url: "https://www.amazon.com/dp/B09XS7JWHH" },
        { retailer: "Best Buy", price: "$349.99", url: "https://www.bestbuy.com/site/sony-wh-1000xm5-wireless-noise-canceling-over-the-ear-headphones-black/6505727.p" },
      ],
    },
  },
  {
    category: "Robot Vacuums",
    resultSource: {
      category: "Robot Vacuums & Mops",
      summary: "Autonomous hard-floor cleaning is led by self-washing dock systems.",
      bestOverall: "Roborock Q Revo S",
    },
    badge: "Smart Wash",
    reason: "Dual mop pads and an autonomous dock make daily floor upkeep easier.",
    fullProduct: {
      id: "roborock-revo",
      name: "Roborock Q Revo S Robot Vacuum and Mop",
      brand: "Roborock",
      price: "$679",
      rating: 4.8,
      imageSearchQuery: "roborock robot vacuum mop dock",
      keyFeatures: ["Dual spinning mops", "Auto wash and dry dock", "5500Pa HyperForce suction"],
      specs: [
        { name: "Suction Power", value: "5500 Pa" },
        { name: "Mop Type", value: "Dual Spin" },
        { name: "Docking Actions", value: "Wash, dry, empty" },
        { name: "Navigation", value: "LiDAR" },
      ],
      pros: ["Excellent hard-floor mop mechanism", "Low-maintenance self-dry system"],
      cons: ["Obstacle detection is less advanced than flagship models", "Rugs may need boundaries"],
      verdict: "A strong pick for tile, hardwood, and multi-room maintenance.",
      rank: 1,
      wishFeedback: "Great for people who want repeated cleaning with less manual upkeep.",
      buyOptions: [{ retailer: "Amazon", price: "$679", url: "https://www.amazon.com/dp/B0CQRV5M89" }],
    },
  },
  {
    category: "Smart Air Fryers",
    resultSource: {
      category: "Air Fryers & Convection",
      summary: "Compact convection cooking is led by easy, consistent basket fryers.",
      bestOverall: "Ninja AF101 Air Fryer",
    },
    badge: "Easiest Cook",
    reason: "Reliable crisping, simple controls, and a compact counter footprint.",
    fullProduct: {
      id: "ninja-af101",
      name: "Ninja AF101 Air Fryer",
      brand: "Ninja",
      price: "$99",
      rating: 4.8,
      imageSearchQuery: "ninja air fryer black",
      keyFeatures: ["4-quart ceramic basket", "105F to 400F range", "Dehydrate function"],
      specs: [
        { name: "Capacity", value: "4 Quarts" },
        { name: "Temperature Range", value: "105F - 400F" },
        { name: "Basket Coating", value: "Ceramic Nonstick" },
        { name: "Wattage", value: "1550 Watts" },
      ],
      pros: ["Even crisping without much fuss", "Dishwasher-safe parts are easy to clean"],
      cons: ["Small for bigger families", "Fan has a moderate hum"],
      verdict: "A dependable pick for fast snacks and everyday healthier frying.",
      rank: 1,
      wishFeedback: "A clean fit for simple countertop cooking and easy maintenance.",
      buyOptions: [{ retailer: "Amazon", price: "$99", url: "https://www.amazon.com/dp/B07FDJMC9Q" }],
    },
  },
];

const CATEGORY_LINKS = [
  { label: "Wireless Headphones", query: "wireless headphones" },
  { label: "Robot Vacuums", query: "robot vacuum" },
  { label: "Smart Air Fryers", query: "air fryer" },
  { label: "Mechanical Keyboards", query: "mechanical keyboard" },
];

function buildSpotlightResult(item: FeaturedProduct): SearchResult {
  const product = {
    ...item.fullProduct,
    buyOptions: normalizeBuyOptions(item.fullProduct, 4),
  };

  return {
    category: item.resultSource.category,
    summary: item.resultSource.summary,
    bestOverall: item.resultSource.bestOverall,
    products: [
      product,
      {
        id: `${product.id}-alternative`,
        name: `Alternative ${item.category} Pick`,
        brand: "Alternative",
        price: product.price,
        rating: 4.3,
        imageSearchQuery: item.category,
        keyFeatures: ["Balanced daily performance", "Comparable feature set"],
        specs: product.specs,
        pros: ["Approachable second option"],
        cons: ["Not the top consensus pick"],
        verdict: "A reasonable fallback if the top pick is unavailable.",
        rank: 2,
        buyOptions: [],
      },
    ],
    compareMatrix: [],
    sources: [],
  };
}

export function HomepageHub({ onCategoryLaunch, onDirectProductLaunch, isDark = false }: HomepageHubProps) {
  const handleSpotlightClick = (item: FeaturedProduct) => {
    const result = buildSpotlightResult(item);
    onDirectProductLaunch(result.products[0], result);
  };

  return (
    <div id="homepage-hub-v2" className="space-y-12 animate-fade-in text-left">
      <div className="space-y-6">
        <div className={`flex items-center justify-between border-b pb-2.5 ${isDark ? "border-[#26262b]" : "border-stone-200"}`}>
          <h3 className={`font-serif text-lg md:text-xl font-bold flex items-center gap-2 ${isDark ? "text-[#f5f5f7]" : "text-stone-900"}`}>
            <Award className="h-5 w-5 text-stone-400 shrink-0" />
            Spotlight Picks: Highly Recommended
          </h3>
          <span className="text-xs font-sans text-stone-400 font-medium font-mono">Updated today</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_PRODUCTS.map((item) => {
            const imageUrl = getProductVisual(item.fullProduct, item.category);
            return (
              <button
                key={item.fullProduct.id}
                type="button"
                className={`p-5 flex flex-col justify-between group transition-all cursor-pointer relative border text-left ${
                  isDark
                    ? "bg-[#18181c] border-[#222226] text-stone-200 hover:border-amber-400 hover:bg-[#1d1d23]"
                    : "bg-white border-[#e5e5e5] text-stone-850 hover:border-stone-955"
                }`}
                onClick={() => handleSpotlightClick(item)}
              >
                <span className={`absolute top-4 right-4 z-20 text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider border ${
                  isDark ? "bg-stone-900 border-stone-800 text-amber-400" : "bg-stone-50 border-stone-200 text-stone-600"
                }`}>
                  {item.badge}
                </span>

                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold font-sans block">
                    {item.category}
                  </span>

                  <div className={`w-full h-40 mb-2 border relative overflow-hidden select-none ${isDark ? "bg-[#111113] border-[#202025]" : "bg-stone-50 border-stone-200"}`}>
                    <img
                      src={imageUrl}
                      alt={`${item.fullProduct.name} product preview`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-amber-200 block">
                        Preview before details
                      </span>
                      <span className="font-serif text-2xl font-black block leading-none">{item.fullProduct.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-left">
                    <h4 className={`font-serif text-base font-extrabold leading-snug group-hover:underline ${isDark ? "text-stone-100" : "text-stone-900"}`}>
                      {item.fullProduct.brand} {item.fullProduct.name}
                    </h4>
                    <p className={`font-sans text-xs font-medium pt-1 line-clamp-2 ${isDark ? "text-stone-405" : "text-stone-500"}`}>
                      {item.reason}
                    </p>
                  </div>
                </div>

                <div className={`flex justify-between items-center border-t pt-4 mt-6 ${isDark ? "border-[#212126]" : "border-stone-100"}`}>
                  <span className={`font-serif text-base font-extrabold ${isDark ? "text-amber-400" : "text-stone-955"}`}>
                    {item.fullProduct.price}
                  </span>
                  <span className={`text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 group-hover:underline transition-all ${
                    isDark ? "text-stone-300 group-hover:text-white" : "text-stone-600 group-hover:text-stone-950"
                  }`}>
                    See Details
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <div className={`flex items-center gap-2 border-b pb-2.5 ${isDark ? "border-[#26262b]" : "border-stone-200"}`}>
          <Compass className="h-5 w-5 text-stone-400 shrink-0" />
          <h3 className={`font-serif text-lg font-bold ${isDark ? "text-[#f5f5f7]" : "text-stone-900"}`}>
            Popular Categories
          </h3>
        </div>

        <p className={`font-sans text-xs leading-relaxed max-w-xl ${isDark ? "text-stone-450" : "text-stone-500"}`}>
          Browse fast guides with product previews and direct detail pages.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {CATEGORY_LINKS.map((cat) => (
            <button
              key={cat.query}
              onClick={() => onCategoryLaunch(cat.query)}
              className={`p-4 border text-left transition-all cursor-pointer group ${
                isDark ? "bg-[#111113] border-[#222226] hover:border-amber-400 hover:bg-[#18181c]" : "bg-stone-50 border-stone-200 hover:border-stone-950 hover:bg-white"
              }`}
            >
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block select-none">
                Popular Guides
              </span>
              <span className={`font-serif text-sm font-bold block mt-1.5 group-hover:underline ${isDark ? "text-stone-105" : "text-stone-900"}`}>
                {cat.label}
              </span>
              <span className={`text-[10px] font-sans font-bold block mt-3 select-none ${isDark ? "text-amber-400" : "text-stone-500"}`}>
                See Reviews
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className={`p-6 border flex flex-col md:flex-row items-center justify-between gap-6 ${isDark ? "border-[#212126] bg-[#111113]/50" : "border-stone-200 bg-stone-50/50"}`}>
        <div className="space-y-2 text-left max-w-2xl">
          <h4 className={`font-serif text-base font-bold flex items-center gap-2 ${isDark ? "text-[#f5f5f7]" : "text-stone-900"}`}>
            <HeartHandshake className="h-4 w-4 text-stone-500 shrink-0" />
            Our Simple Mission
          </h4>
          <p className={`font-sans text-xs leading-relaxed ${isDark ? "text-stone-400" : "text-stone-600"}`}>
            We help compare product options with clear visuals, expert consensus, and direct places to buy.
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className={`font-serif text-sm font-black select-none block uppercase tracking-tighter ${isDark ? "text-[#f5f5f7]" : "text-stone-900"}`}>
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
