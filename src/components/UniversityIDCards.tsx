import React, { useState, useEffect } from 'react';
import {
  X,
  ArrowUpRight,
  GraduationCap,
  Users,
  ShieldCheck,
  Briefcase,
  CreditCard,
} from 'lucide-react';

type ActiveModalType = 'teachers_staff' | 'students' | null;

// Overview cover cards on the section
const TEACHERS_CARD_COVER = '/assets/aistudio/c3a263af-7fda-41e3-ae6b-1efe3773d729_20634780.jpg';
const STUDENTS_CARD_COVER = '/assets/aistudio/2c6566a3-daff-4e37-bcdf-44de54baf7b1_4fa0dcf0.jpg';

// Individual photos inside the modals (ordered exactly 1st -> 4th year, 5th staff, 6th teachers)
const YEAR_1_IMG = '/assets/aistudio/20cbd4ad-5dde-4ec3-95b8-bae0ba46f267_e3b0cfc9.jpg';
const YEAR_2_IMG = '/assets/aistudio/7e2316b8-c875-4ef0-8de2-b28c9e824b22_be073f30.jpg';
const YEAR_3_IMG = '/assets/aistudio/3f716471-8b73-4a37-a34d-25e7b316b4aa_df6acf2e.jpg';
const YEAR_4_IMG = '/assets/aistudio/b0ac920a-3f2a-445e-9749-86d63c6d43c2_8f3d549f.jpg';
const STAFF_IMG = '/assets/aistudio/b4263d94-af72-41e0-85e6-f01d5a093e92_68f37465.jpg';
const TEACHERS_IMG = '/assets/aistudio/c3a263af-7fda-41e3-ae6b-1efe3773d729_20634780.jpg';

const TEACHER_STAFF_SECTIONS = [
  {
    id: 'teachers',
    index: '01',
    title: 'Teachers',
    subtitle: 'Academic Faculty ID Card',
    lanyardSpec: 'White CCNUST University Ribbon',
    prefix: 'CCN-FAC',
    imageUrl: TEACHERS_IMG,
    holders: 'Professors, Associate & Assistant Professors, Lecturers',
    accessScope:
      'Academic departments, faculty lounge, research & computing labs, exam script wing.',
    icon: GraduationCap,
  },
  {
    id: 'staff',
    index: '02',
    title: 'Staff',
    subtitle: 'Administrative & Technical Staff ID Card',
    lanyardSpec: 'White CCN Family Ribbon',
    prefix: 'CCN-STF',
    imageUrl: STAFF_IMG,
    holders: 'Registrar Officers, Lab Technicians, IT Support & Office Personnel',
    accessScope:
      'Administrative secretariat, admissions counter, server rooms, campus transport & perimeter gates.',
    icon: Briefcase,
  },
] as const;

const STUDENT_YEAR_SECTIONS = [
  {
    id: 'year-1',
    yearLabel: '1st Year',
    strapColorLabel: 'Yellow / Gold Strap',
    swatchBg: 'bg-amber-400',
    swatchBorder: 'border-amber-600',
    imageUrl: YEAR_1_IMG,
    holders: '1st Year Undergraduate Batch',
    accessScope:
      'Freshers orientation entry, central library borrowing, campus shuttle access, and foundation labs.',
  },
  {
    id: 'year-2',
    yearLabel: '2nd Year',
    strapColorLabel: 'Dark Espresso Strap',
    swatchBg: 'bg-stone-800',
    swatchBorder: 'border-stone-950',
    imageUrl: YEAR_2_IMG,
    holders: '2nd Year Undergraduate Batch',
    accessScope:
      'Department core studios, smart attendance check-in, and midterm/final exam hall entry.',
  },
  {
    id: 'year-3',
    yearLabel: '3rd Year',
    strapColorLabel: 'Royal Blue Strap',
    swatchBg: 'bg-blue-600',
    swatchBorder: 'border-blue-800',
    imageUrl: YEAR_3_IMG,
    holders: '3rd Year Undergraduate Batch',
    accessScope:
      'Engineering workshops, programming clusters, moot court rooms, and club facilities.',
  },
  {
    id: 'year-4',
    yearLabel: '4th Year',
    strapColorLabel: 'Crimson Red Strap',
    swatchBg: 'bg-red-600',
    swatchBorder: 'border-red-800',
    imageUrl: YEAR_4_IMG,
    holders: '4th Year Senior Undergraduate Batch',
    accessScope:
      'Thesis & capstone labs, research seminars, career placement desk, and final clearance.',
  },
] as const;

