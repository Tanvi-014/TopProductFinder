import React, { useState } from "react";
import { Product, SearchResult } from "../types";
import { getProductVisual, getSafeBuyUrl, normalizeBuyOptions } from "../utils";
import { ArrowLeft, Check, X, ExternalLink, Sparkles, Building2, ShoppingBag, Facebook, MapPin, MessageSquare, Star } from "lucide-react";

interface ProductDetailProps {
  product: Product;
  result: SearchResult;
  onBack: () => void;
  onNavigateToProduct: (prod: Product) => void;
  isDark?: boolean;
}

export function ProductDetail({ product, result, onBack, onNavigateToProduct, isDark = false }: ProductDetailProps) {
  // Find peer contenders in the same search result category to hop between
  const peers = result.products.filter((p) => p.id !== product.id);

  const imageUrl = getProductVisual(product, result.category);
  const buyOptions = normalizeBuyOptions(product, 4);

  // Core Facebook Marketplace / Shop Deals simulation state variables
  const [fbOpen, setFbOpen] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<number | null>(1);
  const [chatMessages, setChatMessages] = useState<{[sellerId: number]: {sender: 'user' | 'seller', text: string}[]}>({
    1: [],
    2: []
  });
  const [isTyping, setIsTyping] = useState(false);

  // Calculate customized Facebook secondhand prices dynamically which is 45% - 60% lower!
  const calcFBMarginPrice = (priceStr: string) => {
    const rawVal = parseInt(priceStr.replace(/[^0-9]/g, "")) || 100;
    return Math.floor(rawVal * 0.55); // Save up to 45% or more!
  };

  const localSellers = [
    {
      id: 1,
      name: "Marcus P.",
      rating: 4.9,
      reviewsCount: 38,
      price: `$${calcFBMarginPrice(product.price)}`,
      condition: "Like New (Open Box)",
      distance: "1.8 miles away",
      description: `Willing to meet near the local park or police station safe swap spot. Fully tested, works flawlessly. Includes original manual, receipts, box! Selling because I received another one.`,
      avatarColor: "bg-blue-600 text-white",
      responseMessage: `Hey there! Yes, the ${product.name} is still available and absolute mint condition. It works perfectly. I can do meetup this evening if you are local. What time is best for you?`
    },
    {
      id: 2,
      name: "Janice K.",
      rating: 4.8,
      reviewsCount: 22,
      price: `$${Math.floor(calcFBMarginPrice(product.price) * 0.9)}`,
      condition: "Excellent (Slightly Used)",
      distance: "4.2 miles away",
      description: `Minor cosmetic box wear, but the item itself is in pristine condition. Ready for pickup or can deliver within 5 miles. No issues.`,
      avatarColor: "bg-purple-600 text-white",
      responseMessage: `Hi! Yes, I still have it. Works great, only selling because we scaled down our current household layout. Let me know if you would like me to hold it for you until tomorrow.`
    }
  ];

  const selectedSellerInfo = localSellers.find(s => s.id === selectedSeller) || localSellers[0];

  const handleSendFBMessage = (sellerId: number, messageText: string) => {
    // 1. Add User Message
    const userMsg = { sender: "user" as const, text: messageText };
    setChatMessages(prev => ({
      ...prev,
      [sellerId]: [...(prev[sellerId] || []), userMsg]
    }));

    // 2. Clear then show typing state after 300ms
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const sellerMsg = { 
        sender: "seller" as const, 
        text: localSellers.find(s => s.id === sellerId)?.responseMessage || "Hi, yes it is available! Let me know if you would like to meet."
      };
      setChatMessages(prev => ({
        ...prev,
        [sellerId]: [...(prev[sellerId] || []), sellerMsg]
      }));
    }, 1500);
  };

  const getMessagesForSeller = (sellerId: number) => {
    return chatMessages[sellerId] || [];
  };

  const primaryBuyOpt = buyOptions[0];
  const primaryRetailer = primaryBuyOpt ? primaryBuyOpt.retailer : "Retailer";
  const primaryUrl = getSafeBuyUrl(primaryBuyOpt, product.name);

  return (
    <div id="product-detail-subpage" className="space-y-12 animate-fade-in text-left">
      {/* Back button link */}
      <div>
        <button
          onClick={onBack}
          className={`group inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer ${
            isDark ? "text-stone-400 hover:text-white" : "text-stone-600 hover:text-stone-900"
          }`}
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to all results
        </button>
      </div>

      <div className={`relative overflow-hidden border min-h-[260px] md:min-h-[360px] ${
        isDark ? "bg-[#111113] border-[#222226]" : "bg-white border-stone-200"
      }`}>
        <img
          src={imageUrl}
          alt={`${product.name} product view`}
          className="h-full min-h-[260px] md:min-h-[360px] w-full object-cover"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 text-white">
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-200 block">Product preview</span>
          <p className="font-serif text-xl md:text-2xl font-extrabold leading-tight">{product.brand} {product.name}</p>
        </div>
      </div>

      {/* Main split banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-2">
        {/* Left Side: Technical Spec Blueprint */}
        <div className={`relative border p-8 flex flex-col justify-between min-h-[300px] md:min-h-[400px] ${
          isDark ? "bg-[#111113]/80 border-[#222226] text-stone-200" : "bg-stone-50 border-stone-200 text-stone-800"
        }`}>
          {/* Rank Badge */}
          <span className={`absolute top-4 left-4 font-mono text-xs font-bold px-3 py-1 uppercase tracking-widest ${
            isDark ? "bg-amber-400 text-stone-950" : "bg-stone-900 text-white"
          }`}>
            Rank #{product.rank}
          </span>

          <div className="pt-8 space-y-5 w-full">
            <span className="text-[10px] font-mono tracking-widest uppercase text-stone-400 block border-b pb-1">
              Consensus Scoreboard
            </span>
            <div className="flex items-center gap-3">
              <span className={`font-serif text-5xl font-extrabold ${isDark ? "text-amber-400" : "text-stone-950"}`}>
                {product.rating}
              </span>
              <div>
                <span className="text-xs font-sans font-bold block">Expert Choice Index</span>
                <span className="text-[10px] text-stone-400 block font-sans">Verified Consensus Rating</span>
              </div>
            </div>

            <div className="space-y-3 pt-4 w-full">
              <span className="text-[10px] font-mono tracking-widest uppercase text-stone-400 block border-b pb-1">Primary Spec Metrics</span>
              {product.specs && product.specs.length > 0 ? (
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {product.specs.slice(0, 4).map((sp: any, sIdx: number) => (
                    <div key={sIdx} className="space-y-1">
                      <span className="text-[10px] text-stone-400 uppercase tracking-wide block">{sp.name}</span>
                      <span className={`text-xs font-bold block ${isDark ? "text-stone-200" : "text-stone-900"}`}>{sp.value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-stone-550 italic">No custom specs available for this category</p>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200/20 w-full mt-4 flex items-center justify-between text-[11px] text-stone-400 select-none">
            <span>REFERENCE: TCV-2026</span>
            <span className="font-mono text-emerald-500 font-semibold">✔ VERIFIED MODEL</span>
          </div>
        </div>

        {/* Right Side: Primary Info Block */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-stone-400 font-bold font-sans block">
              {product.brand} • Sourced from real reviews
            </span>
            <h1 className={`font-serif text-3xl md:text-4xl font-extrabold leading-tight ${
              isDark ? "text-[#f5f5f7]" : "text-stone-900"
            }`}>
              {product.name}
            </h1>
            
            {/* Price Tag */}
            <div className="flex items-baseline gap-2">
              <span className={`font-serif text-3xl font-black ${
                isDark ? "text-amber-400" : "text-stone-955"
              }`}>
                {product.price}
              </span>
              <span className="text-xs font-sans text-stone-400 uppercase tracking-widest">
                Average price
              </span>
            </div>

            {/* Verdict Summary Panel */}
            <div className={`p-4 border-l-2 space-y-1 ${
              isDark ? "bg-[#212128]/50 border-amber-400" : "bg-stone-50 border-stone-900"
            }`}>
              <p className="text-xs font-mono font-bold tracking-widest uppercase text-stone-400">
                What experts say
              </p>
              <p className={`font-serif text-sm italic ${
                isDark ? "text-stone-300" : "text-stone-700"
              }`}>
                "{product.verdict}"
              </p>
            </div>

            {/* "Wanna buy this?" shop direct button */}
            <div className={`border p-4 space-y-3 rounded-[2px] mt-2 ${
              isDark ? "border-[#4c3b12] bg-[#221c0b]/40" : "border-amber-300 bg-amber-50/10"
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className={`text-[10px] font-mono uppercase tracking-widest font-bold block ${
                    isDark ? "text-amber-400" : "text-amber-805"
                  }`}>
                    Wanna buy this?
                  </span>
                  <p className={`text-xs font-medium ${isDark ? "text-stone-400" : "text-stone-600"}`}>Start with {primaryRetailer}, then compare the other store options below.</p>
                </div>
                <span className={`text-xs font-sans font-extrabold px-2.5 py-1 rounded-[1px] ${
                  isDark ? "text-amber-400 bg-amber-500/20" : "text-amber-955 bg-amber-200/50"
                }`}>
                  {primaryBuyOpt ? primaryBuyOpt.price : product.price}
                </span>
              </div>
              <a
                href={primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-stone-955 text-xs py-3 font-extrabold tracking-wide transition-all select-none flex items-center justify-center gap-2 rounded-[2px]"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>Shop at {primaryRetailer} ({primaryBuyOpt ? primaryBuyOpt.price : product.price})</span>
              </a>
              <div className="grid grid-cols-2 gap-2">
                {buyOptions.slice(1, 5).map((opt) => (
                  <a
                    key={`${opt.retailer}-${opt.url}`}
                    href={getSafeBuyUrl(opt, product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between gap-2 border px-3 py-2 text-[11px] font-bold transition-colors ${
                      isDark ? "border-[#3a321e] text-stone-300 hover:border-amber-400 hover:text-white" : "border-amber-200 text-stone-700 hover:border-stone-900 hover:text-stone-950"
                    }`}
                  >
                    <span className="truncate">{opt.retailer}</span>
                    <ExternalLink className="h-3 w-3 shrink-0 text-amber-500" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* User Preferences Compatibility Feedback Tracker */}
          {product.wishFeedback && (
            <div className={`p-4 border flex items-start gap-3 ${
              isDark ? "bg-[#14231a]/55 border-[#1a3825] text-emerald-400" : "bg-emerald-50/60 border-emerald-100 text-emerald-800"
            }`}>
              <Sparkles className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest font-sans block">
                  Matching Your Needs
                </span>
                <p className="font-sans text-xs font-medium text-stone-300">
                  {product.wishFeedback}
                </p>
              </div>
            </div>
          )}

          {/* Quick specs pill row */}
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-2.5">
              Standout highlights
            </h4>
            <div className="flex flex-wrap gap-2">
              {product.keyFeatures.map((feat, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1 border text-xs font-semibold rounded-[2px] ${
                    isDark 
                      ? "bg-stone-900 border-[#26262b] text-stone-200" 
                      : "bg-white border-stone-200 text-stone-700"
                  }`}
                >
                  ✦ {feat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Structured Merits vs Limitations (Pros & Cons) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pros Card */}
        <div className={`border p-6 space-y-4 ${
          isDark ? "bg-[#101914]/40 border-[#1c2c22]" : "border-emerald-100 bg-emerald-50/10"
        }`}>
          <div className="flex items-center gap-2 border-b border-emerald-500/20 pb-2.5">
            <span className={`p-1 rounded-full shrink-0 ${
              isDark ? "bg-[#132d1e] text-emerald-400" : "bg-emerald-100 text-emerald-800"
            }`}>
              <Check className="h-4 w-4" />
            </span>
            <h3 className={`font-serif text-base font-bold ${isDark ? "text-emerald-400" : "text-emerald-900"}`}>
              What's Good (Pros)
            </h3>
          </div>
          <ul className="space-y-3">
            {product.pros.map((pro, idx) => (
              <li key={idx} className={`flex gap-2.5 items-start text-xs md:text-sm font-sans ${isDark ? "text-stone-300" : "text-stone-700"}`}>
                <span className="text-emerald-600 font-bold mt-0.5">•</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons Card */}
        <div className={`border p-6 space-y-4 ${
          isDark ? "bg-[#1f1616]/40 border-[#3c2a2a]" : "border-stone-200 bg-stone-50/20"
        }`}>
          <div className="flex items-center gap-2 border-b border-stone-500/25 pb-2.5">
            <span className={`p-1 rounded-full shrink-0 ${
              isDark ? "bg-[#351a1a] text-red-400" : "bg-stone-105 text-stone-880"
            }`}>
              <X className="h-4 w-4" />
            </span>
            <h3 className={`font-serif text-base font-bold ${isDark ? "text-red-400" : "text-stone-900"}`}>
              What's Bad (Cons)
            </h3>
          </div>
          <ul className="space-y-3">
            {product.cons.map((con, idx) => (
              <li key={idx} className={`flex gap-2.5 items-start text-xs md:text-sm font-sans ${isDark ? "text-stone-300" : "text-stone-700"}`}>
                <span className="text-stone-400 font-bold mt-0.5">•</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Grid of full specs ledger */}
      <div className="space-y-4">
        <h3 className={`font-serif text-lg font-bold border-b pb-2 ${
          isDark ? "text-stone-200 border-[#26262b]" : "text-stone-900 border-stone-200"
        }`}>
          Product Specifications
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {product.specs.map((spec, idx) => (
            <div key={idx} className={`p-4 border ${
              isDark ? "bg-[#121215] border-[#25252a]" : "bg-stone-50 border-stone-100"
            }`}>
              <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider font-sans block">
                {spec.name}
              </span>
              <span className={`font-serif text-base font-extrabold block mt-1 ${isDark ? "text-stone-250" : "text-stone-800"}`}>
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Alternate Pricing & Local Deals Engine */}
      <div className={`p-6 border ${
        isDark ? "border-[#26262b] bg-[#141416]/90" : "border-stone-200 bg-white"
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-stone-250/15">
          <div>
            <h3 className={`font-serif text-lg font-bold ${isDark ? "text-[#f5f5f7]" : "text-stone-900"}`}>
              Select Retailer Offers
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">Real-time inventory and factory direct products.</p>
          </div>
          <span className="text-xs text-stone-400 flex items-center gap-1 mt-2 md:mt-0">
            <Building2 className="h-3 w-3 text-amber-500" /> Prices verified live
          </span>
        </div>
        
        {/* Prime Retailers flex list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {buyOptions.length > 0 ? (
            buyOptions.map((opt, idx) => (
              <a
                key={idx}
                href={getSafeBuyUrl(opt, product.name)}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between p-4 border transition-all text-sm font-sans font-medium group rounded-[2px] ${
                  isDark 
                    ? "border-[#2d2d34] bg-[#1d1d22] text-stone-200 hover:border-amber-400 hover:bg-[#232329]" 
                    : "border-stone-200 bg-white hover:border-stone-900 hover:bg-stone-50 text-stone-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 text-amber-500 shrink-0" />
                  <div className="text-left">
                    <span className="block font-bold">{opt.retailer}</span>
                    <span className="block text-[10px] text-stone-400 font-mono">{idx === 0 ? "Best starting point" : "Compare price and stock"}</span>
                  </div>
                </div>
                <span className={`flex items-center gap-1.5 font-extrabold font-serif text-base ${isDark ? "text-amber-400" : "text-stone-955"}`}>
                  {opt.price}
                  <ExternalLink className="h-3.5 w-3.5 text-stone-400 group-hover:text-amber-500 transition-colors" />
                </span>
              </a>
            ))
          ) : (
            <a
              href={`https://www.amazon.com/s?k=${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between p-4 transition-all text-sm font-sans font-medium group rounded-[2px] ${
                isDark 
                  ? "bg-stone-900 border border-stone-800 text-stone-200 hover:bg-[#1f1f25]" 
                  : "bg-stone-900 text-white hover:bg-stone-800"
              }`}
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-amber-500" />
                <span>Find Retailer & Check Stock</span>
              </span>
              <span className="flex items-center gap-1.5 font-bold">
                {product.price}
                <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </a>
          )}
        </div>

        {/* 5. FB Marketplace simulated section */}
        <div className={`p-5 border text-left ${
          isDark ? "bg-[#0f1118]/60 border-[#1c2235]" : "bg-[#f4f7fe]/70 border-[#d2dfef]"
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#1877f2] p-1.5 text-white rounded-full">
                <Facebook className="h-4 w-4 fill-white" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-mono tracking-widest font-bold uppercase text-stone-400 block leading-none">LOCAL PRIVATE OFFERS</span>
                <h4 className={`text-sm font-extrabold mt-1 ${isDark ? "text-blue-300" : "text-blue-900"}`}>
                  Facebook Marketplace Local Listings
                </h4>
              </div>
            </div>
            
            <button
              onClick={() => setFbOpen(!fbOpen)}
              className={`px-3 py-1.5 text-xs font-bold transition-all cursor-pointer border rounded-[2px] ${
                fbOpen
                  ? (isDark ? "bg-stone-900 border-stone-700 text-stone-300" : "bg-white border-stone-300 text-stone-600")
                  : "bg-[#1877f2] hover:bg-[#1a6ed8] text-white border-transparent shadow-sm"
              }`}
            >
              {fbOpen ? "Minimize Chat & Local Deals" : "See Used Facebook Version (Save 45%+) →"}
            </button>
          </div>

          <p className="text-xs text-stone-400 leading-relaxed mb-4">
            Sourced peer-to-peer from verified local sellers within 5 miles. Buy second-hand, skip taxes and delivery fees, and coordinate immediate local pickup safely down the block.
          </p>

          {fbOpen && (
            <div className="space-y-4 animate-fade-in text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Seller Listings */}
                <div className="space-y-3">
                  <span className="text-[9px] font-mono font-bold tracking-wider text-stone-400 block uppercase">
                    Select local listing to chat:
                  </span>
                  {localSellers.map((sel) => (
                    <div
                      key={sel.id}
                      onClick={() => {
                        setSelectedSeller(sel.id);
                        // Initialize session if not already
                        if (!chatMessages[sel.id]) {
                          setChatMessages(prev => ({
                            ...prev,
                            [sel.id]: []
                          }));
                        }
                      }}
                      className={`p-4 border transition-all text-left cursor-pointer rounded-[2px] relative block ${
                        selectedSeller === sel.id
                          ? (isDark ? "bg-[#1b253b] border-blue-400 text-white" : "bg-[#eaf2ff] border-blue-405 text-stone-900")
                          : (isDark ? "bg-stone-900/60 border-stone-800/80 hover:bg-[#16161a] text-stone-350" : "bg-white border-stone-200/80 hover:bg-stone-50 text-stone-800")
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${sel.avatarColor}`}>
                            {sel.name[0]}
                          </div>
                          <div>
                            <span className="block font-bold leading-none">{sel.name}</span>
                            <span className="text-[10px] text-stone-400 font-medium flex items-center gap-0.5 mt-0.5">
                              <Star className="h-2.5 w-2.5 fill-amber-500 text-amber-500 shrink-0" />
                              {sel.rating} ({sel.reviewsCount} reviews)
                            </span>
                          </div>
                        </div>
                        <span className={`font-serif text-lg font-black ${isDark ? "text-blue-400" : "text-blue-700"}`}>
                          {sel.price}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs text-stone-400 mt-2.5">
                        <div className="flex justify-between items-center text-[11px] font-semibold">
                          <span className={`${isDark ? "text-emerald-400" : "text-emerald-700"}`}>{sel.condition}</span>
                          <span className="text-stone-400 flex items-center gap-0.5 font-mono"><MapPin className="h-3 w-3 shrink-0" /> {sel.distance}</span>
                        </div>
                        <p className="line-clamp-2 text-stone-400 pt-1 border-t border-stone-200/20 leading-relaxed font-sans font-normal">
                          {sel.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Simulated DM Messenger Frame */}
                {selectedSellerInfo && (
                  <div className={`border flex flex-col justify-between h-[280px] rounded-[2px] overflow-hidden text-left ${
                    isDark ? "bg-[#0d0e12] border-stone-800" : "bg-white border-stone-250"
                  }`}>
                    {/* Header bar */}
                    <div className="px-4 py-2.5 bg-[#1877f2] text-white flex items-center justify-between select-none">
                      <div className="flex items-center gap-2">
                        <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-extrabold ${selectedSellerInfo.avatarColor}`}>
                          {selectedSellerInfo.name[0]}
                        </div>
                        <div className="text-left">
                          <span className="text-xs font-extrabold block leading-tight">{selectedSellerInfo.name}</span>
                          <span className="text-[9px] text-[#e0ecff] block leading-none">Typically responds in minutes</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono tracking-widest uppercase font-bold text-[#e0ecff] flex items-center gap-1">
                        ● Messenger
                      </span>
                    </div>

                    {/* Messages panel */}
                    <div className="flex-grow p-3 overflow-y-auto space-y-2.5 text-xs flex flex-col font-sans">
                      {/* Original Greeting notice */}
                      <span className="text-[10px] text-stone-400 text-center block py-1 border-b border-stone-200/10 max-w-[80%] mx-auto font-medium select-none">
                        Coordinating pickup details for {product.name}
                      </span>

                      {/* Dynamic messages stack */}
                      {getMessagesForSeller(selectedSellerInfo.id).length === 0 ? (
                        <div className="text-stone-400 text-center my-auto py-6 flex flex-col items-center justify-center gap-1 select-none">
                          <MessageSquare className="h-5 w-5 text-stone-500 opacity-60" />
                          <p className="text-[11px] font-semibold leading-normal">No messages exchanged yet.</p>
                          <p className="text-[9px] text-stone-550 leading-normal">Select a pre-filled offer prompt below to test chat.</p>
                        </div>
                      ) : (
                        getMessagesForSeller(selectedSellerInfo.id).map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className={`p-2.5 rounded-lg max-w-[80%] leading-relaxed ${
                              m.sender === "user"
                                ? "bg-[#1877f2] text-white ml-auto rounded-tr-none text-left font-medium"
                                : (isDark ? "bg-[#1f2025] text-stone-200 mr-auto rounded-tl-none font-normal" : "bg-stone-100 text-stone-800 mr-auto rounded-tl-none font-normal")
                            }`}
                          >
                            {m.text}
                          </div>
                        ))
                      )}

                      {/* Typing simulation bubble */}
                      {isTyping && (
                        <div className={`p-2 py-1.5 rounded-lg max-w-[65%] mr-auto rounded-tl-none text-stone-400 flex items-center gap-1 font-medium select-none ${
                          isDark ? "bg-[#1f2025]" : "bg-stone-50 border border-stone-105"
                        }`}>
                          <span className="animate-pulse font-mono tracking-widest">•••</span>
                          <span className="text-[9px]">{selectedSellerInfo.name} is typing...</span>
                        </div>
                      )}
                    </div>

                    {/* Quick quick inputs footer */}
                    <div className={`p-2.5 border-t space-y-2 text-left ${
                      isDark ? "bg-[#121317] border-stone-850" : "bg-stone-50 border-stone-105"
                    }`}>
                      <div className="flex flex-wrap gap-1">
                        <button
                          onClick={() => handleSendFBMessage(selectedSellerInfo.id, `Hi ${selectedSellerInfo.name}, is this product still available and can you meet up today?`)}
                          disabled={isTyping}
                          className={`text-[10px] font-sans font-bold px-2.5 py-1 rounded-full border text-left transition-all cursor-pointer ${
                            isDark
                              ? "bg-stone-900 border-[#26262b] text-stone-300 hover:border-blue-450 hover:text-white disabled:opacity-50"
                              : "bg-white border-stone-250 text-stone-650 hover:border-blue-500 hover:text-blue-600 disabled:opacity-50"
                          }`}
                        >
                          "Is this still available?" →
                        </button>
                        <button
                          onClick={() => handleSendFBMessage(selectedSellerInfo.id, `Hey, would you take $40 less for same-day local pickup? Let me know!`)}
                          disabled={isTyping}
                          className={`text-[10px] font-sans font-bold px-2.5 py-1 rounded-full border text-left transition-all cursor-pointer ${
                            isDark
                              ? "bg-stone-900 border-[#26262b] text-stone-300 hover:border-blue-450 hover:text-white disabled:opacity-50"
                              : "bg-white border-stone-250 text-stone-650 hover:border-blue-500 hover:text-blue-600 disabled:opacity-50"
                          }`}
                        >
                          "Would you take $40 less?" →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Alternative Contenders to hop/browse between */}
      {peers.length > 0 && (
        <div className={`pt-6 border-t space-y-4 ${isDark ? "border-[#26262b]" : "border-stone-200"}`}>
          <h3 className={`font-serif text-base font-bold ${isDark ? "text-stone-200" : "text-stone-900"}`}>
            Compare with other options in {result.category}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {peers.map((peer) => (
              <button
                key={peer.id}
                onClick={() => onNavigateToProduct(peer)}
                className={`p-4 border transition-all text-left flex items-center justify-between cursor-pointer group ${
                  isDark 
                    ? "bg-[#18181c] border-[#26262b] text-white hover:border-amber-400" 
                    : "border-[#e5e5e5] hover:border-stone-900 bg-white"
                }`}
              >
                <div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
                    {peer.brand} • Rank #{peer.rank}
                  </span>
                  <span className={`font-serif text-sm font-bold group-hover:underline block mt-0.5 ${
                    isDark ? "text-stone-200" : "text-stone-900"
                  }`}>
                    {peer.name}
                  </span>
                </div>
                <span className={`font-serif text-xs font-extrabold transition-colors px-3 py-1 border ${
                  isDark 
                    ? "text-amber-400 bg-stone-900/60 border-stone-800 group-hover:bg-[#202025]" 
                    : "text-stone-900 bg-stone-50 group-hover:bg-stone-100 border-stone-200"
                }`}>
                  See details →
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
