import React, { useState } from 'react';
import {
  Users,
  Award,
  Globe,
  Briefcase,
  Search,
  CheckCircle2,
  Send,
  Linkedin,
  MapPin,
  Calendar,
  Sparkles,
  GraduationCap,
} from 'lucide-react';
import SectionAtmosphere from '../components/SectionAtmosphere';
import SecondaryPageHeader from '../components/SecondaryPageHeader';
import { ALUMNI_STATS, ALUMNI_PROFILES } from '../universityData';
import { AlumniProfile } from '../types';

export default function AlumniPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [reunionNotice, setReunionNotice] = useState(false);

  // Alumni Registration State
  const [regForm, setRegForm] = useState({
    name: '',
    email: '',
    phone: '',
    degree: 'B.Sc. in Computer Science & Engineering',
    graduationYear: '2024',
    currentCompany: '',
    designation: '',
    location: 'Dhaka, Bangladesh',
    isWillingToMentor: true,
    submitted: false,
  });

  const departments = ['All', 'CSE', 'Civil Engineering', 'EEE', 'Pharmacy', 'Law', 'Business Administration'];

  const filteredAlumni = ALUMNI_PROFILES.filter((alumni) => {
    const matchesSearch =
      alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.currentRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || alumni.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const handleRegisterAlumni = (e: React.FormEvent) => {
    e.preventDefault();
    setRegForm({ ...regForm, submitted: true });
  };

  return (
    <div className="min-h-screen bg-[#EFF6F2] pb-24 text-[#163A2D]">
      <SectionAtmosphere variant="light" />

      {/* Sticky Top Header */}
      <SecondaryPageHeader
        currentPageTitle="CCNUST Alumni Association"
        category="Global Network"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-4">
        {/* Hero Section inspired by BUP & MIST Alumni Portals */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-[#EAF2ED] border border-[#D0E4DA] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-widest text-[#163A2D] mb-3.5 rounded shadow-xs">
            <Users className="w-4 h-4 text-[#FAD02C]" />
            <span>Lifelong Fellowship & Industry Leadership</span>
          </div>
          <h1 className="font-sans text-3xl sm:text-5xl font-black text-[#163A2D] uppercase tracking-tight mb-3">
            CCNUST Alumni Association
          </h1>
          <p className="text-[#4E7D68] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Connecting 6,500+ CCNUST engineers, lawyers, executives, and pharmacists making impactful contributions across Bangladesh, Silicon Valley, Europe, and Asia.
          </p>

          <div className="flex items-center justify-center space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setShowRegisterForm(!showRegisterForm)}
              className="px-5 py-2.5 rounded-xl bg-[#163A2D] hover:bg-[#0D241C] text-[#FAD02C] font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center space-x-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>{showRegisterForm ? 'Close Registration Form' : 'Register in Alumni Directory'}</span>
            </button>
          </div>
        </div>

        {/* Global Impact Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-5 text-center shadow-xs">
            <div className="font-sans text-2xl sm:text-3xl font-black text-[#163A2D]">
              {ALUMNI_STATS.totalGraduates}
            </div>
            <div className="text-[11px] font-mono text-slate-500 uppercase mt-1 font-bold">
              Total Graduates Enrolled
            </div>
          </div>

          <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-5 text-center shadow-xs">
            <div className="font-sans text-2xl sm:text-3xl font-black text-emerald-800">
              {ALUMNI_STATS.employedWithin6Months}
            </div>
            <div className="text-[11px] font-mono text-slate-500 uppercase mt-1 font-bold">
              Employed Within 6 Months
            </div>
          </div>

          <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-5 text-center shadow-xs">
            <div className="font-sans text-2xl sm:text-3xl font-black text-[#163A2D]">
              {ALUMNI_STATS.globalChapters}
            </div>
            <div className="text-[11px] font-mono text-slate-500 uppercase mt-1 font-bold">
              Overseas Chapters
            </div>
          </div>

          <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-5 text-center shadow-xs">
            <div className="font-sans text-2xl sm:text-3xl font-black text-amber-700">
              {ALUMNI_STATS.alumniFundRaised}
            </div>
            <div className="text-[11px] font-mono text-slate-500 uppercase mt-1 font-bold">
              Student Endowment Raised
            </div>
          </div>
        </div>

        {/* Alumni Registration Card (Collapsible) */}
        {showRegisterForm && (
          <div className="bg-white border-2 border-[#163A2D] rounded-3xl p-6 sm:p-8 shadow-xl mb-12 animate-in fade-in max-w-3xl mx-auto">
            <div className="mb-6 pb-4 border-b border-slate-200">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#163A2D] bg-[#EAF2ED] px-2 py-0.5 rounded border border-[#D0E4DA]">
                ALUMNI MEMBERSHIP ENROLLMENT
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-sans text-slate-900 mt-1">
                Official CCNUST Alumni Roster
              </h2>
              <p className="text-xs font-mono text-slate-600 mt-1">
                Join our verified directory, receive reunion invitations, and optionally mentor current undergraduate juniors.
              </p>
            </div>

            {regForm.submitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-300 rounded-2xl text-center space-y-3 font-mono text-xs">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-emerald-950">Thank You, {regForm.name}!</h3>
                <p className="text-slate-700">
                  Your alumni profile has been received by the Secretariat. Your digital Alumni Card and reunion invitations will be sent to {regForm.email}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegisterAlumni} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Engr. Sumon Ahmed"
                      value={regForm.name}
                      onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-slate-300 rounded-lg focus:outline-none focus:border-[#163A2D]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Contact Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sumon@company.com"
                      value={regForm.email}
                      onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-slate-300 rounded-lg focus:outline-none focus:border-[#163A2D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Degree Completed *</label>
                    <select
                      value={regForm.degree}
                      onChange={(e) => setRegForm({ ...regForm, degree: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-slate-300 rounded-lg focus:outline-none focus:border-[#163A2D]"
                    >
                      <option>B.Sc. in Computer Science & Engineering</option>
                      <option>B.Sc. in Civil Engineering</option>
                      <option>B.Sc. in Electrical & Electronic Engineering</option>
                      <option>Bachelor of Pharmacy (B.Pharm)</option>
                      <option>Bachelor of Laws (LL.B. Hons)</option>
                      <option>Bachelor of Business Administration (BBA)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Graduation Passing Year *</label>
                    <input
                      type="number"
                      required
                      min={2014}
                      max={2026}
                      value={regForm.graduationYear}
                      onChange={(e) => setRegForm({ ...regForm, graduationYear: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-slate-300 rounded-lg focus:outline-none focus:border-[#163A2D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Current Company / Organization *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. bKash / Google / Ministry of ICT"
                      value={regForm.currentCompany}
                      onChange={(e) => setRegForm({ ...regForm, currentCompany: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-slate-300 rounded-lg focus:outline-none focus:border-[#163A2D]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Current Designation *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Senior Software Engineer"
                      value={regForm.designation}
                      onChange={(e) => setRegForm({ ...regForm, designation: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-slate-300 rounded-lg focus:outline-none focus:border-[#163A2D]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-center space-x-2 text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={regForm.isWillingToMentor}
                      onChange={(e) => setRegForm({ ...regForm, isWillingToMentor: e.target.checked })}
                    />
                    <span>I am willing to mentor current CCNUST students and review resumes/projects.</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#163A2D] hover:bg-[#0D241C] text-[#FAD02C] font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Alumni Profile</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* Search & Department Filters */}
        <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-4 sm:p-5 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by alumni name, role, company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-slate-300 rounded-xl text-xs font-mono focus:outline-none focus:border-[#163A2D]"
            />
          </div>

          <div className="flex items-center space-x-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 font-mono text-xs">
            <span className="font-bold text-slate-500 whitespace-nowrap mr-1">Discipline:</span>
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                  selectedDept === dept
                    ? 'bg-[#163A2D] text-[#FAD02C] font-bold'
                    : 'bg-[#FAF8F5] text-slate-700 hover:bg-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Alumni Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredAlumni.map((alumni) => (
            <div
              key={alumni.id}
              className="bg-white border-2 border-[#163A2D] rounded-2xl p-5 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-3.5 mb-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#163A2D] shrink-0 bg-[#0F281E]">
                    <img
                      src={alumni.image}
                      alt={alumni.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[9px] font-mono font-bold bg-[#EAF2ED] text-[#163A2D] px-2 py-0.5 rounded uppercase">
                        Class of {alumni.graduationYear}
                      </span>
                      {alumni.isMentor && (
                        <span className="text-[9px] font-mono font-bold bg-[#FAD02C] text-[#163A2D] px-1.5 py-0.5 rounded">
                          MENTOR
                        </span>
                      )}
                    </div>
                    <h3 className="font-sans font-black text-base text-slate-900 mt-0.5">
                      {alumni.name}
                    </h3>
                    <div className="text-[11px] font-mono text-[#4E7D68] font-bold">
                      {alumni.degree}
                    </div>
                  </div>
                </div>

                <div className="bg-[#FAF8F5] border border-[#D0E4DA] rounded-xl p-3 font-mono text-xs space-y-1 mb-3">
                  <div className="font-bold text-slate-900">{alumni.currentRole}</div>
                  <div className="text-emerald-800 font-semibold">{alumni.company}</div>
                  <div className="text-slate-500 text-[11px] flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{alumni.location}</span>
                  </div>
                </div>

                <p className="text-xs font-mono text-slate-600 leading-relaxed">
                  {alumni.achievement}
                </p>

                {alumni.quote && (
                  <p className="text-[11px] italic text-[#163A2D] border-l-2 border-[#FAD02C] pl-2.5 mt-3 pt-0.5 font-sans">
                    "{alumni.quote}"
                  </p>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between font-mono text-xs">
                <span className="text-[10px] text-slate-400">Verified Alumni</span>
                {alumni.linkedinUrl && (
                  <a
                    href={alumni.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-[#163A2D] hover:text-[#FAD02C] font-bold text-xs"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-blue-700" />
                    <span>Connect</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Annual Homecoming & Reunion Announcement */}
        <div className="bg-[#163A2D] text-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-[#163A2D]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#FAD02C] font-bold">
                ANNUAL HOMECOMING & GALA
              </span>
              <h3 className="text-2xl font-sans font-black">
                CCNUST Grand Alumni Reunion 2026
              </h3>
              <p className="text-xs text-[#D0E4DA] font-mono leading-relaxed max-w-xl">
                Join fellow graduates on the lush Kotbari hills for keynote addresses, industry networking dinners, faculty felicitations, and the election of the 2026-2028 Alumni Executive Committee.
              </p>
              <div className="flex items-center space-x-4 pt-1 font-mono text-xs text-[#FAD02C]">
                <span>Date: December 18, 2026</span>
                <span>•</span>
                <span>Venue: Central Auditorium & Pavilion, Kotbari</span>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end space-y-2 shrink-0">
              <button
                type="button"
                onClick={() => setReunionNotice(true)}
                className="px-6 py-3 bg-[#FAD02C] hover:bg-[#FEF08A] text-[#163A2D] font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer shrink-0"
              >
                Reserve Reunion Pass
              </button>
              {reunionNotice && (
                <div className="text-[11px] font-mono text-[#FEF08A] bg-[#0F281E] border border-[#FAD02C]/40 rounded-lg px-3 py-2 max-w-xs text-center md:text-right">
                  Reunion pass booking opens November 1, 2026 via the Alumni Secretariat.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
