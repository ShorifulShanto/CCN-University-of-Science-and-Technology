import React, { useState, useMemo, useEffect, useDeferredValue, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Users,
  GraduationCap,
  Mail,
  Phone,
  Building,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { REAL_FACULTY_MEMBERS, RealFacultyMember } from '../data/ccnustRealData';
import SectionAtmosphere from '../components/SectionAtmosphere';
import SecondaryPageHeader, { SecondaryPageBottomNav } from '../components/SecondaryPageHeader';

// Memoized individual faculty card to prevent cascading re-renders
const FacultyCardItem = memo(function FacultyCardItem({
  member,
  onOpenDossier,
}: {
  member: RealFacultyMember;
  onOpenDossier: (member: RealFacultyMember) => void;
}) {
  return (
    <div className="card shadow-md hover:shadow-xl transition-shadow duration-200">
      {/* Card Image Banner with University Decorative Graphic */}
      <div className="card__img">
        <svg viewBox="0 0 300 192" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="192" fill="#163A2D" />
          <path d="M0 120 C 80 180, 200 60, 300 140 L 300 0 L 0 0 Z" fill="#0F281E" opacity="0.6" />
          <path d="M0 160 C 100 110, 180 180, 300 120 L 300 192 L 0 192 Z" fill="#21513F" opacity="0.3" />
          <circle cx="260" cy="35" r="45" fill="#FAD02C" opacity="0.12" />
          <circle cx="40" cy="40" r="25" fill="#FAD02C" opacity="0.08" />
        </svg>
        <span className="absolute top-3 right-3 text-[10px] font-mono font-bold bg-[#FAF8F5] text-[#163A2D] px-2 py-0.5 rounded shadow-xs">
          {member.deptCode}
        </span>
      </div>

      {/* Card Avatar with circular photo & lazy loading */}
      <div className="card__avatar">
        <img
          src={member.imageUrl}
          alt={member.name}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop';
          }}
          className="w-[100px] h-[100px] rounded-full object-cover object-top"
        />
      </div>

      {/* Card Title & Subtitle */}
      <div className="card__title" title={member.name}>
        {member.name}
      </div>

      <div className="card__subtitle" title={member.designation}>
        {member.designation}
      </div>

      <div className="card__dept" title={member.department}>
        {member.department}
      </div>

      {/* Card Action Buttons */}
      <div className="card__wrapper">
        <button
          type="button"
          onClick={() => onOpenDossier(member)}
          className="card__btn card__btn-solid cursor-pointer"
        >
          DOSSIER
        </button>
        <a
          href={`mailto:${member.email}`}
          className="card__btn"
          title={member.email}
        >
          EMAIL
        </a>
      </div>
    </div>
  );
});

