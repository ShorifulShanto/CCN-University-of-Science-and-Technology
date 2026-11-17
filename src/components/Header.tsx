import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  User,
  GraduationCap,
  Sparkles,
  BookOpen,
  Award,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  Building2,
  Users,
  Bus,
  Image as ImageIcon,
  Building,
  Search,
  FileText,
  Briefcase,
  HelpCircle,
} from 'lucide-react';
import { UNIVERSITY_INFO, FACULTIES } from '../universityData';
import { UserSession } from '../types';
import { ServiceModalTab } from './CCNUSTServicesModal';

const GlobalSearchModal = lazy(() => import('./GlobalSearchModal'));

interface HeaderProps {
  onOpenApplyModal: () => void;
  onOpenPortalModal: (role?: string) => void;
  onOpenAdminPanel?: () => void;
  onOpenServiceModal?: (tab?: ServiceModalTab) => void;
  onSelectProgram?: (programId: string) => void;
  onReplayIntro?: () => void;
  userSession: UserSession | null;
  onLogout: () => void;
  activeSection?: string;
}

export default function Header({
  onOpenApplyModal,
  onOpenPortalModal,
  onOpenAdminPanel,
  onOpenServiceModal,
  onSelectProgram,
  onReplayIntro,
  userSession,
  onLogout,
}: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const lastScrollY = React.useRef(0);

  // Close menu on route change
  useEffect(() => {
    setMenuDrawerOpen(false);
  }, [location.pathname]);

  // Global search shortcut (Cmd+K / Ctrl+K / forward-slash)
  useEffect(() => {
    const handleGlobalSearchKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsGlobalSearchOpen((prev) => !prev);
      } else if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        setIsGlobalSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalSearchKey);
    return () => window.removeEventListener('keydown', handleGlobalSearchKey);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY <= 40) {
            setIsScrolled(false);
            setShowHeader(true);
          } else {
            setIsScrolled(true);
            if (currentScrollY > lastScrollY.current + 5) {
              // Scrolling down - make top bar disappear
              setShowHeader(false);
            } else if (lastScrollY.current - currentScrollY > 10) {
              // Scrolling up - make top bar reappear
              setShowHeader(true);
            }
          }
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuDrawerOpen) {
        setMenuDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuDrawerOpen]);

  const scrollToSection = (sectionId: string) => {
    // Close navigation menu
    setMenuDrawerOpen(false);

    // If contact is selected, route inside the About section with Contact tab active
    if (sectionId === 'contact' || sectionId === 'about-contact') {
      window.dispatchEvent(new CustomEvent('set-about-tab', { detail: 'contact' }));
      window.location.hash = '#contact';
      const aboutEl = document.getElementById('about');
      if (aboutEl) {
        aboutEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    if (sectionId === 'leadership') {
      window.dispatchEvent(new CustomEvent('set-about-tab', { detail: 'leadership' }));
    } else if (sectionId === 'about-mission') {
      window.dispatchEvent(new CustomEvent('set-about-tab', { detail: 'vision' }));
    } else if (sectionId === 'about') {
      window.dispatchEvent(new CustomEvent('set-about-tab', { detail: 'overview' }));
    }

    // Map any alias IDs so they resolve to existing DOM section IDs
    const idMap: Record<string, string> = {
      'campus-gallery': 'gallery',
      'gallery': 'gallery',
      'research-international': 'research',
      'research': 'research',
      'scholarships': 'scholarships',
      'tuition-calculator': 'tuition-calculator',
      'admission-requirements': 'admission-requirements',
      'admission': 'admission',
      'about': 'about',
      'about-mission': 'about',
      'leadership': 'about',
      'why-choose': 'why-choose',
      'faculties': 'faculties',
      'faculty-directory': 'faculty-directory',
      'id-cards': 'id-cards',
      'campus-life': 'campus-life',
      'events': 'events',
      'notices': 'notices',
      'hero': 'hero',
    };

    const targetId = idMap[sectionId] || sectionId;

    const navigateToElement = () => {
      const element = document.getElementById(targetId) || document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.location.hash = targetId;
      }
    };

    navigateToElement();
    setTimeout(navigateToElement, 60);
    setTimeout(navigateToElement, 160);
  };

  // The top bar only appears on the home page as requested
  if (!isHomePage) {
    return null;
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        !showHeader && !menuDrawerOpen
          ? '-translate-y-full opacity-0 pointer-events-none'
          : 'translate-y-0 opacity-100 pointer-events-auto'
      }`}
    >
      {/* 1. Institutional Clean Utility Strip (Frosted Glass Style) */}
      <div className="bg-[#0A1D15]/85 backdrop-blur-md text-[#D0E4DA] text-xs border-b border-white/10 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between gap-3 text-[11px] font-mono">
          {/* Left: Official Location & UGC Status */}
          <div className="flex items-center space-x-2 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#FAD02C] shrink-0" />
            <span className="font-semibold text-white truncate">Kotbari, Cumilla-3500, Bangladesh</span>
            <span className="hidden sm:inline text-[#76A892]">•</span>
            <span className="hidden sm:inline text-[#A3C7B5]">Govt. & UGC Approved • Est. 2014</span>
          </div>

          {/* Right: Official Helplines & Intro Replay */}
          <div className="flex items-center space-x-3 shrink-0 ml-auto">
            <div className="hidden md:flex items-center space-x-1.5 text-[#D0E4DA]">
              <Phone className="w-3 h-3 text-[#FAD02C]" />
              <span className="text-white font-bold">01715-451599</span>
            </div>
            <div className="hidden lg:flex items-center space-x-1.5 text-[#A3C7B5]">
              <Mail className="w-3 h-3 text-[#FAD02C]" />
              <span>info@ccnust.ac.bd</span>
            </div>

            <button
              onClick={() => navigate('/authorities')}
              className="hidden sm:inline-flex items-center space-x-1 text-[10px] text-[#A3C7B5] hover:text-[#FAD02C] uppercase tracking-wider px-2 py-0.5 rounded hover:bg-[#163A2D] transition-colors cursor-pointer"
              title="Higher Authorities (Chairman, VC, Registrar, BoT)"
            >
              <ShieldCheck className="w-3 h-3 text-[#FAD02C]" />
              <span>Higher Authorities</span>
            </button>

            <button
              onClick={() => navigate('/research-journal')}
              className="hidden md:inline-flex items-center space-x-1 text-[10px] text-[#A3C7B5] hover:text-[#FAD02C] uppercase tracking-wider px-2 py-0.5 rounded hover:bg-[#163A2D] transition-colors cursor-pointer"
              title="CCN Journal of Science and Technology"
            >
              <BookOpen className="w-3 h-3 text-[#FAD02C]" />
              <span>CCNJST Journal</span>
            </button>

            <button
              onClick={() => navigate('/downloads')}
              className="hidden lg:inline-flex items-center space-x-1 text-[10px] text-[#A3C7B5] hover:text-[#FAD02C] uppercase tracking-wider px-2 py-0.5 rounded hover:bg-[#163A2D] transition-colors cursor-pointer"
              title="Official Student Forms & Downloads"
            >
              <FileText className="w-3 h-3 text-[#FAD02C]" />
              <span>Downloads</span>
            </button>

            <button
              onClick={() => navigate('/transport')}
              className="hidden xl:inline-flex items-center space-x-1 text-[10px] text-[#A3C7B5] hover:text-[#FAD02C] uppercase tracking-wider px-2 py-0.5 rounded hover:bg-[#163A2D] transition-colors cursor-pointer"
              title="Campus Transport & Bus Route Schedules"
            >
              <Bus className="w-3 h-3 text-[#FAD02C]" />
              <span>Bus Schedules</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/user-manual')}
              className="hidden sm:inline-flex items-center space-x-1 text-[10px] text-[#A3C7B5] hover:text-[#FAD02C] uppercase tracking-wider px-2 py-0.5 rounded hover:bg-[#163A2D] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              title="Open Website & Portal User Manual"
            >
              <HelpCircle className="w-3 h-3 text-[#FAD02C]" />
              <span>User Manual</span>
            </button>

            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                className="hidden xl:inline-flex items-center space-x-1 text-[10px] text-[#A3C7B5] hover:text-[#FAD02C] uppercase tracking-wider px-2 py-0.5 rounded hover:bg-[#163A2D] transition-colors cursor-pointer"
                title="Replay Cinematic Campus Intro"
              >
                <Sparkles className="w-3 h-3 text-[#FAD02C]" />
                <span>Intro</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Executive Navbar (Frosted Style with CCN Logo and Name) */}
      <nav
        className={`w-full text-white border-b border-white/15 backdrop-blur-xl transition-all duration-300 ${
          isScrolled
            ? 'py-2.5 bg-[#163A2D]/80 shadow-[0_8px_32px_rgba(0,0,0,0.25)]'
            : 'py-3.5 bg-[#163A2D]/85 shadow-[0_4px_24px_rgba(0,0,0,0.18)]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: University Crest & Brand Logo with Real CCNUST Logo from actual site - Links to Home */}
            <Link
              to="/"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group select-none"
              title="CCN University of Science & Technology - Home"
            >
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white p-0.5 shadow-md border border-[#FAD02C]/60 group-hover:border-[#FAD02C] group-hover:scale-105 transition-all flex items-center justify-center shrink-0 overflow-hidden">
                <img
                  src="/ccnustEmblem.png"
                  alt="CCN University of Science & Technology Official Logo"
                  className="w-full h-full object-contain"
                  loading="eager"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== 'https://ccnust.ac.bd/frontend/images/1697788827082.png') {
                      target.src = 'https://ccnust.ac.bd/frontend/images/1697788827082.png';
                    }
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-sm sm:text-base md:text-lg font-black tracking-tight uppercase text-white leading-none group-hover:text-[#FAD02C] transition-colors">
                  CCN UNIVERSITY
                </span>
                <div className="flex items-center space-x-1.5 text-[10px] sm:text-xs text-[#A3C7B5] font-mono tracking-wider uppercase mt-0.5">
                  <span className="text-[#FAD02C] font-bold">SCIENCE & TECHNOLOGY</span>
                  <span>•</span>
                  <span>EST. 2014</span>
                </div>
              </div>
            </Link>

            {/* Right: Search Button + Login/Signup + Menu */}
            <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
              {/* Quick Search Button (Button Only - No text input) */}
              <button
                type="button"
                onClick={() => setIsGlobalSearchOpen(true)}
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#0F281E] hover:bg-[#21513F] text-[#FAD02C] hover:text-white border border-[#21513F] hover:border-[#FAD02C] transition-colors cursor-pointer shadow-xs"
                aria-label="Search"
                title="Search faculty, departments, services..."
              >
                <Search className="w-4 h-4" />
              </button>
              {/* Separate Portal Login / Sign Up */}
              {userSession ? (
                <div className="flex items-center space-x-1.5 sm:space-x-2">
                  <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 bg-[#0F281E] border border-[#21513F] rounded text-xs font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[#FAD02C] font-bold truncate max-w-[110px]">
                      {userSession.name}
                    </span>
                  </div>

                  {(userSession.isAdmin || userSession.email === 'md.si.shanto001@gmail.com' || userSession.role === 'admin') && (
                    <button
                      onClick={() => onOpenAdminPanel?.()}
                      className="inline-flex items-center space-x-1 bg-[#FAD02C] hover:bg-[#FEF08A] text-[#163A2D] px-2.5 py-1.5 text-xs font-mono font-bold uppercase transition-colors rounded shadow-sm cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Admin</span>
                    </button>
                  )}

                  <button
                    onClick={() => onOpenPortalModal()}
                    className="inline-flex items-center space-x-1 bg-[#21513F] hover:bg-[#FAD02C] hover:text-[#163A2D] text-white px-2.5 sm:px-3 py-1.5 text-xs font-mono font-bold uppercase transition-colors rounded border border-[#2e6d55] cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-[#FAD02C]" />
                    <span>Dashboard</span>
                  </button>

                  <button
                    onClick={onLogout}
                    className="text-[#A3C7B5] hover:text-rose-400 text-xs font-mono px-2 py-1 transition-colors cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => onOpenPortalModal()}
                  className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider px-3 sm:px-4 py-2 rounded-lg bg-[#21513F] hover:bg-[#2c6e54] text-white border border-[#2e6d55] hover:border-[#FAD02C] shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  title="Open Student, Faculty, Applicant & Admin Portals"
                >
                  <User className="w-3.5 h-3.5 text-[#FAD02C] group-hover:scale-110 transition-transform" />
                  <span>Login / Sign Up</span>
                </button>
              )}

              {/* From Uiverse.io by JulanDeAlb */}
              <label
                className="hamburger"
                aria-label={menuDrawerOpen ? "Close university navigation menu" : "Open university navigation menu"}
                title={menuDrawerOpen ? "Close menu" : "Open navigation menu"}
              >
                <input
                  type="checkbox"
                  checked={menuDrawerOpen}
                  onChange={(e) => setMenuDrawerOpen(e.target.checked)}
                />
                <svg viewBox="0 0 32 32">
                  <path
                    className="line line-top-bottom"
                    d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 15.2 30 13 30 10.8 30 9 28.2 9 26 9 23.8 10.8 22 13 22L27 22"
                  />
                  <path className="line" d="M7 16 27 16" />
                </svg>
              </label>
            </div>
          </div>
        </div>

        {/* 3. Comprehensive University Navigation Drawer (Fast GPU-Accelerated Enter) */}
        {menuDrawerOpen && (
          <div
            id="university-menu-drawer"
            className="w-full mirror-backdrop shadow-2xl animate-menu-enter"
          >
            <div className="mirror-pane max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 my-2 max-h-[85vh] overflow-y-auto relative">
              {/* Quick Search & Virtual Tour inside Drawer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                <button
                  type="button"
                  onClick={() => {
                    setMenuDrawerOpen(false);
                    setIsGlobalSearchOpen(true);
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-[#FAF8F5] border-2 border-[#163A2D] hover:bg-[#EAE4DC] rounded-xl text-left text-xs font-mono text-[#163A2D] transition-all shadow-sm group cursor-pointer"
                >
                  <div className="flex items-center space-x-2.5">
                    <Search className="w-4 h-4 text-[#163A2D]" />
                    <span className="text-[#163A2D] font-bold">Quick find departments, faculty...</span>
                  </div>
                  <span className="text-[10px] bg-[#163A2D] text-[#FAD02C] px-2.5 py-1 rounded font-bold shadow-xs">
                    SEARCH (⌘K)
                  </span>
                </button>
              </div>

              {/* Top Banner: Fall 2026 Admissions Banner with Direct Apply Online Action */}
              <div className="bg-[#FAF8F5] border-2 border-[#163A2D] rounded-xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md text-[#163A2D]">
                <div className="flex items-center space-x-3 text-center sm:text-left">
                  <div className="w-10 h-10 rounded-lg bg-[#163A2D] border border-[#163A2D] flex items-center justify-center text-[#FAD02C] shrink-0 shadow-xs">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-sans font-black text-[#163A2D] text-sm sm:text-base tracking-tight uppercase flex items-center space-x-2">
                      <span>Admissions Open — Fall 2026</span>
                      <span className="text-[10px] bg-[#FAD02C] text-[#163A2D] font-mono px-2 py-0.5 rounded font-bold">
                        ENROLLING
                      </span>
                    </div>
                    <div className="text-xs text-[#4E7D68] font-mono mt-0.5">
                      Undergraduate & Graduate programs across Science, Engineering, Law, Arts & Business
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setMenuDrawerOpen(false);
                      onOpenApplyModal();
                    }}
                    className="flex-1 sm:flex-none px-6 py-2.5 bg-[#FAD02C] hover:bg-[#FEF08A] text-[#163A2D] font-mono font-black text-xs uppercase tracking-wider rounded-lg transition-all shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#163A2D]" />
                    <span>Apply Online Now</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuDrawerOpen(false);
                      navigate('/admissions');
                    }}
                    className="px-4 py-2.5 bg-[#163A2D] hover:bg-[#0D241C] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer shadow-xs"
                  >
                    Admissions Page
                  </button>
                </div>
              </div>

              {/* 4 Categorized Columns for Desktop & Mobile - Styled with Website Offwhite, Green Border & Yellow Text Headings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
                {/* Column 1: About & Institutional Contact */}
                <div className="space-y-3 bg-[#FAF8F5] border-2 border-[#163A2D] hover:shadow-xl hover:shadow-[#163A2D]/20 transition-all duration-300 p-4 sm:p-5 rounded-xl shadow-md text-[#163A2D]">
                  <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-[#163A2D] text-[#FAD02C] font-black text-xs uppercase tracking-wider shadow-xs border border-[#163A2D]">
                    <BookOpen className="w-4 h-4 text-[#FAD02C] shrink-0" />
                    <span className="text-[#FAD02C] font-black">About & Contact</span>
                  </div>
                  <ul className="space-y-1.5 pt-1">
                    <li>
                      <button
                        onClick={() => {
                          setMenuDrawerOpen(false);
                          navigate('/about');
                        }}
                        className="w-full text-left py-1.5 px-2 text-[#163A2D] font-medium hover:bg-[#163A2D] hover:text-white rounded-lg transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <span>About CCNUST</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#163A2D] group-hover:text-white" />
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setMenuDrawerOpen(false);
                          navigate('/about');
                        }}
                        className="w-full text-left py-1.5 px-2 text-[#163A2D] font-medium hover:bg-[#163A2D] hover:text-white rounded-lg transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <span>Vision & Mission</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#163A2D] group-hover:text-white" />
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setMenuDrawerOpen(false);
                          navigate('/authorities');
                        }}
                        className="w-full text-left py-1.5 px-2 text-[#163A2D] font-medium hover:bg-[#163A2D] hover:text-white rounded-lg transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <span className="font-bold text-[#163A2D] group-hover:text-white">Higher Authorities (BoT, VC, Registrar)</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#163A2D] group-hover:text-white" />
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setMenuDrawerOpen(false);
                          navigate('/alumni');
                        }}
                        className="w-full text-left py-1.5 px-2 text-[#163A2D] font-medium hover:bg-[#163A2D] hover:text-white rounded-lg transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <span className="font-bold text-[#163A2D] group-hover:text-white">Alumni Association (6,500+)</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#163A2D] group-hover:text-white" />
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setMenuDrawerOpen(false);
                          navigate('/');
                          setTimeout(() => {
                            const el = document.getElementById('why-choose');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }}
                        className="w-full text-left py-1.5 px-2 text-[#163A2D] font-medium hover:bg-[#163A2D] hover:text-white rounded-lg transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <span>Why Choose CCNUST</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#163A2D] group-hover:text-white" />
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setMenuDrawerOpen(false);
                          navigate('/user-manual');
                        }}
                        className="w-full text-left py-1.5 px-2 text-[#163A2D] font-bold hover:bg-[#163A2D] hover:text-white rounded-lg transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center space-x-1.5">
                          <HelpCircle className="w-3.5 h-3.5 text-[#163A2D] group-hover:text-[#FAD02C]" />
                          <span>Website User Manual</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#163A2D] group-hover:text-white" />
                      </button>
                    </li>
                    {/* Contact is explicitly inside the About Section */}
                    <li className="pt-1.5 border-t border-[#163A2D]/20">
                      <button
                        onClick={() => {
                          setMenuDrawerOpen(false);
                          navigate('/about');
                          setTimeout(() => {
                            window.dispatchEvent(new CustomEvent('set-about-tab', { detail: 'contact' }));
                          }, 100);
                        }}
                        className="w-full text-left py-2 px-2.5 text-white bg-[#163A2D] hover:bg-[#0D241C] hover:text-[#FAD02C] rounded-lg transition-colors flex items-center justify-between font-bold cursor-pointer shadow-xs group"
                      >
                        <div className="flex items-center space-x-1.5">
                          <Phone className="w-3.5 h-3.5 text-[#FAD02C]" />
                          <span>Campus Contact & Location</span>
                        </div>
                        <span className="text-[10px] bg-[#FAD02C] text-[#163A2D] px-1.5 py-0.5 rounded font-black">
                          ABOUT
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Column 2: Academics & Admissions */}
                <div className="space-y-3 bg-[#FAF8F5] border-2 border-[#163A2D] hover:shadow-xl hover:shadow-[#163A2D]/20 transition-all duration-300 p-4 sm:p-5 rounded-xl shadow-md text-[#163A2D]">
                  <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-[#163A2D] text-[#FAD02C] font-black text-xs uppercase tracking-wider shadow-xs border border-[#163A2D]">
                    <GraduationCap className="w-4 h-4 text-[#FAD02C] shrink-0" />
                    <span className="text-[#FAD02C] font-black">Academics & Admission</span>
                  </div>
                  <ul className="space-y-1.5 pt-1">
                    <li>
                      <button
                        onClick={() => {
                          setMenuDrawerOpen(false);
                          navigate('/academics');
                        }}
                        className="w-full text-left py-1.5 px-2 text-[#163A2D] font-medium hover:bg-[#163A2D] hover:text-white rounded-lg transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <span>Faculties & Degree Programs</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#163A2D] group-hover:text-white" />
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setMenuDrawerOpen(false);
                          navigate('/admissions');
                        }}
                        className="w-full text-left py-1.5 px-2 text-[#163A2D] font-medium hover:bg-[#163A2D] hover:text-white rounded-lg transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <span>Admission Eligibility & Criteria</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#163A2D] group-hover:text-white" />
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setMenuDrawerOpen(false);
                          navigate('/admissions');
                        }}
                        className="w-full text-left py-1.5 px-2 text-[#163A2D] font-medium hover:bg-[#163A2D] hover:text-white rounded-lg transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <span>Tuition & Fee Calculator</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#163A2D] group-hover:text-white" />
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setMenuDrawerOpen(false);
                          navigate('/admissions');
                        }}
                        className="w-full text-left py-1.5 px-2 text-[#163A2D] font-medium hover:bg-[#163A2D] hover:text-white rounded-lg transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <span>Merit Scholarships (Up to 100%)</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#163A2D] group-hover:text-white" />
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setMenuDrawerOpen(false);
                          navigate('/downloads');
                        }}
                        className="w-full text-left py-1.5 px-2 text-[#163A2D] font-medium hover:bg-[#163A2D] hover:text-white rounded-lg transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <span className="font-bold text-[#163A2D] group-hover:text-white">Official Forms & Downloads</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#163A2D] group-hover:text-white" />
                      </button>
                    </li>
                    <li className="pt-1.5 border-t border-[#163A2D]/20">
                      <button
                        onClick={() => {
                          setMenuDrawerOpen(false);
                          onOpenApplyModal();
                        }}
                        className="w-full text-left py-2 px-2.5 text-[#163A2D] bg-[#FAD02C] hover:bg-[#163A2D] hover:text-white rounded-lg transition-colors flex items-center justify-between font-black cursor-pointer shadow-xs border border-[#163A2D]/20 group"
                      >
                        <span>Online Application Form</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#163A2D] group-hover:text-white transition-colors" />
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Column 3: Faculty, Campus Life & Activities */}
                <div className="space-y-3 bg-[#FAF8F5] border-2 border-[#163A2D] hover:shadow-xl hover:shadow-[#163A2D]/20 transition-all duration-300 p-4 sm:p-5 rounded-xl shadow-md text-[#163A2D]">
                  <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-[#163A2D] text-[#FAD02C] font-black text-xs uppercase tracking-wider shadow-xs border border-[#163A2D]">
                    <Users className="w-4 h-4 text-[#FAD02C] shrink-0" />
                    <span className="text-[#FAD02C] font-black">Faculty & Activities</span>
                  </div>
                  <ul className="space-y-1.5 pt-1">
                    <li>
                      <button
                        onClick={() => {
                          setMenuDrawerOpen(false);
                          navigate('/faculty');
                        }}
                        className="w-full text-left py-1.5 px-2 text-[#163A2D] font-medium hover:bg-[#163A2D] hover:text-white rounded-lg transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <span>Faculty Directory (115+ Teachers)</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#163A2D] group-hover:text-white" />
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setMenuDrawerOpen(false);
                          navigate('/transport');
                        }}
                        className="w-full text-left py-1.5 px-2 text-[#163A2D] font-medium hover:bg-[#163A2D] hover:text-white rounded-lg transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <span className="font-bold text-[#163A2D] group-hover:text-white">Campus Transport & Bus Routes</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#163A2D] group-hover:text-white" />
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setMenuDrawerOpen(false);
                          navigate('/gallery-activities');
                        }}
                        className="w-full text-left py-1.5 px-2 text-[#163A2D] font-medium hover:bg-[#163A2D] hover:text-white rounded-lg transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <span>Campus Gallery & Activities</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#163A2D] group-hover:text-white" />
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setMenuDrawerOpen(false);
                          navigate('/gallery-activities');
                        }}
                        className="w-full text-left py-1.5 px-2 text-[#163A2D] font-medium hover:bg-[#163A2D] hover:text-white rounded-lg transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <span>Freshers Orientation Archives</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#163A2D] group-hover:text-white" />
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setMenuDrawerOpen(false);
                          navigate('/gallery-activities');
                        }}
                        className="w-full text-left py-1.5 px-2 text-[#163A2D] font-medium hover:bg-[#163A2D] hover:text-white rounded-lg transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <span>Foundation Day Celebrations</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#163A2D] group-hover:text-white" />
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setMenuDrawerOpen(false);
                          navigate('/gallery-activities');
                        }}
                        className="w-full text-left py-1.5 px-2 text-[#163A2D] font-medium hover:bg-[#163A2D] hover:text-white rounded-lg transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <span>Research Seminars & MoUs</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#163A2D] group-hover:text-white" />
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Column 4: CCNUST.AC.BD Portals, Services & Offices */}
                <div className="space-y-3 bg-[#FAF8F5] border-2 border-[#163A2D] hover:shadow-xl hover:shadow-[#163A2D]/20 transition-all duration-300 p-4 sm:p-5 rounded-xl shadow-md text-[#163A2D]">
                  <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-[#163A2D] text-[#FAD02C] font-black text-xs uppercase tracking-wider shadow-xs border border-[#163A2D]">
                    <Building className="w-4 h-4 text-[#FAD02C] shrink-0" />
                    <span className="text-[#FAD02C] font-black">CCNUST Services & Offices</span>
                  </div>
                  <ul className="space-y-1.5 pt-1">
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setMenuDrawerOpen(false);
                          navigate('/research-journal');
                        }}
                        className="w-full text-left py-1.5 px-2 text-[#163A2D] font-medium hover:bg-[#163A2D] hover:text-white rounded-lg transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center space-x-2">
                          <BookOpen className="w-3.5 h-3.5 text-blue-700 group-hover:text-[#FAD02C] transition-colors" />
                          <span className="font-bold">CCNJST Research Journal</span>
                        </div>
                        <span className="text-[9px] bg-blue-100 text-blue-900 border border-blue-300 px-1.5 py-0.5 rounded font-bold group-hover:bg-[#FAD02C] group-hover:text-[#163A2D] group-hover:border-[#FAD02C] transition-colors">
                          ISSN
                        </span>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setMenuDrawerOpen(false);
                          navigate('/career-placement');
                        }}
                        className="w-full text-left py-1.5 px-2 text-[#163A2D] font-medium hover:bg-[#163A2D] hover:text-white rounded-lg transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center space-x-2">
                          <Briefcase className="w-3.5 h-3.5 text-emerald-700 group-hover:text-[#FAD02C] transition-colors" />
                          <span className="font-bold">Career Placement & Internships</span>
                        </div>
                        <span className="text-[9px] bg-emerald-100 text-emerald-900 border border-emerald-300 px-1.5 py-0.5 rounded font-bold group-hover:bg-[#FAD02C] group-hover:text-[#163A2D] group-hover:border-[#FAD02C] transition-colors">
                          JOBS
                        </span>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setMenuDrawerOpen(false);
                          navigate('/services');
                        }}
                        className="w-full text-left py-1.5 px-2 text-[#163A2D] font-medium hover:bg-[#163A2D] hover:text-white rounded-lg transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center space-x-2">
                          <Award className="w-3.5 h-3.5 text-purple-700 group-hover:text-[#FAD02C] transition-colors" />
                          <span>Semester Result Search</span>
                        </div>
                        <span className="text-[9px] bg-purple-100 text-purple-900 border border-purple-300 px-1.5 py-0.5 rounded font-bold group-hover:bg-[#FAD02C] group-hover:text-[#163A2D] group-hover:border-[#FAD02C] transition-colors">
                          UGC
                        </span>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setMenuDrawerOpen(false);
                          navigate('/services');
                        }}
                        className="w-full text-left py-1.5 px-2 text-[#163A2D] font-medium hover:bg-[#163A2D] hover:text-white rounded-lg transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center space-x-2">
                          <ShieldCheck className="w-3.5 h-3.5 text-rose-700 group-hover:text-[#FAD02C] transition-colors" />
                          <span>Student Verification</span>
                        </div>
                        <span className="text-[9px] bg-rose-100 text-rose-900 border border-rose-300 px-1.5 py-0.5 rounded font-bold group-hover:bg-[#FAD02C] group-hover:text-[#163A2D] group-hover:border-[#FAD02C] transition-colors">
                          VERIFIED
                        </span>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setMenuDrawerOpen(false);
                          navigate('/services');
                        }}
                        className="w-full text-left py-1.5 px-2 text-[#163A2D] font-medium hover:bg-[#163A2D] hover:text-white rounded-lg transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-3.5 h-3.5 text-amber-700 group-hover:text-[#FAD02C] transition-colors" />
                          <span>All Routine (Class & Exam)</span>
                        </div>
                        <span className="text-[9px] bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.5 rounded font-bold group-hover:bg-[#FAD02C] group-hover:text-[#163A2D] group-hover:border-[#FAD02C] transition-colors">
                          LIVE
                        </span>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setMenuDrawerOpen(false);
                          navigate('/services');
                        }}
                        className="w-full text-left py-1.5 px-2 text-[#163A2D] font-medium hover:bg-[#163A2D] hover:text-white rounded-lg transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center space-x-2">
                          <GraduationCap className="w-3.5 h-3.5 text-blue-700 group-hover:text-[#FAD02C] transition-colors" />
                          <span>Convocation Registration</span>
                        </div>
                        <span className="text-[9px] bg-blue-100 text-blue-900 border border-blue-300 px-1.5 py-0.5 rounded font-bold group-hover:bg-[#FAD02C] group-hover:text-[#163A2D] group-hover:border-[#FAD02C] transition-colors">
                          GRAD
                        </span>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setMenuDrawerOpen(false);
                          navigate('/services');
                        }}
                        className="w-full text-left py-1.5 px-2 text-[#163A2D] font-medium hover:bg-[#163A2D] hover:text-white rounded-lg transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center space-x-2">
                          <Layers className="w-3.5 h-3.5 text-emerald-700 group-hover:text-[#FAD02C] transition-colors" />
                          <span>Diploma Engineers Carnival</span>
                        </div>
                        <span className="text-[9px] bg-emerald-100 text-emerald-900 border border-emerald-300 px-1.5 py-0.5 rounded font-bold group-hover:bg-[#FAD02C] group-hover:text-[#163A2D] group-hover:border-[#FAD02C] transition-colors">
                          WAIVER
                        </span>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setMenuDrawerOpen(false);
                          navigate('/services');
                        }}
                        className="w-full text-left py-1.5 px-2 text-[#163A2D] font-medium hover:bg-[#163A2D] hover:text-white rounded-lg transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center space-x-2">
                          <Building className="w-3.5 h-3.5 text-[#163A2D] group-hover:text-[#FAD02C] transition-colors" />
                          <span>Administrative Offices (12)</span>
                        </div>
                        <span className="text-[9px] bg-[#163A2D] text-[#FAD02C] border border-[#163A2D] group-hover:bg-[#FAD02C] group-hover:text-[#163A2D] group-hover:border-[#FAD02C] px-1.5 py-0.5 rounded font-bold transition-colors">
                          DIRECTORY
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Footer Info Strip of Drawer */}
              <div className="mt-6 pt-4 border-t border-[#21513F] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#A3C7B5] font-mono">
                <div className="flex items-center space-x-2 text-center sm:text-left">
                  <span>Helpline:</span>
                  <a href="tel:01715451599" className="text-[#FAD02C] font-bold hover:underline">
                    01715-451599
                  </a>
                  <span>/</span>
                  <a href="tel:01888042667" className="text-[#FAD02C] font-bold hover:underline">
                    01888-042667
                  </a>
                  <span>•</span>
                  <span>info@ccnust.ac.bd</span>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      setMenuDrawerOpen(false);
                      onOpenPortalModal();
                    }}
                    className="text-[#FAD02C] hover:underline font-bold flex items-center space-x-1 cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Open Student / Faculty Portal</span>
                  </button>
                  <button
                    onClick={() => setMenuDrawerOpen(false)}
                    className="px-3 py-1 bg-[#21513F] hover:bg-[#163A2D] text-white text-[11px] rounded transition-colors cursor-pointer"
                  >
                    Close Menu
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Global University Search Modal (Lazy Loaded on Demand) */}
      {isGlobalSearchOpen && (
        <Suspense fallback={null}>
          <GlobalSearchModal
            isOpen={isGlobalSearchOpen}
            onClose={() => setIsGlobalSearchOpen(false)}
            onOpenApplyModal={onOpenApplyModal}
            onOpenPortalModal={onOpenPortalModal}
            onOpenServiceModal={onOpenServiceModal}
          />
        </Suspense>
      )}
    </header>
  );
}
