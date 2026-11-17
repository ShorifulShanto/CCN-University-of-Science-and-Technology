import React, { useState } from 'react';
import {
  X,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  Phone,
  Mail,
  Award,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { FACULTIES } from '../universityData';
import { useCmsData } from '../lib/useCmsData';

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProgramId?: string;
}

export default function AdmissionModal({
  isOpen,
  onClose,
  initialProgramId,
}: AdmissionModalProps) {
  const { submitAdmission } = useCmsData();
  const [step, setStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [stepError, setStepError] = useState<string | null>(null);
  const [trackingCode, setTrackingCode] = useState<string>('');

  // Collect all available programs for dropdown
  const allPrograms: { id: string; name: string; degree: string; level: string }[] = [];
  FACULTIES.forEach((fac) => {
    fac.departments.forEach((dept) => {
      dept.programs.forEach((prog) => {
        allPrograms.push({
          id: prog.id,
          name: `${prog.name} (${prog.degree})`,
          degree: prog.degree,
          level: prog.level,
        });
      });
    });
  });

  const [formData, setFormData] = useState({
    programId: initialProgramId || allPrograms[0]?.id || '',
    semester: 'Fall 2026',
    shift: 'Day',
    applicantName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: 'male',
    fatherName: '',
    motherName: '',
    guardianPhone: '',
    address: '',
    sscRoll: '',
    sscGpa: '',
    sscBoard: 'Cumilla',
    sscYear: '2024',
    hscRoll: '',
    hscGpa: '',
    hscBoard: 'Cumilla',
    hscYear: '2026',
    quotaCategory: 'General Merit',
  });

  if (!isOpen) return null;

  const handleNext = () => {
    setStepError(null);
    if (step === 2) {
      if (
        !formData.applicantName.trim() ||
        !formData.email.trim() ||
        !formData.phone.trim() ||
        !formData.fatherName.trim() ||
        !formData.motherName.trim() ||
        !formData.address.trim()
      ) {
        setStepError('Please complete all required personal & guardian fields before continuing.');
        return;
      }
    }
    if (step === 3) {
      if (!formData.sscGpa.trim() || !formData.hscGpa.trim()) {
        setStepError('Please enter your SSC and HSC GPA scores before proceeding.');
        return;
      }
    }
    if (step < 4) setStep(step + 1);
  };

  const handlePrev = () => {
    setStepError(null);
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStepError(null);
    setIsSubmitting(true);
    try {
      const selectedProg = allPrograms.find((p) => p.id === formData.programId);
      const record = await submitAdmission({
        ...formData,
        programName: selectedProg?.name || formData.programId,
      });
      setTrackingCode(record.trackingNumber);
      setIsSubmitted(true);
    } catch (err: any) {
      setStepError(err?.message || 'Unable to submit application right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setIsSubmitted(false);
    setStepError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border-2 border-[#163A2D] max-w-2xl w-full shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#163A2D] text-white p-5 sm:p-6 flex items-center justify-between shrink-0 border-b-2 border-[#163A2D]">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#FAD02C] uppercase tracking-wider mb-0.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CCNUST Online Admission Portal</span>
            </div>
            <h2 className="font-sans text-lg sm:text-xl font-black">
              Application for Admission — Fall 2026
            </h2>
          </div>
          <button
            onClick={resetForm}
            className="p-1.5 text-[#D0E4DA] hover:text-[#FAD02C] hover:bg-[#0D241C] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator (If not submitted) */}
        {!isSubmitted && (
          <div className="bg-[#FAF8F5] border-b border-[#D0E4DA] px-6 py-3 shrink-0 flex items-center justify-between text-xs font-bold font-mono text-[#4E7D68]">
            <span className={step >= 1 ? 'text-[#163A2D] font-black' : ''}>1. Program</span>
            <span>&rarr;</span>
            <span className={step >= 2 ? 'text-[#163A2D] font-black' : ''}>2. Personal</span>
            <span>&rarr;</span>
            <span className={step >= 3 ? 'text-[#163A2D] font-black' : ''}>3. Academic</span>
            <span>&rarr;</span>
            <span className={step >= 4 ? 'text-[#163A2D] font-black' : ''}>4. Review</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto grow text-xs text-[#4E7D68] bg-[#FAF8F5]">
          {isSubmitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-[#EAF2ED] border-2 border-[#163A2D] text-[#163A2D] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="font-sans text-2xl font-black text-[#163A2D]">
                  Admission Application Submitted!
                </h3>
                <p className="text-[#4E7D68] text-xs sm:text-sm mt-1 max-w-md mx-auto">
                  Your application for <strong>{formData.semester}</strong> has been registered in the CCNUST admissions database.
                </p>
              </div>

              {/* Tracking Code Box */}
              <div className="bg-white border-2 border-[#163A2D] p-4 max-w-sm mx-auto text-center shadow-none">
                <div className="text-[11px] font-bold text-[#4E7D68] uppercase tracking-wider font-mono">
                  Your Application Tracking Code:
                </div>
                <div className="text-xl font-mono font-black text-[#163A2D] mt-1">
                  {trackingCode}
                </div>
                <div className="text-[10px] text-[#4E7D68] mt-1">
                  Please save this code for admission test admit card and result inquiries.
                </div>
              </div>

              <div className="bg-white border border-[#D0E4DA] p-4 text-left max-w-md mx-auto text-xs text-[#4E7D68] space-y-1.5">
                <div className="font-black text-[#163A2D] font-sans">Next Steps:</div>
                <div>1. The admissions section will verify your SSC/HSC transcript.</div>
                <div>2. You will receive an SMS with your Admission Test / Viva schedule.</div>
                <div>3. You can visit Kotbari campus or contact hotline: <strong>+880 1713-222333</strong>.</div>
              </div>

              <button
                onClick={resetForm}
                className="bg-[#163A2D] hover:bg-[#0D241C] text-[#FAD02C] text-xs font-black uppercase tracking-wider px-6 py-3 mt-2 border border-[#163A2D] cursor-pointer"
              >
                Close & Return to Website
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* STEP 1: Program Choice */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="font-black text-[#163A2D] text-sm font-sans">
                    Select Target Academic Program & Semester
                  </div>

                  <div>
                    <label className="block font-bold text-[#163A2D] uppercase font-mono text-[11px] mb-1">Target Degree Program *</label>
                    <select
                      value={formData.programId}
                      onChange={(e) => setFormData({ ...formData, programId: e.target.value })}
                      className="w-full bg-white border border-[#D0E4DA] p-2.5 text-xs text-[#163A2D] focus:border-[#163A2D] focus:outline-none"
                    >
                      {allPrograms.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} — {p.level}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-[#163A2D] uppercase font-mono text-[11px] mb-1">Target Semester *</label>
                      <select
                        value={formData.semester}
                        onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                        className="w-full bg-white border border-[#D0E4DA] p-2.5 text-xs text-[#163A2D] focus:border-[#163A2D] focus:outline-none"
                      >
                        <option value="Fall 2026">Fall 2026 (July - December)</option>
                        <option value="Spring 2027">Spring 2027 (January - June)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-[#163A2D] uppercase font-mono text-[11px] mb-1">Study Shift</label>
                      <select
                        value={formData.shift}
                        onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                        className="w-full bg-white border border-[#D0E4DA] p-2.5 text-xs text-[#163A2D] focus:border-[#163A2D] focus:outline-none"
                      >
                        <option value="Day">Day Batch (Regular)</option>
                        <option value="Evening">Evening / Friday Batch (Diploma / Executive)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Personal Info */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="font-black text-[#163A2D] text-sm font-sans">Applicant Personal Information</div>

                  <div>
                    <label className="block font-bold text-[#163A2D] uppercase font-mono text-[11px] mb-1">Full Legal Name (as per SSC) *</label>
                    <input
                      type="text"
                      required
                      value={formData.applicantName}
                      onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                      placeholder="e.g. Mohammad Abdullah"
                      className="w-full bg-white border border-[#D0E4DA] p-2.5 text-xs text-[#163A2D] focus:border-[#163A2D] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-[#163A2D] uppercase font-mono text-[11px] mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="applicant@example.com"
                        className="w-full bg-white border border-[#D0E4DA] p-2.5 text-xs text-[#163A2D] focus:border-[#163A2D] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#163A2D] uppercase font-mono text-[11px] mb-1">Mobile Contact Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+880 1XXXXXXXXX"
                        className="w-full bg-white border border-[#D0E4DA] p-2.5 text-xs text-[#163A2D] focus:border-[#163A2D] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-[#163A2D] uppercase font-mono text-[11px] mb-1">Father's Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.fatherName}
                        onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                        placeholder="Father's Name"
                        className="w-full bg-white border border-[#D0E4DA] p-2.5 text-xs text-[#163A2D] focus:border-[#163A2D] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#163A2D] uppercase font-mono text-[11px] mb-1">Mother's Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.motherName}
                        onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                        placeholder="Mother's Name"
                        className="w-full bg-white border border-[#D0E4DA] p-2.5 text-xs text-[#163A2D] focus:border-[#163A2D] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#163A2D] uppercase font-mono text-[11px] mb-1">Permanent / Present Address *</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Village/Road, Thana, District (e.g. Kotbari, Cumilla)"
                      className="w-full bg-white border border-[#D0E4DA] p-2.5 text-xs text-[#163A2D] focus:border-[#163A2D] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Academic Records */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="font-black text-[#163A2D] text-sm font-sans">Academic History & Results</div>

                  <div className="border-2 border-[#163A2D] p-3.5 bg-white space-y-3">
                    <div className="font-bold text-[#163A2D] font-sans">1. Secondary School Certificate (SSC / O-Level / Dakhil)</div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-[#163A2D] uppercase font-mono mb-1">GPA (Out of 5.00) *</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={formData.sscGpa}
                          onChange={(e) => setFormData({ ...formData, sscGpa: e.target.value })}
                          placeholder="5.00"
                          className="w-full bg-[#FAF8F5] border border-[#D0E4DA] p-2 text-xs text-[#163A2D] focus:border-[#163A2D] focus:outline-none font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[#163A2D] uppercase font-mono mb-1">Education Board *</label>
                        <select
                          value={formData.sscBoard}
                          onChange={(e) => setFormData({ ...formData, sscBoard: e.target.value })}
                          className="w-full bg-[#FAF8F5] border border-[#D0E4DA] p-2 text-xs text-[#163A2D] focus:border-[#163A2D] focus:outline-none"
                        >
                          <option value="Cumilla">Cumilla</option>
                          <option value="Dhaka">Dhaka</option>
                          <option value="Chattogram">Chattogram</option>
                          <option value="Rajshahi">Rajshahi</option>
                          <option value="Madrasah">Madrasah</option>
                          <option value="Technical">Technical</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[#163A2D] uppercase font-mono mb-1">Passing Year *</label>
                        <input
                          type="text"
                          required
                          value={formData.sscYear}
                          onChange={(e) => setFormData({ ...formData, sscYear: e.target.value })}
                          className="w-full bg-[#FAF8F5] border border-[#D0E4DA] p-2 text-xs text-[#163A2D] focus:border-[#163A2D] focus:outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-2 border-[#163A2D] p-3.5 bg-white space-y-3">
                    <div className="font-bold text-[#163A2D] font-sans">2. Higher Secondary (HSC / A-Level / Diploma in Engg)</div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-[#163A2D] uppercase font-mono mb-1">GPA (Out of 5.00 / 4.00) *</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={formData.hscGpa}
                          onChange={(e) => setFormData({ ...formData, hscGpa: e.target.value })}
                          placeholder="5.00"
                          className="w-full bg-[#FAF8F5] border border-[#D0E4DA] p-2 text-xs text-[#163A2D] focus:border-[#163A2D] focus:outline-none font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[#163A2D] uppercase font-mono mb-1">Education Board *</label>
                        <select
                          value={formData.hscBoard}
                          onChange={(e) => setFormData({ ...formData, hscBoard: e.target.value })}
                          className="w-full bg-[#FAF8F5] border border-[#D0E4DA] p-2 text-xs text-[#163A2D] focus:border-[#163A2D] focus:outline-none"
                        >
                          <option value="Cumilla">Cumilla</option>
                          <option value="Dhaka">Dhaka</option>
                          <option value="Chattogram">Chattogram</option>
                          <option value="Rajshahi">Rajshahi</option>
                          <option value="Madrasah">Madrasah</option>
                          <option value="BTEB (Polytechnic)">BTEB (Polytechnic Diploma)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[#163A2D] uppercase font-mono mb-1">Passing Year *</label>
                        <input
                          type="text"
                          required
                          value={formData.hscYear}
                          onChange={(e) => setFormData({ ...formData, hscYear: e.target.value })}
                          className="w-full bg-[#FAF8F5] border border-[#D0E4DA] p-2 text-xs text-[#163A2D] focus:border-[#163A2D] focus:outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Quota & Review */}
              {step === 4 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="font-black text-[#163A2D] text-sm font-sans">Quota & Scholarship Claim</div>

                  <div>
                    <label className="block font-bold text-[#163A2D] uppercase font-mono text-[11px] mb-1">Select Applicable Scholarship / Quota Category</label>
                    <select
                      value={formData.quotaCategory}
                      onChange={(e) => setFormData({ ...formData, quotaCategory: e.target.value })}
                      className="w-full bg-white border border-[#D0E4DA] p-2.5 text-xs text-[#163A2D] focus:border-[#163A2D] focus:outline-none"
                    >
                      <option value="General Merit">General Merit (Standard Fee / CGPA Waivers)</option>
                      <option value="Golden GPA 5.00">Golden GPA 5.00 (100% Tuition Fee Waiver)</option>
                      <option value="Freedom Fighter">Freedom Fighter Children Quota (100% Waiver)</option>
                      <option value="Female STEM">Female Student in Science & Engineering (20% Waiver)</option>
                      <option value="Sibling / Spouse">Sibling / Spouse of existing CCNUSTian (25% Waiver)</option>
                      <option value="Underprivileged / Ethnic">Underprivileged / Ethnic Minorities</option>
                    </select>
                  </div>

                  {/* Summary Check */}
                  <div className="bg-white border-2 border-[#163A2D] p-4 space-y-2 text-xs">
                    <div className="font-black text-[#163A2D] font-sans">Application Summary:</div>
                    <div className="grid grid-cols-2 gap-2 text-[#4E7D68]">
                      <div>Applicant: <strong className="text-[#163A2D]">{formData.applicantName || 'Not entered'}</strong></div>
                      <div>Contact: <strong className="text-[#163A2D]">{formData.phone || 'Not entered'}</strong></div>
                      <div>SSC GPA: <strong className="text-[#163A2D]">{formData.sscGpa || 'N/A'}</strong></div>
                      <div>HSC GPA: <strong className="text-[#163A2D]">{formData.hscGpa || 'N/A'}</strong></div>
                      <div className="col-span-2">Quota: <strong className="text-[#163A2D]">{formData.quotaCategory}</strong></div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-[11px] text-[#4E7D68]">
                    <input type="checkbox" required id="confirmDeclaration" className="accent-[#163A2D]" />
                    <label htmlFor="confirmDeclaration">
                      I declare that all information provided above is accurate according to my official certificates.
                    </label>
                  </div>
                </div>
              )}

              {stepError && (
                <div className="p-3 bg-rose-50 border border-rose-300 text-rose-800 text-xs font-mono flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{stepError}</span>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="pt-4 border-t border-[#D0E4DA] flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-4 py-2 border border-[#163A2D] text-[#163A2D] font-bold hover:bg-white flex items-center space-x-1 uppercase tracking-wider text-xs cursor-pointer font-mono"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>
                ) : (
                  <div></div>
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-[#163A2D] hover:bg-[#0D241C] text-white text-xs font-black uppercase tracking-wider py-2.5 px-5 flex items-center space-x-1 border border-[#163A2D] cursor-pointer"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#163A2D] hover:bg-[#0D241C] disabled:opacity-60 disabled:cursor-not-allowed text-[#FAD02C] text-xs font-black uppercase tracking-wider py-2.5 px-6 border border-[#163A2D] cursor-pointer transition-colors"
                  >
                    {isSubmitting ? 'Submitting Application...' : 'Submit Application & Generate Code'}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
