import React from 'react';
import {
  X,
  Clock,
  BookOpen,
  Award,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { Program } from '../types';

interface ProgramDetailModalProps {
  program: Program | null;
  onClose: () => void;
  onApply: (programId: string) => void;
}

export default function ProgramDetailModal({
  program,
  onClose,
  onApply,
}: ProgramDetailModalProps) {
  if (!program) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border-2 border-[#163A2D] max-w-3xl w-full shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#163A2D] text-white p-6 shrink-0 relative border-b-2 border-[#163A2D]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-[#D0E4DA] hover:text-[#FAD02C] hover:bg-[#0D241C] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#FAD02C] uppercase tracking-wider mb-1">
            <span>{program.level} Degree</span>
            <span>•</span>
            <span>Outcome-Based Education (OBE)</span>
          </div>

          <h2 className="font-sans text-2xl sm:text-3xl font-black text-white">{program.name}</h2>
          <div className="text-xs text-[#D0E4DA] mt-1 font-sans">
            Degree Awarded: <strong className="text-[#FAD02C]">{program.degree}</strong>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto grow space-y-6 text-xs text-[#4E7D68] bg-[#FAF8F5]">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white border-2 border-[#163A2D] p-3 text-center">
              <Clock className="w-4 h-4 text-[#163A2D] mx-auto mb-1" />
              <div className="font-black text-[#163A2D] font-sans">{program.duration}</div>
              <div className="text-[10px] text-[#4E7D68] font-mono uppercase">Duration</div>
            </div>

            <div className="bg-white border-2 border-[#163A2D] p-3 text-center">
              <BookOpen className="w-4 h-4 text-[#163A2D] mx-auto mb-1" />
              <div className="font-black text-[#163A2D] font-sans">{program.totalCredits} Credits</div>
              <div className="text-[10px] text-[#4E7D68] font-mono uppercase">Total Credits</div>
            </div>

            <div className="bg-white border-2 border-[#163A2D] p-3 text-center">
              <GraduationCap className="w-4 h-4 text-[#163A2D] mx-auto mb-1" />
              <div className="font-black text-[#163A2D] font-sans">{program.level}</div>
              <div className="text-[10px] text-[#4E7D68] font-mono uppercase">Study Level</div>
            </div>

            <div className="bg-white border-2 border-[#163A2D] p-3 text-center">
              <Award className="w-4 h-4 text-[#163A2D] mx-auto mb-1" />
              <div className="font-black text-[#163A2D] font-sans">UGC Approved</div>
              <div className="text-[10px] text-[#4E7D68] font-mono uppercase">Accreditation</div>
            </div>
          </div>

          {/* Program Overview */}
          <div className="bg-white border-2 border-[#163A2D] p-5">
            <h3 className="font-sans text-base font-black text-[#163A2D] mb-2">
              Program Overview & Scope
            </h3>
            <p className="text-xs sm:text-sm text-[#4E7D68] leading-relaxed font-sans">
              {program.overview}
            </p>
          </div>

          {/* Admission Requirements */}
          {program.admissionRequirements && program.admissionRequirements.length > 0 && (
            <div className="bg-[#EAF2ED] border-2 border-[#163A2D] p-5">
              <h4 className="font-sans text-sm font-black text-[#163A2D] mb-2 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#163A2D]" />
                <span>Admission Eligibility Requirements</span>
              </h4>
              <ul className="space-y-1 text-xs text-[#163A2D] leading-relaxed">
                {program.admissionRequirements.map((req, rIdx) => (
                  <li key={rIdx} className="flex items-start space-x-2">
                    <span className="text-[#163A2D] font-bold">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Semester-by-Semester Curriculum Breakdown */}
          {program.curriculumOutline && program.curriculumOutline.length > 0 && (
            <div>
              <h3 className="font-sans text-base font-black text-[#163A2D] mb-3 flex items-center space-x-2">
                <Layers className="w-4 h-4 text-[#163A2D]" />
                <span>Semester Course Structure & Curriculum Outline</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {program.curriculumOutline.map((sem, sIdx) => (
                  <div
                    key={sIdx}
                    className="border-2 border-[#163A2D] p-3.5 bg-white"
                  >
                    <div className="font-black text-[#163A2D] text-xs mb-2 pb-1 border-b border-[#D0E4DA] flex items-center justify-between font-sans">
                      <span>{sem.semester}</span>
                      <span className="text-[10px] text-[#163A2D] font-mono font-bold bg-[#EAF2ED] px-1.5 py-0.5 border border-[#D0E4DA]">
                        Core Semester
                      </span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#4E7D68]">
                      {sem.courses.map((course, cIdx) => (
                        <li key={cIdx} className="flex items-start justify-between gap-2">
                          <span className="truncate">
                            <strong className="text-[#163A2D] font-mono text-[11px]">{course.code}:</strong> {course.title}
                          </span>
                          <span className="font-mono text-[10px] text-[#4E7D68] shrink-0 font-bold">
                            {course.credits} Cr
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Career Pathways */}
          {program.careerOpportunities && program.careerOpportunities.length > 0 && (
            <div>
              <h3 className="font-sans text-base font-black text-[#163A2D] mb-2 flex items-center space-x-2">
                <Briefcase className="w-4 h-4 text-[#163A2D]" />
                <span>Career Opportunities & Professional Outcomes</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {program.careerOpportunities.map((career, idx) => (
                  <span
                    key={idx}
                    className="bg-white text-[#163A2D] text-xs font-bold px-3 py-1 border border-[#163A2D]"
                  >
                    {career}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-white border-t-2 border-[#163A2D] p-4 sm:p-5 shrink-0 flex items-center justify-between">
          <div className="text-xs text-[#4E7D68] font-mono hidden sm:block">
            Intake: <strong className="text-[#163A2D]">Fall 2026 / Spring 2027</strong>
          </div>
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2.5 border border-[#163A2D] text-[#163A2D] font-bold hover:bg-[#FAF8F5] text-xs uppercase tracking-wider cursor-pointer font-mono"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onApply(program.id);
              }}
              className="bg-[#163A2D] hover:bg-[#0D241C] text-[#FAD02C] text-xs font-black uppercase tracking-wider px-6 py-2.5 border border-[#163A2D] flex items-center space-x-1.5 cursor-pointer transition-colors"
            >
              <span>Apply for {program.degree}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
