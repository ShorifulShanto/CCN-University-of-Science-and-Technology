import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Building2,
  Award,
  Eye,
  Target,
  History,
  Users,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Landmark,
  FileText,
  Compass,
  Phone,
  Mail,
  MapPin,
  Clock,
  Bus,
  Send,
  MessageSquare,
} from 'lucide-react';
import { UNIVERSITY_INFO, UNIVERSITY_LEADERSHIP } from '../universityData';
import SectionAtmosphere from './SectionAtmosphere';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<'overview' | 'vision' | 'leadership' | 'authorities' | 'accreditation' | 'contact'>('overview');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Academic Inquiry',
    message: '',
    submitted: false,
  });

  useEffect(() => {
    const handleNavigation = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#contact' || hash === '#about-contact') {
        setActiveTab('contact');
      } else if (hash === '#leadership') {
        setActiveTab('leadership');
      } else if (hash === '#about-mission' || hash === '#vision') {
        setActiveTab('vision');
      } else if (hash === '#about') {
        setActiveTab('overview');
      }
    };

    handleNavigation();
    window.addEventListener('hashchange', handleNavigation);
    const customListener = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail === 'contact') setActiveTab('contact');
      else if (customEvent.detail === 'leadership') setActiveTab('leadership');
      else if (customEvent.detail === 'vision') setActiveTab('vision');
      else if (customEvent.detail === 'overview') setActiveTab('overview');
    };
    window.addEventListener('set-about-tab', customListener);

    return () => {
      window.removeEventListener('hashchange', handleNavigation);
      window.removeEventListener('set-about-tab', customListener);
    };
  }, []);

  return (
    <section id="about" className="relative py-20 bg-[#FAF8F5] border-b-2 border-[#163A2D] overflow-hidden">
      {/* Ambient Animation Atmosphere */}
      <SectionAtmosphere variant="light" showFog={true} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="font-mono text-xs font-bold text-[#163A2D] bg-[#EAF2ED] border border-[#D0E4DA] px-3 py-1 inline-block uppercase tracking-wider mb-3">
            <span>01 // About The Institution</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-black text-[#163A2D] uppercase tracking-tight mb-4">
            CCN University of Science & Technology
          </h2>
          <p className="text-[#4E7D68] text-base sm:text-lg leading-relaxed">
            Established in 2014 under the Private University Act 2010. Fostering scientific inquiry, ethical leadership, and technological innovation in Kotbari, Cumilla.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 border-b border-[#D0E4DA] pb-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-mono text-xs sm:text-sm font-bold uppercase transition-all cursor-pointer border ${
              activeTab === 'overview'
                ? 'bg-[#163A2D] text-white border-[#163A2D] shadow-none'
                : 'text-[#163A2D] bg-white border-[#D0E4DA] hover:bg-[#FAF8F5]'
            }`}
          >
            Overview & History
          </button>
          <button
            onClick={() => setActiveTab('vision')}
            className={`px-4 py-2 font-mono text-xs sm:text-sm font-bold uppercase transition-all cursor-pointer border ${
              activeTab === 'vision'
                ? 'bg-[#163A2D] text-white border-[#163A2D] shadow-none'
                : 'text-[#163A2D] bg-white border-[#D0E4DA] hover:bg-[#FAF8F5]'
            }`}
          >
            Vision & Mission
          </button>
          <button
            onClick={() => setActiveTab('leadership')}
            className={`px-4 py-2 font-mono text-xs sm:text-sm font-bold uppercase transition-all cursor-pointer border ${
              activeTab === 'leadership'
                ? 'bg-[#163A2D] text-white border-[#163A2D] shadow-none'
                : 'text-[#163A2D] bg-white border-[#D0E4DA] hover:bg-[#FAF8F5]'
            }`}
          >
            University Leadership
          </button>
          <button
            onClick={() => setActiveTab('authorities')}
            className={`px-4 py-2 font-mono text-xs sm:text-sm font-bold uppercase transition-all cursor-pointer border ${
              activeTab === 'authorities'
                ? 'bg-[#163A2D] text-white border-[#163A2D] shadow-none'
                : 'text-[#163A2D] bg-white border-[#D0E4DA] hover:bg-[#FAF8F5]'
            }`}
          >
            Statutory Authorities
          </button>
          <button
            onClick={() => setActiveTab('accreditation')}
            className={`px-4 py-2 font-mono text-xs sm:text-sm font-bold uppercase transition-all cursor-pointer border ${
              activeTab === 'accreditation'
                ? 'bg-[#163A2D] text-white border-[#163A2D] shadow-none'
                : 'text-[#163A2D] bg-white border-[#D0E4DA] hover:bg-[#FAF8F5]'
            }`}
          >
            Accreditation & Approval
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2 font-mono text-xs sm:text-sm font-bold uppercase transition-all cursor-pointer border flex items-center space-x-1.5 ${
              activeTab === 'contact'
                ? 'bg-[#163A2D] text-[#FAD02C] border-[#163A2D] shadow-none'
                : 'text-[#163A2D] bg-white border-[#D0E4DA] hover:bg-[#FAF8F5]'
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-[#FAD02C]" />
            <span>Campus Contact & Location</span>
          </button>
        </div>

        {/* Tab 1: Overview & History */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-200">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                <Landmark className="w-3.5 h-3.5" />
                <span>Estd. 2014 • Kotbari, Cumilla-3500, Bangladesh</span>
              </div>

              <h3 className="font-sans text-2xl sm:text-3xl font-black text-[#163A2D] uppercase tracking-tight">
                A Historic Beacon of Higher Learning in Greater Cumilla
              </h3>

              <p className="text-[#4E7D68] text-sm sm:text-base leading-relaxed">
                CCN University of Science & Technology (CCNUST) was founded with the noble objective of bridging the gap between theoretical knowledge and industry-ready technological mastery in Bangladesh.
              </p>

              <p className="text-[#4E7D68] text-sm sm:text-base leading-relaxed">
                Nestled adjacent to the ancient Buddhist archaeological heritage site of Shalban Vihara and the lush green Lalmai Hills in Kotbari, Cumilla, CCNUST provides an inspiring, tranquil atmosphere conducive to scientific research, philosophical contemplation, and intellectual growth.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                <div className="bg-white border-2 border-[#D0E4DA] p-3.5 text-center rounded-none">
                  <div className="font-sans text-xl font-black text-[#163A2D]">2014</div>
                  <div className="text-xs text-[#4E7D68] mt-0.5 font-mono">Year of Foundation</div>
                </div>
                <div className="bg-white border-2 border-[#D0E4DA] p-3.5 text-center rounded-none">
                  <div className="font-sans text-xl font-black text-[#163A2D]">Kotbari</div>
                  <div className="text-xs text-[#4E7D68] mt-0.5 font-mono">Heritage Campus</div>
                </div>
                <div className="bg-white border-2 border-[#D0E4DA] p-3.5 text-center rounded-none">
                  <div className="font-sans text-xl font-black text-[#163A2D]">Act 2010</div>
                  <div className="text-xs text-[#4E7D68] mt-0.5 font-mono">Statutory Charter</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative border-2 border-[#163A2D] overflow-hidden rounded-none shadow-md">
                <img
                  src="/ccnust_campus_kotbari.jpg"
                  alt="CCN University of Science & Technology Main Campus Building & Monument in Kotbari, Cumilla"
                  className="w-full h-80 object-cover object-center"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#163A2D]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-mono font-bold text-[#FAD02C]">Permanent Campus & Monument</div>
                  <div className="font-sans text-base font-black uppercase">CCN University of Science & Technology</div>
                  <div className="text-xs text-white/90 font-mono">Kotbari, Lalmai Hills, Cumilla-3500</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Vision & Mission */}
        {activeTab === 'vision' && (
          <div id="about-mission" className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-200">
            {/* Vision */}
            <div className="bg-white border-2 border-[#D0E4DA] p-8 rounded-none">
              <div className="w-14 h-14 bg-[#EAF2ED] border border-[#D0E4DA] flex items-center justify-center text-[#163A2D] mb-6 rounded-none">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="font-sans text-2xl font-black text-[#163A2D] uppercase tracking-tight mb-4">
                Our Institutional Vision
              </h3>
              <p className="text-[#4E7D68] text-sm sm:text-base leading-relaxed mb-6">
                To emerge as a nationally and internationally distinguished center of higher education, scientific research, and technological excellence, producing visionary innovators, scholars, and ethical leaders capable of transforming Bangladesh into a knowledge-driven global economy.
              </p>
              <div className="space-y-2.5 text-xs text-[#163A2D]">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#163A2D] shrink-0" />
                  <span>Global academic standing through world-class curricula</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#163A2D] shrink-0" />
                  <span>Pioneering scientific and technological breakthroughs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#163A2D] shrink-0" />
                  <span>Commitment to human values, ethics, and social equity</span>
                </div>
              </div>
            </div>

            {/* Mission */}
            <div className="bg-white border-2 border-[#D0E4DA] p-8 rounded-none">
              <div className="w-14 h-14 bg-[#EAF2ED] border border-[#D0E4DA] flex items-center justify-center text-[#163A2D] mb-6 rounded-none">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="font-sans text-2xl font-black text-[#163A2D] uppercase tracking-tight mb-4">
                Our Mission & Core Values
              </h3>
              <p className="text-[#4E7D68] text-sm sm:text-base leading-relaxed mb-6">
                To deliver outcome-based education (OBE) in engineering, science, business, and liberal arts; to promote applied research addressing industrial and environmental challenges; and to maintain an inclusive, merit-based campus in Cumilla.
              </p>
              <div className="space-y-2.5 text-xs text-[#163A2D]">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#163A2D] shrink-0" />
                  <span>Outcome-Based Education (OBE) accreditation across all disciplines</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#163A2D] shrink-0" />
                  <span>State-of-the-art laboratory experimentation and digital resources</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#163A2D] shrink-0" />
                  <span>Up to 100% scholarship support for meritorious & underprivileged students</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Leadership */}
        {activeTab === 'leadership' && (
          <div id="leadership" className="space-y-8 animate-in fade-in duration-200">
            {/* Chairman Highlight */}
            <div className="bg-[#163A2D] border-2 border-[#163A2D] text-white p-6 sm:p-10 rounded-none">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-4 flex justify-center">
                  <div className="w-44 h-44 sm:w-52 sm:h-52 overflow-hidden border-4 border-[#FAD02C] shadow-none rounded-none">
                    <img
                      src={UNIVERSITY_LEADERSHIP[0].image}
                      alt={UNIVERSITY_LEADERSHIP[0].name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
                <div className="md:col-span-8 space-y-3 text-center md:text-left">
                  <div className="text-[#FAD02C] font-mono text-xs font-bold uppercase tracking-widest">
                    Founder & Chairman, Board of Trustees
                  </div>
                  <h3 className="font-sans text-2xl sm:text-3xl font-black uppercase text-white">
                    {UNIVERSITY_LEADERSHIP[0].name}
                  </h3>
                  <div className="text-xs text-[#FEF08A] font-semibold font-mono">
                    {UNIVERSITY_LEADERSHIP[0].qualification}
                  </div>
                  <p className="text-[#EAF2ED]/90 text-sm leading-relaxed pt-2">
                    {UNIVERSITY_LEADERSHIP[0].bio}
                  </p>
                  <div className="pt-2 text-xs text-[#FAD02C] font-mono">
                    Email: {UNIVERSITY_LEADERSHIP[0].email}
                  </div>
                </div>
              </div>
            </div>

            {/* Other Leaders Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {UNIVERSITY_LEADERSHIP.slice(1).map((lead) => (
                <div
                  key={lead.id}
                  className="bg-white border-2 border-[#D0E4DA] hover:border-[#163A2D] p-5 rounded-none transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="w-20 h-20 overflow-hidden mb-3 border-2 border-[#D0E4DA] mx-auto sm:mx-0 rounded-none">
                      <img
                        src={lead.image}
                        alt={lead.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="text-xs font-bold text-[#163A2D] uppercase tracking-wider font-mono">
                      {lead.designation}
                    </div>
                    <h4 className="font-sans text-base font-black text-[#163A2D] uppercase mt-1">
                      {lead.name}
                    </h4>
                    <p className="text-xs text-[#4E7D68] mt-0.5 font-mono">
                      {lead.qualification}
                    </p>
                    <p className="text-xs text-[#4E7D68] mt-2 leading-relaxed line-clamp-3">
                      {lead.bio}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#D0E4DA] text-[11px] text-[#163A2D] font-mono">
                    {lead.email}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Statutory Authorities */}
        {activeTab === 'authorities' && (
          <div id="authorities" className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
            <div className="bg-white border-2 border-[#D0E4DA] p-6 rounded-none">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-[#EAF2ED] border border-[#D0E4DA] flex items-center justify-center text-[#163A2D] rounded-none">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-lg font-black text-[#163A2D] uppercase">Board of Trustees (BoT)</h4>
                  <p className="text-xs text-[#4E7D68] font-mono">Apex Policy Formulation & Governance</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#4E7D68] leading-relaxed mb-3">
                The Board of Trustees is the supreme governing body of CCNUST, responsible for long-term vision, infrastructure capital development, financial stewardship, and institutional policy creation under the Private University Act 2010.
              </p>
              <div className="text-xs font-mono font-bold text-[#163A2D]">
                Chairman: Dr. Md. Tariqul Islam Chowdhury
              </div>
            </div>

            <div className="bg-white border-2 border-[#D0E4DA] p-6 rounded-none">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-[#EAF2ED] border border-[#D0E4DA] flex items-center justify-center text-[#163A2D] rounded-none">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-lg font-black text-[#163A2D] uppercase">Syndicate</h4>
                  <p className="text-xs text-[#4E7D68] font-mono">Executive Administrative Body</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#4E7D68] leading-relaxed mb-3">
                The Syndicate exercises general supervision over the administrative affairs, management, budget execution, faculty recruitments, and operational welfare of the university.
              </p>
              <div className="text-xs font-mono font-bold text-[#163A2D]">
                Chaired by: Vice Chancellor
              </div>
            </div>

            <div className="bg-white border-2 border-[#D0E4DA] p-6 rounded-none">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-[#EAF2ED] border border-[#D0E4DA] flex items-center justify-center text-[#163A2D] rounded-none">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-lg font-black text-[#163A2D] uppercase">Academic Council</h4>
                  <p className="text-xs text-[#4E7D68] font-mono">Curricula, Examinations & Quality</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#4E7D68] leading-relaxed mb-3">
                Responsible for approving curricula, OBE grading standards, semester routines, examination regulations, and recommending academic honors and degree awards.
              </p>
              <div className="text-xs font-mono font-bold text-[#163A2D]">
                Deans, Department Heads & Nominated UGC Experts
              </div>
            </div>

            <div className="bg-white border-2 border-[#D0E4DA] p-6 rounded-none">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-[#EAF2ED] border border-[#D0E4DA] flex items-center justify-center text-[#163A2D] rounded-none">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-lg font-black text-[#163A2D] uppercase">Finance Committee</h4>
                  <p className="text-xs text-[#4E7D68] font-mono">Fiscal Planning & Audit Oversight</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#4E7D68] leading-relaxed mb-3">
                Oversees annual budget preparation, scholarship fund allocations, development accounts, and statutory annual auditing in compliance with government norms.
              </p>
              <div className="text-xs font-mono font-bold text-[#163A2D]">
                Convener: Treasurer
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Accreditation */}
        {activeTab === 'accreditation' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-slate-200 rounded-xl p-5 bg-[#F8FAFC]">
                <div className="text-amber-600 font-bold text-sm mb-1">University Grants Commission (UGC)</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Fully approved and recognized by the University Grants Commission of Bangladesh, adhering to standard university statutory governance.
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-5 bg-[#F8FAFC]">
                <div className="text-amber-600 font-bold text-sm mb-1">Ministry of Education, Bangladesh</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Chartered by the Ministry of Education, Government of the People's Republic of Bangladesh under the Private University Act 2010.
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-5 bg-[#F8FAFC]">
                <div className="text-amber-600 font-bold text-sm mb-1">Outcome-Based Education (OBE)</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Engineering programs mapped according to BAETE guidelines ensuring student competencies match national and global technical benchmarks.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Campus Contact & Location (Embedded inside About Section) */}
        {activeTab === 'contact' && (
          <div className="bg-white border-2 border-[#D0E4DA] rounded-2xl p-6 sm:p-8 shadow-md space-y-8 animate-in fade-in duration-200">
            <div className="border-b border-[#D0E4DA] pb-5">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-[#163A2D] bg-[#EAF2ED] px-3 py-1 rounded">
                <MapPin className="w-3.5 h-3.5 text-[#FAD02C]" />
                <span>Kotbari Heritage Zone • Cumilla-3500</span>
              </div>
              <h3 className="font-sans text-2xl sm:text-3xl font-black text-[#163A2D] uppercase tracking-tight mt-2">
                University Campus Contact & Location Directory
              </h3>
              <p className="text-[#4E7D68] text-sm font-mono mt-1">
                Reach out to CCNUST academic faculties, registrar secretariat, admissions helpdesk, or visit our permanent campus.
              </p>
            </div>

            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Address Card */}
              <div className="p-5 bg-[#F8FAF8] border border-[#D0E4DA] rounded-xl flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-[#163A2D] text-[#FAD02C] rounded-lg flex items-center justify-center mb-3">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">
                    Permanent Campus Address
                  </h4>
                  <p className="text-xs font-mono text-slate-600 leading-relaxed">
                    Chowdhury Estate, CCN Road, Kotbari, Cumilla Sadar Dakshin, Cumilla-3500, Bangladesh.
                  </p>
                  <p className="text-[11px] font-mono text-amber-700 mt-2">
                    Adjacent to Shalban Vihara & Lalmai Heritage Hills
                  </p>
                </div>
              </div>

              {/* Hotlines Card */}
              <div className="p-5 bg-[#F8FAF8] border border-[#D0E4DA] rounded-xl flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-[#163A2D] text-[#FAD02C] rounded-lg flex items-center justify-center mb-3">
                    <Phone className="w-5 h-5" />
                  </div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">
                    Direct Hotlines & Telephone
                  </h4>
                  <div className="space-y-1 text-xs font-mono text-slate-700">
                    <div>
                      <span className="text-slate-500">Admissions: </span>
                      <a href="tel:01715451599" className="font-bold text-[#163A2D] hover:underline">
                        01715-451599
                      </a>
                    </div>
                    <div>
                      <span className="text-slate-500">Information Desk: </span>
                      <a href="tel:01888042667" className="font-bold text-[#163A2D] hover:underline">
                        01888-042667
                      </a>
                    </div>
                    <div>
                      <span className="text-slate-500">Registrar Cell: </span>
                      <a href="tel:01888042666" className="font-bold text-[#163A2D] hover:underline">
                        01888-042666
                      </a>
                    </div>
                    <div>
                      <span className="text-slate-500">Founder Secretariat: </span>
                      <a href="tel:01815315000" className="font-bold text-[#163A2D] hover:underline">
                        01815-315000
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Hours & Inboxes */}
              <div className="p-5 bg-[#F8FAF8] border border-[#D0E4DA] rounded-xl flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-[#163A2D] text-[#FAD02C] rounded-lg flex items-center justify-center mb-3">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">
                    Official Inboxes & Hours
                  </h4>
                  <div className="space-y-1 text-xs font-mono text-slate-700">
                    <div>
                      <span className="text-slate-500">General: </span>
                      <a href="mailto:info@ccnust.ac.bd" className="font-bold text-blue-700 hover:underline">
                        info@ccnust.ac.bd
                      </a>
                    </div>
                    <div>
                      <span className="text-slate-500">Alternate: </span>
                      <a href="mailto:ccncomilla@yahoo.com" className="font-bold text-blue-700 hover:underline">
                        ccncomilla@yahoo.com
                      </a>
                    </div>
                    <div>
                      <span className="text-slate-500">Admissions: </span>
                      <a href="mailto:admission@ccnust.ac.bd" className="font-bold text-blue-700 hover:underline">
                        admission@ccnust.ac.bd
                      </a>
                    </div>
                    <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600 flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Sat–Thu: 9:00 AM – 5:00 PM (Fri Closed)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Inquiry Form inside About Section */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center space-x-2 mb-4">
                <MessageSquare className="w-4 h-4 text-[#163A2D]" />
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900">
                  Send a Direct Inquiry to CCNUST Administration
                </h4>
              </div>

              {contactForm.submitted ? (
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-center space-y-2 font-mono text-xs">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-800">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <p className="font-bold text-emerald-950">Thank you! Your message has been routed to the Information Desk.</p>
                  <p className="text-slate-600 text-[11px]">We typically respond within 24 business hours.</p>
                  <button
                    type="button"
                    onClick={() => setContactForm({ ...contactForm, submitted: false, message: '' })}
                    className="text-xs text-[#163A2D] font-bold underline cursor-pointer"
                  >
                    Send another query
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setContactForm({ ...contactForm, submitted: true });
                  }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs"
                >
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Md. Hasan"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="e.g. hasan@example.com"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="017xxxxxxxx"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-slate-800"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Inquiry Message *</label>
                    <textarea
                      required
                      rows={3}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Write your questions regarding admissions, programs, faculty, or campus visits..."
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-slate-800"
                    />
                  </div>

                  <div className="sm:col-span-3 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#163A2D] hover:bg-[#0F281E] text-[#FAD02C] font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center space-x-2 cursor-pointer text-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Inquiry</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Global Embedded Quick Contact Banner inside About Section */}
        <div className="mt-10 p-5 bg-[#163A2D] border border-[#21513F] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 text-white font-mono shadow-md">
          <div className="flex items-center space-x-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-[#0F281E] border border-[#FAD02C] flex items-center justify-center text-[#FAD02C] shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-[#A3C7B5] uppercase tracking-wider block font-bold">
                Campus Administration Helpline
              </span>
              <span className="text-sm font-bold text-[#FAD02C]">
                01715-451599 / 01888-042667 • info@ccnust.ac.bd
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setActiveTab('contact')}
              className="px-4 py-2 bg-[#FAD02C] hover:bg-[#FEF08A] text-[#163A2D] font-bold uppercase tracking-wider text-xs rounded-xl transition-all cursor-pointer shadow-sm"
            >
              View Full Campus Contact & Map
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
