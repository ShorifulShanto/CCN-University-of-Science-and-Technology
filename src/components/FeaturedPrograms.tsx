import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  GraduationCap,
  Clock,
  BookOpen,
  Award,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
  Search,
  X,
} from 'lucide-react';
import { FACULTIES } from '../universityData';
import { Program } from '../types';
import { SwissSectionHeader } from './designSystem/SwissPrimitives';

interface FeaturedProgramsProps {
  onSelectProgram: (program: Program) => void;
  onOpenApplyModal: (programId?: string) => void;
  onViewAllPrograms: () => void;
}

export default function FeaturedPrograms({
  onSelectProgram,
  onOpenApplyModal,
  onViewAllPrograms,
}: FeaturedProgramsProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Collect all featured programs
  const featuredPrograms: Program[] = [];
  FACULTIES.forEach((fac) => {
    fac.departments.forEach((dept) => {
      dept.programs.forEach((prog) => {
        if (prog.featured) {
          featuredPrograms.push(prog);
        }
      });
    });
  });

  // Main 3 Featured Programs for main page
  const mainThreePrograms = featuredPrograms.slice(0, 3);
  const remainingPrograms = featuredPrograms.slice(3);

  // Filtered list for drawer
  const filteredDrawerPrograms = featuredPrograms.filter((prog) => {
    const matchesSearch =
      prog.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prog.degree.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prog.overview.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === 'all' ||
      (activeCategory === 'undergraduate' && prog.level === 'Undergraduate') ||
      (activeCategory === 'graduate' && prog.level === 'Graduate') ||
      (activeCategory === 'engineering' &&
        (prog.name.includes('Computer') ||
          prog.name.includes('Electrical') ||
          prog.name.includes('Civil'))) ||
      (activeCategory === 'business' && prog.name.includes('Business'));

    return matchesSearch && matchesCategory;
  });

  const renderProgramCard = (prog: Program, idx: number, isMain: boolean = false) => (
    <div
      key={prog.id}
      className="group relative bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        {/* Level & Degree Badges */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-900 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded">
            {prog.degree}
          </span>
          <span className="text-[10px] font-mono text-slate-700 font-bold bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
            {prog.level}
          </span>
        </div>

        {/* Program Title */}
        <h3 className="font-sans text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors leading-snug mb-2 uppercase tracking-tight">
          {prog.name}
        </h3>

        <p className="text-slate-600 text-xs leading-relaxed mb-4 line-clamp-3">
          {prog.overview}
        </p>

        {/* Specs Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4 grid grid-cols-2 gap-2 text-xs font-mono">
          <div className="flex items-center space-x-1.5 text-slate-800">
            <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate">Dur: <strong>{prog.duration}</strong></span>
          </div>
          <div className="flex items-center space-x-1.5 text-slate-800">
            <BookOpen className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate">Credits: <strong>{prog.totalCredits} Cr</strong></span>
          </div>
        </div>

        {/* Career Opportunities Preview */}
        {prog.careerOpportunities && prog.careerOpportunities.length > 0 && (
          <div className="mb-4">
            <div className="text-[10px] font-mono font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Career Pathways:
            </div>
            <div className="flex flex-wrap gap-1">
              {prog.careerOpportunities.slice(0, 3).map((career, cIdx) => (
                <span
                  key={cIdx}
                  className="text-[9px] bg-slate-100 text-slate-700 px-2 py-0.5 font-mono font-medium rounded border border-slate-200"
                >
                  {career}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onSelectProgram(prog)}
          className="text-xs font-mono font-bold text-slate-700 hover:text-amber-600 flex items-center space-x-1 uppercase tracking-wider transition-colors cursor-pointer"
        >
          <span>Curriculum</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => onOpenApplyModal(prog.id)}
          className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold px-4 py-2 rounded-lg uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          Apply Now
        </button>
      </div>
    </div>
  );

  return (
    <section id="featured-programs" className="py-20 bg-slate-50/50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SwissSectionHeader
          tag="ACCREDITED DEGREE SHOWCASE"
          title="Featured Undergraduate & Graduate Programs"
          subtitle="Curricula aligned with global industry demands, BAETE accreditation standards, and competitive public/private employment exams."
        />

        {/* SECTION 1: MAIN 3 FEATURED PROGRAMS ON MAIN PAGE */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-2">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 bg-amber-500 rounded-full inline-block" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-800">
                Featured Degrees (Selected Overview)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              Outcome-Based Education
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainThreePrograms.map((prog, idx) => renderProgramCard(prog, idx, true))}
          </div>
        </div>

        {/* DRAWER CONTROLLER BUTTON ("SHOW MORE PROGRAMS") */}
        <div className="flex flex-col items-center justify-center my-6">
          <button
            id="toggle-featured-programs-drawer-btn"
            type="button"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="group relative inline-flex items-center space-x-3 bg-slate-900 text-amber-400 hover:bg-slate-800 hover:text-white px-8 py-4 rounded-xl border border-slate-700 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer font-mono font-bold text-xs sm:text-sm uppercase tracking-wider"
          >
            <Layers className="w-4 h-4 text-amber-400 group-hover:text-white transition-colors" />
            <span>
              {isDrawerOpen
                ? 'Close Programs Drawer ▲'
                : `Show More Programs (${remainingPrograms.length} More In Drawer) ▼`}
            </span>
            {isDrawerOpen ? (
              <ChevronUp className="w-4 h-4 text-amber-400 group-hover:text-white transition-colors" />
            ) : (
              <ChevronDown className="w-4 h-4 text-amber-400 group-hover:text-white transition-colors" />
            )}
          </button>
          <p className="text-[11px] font-mono text-slate-500 mt-2.5 text-center">
            {isDrawerOpen
              ? 'Showing interactive degree drawer with search and category filters'
              : `Tap to open drawer and browse all ${featuredPrograms.length} featured degrees`}
          </p>
        </div>

        {/* EXPANDABLE PROGRAMS DRAWER */}
        <AnimatePresence>
          {isDrawerOpen && (
            <motion.div
              id="programs-drawer-container"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden border border-slate-200 bg-white rounded-2xl shadow-lg p-6 sm:p-8 mt-4"
            >
              {/* Drawer Header */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-200 pb-4 mb-6 gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-50 text-amber-800 px-2.5 py-0.5 rounded border border-amber-200">
                      PROGRAMS DIRECTORY
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-900">
                      All Degree Offerings ({featuredPrograms.length} Total)
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-1">
                    Select curriculum or apply directly to any undergraduate or postgraduate discipline.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-3.5 py-1.5 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-mono font-bold uppercase tracking-wider flex items-center space-x-1 transition-all duration-200 hover:scale-102 active:scale-98 cursor-pointer self-end md:self-auto"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Hide Drawer</span>
                </button>
              </div>

              {/* Filters & Search within Drawer */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 flex flex-col lg:flex-row items-center justify-between gap-4">
                {/* Degree Category Tabs */}
                <div className="flex flex-wrap gap-1.5 w-full lg:w-auto">
                  {[
                    { id: 'all', label: 'All Programs' },
                    { id: 'undergraduate', label: 'Undergraduate' },
                    { id: 'graduate', label: 'Graduate/Masters' },
                    { id: 'engineering', label: 'Engineering' },
                    { id: 'business', label: 'Business' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-3 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer border ${
                        activeCategory === cat.id
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Search Bar */}
                <div className="relative w-full lg:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search degree program..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-700"
                  />
                </div>
              </div>

              {/* Drawer Grid of Programs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDrawerPrograms.map((prog, idx) => renderProgramCard(prog, idx, false))}
              </div>

              {filteredDrawerPrograms.length === 0 && (
                <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300 p-4">
                  <p className="text-xs font-mono uppercase text-slate-500">
                    No degree programs found matching your search.
                  </p>
                </div>
              )}

              {/* Bottom Drawer Collapse Button */}
              <div className="mt-8 pt-4 border-t border-slate-200 text-center">
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-6 py-2.5 bg-slate-900 text-amber-400 hover:bg-slate-800 hover:text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl border border-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer inline-flex items-center space-x-2"
                >
                  <ChevronUp className="w-4 h-4" />
                  <span>Collapse Programs Drawer</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

