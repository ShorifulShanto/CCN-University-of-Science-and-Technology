import React, { useState } from 'react';
import {
  Cpu,
  Atom,
  BookOpen,
  Briefcase,
  GraduationCap,
  Beaker,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FACULTIES } from '../universityData';
import { Program } from '../types';
import { SwissSectionHeader, SwissButton, SwissCornerCross } from './designSystem/SwissPrimitives';

interface FacultiesSectionProps {
  onSelectProgram: (program: Program) => void;
  onOpenApplyModal: () => void;
}

export default function FacultiesSection({
  onSelectProgram,
  onOpenApplyModal,
}: FacultiesSectionProps) {
  const [activeFacultyId, setActiveFacultyId] = useState(FACULTIES[0].id);
  const activeFaculty = FACULTIES.find((f) => f.id === activeFacultyId) || FACULTIES[0];

  const facultyIcons: Record<string, React.ReactNode> = {
    Cpu: <Cpu className="w-4 h-4" />,
    Atom: <Atom className="w-4 h-4" />,
    BookOpen: <BookOpen className="w-4 h-4" />,
    Briefcase: <Briefcase className="w-4 h-4" />,
  };

  return (
    <section id="faculties" className="py-20 sm:py-28 bg-[#FAF8F5] border-b-2 border-[#163A2D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Swiss Section Header */}
        <SwissSectionHeader
          number="03 //"
          category="ACADEMIC STRUCTURE"
          title="Four Specialized Academic Faculties"
          description="Delivering contemporary engineering, basic science, liberal arts, and business leadership programs adhering to outcome-based education (OBE) standards."
        />

        {/* Faculty Tab Selector with Moving Active Indicator */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {FACULTIES.map((faculty, idx) => {
            const isActive = faculty.id === activeFacultyId;
            return (
              <button
                key={faculty.id}
                onClick={() => setActiveFacultyId(faculty.id)}
                className={`relative p-5 text-left transition-colors duration-150 border-2 rounded-none flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? 'bg-[#163A2D] text-white border-[#163A2D] z-10'
                    : 'bg-white text-[#163A2D] border-[#D0E4DA] hover:border-[#163A2D] hover:bg-[#FAF8F5]'
                }`}
              >
                {/* Active Tab Moving Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeFacultyTabIndicator"
                    className="absolute inset-0 bg-[#163A2D] -z-10"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-[#FAD02C] tracking-wider">
                      0{idx + 1} //
                    </span>
                    <span className={isActive ? 'text-[#FAD02C]' : 'text-[#4E7D68]'}>
                      {facultyIcons[faculty.iconName] || <GraduationCap className="w-4 h-4" />}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 uppercase border rounded-none ${
                      isActive
                        ? 'bg-[#FAD02C] text-[#0D241C] border-[#FAD02C]'
                        : 'bg-[#EAF2ED] text-[#163A2D] border-[#D0E4DA]'
                    }`}
                  >
                    {faculty.departments.length} Depts
                  </span>
                </div>
                <div className="font-sans font-black text-sm leading-snug uppercase tracking-tight">
                  {faculty.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Faculty Content Box */}
        <div className="relative bg-white border-2 border-[#163A2D] rounded-none shadow-none overflow-hidden">
          <SwissCornerCross className="absolute top-2 left-2 z-20 text-white/50" />
          <SwissCornerCross className="absolute top-2 right-2 z-20 text-white/50" />

          {/* Animate active faculty switch */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFaculty.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {/* Selected Element: Faculty Header Strip with Dynamic Moving Gradient & Swiss Styling */}
              <div className="relative bg-gradient-to-r from-[#163A2D] via-[#21513F] via-[#163A2D] to-[#0E1C2B] swiss-gradient-animated text-white p-6 sm:p-10 border-b-2 border-[#163A2D] overflow-hidden">
                {/* Structural geometric grid overlay */}
                <div className="absolute inset-0 swiss-grid-pattern-dark pointer-events-none opacity-40" />

                {/* Moving light beam / sweep accent */}
                <motion.div
                  className="absolute -top-24 -bottom-24 w-40 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
                  animate={{
                    x: ['-100%', '350%'],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: 'easeInOut',
                    repeatDelay: 1.5,
                  }}
                />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-widest mb-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#FAD02C] text-[#0D241C] border border-[#FAD02C]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0D241C] animate-pulse" />
                        FACULTY CODE: {activeFaculty.shortName}
                      </span>
                      <span className="text-white/40">•</span>
                      <span className="text-[#FEF08A] tracking-wider">
                        DEAN: {activeFaculty.deanName}
                      </span>
                    </div>

                    <h3 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-none text-white">
                      {activeFaculty.name}
                    </h3>

                    <p className="text-[#EAF2ED]/90 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed font-normal">
                      {activeFaculty.description}
                    </p>
                  </div>

                  <SwissButton
                    variant="gold"
                    size="md"
                    onClick={onOpenApplyModal}
                    className="shrink-0 self-start md:self-center"
                  >
                    Apply to Faculty
                  </SwissButton>
                </div>
              </div>

              {/* Departments Grid inside Active Faculty */}
              <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10 divide-y lg:divide-y-0 lg:divide-x divide-[#D0E4DA] bg-white">
                {activeFaculty.departments.map((dept, idx) => (
                  <div key={dept.id} className={`${idx > 0 ? 'pt-8 lg:pt-0 lg:pl-10' : ''}`}>
                    <div className="mb-4">
                      <span className="text-[10px] font-mono font-bold text-[#163A2D] bg-[#EAF2ED] border border-[#D0E4DA] px-2.5 py-1 uppercase rounded-none">
                        DEPT CODE: {dept.code}
                      </span>
                      <h4 className="font-sans text-xl sm:text-2xl font-black text-[#163A2D] uppercase tracking-tight mt-3">
                        {dept.name}
                      </h4>
                    </div>

                    <p className="text-[#4E7D68] text-sm leading-relaxed mb-6 font-normal">
                      {dept.description}
                    </p>

                    {/* Lab Facilities Highlights */}
                    {dept.labFacilities && dept.labFacilities.length > 0 && (
                      <div className="mb-6 bg-[#FAF8F5] border border-[#D0E4DA] p-4 rounded-none">
                        <div className="text-xs font-mono font-bold text-[#163A2D] uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                          <Beaker className="w-3.5 h-3.5 text-[#FAD02C]" />
                          <span>Dedicated Laboratories & Facilities:</span>
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#2A5644] font-mono">
                          {dept.labFacilities.map((lab, lIdx) => (
                            <li key={lIdx} className="flex items-center space-x-1.5">
                              <span className="text-[#FAD02C] font-black">▪</span>
                              <span className="truncate">{lab}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Available Degrees in this Department */}
                    <div className="space-y-3">
                      <div className="text-xs font-mono font-bold text-[#163A2D] uppercase tracking-wider">
                        Degree Programs Offered:
                      </div>
                      {dept.programs.map((prog) => (
                        <div
                          key={prog.id}
                          className="bg-[#FAF8F5] border border-[#D0E4DA] hover:border-[#163A2D] p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-none"
                        >
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-black text-[#163A2D] uppercase tracking-tight">
                                {prog.name}
                              </span>
                              <span className="text-[10px] bg-[#163A2D] text-white px-2 py-0.5 font-mono font-bold rounded-none uppercase">
                                {prog.level}
                              </span>
                            </div>
                            <div className="text-xs text-[#4E7D68] mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono">
                              <span>DURATION: <strong className="text-[#163A2D]">{prog.duration}</strong></span>
                              <span>CREDITS: <strong className="text-[#163A2D]">{prog.totalCredits} CR</strong></span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 shrink-0">
                            <button
                              onClick={() => onSelectProgram(prog)}
                              className="bg-white hover:bg-[#EAF2ED] text-[#163A2D] text-xs font-mono font-bold px-3 py-2 border border-[#D0E4DA] uppercase transition-colors cursor-pointer rounded-none"
                            >
                              Curriculum
                            </button>
                            <button
                              onClick={onOpenApplyModal}
                              className="bg-[#163A2D] hover:bg-[#FAD02C] hover:text-[#0D241C] text-white text-xs font-mono font-bold px-3 py-2 uppercase transition-colors cursor-pointer rounded-none"
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Contact strip */}
                    <div className="mt-6 pt-4 border-t border-[#D0E4DA] flex flex-wrap items-center justify-between text-xs font-mono text-[#4E7D68]">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1.5">
                          <Mail className="w-3.5 h-3.5 text-[#163A2D]" />
                          <span>{dept.contactEmail}</span>
                        </span>
                        <span className="flex items-center space-x-1.5">
                          <Phone className="w-3.5 h-3.5 text-[#163A2D]" />
                          <span>{dept.contactPhone}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

