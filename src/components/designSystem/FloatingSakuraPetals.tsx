import React, { useMemo } from 'react';

export default function FloatingSakuraPetals() {
  // Generate 8 lightweight petal elements with fixed deterministic properties to avoid re-renders
  const petals = useMemo(() => {
    return [
      { id: 1, left: '8%', delay: '0s', duration: '14s', size: '14px', className: 'petal-item-1' },
      { id: 2, left: '22%', delay: '-3s', duration: '18s', size: '11px', className: 'petal-item-2' },
      { id: 3, left: '38%', delay: '-7s', duration: '15s', size: '16px', className: 'petal-item-3' },
      { id: 4, left: '52%', delay: '-11s', duration: '20s', size: '12px', className: 'petal-item-4' },
      { id: 5, left: '67%', delay: '-4s', duration: '16s', size: '15px', className: 'petal-item-5' },
      { id: 6, left: '81%', delay: '-9s', duration: '22s', size: '10px', className: 'petal-item-6' },
      { id: 7, left: '91%', delay: '-2s', duration: '17s', size: '13px', className: 'petal-item-7' },
      { id: 8, left: '44%', delay: '-13s', duration: '19s', size: '12px', className: 'petal-item-8' },
    ];
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20 select-none">
      {petals.map((p) => (
        <div
          key={p.id}
          className={`absolute ${p.className}`}
          style={{
            left: p.left,
            top: '-20px',
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        >
          {/* Natural Sakura Petal SVG Shape */}
          <svg viewBox="0 0 30 30" className="w-full h-full drop-shadow-2xs">
            <path
              d="M15,0 C22,6 28,14 25,23 C22,30 11,29 5,22 C-1,15 4,5 15,0 Z"
              fill="url(#petalGrad)"
              opacity="0.82"
            />
            <defs>
              <linearGradient id="petalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F4D9DE" />
                <stop offset="60%" stopColor="#E9B8C4" />
                <stop offset="100%" stopColor="#8B1E2D" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  );
}
