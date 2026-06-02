import React from "react";
import { Sun, Moon } from "lucide-react";

interface HeaderProps {
  onHome?: () => void;
  isDark?: boolean;
  onToggleDark?: () => void;
}

export function Header({ onHome, isDark = false, onToggleDark }: HeaderProps) {
  return (
    <header 
      id="main-header" 
      className={`w-full border-b py-4 px-6 md:px-12 transition-colors duration-200 ${
        isDark ? "bg-[#121212]/90 border-[#26262b] text-white" : "bg-white border-[#e5e5e5] text-[#111111]"
      }`}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Left Side: Logo */}
        <button 
          onClick={onHome}
          id="header-logo" 
          className={`font-serif text-lg font-extrabold tracking-tight select-none hover:opacity-75 transition-opacity cursor-pointer focus:outline-none ${
            isDark ? "text-white" : "text-[#111111]"
          }`}
        >
          TopProductFinder
        </button>

        {/* Right Side: Small Badge & Theme Toggler */}
        <div className="flex items-center gap-3">
          <div 
            id="header-badge" 
            className={`text-xs font-sans px-2.5 py-1 select-none transition-colors border ${
              isDark 
                ? "text-stone-400 bg-stone-900/50 border-[#26262b]" 
                : "text-stone-500 bg-stone-50 border-[#e5e5e5]"
            }`}
          >
            Grounded in expert reviews
          </div>

          {onToggleDark && (
            <button
              onClick={onToggleDark}
              className={`p-1.5 border transition-all cursor-pointer focus:outline-none ${
                isDark 
                  ? "border-[#26262b] bg-stone-900 text-amber-400 hover:bg-stone-850 hover:text-amber-300" 
                  : "border-[#e5e5e5] bg-stone-50 text-stone-600 hover:bg-stone-100 hover:text-stone-900"
              }`}
              title={isDark ? "Activate light mode" : "Activate dark mode"}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

