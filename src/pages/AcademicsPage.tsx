import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  GraduationCap,
  BookOpen,
  Award,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Sparkles,
} from 'lucide-react';
import { FACULTIES } from '../universityData';
import SectionAtmosphere from '../components/SectionAtmosphere';
import SecondaryPageHeader, { SecondaryPageBottomNav } from '../components/SecondaryPageHeader';

interface AcademicsPageProps {
  onOpenApplyModal: () => void;
  onSelectProgram?: (programId: string) => void;
}

export default function AcademicsPage({ onOpenApplyModal, onSelectProgram }: AcademicsPageProps) {
  const [searchParams] = useSearchParams();
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>(FACULTIES[0].id);

  // Sync faculty with query param from global search
  useEffect(() => {
    const deptCode = searchParams.get('dept');
    if (deptCode) {
      const matchFac = FACULTIES.find((f) =>
        f.departments.some((d) => d.code.toLowerCase() === deptCode.toLowerCase())
      );
      if (matchFac) {
        setSelectedFacultyId(matchFac.id);
      }
    }
  }, [searchParams]);

  const currentFaculty = FACULTIES.find((f) => f.id === selectedFacultyId) || FACULTIES[0];

  return (
    <div className="min-h-screen bg-[#EFF6F2] pb-20">
      <SectionAtmosphere variant="light" showSakura={false} />

      {/* Sticky Secondary Page Back Navigation Bar */}
      <SecondaryPageHeader
        currentPageTitle="Faculties & Degree Programs"
        category="Academics"
        onOpenApplyModal={onOpenApplyModal}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-[#EAF2ED] border border-[#D0E4DA] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-widest text-[#163A2D] mb-3 rounded">
            <GraduationCap className="w-3.5 h-3.5 text-[#FAD02C]" />
            <span>Academic Programs & Curricula</span>
          </div>
          <h1 className="font-sans text-3xl sm:text-5xl font-black text-[#163A2D] uppercase tracking-tight mb-4">
            Faculties & Degree Programs
          </h1>
          <p className="text-[#4E7D68] text-sm sm:text-base leading-relaxed">
            BAETE and UGC-accredited Outcome-Based Education (OBE) degrees across engineering, computational science, law, humanities, and business.
          </p>
        </div>

        {/* Faculty Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {FACULTIES.map((fac) => {
            const isSelected = selectedFacultyId === fac.id;
            return (
              <button
                key={fac.id}
                onClick={() => setSelectedFacultyId(fac.id)}
                className={`p-4 text-left rounded-xl border-2 transition-all cursor-pointer font-mono ${
                  isSelected
                    ? 'bg-[#163A2D] text-white border-[#163A2D] shadow-lg scale-102'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-[#163A2D]'
                }`}
              >
                <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${isSelected ? 'text-[#FAD02C]' : 'text-slate-500'}`}>
                  Faculty
                </div>
                <div className="font-sans font-black text-sm uppercase leading-snug">
                  {fac.name}
                </div>
                <div className={`text-xs mt-2 font-mono ${isSelected ? 'text-[#A3C7B5]' : 'text-slate-500'}`}>
                  {fac.departments.length} Degree Departments
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Faculty Showcase */}
        <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-6 sm:p-10 shadow-md mb-12">
          <div className="border-b border-slate-200 pb-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#163A2D] bg-[#EAF2ED] px-2.5 py-1 rounded uppercase">
                  Faculty Dossier
                </span>
                <h2 className="text-2xl sm:text-3xl font-sans font-black text-slate-900 uppercase mt-2">
                  {currentFaculty.name}
                </h2>
                <p className="text-sm font-mono text-slate-600 mt-1 max-w-2xl">
                  {currentFaculty.description}
                </p>
              </div>

              <button
                onClick={onOpenApplyModal}
                className="px-6 py-3 bg-[#FAD02C] hover:bg-[#FEF08A] text-[#163A2D] font-mono font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center space-x-2 shrink-0 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#163A2D]" />
                <span>Apply to This Faculty</span>
              </button>
            </div>
          </div>

          {/* Department List in this Faculty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentFaculty.departments.map((dept) => (
              <div
                key={dept.id}
                className="p-6 bg-slate-50/70 border-2 border-slate-200 rounded-xl hover:border-[#163A2D] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-[#163A2D] bg-white border border-slate-300 px-2 py-0.5 rounded">
                      Code: {dept.code}
                    </span>
                    <span className="text-[11px] font-mono text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded font-bold">
                      OBE Curricula
                    </span>
                  </div>
                  <h3 className="text-lg font-sans font-black text-slate-900 mb-2">
                    {dept.name}
                  </h3>
                  <p className="text-xs font-mono text-slate-600 leading-relaxed mb-4">
                    Equipped with modern laboratories, dedicated simulation clusters, moot courts, and research faculty.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">Duration: 4 Years (8 Semesters)</span>
                  <button
                    onClick={() => {
                      if (onSelectProgram) onSelectProgram(dept.id);
                      onOpenApplyModal();
                    }}
                    className="text-xs font-mono font-bold text-[#163A2D] hover:underline flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Apply Program</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* OBE Standard & Accreditation Banner */}
        <div className="bg-[#163A2D] text-white rounded-2xl p-6 sm:p-8 border border-[#21513F] shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-[#0F281E] border border-[#FAD02C] flex items-center justify-center text-[#FAD02C] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-sans font-black text-[#FAD02C] uppercase tracking-wide">
                Quality Assurance & BAETE Accreditation
              </h4>
              <p className="text-[#A3C7B5] text-xs mt-1 leading-relaxed max-w-xl">
                All engineering and computer science programs are mapped under Board of Accreditation for Engineering and Technical Education (BAETE) criteria with active IQAC oversight.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenApplyModal}
            className="px-6 py-2.5 bg-[#FAD02C] hover:bg-[#FEF08A] text-[#163A2D] font-bold uppercase rounded-lg transition-colors cursor-pointer shrink-0"
          >
            Enroll for Fall 2026
          </button>
        </div>

        {/* Bottom Return to Main Page Section */}
        <SecondaryPageBottomNav />
      </div>
    </div>
  );
}
