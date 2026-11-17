import React, { useState } from 'react';
import {
  Briefcase,
  Building2,
  DollarSign,
  Clock,
  MapPin,
  CheckCircle2,
  Send,
  Users,
  Search,
  FileText,
  Calendar,
  Sparkles,
  ExternalLink,
  Phone,
  Mail,
  ChevronRight,
  X,
} from 'lucide-react';
import SectionAtmosphere from '../components/SectionAtmosphere';
import SecondaryPageHeader from '../components/SecondaryPageHeader';
import { CORPORATE_PARTNERS, CAREER_PLACEMENTS } from '../universityData';
import { JobInternship } from '../types';

export default function PlacementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedJob, setSelectedJob] = useState<JobInternship | null>(null);
  const [applyModalJob, setApplyModalJob] = useState<JobInternship | null>(null);
  const [counselingBooked, setCounselingBooked] = useState(false);

  // Application Modal Form State
  const [applicant, setApplicant] = useState({
    name: '',
    email: '',
    phone: '',
    cgpa: '',
    department: 'Computer Science & Engineering',
    graduationYear: '2026',
    portfolioUrl: '',
    coverNote: '',
    submitted: false,
  });

  const jobTypes = ['All', 'Full-time', 'Internship', 'Trainee Engineer'];

  const filteredJobs = CAREER_PLACEMENTS.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.eligibleDepartments.some((d) => d.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'All' || job.jobType === selectedType;
    return matchesSearch && matchesType;
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplicant((prev) => ({ ...prev, submitted: true }));
  };

  return (
    <div className="min-h-screen bg-[#EFF6F2] pb-24 text-[#163A2D]">
      <SectionAtmosphere variant="light" />

      {/* Sticky Top Header */}
      <SecondaryPageHeader
        currentPageTitle="Career Placement & Internships"
        category="Industry Linkage"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-4">
        {/* Hero Section inspired by BUP CPC & MIST Placement */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-[#EAF2ED] border border-[#D0E4DA] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-widest text-[#163A2D] mb-3.5 rounded shadow-xs">
            <Briefcase className="w-4 h-4 text-[#FAD02C]" />
            <span>Corporate Relations & Graduate Employment Hub</span>
          </div>
          <h1 className="font-sans text-3xl sm:text-5xl font-black text-[#163A2D] uppercase tracking-tight mb-3">
            Career Placement & Internship Cell
          </h1>
          <p className="text-[#4E7D68] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Bridging classroom academics with national industry leaders. Coordinating corporate on-campus recruitments, internships, and career workshops for graduating seniors.
          </p>
        </div>

        {/* Corporate Partner Employers Showcase */}
        <div className="bg-white border-2 border-[#163A2D] rounded-3xl p-6 sm:p-8 shadow-md mb-12">
          <div className="text-center mb-6">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#163A2D] bg-[#EAF2ED] px-2.5 py-0.5 rounded border border-[#D0E4DA]">
              STRATEGIC INDUSTRY RECRUITERS
            </span>
            <h2 className="text-lg sm:text-xl font-black font-sans text-slate-900 mt-1">
              Top Corporate Partners Hiring CCNUST Graduates
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CORPORATE_PARTNERS.map((partner, idx) => (
              <div
                key={idx}
                className="bg-[#FAF8F5] border border-[#D0E4DA] hover:border-[#163A2D] rounded-2xl p-4 text-center transition-all hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-[#163A2D] text-[#FAD02C] flex items-center justify-center mx-auto mb-2 font-bold shadow-xs">
                  <Building2 className="w-5 h-5" />
                </div>
                <h4 className="font-sans font-black text-xs text-slate-900 truncate">
                  {partner.name}
                </h4>
                <div className="text-[10px] font-mono text-slate-500 mt-0.5 truncate">
                  {partner.sector}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-4 sm:p-5 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by job title, company, or major..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-slate-300 rounded-xl text-xs font-mono focus:outline-none focus:border-[#163A2D]"
            />
          </div>

          <div className="flex items-center space-x-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 font-mono text-xs">
            <span className="font-bold text-slate-500 whitespace-nowrap mr-1">Job Type:</span>
            {jobTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                  selectedType === type
                    ? 'bg-[#163A2D] text-[#FAD02C] font-bold'
                    : 'bg-[#FAF8F5] text-slate-700 hover:bg-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Jobs & Internships Matrix */}
        <div className="space-y-4 mb-12">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border-2 border-[#163A2D] rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-lg transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded uppercase tracking-wider ${
                      job.jobType === 'Internship'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : job.jobType === 'Trainee Engineer'
                        ? 'bg-blue-100 text-blue-900 border border-blue-300'
                        : 'bg-[#163A2D] text-[#FAD02C]'
                    }`}
                  >
                    {job.jobType}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    Deadline: <strong>{job.deadline}</strong>
                  </span>
                  {job.featured && (
                    <span className="text-[10px] font-mono font-bold bg-[#FAD02C] text-[#163A2D] px-2 py-0.5 rounded">
                      FEATURED OPENING
                    </span>
                  )}
                </div>

                <h3 className="font-sans font-black text-lg text-slate-900 leading-snug">
                  {job.title}
                </h3>

                <div className="text-xs font-mono text-[#4E7D68] font-bold flex flex-wrap items-center gap-3">
                  <span>{job.company}</span>
                  <span>•</span>
                  <span>{job.location}</span>
                  <span>•</span>
                  <span className="text-emerald-800">{job.salaryRange}</span>
                </div>

                <p className="text-xs font-mono text-slate-600 leading-relaxed max-w-3xl">
                  {job.description}
                </p>

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase mr-1">Eligible:</span>
                  {job.eligibleDepartments.map((dept, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono bg-[#EAF2ED] text-[#163A2D] px-2 py-0.5 rounded font-semibold"
                    >
                      {dept}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 shrink-0 w-full md:w-auto pt-2 md:pt-0">
                <button
                  type="button"
                  onClick={() => setSelectedJob(job)}
                  className="w-1/2 md:w-auto px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-slate-200 text-slate-800 font-mono text-xs font-bold transition-all border border-slate-300 cursor-pointer"
                >
                  View Details
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setApplyModalJob(job);
                    setApplicant((prev) => ({ ...prev, submitted: false }));
                  }}
                  className="w-1/2 md:w-auto px-4 py-2 rounded-xl bg-[#163A2D] hover:bg-[#0D241C] text-[#FAD02C] font-mono text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center space-x-1.5"
                >
                  <span>Apply Now</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Career Counseling & Guidance Banner */}
        <div className="bg-[#163A2D] text-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-[#163A2D]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#FAD02C] font-bold">
                STUDENT CAREER COUNSELING & RESUME CLINIC
              </span>
              <h3 className="text-xl sm:text-2xl font-sans font-black">
                Need Help with Your Resume or Interview Preparation?
              </h3>
              <p className="text-xs text-[#D0E4DA] font-mono leading-relaxed">
                The Placement Cell organizes weekly one-on-one resume reviews, mock technical interview sessions, and LinkedIn profile optimization for 7th & 8th-semester undergraduates.
              </p>
              <div className="flex items-center space-x-3 pt-2 font-mono text-xs text-[#FAD02C]">
                <span>Room 304, Central Academic Complex</span>
                <span>•</span>
                <span>Email: placement@ccnust.ac.bd</span>
              </div>
            </div>

            <div className="text-center md:text-right space-y-2">
              <button
                type="button"
                onClick={() => setCounselingBooked(true)}
                className="px-6 py-3 bg-[#FAD02C] hover:bg-[#FEF08A] text-[#163A2D] font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
              >
                Book Counseling Session
              </button>
              {counselingBooked && (
                <div className="text-[11px] font-mono text-[#FEF08A] bg-[#0F281E] border border-[#FAD02C]/40 rounded-lg px-3 py-2 text-left">
                  Bookings open: email <span className="underline">placement@ccnust.ac.bd</span> with your Student ID to confirm a slot.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border-2 border-[#163A2D] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative font-mono text-xs">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 p-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold uppercase tracking-widest bg-[#EAF2ED] text-[#163A2D] px-2.5 py-0.5 rounded inline-block mb-2">
              {selectedJob.companyType} • {selectedJob.jobType}
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-sans text-slate-900">
              {selectedJob.title}
            </h2>
            <div className="text-sm font-bold text-emerald-800 mt-1">
              {selectedJob.company} • {selectedJob.location}
            </div>

            <div className="grid grid-cols-2 gap-3 my-4 p-3 bg-[#FAF8F5] rounded-xl border border-[#D0E4DA]">
              <div>Salary: <strong>{selectedJob.salaryRange}</strong></div>
              <div>Deadline: <strong>{selectedJob.deadline}</strong></div>
            </div>

            <div className="space-y-4 text-slate-700">
              <div>
                <strong className="block text-slate-900 mb-1">Role Description:</strong>
                <p className="leading-relaxed">{selectedJob.description}</p>
              </div>

              <div>
                <strong className="block text-slate-900 mb-1">Key Responsibilities:</strong>
                <ul className="space-y-1 list-disc pl-4 text-slate-600">
                  {selectedJob.keyResponsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="block text-slate-900 mb-1">Requirements:</strong>
                <ul className="space-y-1 list-disc pl-4 text-slate-600">
                  {selectedJob.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-bold cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setApplyModalJob(selectedJob);
                  setSelectedJob(null);
                }}
                className="px-5 py-2 rounded-lg bg-[#163A2D] text-[#FAD02C] font-bold shadow-sm cursor-pointer"
              >
                Proceed to Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Direct Application Submission Modal */}
      {applyModalJob && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border-2 border-[#163A2D] max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative font-mono text-xs">
            <button
              onClick={() => setApplyModalJob(null)}
              className="absolute top-4 right-4 p-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold uppercase tracking-widest text-[#163A2D] bg-[#EAF2ED] px-2 py-0.5 rounded">
              JOB APPLICATION
            </span>
            <h2 className="text-lg font-black font-sans text-slate-900 mt-1">
              Apply for {applyModalJob.title}
            </h2>
            <div className="text-xs text-slate-500 mb-4">{applyModalJob.company}</div>

            {applicant.submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-sm font-bold text-emerald-950">Application Dispatched!</h3>
                <p className="text-slate-600">
                  Your profile and application have been submitted to the recruitment team at {applyModalJob.company} via the CCNUST Career Placement Office.
                </p>
                <button
                  type="button"
                  onClick={() => setApplyModalJob(null)}
                  className="px-4 py-2 bg-[#163A2D] text-[#FAD02C] font-bold rounded-lg cursor-pointer mt-2"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariqul Hasan"
                    value={applicant.name}
                    onChange={(e) => setApplicant({ ...applicant, name: e.target.value })}
                    className="w-full p-2 bg-[#FAF8F5] border border-slate-300 rounded text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="student@ccnust.ac.bd"
                      value={applicant.email}
                      onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
                      className="w-full p-2 bg-[#FAF8F5] border border-slate-300 rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Mobile Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="01715-451599"
                      value={applicant.phone}
                      onChange={(e) => setApplicant({ ...applicant, phone: e.target.value })}
                      className="w-full p-2 bg-[#FAF8F5] border border-slate-300 rounded text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Current CGPA</label>
                    <input
                      type="text"
                      placeholder="e.g. 3.75"
                      value={applicant.cgpa}
                      onChange={(e) => setApplicant({ ...applicant, cgpa: e.target.value })}
                      className="w-full p-2 bg-[#FAF8F5] border border-slate-300 rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Passing Year</label>
                    <input
                      type="text"
                      value={applicant.graduationYear}
                      onChange={(e) => setApplicant({ ...applicant, graduationYear: e.target.value })}
                      className="w-full p-2 bg-[#FAF8F5] border border-slate-300 rounded text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Portfolio / GitHub / LinkedIn Link</label>
                  <input
                    type="url"
                    placeholder="https://github.com/username or linkedin.com/in/..."
                    value={applicant.portfolioUrl}
                    onChange={(e) => setApplicant({ ...applicant, portfolioUrl: e.target.value })}
                    className="w-full p-2 bg-[#FAF8F5] border border-slate-300 rounded text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Brief Pitch / Cover Statement</label>
                  <textarea
                    rows={3}
                    placeholder="Why are you suitable for this position?"
                    value={applicant.coverNote}
                    onChange={(e) => setApplicant({ ...applicant, coverNote: e.target.value })}
                    className="w-full p-2 bg-[#FAF8F5] border border-slate-300 rounded text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#163A2D] hover:bg-[#0D241C] text-[#FAD02C] font-bold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center justify-center space-x-1.5 shadow-sm mt-3"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Application to {applyModalJob.company}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
