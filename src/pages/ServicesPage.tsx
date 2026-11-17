import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  Calendar,
  Building,
  GraduationCap,
  Layers,
  Sparkles,
  Search,
  CheckCircle2,
  FileText,
  Download,
  Printer,
  ExternalLink,
} from 'lucide-react';
import SectionAtmosphere from '../components/SectionAtmosphere';
import { ServiceModalTab } from '../components/CCNUSTServicesModal';
import SecondaryPageHeader, { SecondaryPageBottomNav } from '../components/SecondaryPageHeader';

interface ServicesPageProps {
  onOpenServiceModal: (tab?: ServiceModalTab) => void;
}

export default function ServicesPage({ onOpenServiceModal }: ServicesPageProps) {
  const [activeTab, setActiveTab] = useState<'result' | 'verification' | 'routine' | 'convocation' | 'carnival' | 'offices'>('result');
  const [studentId, setStudentId] = useState('');
  const [searched, setSearched] = useState(false);

  // Administrative wings data from ccnust.ac.bd
  const offices = [
    { name: 'Office of the Vice Chancellor', officer: 'Prof. Dr. Engr. Md. Shah Jahan', role: 'Chief Academic & Executive Head', contact: 'vc@ccnust.ac.bd / 01715-451599' },
    { name: 'Office of the Pro-Vice Chancellor', officer: 'Prof. Dr. Academic Chair', role: 'Curriculum & Research Development', contact: 'provc@ccnust.ac.bd' },
    { name: 'Office of the Registrar', officer: 'Md. Tariqul Islam Chowdhury (Chair)', role: 'Admissions, Registrations & Governance', contact: 'registrar@ccnust.ac.bd / 01888-042666' },
    { name: 'Office of the Controller of Examinations', officer: 'Controller Directorate', role: 'Transcripts, Exam Schedules, Result Publishing', contact: 'exam@ccnust.ac.bd / 01888-042667' },
    { name: 'Institutional Quality Assurance Cell (IQAC)', officer: 'Director IQAC', role: 'BAETE & UGC Outcome-Based Standards', contact: 'iqac@ccnust.ac.bd' },
    { name: 'Office of the Proctor & Welfare', officer: 'Chief Proctor Cell', role: 'Campus Discipline, Safety & Hostels', contact: 'proctor@ccnust.ac.bd' },
  ];

  return (
    <div className="min-h-screen bg-[#EFF6F2] pb-20">
      <SectionAtmosphere variant="light" showSakura={false} />

      {/* Sticky Secondary Page Back Navigation Bar */}
      <SecondaryPageHeader
        currentPageTitle="CCNUST Online Services & Portals"
        category="Services"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-[#EAF2ED] border border-[#D0E4DA] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-widest text-[#163A2D] mb-3 rounded">
            <Award className="w-3.5 h-3.5 text-[#FAD02C]" />
            <span>Official University Digital Portals</span>
          </div>
          <h1 className="font-sans text-3xl sm:text-5xl font-black text-[#163A2D] uppercase tracking-tight mb-4">
            CCNUST Online Services
          </h1>
          <p className="text-[#4E7D68] text-sm sm:text-base leading-relaxed">
            Direct access to semester result lookups, UGC student certificate verification, class & exam routines, convocation registration, and administration directories.
          </p>
        </div>

        {/* Top Service Selector Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {[
            { id: 'result', label: 'Semester Result', icon: Award, color: 'text-purple-600' },
            { id: 'verification', label: 'Verification', icon: ShieldCheck, color: 'text-rose-600' },
            { id: 'routine', label: 'All Routine', icon: Calendar, color: 'text-amber-600' },
            { id: 'convocation', label: 'Convocation', icon: GraduationCap, color: 'text-blue-600' },
            { id: 'carnival', label: 'Diploma Carnival', icon: Layers, color: 'text-emerald-600' },
            { id: 'offices', label: 'Admin Offices', icon: Building, color: 'text-slate-600' },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  setSearched(false);
                }}
                className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#163A2D] text-[#FAD02C] border-[#163A2D] shadow-lg scale-102 font-black'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-[#163A2D]'
                }`}
              >
                <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-[#FAD02C]' : item.color}`} />
                <span className="font-mono text-xs font-bold uppercase">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Semester Result Search */}
        {activeTab === 'result' && (
          <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-6 sm:p-10 shadow-md max-w-3xl mx-auto space-y-6">
            <div className="text-center">
              <span className="text-xs font-mono font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded uppercase">
                Controller of Examinations Portal (/search-resultID)
              </span>
              <h2 className="text-2xl font-sans font-black text-slate-900 mt-2">
                Semester Results Lookup
              </h2>
              <p className="text-xs font-mono text-slate-600 mt-1">
                Enter your student ID to view official semester grades, CGPA transcript, and credit completions.
              </p>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Enter Student ID (e.g. 22101004)"
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:border-[#163A2D]"
              />
              <button
                onClick={() => setSearched(true)}
                className="px-6 py-3 bg-[#163A2D] hover:bg-[#0F281E] text-[#FAD02C] font-mono font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>

            {searched && (
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4 font-mono text-xs animate-in fade-in">
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-slate-400 block text-[10px]">STUDENT NAME</span>
                    <span className="text-slate-900 font-bold text-sm">Md. Tanvir Ahmed</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px]">PROGRAM</span>
                    <span className="text-slate-900 font-bold">B.Sc. in CSE</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white p-2.5 rounded border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">SEMESTER GPA</span>
                    <span className="text-base font-black text-[#163A2D]">3.82</span>
                  </div>
                  <div className="bg-white p-2.5 rounded border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">CUMULATIVE CGPA</span>
                    <span className="text-base font-black text-purple-700">3.78</span>
                  </div>
                  <div className="bg-white p-2.5 rounded border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">CREDITS EARNED</span>
                    <span className="text-base font-black text-emerald-700">114 / 144</span>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 rounded text-xs flex items-center space-x-1 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Transcript</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Student Verification */}
        {activeTab === 'verification' && (
          <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-6 sm:p-10 shadow-md max-w-3xl mx-auto space-y-6">
            <div className="text-center">
              <span className="text-xs font-mono font-bold text-rose-700 bg-rose-100 px-3 py-1 rounded uppercase">
                Official UGC Verification Gateway (/search-student-verification)
              </span>
              <h2 className="text-2xl font-sans font-black text-slate-900 mt-2">
                Degree & Student Credential Verification
              </h2>
              <p className="text-xs font-mono text-slate-600 mt-1">
                Employer and institutional authentication gateway for CCNUST degree awards and graduation certificates.
              </p>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Student ID or Certificate Serial"
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:border-[#163A2D]"
              />
              <button
                onClick={() => setSearched(true)}
                className="px-6 py-3 bg-rose-700 hover:bg-rose-800 text-white font-mono font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify</span>
              </button>
            </div>

            {searched && (
              <div className="p-5 bg-emerald-50 border border-emerald-300 rounded-xl space-y-2 font-mono text-xs text-emerald-950 animate-in fade-in">
                <div className="flex items-center space-x-2 text-emerald-800 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Officially Authenticated by CCN University Registrar</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-200">
                  <div>Status: <span className="font-bold">Bonafide Registered Graduate</span></div>
                  <div>Accreditation: <span className="font-bold">UGC & Govt. Approved</span></div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: All Routine */}
        {activeTab === 'routine' && (
          <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-6 sm:p-10 shadow-md space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-sans font-black text-slate-900 uppercase">
                All Routine (Class, Lab & Examination Schedules)
              </h2>
              <p className="text-xs font-mono text-slate-600 mt-1">
                Published schedules for Fall 2026 semester classes and final semester examinations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              {[
                { title: 'B.Sc. in CSE — Class Routine', sem: 'Fall 2026', room: 'Lab 301-304' },
                { title: 'B.Sc. in EEE — Class Routine', sem: 'Fall 2026', room: 'Circuit Lab 201' },
                { title: 'B.Sc. in Civil — Class Routine', sem: 'Fall 2026', room: 'Drawing Studio' },
                { title: 'LL.B (Hons) — Court Schedule', sem: 'Fall 2026', room: 'Moot Court 102' },
                { title: 'BBA & MBA — Routine', sem: 'Fall 2026', room: 'Building B' },
                { title: 'B.A. in English — Routine', sem: 'Fall 2026', room: 'Language Lab' },
              ].map((r, i) => (
                <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="font-bold text-slate-900 text-sm">{r.title}</div>
                  <div className="text-slate-500">Term: {r.sem}</div>
                  <div className="text-slate-500">Venue: {r.room}</div>
                  <button
                    onClick={() => onOpenServiceModal('routine')}
                    className="text-xs font-bold text-[#163A2D] hover:underline flex items-center space-x-1 cursor-pointer pt-2"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Schedule (PDF)</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Convocation */}
        {activeTab === 'convocation' && (
          <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-6 sm:p-10 shadow-md max-w-3xl mx-auto space-y-4 font-mono text-xs">
            <h2 className="text-2xl font-sans font-black text-slate-900 uppercase">
              Convocation Registration Gateway
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Official registration for all completed degree candidates. Receive your academic gown, graduation certificate, and chancellor convocation dossier.
            </p>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-1 text-blue-950">
              <div className="font-bold">Convocation Venue: Permanent Campus Ground, Kotbari</div>
              <div>Eligibility: Graduating batches 2018 through 2026</div>
            </div>
            <button
              onClick={() => onOpenServiceModal('convocation')}
              className="px-6 py-3 bg-[#163A2D] text-[#FAD02C] font-bold uppercase rounded-xl cursor-pointer"
            >
              Open Interactive Registration Form
            </button>
          </div>
        )}

        {/* Tab 5: Carnival */}
        {activeTab === 'carnival' && (
          <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-6 sm:p-10 shadow-md max-w-3xl mx-auto space-y-4 font-mono text-xs">
            <h2 className="text-2xl font-sans font-black text-slate-900 uppercase">
              Diploma Engineers Carnival
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Specialized higher education pathway for polytechnic diploma engineering graduates from all over Bangladesh, featuring up to 50% waiver on credit transfers.
            </p>
            <button
              onClick={() => onOpenServiceModal('carnival')}
              className="px-6 py-3 bg-[#163A2D] text-[#FAD02C] font-bold uppercase rounded-xl cursor-pointer"
            >
              View Carnival Benefits & Register
            </button>
          </div>
        )}

        {/* Tab 6: Admin Offices */}
        {activeTab === 'offices' && (
          <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-6 sm:p-10 shadow-md space-y-6">
            <h2 className="text-2xl font-sans font-black text-slate-900 uppercase">
              Administrative Offices & Secretariat Directory (12 Wings)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {offices.map((off, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="font-bold text-slate-900 text-sm">{off.name}</div>
                  <div className="text-[#163A2D] font-bold">{off.officer}</div>
                  <div className="text-slate-500">{off.role}</div>
                  <div className="text-slate-600 text-[11px] pt-1">{off.contact}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Return to Main Page Section */}
        <SecondaryPageBottomNav />
      </div>
    </div>
  );
}
