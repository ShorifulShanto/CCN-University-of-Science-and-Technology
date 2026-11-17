import React, { useMemo } from 'react';

export interface PetalData {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: number;
  className: string;
  rotation: string;
  opacity: number;
}

export default function FloatingPetals() {
  // Reduced amount of deterministic yellow petal elements for subtle, elegant atmosphere
  const petals = useMemo<PetalData[]>(() => {
    return [
      { id: 1, left: '12%', delay: '0s', duration: '22s', size: 14, className: 'petal-item-1', rotation: 'rotate-12', opacity: 0.5 },
      { id: 2, left: '42%', delay: '-7s', duration: '26s', size: 13, className: 'petal-item-3', rotation: 'rotate-45', opacity: 0.4 },
      { id: 3, left: '72%', delay: '-14s', duration: '24s', size: 15, className: 'petal-item-5', rotation: '-rotate-20', opacity: 0.45 },
      { id: 4, left: '88%', delay: '-4s', duration: '28s', size: 12, className: 'petal-item-7', rotation: 'rotate-90', opacity: 0.35 },
    ];
  }, []);

  return (
    <div
      id="floating-yellow-petals-overlay"
      className="fixed inset-0 pointer-events-none overflow-hidden z-20 select-none"
      aria-hidden="true"
    >
      {petals.map((p) => (
        <div
          key={p.id}
          id={`petal-node-${p.id}`}
          className={`absolute pointer-events-none select-none ${p.className}`}
          style={{
            left: p.left,
            top: '-24px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        >
          {/* Organic Yellow Flower Petal SVG with CCNUST Warm Yellow Palette (#F2C94C, #E5A910, #FEF08A) */}
          <svg
            viewBox="0 0 30 30"
            className={`w-full h-full drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] transform ${p.rotation}`}
          >
            <path
              d="M15,0 C23,5 29,13 26,22 C23,29 11,29 5,21 C-1,14 4,4 15,0 Z"
              fill={`url(#ccnYellowPetalGrad-${p.id % 2 === 0 ? 'bright' : 'amber'})`}
              opacity={p.opacity}
            />
            <defs>
              {/* Bright Yellow Petal Gradient */}
              <linearGradient id="ccnYellowPetalGrad-bright" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFBEB" />
                <stop offset="30%" stopColor="#FEF08A" />
                <stop offset="70%" stopColor="#F2C94C" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>

              {/* Warm Amber-Yellow Petal Gradient */}
              <linearGradient id="ccnYellowPetalGrad-amber" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="40%" stopColor="#F2C94C" />
                <stop offset="85%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#B45309" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  );
}
