import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, ChevronRight, Sparkles } from 'lucide-react';

interface SecondaryPageHeaderProps {
  currentPageTitle: string;
  category?: string;
  subtitle?: string;
  onOpenApplyModal?: () => void;
}

export default function SecondaryPageHeader({
  currentPageTitle,
  category = 'CCNUST Portal',
  subtitle,
  onOpenApplyModal,
}: SecondaryPageHeaderProps) {
  const navigate = useNavigate();

  const handleBackToMain = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full bg-white border-b-2 border-[#163A2D]/15 shadow-sm sticky top-0 z-40 mb-6 transition-all backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        {/* Left: Back Button & Breadcrumbs */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            type="button"
            onClick={handleBackToMain}
            className="inline-flex items-center justify-center p-2 rounded-lg bg-[#163A2D] hover:bg-[#0F281E] text-[#FAD02C] hover:text-white border border-[#163A2D] hover:border-[#FAD02C] transition-colors cursor-pointer shadow-xs"
            aria-label="Home"
            title="Home"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-1.5 text-slate-500 text-xs sm:text-sm font-sans">
            <button
              onClick={handleBackToMain}
              className="text-[#163A2D] hover:underline flex items-center space-x-1.5 font-bold cursor-pointer"
            >
              <Home className="w-4 h-4 text-[#163A2D]" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500 font-medium uppercase text-xs tracking-wider">{category}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#163A2D] font-bold truncate max-w-[240px] sm:max-w-md">
              {currentPageTitle}
            </span>
          </div>
        </div>

        {/* Right: Apply Online CTA */}
        <div className="flex items-center space-x-2 ml-auto">
          {onOpenApplyModal && (
            <button
              type="button"
              onClick={onOpenApplyModal}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#FAD02C] hover:bg-[#FEF08A] text-[#163A2D] font-bold text-xs uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#163A2D]" />
              <span>Apply Online</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function SecondaryPageBottomNav(_props?: { currentPage?: string }) {
  return null;
}
