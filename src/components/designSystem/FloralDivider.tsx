import React from 'react';

interface FloralDividerProps {
  className?: string;
  variant?: 'flower' | 'plus' | 'simple';
}

export default function FloralDivider({ className = '', variant = 'flower' }: FloralDividerProps) {
  return (
    <div className={`w-full flex items-center justify-center my-12 px-4 animate-fade-up pointer-events-none select-none ${className}`}>
      <div className="max-w-xl w-full flex items-center space-x-4">
        {/* Left Tapered Line */}
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#8B1E2D]/30 to-[#8B1E2D]" />

        {/* Center Floral Crest Motif from Image 2 */}
        <div className="flex items-center space-x-2 text-[#8B1E2D] shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C7A35A]" />
          
          {variant === 'flower' && (
            <svg viewBox="0 0 40 40" className="w-6 h-6 fill-[#8B1E2D]">
              <path d="M20,10 C22,14 26,14 28,10 C28,15 32,17 35,15 C33,19 35,23 38,25 C33,25 31,29 32,34 C28,31 24,32 20,30 C16,32 12,31 8,34 C9,29 7,25 2,25 C5,23 7,19 5,15 C8,17 12,15 12,10 C14,14 18,14 20,10 Z" />
              <circle cx="20" cy="20" r="3" fill="#C7A35A" />
            </svg>
          )}

          {variant === 'plus' && (
            <span className="text-xs font-serif text-[#8B1E2D] font-bold">+</span>
          )}

          <span className="w-1.5 h-1.5 rounded-full bg-[#C7A35A]" />
        </div>

        {/* Right Tapered Line */}
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#8B1E2D]/30 to-[#8B1E2D]" />
      </div>
    </div>
  );
}