export default function UniversityIDCards() {
  const [activeModal, setActiveModal] = useState<ActiveModalType>(null);
  const [selectedStaffSection, setSelectedStaffSection] = useState<'teachers' | 'staff'>('teachers');
  const [selectedYear, setSelectedYear] = useState<string>('year-1');
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!activeModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal]);

  const markImgError = (key: string) => {
    setImgErrors((prev) => ({ ...prev, [key]: true }));
  };

  const activeTeacherStaffInfo =
    TEACHER_STAFF_SECTIONS.find((s) => s.id === selectedStaffSection) || TEACHER_STAFF_SECTIONS[0];

  const activeYearInfo =
    STUDENT_YEAR_SECTIONS.find((s) => s.id === selectedYear) || STUDENT_YEAR_SECTIONS[0];

  return (
    <section
      id="id-cards"
      className="py-20 bg-gradient-to-b from-[#E8F1EB] via-[#EFF6F2] to-[#F2F7F4] border-b border-[#CFE2D7] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Institutional Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-semibold text-[#163A2D] tracking-wider uppercase">
              Campus Identity &amp; Access
            </span>
            <h2
              className="text-3xl sm:text-4xl font-sans font-black text-[#163A2D] mt-2 tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Official University ID Cards
            </h2>
            <p className="text-sm text-[#4E7D68] mt-2 leading-relaxed">
              Select either official CCNUST ID lanyard card below to open the Teachers &amp; Staff sections or view the four academic year Student ID card editions.
            </p>
          </div>
          <div className="text-xs font-mono text-[#4E7D68] shrink-0">
            Office of the Registrar · Kotbari, Cumilla
          </div>
        </div>

        {/* Two Clickable Photo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Teachers and Staff */}
          <button
            type="button"
            onClick={() => {
              setSelectedStaffSection('teachers');
              setActiveModal('teachers_staff');
            }}
            className="ccn-glow-card group text-left bg-[#FAFDFB]/90 backdrop-blur-sm border border-[#C8DFD2] rounded-2xl transition-all duration-200 flex flex-col overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#163A2D] focus-visible:ring-offset-2 shadow-xs"
          >
            <div className="relative w-full h-72 sm:h-80 bg-[#EAF2ED] overflow-hidden border-b border-[#D0E4DA]">
              {!imgErrors.coverTeachers ? (
                <img
                  src={TEACHERS_CARD_COVER}
                  alt="CCNUST Teachers and Staff ID Card Lanyard"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={() => markImgError('coverTeachers')}
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#EAF2ED] text-[#163A2D] p-6">
                  <CreditCard className="w-10 h-10 mb-2" />
                  <span className="text-sm font-bold">Teachers &amp; Staff ID Lanyard</span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/75 via-black/35 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                <span className="text-xs font-mono tracking-wider uppercase text-[#FAD02C] font-semibold">
                  Faculty &amp; Directorate Edition
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold bg-[#163A2D]/90 px-3 py-1 border border-white/20 whitespace-nowrap shrink-0">
                  <span>Open Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FAD02C]" />
                </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-sans text-xl sm:text-2xl font-black text-[#163A2D] tracking-tight group-hover:text-[#0D241C]">
                  Teachers and Staff ID Card
                </h3>
                <p className="text-sm text-[#4E7D68] mt-1.5 leading-relaxed">
                  Official white ribbon ID passes issued to university teaching faculty and administrative staff. Click to inspect Teachers and Staff editions.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-[#D0E4DA] flex items-center justify-between text-xs font-mono text-[#163A2D]">
                <span>2 Sections · Teachers &amp; Staff</span>
                <span className="font-bold underline decoration-[#FAD02C] decoration-2 underline-offset-4 whitespace-nowrap shrink-0">
                  View Window &rarr;
                </span>
              </div>
            </div>
          </button>

          {/* Card 2: Student ID Card */}
          <button
            type="button"
            onClick={() => {
              setSelectedYear('year-1');
              setActiveModal('students');
            }}
            className="ccn-glow-card group text-left bg-[#FAFDFB]/90 backdrop-blur-sm border border-[#C8DFD2] rounded-2xl transition-all duration-200 flex flex-col overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#163A2D] focus-visible:ring-offset-2 shadow-xs"
          >
            <div className="relative w-full h-72 sm:h-80 bg-[#EAF2ED] overflow-hidden border-b border-[#D0E4DA]">
              {!imgErrors.coverStudents ? (
                <img
                  src={STUDENTS_CARD_COVER}
                  alt="CCNUST Student ID Card Lanyards for 1st to 4th Year"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={() => markImgError('coverStudents')}
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#EAF2ED] text-[#163A2D] p-6">
                  <GraduationCap className="w-10 h-10 mb-2" />
                  <span className="text-sm font-bold">Student ID Lanyards</span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/75 via-black/35 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                <span className="text-xs font-mono tracking-wider uppercase text-[#FAD02C] font-semibold">
                  Four Year Color Series
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold bg-[#163A2D]/90 px-3 py-1 border border-white/20 whitespace-nowrap shrink-0">
                  <span>Open Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FAD02C]" />
                </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-sans text-xl sm:text-2xl font-black text-[#163A2D] tracking-tight group-hover:text-[#0D241C]">
                  Student ID Card
                </h3>
                <p className="text-sm text-[#4E7D68] mt-1.5 leading-relaxed">
                  Color-coded CCN-UST student identity ribbons for 1st Year, 2nd Year, 3rd Year, and 4th Year students. Click to view all 4 year sections.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-[#D0E4DA] flex items-center justify-between text-xs font-mono text-[#163A2D]">
                <span>4 Sections · 1st to 4th Year</span>
                <span className="font-bold underline decoration-[#FAD02C] decoration-2 underline-offset-4 whitespace-nowrap shrink-0">
                  View Window &rarr;
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* SMALL POPUP WINDOW 1: TEACHERS & STAFF (2 SECTIONS WITH INDIVIDUAL PHOTOS) */}
      {activeModal === 'teachers_staff' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="teachers-staff-modal-title"
        >
          <div
            className="bg-[#FAF8F5] border-2 border-[#163A2D] max-w-2xl w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#163A2D] text-white px-5 py-4 flex items-center justify-between gap-4 border-b border-[#163A2D]">
              <div className="min-w-0">
                <div className="text-[11px] font-mono text-[#FAD02C] uppercase tracking-wider">
                  Official University Pass · 2 Sections
                </div>
                <h3
                  id="teachers-staff-modal-title"
                  className="font-sans text-lg font-black text-white truncate"
                >
                  Teachers &amp; Staff ID Card
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                aria-label="Close Teachers and Staff ID Card window"
                className="p-2 text-[#D0E4DA] hover:text-[#FAD02C] hover:bg-[#0D241C] transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: 2 Sections (Teachers + Staff, each with its exact uploaded lanyard image) */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TEACHER_STAFF_SECTIONS.map((sec) => {
                  const Icon = sec.icon;
                  const isSelected = selectedStaffSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => setSelectedStaffSection(sec.id)}
                      className={`text-left border-2 transition-colors cursor-pointer flex flex-col overflow-hidden ${
                        isSelected
                          ? 'bg-white border-[#163A2D] shadow-sm'
                          : 'bg-white/80 border-[#D0E4DA] hover:border-[#163A2D]/60'
                      }`}
                    >
                      <div className="w-full h-48 bg-[#EAF2ED] border-b border-[#D0E4DA] overflow-hidden shrink-0">
                        {!imgErrors[sec.id] ? (
                          <img
                            src={sec.imageUrl}
                            alt={`${sec.title} CCNUST ID Card Lanyard`}
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            onError={() => markImgError(sec.id)}
                            className="w-full h-full object-cover object-center"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-[#163A2D] p-4">
                            <Icon className="w-8 h-8 mb-1.5" />
                            <span className="text-xs font-bold">{sec.title} Ribbon</span>
                          </div>
                        )}
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#D0E4DA]">
                            <div className="flex items-center gap-2">
                              <span className="w-7 h-7 bg-[#163A2D] text-[#FAD02C] flex items-center justify-center shrink-0">
                                <Icon className="w-3.5 h-3.5" />
                              </span>
                              <span className="font-sans text-base font-black text-[#163A2D]">
                                {sec.index}. {sec.title}
                              </span>
                            </div>
                            <span className="font-mono text-[11px] font-bold text-[#4E7D68] tabular-nums">
                              {sec.prefix}
                            </span>
                          </div>

                          <div className="text-xs font-semibold text-[#163A2D] mb-0.5">
                            {sec.subtitle}
                          </div>
                          <div className="text-[11px] font-mono text-[#4E7D68] mb-2.5">
                            {sec.lanyardSpec}
                          </div>

                          <p className="text-xs text-slate-700 leading-relaxed">
                            <strong className="text-[#163A2D]">Issued To:</strong> {sec.holders}
                          </p>
                          <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                            <strong className="text-[#163A2D]">Access:</strong> {sec.accessScope}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Selection Summary Strip */}
              <div className="bg-white border border-[#D0E4DA] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#163A2D] shrink-0 mt-0.5" />
                  <div className="text-slate-700">
                    <span className="font-bold text-[#163A2D]">
                      {activeTeacherStaffInfo.title} Pass Desk:
                    </span>{' '}
                    Collect or renew your {activeTeacherStaffInfo.title.toLowerCase()} ID card &amp; ribbon at the Office of the Registrar, Academic Building 1.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 bg-[#163A2D] hover:bg-[#0D241C] text-[#FAD02C] font-bold uppercase tracking-wider text-xs cursor-pointer whitespace-nowrap shrink-0"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SMALL POPUP WINDOW 2: STUDENT ID CARD (4 SECTIONS FOR 1ST - 4TH YEAR WITH INDIVIDUAL PHOTOS) */}
      {activeModal === 'students' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="student-id-modal-title"
        >
          <div
            className="bg-[#FAF8F5] border-2 border-[#163A2D] max-w-3xl w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#163A2D] text-white px-5 py-4 flex items-center justify-between gap-4 border-b border-[#163A2D]">
              <div className="min-w-0">
                <div className="text-[11px] font-mono text-[#FAD02C] uppercase tracking-wider">
                  4 Academic Years · 1st to 4th Year
                </div>
                <h3
                  id="student-id-modal-title"
                  className="font-sans text-lg font-black text-white truncate"
                >
                  Student ID Card
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                aria-label="Close Student ID Card window"
                className="p-2 text-[#D0E4DA] hover:text-[#FAD02C] hover:bg-[#0D241C] transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: 4 Sections (1st Year, 2nd Year, 3rd Year, 4th Year) */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {STUDENT_YEAR_SECTIONS.map((yr) => {
                  const isSelected = selectedYear === yr.id;
                  return (
                    <button
                      key={yr.id}
                      type="button"
                      onClick={() => setSelectedYear(yr.id)}
                      className={`text-left border-2 transition-colors cursor-pointer flex flex-col overflow-hidden ${
                        isSelected
                          ? 'bg-white border-[#163A2D] shadow-sm'
                          : 'bg-white/80 border-[#D0E4DA] hover:border-[#163A2D]/60'
                      }`}
                    >
                      <div className="w-full h-44 bg-[#EAF2ED] border-b border-[#D0E4DA] overflow-hidden shrink-0">
                        {!imgErrors[yr.id] ? (
                          <img
                            src={yr.imageUrl}
                            alt={`CCNUST ${yr.yearLabel} Student ID Card Lanyard`}
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            onError={() => markImgError(yr.id)}
                            className="w-full h-full object-cover object-center"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-[#163A2D] p-4">
                            <GraduationCap className="w-8 h-8 mb-1.5" />
                            <span className="text-xs font-bold">{yr.yearLabel} Ribbon</span>
                          </div>
                        )}
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#D0E4DA]">
                            <span className="font-sans text-base font-black text-[#163A2D]">
                              {yr.yearLabel}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#4E7D68] whitespace-nowrap shrink-0">
                              <span
                                className={`w-3 h-3 rounded-full border ${yr.swatchBg} ${yr.swatchBorder} shrink-0`}
                                aria-hidden="true"
                              />
                              <span>{yr.strapColorLabel}</span>
                            </span>
                          </div>

                          <p className="text-xs font-semibold text-[#163A2D] mb-1">
                            {yr.holders}
                          </p>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {yr.accessScope}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Year Summary Strip */}
              <div className="bg-white border border-[#D0E4DA] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <Users className="w-4 h-4 text-[#163A2D] shrink-0 mt-0.5" />
                  <div className="text-slate-700">
                    <span className="font-bold text-[#163A2D]">
                      {activeYearInfo.yearLabel} ({activeYearInfo.strapColorLabel}):
                    </span>{' '}
                    Mandatory for campus entry, laboratory check-in, and university examinations. Replace lost cards via the Registrar Desk.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 bg-[#163A2D] hover:bg-[#0D241C] text-[#FAD02C] font-bold uppercase tracking-wider text-xs cursor-pointer whitespace-nowrap shrink-0"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