export default function FacultyPage() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [selectedTeacher, setSelectedTeacher] = useState<RealFacultyMember | null>(null);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [visibleLimit, setVisibleLimit] = useState(24);

  // Sync with URL parameters if navigated from global search
  useEffect(() => {
    const q = searchParams.get('search');
    const d = searchParams.get('dept');
    if (q) setSearchQuery(q);
    if (d) setSelectedDept(d);
  }, [searchParams]);

  // Reset pagination limit when search or department changes
  useEffect(() => {
    setVisibleLimit(24);
  }, [deferredSearchQuery, selectedDept]);

  // Departments list for filter
  const departments = useMemo(() => {
    return [
      { code: 'ALL', label: 'All Departments' },
      { code: 'CSE', label: 'Computer Science (CSE)' },
      { code: 'EEE', label: 'Electrical & Electronic (EEE)' },
      { code: 'CE', label: 'Civil Engineering (CE)' },
      { code: 'LAW', label: 'Faculty of Law' },
      { code: 'ENGLISH', label: 'English Literature' },
      { code: 'BUSINESS', label: 'Business Administration' },
      { code: 'MATHE', label: 'Mathematics & Science' },
      { code: 'OFFICIALS', label: 'High Officials & Admin' },
    ];
  }, []);

  // Filtered faculty roster based on deferred search query for non-blocking input
  const filteredFaculty = useMemo(() => {
    const cleanSearch = deferredSearchQuery.trim().toLowerCase();
    return REAL_FACULTY_MEMBERS.filter((member) => {
      const matchDept = selectedDept === 'ALL' || member.deptCode === selectedDept;
      if (!matchDept) return false;
      if (!cleanSearch) return true;
      return (
        member.name.toLowerCase().includes(cleanSearch) ||
        member.designation.toLowerCase().includes(cleanSearch) ||
        member.department.toLowerCase().includes(cleanSearch)
      );
    });
  }, [selectedDept, deferredSearchQuery]);

  // Slice for progressive rendering to keep DOM lightweight
  const visibleFaculty = useMemo(() => {
    return filteredFaculty.slice(0, visibleLimit);
  }, [filteredFaculty, visibleLimit]);

  const handleOpenDossier = (member: RealFacultyMember) => {
    setSelectedTeacher(member);
    setContactSuccess(false);
  };

  return (
    <div className="min-h-screen bg-[#EFF6F2] pb-20">
      {/* Background Atmosphere */}
      <SectionAtmosphere variant="light" showSakura={false} />

      {/* Sticky Secondary Page Back Navigation Bar */}
      <SecondaryPageHeader
        currentPageTitle="Faculty Members & Teachers"
        category="Academics"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-[#EAF2ED] border border-[#D0E4DA] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-widest text-[#163A2D] mb-3 rounded">
            <Users className="w-3.5 h-3.5 text-[#FAD02C]" />
            <span>Academic Leadership & Roster</span>
          </div>
          <h1 className="font-sans text-3xl sm:text-5xl font-black text-[#163A2D] uppercase tracking-tight mb-4">
            Faculty Members & Teachers
          </h1>
          <p className="text-[#4E7D68] text-sm sm:text-base leading-relaxed">
            Distinguished scholars, researchers, and mentors from the official faculty directory of CCN University of Science & Technology.
          </p>
        </div>

        {/* Search & Department Filters Controls */}
        <div className="bg-white border-2 border-[#163A2D] p-4 sm:p-6 mb-10 shadow-md rounded-xl space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search teacher by name or title..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:border-[#163A2D] focus:bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Total Results Counter */}
            <div className="text-xs font-mono text-[#163A2D] font-bold">
              Showing <span className="text-[#163A2D] font-black underline">{visibleFaculty.length}</span> of {filteredFaculty.length} faculty members
            </div>
          </div>

          {/* Department Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {departments.map((dept) => {
              const isSelected = selectedDept === dept.code;
              return (
                <button
                  key={dept.code}
                  onClick={() => setSelectedDept(dept.code)}
                  className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#163A2D] text-[#FAD02C] shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {dept.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Faculty Grid Roster */}
        {filteredFaculty.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center max-w-lg mx-auto">
            <Users className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 font-sans">No teachers found</h3>
            <p className="text-xs text-slate-500 font-mono mt-1 mb-4">
              Try adjusting your search keywords or switching department filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDept('ALL');
              }}
              className="px-4 py-2 bg-[#163A2D] text-[#FAD02C] text-xs font-mono font-bold uppercase rounded cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
              {visibleFaculty.map((member) => (
                <FacultyCardItem
                  key={member.id}
                  member={member}
                  onOpenDossier={handleOpenDossier}
                />
              ))}
            </div>

            {/* Progressive Pagination Controls */}
            {visibleLimit < filteredFaculty.length && (
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setVisibleLimit((prev) => prev + 24)}
                  className="px-6 py-3 bg-[#163A2D] hover:bg-[#0F281E] text-[#FAD02C] font-mono font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer hover:scale-102 active:scale-98"
                >
                  <ChevronDown className="w-4 h-4" />
                  <span>Load More Faculty ({filteredFaculty.length - visibleLimit} remaining)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setVisibleLimit(filteredFaculty.length)}
                  className="px-4 py-3 bg-white hover:bg-slate-100 text-slate-700 font-mono font-bold text-xs uppercase tracking-wider rounded-xl border border-slate-300 transition-all cursor-pointer"
                >
                  Show All ({filteredFaculty.length})
                </button>
              </div>
            )}
          </>
        )}

        {/* Teacher Dossier & Consultation Modal */}
        {selectedTeacher && (
          <div
            onClick={() => setSelectedTeacher(null)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white border-2 border-[#163A2D] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150"
            >
              {/* Modal Header */}
              <div className="bg-[#163A2D] text-white p-5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedTeacher.imageUrl}
                    alt={selectedTeacher.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#FAD02C]"
                  />
                  <div>
                    <h3 className="font-sans font-black text-base leading-tight">
                      {selectedTeacher.name}
                    </h3>
                    <span className="text-xs font-mono text-[#FAD02C]">
                      {selectedTeacher.designation}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTeacher(null)}
                  className="text-[#D0E4DA] hover:text-white text-lg p-1 cursor-pointer"
                  aria-label="Close dossier"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4 text-xs font-mono text-slate-700">
                <div className="space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                    Department & Faculty
                  </div>
                  <div className="font-bold text-slate-900 text-sm">
                    {selectedTeacher.department}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                    Academic Background & Specialization
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-800 space-y-1">
                    <div><strong>Education:</strong> {selectedTeacher.education}</div>
                    <div><strong>Specialization:</strong> {selectedTeacher.specialization}</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                    Official Contact
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <a
                      href={`mailto:${selectedTeacher.email}`}
                      className="flex items-center space-x-2 p-2 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 truncate"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#163A2D] shrink-0" />
                      <span className="truncate">{selectedTeacher.email}</span>
                    </a>
                    <a
                      href={`tel:${selectedTeacher.phone}`}
                      className="flex items-center space-x-2 p-2 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 truncate"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#163A2D] shrink-0" />
                      <span>{selectedTeacher.phone}</span>
                    </a>
                  </div>
                </div>

                {/* Consultation Request Form */}
                <div className="pt-2 border-t border-slate-200">
                  <div className="font-bold text-slate-900 mb-2 flex items-center justify-between">
                    <span>Direct Student Consultation Desk</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                      ACTIVE
                    </span>
                  </div>

                  {contactSuccess ? (
                    <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-800 text-center font-bold flex items-center justify-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Inquiry sent to faculty desk. You will be emailed.</span>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setContactSuccess(true);
                      }}
                      className="space-y-2"
                    >
                      <input
                        type="text"
                        required
                        placeholder="Your Name & Student ID"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs focus:bg-white focus:outline-none"
                      />
                      <textarea
                        required
                        rows={2}
                        placeholder="Inquiry topic (e.g., project guidance, course advising, grade review)..."
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs focus:bg-white focus:outline-none"
                      />
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-[#163A2D] text-[#FAD02C] font-bold rounded uppercase tracking-wider text-xs cursor-pointer hover:bg-[#0F281E]"
                        >
                          Submit Request
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Return to Main Page Section */}
        <SecondaryPageBottomNav />
      </div>
    </div>
  );
}
