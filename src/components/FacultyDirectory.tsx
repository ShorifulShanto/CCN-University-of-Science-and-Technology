import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Search,
  Mail,
  GraduationCap,
  Sparkles,
  BookOpen,
  MapPin,
  X,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  User,
  Layers,
  Phone,
  ExternalLink,
} from 'lucide-react';
import { FACULTY_MEMBERS } from '../universityData';
import { FacultyMember } from '../types';
import TeacherProfileCard from './TeacherProfileCard';
import { SwissSectionHeader } from './designSystem/SwissPrimitives';

export default function FacultyDirectory() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedFaculty, setSelectedFaculty] = useState<{
    member: FacultyMember;
    index: number;
  } | null>(null);

  // Main Featured Teachers on the Main Page
  const mainFeaturedTeachers = FACULTY_MEMBERS.slice(0, 6);
  
  // Remaining teachers for the expandable drawer
  const remainingTeachers = FACULTY_MEMBERS.slice(6);

  // Filter for Drawer
  const filteredDrawerFaculty = FACULTY_MEMBERS.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.researchInterests.some((r) =>
        r.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      activeCategory === 'all' ||
      (activeCategory === 'engineering' &&
        (member.departmentName.includes('Computer') ||
          member.departmentName.includes('Civil') ||
          member.departmentName.includes('Electrical'))) ||
      (activeCategory === 'science' &&
        (member.departmentName.includes('Mathematics') ||
          member.departmentName.includes('Economics'))) ||
      (activeCategory === 'arts' &&
        (member.departmentName.includes('Law') ||
          member.departmentName.includes('English') ||
          member.departmentName.includes('Bangla'))) ||
      (activeCategory === 'business' &&
        member.departmentName.includes('Business'));

    return matchesSearch && matchesCategory;
  });

  return (
    <section
      id="faculty-directory"
      className="py-20 sm:py-28 bg-[#FAFBFD] border-b border-slate-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <SwissSectionHeader
          number="TEACHERS & FACULTY"
          title="Distinguished Faculty & Mentors"
          subtitle="Learn from renowned scholars, researchers, and engineers. Explore our featured faculty members below or open the departmental roster to discover professors across all university faculties."
          tag="ACADEMIC ROSTER"
        />

        {/* SECTION 1: FEATURED TEACHERS ON MAIN PAGE */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center justify-between mb-8 border-b border-slate-200 pb-3 gap-3">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 bg-amber-400 rounded-full inline-block" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900">
                Featured Faculty Mentors
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              CCNUST Academic Leadership & Faculty Directory
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {mainFeaturedTeachers.map((teacher, idx) => (
              <TeacherProfileCard
                key={teacher.id}
                member={teacher}
                index={idx + 1}
                onContact={(m) => setSelectedFaculty({ member: m, index: idx + 1 })}
              />
            ))}
          </div>
        </div>

        {/* DRAWER CONTROLLER BUTTON ("SHOW MORE TEACHERS") */}
        <div className="flex flex-col items-center justify-center my-8">
          <button
            id="toggle-faculty-drawer-btn"
            type="button"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="group relative inline-flex items-center space-x-3 bg-slate-900 text-white hover:bg-slate-800 px-8 py-4 rounded-xl border border-slate-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer font-mono font-bold text-xs sm:text-sm uppercase tracking-widest"
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span>
              {isDrawerOpen
                ? 'Close Faculty Drawer ▲'
                : `Show More Teachers (${remainingTeachers.length} More In Drawer) ▼`}
            </span>
            {isDrawerOpen ? (
              <ChevronUp className="w-4 h-4 text-amber-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-amber-400" />
            )}
          </button>
          <p className="text-[11px] font-mono text-slate-500 mt-2.5 text-center">
            {isDrawerOpen
              ? 'Showing full interactive faculty drawer with search and filters'
              : `Tap to open the sliding drawer and explore all ${FACULTY_MEMBERS.length} faculty members`}
          </p>
        </div>

        {/* EXPANDABLE TEACHERS DRAWER */}
        <AnimatePresence>
          {isDrawerOpen && (
            <motion.div
              id="faculty-drawer-container"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden border border-slate-200 bg-white rounded-2xl shadow-xl p-6 sm:p-8 mt-4 mb-8"
            >
              {/* Drawer Header */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-200 pb-4 mb-6 gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest bg-amber-400 text-slate-950 px-2 py-0.5 rounded">
                      FACULTY DIRECTORY
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-900">
                      All University Teachers & Mentors ({FACULTY_MEMBERS.length} Total)
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-1">
                    Click contact on any faculty card below to view their detailed academic dossier and credentials.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900 text-xs font-mono font-bold uppercase tracking-wider flex items-center space-x-1 transition-colors cursor-pointer self-end md:self-auto"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Hide Drawer</span>
                </button>
              </div>

              {/* Filters & Search within Drawer */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 flex flex-col lg:flex-row items-center justify-between gap-4">
                {/* Department Filter Tabs */}
                <div className="flex flex-wrap gap-1.5 w-full lg:w-auto">
                  {[
                    { id: 'all', label: 'All Teachers' },
                    { id: 'engineering', label: 'Engineering (CSE/EEE/CE)' },
                    { id: 'science', label: 'Science & Math' },
                    { id: 'arts', label: 'Law & Arts' },
                    { id: 'business', label: 'Business Admin' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
                        activeCategory === cat.id
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-300'
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
                    placeholder="Search teacher by name or dept..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-800"
                  />
                </div>
              </div>

              {/* Drawer Grid of Teachers */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center py-4">
                {filteredDrawerFaculty.map((teacher, idx) => (
                  <TeacherProfileCard
                    key={teacher.id}
                    member={teacher}
                    index={idx + 1}
                    onContact={(m) =>
                      setSelectedFaculty({ member: m, index: idx + 1 })
                    }
                  />
                ))}
              </div>

              {filteredDrawerFaculty.length === 0 && (
                <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-300 rounded-xl p-4">
                  <p className="text-xs font-mono uppercase text-slate-500">
                    No teachers found matching your search term.
                  </p>
                </div>
              )}

              {/* Bottom Drawer Collapse Button */}
              <div className="mt-8 pt-4 border-t border-slate-200 text-center">
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-6 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-xs font-mono font-bold uppercase tracking-widest border border-slate-700 transition-all cursor-pointer inline-flex items-center space-x-2 shadow-sm hover:-translate-y-0.5"
                >
                  <ChevronUp className="w-4 h-4 text-amber-400" />
                  <span>Collapse Faculty Drawer</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MODAL DIALOG DISPLAYING THE PROFILE CARD */}
        {selectedFaculty && (
          <div
            id="teacher-profile-modal-backdrop"
            className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in"
            onClick={() => setSelectedFaculty(null)}
          >
            <div
              className="relative max-w-md w-full my-auto flex flex-col items-center py-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Floating Close Button at top */}
              <div className="w-full max-w-[380px] flex justify-end mb-2">
                <button
                  type="button"
                  onClick={() => setSelectedFaculty(null)}
                  className="px-3 py-1.5 bg-slate-900 text-amber-400 hover:bg-slate-800 rounded-lg border border-amber-400/40 shadow-lg transition-all cursor-pointer flex items-center space-x-1 text-xs font-mono font-bold uppercase tracking-wider"
                >
                  <X className="w-4 h-4" />
                  <span>CLOSE (✕)</span>
                </button>
              </div>

              {/* Render the profile card */}
              <TeacherProfileCard
                member={selectedFaculty.member}
                index={selectedFaculty.index}
                isModal={true}
                onClose={() => setSelectedFaculty(null)}
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
