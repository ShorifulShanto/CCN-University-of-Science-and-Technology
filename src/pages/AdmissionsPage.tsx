import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  Award,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Clock,
  Phone,
} from 'lucide-react';
import SectionAtmosphere from '../components/SectionAtmosphere';
import SecondaryPageHeader, { SecondaryPageBottomNav } from '../components/SecondaryPageHeader';

interface AdmissionsPageProps {
  onOpenApplyModal: () => void;
}

export default function AdmissionsPage({ onOpenApplyModal }: AdmissionsPageProps) {
  const [hscGpa, setHscGpa] = useState<number>(4.5);
  const [sscGpa, setSscGpa] = useState<number>(4.5);
  const [isDiploma, setIsDiploma] = useState<boolean>(false);

  // Calculate merit scholarship waiver percentage based on CCNUST criteria
  const totalGpa = isDiploma ? hscGpa * 2 : sscGpa + hscGpa;
  let scholarshipWaiver = 0;
  if (totalGpa >= 10.0 || (isDiploma && hscGpa >= 3.8)) {
    scholarshipWaiver = 100;
  } else if (totalGpa >= 9.5 || (isDiploma && hscGpa >= 3.6)) {
    scholarshipWaiver = 75;
  } else if (totalGpa >= 9.0 || (isDiploma && hscGpa >= 3.4)) {
    scholarshipWaiver = 50;
  } else if (totalGpa >= 8.0 || (isDiploma && hscGpa >= 3.0)) {
    scholarshipWaiver = 25;
  } else {
    scholarshipWaiver = 15;
  }

  return (
    <div className="min-h-screen bg-[#EFF6F2] pb-20">
      <SectionAtmosphere variant="light" showSakura={false} />

      {/* Sticky Secondary Page Back Navigation Bar */}
      <SecondaryPageHeader
        currentPageTitle="Admissions & Scholarships"
        category="Admissions"
        onOpenApplyModal={onOpenApplyModal}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-[#EAF2ED] border border-[#D0E4DA] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-widest text-[#163A2D] mb-3 rounded">
            <Sparkles className="w-3.5 h-3.5 text-[#FAD02C]" />
            <span>Admissions Fall 2026</span>
          </div>
          <h1 className="font-sans text-3xl sm:text-5xl font-black text-[#163A2D] uppercase tracking-tight mb-4">
            Admissions & Scholarships
          </h1>
          <p className="text-[#4E7D68] text-sm sm:text-base leading-relaxed">
            Begin your academic journey at CCNUST. Transparent fee structures, up to 100% merit-based tuition waivers, and seamless online enrollment.
          </p>
        </div>

        {/* Admission Timeline & Hot Banner */}
        <div className="bg-[#163A2D] text-white rounded-2xl p-6 sm:p-8 mb-10 border border-[#21513F] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-block px-2.5 py-0.5 bg-[#FAD02C] text-[#163A2D] font-mono text-[11px] font-bold rounded uppercase">
              Current Session: Fall 2026
            </div>
            <h2 className="text-xl sm:text-2xl font-sans font-black">
              Undergraduate & Graduate Applications Now Active
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#D0E4DA]">
              <span className="flex items-center space-x-1">
                <Calendar className="w-4 h-4 text-[#FAD02C]" />
                <span>Last Date to Apply: November 15, 2026</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-[#FAD02C]" />
                <span>Admission Test: Rolling Basis</span>
              </span>
            </div>
          </div>

          <button
            onClick={onOpenApplyModal}
            className="px-8 py-3 bg-[#FAD02C] hover:bg-[#FEF08A] text-[#163A2D] font-mono font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg cursor-pointer shrink-0"
          >
            Apply Online (Fall 2026)
          </button>
        </div>

        {/* 2-Column: Eligibility Criteria + Interactive Scholarship Estimator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left 7 Cols: Eligibility & Step-by-Step */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-6 sm:p-8 shadow-md">
              <h3 className="font-sans font-black text-slate-900 text-xl uppercase mb-4 flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-[#163A2D]" />
                <span>Minimum Eligibility Criteria</span>
              </h3>
              <div className="space-y-4 font-mono text-xs text-slate-700 leading-relaxed">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="font-bold text-slate-900 text-sm mb-1">HSC / Alim Graduates</div>
                  <p>Minimum combined GPA 5.00 in SSC and HSC (minimum GPA 2.50 in each exam independently).</p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="font-bold text-slate-900 text-sm mb-1">Diploma in Engineering Holders</div>
                  <p>Minimum CGPA 2.50 from BTEB-affiliated polytechnic institutes eligible for credit transfer and advanced engineering standing.</p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="font-bold text-slate-900 text-sm mb-1">English Medium (O/A Level)</div>
                  <p>Five subjects in O Level and two subjects in A Level with minimum grade 'C' or equivalent.</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-6 sm:p-8 shadow-md">
              <h3 className="font-sans font-black text-slate-900 text-xl uppercase mb-4 flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-[#163A2D]" />
                <span>Step-by-Step Admission Process</span>
              </h3>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-[#163A2D] text-[#FAD02C] font-bold flex items-center justify-center shrink-0">1</span>
                  <div>
                    <span className="font-bold text-slate-900 block">Submit Online Application Form</span>
                    <span className="text-slate-600">Fill out educational background, select department, and upload transcripts.</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-[#163A2D] text-[#FAD02C] font-bold flex items-center justify-center shrink-0">2</span>
                  <div>
                    <span className="font-bold text-slate-900 block">Document Verification & Scholarship Assessment</span>
                    <span className="text-slate-600">Admissions desk calculates your merit waiver percentage immediately.</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-[#163A2D] text-[#FAD02C] font-bold flex items-center justify-center shrink-0">3</span>
                  <div>
                    <span className="font-bold text-slate-900 block">Fee Payment & Identity Card Issuance</span>
                    <span className="text-slate-600">Complete semester admission fee via bKash/Nagad/Bank and receive institutional credentials.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Interactive Scholarship & Tuition Estimator */}
          <div className="lg:col-span-5">
            <div className="bg-[#0F281E] border-2 border-[#FAD02C] rounded-2xl p-6 sm:p-8 text-white shadow-xl space-y-6">
              <div>
                <div className="inline-block px-2 py-0.5 bg-[#FAD02C] text-[#163A2D] font-mono text-[10px] font-bold uppercase rounded mb-2">
                  Interactive Calculator
                </div>
                <h3 className="text-xl sm:text-2xl font-sans font-black text-white">
                  Merit Scholarship Estimator
                </h3>
                <p className="text-xs text-[#A3C7B5] font-mono mt-1">
                  Adjust your GPA scores below to calculate your estimated tuition fee waiver.
                </p>
              </div>

              {/* Diploma toggle */}
              <div className="flex items-center space-x-3 text-xs font-mono">
                <input
                  type="checkbox"
                  id="diploma-toggle"
                  checked={isDiploma}
                  onChange={(e) => setIsDiploma(e.target.checked)}
                  className="rounded text-[#FAD02C] focus:ring-0 cursor-pointer"
                />
                <label htmlFor="diploma-toggle" className="cursor-pointer">
                  I am a Polytechnic Diploma in Engineering graduate
                </label>
              </div>

              {/* GPA Sliders */}
              <div className="space-y-4 font-mono text-xs">
                {!isDiploma && (
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-[#D0E4DA]">SSC GPA:</span>
                      <span className="text-[#FAD02C] font-bold">{sscGpa.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="2.5"
                      max="5.0"
                      step="0.05"
                      value={sscGpa}
                      onChange={(e) => setSscGpa(parseFloat(e.target.value))}
                      className="w-full accent-[#FAD02C] cursor-pointer"
                    />
                  </div>
                )}

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#D0E4DA]">{isDiploma ? 'Diploma CGPA (out of 4.0):' : 'HSC GPA:'}</span>
                    <span className="text-[#FAD02C] font-bold">{hscGpa.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="2.5"
                    max={isDiploma ? 4.0 : 5.0}
                    step="0.05"
                    value={hscGpa}
                    onChange={(e) => setHscGpa(parseFloat(e.target.value))}
                    className="w-full accent-[#FAD02C] cursor-pointer"
                  />
                </div>
              </div>

              {/* Calculated Result Card */}
              <div className="p-4 bg-[#163A2D] border border-[#21513F] rounded-xl text-center space-y-1">
                <span className="text-[11px] font-mono text-[#A3C7B5] uppercase font-bold block">
                  Eligible Tuition Waiver
                </span>
                <div className="text-4xl font-sans font-black text-[#FAD02C]">
                  {scholarshipWaiver}%
                </div>
                <span className="text-[10px] font-mono text-emerald-300 block">
                  Applicable across all 4 years upon maintaining minimum semester CGPA.
                </span>
              </div>

              <button
                onClick={onOpenApplyModal}
                className="w-full py-3 bg-[#FAD02C] hover:bg-[#FEF08A] text-[#163A2D] font-mono font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
              >
                Claim Scholarship & Apply Now
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Return to Main Page Section */}
        <SecondaryPageBottomNav />
      </div>
    </div>
  );
}
