import React, { useState } from 'react';
import {
  GraduationCap,
  CheckCircle2,
  Award,
  FileText,
  Calculator,
  HelpCircle,
  ArrowRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Download,
  AlertCircle,
  Layers,
} from 'lucide-react';
import { SCHOLARSHIPS, FACULTIES } from '../universityData';

interface AdmissionSectionProps {
  onOpenApplyModal: () => void;
}

export default function AdmissionSection({ onOpenApplyModal }: AdmissionSectionProps) {
  // Calculator state
  const [calcSscGpa, setCalcSscGpa] = useState<string>('5.0');
  const [calcHscGpa, setCalcHscGpa] = useState<string>('5.0');
  const [isFreedomFighter, setIsFreedomFighter] = useState<boolean>(false);
  const [isSibling, setIsSibling] = useState<boolean>(false);
  const [isFemale, setIsFemale] = useState<boolean>(false);
  const [calculatedWaiver, setCalculatedWaiver] = useState<string>('100% Tuition Fee Waiver (Golden GPA 5.00)');

  // FAQ state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const calculateWaiver = (
    ssc: string,
    hsc: string,
    ff: boolean,
    sib: boolean,
    fem: boolean
  ) => {
    const sGpa = parseFloat(ssc) || 0;
    const hGpa = parseFloat(hsc) || 0;

    if (ff) {
      return '100% Tuition Waiver (Freedom Fighter Children Quota)';
    }
    if (sGpa >= 5.0 && hGpa >= 5.0) {
      return '100% Tuition Fee Waiver (Golden GPA 5.00 Merit)';
    }
    if (sGpa + hGpa >= 9.5) {
      return '70% Tuition Fee Waiver (High Academic Merit)';
    }
    if (sGpa + hGpa >= 9.0) {
      return '50% Tuition Fee Waiver (Merit Waiver)';
    }
    if (sGpa + hGpa >= 8.0) {
      return '30% Tuition Fee Waiver';
    }
    if (sib) {
      return '25% Tuition Waiver (Sibling / Spouse Quota)';
    }
    if (fem) {
      return '20% Tuition Waiver (Female Empowerment Special Quota)';
    }
    return 'Standard Tuition Fee (Eligible for Semester-wise CGPA Waivers)';
  };

  const handleCalculate = () => {
    const result = calculateWaiver(
      calcSscGpa,
      calcHscGpa,
      isFreedomFighter,
      isSibling,
      isFemale
    );
    setCalculatedWaiver(result);
  };

  const ADMISSION_STEPS = [
    {
      step: '01',
      title: 'Choose Program',
      desc: 'Browse our undergraduate or graduate degree offerings in Engineering, Science, Arts, and Business.',
    },
    {
      step: '02',
      title: 'Check Eligibility',
      desc: 'Verify GPA requirements (Min GPA 2.50 in SSC & HSC separately) or Diploma credentials.',
    },
    {
      step: '03',
      title: 'Submit Application',
      desc: 'Complete the digital online application form or apply at the Kotbari campus admissions desk.',
    },
    {
      step: '04',
      title: 'Pay Application Fee',
      desc: 'Pay the nominal admission test fee via bKash / Nagad / Bank / Cash at admissions counter.',
    },
    {
      step: '05',
      title: 'Admission Test / Viva',
      desc: 'Appear for the written admission test / viva examination on the designated scheduled date.',
    },
    {
      step: '06',
      title: 'Result & Merit List',
      desc: 'Check published merit results and scholarship award status on the university notice board.',
    },
    {
      step: '07',
      title: 'Enrollment & Orientation',
      desc: 'Complete document verification, pay semester admission dues, and join campus orientation.',
    },
  ];

  const FAQS = [
    {
      q: 'Is CCN University of Science & Technology approved by the UGC?',
      a: 'Yes, CCN University of Science & Technology is fully approved by the University Grants Commission (UGC) of Bangladesh and the Ministry of Education under the Private University Act 2010.',
    },
    {
      q: 'What is the minimum eligibility criteria for B.Sc. in CSE, EEE, and Civil Engineering?',
      a: 'Candidates must have passed SSC and HSC (or equivalent) with a minimum GPA of 2.50 in each examination separately (or combined GPA 6.00) with Physics, Chemistry, and Mathematics. Polytechnic Diploma in Engineering graduates are also eligible for admission with course exemptions.',
    },
    {
      q: 'How can I obtain a 100% Tuition Fee Waiver?',
      a: 'Applicants with Golden GPA 5.00 in both SSC & HSC (without 4th subject) are granted a 100% tuition fee waiver. Additionally, children of registered Freedom Fighters receive a 100% waiver in accordance with UGC directives.',
    },
    {
      q: 'Does CCNUST offer evening / weekend batches for Diploma Engineers?',
      a: 'Yes, special evening and weekend schedules are available for B.Sc. in CSE, B.Sc. in EEE, and B.Sc. in Civil Engineering specifically tailored for working diploma holders.',
    },
    {
      q: 'What documents are required during admission confirmation?',
      a: 'Original and attested copies of SSC & HSC mark sheets, certificates, 4 passport-size photographs, National ID / Birth Certificate copy, and quota verification certificates (if applicable).',
    },
  ];

  return (
    <section id="admission" className="py-20 bg-[#FAF8F5] border-b border-[#D0E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#EAF2ED] border border-[#D0E4DA] text-[#163A2D] font-mono text-xs uppercase font-bold tracking-widest mb-3">
            <span>Admission Gateway</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-black text-[#163A2D] tracking-tight mb-4">
            Admissions for Fall 2026 / Spring 2027
          </h2>
          <p className="text-[#4E7D68] text-base sm:text-lg leading-relaxed font-sans">
            Begin your journey towards professional mastery. Transparent admission pathways with merit scholarships up to 100%.
          </p>
        </div>

        {/* Step-by-Step Roadmap */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <h3 className="font-sans text-xl sm:text-2xl font-black text-[#163A2D]">
              7-Step Streamlined Admission Process
            </h3>
            <p className="text-xs sm:text-sm text-[#4E7D68] mt-1 font-sans">
              From online program selection to campus orientation
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {ADMISSION_STEPS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-[#163A2D] p-4 shadow-none hover:bg-[#EAF2ED] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-8 h-8 bg-[#EAF2ED] group-hover:bg-[#163A2D] group-hover:text-[#FAD02C] text-[#163A2D] font-mono font-bold text-xs flex items-center justify-center mb-2 transition-colors">
                    {item.step}
                  </div>
                  <h4 className="font-sans text-sm font-black text-[#163A2D] mb-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#4E7D68] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={onOpenApplyModal}
              className="inline-flex items-center space-x-2 bg-[#163A2D] hover:bg-[#0D241C] text-[#FAD02C] font-black uppercase tracking-wider text-xs px-6 py-3.5 border border-[#163A2D] cursor-pointer transition-colors"
            >
              <span>Start Online Application Form</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2-Column: Scholarship Matrix & Interactive Eligibility Calculator */}
        <span id="scholarships" className="relative -top-24 block pointer-events-none" />
        <div id="tuition-calculator" className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          {/* Left: Scholarships & Waivers */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#163A2D] bg-[#EAF2ED] border border-[#D0E4DA] px-3 py-1 w-fit font-mono">
              <Award className="w-4 h-4 text-[#FAD02C]" />
              <span>Institutional Scholarship Schemes</span>
            </div>
            <h3 className="font-sans text-2xl font-black text-[#163A2D]">
              Comprehensive Merit & Quota Waivers
            </h3>
            <p className="text-[#4E7D68] text-sm leading-relaxed">
              CCNUST believes financial constraints should never hinder a meritorious student's higher education. We provide extensive fee concessions:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {SCHOLARSHIPS.map((sch) => (
                <div
                  key={sch.id}
                  className="bg-white border-2 border-[#163A2D] p-4 shadow-none hover:bg-[#EAF2ED]/40 transition-colors"
                >
                  <div className="text-xs font-bold text-[#163A2D] bg-[#EAF2ED] border border-[#D0E4DA] px-2 py-0.5 w-fit mb-2 font-mono">
                    {sch.waiver}
                  </div>
                  <h4 className="font-sans text-sm font-black text-[#163A2D] mb-1">
                    {sch.title}
                  </h4>
                  <p className="text-xs text-[#4E7D68] leading-relaxed">
                    {sch.eligibility}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Interactive Waiver Estimator */}
          <div className="lg:col-span-5">
            <div className="bg-[#163A2D] text-white p-6 shadow-none border-2 border-[#163A2D]">
              <div className="flex items-center space-x-2 text-[#FAD02C] text-xs font-mono font-bold uppercase tracking-wider mb-2">
                <Calculator className="w-4 h-4" />
                <span>Instant Waiver Estimator</span>
              </div>

              <h3 className="font-sans text-xl font-black mb-4 text-white">
                Calculate Your Scholarship Eligibility
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#D0E4DA] font-bold mb-1 uppercase font-mono text-[11px] tracking-wider">
                    SSC / O-Level / Equivalent GPA (Out of 5.00):
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="2.00"
                    max="5.00"
                    value={calcSscGpa}
                    onChange={(e) => setCalcSscGpa(e.target.value)}
                    className="w-full bg-[#0F281E] border border-[#264E41] px-3 py-2 text-white focus:outline-none focus:border-[#FAD02C] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[#D0E4DA] font-bold mb-1 uppercase font-mono text-[11px] tracking-wider">
                    HSC / A-Level / Diploma GPA (Out of 5.00 / 4.00):
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="2.00"
                    max="5.00"
                    value={calcHscGpa}
                    onChange={(e) => setCalcHscGpa(e.target.value)}
                    className="w-full bg-[#0F281E] border border-[#264E41] px-3 py-2 text-white focus:outline-none focus:border-[#FAD02C] font-mono"
                  />
                </div>

                {/* Quota Checkboxes */}
                <div className="space-y-2 pt-2 border-t border-[#264E41]">
                  <label className="flex items-center space-x-2 cursor-pointer text-[#D0E4DA]">
                    <input
                      type="checkbox"
                      checked={isFreedomFighter}
                      onChange={(e) => setIsFreedomFighter(e.target.checked)}
                      className="accent-[#FAD02C]"
                    />
                    <span>Child of Gazetted Freedom Fighter</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer text-[#D0E4DA]">
                    <input
                      type="checkbox"
                      checked={isSibling}
                      onChange={(e) => setIsSibling(e.target.checked)}
                      className="accent-[#FAD02C]"
                    />
                    <span>Sibling / Spouse studying at CCNUST</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer text-[#D0E4DA]">
                    <input
                      type="checkbox"
                      checked={isFemale}
                      onChange={(e) => setIsFemale(e.target.checked)}
                      className="accent-[#FAD02C]"
                    />
                    <span>Female Student (Engineering & STEM)</span>
                  </label>
                </div>

                <button
                  onClick={handleCalculate}
                  className="w-full bg-[#FAD02C] hover:bg-[#F2C511] text-[#163A2D] text-xs font-black uppercase tracking-wider py-3 mt-2 cursor-pointer transition-colors"
                >
                  Estimate Tuition Waiver
                </button>

                {/* Estimated Output Banner */}
                <div className="bg-[#0F281E] border border-[#FAD02C]/40 p-3.5 mt-3 text-center">
                  <div className="text-[10px] uppercase font-mono text-[#FAD02C] font-semibold tracking-wider">
                    Estimated Scholarship Result:
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    {calculatedWaiver}
                  </div>
                  <div className="text-[10px] text-[#A3C7B5] mt-1">
                    *Subject to document verification at the Admissions Office.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Required Documents & FAQs */}
        <div id="admission-requirements" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Documents checklist */}
          <div className="lg:col-span-5 bg-white border-2 border-[#163A2D] p-6 shadow-none">
            <div className="flex items-center space-x-2 text-[#163A2D] font-bold text-xs uppercase tracking-wider mb-2 font-mono">
              <FileText className="w-4 h-4 text-[#FAD02C]" />
              <span>Checklist</span>
            </div>
            <h3 className="font-sans text-xl font-black text-[#163A2D] mb-4">
              Required Documents for Admission
            </h3>
            <ul className="space-y-3 text-xs text-[#4E7D68]">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#163A2D] shrink-0 mt-0.5" />
                <span>Original & 2 Attested photocopies of SSC & HSC Marksheets & Certificates</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#163A2D] shrink-0 mt-0.5" />
                <span>4 Copies of recent passport-size color photographs (White background)</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#163A2D] shrink-0 mt-0.5" />
                <span>Photocopy of National ID Card (NID) or Digital Birth Certificate</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#163A2D] shrink-0 mt-0.5" />
                <span>Father's / Mother's / Legal Guardian's NID copy</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#163A2D] shrink-0 mt-0.5" />
                <span>Freedom Fighter Gazette certificate (for FF quota applicants)</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#163A2D] shrink-0 mt-0.5" />
                <span>Official Transcript & Migration Certificate (for Credit Transfer students)</span>
              </li>
            </ul>
          </div>

          {/* FAQs Accordion */}
          <div className="lg:col-span-7 bg-white border-2 border-[#163A2D] p-6 shadow-none">
            <div className="flex items-center space-x-2 text-[#163A2D] font-bold text-xs uppercase tracking-wider mb-2 font-mono">
              <HelpCircle className="w-4 h-4 text-[#FAD02C]" />
              <span>Questions & Answers</span>
            </div>
            <h3 className="font-sans text-xl font-black text-[#163A2D] mb-4">
              Frequently Asked Questions (FAQ)
            </h3>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className="border border-[#D0E4DA] overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full text-left p-3.5 bg-[#FAF8F5] hover:bg-[#EAF2ED] flex items-center justify-between text-xs sm:text-sm font-bold text-[#163A2D] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#163A2D] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#4E7D68] shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="p-3.5 text-xs text-[#4E7D68] leading-relaxed bg-white border-t border-[#D0E4DA]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
