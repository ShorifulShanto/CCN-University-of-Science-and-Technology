import React, { useState, useEffect, useMemo, useRef, useDeferredValue } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  Users,
  GraduationCap,
  Building,
  Award,
  ShieldCheck,
  Calendar,
  Layers,
  ArrowRight,
  Sparkles,
  Phone,
  FileText,
  CornerDownLeft,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Bus,
  Briefcase,
  HelpCircle,
} from 'lucide-react';
import { REAL_FACULTY_MEMBERS, RealFacultyMember } from '../data/ccnustRealData';
import { FACULTIES } from '../universityData';
import { ServiceModalTab } from './CCNUSTServicesModal';

export interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApplyModal?: (programId?: string) => void;
  onOpenPortalModal?: () => void;
  onOpenServiceModal?: (tab: ServiceModalTab) => void;
}

type SearchCategory = 'all' | 'faculty' | 'departments' | 'services' | 'campus';

interface SearchResultItem {
  id: string;
  category: 'faculty' | 'departments' | 'services' | 'campus';
  categoryLabel: string;
  title: string;
  subtitle: string;
  meta?: string;
  icon: React.ReactNode;
  imageUrl?: string;
  action: () => void;
}

export default function GlobalSearchModal({
  isOpen,
  onClose,
  onOpenApplyModal,
  onOpenPortalModal,
  onOpenServiceModal,
}: GlobalSearchModalProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Global keyboard shortcut (Cmd+K / Ctrl+K / Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Pre-compiled comprehensive searchable catalog
  const allSearchItems = useMemo<SearchResultItem[]>(() => {
    const items: SearchResultItem[] = [];

    // 1. Faculty Members (115 verified real teachers)
    REAL_FACULTY_MEMBERS.forEach((m) => {
      items.push({
        id: `fac-${m.id}`,
        category: 'faculty',
        categoryLabel: 'Faculty & Teachers',
        title: m.name,
        subtitle: `${m.designation} · ${m.department}`,
        meta: m.phone || m.email,
        imageUrl: m.imageUrl,
        icon: <Users className="w-4 h-4 text-emerald-400" />,
        action: () => {
          onClose();
          navigate(`/faculty?search=${encodeURIComponent(m.name)}`);
        },
      });
    });

    // 2. Academic Departments & Programs
    FACULTIES.forEach((fac) => {
      items.push({
        id: `fac-group-${fac.id}`,
        category: 'departments',
        categoryLabel: 'Academic Faculty',
        title: fac.name,
        subtitle: fac.description.slice(0, 85) + '...',
        meta: `${fac.departments.length} Departments`,
        icon: <GraduationCap className="w-4 h-4 text-[#FAD02C]" />,
        action: () => {
          onClose();
          navigate('/academics');
        },
      });

      fac.departments.forEach((dept) => {
        items.push({
          id: `dept-${dept.id}`,
          category: 'departments',
          categoryLabel: 'Degree Department',
          title: dept.name,
          subtitle: `Code: ${dept.code} · ${dept.programs.map((p) => p.name).join(', ')}`,
          meta: dept.contactEmail || dept.contactPhone,
          icon: <BookOpen className="w-4 h-4 text-blue-400" />,
          action: () => {
            onClose();
            navigate(`/academics?dept=${encodeURIComponent(dept.code)}`);
          },
        });

        dept.programs.forEach((prog) => {
          items.push({
            id: `prog-${prog.id}`,
            category: 'departments',
            categoryLabel: 'Academic Program',
            title: prog.name,
            subtitle: `${prog.level.toUpperCase()} Program · ${prog.totalCredits} Credits · Duration: ${prog.duration}`,
            meta: `Dept: ${dept.code}`,
            icon: <Award className="w-4 h-4 text-amber-400" />,
            action: () => {
              onClose();
              if (onOpenApplyModal) {
                onOpenApplyModal(prog.id);
              } else {
                navigate('/admissions');
              }
            },
          });
        });
      });
    });

    // 3. Official University Services & Portals
    const servicesList = [
      {
        id: 'svc-result',
        title: 'Semester Result Search',
        subtitle: 'Official UGC-compliant student semester GPA & CGPA lookup portal',
        meta: 'Examination Office',
        icon: <Award className="w-4 h-4 text-purple-400" />,
        action: () => {
          onClose();
          if (onOpenServiceModal) onOpenServiceModal('result');
          else navigate('/services');
        },
      },
      {
        id: 'svc-verify',
        title: 'Student & Certificate Verification',
        subtitle: 'Employer and institutional graduate credential validation service',
        meta: 'Registrar Office',
        icon: <ShieldCheck className="w-4 h-4 text-rose-400" />,
        action: () => {
          onClose();
          if (onOpenServiceModal) onOpenServiceModal('verification');
          else navigate('/services');
        },
      },
      {
        id: 'svc-routine',
        title: 'All Routine (Class & Examination)',
        subtitle: 'Live schedules, midterm/final timetables, and room allocations',
        meta: 'Academic Scheduling',
        icon: <Calendar className="w-4 h-4 text-amber-400" />,
        action: () => {
          onClose();
          if (onOpenServiceModal) onOpenServiceModal('routine');
          else navigate('/services');
        },
      },
      {
        id: 'svc-convocation',
        title: 'Convocation Registration & Alumni',
        subtitle: 'Graduation gowns, degree conferment ceremonies, and alumni network',
        meta: 'Convocation Cell',
        icon: <GraduationCap className="w-4 h-4 text-blue-400" />,
        action: () => {
          onClose();
          if (onOpenServiceModal) onOpenServiceModal('convocation');
          else navigate('/services');
        },
      },
      {
        id: 'svc-carnival',
        title: 'Diploma Engineers Carnival',
        subtitle: 'Special credit transfers and 20%-50% tuition waiver for diploma graduates',
        meta: 'Admissions Office',
        icon: <Layers className="w-4 h-4 text-emerald-400" />,
        action: () => {
          onClose();
          if (onOpenServiceModal) onOpenServiceModal('carnival');
          else navigate('/services');
        },
      },
      {
        id: 'svc-apply',
        title: 'Online Admission Application',
        subtitle: 'Fall 2026 undergraduate & postgraduate enrollment submission form',
        meta: 'Admissions Hotline: 01715-451599',
        icon: <Sparkles className="w-4 h-4 text-[#FAD02C]" />,
        action: () => {
          onClose();
          if (onOpenApplyModal) onOpenApplyModal();
          else navigate('/admissions');
        },
      },
      {
        id: 'svc-portal',
        title: 'Student & Faculty Portal Login',
        subtitle: 'Access student records, course attendance, faculty grading, and admin consoles',
        meta: 'Auth System',
        icon: <Users className="w-4 h-4 text-teal-400" />,
        action: () => {
          onClose();
          if (onOpenPortalModal) onOpenPortalModal();
          else navigate('/services');
        },
      },
      {
        id: 'svc-fees',
        title: 'Tuition Fee & Scholarship Calculator',
        subtitle: 'Calculate semester breakdown and merit scholarship waivers up to 100%',
        meta: 'Accounts & Finance',
        icon: <FileText className="w-4 h-4 text-cyan-400" />,
        action: () => {
          onClose();
          navigate('/admissions');
        },
      },
      {
        id: 'svc-admin-offices',
        title: 'Administrative Offices (12 Directory)',
        subtitle: 'VC Office, Registrar, Controller, Proctor, Accounts, Library, and IT Wing',
        meta: 'Campus Directory',
        icon: <Building className="w-4 h-4 text-[#FAD02C]" />,
        action: () => {
          onClose();
          navigate('/services');
        },
      },
      {
        id: 'svc-contact',
        title: 'Campus Contact, Helplines & Location',
        subtitle: 'Kotbari, Cumilla campus address, phone hotlines, and maps',
        meta: '01715-451599 / 01888-042667',
        icon: <Phone className="w-4 h-4 text-green-400" />,
        action: () => {
          onClose();
          navigate('/about');
        },
      },
      {
        id: 'svc-authorities',
        title: 'Higher Authorities & Statutory Governance',
        subtitle: 'Chancellor, Chairman BoT, Vice Chancellor, Registrar, BoT, and Syndicate',
        meta: 'UGC Governance',
        icon: <ShieldCheck className="w-4 h-4 text-[#FAD02C]" />,
        action: () => {
          onClose();
          navigate('/authorities');
        },
      },
      {
        id: 'svc-journal',
        title: 'CCN Journal of Science and Technology (CCNJST)',
        subtitle: 'Peer-reviewed research articles, ISSN 2709-183X, open-access paper downloads',
        meta: 'Research Wing (CHSR)',
        icon: <BookOpen className="w-4 h-4 text-blue-400" />,
        action: () => {
          onClose();
          navigate('/research-journal');
        },
      },
      {
        id: 'svc-downloads',
        title: 'Official Forms & Downloads Center',
        subtitle: 'Transcript applications, clearance forms, waiver renewals, provisional degree',
        meta: 'Printable PDF Forms',
        icon: <FileText className="w-4 h-4 text-amber-400" />,
        action: () => {
          onClose();
          navigate('/downloads');
        },
      },
      {
        id: 'svc-transport',
        title: 'Campus Transport & Shuttle Bus Schedules',
        subtitle: 'Kandirpar, Jangalia, Paduar Bazar, Sasongachha daily student routes & driver contacts',
        meta: 'Transport Depot',
        icon: <Bus className="w-4 h-4 text-emerald-400" />,
        action: () => {
          onClose();
          navigate('/transport');
        },
      },
      {
        id: 'svc-alumni',
        title: 'CCNUST Alumni Association & Network',
        subtitle: '6,500+ global graduates, alumni directory, mentorship program, and reunion',
        meta: 'Alumni Cell',
        icon: <Users className="w-4 h-4 text-purple-400" />,
        action: () => {
          onClose();
          navigate('/alumni');
        },
      },
      {
        id: 'svc-placement',
        title: 'Career Placement & Corporate Internships',
        subtitle: 'Job openings at bKash, Brain Station, Robi, Walton, recruitment fairs',
        meta: 'Industry Linkage',
        icon: <Briefcase className="w-4 h-4 text-[#FAD02C]" />,
        action: () => {
          onClose();
          navigate('/career-placement');
        },
      },
      {
        id: 'svc-user-manual',
        title: 'Website & Portal User Manual (Help Guide)',
        subtitle: 'Step-by-step instructions for admissions, portals, services, downloads, transport, gallery & admin',
        meta: 'Help Center',
        icon: <HelpCircle className="w-4 h-4 text-[#FAD02C]" />,
        action: () => {
          onClose();
          navigate('/user-manual');
        },
      },
    ];

    servicesList.forEach((s) => {
      items.push({
        id: s.id,
        category: 'services',
        categoryLabel: 'University Service',
        title: s.title,
        subtitle: s.subtitle,
        meta: s.meta,
        icon: s.icon,
        action: s.action,
      });
    });

    // 4. Campus Life & Activities
    const campusItems = [
      {
        id: 'act-gallery',
        title: 'Campus Gallery & Activity Archives',
        subtitle: 'High-resolution photographs of student life, events, and academic rallies',
        meta: 'Official Media',
        action: () => {
          onClose();
          navigate('/gallery-activities');
        },
      },
      {
        id: 'act-orientation',
        title: 'Freshers Orientation & Induction Ceremony',
        subtitle: 'Welcoming incoming batches with academic briefings and OBE guidelines',
        meta: 'Campus Event',
        action: () => {
          onClose();
          navigate('/gallery-activities');
        },
      },
      {
        id: 'act-foundation',
        title: 'University Foundation Day (Protistha Barshiki)',
        subtitle: 'Annual university founding celebrations, alumni rally, and cultural gala',
        meta: 'Institutional Celebration',
        action: () => {
          onClose();
          navigate('/gallery-activities');
        },
      },
      {
        id: 'act-seminar',
        title: 'Research Seminars & Symposiums',
        subtitle: 'IEEE student conferences, technical workshops, and academic paper sessions',
        meta: 'Research Division',
        action: () => {
          onClose();
          navigate('/gallery-activities');
        },
      },
      {
        id: 'act-mou',
        title: 'International MoUs & Academic Partnerships',
        subtitle: 'Bilateral exchange agreements with global universities and corporate tech giants',
        meta: 'Global Affiliations',
        action: () => {
          onClose();
          navigate('/gallery-activities');
        },
      },
      {
        id: 'act-leadership',
        title: 'Board of Trustees & University Leadership',
        subtitle: 'Meet the Chairman, Vice Chancellor, Deans, and Executive Administration',
        meta: 'About CCNUST',
        action: () => {
          onClose();
          navigate('/about');
        },
      },
    ];

    campusItems.forEach((c) => {
      items.push({
        id: c.id,
        category: 'campus',
        categoryLabel: 'Campus Life & Media',
        title: c.title,
        subtitle: c.subtitle,
        meta: c.meta,
        icon: <Users className="w-4 h-4 text-pink-400" />,
        action: c.action,
      });
    });

    return items;
  }, [navigate, onClose, onOpenApplyModal, onOpenPortalModal, onOpenServiceModal]);

  // High-performance search filtering with match scoring & deferred input
  const filteredResults = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    let pool = allSearchItems;

    if (activeCategory !== 'all') {
      pool = pool.filter((item) => item.category === activeCategory);
    }

    if (!q) {
      // Default curated recommendations when empty
      return pool.slice(0, 16);
    }

    const matched = pool
      .map((item) => {
        let score = 0;
        const titleLower = item.title.toLowerCase();
        const subtitleLower = item.subtitle.toLowerCase();
        const metaLower = (item.meta || '').toLowerCase();

        if (titleLower === q) score += 100;
        else if (titleLower.startsWith(q)) score += 50;
        else if (titleLower.includes(q)) score += 30;

        if (subtitleLower.includes(q)) score += 15;
        if (metaLower.includes(q)) score += 10;

        return { item, score };
      })
      .filter((res) => res.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((res) => res.item);

    return matched.slice(0, 28);
  }, [allSearchItems, deferredQuery, activeCategory]);

  // Keep selected index within bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredResults]);

  // Keyboard navigation through search results
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredResults.length - 1 ? prev + 1 : 0));
      scrollActiveIntoView(selectedIndex + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredResults.length - 1));
      scrollActiveIntoView(selectedIndex - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        filteredResults[selectedIndex].action();
      }
    }
  };

  const scrollActiveIntoView = (index: number) => {
    const container = resultsContainerRef.current;
    if (!container) return;
    const items = container.querySelectorAll('[data-search-item]');
    if (items[index]) {
      items[index].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  };

  if (!isOpen) return null;

  const quickPills = [
    { label: 'Vice Chancellor', term: 'Vice Chancellor' },
    { label: 'CSE Faculty', term: 'Computer Science' },
    { label: 'Semester Result', term: 'Result' },
    { label: 'Exam Routine', term: 'Routine' },
    { label: 'Student Verification', term: 'Verification' },
    { label: 'Admissions 2026', term: 'Admission' },
    { label: 'Tuition Fees', term: 'Tuition' },
    { label: 'Law Faculty', term: 'Law' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-md transition-opacity animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        className="relative w-full max-w-2xl bg-[#0F281E]/80 backdrop-blur-xl border-2 border-[#21513F]/50 text-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150 z-10"
        onKeyDown={handleKeyDown}
      >
        {/* Top Search Input Bar with Uiverse.io Wave Animation - Reduced Opacity Green */}
        <div className="flex items-center px-4 pt-4 pb-3 border-b border-[#21513F]/40 bg-[#163A2D]/35 backdrop-blur-md">
          <Search className="w-5 h-5 text-[#FAD02C] shrink-0 mr-3 mt-1" />
          <div className="wave-group wave-group--modal flex-1 relative">
            <input
              ref={inputRef}
              required
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input w-full"
              aria-label="Search query"
            />
            <span className="bar"></span>
            <label className="label">
              {'Search...'.split('').map((char, index) => (
                <span
                  key={index}
                  className="label-char"
                  style={{ ['--index' as any]: index }}
                >
                  {char}
                </span>
              ))}
            </label>
          </div>
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 rounded-md text-[#A3C7B5] hover:text-white hover:bg-[#21513F]/50 transition-colors mr-2 cursor-pointer"
              title="Clear input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#0F281E]/60 text-[#A3C7B5] hover:text-white hover:bg-[#21513F]/60 border border-[#21513F]/50 transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Tabs Filter Bar */}
        <div className="flex items-center px-3 py-2 bg-[#0C2219]/50 backdrop-blur-sm border-b border-[#21513F]/40 gap-1.5 overflow-x-auto text-xs font-mono scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1 rounded-lg transition-all shrink-0 cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#FAD02C] text-[#163A2D] font-bold shadow-xs'
                : 'text-[#A3C7B5] hover:bg-[#163A2D]/60 hover:text-white'
            }`}
          >
            All Results
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('faculty')}
            className={`px-3 py-1 rounded-lg transition-all shrink-0 cursor-pointer flex items-center space-x-1.5 ${
              activeCategory === 'faculty'
                ? 'bg-[#FAD02C] text-[#163A2D] font-bold shadow-xs'
                : 'text-[#A3C7B5] hover:bg-[#163A2D] hover:text-white'
            }`}
          >
            <Users className="w-3 h-3" />
            <span>Faculty (115)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('departments')}
            className={`px-3 py-1 rounded-lg transition-all shrink-0 cursor-pointer flex items-center space-x-1.5 ${
              activeCategory === 'departments'
                ? 'bg-[#FAD02C] text-[#163A2D] font-bold shadow-xs'
                : 'text-[#A3C7B5] hover:bg-[#163A2D] hover:text-white'
            }`}
          >
            <GraduationCap className="w-3 h-3" />
            <span>Departments & Programs</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('services')}
            className={`px-3 py-1 rounded-lg transition-all shrink-0 cursor-pointer flex items-center space-x-1.5 ${
              activeCategory === 'services'
                ? 'bg-[#FAD02C] text-[#163A2D] font-bold shadow-xs'
                : 'text-[#A3C7B5] hover:bg-[#163A2D] hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3 h-3" />
            <span>Services & Portals</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('campus')}
            className={`px-3 py-1 rounded-lg transition-all shrink-0 cursor-pointer flex items-center space-x-1.5 ${
              activeCategory === 'campus'
                ? 'bg-[#FAD02C] text-[#163A2D] font-bold shadow-xs'
                : 'text-[#A3C7B5] hover:bg-[#163A2D] hover:text-white'
            }`}
          >
            <Building className="w-3 h-3" />
            <span>Campus Life</span>
          </button>
        </div>

        {/* Quick Search Suggestions when empty */}
        {!query && (
          <div className="px-4 py-2.5 bg-[#0F281E]/40 border-b border-[#21513F]/30 flex items-center gap-1.5 flex-wrap text-[11px] font-mono">
            <span className="text-[#A3C7B5] mr-1">Popular:</span>
            {quickPills.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setQuery(p.term)}
                className="px-2 py-0.5 rounded bg-[#163A2D]/60 hover:bg-[#21513F]/60 text-[#D0E4DA] hover:text-[#FAD02C] border border-[#21513F]/40 transition-colors cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>
        )}

        {/* Search Results List */}
        <div
          ref={resultsContainerRef}
          className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-1.5 max-h-[50vh] focus:outline-none"
        >
          {filteredResults.length === 0 ? (
            <div className="text-center py-12 px-4 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#163A2D]/40 border border-[#21513F]/50 flex items-center justify-center text-[#A3C7B5]">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="font-sans font-bold text-white text-base">
                No matching university records found
              </h4>
              <p className="text-xs text-[#A3C7B5] max-w-sm mx-auto font-mono">
                Try searching by teacher name (e.g. &ldquo;Tariqul&rdquo;, &ldquo;Saiful&rdquo;), department code (&ldquo;CSE&rdquo;, &ldquo;EEE&rdquo;, &ldquo;LAW&rdquo;), or service (&ldquo;Result&rdquo;, &ldquo;Routine&rdquo;).
              </p>
            </div>
          ) : (
            filteredResults.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  data-search-item
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-[#163A2D]/70 border border-[#FAD02C]/60 shadow-md translate-x-0.5'
                      : 'hover:bg-[#163A2D]/35 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0 pr-2">
                    {/* Thumbnail Image or Icon */}
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-10 h-10 rounded-lg object-cover border border-[#21513F]/50 shrink-0 bg-[#0C2219]/60"
                        onError={(e) => {
                          // Clean fallback
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-[#0C2219]/60 border border-[#21513F]/50 flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                    )}

                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-sans font-bold text-sm text-white truncate">
                          {item.title}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#0F281E]/80 border border-[#21513F]/50 text-[#FAD02C] font-semibold shrink-0">
                          {item.categoryLabel}
                        </span>
                      </div>
                      <p className="text-xs text-[#A3C7B5] font-mono truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    {item.meta && (
                      <span className="hidden sm:inline-block text-[11px] font-mono text-[#D0E4DA]/70 max-w-[120px] truncate text-right">
                        {item.meta}
                      </span>
                    )}
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-[#FAD02C] text-[#163A2D]' : 'text-[#A3C7B5]'
                      }`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Bottom Keyboard Shortcuts Helper */}
        <div className="px-4 py-2.5 bg-[#0C2219]/60 backdrop-blur-sm border-t border-[#21513F]/40 flex items-center justify-between text-[11px] font-mono text-[#A3C7B5]">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 bg-[#163A2D] rounded border border-[#21513F] text-white">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 bg-[#163A2D] rounded border border-[#21513F] text-white">
                ↓
              </kbd>
              <span>to navigate</span>
            </span>
            <span className="hidden sm:inline-flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 bg-[#163A2D] rounded border border-[#21513F] text-white flex items-center">
                <CornerDownLeft className="w-3 h-3" />
              </kbd>
              <span>to select</span>
            </span>
          </div>

          <div className="text-right">
            <span>
              Showing <strong className="text-[#FAD02C]">{filteredResults.length}</strong> items
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
