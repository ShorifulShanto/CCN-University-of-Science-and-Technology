import React from 'react';

interface MountainIllustrationProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function MountainIllustration({ className = '', style }: MountainIllustrationProps) {
  return (
    <div className={`pointer-events-none select-none ${className}`} style={style}>
      <svg
        viewBox="0 0 1200 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full mix-blend-multiply opacity-12"
      >
        <defs>
          <linearGradient id="mountainGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#222222" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#7A746D" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FAF8F5" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="mountainGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B1E2D" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#7A746D" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FAF8F5" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Far Background Mountain Ridge */}
        <path
          d="M0,400 L0,220 C120,180 240,250 360,190 C480,130 580,210 700,160 C820,110 940,230 1060,180 L1200,210 L1200,400 Z"
          fill="url(#mountainGrad1)"
        />

        {/* Foreground Mountain Range (Sumi-e Brush Style Peaks) */}
        <path
          d="M0,400 L0,290 C90,260 180,310 270,240 C370,170 450,260 550,210 C650,160 760,280 880,210 C980,150 1100,260 1200,230 L1200,400 Z"
          fill="url(#mountainGrad2)"
        />
      </svg>
    </div>
  );
}
