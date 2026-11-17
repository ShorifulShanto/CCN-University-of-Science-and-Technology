import React from 'react';

interface SectionAtmosphereProps {
  variant?: 'light' | 'green' | 'dark';
  showFog?: boolean;
  showSakura?: boolean;
}

export default function SectionAtmosphere({
  variant = 'light',
  showFog = true,
}: SectionAtmosphereProps) {
  const isLight = variant === 'light';

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* Drifting Ambient Fog Layers */}
      {showFog && (
        <>
          <div
            className={`absolute -top-10 left-0 w-[140%] h-28 bg-gradient-to-r from-transparent ${
              isLight ? 'via-white/50' : 'via-slate-800/40'
            } to-transparent blur-xl animate-fog-left opacity-60`}
          />
          <div
            className={`absolute bottom-0 right-0 w-[130%] h-24 bg-gradient-to-r from-transparent ${
              isLight ? 'via-amber-100/20' : 'via-amber-400/5'
            } to-transparent blur-lg animate-fog-right opacity-50`}
          />
        </>
      )}
    </div>
  );
}
