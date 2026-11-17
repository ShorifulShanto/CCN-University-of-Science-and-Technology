import React from 'react';

export default function PaperTextureOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.06] mix-blend-multiply select-none">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="paper-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#paper-grain)" />
      </svg>
    </div>
  );
}
