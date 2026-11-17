import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import heroCampusLandscape from '../assets/images/ccn_hero_campus_1787669009178.jpg';

interface IntroExperienceProps {
  onComplete: () => void;
}

export default function IntroExperience({ onComplete }: IntroExperienceProps) {
  // Phase 0: Initial dark atmosphere (0 - 800ms)
  // Phase 1: University emblem appears with gold radiance (800ms - 2200ms)
  // Phase 2: Fog & Mountain silhouettes reveal (2200ms - 3600ms)
  // Phase 3: Trees, yellow wildflower field & golden sunlight burst (3600ms - 4800ms)
  // Phase 4: Camera glide / dissolve into homepage (4800ms - 5600ms)
  const [phase, setPhase] = useState<number>(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 2000);
    const t3 = setTimeout(() => setPhase(3), 3400);
    const t4 = setTimeout(() => {
      setIsExiting(true);
      const exitTimer = setTimeout(() => {
        onComplete();
      }, 900);
      return () => clearTimeout(exitTimer);
    }, 4800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#0D241C] text-white transition-opacity duration-700 ease-out select-none ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="CCN University Cinematic Intro"
    >
      {/* ========================================================
          1. CINEMATIC MULTI-LAYER LANDSCAPE REVEAL (IN DEPTH)
          ======================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Layer A: Far Mountains & Sky (Reveals in Phase 2) */}
        <div
          className={`absolute -inset-4 transition-all duration-[2200ms] ease-out will-change-transform ${
            phase >= 2 ? 'opacity-70 scale-100 blur-0' : 'opacity-0 scale-110 blur-sm'
          }`}
        >
          <img
            src={heroCampusLandscape}
            alt="CCNUST Campus Landscape"
            className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.1]"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Layer B: Warm Golden Sunlight Burst from Top-Right (Phase 3) */}
        <div
          className={`absolute -top-20 -right-20 w-[800px] h-[800px] bg-radial from-[#FAD02C]/25 via-[#FAD02C]/10 to-transparent rounded-full blur-3xl transition-opacity duration-1500 pointer-events-none ${
            phase >= 3 ? 'opacity-100 scale-105 animate-sunbeam' : 'opacity-0 scale-90'
          }`}
        />

        {/* Layer C: Deep Green Atmospheric Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-[#0D241C]/95 via-[#163A2D]/80 to-[#0D241C]/70 mix-blend-multiply transition-opacity duration-1500 ${
            phase >= 1 ? 'opacity-90' : 'opacity-100'
          }`}
        />

        {/* Layer D: Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D241C] via-transparent to-[#0D241C]/90" />

        {/* Layer E: Floating Amber Petals */}
        {phase >= 3 && (
          <>
            <div className="absolute bottom-20 left-16 pointer-events-none">
              <div className="w-2 h-2 rounded-full bg-[#FAD02C]/80 shadow-sm" />
            </div>
            <div className="absolute bottom-36 left-1/3 pointer-events-none">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FAD02C]/70 shadow-sm" />
            </div>
          </>
        )}
      </div>

      {/* ========================================================
          2. CENTER EMBLEM & UNIVERSITY IDENTITY REVEAL
          ======================================================== */}
      <div className="relative z-10 max-w-xl mx-auto px-6 text-center flex flex-col items-center">
        
        {/* Frame Box */}
        <div
          className={`relative p-8 sm:p-12 border-2 border-[#FAD02C]/40 bg-[#163A2D]/95 shadow-2xl backdrop-blur-md transition-all duration-1000 ease-out flex flex-col items-center ${
            phase >= 1
              ? 'opacity-100 transform translate-y-0 scale-100'
              : 'opacity-0 transform translate-y-6 scale-95'
          }`}
        >
          {/* Institutional Crest / Monogram */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-[#0D241C] border-2 border-[#FAD02C] p-1 flex items-center justify-center mb-6 shadow-lg">
            <div className="w-full h-full bg-[#163A2D] border border-[#FAD02C]/40 flex flex-col items-center justify-center text-center p-2">
              <div className="text-xl sm:text-2xl font-black tracking-widest text-[#FAD02C] font-sans leading-none">
                CCN
              </div>
              <div className="text-[10px] sm:text-xs font-bold text-[#FAF8F5] font-mono tracking-wider mt-1">
                UST
              </div>
              <div className="w-6 h-0.5 bg-[#FAD02C] mt-1" />
            </div>
          </div>

          {/* Institutional Motto */}
          <div
            className={`transition-all duration-700 delay-200 ${
              phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <span className="text-[#FAD02C] font-mono text-[10px] sm:text-xs font-black tracking-[0.25em] uppercase block mb-3">
              KNOWLEDGE • INNOVATION • LEADERSHIP
            </span>
          </div>

          {/* Main University Title */}
          <h1
            className={`font-sans text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight transition-all duration-700 delay-300 ${
              phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            CCN University
            <span className="block text-lg sm:text-2xl font-bold text-[#FAF8F5]/80 font-mono tracking-wider mt-1">
              OF SCIENCE & TECHNOLOGY
            </span>
          </h1>

          {/* Subtitle / Location badge */}
          <div
            className={`mt-4 flex items-center space-x-2 text-xs text-[#FAF8F5]/80 font-mono font-bold transition-all duration-700 delay-400 uppercase ${
              phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#FAD02C]" />
            <span>Govt. & UGC Approved</span>
            <span className="text-[#FAD02C]">•</span>
            <span>Kotbari, Cumilla</span>
          </div>

          {/* Loading / Atmospheric Progress Line */}
          <div className="mt-8 w-48 sm:w-64 h-1.5 bg-[#0D241C] overflow-hidden border border-[#FAD02C]/30">
            <div
              className="h-full bg-[#FAD02C] transition-all duration-[4200ms] ease-out"
              style={{
                width: phase === 0 ? '5%' : phase === 1 ? '35%' : phase === 2 ? '70%' : '100%',
              }}
            />
          </div>
        </div>

      </div>

      {/* ========================================================
          3. SKIP INTRO / ENTER WEBSITE BUTTON
          ======================================================== */}
      <div className="absolute bottom-8 right-8 z-20">
        <button
          onClick={handleSkip}
          className="group inline-flex items-center space-x-2 bg-[#163A2D] hover:bg-[#FAD02C] hover:text-[#163A2D] border-2 border-[#FAD02C] text-[#FAD02C] px-5 py-2.5 text-xs font-mono font-black uppercase tracking-wider transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer backdrop-blur-sm"
        >
          <span>Enter Campus</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}

