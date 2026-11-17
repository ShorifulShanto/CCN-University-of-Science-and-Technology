import React from 'react';

interface DecorativeWavePatternProps {
  className?: string;
  opacity?: number; // default 0.06 (6%)
}

export default function DecorativeWavePattern({ className = '', opacity = 0.06 }: DecorativeWavePatternProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none z-0 ${className}`}
      style={{ opacity }}
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="seigaiha-pattern" width="60" height="30" patternUnits="userSpaceOnUse">
            {/* Concentric Seigaiha Wave Arcs */}
            <path
              d="M 0,30 A 30,30 0 0,1 60,30 M 5,30 A 25,25 0 0,1 55,30 M 10,30 A 20,20 0 0,1 50,30 M 15,30 A 15,15 0 0,1 45,30 M 20,30 A 10,10 0 0,1 40,30 M 25,30 A 5,5 0 0,1 35,30"
              fill="none"
              stroke="#8B1E2D"
              strokeWidth="1"
            />
            <path
              d="M -30,0 A 30,30 0 0,1 30,0 M -25,0 A 25,25 0 0,1 25,0 M -20,0 A 20,20 0 0,1 20,0 M -15,0 A 15,15 0 0,1 15,0 M -10,0 A 10,10 0 0,1 10,0 M -5,0 A 5,5 0 0,1 5,0"
              fill="none"
              stroke="#8B1E2D"
              strokeWidth="1"
            />
            <path
              d="M 30,0 A 30,30 0 0,1 90,0 M 35,0 A 25,25 0 0,1 85,0 M 40,0 A 20,20 0 0,1 80,0 M 45,0 A 15,15 0 0,1 75,0 M 50,0 A 10,10 0 0,1 70,0 M 55,0 A 5,5 0 0,1 65,0"
              fill="none"
              stroke="#8B1E2D"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#seigaiha-pattern)" />
      </svg>
    </div>
  );
}
