import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  GraduationCap,
  ChevronDown,
  Megaphone,
  Users,
  Calendar,
  Landmark,
} from 'lucide-react';
import SocialTooltipBar from './SocialTooltipBar';
import { ServiceModalTab } from './CCNUSTServicesModal';

interface HeroProps {
  onOpenApplyModal: () => void;
  onExplorePrograms: () => void;
  onViewCampusTour?: () => void;
  onOpenServiceModal?: (tab?: ServiceModalTab) => void;
}

export default function Hero({
  onOpenApplyModal,
  onExplorePrograms,
  onViewCampusTour,
  onOpenServiceModal,
}: HeroProps) {
  const heroRef = React.useRef<HTMLElement>(null);
  const rafId = React.useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (rafId.current !== null) return;
    const { clientX, clientY } = e;
    rafId.current = window.requestAnimationFrame(() => {
      rafId.current = null;
      if (!heroRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 12;
      const y = (clientY / innerHeight - 0.5) * 12;
      heroRef.current.style.setProperty('--mouse-x', `${x}px`);
      heroRef.current.style.setProperty('--mouse-y', `${y}px`);
    });
  };

  React.useEffect(() => {
    return () => {
      if (rafId.current !== null) {
        window.cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  const scrollToNextSection = () => {
    const nextSection =
      document.getElementById('why-choose') ||
      document.getElementById('featured-programs-preview') ||
      document.getElementById('id-cards');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[92vh] lg:min-h-[96vh] flex flex-col justify-between overflow-hidden bg-[#F2F7F4] text-[#17342B] selection:bg-[#FEF08A] selection:text-[#17342B]"
    >
      {/* ========================================================
          CCN UNIVERSITY CAMPUS HERO BACKDROP & LOWER SAGE BLEND
          ======================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[#F2F7F4]">
        {/* Full-Clarity Kotbari Campus Landscape & Monument Photograph */}
        <div
          className="absolute -inset-3 transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform: 'translate3d(calc(var(--mouse-x, 0px) * -0.12), calc(var(--mouse-y, 0px) * -0.12), 0) scale(1.02)',
          }}
        >
          <img
            src="/assets/aistudio/9e6aa634-30ac-49bb-91e8-1057cd02d9c0_9b56aaa2.jpg"
            alt="CCN University of Science & Technology campus grounds, academic building, and Shaheed Minar in Kotbari, Cumilla"
            className="w-full h-full object-cover object-[64%_55%] sm:object-[center_64%] lg:object-[center_68%] filter brightness-[1.02] contrast-[1.04] saturate-[1.06]"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>

        {/* Deep Emerald Readability Scrim Behind Left Text Only (Leaves Building, Monument & Sky Vivid) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(7,24,18,0.88) 0%, rgba(10,33,24,0.74) 36%, rgba(12,38,28,0.34) 60%, rgba(12,38,28,0) 78%)',
          }}
        />

        {/* Subtle Masked Architectural Grid & Breathing Ambient Glow Orbs (Left/Bottom Corners Only) */}
        <div className="ccn-bg-grid-dark-masked absolute inset-0 opacity-65" />
        <div
          className="ccn-animate-drift absolute -left-36 top-8 h-[30rem] w-[30rem] rounded-full opacity-55"
          style={{
            background:
              'radial-gradient(circle, rgba(250, 208, 44, 0.16) 0%, rgba(22, 58, 45, 0.08) 45%, transparent 72%)',
            filter: 'blur(90px)',
          }}
        />
        <div
          className="ccn-animate-drift-reverse absolute -right-28 bottom-8 h-[26rem] w-[26rem] rounded-full opacity-50"
          style={{
            background:
              'radial-gradient(circle, rgba(33, 81, 63, 0.32) 0%, rgba(78, 125, 104, 0.1) 50%, transparent 75%)',
            filter: 'blur(95px)',
          }}
        />

        {/* Lower-Bottom Only Soft Sage Gradient Blending Smoothly Into Next Section (Extra Low on Desktop) */}
        <div
          className="absolute bottom-0 inset-x-0 h-28 sm:h-28 lg:h-20"
          style={{
            background:
              'linear-gradient(to top, #F2F7F4 0%, rgba(242,247,244,0.84) 32%, rgba(242,247,244,0.30) 68%, rgba(242,247,244,0) 100%)',
          }}
        />
      </div>

      {/* ========================================================
          2. MAIN HERO CONTENT GRID
          ======================================================== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16 pb-8 flex-1 flex flex-col justify-center w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT COLUMN: HERO HEADLINE & ACTIONS */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            {/* Admission Open Announcement Action */}
            <div className="inline-flex items-center ccn-hero-fade">
              <button
                onClick={onOpenApplyModal}
                className="group inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#102E22]/90 hover:bg-[#163A2D] backdrop-blur-md border border-[#FAD02C]/70 shadow-[0_6px_18px_rgba(0,0,0,0.35)] text-xs font-bold text-white hover:scale-[1.02] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <Megaphone className="w-3.5 h-3.5 text-[#FAD02C]" />
                <span>Admission Open — Fall 2026</span>
                <span className="text-[#FAD02C] font-black text-sm leading-none group-hover:translate-x-1 transition-transform duration-200">›</span>
              </button>
            </div>

            {/* Main University Typography - Linked to Home */}
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="block space-y-1 group select-none ccn-hero-fade ccn-hero-fade-delay-1"
              title="CCN University of Science & Technology"
            >
              <h1
                className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-black text-white tracking-tight leading-[1.05] drop-shadow-[0_3px_16px_rgba(0,0,0,0.8)]"
                style={{ textWrap: 'balance' }}
              >
                CCN University
              </h1>
              <div className="font-serif italic text-2xl sm:text-3xl md:text-4xl lg:text-[3.15rem] font-bold ccn-text-gradient-light tracking-tight leading-[1.12] drop-shadow-[0_3px_14px_rgba(0,0,0,0.65)]">
                of Science & Technology
              </div>
            </Link>

            {/* Tagline */}
            <div className="text-base sm:text-lg font-extrabold text-white tracking-wide flex items-center space-x-3 border-l-4 border-[#FAD02C] pl-3.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] ccn-hero-fade ccn-hero-fade-delay-2">
              <span>Knowledge • Innovation • Better Tomorrow</span>
            </div>

            {/* Mission Subtitle */}
            <p className="text-[#F1F7F4] text-sm sm:text-base md:text-lg font-semibold leading-relaxed max-w-xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] ccn-hero-fade ccn-hero-fade-delay-2">
              Building skilled, ethical and future-ready leaders for a brighter Bangladesh at our scenic Kotbari hill campus, Cumilla.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2 ccn-hero-fade ccn-hero-fade-delay-3">
              <button
                type="button"
                onClick={onOpenApplyModal}
                className="uiverse-hover-btn-green active:scale-[0.98] group"
              >
                <GraduationCap className="w-4 h-4 text-[#FAD02C] group-hover:text-[#10271E] transition-colors duration-300" />
                <span>Apply Now</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>

              <button
                type="button"
                onClick={onExplorePrograms}
                className="uiverse-hover-btn-yellow active:scale-[0.98] group"
              >
                <span>Explore Programs</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Interactive Social Media */}
            <div className="pt-4 flex flex-col items-start gap-2.5 ccn-hero-fade ccn-hero-fade-delay-3">
              <span className="text-xs font-extrabold text-[#FEF08A] tracking-widest uppercase font-mono drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                Connect with CCNUST:
              </span>
              <SocialTooltipBar />
            </div>

          </div>

          {/* RIGHT COLUMN: HIGH-CONTRAST CONIC-GLOW CAMPUS STATS CARD */}
          <div className="lg:col-span-5 flex justify-start lg:justify-end ccn-hero-fade ccn-hero-fade-delay-2">
            <div className="ccn-glow-card w-full max-w-[290px] sm:max-w-[310px] bg-white/92 backdrop-blur-xl border border-white/75 rounded-2xl p-6 shadow-[0_20px_50px_rgba(7,24,18,0.34)] space-y-4">
              
              {/* Stat 1: Faculties */}
              <div className="flex items-center space-x-4 group cursor-default">
                <div className="w-11 h-11 rounded-xl bg-[#163A2D] group-hover:bg-[#FAD02C] flex items-center justify-center text-[#FAD02C] group-hover:text-[#10271E] shrink-0 transition-colors shadow-sm">
                  <GraduationCap className="w-5 h-5 text-current transition-colors" />
                </div>
                <div>
                  <div className="text-2xl font-black text-[#0F2A1F] leading-none tabular-nums">4</div>
                  <div className="text-xs font-bold text-[#1E4636] uppercase tracking-wider mt-1">Faculties</div>
                </div>
              </div>

              <div className="h-[1px] bg-[#163A2D]/12 w-full" />

              {/* Stat 2: Departments */}
              <div className="flex items-center space-x-4 group cursor-default">
                <div className="w-11 h-11 rounded-xl bg-[#163A2D] group-hover:bg-[#FAD02C] flex items-center justify-center text-[#FAD02C] group-hover:text-[#10271E] shrink-0 transition-colors shadow-sm">
                  <Landmark className="w-5 h-5 text-current transition-colors" />
                </div>
                <div>
                  <div className="text-2xl font-black text-[#0F2A1F] leading-none tabular-nums">9+</div>
                  <div className="text-xs font-bold text-[#1E4636] uppercase tracking-wider mt-1">Departments</div>
                </div>
              </div>

              <div className="h-[1px] bg-[#163A2D]/12 w-full" />

              {/* Stat 3: Students */}
              <div className="flex items-center space-x-4 group cursor-default">
                <div className="w-11 h-11 rounded-xl bg-[#163A2D] group-hover:bg-[#FAD02C] flex items-center justify-center text-[#FAD02C] group-hover:text-[#10271E] shrink-0 transition-colors shadow-sm">
                  <Users className="w-5 h-5 text-current transition-colors" />
                </div>
                <div>
                  <div className="text-2xl font-black text-[#0F2A1F] leading-none tabular-nums">5,000+</div>
                  <div className="text-xs font-bold text-[#1E4636] uppercase tracking-wider mt-1">Students</div>
                </div>
              </div>

              <div className="h-[1px] bg-[#163A2D]/12 w-full" />

              {/* Stat 4: Established */}
              <div className="flex items-center space-x-4 group cursor-default">
                <div className="w-11 h-11 rounded-xl bg-[#163A2D] group-hover:bg-[#FAD02C] flex items-center justify-center text-[#FAD02C] group-hover:text-[#10271E] shrink-0 transition-colors shadow-sm">
                  <Calendar className="w-5 h-5 text-current transition-colors" />
                </div>
                <div>
                  <div className="text-xl font-black text-[#0F2A1F] leading-none tabular-nums">Since 2014</div>
                  <div className="text-xs font-bold text-[#1E4636] uppercase tracking-wider mt-1">Established</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ========================================================
          3. SCROLL DOWN INDICATOR (AS IN REFERENCE IMAGE)
          ======================================================== */}
      <div className="relative z-10 pb-3 lg:pb-2.5 flex flex-col items-center justify-center">
        <button
          onClick={scrollToNextSection}
          className="group flex flex-col items-center space-y-1 text-[#163A2D] hover:text-[#10271E] transition-colors cursor-pointer"
          aria-label="Scroll Down"
        >
          {/* Oval Mouse Icon */}
          <div className="w-5 h-7 rounded-full border-2 border-[#163A2D]/60 flex items-start justify-center p-1 bg-white/90 backdrop-blur-xs shadow-xs">
            <div className="w-1 h-2 bg-[#163A2D] rounded-full animate-scroll-bounce" />
          </div>
          <span className="text-[11px] font-bold tracking-wide drop-shadow-[0_1px_4px_rgba(255,255,255,0.95)]">
            Scroll Down
          </span>
          <ChevronDown className="w-3.5 h-3.5 -mt-1 transition-transform duration-200 group-hover:translate-y-0.5" />
        </button>
      </div>
    </section>
  );
}

