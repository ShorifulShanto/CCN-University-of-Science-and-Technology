import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Search,
  BookOpen,
  Clock,
  Award,
  GraduationCap,
  ArrowRight,
  Filter,
  CheckCircle2,
  Cpu,
  Atom,
  Briefcase,
  Layers,
  ChevronDown,
  ChevronUp,
  X,
} from 'lucide-react';
import { FACULTIES } from '../universityData';
import { Program } from '../types';
import { SwissSectionHeader, SwissCornerCross } from './designSystem/SwissPrimitives';

interface AcademicsPortalProps {
  onSelectProgram: (program: Program) => void;
  onOpenApplyModal: (programId?: string) => void;
}

export default function AcademicsPortal({
  onSelectProgram,
  onOpenApplyModal,
}: AcademicsPortalProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  // Collect all programs
  const allPrograms: (Program & { facultyName: string; departmentName: string })[] = [];
  FACULTIES.forEach((fac) => {
    fac.departments.forEach((dept) => {
      dept.programs.forEach((prog) => {
        allPrograms.push({
          ...prog,
          facultyName: fac.name,
          departmentName: dept.name,
        });
      });
    });
  });

  // Main 3 Programs on Main Page
  const mainThreePrograms = allPrograms.slice(0, 3);
  const remainingPrograms = allPrograms.slice(3);

  const filteredPrograms = allPrograms.filter((prog) => {
    const matchesSearch =
      prog.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prog.degree.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prog.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prog.facultyName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFaculty =
      selectedFaculty === 'all' ||
      prog.departmentId.startsWith(`dept-${selectedFaculty}`) ||
      (selectedFaculty === 'engineering' && prog.facultyName.includes('Engineering')) ||
      (selectedFaculty === 'science' && prog.facultyName.includes('Science')) ||
      (selectedFaculty === 'arts' && prog.facultyName.includes('Liberal Arts')) ||
      (selectedFaculty === 'business' && prog.facultyName.includes('Business'));

    const matchesLevel =
      selectedLevel === 'all' ||
      (selectedLevel === 'undergraduate' && prog.level === 'Undergraduate') ||
      (selectedLevel === 'graduate' && prog.level === 'Graduate');

    return matchesSearch && matchesFaculty && matchesLevel;
  });

  const renderCurriculumCard = (
    prog: Program & { facultyName: string; departmentName: string },
    idx: number
  ) => (
    <div
      key={prog.id}
      className="group relative bg-white border-2 border-[#D0E4DA] hover:border-[#163A2D] p-6 transition-colors duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between border-b border-[#D0E4DA] pb-3 mb-3.5">
          <span className="text-[10px] font-mono font-bold text-[#163A2D] bg-[#EAF2ED] border border-[#D0E4DA] px-2.5 py-0.5 uppercase">
            {prog.degree}
          </span>
          <span className="text-[10px] text-[#163A2D] font-mono font-semibold bg-[#FAF8F5] px-2.5 py-0.5 border border-[#D0E4DA]">
            {prog.level}
          </span>
        </div>

        <h3 className="font-sans text-base sm:text-lg font-black text-[#163A2D] group-hover:text-[#21513F] transition-colors leading-snug mb-1 uppercase tracking-tight">
          {prog.name}
        </h3>

        <div className="text-[11px] font-mono font-medium text-[#4E7D68] uppercase tracking-wider mb-3">
          {prog.departmentName}
        </div>

        <p className="text-xs text-[#4E7D68] leading-relaxed mb-4 line-clamp-3 font-sans">
          {prog.overview}
        </p>

        <div className="bg-[#FAF8F5] border border-[#D0E4DA] p-3 mb-4 grid grid-cols-2 gap-2 text-xs font-mono">
          <div className="flex items-center space-x-1.5 text-[#163A2D]">
            <Clock className="w-3.5 h-3.5 text-[#163A2D] shrink-0" />
            <span className="truncate">Dur: <strong>{prog.duration}</strong></span>
          </div>
          <div className="flex items-center space-x-1.5 text-[#163A2D]">
            <BookOpen className="w-3.5 h-3.5 text-[#163A2D] shrink-0" />
            <span className="truncate">Credits: <strong>{prog.totalCredits} Cr</strong></span>
          </div>
        </div>
      </div>

      <div className="pt-3.5 border-t border-[#D0E4DA] flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => onSelectProgram(prog)}
          className="text-xs font-mono font-bold text-[#163A2D] hover:text-[#21513F] flex items-center space-x-1.5 uppercase tracking-wider transition-colors cursor-pointer"
        >
          <span>Curriculum Details</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>

        <button
          type="button"
          onClick={() => onOpenApplyModal(prog.id)}
          className="bg-[#163A2D] hover:bg-[#21513F] text-white text-xs font-mono font-bold px-4 py-2 uppercase transition-all duration-200 cursor-pointer"
        >
          Apply
        </button>
      </div>
    </div>
  );

  return (
    <section id="academics" className="py-20 bg-[#FAF8F5] border-b-2 border-[#163A2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SwissSectionHeader
          title="Degrees, Curricula & Academic Programs"
          subtitle="Explore undergraduate and graduate degree paths with complete syllabus outlines, prerequisite matrices, and outcome competencies."
          tag="03 // CURRICULUM PORTAL"
        />

        {/* SECTION 1: MAIN 3 CURRICULA ON MAIN PAGE */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 border-b border-[#D0E4DA] pb-2.5">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 bg-[#FAD02C] inline-block" />
              <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-[#163A2D]">
                Featured Curricula (Main Page — 3 Selected)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[#4E7D68]">
              Click any program for syllabus
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainThreePrograms.map((prog, idx) => renderCurriculumCard(prog, idx))}
          </div>
        </div>

        {/* DRAWER CONTROLLER BUTTON ("SHOW MORE ACADEMIC PROGRAMS") */}
        <div className="flex flex-col items-center justify-center my-8">
          <button
            id="toggle-academics-drawer-btn"
            type="button"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="group relative inline-flex items-center space-x-3 bg-[#163A2D] hover:bg-[#21513F] text-white px-8 py-4 transition-all duration-200 cursor-pointer font-mono font-bold text-xs sm:text-sm uppercase tracking-wider border-2 border-[#163A2D]"
          >
            <Layers className="w-4 h-4 text-[#FAD02C]" />
            <span>
              {isDrawerOpen
                ? 'Close Curricula Drawer ▲'
                : `Show More Academic Programs (${remainingPrograms.length} More In Drawer) ▼`}
            </span>
            {isDrawerOpen ? (
              <ChevronUp className="w-4 h-4 text-[#FAD02C]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#FAD02C]" />
            )}
          </button>
          <p className="text-xs font-mono text-[#4E7D68] mt-2.5 text-center">
            {isDrawerOpen
              ? 'Showing complete interactive curriculum drawer with search and faculty filters'
              : `Space Saver: Tap to open drawer and search all ${allPrograms.length} academic degree curricula`}
          </p>
        </div>

        {/* EXPANDABLE ACADEMICS DRAWER */}
        <AnimatePresence>
          {isDrawerOpen && (
            <motion.div
              id="academics-drawer-container"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden border-2 border-[#163A2D] bg-white p-6 sm:p-8 mt-4"
            >
              {/* Drawer Header */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-[#D0E4DA] pb-4 mb-6 gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest bg-[#EAF2ED] text-[#163A2D] border border-[#D0E4DA] px-2.5 py-0.5">
                      CURRICULA DRAWER
                    </span>
                    <span className="text-xs font-sans font-bold text-[#163A2D]">
                      Complete Academic Degrees & Syllabi ({allPrograms.length} Total)
                    </span>
                  </div>
                  <p className="text-xs text-[#4E7D68] font-sans mt-1">
                    Search and filter across Engineering, Science, Arts, and Business programs.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-4 py-2 border border-[#D0E4DA] text-[#163A2D] hover:bg-[#FAF8F5] text-xs font-mono font-semibold uppercase tracking-wider flex items-center space-x-1.5 transition-colors cursor-pointer self-end md:self-auto"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Hide Drawer</span>
                </button>
              </div>

              {/* Search & Filter Controls within Drawer */}
              <div className="bg-[#FAF8F5] border border-[#D0E4DA] p-4 sm:p-6 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  {/* Search Input */}
                  <div className="sm:col-span-6 relative">
                    <Search className="w-4 h-4 text-[#4E7D68] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search program, degree (e.g. CSE, Civil, BBA, Law, English)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-white border border-[#D0E4DA] text-xs font-sans text-[#163A2D] focus:outline-none focus:border-[#163A2D]"
                    />
                  </div>

                  {/* Faculty Filter */}
                  <div className="sm:col-span-3">
                    <select
                      value={selectedFaculty}
                      onChange={(e) => setSelectedFaculty(e.target.value)}
                      className="w-full py-2 px-3 bg-white border border-[#D0E4DA] text-xs font-sans text-[#163A2D] focus:outline-none focus:border-[#163A2D]"
                    >
                      <option value="all">All Faculties</option>
                      <option value="engineering">Faculty of Engineering</option>
                      <option value="science">Faculty of Science</option>
                      <option value="arts">Faculty of Liberal Arts</option>
                      <option value="business">Faculty of Business</option>
                    </select>
                  </div>

                  {/* Level Filter */}
                  <div className="sm:col-span-3">
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="w-full py-2 px-3 bg-white border border-[#D0E4DA] text-xs font-sans text-[#163A2D] focus:outline-none focus:border-[#163A2D]"
                    >
                      <option value="all">All Study Levels</option>
                      <option value="undergraduate">Undergraduate (Bachelor)</option>
                      <option value="graduate">Graduate (Master's)</option>
                    </select>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs font-sans text-[#4E7D68]">
                  <span>Showing <strong>{filteredPrograms.length}</strong> academic programs</span>
                  {(searchQuery || selectedFaculty !== 'all' || selectedLevel !== 'all') && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedFaculty('all');
                        setSelectedLevel('all');
                      }}
                      className="text-[#163A2D] hover:underline font-bold"
                    >
                      Reset filters
                    </button>
                  )}
                </div>
              </div>

              {/* Drawer Grid */}
              {filteredPrograms.length === 0 ? (
                <div className="text-center py-12 bg-[#FAF8F5] border border-dashed border-[#D0E4DA] p-4">
                  <p className="text-xs font-mono uppercase tracking-wider text-[#4E7D68]">
                    No programs match your search or filter combination.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPrograms.map((prog, idx) => renderCurriculumCard(prog, idx))}
                </div>
              )}

              {/* Bottom Drawer Collapse Button */}
              <div className="mt-8 pt-4 border-t border-[#D0E4DA] text-center">
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-6 py-2.5 bg-[#163A2D] text-white hover:bg-[#21513F] text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer inline-flex items-center space-x-2"
                >
                  <ChevronUp className="w-4 h-4 text-[#FAD02C]" />
                  <span>Collapse Curricula Drawer</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

