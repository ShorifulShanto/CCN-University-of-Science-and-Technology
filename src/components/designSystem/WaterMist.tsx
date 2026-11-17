import React from 'react';

interface WaterMistProps {
  className?: string;
}

export default function WaterMist({ className = '' }: WaterMistProps) {
  return (
    <div className={`w-full h-24 overflow-hidden relative pointer-events-none select-none my-[-2rem] z-10 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FAF8F5] to-transparent animate-mist-drift opacity-15">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-[#F4D9DE]/40">
          <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,-20 1200,40 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </div>
  );
}
