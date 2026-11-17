import React from 'react';

interface RedWatercolorSunProps {
  className?: string;
}

export default function RedWatercolorSun({ className = '' }: RedWatercolorSunProps) {
  return (
    <div className={`animate-sun-breath pointer-events-none select-none relative ${className}`}>
      <svg
        viewBox="0 0 300 300"
        className="w-full h-full drop-shadow-sm filter blur-[0.3px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="sunWatercolorGrad" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#D32F2F" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#B71C1C" stopOpacity="0.9" />
            <stop offset="85%" stopColor="#8B1E2D" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#6D1521" stopOpacity="0.75" />
          </radialGradient>

          {/* Watercolor Edge Texture Filter */}
          <filter id="sunWatercolorTexture">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        {/* Outer subtle glow ring */}
        <circle
          cx="150"
          cy="150"
          r="142"
          fill="#8B1E2D"
          opacity="0.12"
        />

        {/* Main Sun Circle with Washi Watercolor Texture */}
        <circle
          cx="150"
          cy="150"
          r="135"
          fill="url(#sunWatercolorGrad)"
          filter="url(#sunWatercolorTexture)"
        />

        {/* Soft atmospheric overlay */}
        <circle
          cx="135"
          cy="125"
          r="90"
          fill="#FAF8F5"
          opacity="0.08"
        />
      </svg>
    </div>
  );
}
