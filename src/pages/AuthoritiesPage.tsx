import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  Users,
  Building,
  Mail,
  Phone,
  PhoneCall,
  MapPin,
  CheckCircle2,
  Copy,
  BookOpen,
  GraduationCap,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  FileText,
  BookmarkCheck,
  UserCheck,
  Building2,
  Calendar,
} from 'lucide-react';
import SectionAtmosphere from '../components/SectionAtmosphere';
import SecondaryPageHeader, { SecondaryPageBottomNav } from '../components/SecondaryPageHeader';
import {
  UNIVERSITY_INFO,
  UNIVERSITY_LEADERSHIP,
  BOARD_OF_TRUSTEES,
  SYNDICATE_MEMBERS,
  ACADEMIC_COUNCIL_INFO,
  FACULTIES,
} from '../universityData';
import { LeadershipMember } from '../types';

export default function AuthoritiesPage() {
  const [activeTab, setActiveTab] = useState<'officers' | 'messages' | 'bot' | 'syndicate' | 'council'>('officers');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('all');
  
  // State for expandable detail view for officials (open Chancellor, Chairman, and VC by default)
  const [expandedOfficialIds, setExpandedOfficialIds] = useState<Record<string, boolean>>({
    'lead-chancellor': true,
    'lead-chairman': true,
    'lead-vc': true,
  });

  const toggleExpand = (id: string) => {
    setExpandedOfficialIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    UNIVERSITY_LEADERSHIP.forEach((m) => {
      allExpanded[m.id] = true;
    });
    setExpandedOfficialIds(allExpanded);
  };

  const collapseAll = () => {
    setExpandedOfficialIds({});
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2500);
  };

  const chairman = UNIVERSITY_LEADERSHIP.find((m) => m.id === 'lead-chairman');
  const vc = UNIVERSITY_LEADERSHIP.find((m) => m.id === 'lead-vc');

  // Filter officers based on selected filter
  const filteredOfficers = UNIVERSITY_LEADERSHIP.filter((official) => {
    if (selectedRoleFilter === 'all') return true;
    if (selectedRoleFilter === 'key') {
      return ['lead-chancellor', 'lead-chairman', 'lead-vc', 'lead-treasurer', 'lead-registrar'].includes(official.id);
    }
    return official.id === selectedRoleFilter;
  });

  // Helper map for syndicate member photos
  const syndicatePhotoMap: Record<string, string> = {
    'Prof. Dr. Engr. Md. Shah Jahan': 'https://ccnust.ac.bd/uploads/committee/image.202505060405420642.JPG',
    'Prof. Md. Jamal Nasser': 'https://ccnust.ac.bd/uploads/committee/Image.202505030105363436.jpeg',
    'Dr. Md. Tariqul Islam Chowdhury': 'https://ccnust.ac.bd/uploads/committee/Image.202505030605263626.jpg',
    'Prof. Dr. Ali Hossain Chowdhury': 'https://ccnust.ac.bd/uploads/committee/image.202505060405590759.jpg',
    'Tashfin Ul Islam': 'https://ccnust.ac.bd/uploads/committee/Image.202505030705382338.jpeg',
    'Prof. Dr. M G Azam': 'https://ccnust.ac.bd/uploads/committee/Image.202505030705182318.jpeg',
  };

  return (
    <div className="min-h-screen bg-[#EFF6F2] pb-24 text-[#163A2D]">
      <SectionAtmosphere variant="light" />

      {/* Sticky Secondary Page Back Navigation Bar */}
      <SecondaryPageHeader
        currentPageTitle="Higher Authorities & Governance"
        category="Statutory Governance"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-4">
        {/* Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center space-x-2 bg-[#EAF2ED] border border-[#D0E4DA] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-widest text-[#163A2D] mb-3.5 rounded shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#FAD02C]" />
            <span>Statutory University Organs • Private University Act 2010</span>
          </div>
          <h1 className="font-sans text-3xl sm:text-5xl font-black text-[#163A2D] uppercase tracking-tight mb-3">
            Higher Authorities & Governance
          </h1>
          <p className="text-[#4E7D68] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Guiding CCN University of Science & Technology with visionary academic stewardship, regulatory excellence under UGC, and moral integrity at our Kotbari Campus, Cumilla.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 pb-4 border-b border-[#D0E4DA]">
          <button
            type="button"
            onClick={() => setActiveTab('officers')}
            className={`px-3.5 sm:px-5 py-2 font-mono text-xs sm:text-sm font-bold uppercase rounded-lg transition-all cursor-pointer border flex items-center space-x-2 ${
              activeTab === 'officers'
                ? 'bg-[#163A2D] text-[#FAD02C] border-[#163A2D] shadow-md'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#FAD02C]" />
            <span>Principal Officers</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('messages')}
            className={`px-3.5 sm:px-5 py-2 font-mono text-xs sm:text-sm font-bold uppercase rounded-lg transition-all cursor-pointer border flex items-center space-x-2 ${
              activeTab === 'messages'
                ? 'bg-[#163A2D] text-[#FAD02C] border-[#163A2D] shadow-md'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#FAD02C]" />
            <span>Chairman & VC Vision</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('bot')}
            className={`px-3.5 sm:px-5 py-2 font-mono text-xs sm:text-sm font-bold uppercase rounded-lg transition-all cursor-pointer border flex items-center space-x-2 ${
              activeTab === 'bot'
                ? 'bg-[#163A2D] text-[#FAD02C] border-[#163A2D] shadow-md'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Building className="w-4 h-4 text-[#FAD02C]" />
            <span>Board of Trustees (BoT)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('syndicate')}
            className={`px-3.5 sm:px-5 py-2 font-mono text-xs sm:text-sm font-bold uppercase rounded-lg transition-all cursor-pointer border flex items-center space-x-2 ${
              activeTab === 'syndicate'
                ? 'bg-[#163A2D] text-[#FAD02C] border-[#163A2D] shadow-md'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Award className="w-4 h-4 text-[#FAD02C]" />
            <span>The Syndicate</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('council')}
            className={`px-3.5 sm:px-5 py-2 font-mono text-xs sm:text-sm font-bold uppercase rounded-lg transition-all cursor-pointer border flex items-center space-x-2 ${
              activeTab === 'council'
                ? 'bg-[#163A2D] text-[#FAD02C] border-[#163A2D] shadow-md'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-[#FAD02C]" />
            <span>Academic Council & Deans</span>
          </button>
        </div>

        {/* =================================================================
            TAB 1: PRINCIPAL OFFICERS (With Expandable Detail View)
            ================================================================= */}
        {activeTab === 'officers' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Top Stat Ribbon & Direct Verification */}
            <div className="bg-[#163A2D] text-white rounded-2xl p-5 sm:p-6 shadow-md border-2 border-[#163A2D] flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center md:text-left">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#FAD02C] font-bold">
                  GOVERNMENT & UGC STATUTORY REGISTRATION • CCNUST
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-sans">
                  Principal Executive & Statutory Officers
                </h3>
                <p className="text-xs text-[#D0E4DA] font-mono max-w-2xl">
                  Chartered under Private University Act 2010. Real images and official academic credentials extracted from official register at ccnust.ac.bd.
                </p>
              </div>
              <div className="flex items-center space-x-3 shrink-0">
                <a
                  href="https://ccnust.ac.bd/highOfficials-page"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#FAD02C] hover:bg-[#FEF08A] text-[#163A2D] font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-xs flex items-center space-x-1.5"
                >
                  <span>Verify at ccnust.ac.bd</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Quick Filter & Expand/Collapse Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white border border-[#D0E4DA] rounded-xl p-3 shadow-xs font-mono text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-slate-500 font-bold uppercase text-[10px] mr-1">Filter Official:</span>
                <button
                  type="button"
                  onClick={() => setSelectedRoleFilter('all')}
                  className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                    selectedRoleFilter === 'all'
                      ? 'bg-[#163A2D] text-[#FAD02C] font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  All (8)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRoleFilter('key')}
                  className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                    selectedRoleFilter === 'key'
                      ? 'bg-[#163A2D] text-[#FAD02C] font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  5 Key Officials
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRoleFilter('lead-chairman')}
                  className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                    selectedRoleFilter === 'lead-chairman'
                      ? 'bg-[#163A2D] text-[#FAD02C] font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Chairman
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRoleFilter('lead-chancellor')}
                  className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                    selectedRoleFilter === 'lead-chancellor'
                      ? 'bg-[#163A2D] text-[#FAD02C] font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Chancellor
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRoleFilter('lead-vc')}
                  className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                    selectedRoleFilter === 'lead-vc'
                      ? 'bg-[#163A2D] text-[#FAD02C] font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Vice Chancellor
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRoleFilter('lead-treasurer')}
                  className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                    selectedRoleFilter === 'lead-treasurer'
                      ? 'bg-[#163A2D] text-[#FAD02C] font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Treasurer
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRoleFilter('lead-registrar')}
                  className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                    selectedRoleFilter === 'lead-registrar'
                      ? 'bg-[#163A2D] text-[#FAD02C] font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Registrar
                </button>
              </div>

              <div className="flex items-center space-x-2 self-end sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={expandAll}
                  className="px-2.5 py-1 rounded bg-[#EAF2ED] hover:bg-[#D0E4DA] text-[#163A2D] font-bold transition-colors cursor-pointer text-[11px]"
                >
                  Expand All
                </button>
                <button
                  type="button"
                  onClick={collapseAll}
                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer text-[11px]"
                >
                  Collapse All
                </button>
              </div>
            </div>

            {/* Leadership Cards Matrix with Expandable Detail View */}
            <div className="space-y-6">
              {filteredOfficers.map((leader) => {
                const isExpanded = !!expandedOfficialIds[leader.id];
                const isKeyOfficial = ['lead-chancellor', 'lead-chairman', 'lead-vc', 'lead-treasurer', 'lead-registrar'].includes(leader.id);

                return (
                  <div
                    key={leader.id}
                    className={`bg-white border-2 rounded-2xl shadow-md transition-all overflow-hidden ${
                      isKeyOfficial
                        ? 'border-[#163A2D]'
                        : 'border-[#D0E4DA]'
                    }`}
                  >
                    {/* Header Summary Row */}
                    <div className="p-5 sm:p-6 bg-white">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        {/* Photo & Identity */}
                        <div className="flex items-start sm:items-center space-x-4 sm:space-x-5">
                          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#163A2D] shrink-0 bg-[#0F281E] shadow-sm">
                            <img
                              src={leader.image}
                              alt={leader.name}
                              className="w-full h-full object-cover object-center"
                              loading="lazy"
                              onError={(e) => {
                                // Fallback to emblem or clean SVG if network fails
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Government_Seal_of_Bangladesh.svg/512px-Government_Seal_of_Bangladesh.svg.png';
                              }}
                            />
                            <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white" />
                          </div>

                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="text-[10px] font-mono font-bold bg-[#EAF2ED] text-[#163A2D] px-2.5 py-0.5 rounded uppercase border border-[#D0E4DA] inline-block">
                                {leader.designation}
                              </span>
                              {isKeyOfficial && (
                                <span className="text-[9px] font-mono font-bold bg-[#FAD02C] text-[#163A2D] px-2 py-0.5 rounded uppercase">
                                  Key Statutory Authority
                                </span>
                              )}
                            </div>
                            <h3 className="text-lg sm:text-2xl font-sans font-black text-slate-900 leading-snug">
                              {leader.name}
                            </h3>
                            <p className="text-xs font-mono text-[#4E7D68] font-semibold">
                              {leader.qualification}
                            </p>
                            {leader.statutoryBasis && (
                              <p className="text-[11px] font-mono text-slate-500">
                                Statutory Mandate: {leader.statutoryBasis}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Expand Button & Action Bar */}
                        <div className="flex items-center space-x-2 self-stretch md:self-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                          <button
                            type="button"
                            onClick={() => toggleExpand(leader.id)}
                            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase transition-all flex items-center space-x-1.5 cursor-pointer border ${
                              isExpanded
                                ? 'bg-[#163A2D] text-[#FAD02C] border-[#163A2D] shadow-xs'
                                : 'bg-[#FAF8F5] hover:bg-[#EAF2ED] text-[#163A2D] border-[#D0E4DA]'
                            }`}
                          >
                            <span>{isExpanded ? 'Hide Academic & Contact Profile' : 'View Academic & Contact Profile'}</span>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-[#FAD02C]" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-[#163A2D]" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Brief Bio Summary */}
                      <p className="text-xs font-mono text-slate-700 leading-relaxed mt-4">
                        {leader.bio}
                      </p>
                    </div>

                    {/* EXPANDABLE DETAIL VIEW */}
                    {isExpanded && (
                      <div className="border-t-2 border-[#D0E4DA] bg-[#FAF8F5] p-5 sm:p-6 space-y-6 animate-in slide-in-from-top-2">
                        {/* Academic Background & Qualifications */}
                        <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#D0E4DA] shadow-xs">
                          <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-slate-100">
                            <GraduationCap className="w-4 h-4 text-[#163A2D]" />
                            <h4 className="font-sans font-black text-sm text-[#163A2D] uppercase tracking-wider">
                              Verified Academic Credentials & Scholarly Background
                            </h4>
                          </div>

                          {/* Degrees / Fellowships Badges */}
                          {leader.degrees && leader.degrees.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {leader.degrees.map((deg, idx) => (
                                <span
                                  key={idx}
                                  className="text-[11px] font-mono font-bold bg-[#EAF2ED] text-[#163A2D] border border-[#D0E4DA] px-2.5 py-1 rounded-md flex items-center space-x-1"
                                >
                                  <BookmarkCheck className="w-3 h-3 text-[#FAD02C]" />
                                  <span>{deg}</span>
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Academic Milestones */}
                          {leader.academicBackground && leader.academicBackground.length > 0 && (
                            <ul className="space-y-1.5 font-mono text-xs text-slate-700">
                              {leader.academicBackground.map((item, idx) => (
                                <li key={idx} className="flex items-start space-x-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        {/* Statutory Portfolio & Duties */}
                        {leader.responsibilities && leader.responsibilities.length > 0 && (
                          <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#D0E4DA] shadow-xs">
                            <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-slate-100">
                              <ShieldCheck className="w-4 h-4 text-[#163A2D]" />
                              <h4 className="font-sans font-black text-sm text-[#163A2D] uppercase tracking-wider">
                                Statutory Portfolio & Official Duties under Private University Act 2010
                              </h4>
                            </div>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 font-mono text-xs text-slate-700">
                              {leader.responsibilities.map((resp, idx) => (
                                <li key={idx} className="flex items-start space-x-2 bg-[#FAF8F5] p-2.5 rounded-lg border border-[#D0E4DA]">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#163A2D] shrink-0 mt-1.5" />
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Direct Contact Links & Communications Desk */}
                        <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#D0E4DA] shadow-xs">
                          <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-slate-100">
                            <Building2 className="w-4 h-4 text-[#163A2D]" />
                            <h4 className="font-sans font-black text-sm text-[#163A2D] uppercase tracking-wider">
                              Direct Official Contact Channels & Campus Secretariat
                            </h4>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
                            {/* Campus Office Location */}
                            {leader.officeRoom && (
                              <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#D0E4DA] space-y-1">
                                <span className="text-[10px] text-slate-500 uppercase font-bold flex items-center space-x-1">
                                  <MapPin className="w-3 h-3 text-[#163A2D]" />
                                  <span>Official Campus Room</span>
                                </span>
                                <div className="text-slate-800 font-semibold text-xs leading-snug">
                                  {leader.officeRoom}
                                </div>
                              </div>
                            )}

                            {/* Direct Phone Dial Link */}
                            {leader.phone && (
                              <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#D0E4DA] space-y-1 flex flex-col justify-between">
                                <span className="text-[10px] text-slate-500 uppercase font-bold flex items-center space-x-1">
                                  <Phone className="w-3 h-3 text-[#163A2D]" />
                                  <span>Official Phone / Mobile</span>
                                </span>
                                <div className="flex items-center justify-between pt-1">
                                  <span className="font-bold text-[#163A2D] text-xs">
                                    {leader.phone}
                                  </span>
                                  <a
                                    href={`tel:${leader.phone.replace(/[^0-9+]/g, '')}`}
                                    className="px-2 py-0.5 bg-[#163A2D] hover:bg-[#235844] text-[#FAD02C] text-[10px] font-bold rounded uppercase inline-flex items-center space-x-1 transition-colors"
                                  >
                                    <PhoneCall className="w-2.5 h-2.5" />
                                    <span>Dial</span>
                                  </a>
                                </div>
                              </div>
                            )}

                            {/* Direct Desk Phone if available */}
                            {leader.directDeskPhone && (
                              <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#D0E4DA] space-y-1 flex flex-col justify-between">
                                <span className="text-[10px] text-slate-500 uppercase font-bold flex items-center space-x-1">
                                  <Phone className="w-3 h-3 text-[#163A2D]" />
                                  <span>Direct Desk / Hotline</span>
                                </span>
                                <div className="flex items-center justify-between pt-1">
                                  <span className="font-bold text-[#163A2D] text-xs">
                                    {leader.directDeskPhone}
                                  </span>
                                  <a
                                    href={`tel:${leader.directDeskPhone.replace(/[^0-9+]/g, '')}`}
                                    className="px-2 py-0.5 bg-[#163A2D] hover:bg-[#235844] text-[#FAD02C] text-[10px] font-bold rounded uppercase inline-flex items-center space-x-1 transition-colors"
                                  >
                                    <PhoneCall className="w-2.5 h-2.5" />
                                    <span>Dial Desk</span>
                                  </a>
                                </div>
                              </div>
                            )}

                            {/* Official Institutional Email */}
                            {leader.email && (
                              <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#D0E4DA] space-y-1 flex flex-col justify-between sm:col-span-2 lg:col-span-1">
                                <span className="text-[10px] text-slate-500 uppercase font-bold flex items-center space-x-1">
                                  <Mail className="w-3 h-3 text-[#163A2D]" />
                                  <span>Official Email Address</span>
                                </span>
                                <div className="flex items-center justify-between pt-1">
                                  <a
                                    href={`mailto:${leader.email}`}
                                    className="font-bold text-[#163A2D] hover:underline text-xs truncate max-w-[170px]"
                                    title={leader.email}
                                  >
                                    {leader.email}
                                  </a>
                                  <button
                                    type="button"
                                    onClick={() => handleCopyEmail(leader.email!)}
                                    className="px-2 py-0.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-[10px] font-bold rounded uppercase inline-flex items-center space-x-1 transition-colors cursor-pointer"
                                  >
                                    {copiedEmail === leader.email ? (
                                      <>
                                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                                        <span className="text-emerald-700">Copied</span>
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="w-2.5 h-2.5" />
                                        <span>Copy</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 2: CHAIRMAN & VC EXECUTIVE MESSAGES
            ================================================================= */}
        {activeTab === 'messages' && (
          <div className="space-y-10 animate-in fade-in">
            {/* Founder & Chairman Message */}
            {chairman && (
              <div className="bg-white border-2 border-[#163A2D] rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#FAD02C]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 mb-6 pb-6 border-b border-[#D0E4DA]">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-3 border-[#163A2D] shrink-0 shadow-md bg-[#0F281E]">
                    <img
                      src={chairman.image}
                      alt={chairman.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://ccnust.ac.bd/uploads/committee/Image.202505030605263626.jpg';
                      }}
                    />
                  </div>
                  <div className="space-y-2 text-center md:text-left">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FAD02C] bg-[#163A2D] px-2.5 py-1 rounded inline-block">
                      FOUNDER & CHAIRMAN ADDRESS
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-sans font-black text-[#163A2D]">
                      {chairman.name}
                    </h2>
                    <p className="text-xs font-mono text-slate-600">
                      Founder & Chairman, Board of Trustees, CCNUST • Chowdhury Estate, Kotbari, Cumilla
                    </p>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 font-mono text-xs">
                      {chairman.phone && (
                        <a
                          href={`tel:${chairman.phone.replace(/[^0-9+]/g, '')}`}
                          className="bg-[#FAF8F5] hover:bg-[#EAF2ED] border border-[#D0E4DA] px-2.5 py-0.5 rounded text-slate-700 font-bold transition-colors"
                        >
                          Phone: {chairman.phone}
                        </a>
                      )}
                      {chairman.email && (
                        <a
                          href={`mailto:${chairman.email}`}
                          className="bg-[#FAF8F5] hover:bg-[#EAF2ED] border border-[#D0E4DA] px-2.5 py-0.5 rounded text-slate-700 font-bold transition-colors"
                        >
                          Email: {chairman.email}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="prose max-w-none text-slate-700 font-sans text-sm sm:text-base leading-relaxed space-y-4">
                  <p className="font-semibold text-[#163A2D] italic text-base sm:text-lg border-l-4 border-[#FAD02C] pl-4">
                    "{chairman.message}"
                  </p>
                  <p>
                    When we established CCN University of Science & Technology in 2014, our foremost pledge was to make world-standard higher education accessible in the historical Kotbari region of Cumilla. This historic terrain, renowned for ancient Nalanda-period learning centers at Shalban Vihara, is once again blossoming as a sanctuary of contemporary science, technology, law, and business administration.
                  </p>
                  <p>
                    We recognize that true nation-building requires technical expertise paired with ethical rectitude. Our university provides up to 100% merit and need-based tuition waivers to ensure no capable student is impeded by economic distress. We invite students, parents, and scholars from all across Bangladesh to join us in shaping a self-reliant, knowledge-based economy.
                  </p>
                </div>
              </div>
            )}

            {/* Vice Chancellor Address */}
            {vc && (
              <div className="bg-white border-2 border-[#163A2D] rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 mb-6 pb-6 border-b border-[#D0E4DA]">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-3 border-[#163A2D] shrink-0 shadow-md bg-[#0F281E]">
                    <img
                      src={vc.image}
                      alt={vc.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://ccnust.ac.bd/uploads/committee/image.202505060405420642.JPG';
                      }}
                    />
                  </div>
                  <div className="space-y-2 text-center md:text-left">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FAD02C] bg-[#163A2D] px-2.5 py-1 rounded inline-block">
                      VICE CHANCELLOR (ACTING) ADDRESS
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-sans font-black text-[#163A2D]">
                      {vc.name}
                    </h2>
                    <p className="text-xs font-mono text-slate-600">
                      Vice Chancellor (Acting), Dean of Engineering & Chairperson, University Syndicate
                    </p>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 font-mono text-xs">
                      {vc.phone && (
                        <a
                          href={`tel:${vc.phone.replace(/[^0-9+]/g, '')}`}
                          className="bg-[#FAF8F5] hover:bg-[#EAF2ED] border border-[#D0E4DA] px-2.5 py-0.5 rounded text-slate-700 font-bold transition-colors"
                        >
                          Phone: {vc.phone}
                        </a>
                      )}
                      {vc.email && (
                        <a
                          href={`mailto:${vc.email}`}
                          className="bg-[#FAF8F5] hover:bg-[#EAF2ED] border border-[#D0E4DA] px-2.5 py-0.5 rounded text-slate-700 font-bold transition-colors"
                        >
                          Email: {vc.email}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="prose max-w-none text-slate-700 font-sans text-sm sm:text-base leading-relaxed space-y-4">
                  <p className="font-semibold text-[#163A2D] italic text-base sm:text-lg border-l-4 border-[#FAD02C] pl-4">
                    "{vc.message}"
                  </p>
                  <p>
                    Academic quality is the core lifeblood of CCNUST. We have aligned all undergraduate and graduate curricula with Outcome-Based Education (OBE) models and BAETE standards. Our engineering and pharmacy laboratories feature modern digital equipment, enabling hands-on problem solving from the freshman year onward.
                  </p>
                  <p>
                    Our faculty body consists of passionate educators, active researchers, and industry specialists who mentor students through rigorous capstone projects and research publications. We continuously strengthen our institutional linkages with industries and universities to ensure our graduates enter the job market with demonstrable competencies.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =================================================================
            TAB 3: BOARD OF TRUSTEES (BoT) - With Real Photos from ccnust.ac.bd
            ================================================================= */}
        {activeTab === 'bot' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-6 shadow-sm">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                HIGHEST GOVERNING BODY • PRIVATE UNIVERSITY ACT 2010
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-sans text-slate-900 mt-1">
                The Board of Trustees (BoT) of CCNUST
              </h2>
              <p className="text-xs font-mono text-slate-600 mt-1">
                Under Section 14 of the Private University Act 2010, the Board of Trustees is the supreme authority responsible for university establishment, property ownership, financial endowment, and strategic policy direction. Real portraits extracted from ccnust.ac.bd/trustees-page.
              </p>
            </div>

            {/* Trustees Matrix with Real Portraits */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {BOARD_OF_TRUSTEES.map((trustee, idx) => (
                <div
                  key={trustee.id}
                  className={`border-2 rounded-2xl p-5 shadow-sm transition-all hover:shadow-md flex flex-col justify-between ${
                    trustee.isChairman
                      ? 'bg-[#163A2D] text-white border-[#FAD02C]'
                      : 'bg-white text-slate-900 border-[#163A2D]'
                  }`}
                >
                  <div>
                    {/* Header with Role & Index */}
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded uppercase tracking-wider bg-[#FAD02C] text-[#163A2D]">
                        {trustee.role}
                      </span>
                      <span className={`text-xs font-mono font-bold ${trustee.isChairman ? 'text-[#FAD02C]' : 'text-slate-400'}`}>
                        #{idx + 1}
                      </span>
                    </div>

                    {/* Portrait & Name */}
                    <div className="flex items-center space-x-3.5 mb-3">
                      {trustee.image && (
                        <div className="w-14 h-14 rounded-xl overflow-hidden border border-[#D0E4DA] shrink-0 bg-slate-100 shadow-xs">
                          <img
                            src={trustee.image}
                            alt={trustee.name}
                            className="w-full h-full object-cover object-top"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Government_Seal_of_Bangladesh.svg/512px-Government_Seal_of_Bangladesh.svg.png';
                            }}
                          />
                        </div>
                      )}
                      <div>
                        <h3 className={`text-base font-sans font-black ${trustee.isChairman ? 'text-white' : 'text-slate-900'}`}>
                          {trustee.name}
                        </h3>
                        <div className={`text-xs font-mono mt-0.5 ${trustee.isChairman ? 'text-[#D0E4DA]' : 'text-emerald-800'} font-semibold`}>
                          {trustee.affiliation}
                        </div>
                      </div>
                    </div>

                    {trustee.bio && (
                      <p className={`text-xs font-mono mt-2.5 leading-relaxed ${trustee.isChairman ? 'text-[#A3C7B5]' : 'text-slate-600'}`}>
                        {trustee.bio}
                      </p>
                    )}
                  </div>

                  <div className={`pt-3 mt-3 border-t text-[10px] font-mono uppercase font-bold ${trustee.isChairman ? 'border-white/20 text-[#FAD02C]' : 'border-slate-100 text-slate-500'}`}>
                    Verified Trustee Member • CCNUST
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 4: THE SYNDICATE
            ================================================================= */}
        {activeTab === 'syndicate' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-6 shadow-sm">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#163A2D] bg-[#EAF2ED] px-2 py-0.5 rounded border border-[#D0E4DA]">
                CHIEF EXECUTIVE STATUTORY AUTHORITY
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-sans text-slate-900 mt-1">
                The University Syndicate Committee
              </h2>
              <p className="text-xs font-mono text-slate-600 mt-1">
                Under Section 17 of the Private University Act 2010, the Syndicate functions as the chief executive statutory body overseeing university administration, faculty appointments, annual budget approval, and academic council recommendations.
              </p>
            </div>

            <div className="bg-white border-2 border-[#163A2D] rounded-2xl overflow-hidden shadow-md">
              <div className="p-4 bg-[#163A2D] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-between">
                <span>Official Syndicate Roster</span>
                <span className="text-[#FAD02C]">12 Statutory Members</span>
              </div>

              <div className="divide-y divide-slate-200">
                {SYNDICATE_MEMBERS.map((member, idx) => {
                  const photoUrl = syndicatePhotoMap[member.name];
                  return (
                    <div
                      key={member.id}
                      className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FAF8F5] transition-colors"
                    >
                      <div className="flex items-start sm:items-center space-x-3.5">
                        {photoUrl ? (
                          <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#D0E4DA] shrink-0 bg-slate-100 shadow-xs">
                            <img
                              src={photoUrl}
                              alt={member.name}
                              className="w-full h-full object-cover object-top"
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          </div>
                        ) : (
                          <span className="w-8 h-8 rounded-full bg-[#163A2D] text-[#FAD02C] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                        )}
                        <div>
                          <div className="font-sans font-black text-slate-900 text-sm sm:text-base">
                            {member.name}
                          </div>
                          <div className="text-xs font-mono text-slate-600 mt-0.5">
                            {member.institutionalRole}
                          </div>
                        </div>
                      </div>

                      <div className="sm:text-right shrink-0">
                        <span
                          className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded uppercase tracking-wider inline-block ${
                            member.isChairperson
                              ? 'bg-[#163A2D] text-[#FAD02C] border border-[#FAD02C]'
                              : member.isMemberSecretary
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              : 'bg-slate-100 text-slate-700 border border-slate-300'
                          }`}
                        >
                          {member.designationInSyndicate}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 5: ACADEMIC COUNCIL & DEANS
            ================================================================= */}
        {activeTab === 'council' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Academic Council Overview */}
            <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-6 shadow-sm">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#163A2D] bg-[#EAF2ED] px-2 py-0.5 rounded border border-[#D0E4DA]">
                SUPREME ACADEMIC LEGISLATION
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-sans text-slate-900 mt-1">
                {ACADEMIC_COUNCIL_INFO.name}
              </h2>
              <p className="text-xs font-mono text-slate-600 mt-1">
                {ACADEMIC_COUNCIL_INFO.authority}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-200 font-mono text-xs">
                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#D0E4DA]">
                  <span className="text-slate-500 uppercase text-[10px] block">Chairperson</span>
                  <span className="font-bold text-[#163A2D] text-sm">{ACADEMIC_COUNCIL_INFO.chairperson}</span>
                </div>
                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#D0E4DA]">
                  <span className="text-slate-500 uppercase text-[10px] block">Member Secretary</span>
                  <span className="font-bold text-[#163A2D] text-sm">{ACADEMIC_COUNCIL_INFO.memberSecretary}</span>
                </div>
              </div>
            </div>

            {/* Deans of Faculties Section */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <GraduationCap className="w-5 h-5 text-[#163A2D]" />
                <h3 className="font-sans font-black text-lg text-slate-900 uppercase">
                  Deans of Academic Faculties
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {FACULTIES.map((fac) => (
                  <div
                    key={fac.id}
                    className="bg-white border-2 border-[#163A2D] rounded-2xl p-5 shadow-sm space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold bg-[#163A2D] text-[#FAD02C] px-2.5 py-0.5 rounded uppercase">
                        {fac.shortName}
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        {fac.departments.length} Department(s)
                      </span>
                    </div>

                    <h4 className="font-sans font-black text-base text-slate-900">
                      {fac.name}
                    </h4>

                    <div className="bg-[#FAF8F5] border border-[#D0E4DA] rounded-xl p-3 font-mono text-xs">
                      <span className="text-slate-500 text-[10px] uppercase block">Dean of Faculty</span>
                      <span className="font-bold text-[#163A2D] text-sm">{fac.deanName}</span>
                    </div>

                    <p className="text-xs font-mono text-slate-600 leading-relaxed">
                      {fac.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Statutory Powers and Duties */}
            <div className="bg-[#FAF8F5] border-2 border-[#163A2D] rounded-2xl p-6">
              <h4 className="font-sans font-black text-sm text-[#163A2D] uppercase tracking-wider mb-3 flex items-center space-x-2">
                <FileText className="w-4 h-4 text-[#FAD02C]" />
                <span>Statutory Mandate of the Academic Council</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ACADEMIC_COUNCIL_INFO.powersAndDuties.map((duty, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-[#D0E4DA] rounded-xl p-3 text-xs font-mono text-slate-700 flex items-start space-x-2 shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{duty}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Breadcrumb Nav */}
      <SecondaryPageBottomNav currentPage="authorities" />
    </div>
  );
}
