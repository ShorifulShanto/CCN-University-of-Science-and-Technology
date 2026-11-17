import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  ArrowUp,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { UNIVERSITY_INFO, FACULTIES } from '../universityData';
import { SwissButton, SwissCornerCross, SwissBadge } from './designSystem/SwissPrimitives';
import SocialTooltipBar from './SocialTooltipBar';
import { ServiceModalTab } from './CCNUSTServicesModal';

interface FooterProps {
  onOpenApplyModal: () => void;
  onOpenPortalModal: () => void;
  onOpenServiceModal?: (tab: ServiceModalTab) => void;
  onReplayIntro?: () => void;
}

export default function Footer({ onOpenApplyModal, onOpenPortalModal, onOpenServiceModal, onReplayIntro }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F281E] text-[#D0E4DA] border-t-2 border-[#163A2D] text-xs font-sans relative overflow-hidden">
      {/* Main Footer Links Matrix - Streamlined & Compact */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Col 1: University Identity & Accreditation */}
          <div className="lg:col-span-2 space-y-2.5">
            <Link
              to="/"
              onClick={scrollToTop}
              className="inline-flex items-center space-x-3 group cursor-pointer"
              title="CCN University of Science & Technology - Home"
            >
              <div className="w-10 h-10 bg-[#0F281E] border border-[#FAD02C] group-hover:border-white flex flex-col items-center justify-center shrink-0 shadow-sm transition-colors">
                <span className="text-xs font-black text-[#FAD02C] group-hover:text-white font-sans leading-none">CCN</span>
                <span className="text-[8px] font-bold text-[#D0E4DA] font-mono tracking-wider">UST</span>
              </div>
              <div>
                <span className="font-sans text-white text-base font-black uppercase tracking-tight block leading-tight group-hover:text-[#FAD02C] transition-colors">
                  CCN University
                </span>
                <span className="text-xs text-[#FAD02C] font-mono font-bold tracking-wider uppercase">
                  of Science & Technology
                </span>
              </div>
            </Link>

            <p className="text-[#A3C7B5] text-xs leading-normal max-w-sm font-normal">
              Established in 2014 in Kotbari, Cumilla under the Private University Act 2010. Approved by the University Grants Commission (UGC) and Ministry of Education, Government of Bangladesh.
            </p>

            <div className="pt-0.5">
              <div className="text-[10px] font-mono font-bold text-[#FAD02C] uppercase tracking-wider mb-1">
                Official Social Channels
              </div>
              <SocialTooltipBar />
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <button
                type="button"
                onClick={onOpenApplyModal}
                className="px-3 py-1.5 rounded-lg bg-[#FAD02C] hover:bg-[#FEF08A] text-[#163A2D] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
              >
                Apply Online
              </button>
              <button
                type="button"
                onClick={onOpenPortalModal}
                className="px-3 py-1.5 rounded-lg bg-[#163A2D] hover:bg-[#21513F] text-[#D0E4DA] hover:text-[#FAD02C] border border-[#21513F] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Portals Login
              </button>
            </div>

            <div className="pt-2 border-t border-[#21513F] space-y-0.5 text-xs text-[#A3C7B5]">
              <div className="flex items-center space-x-2 text-[#FAD02C] font-mono font-bold uppercase tracking-wider text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FAD02C] shrink-0" />
                <span>Govt. & UGC Approved Degree Standard</span>
              </div>
              <div className="font-mono text-[11px]">Campus: Kotbari, Cumilla-3500, Bangladesh</div>
            </div>
          </div>

          {/* Col 2: Academic Faculties */}
          <div>
            <h4 className="font-mono text-white font-bold text-xs uppercase tracking-widest mb-2.5 pb-1.5 border-b border-[#21513F]">
              Faculties & Depts
            </h4>
            <ul className="space-y-1.5 text-xs font-medium">
              {FACULTIES.map((fac) => (
                <li key={fac.id}>
                  <Link
                    to="/academics"
                    className="hover:text-[#FAD02C] transition-colors block text-[#A3C7B5]"
                  >
                    {fac.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link to="/academics" className="text-[#FAD02C] hover:underline font-mono font-bold uppercase tracking-wider text-[11px] block">
                  All Degree Programs &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Admissions & Aid */}
          <div>
            <h4 className="font-mono text-white font-bold text-xs uppercase tracking-widest mb-2.5 pb-1.5 border-b border-[#21513F]">
              Admissions & Aid
            </h4>
            <ul className="space-y-1.5 text-xs font-medium">
              <li>
                <Link to="/admissions" className="hover:text-[#FAD02C] transition-colors text-[#A3C7B5]">
                  Admission Overview
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-[#FAD02C] transition-colors text-[#A3C7B5]">
                  Eligibility & Requirements
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-[#FAD02C] transition-colors text-[#A3C7B5]">
                  Tuition Fee Calculator
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-[#FAD02C] transition-colors text-[#A3C7B5]">
                  Up to 100% Scholarships
                </Link>
              </li>
              <li>
                <Link to="/faculty" className="text-[#FAD02C] hover:underline font-mono font-bold uppercase tracking-wider text-[11px] block">
                  Faculty Directory (115+) &rarr;
                </Link>
              </li>
              <li>
                <Link to="/authorities" className="text-[#FAD02C] hover:underline font-mono font-bold uppercase tracking-wider text-[11px] block">
                  Higher Authorities & BoT &rarr;
                </Link>
              </li>
              <li>
                <Link to="/downloads" className="hover:text-[#FAD02C] transition-colors text-[#A3C7B5]">
                  Official Forms & Downloads
                </Link>
              </li>
              <li>
                <Link to="/transport" className="hover:text-[#FAD02C] transition-colors text-[#A3C7B5]">
                  Campus Transport & Buses
                </Link>
              </li>
              <li>
                <Link to="/gallery-activities" className="hover:text-[#FAD02C] transition-colors text-[#A3C7B5]">
                  Campus Life & Gallery
                </Link>
              </li>
              <li>
                <Link to="/user-manual" className="text-[#FAD02C] hover:underline font-mono font-bold uppercase tracking-wider text-[11px] block">
                  Website User Manual &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Institutional Portals & Services from ccnust.ac.bd */}
          <div>
            <h4 className="font-mono text-white font-bold text-xs uppercase tracking-widest mb-2.5 pb-1.5 border-b border-[#21513F]">
              CCNUST Services
            </h4>
            <ul className="space-y-1.5 text-xs font-medium">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenServiceModal?.('result')}
                  className="hover:text-[#FAD02C] transition-colors text-left text-[#A3C7B5] cursor-pointer block py-0.5 leading-snug"
                >
                  <span className="text-purple-400 font-bold mr-1.5 select-none">•</span>Semester Result Search
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenServiceModal?.('verification')}
                  className="hover:text-[#FAD02C] transition-colors text-left text-[#A3C7B5] cursor-pointer block py-0.5 leading-snug"
                >
                  <span className="text-rose-400 font-bold mr-1.5 select-none">•</span>Student Verification
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenServiceModal?.('routine')}
                  className="hover:text-[#FAD02C] transition-colors text-left text-[#A3C7B5] cursor-pointer block py-0.5 leading-snug"
                >
                  <span className="text-amber-400 font-bold mr-1.5 select-none">•</span>All Routine (Class & Exam)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenServiceModal?.('offices')}
                  className="hover:text-[#FAD02C] transition-colors text-left text-[#A3C7B5] cursor-pointer block py-0.5 leading-snug"
                >
                  <span className="text-emerald-400 font-bold mr-1.5 select-none">•</span>12 Administrative Offices
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenServiceModal?.('convocation')}
                  className="hover:text-[#FAD02C] transition-colors text-left text-[#A3C7B5] cursor-pointer block py-0.5 leading-snug"
                >
                  <span className="text-blue-400 font-bold mr-1.5 select-none">•</span>Convocation Registration
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenServiceModal?.('carnival')}
                  className="hover:text-[#FAD02C] transition-colors text-left text-[#A3C7B5] cursor-pointer block py-0.5 leading-snug"
                >
                  <span className="text-amber-300 font-bold mr-1.5 select-none">•</span>Diploma Engineers Carnival
                </button>
              </li>
              <li className="pt-1 border-t border-[#21513F]">
                <Link to="/research-journal" className="hover:text-[#FAD02C] transition-colors block text-[#A3C7B5] py-0.5">
                  <span className="text-blue-400 font-bold mr-1.5">•</span>CCNJST Research Journal
                </Link>
              </li>
              <li>
                <Link to="/career-placement" className="hover:text-[#FAD02C] transition-colors block text-[#A3C7B5] py-0.5">
                  <span className="text-emerald-400 font-bold mr-1.5">•</span>Career Placement Cell
                </Link>
              </li>
              <li>
                <Link to="/alumni" className="hover:text-[#FAD02C] transition-colors block text-[#A3C7B5] py-0.5">
                  <span className="text-amber-400 font-bold mr-1.5">•</span>Alumni Association Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Institutional Portals & Sister Bodies */}
          <div>
            <h4 className="font-mono text-white font-bold text-xs uppercase tracking-widest mb-2.5 pb-1.5 border-b border-[#21513F]">
              Portals & Sister Orgs
            </h4>
            <ul className="space-y-1.5 text-xs font-medium">
              <li>
                <button
                  type="button"
                  onClick={onOpenPortalModal}
                  className="hover:text-[#FAD02C] transition-colors text-left text-[#A3C7B5] cursor-pointer block py-0.5"
                >
                  Student Portal Access
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPortalModal}
                  className="hover:text-[#FAD02C] transition-colors text-left text-[#A3C7B5] cursor-pointer block py-0.5"
                >
                  Faculty Member Desk
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPortalModal}
                  className="hover:text-[#FAD02C] transition-colors text-left text-[#A3C7B5] cursor-pointer block py-0.5"
                >
                  Exam Controller Portal
                </button>
              </li>
              <li className="pt-1.5 border-t border-[#21513F]">
                <span className="text-[10px] font-mono text-[#FAD02C] uppercase tracking-wider block font-bold mb-0.5">
                  Sister Institutions
                </span>
                <a
                  href="https://ccnpolytechnic.ac/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors block text-[#A3C7B5] text-[11px] font-mono py-0.5"
                >
                  CCN Polytechnic Institute &rarr;
                </a>
              </li>
              <li>
                <a
                  href="https://ccnmc.ac/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors block text-[#A3C7B5] text-[11px] font-mono py-0.5"
                >
                  CCN Medical College & Hospital &rarr;
                </a>
              </li>
              <li>
                <a
                  href="https://tariqulislam.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors block text-[#A3C7B5] text-[11px] font-mono py-0.5"
                >
                  Founder: Dr. Tariqul Islam &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Legal & System Bar */}
      <div className="border-t border-[#21513F] bg-[#0A1D16] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#A3C7B5] font-mono">
          <div>
            &copy; {new Date().getFullYear()} CCN University of Science & Technology. All rights reserved.
          </div>

          <div className="flex items-center space-x-3">
            {onReplayIntro && (
              <>
                <button
                  onClick={onReplayIntro}
                  className="text-[#FAD02C] hover:underline font-bold uppercase tracking-wider cursor-pointer"
                >
                  [ Cinematic Intro ]
                </button>
                <span className="text-[#21513F]">•</span>
              </>
            )}
            <Link to="/user-manual" className="text-[#FAD02C] hover:underline uppercase transition-colors text-[11px] font-bold">
              User Manual
            </Link>
            <span className="text-[#21513F]">•</span>
            <Link to="/about" className="hover:text-white uppercase transition-colors text-[11px]">
              Privacy Policy
            </Link>
            <span className="text-[#21513F]">•</span>
            <Link to="/authorities" className="hover:text-white uppercase transition-colors text-[11px]">
              UGC Regulations
            </Link>
            <button
              onClick={scrollToTop}
              className="p-1.5 bg-[#163A2D] hover:bg-[#FAD02C] hover:text-[#163A2D] border border-[#21513F] text-[#D0E4DA] transition-all duration-200 ml-2 cursor-pointer shadow-xs"
              title="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

