import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Award,
  Users,
  Send,
  CheckCircle2,
  Building,
  Target,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import SectionAtmosphere from '../components/SectionAtmosphere';
import { UNIVERSITY_INFO, UNIVERSITY_LEADERSHIP } from '../universityData';
import SecondaryPageHeader, { SecondaryPageBottomNav } from '../components/SecondaryPageHeader';
import { useCmsData } from '../lib/useCmsData';

export default function AboutContactPage() {
  const { submitContact } = useCmsData();
  const [activeTab, setActiveTab] = useState<'overview' | 'vision' | 'leadership' | 'contact'>(() =>
    typeof window !== 'undefined' && window.location.hash === '#contact' ? 'contact' : 'overview'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Campus Inquiry',
    message: '',
    submitted: false,
  });

  useEffect(() => {
    const handleTabEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const tab = customEvent.detail;
      if (tab === 'overview' || tab === 'vision' || tab === 'leadership' || tab === 'contact') {
        setActiveTab(tab);
      }
    };
    window.addEventListener('set-about-tab', handleTabEvent);
    return () => window.removeEventListener('set-about-tab', handleTabEvent);
  }, []);

  return (
    <div className="min-h-screen bg-[#EFF6F2] pb-20">
      <SectionAtmosphere variant="light" />

      {/* Sticky Secondary Page Back Navigation Bar */}
      <SecondaryPageHeader
        currentPageTitle="About CCNUST & Contact"
        category="University"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-[#EAF2ED] border border-[#D0E4DA] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-widest text-[#163A2D] mb-3 rounded">
            <BookOpen className="w-3.5 h-3.5 text-[#FAD02C]" />
            <span>The University & Secretariat</span>
          </div>
          <h1 className="font-sans text-3xl sm:text-5xl font-black text-[#163A2D] uppercase tracking-tight mb-4">
            About CCNUST & Contact
          </h1>
          <p className="text-[#4E7D68] text-sm sm:text-base leading-relaxed">
            Founded in 2014 in Kotbari, Cumilla under the Private University Act 2010. Dedicated to scientific advancement, nation building, and academic excellence.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 pb-4 border-b border-[#D0E4DA]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-mono text-xs sm:text-sm font-bold uppercase rounded-lg transition-all cursor-pointer border ${
              activeTab === 'overview'
                ? 'bg-[#163A2D] text-[#FAD02C] border-[#163A2D] shadow-md'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            Overview & History
          </button>
          <button
            onClick={() => setActiveTab('vision')}
            className={`px-4 py-2 font-mono text-xs sm:text-sm font-bold uppercase rounded-lg transition-all cursor-pointer border ${
              activeTab === 'vision'
                ? 'bg-[#163A2D] text-[#FAD02C] border-[#163A2D] shadow-md'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            Vision & Mission
          </button>
          <button
            onClick={() => setActiveTab('leadership')}
            className={`px-4 py-2 font-mono text-xs sm:text-sm font-bold uppercase rounded-lg transition-all cursor-pointer border ${
              activeTab === 'leadership'
                ? 'bg-[#163A2D] text-[#FAD02C] border-[#163A2D] shadow-md'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            Board & Leadership
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2 font-mono text-xs sm:text-sm font-bold uppercase rounded-lg transition-all cursor-pointer border flex items-center space-x-1.5 ${
              activeTab === 'contact'
                ? 'bg-[#163A2D] text-[#FAD02C] border-[#163A2D] shadow-md'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-[#FAD02C]" />
            <span>Campus Contact & Directory</span>
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-6 sm:p-10 shadow-md space-y-6">
            <h2 className="text-2xl font-sans font-black text-slate-900 uppercase">
              Establishment & Institutional Profile
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs text-slate-700 leading-relaxed">
              <div className="space-y-4">
                <p>
                  CCN University of Science & Technology (CCNUST) was established in 2014 under the Private University Act 2010 by visionary educationist Dr. Md. Tariqul Islam Chowdhury. The campus is located in the archaeological and cultural cradle of Kotbari, Cumilla, adjacent to the ancient Shalban Vihara and Lalmai Hills.
                </p>
                <p>
                  Recognized by the University Grants Commission (UGC) and Ministry of Education, Government of Bangladesh, CCNUST serves regional and international students across high-demand engineering, computational, legal, and business disciplines.
                </p>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-2">
                  Institutional Metadata
                </div>
                <div><span className="text-slate-500">Established:</span> 2014</div>
                <div><span className="text-slate-500">Statutory Authority:</span> Ministry of Education & UGC</div>
                <div><span className="text-slate-500">Curricula Model:</span> Outcome-Based Education (OBE)</div>
                <div><span className="text-slate-500">Location:</span> Kotbari, Cumilla-3500, Bangladesh</div>
                <div><span className="text-slate-500">Campus Atmosphere:</span> Eco-friendly green university campus</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Vision & Mission */}
        {activeTab === 'vision' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-6 sm:p-8 shadow-md space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#EAF2ED] text-[#163A2D] flex items-center justify-center font-bold">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-sans font-black text-slate-900 uppercase">Our Vision</h3>
              <p className="font-mono text-xs text-slate-700 leading-relaxed">
                To be a premier center of higher learning, science, and technological innovation in South Asia, empowering ethical leaders, critical thinkers, and entrepreneurial researchers capable of transforming national infrastructure.
              </p>
            </div>

            <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-6 sm:p-8 shadow-md space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#EAF2ED] text-[#163A2D] flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-sans font-black text-slate-900 uppercase">Our Mission</h3>
              <p className="font-mono text-xs text-slate-700 leading-relaxed">
                Deliver outcome-based world-standard higher education, promote state-of-the-art laboratory research, uphold humanitarian values, and foster industry collaborations for sustainable national development.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Leadership */}
        {activeTab === 'leadership' && (
          <div className="space-y-6">
            <div className="bg-[#163A2D] text-white rounded-2xl p-5 sm:p-6 shadow-md border-2 border-[#163A2D] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FAD02C] bg-[#0F281E] px-2 py-0.5 rounded border border-[#21513F]">
                  STATUTORY GOVERNANCE & ROSTER
                </span>
                <h3 className="text-base sm:text-lg font-bold font-sans mt-1">
                  Higher Authorities, Board of Trustees & Syndicate
                </h3>
                <p className="text-xs text-[#D0E4DA] font-mono mt-0.5">
                  View full statutory profiles, Chairman & VC addresses, Syndicate roster, and Academic Council duties.
                </p>
              </div>
              <Link
                to="/authorities"
                className="px-4 py-2 bg-[#FAD02C] hover:bg-[#FEF08A] text-[#163A2D] font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-xs shrink-0 flex items-center space-x-1"
              >
                <span>Full Governance Page &rarr;</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {UNIVERSITY_LEADERSHIP.map((leader) => (
              <div
                key={leader.id}
                className="bg-white border-2 border-[#163A2D] rounded-2xl p-6 flex flex-col sm:flex-row gap-5 items-center sm:items-start shadow-md"
              >
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-28 h-28 rounded-xl object-cover border-2 border-[#163A2D] shrink-0"
                />
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[10px] font-mono font-bold bg-[#EAF2ED] text-[#163A2D] px-2 py-0.5 rounded uppercase">
                    {leader.designation}
                  </span>
                  <h3 className="text-lg font-sans font-black text-slate-900">
                    {leader.name}
                  </h3>
                  <p className="text-xs font-mono text-slate-600 leading-relaxed pt-1">
                    {leader.bio}
                  </p>
                </div>
              </div>
            ))}
            </div>
          </div>
        )}

        {/* Tab 4: Contact & Directory (Embedded inside About) */}
        {activeTab === 'contact' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Quick Directory Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border-2 border-[#163A2D] rounded-xl p-5 shadow-sm space-y-2 font-mono text-xs">
                <div className="w-9 h-9 rounded-lg bg-[#163A2D] text-[#FAD02C] flex items-center justify-center mb-2">
                  <MapPin className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 uppercase">Permanent Campus</h4>
                <p className="text-slate-600 leading-relaxed">
                  CCN University of Science & Technology<br />
                  Kotbari, Cumilla-3500, Bangladesh<br />
                  (Adjacent to Shalban Vihara)
                </p>
              </div>

              <div className="bg-white border-2 border-[#163A2D] rounded-xl p-5 shadow-sm space-y-2 font-mono text-xs">
                <div className="w-9 h-9 rounded-lg bg-[#163A2D] text-[#FAD02C] flex items-center justify-center mb-2">
                  <Phone className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 uppercase">Telephone Hotlines</h4>
                <div className="space-y-1 text-slate-700">
                  <div>Admissions: <a href="tel:01715451599" className="font-bold text-[#163A2D]">01715-451599</a></div>
                  <div>Information: <a href="tel:01888042667" className="font-bold text-[#163A2D]">01888-042667</a></div>
                  <div>Registrar: <a href="tel:01888042666" className="font-bold text-[#163A2D]">01888-042666</a></div>
                </div>
              </div>

              <div className="bg-white border-2 border-[#163A2D] rounded-xl p-5 shadow-sm space-y-2 font-mono text-xs">
                <div className="w-9 h-9 rounded-lg bg-[#163A2D] text-[#FAD02C] flex items-center justify-center mb-2">
                  <Mail className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 uppercase">Official Inboxes</h4>
                <div className="space-y-1 text-slate-700">
                  <div>General: <a href="mailto:info@ccnust.ac.bd" className="font-bold text-blue-700">info@ccnust.ac.bd</a></div>
                  <div>Admissions: <a href="mailto:admission@ccnust.ac.bd" className="font-bold text-blue-700">admission@ccnust.ac.bd</a></div>
                  <div>Registrar: <a href="mailto:registrar@ccnust.ac.bd" className="font-bold text-blue-700">registrar@ccnust.ac.bd</a></div>
                </div>
              </div>
            </div>

            {/* Direct Inquiry Form */}
            <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-6 sm:p-8 shadow-md">
              <h3 className="text-xl font-sans font-black text-slate-900 uppercase mb-4 flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-[#163A2D]" />
                <span>Send a Direct Inquiry to University Administration</span>
              </h3>

              {contactForm.submitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-xl text-center space-y-2 font-mono text-xs">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div className="text-emerald-950 font-bold text-sm">Thank you! Your message has been received.</div>
                  <p className="text-slate-600">The information desk or relevant faculty dean will contact you shortly.</p>
                  <button
                    onClick={() => setContactForm({ ...contactForm, submitted: false, message: '' })}
                    className="text-xs text-[#163A2D] font-bold underline cursor-pointer mt-2"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    try {
                      await submitContact({
                        name: contactForm.name,
                        email: contactForm.email,
                        phone: contactForm.phone,
                        subject: contactForm.subject,
                        message: contactForm.message,
                      });
                      setContactForm((prev) => ({ ...prev, submitted: true }));
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs"
                >
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Md. Hasan"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-[#163A2D]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="e.g. hasan@example.com"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-[#163A2D]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="017xxxxxxxx"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-[#163A2D]"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-slate-700 font-bold mb-1">Inquiry Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Write your questions regarding admissions, programs, faculty, or campus visits..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-[#163A2D]"
                    />
                  </div>

                  <div className="sm:col-span-3 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 bg-[#163A2D] hover:bg-[#0F281E] text-[#FAD02C] font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center space-x-2 cursor-pointer text-xs disabled:opacity-60"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Sending...' : 'Submit Inquiry'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Bottom Return to Main Page Section */}
        <SecondaryPageBottomNav />
      </div>
    </div>
  );
}
