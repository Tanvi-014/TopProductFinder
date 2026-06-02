import React from "react";
import { HelpCircle, Shield, BarChart3, RotateCcw } from "lucide-react";

interface FaqSectionProps {
  isDark?: boolean;
}

export function FaqSection({ isDark = false }: FaqSectionProps) {
  const faqs = [
    {
      icon: <BarChart3 className="h-5 w-5 text-stone-400 shrink-0 mt-0.5" />,
      question: "How do you pick the best products?",
      answer: "We read hundreds of trusted expert reviews, lab reports, and real owner feedback. Then, we look for where they all agree. This helps us find the products that actually perform well and are worth your money."
    },
    {
      icon: <Shield className="h-5 w-5 text-stone-400 shrink-0 mt-0.5" />,
      question: "Are there any paid ads or sponsored reviews?",
      answer: "None. We are completely independent. We do not accept money from brands to feature their products or boost their rankings. Every recommendation is earned purely through real-world performance."
    },
    {
      icon: <HelpCircle className="h-5 w-5 text-stone-400 shrink-0 mt-0.5" />,
      question: "What do the rating dots mean?",
      answer: "The dots show how well a product performed in tests for its most important features (like how quiet a pair of headphones is, or how evenly an air fryer cooks). 5 dots is the highest possible score."
    },
    {
      icon: <RotateCcw className="h-5 w-5 text-stone-400 shrink-0 mt-0.5" />,
      question: "Are the prices and links up to date?",
      answer: "Yes, we verify pricing links across trusted stores like Amazon and Best Buy to save you from searching around for the best deal."
    }
  ];

  return (
    <div id="faq-section-container" className={`pt-12 border-t ${
      isDark ? "border-[#26262b] text-white" : "border-stone-200 text-stone-900"
    }`}>
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <h3 className={`font-serif text-2xl font-bold tracking-tight ${
            isDark ? "text-stone-100" : "text-stone-900"
          }`}>
            Frequently Asked Questions
          </h3>
          <p className={`font-sans text-sm max-w-lg mx-auto ${isDark ? "text-stone-400" : "text-stone-500"}`}>
            How we cut through marketing noise and online reviews to find what actually works.
          </p>
        </div>

        {/* Dynamic FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className={`flex gap-4 p-5 border ${
              isDark ? "bg-[#18181c] border-[#222226]" : "bg-stone-50 border-stone-100/80"
            }`}>
              {faq.icon}
              <div className="space-y-2 text-left">
                <h4 className={`font-sans text-sm font-bold leading-snug ${
                  isDark ? "text-stone-200" : "text-stone-900"
                }`}>
                  {faq.question}
                </h4>
                <p className={`font-sans text-xs leading-relaxed ${
                  isDark ? "text-stone-400" : "text-stone-600"
                }`}>
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badge footer inside Faq */}
        <div className={`p-4 border text-center rounded-[2px] max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 ${
          isDark ? "border-[#26262b] bg-[#111113]/70" : "border-stone-200/60 bg-white"
        }`}>
          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 select-none rounded-[1px] ${
            isDark ? "bg-amber-400 text-stone-950" : "bg-stone-900 text-white"
          }`}>
            100% Unbiased
          </span>
          <span className={`font-sans text-xs ${isDark ? "text-stone-400" : "text-stone-500"}`}>
            Every product is hand-vetted by cross-referencing real-life reviews and test results.
          </span>
        </div>
      </div>
    </div>
  );
}
