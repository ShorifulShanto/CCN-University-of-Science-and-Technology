import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Search,
  X,
  Printer,
  Compass,
  GraduationCap,
  Award,
  UserCheck,
  ShieldCheck,
  Bus,
  Image as ImageIcon,
  Settings,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  HelpCircle,
  Sparkles,
  Keyboard,
} from 'lucide-react';
import SectionAtmosphere from '../components/SectionAtmosphere';
import SecondaryPageHeader from '../components/SecondaryPageHeader';
import { ServiceModalTab } from '../components/CCNUSTServicesModal';

interface UserManualPageProps {
  onOpenApplyModal?: () => void;
  onOpenPortalModal?: () => void;
  onOpenServiceModal?: (tab: ServiceModalTab) => void;
}

type RoleFilter =
  | 'all'
  | 'applicants'
  | 'students'
  | 'faculty'
  | 'admins'
  | 'visitors';

interface ManualAction {
  label: string;
  to?: string;
  onClick?: () => void;
  primary?: boolean;
}

interface ManualChapter {
  id: string;
  number: string;
  title: string;
  summary: string;
  roles: Exclude<RoleFilter, 'all'>[];
  audienceLabel: string;
  icon: React.ReactNode;
  steps: {
    heading: string;
    detail: string;
  }[];
  tips: string[];
  keywords: string[];
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  roles: Exclude<RoleFilter, 'all'>[];
}

const ROLE_TABS: { id: RoleFilter; label: string }[] = [
  { id: 'all', label: 'All Guides' },
  { id: 'applicants', label: 'Applicants' },
  { id: 'students', label: 'Current Students' },
  { id: 'faculty', label: 'Faculty & Staff' },
  { id: 'admins', label: 'Administrators' },
  { id: 'visitors', label: 'Visitors & General' },
];

const MANUAL_CHAPTERS: ManualChapter[] = [
  {
    id: 'navigation-search',
    number: '01',
    title: 'Site Navigation & Global Quick Search',
    summary:
      'Move effortlessly across the CCNUST website, open the categorized navigation drawer, or jump straight to any teacher, program, office, or service using instant keyboard search.',
    roles: ['visitors', 'applicants', 'students', 'faculty', 'admins'],
    audienceLabel: 'All Visitors · Desktop & Mobile',
    icon: <Compass className="w-5 h-5 text-[#163A2D]" />,
    steps: [
      {
        heading: 'Use the Top Executive Header & Utility Strip',
        detail:
          'On the home page, the upper utility strip links directly to Higher Authorities, the CCNJST Research Journal, Official Forms & Downloads, and Campus Bus Schedules. The main green bar provides quick Search, Portal Login / Sign Up, and the full navigation menu button.',
      },
      {
        heading: 'Open the Categorized Navigation Drawer',
        detail:
          'Click the menu button at the top-right corner of the home page to open the 4-column directory covering About & Contact, Academics & Faculties, Admissions & Aid, and University Services.',
      },
      {
        heading: 'Launch Instant Search Anywhere (⌘K or /)',
        detail:
          'Click the magnifying glass icon in the navbar or press Ctrl+K (Cmd+K on Mac) or the forward-slash (/) key. Type any faculty member name, department code (such as CSE, EEE, LAW, or BBA), or university service, then use Up/Down arrows and Enter to jump straight to that record.',
      },
      {
        heading: 'Return Home from Secondary Pages',
        detail:
          'Every sub-page includes a sticky white breadcrumb bar at the top with a Back/Home button and quick Apply Online trigger so you never lose your place.',
      },
    ],
    tips: [
      'Keyboard tip: Press Esc at any time to close the Global Search dialog, navigation drawer, or gallery lightbox.',
      'On narrow mobile screens, scroll horizontally inside filter strips or open the drawer menu to reach every university portal in one tap.',
    ],
    keywords: ['menu', 'drawer', 'search', 'shortcut', 'ctrl+k', 'cmd+k', 'navigation', 'breadcrumbs'],
  },
  {
    id: 'admissions-scholarships',
    number: '02',
    title: 'Online Admissions & Scholarship Estimator',
    summary:
      'Check Fall 2026 entry requirements, calculate semester tuition alongside merit or diploma waivers, and submit an online admission application with an instant tracking number.',
    roles: ['applicants', 'visitors'],
    audienceLabel: 'Prospective Students · Guardians',
    icon: <GraduationCap className="w-5 h-5 text-[#163A2D]" />,
    steps: [
      {
        heading: 'Explore Programs & Eligibility',
        detail:
          'Open the Admissions & Aid page from the home hero or navigation menu to review SSC/HSC/Diploma GPA minimums and required enclosures for undergraduate and postgraduate degrees.',
      },
      {
        heading: 'Calculate Tuition & Up to 100% Merit Waivers',
        detail:
          'Use the built-in Tuition Fee & Scholarship Calculator to select your intended program and enter your academic scores or Diploma background. The estimator updates semester installments and scholarship percentage automatically.',
      },
      {
        heading: 'Submit the Online Application Form',
        detail:
          'Click Apply Now / Apply Online from any page header or admissions banner. Complete your personal details, academic records, and program choice, then submit to generate your official tracking reference.',
      },
      {
        heading: 'Save Your Tracking Reference',
        detail:
          'Record the tracking number displayed on confirmation. The Admissions Office reviews submitted forms from the "Received" state and contacts applicants via the registered phone number or email.',
      },
    ],
    tips: [
      'Diploma engineers qualify for dedicated credit-transfer pathways and 20%–50% tuition waivers under the Diploma Engineers Carnival.',
      'Need direct counseling? Call the Admissions Helpline at 01715-451599 or 01888-042667 during campus office hours.',
    ],
    keywords: ['admission', 'apply', 'fall 2026', 'scholarship', 'waiver', 'tuition', 'fee', 'calculator', 'tracking'],
  },
  {
    id: 'academics-research',
    number: '03',
    title: 'Academic Faculties, Curricula & Research Journal',
    summary:
      'Browse CCNUST’s four academic faculties, nine-plus degree departments, Outcome-Based Education (OBE) credit outlines, and peer-reviewed publications in CCNJST.',
    roles: ['applicants', 'students', 'faculty', 'visitors'],
    audienceLabel: 'Academic Explorers · Researchers',
    icon: <BookOpen className="w-5 h-5 text-[#163A2D]" />,
    steps: [
      {
        heading: 'Inspect Faculties & Degree Tracks',
        detail:
          'Visit the Academics page to filter departments across Engineering, Science, Business Administration, Law, and Humanities. Expand any department to check total credits, program duration, and department contact lines.',
      },
      {
        heading: 'Review Program Details & Course Structure',
        detail:
          'Click any degree card on the home page or Academics portal to inspect OBE learning tracks, career outcomes, and direct "Apply for This Program" shortcuts.',
      },
      {
        heading: 'Read & Search CCNJST Research Papers',
        detail:
          'Open the CCN Journal of Science and Technology (ISSN 2709-183X) page to read published engineering, applied science, and interdisciplinary research papers archived by the Center for Higher Studies & Research.',
      },
    ],
    tips: [
      'You can jump straight to a department by typing its short code (e.g., CSE, EEE, BBA, LLB) inside Global Search.',
    ],
    keywords: ['faculty', 'department', 'curriculum', 'obe', 'credits', 'journal', 'ccnjst', 'research', 'issn', 'degree'],
  },
  {
    id: 'portals-id-cards',
    number: '04',
    title: 'University Portals, Sign-In & Official ID Cards',
    summary:
      'Access Student, Faculty, and Exam Portals via Login / Sign Up, update account credentials securely, and inspect the official campus ID card showcase.',
    roles: ['students', 'faculty', 'admins'],
    audienceLabel: 'Students · Teachers · Officers',
    icon: <UserCheck className="w-5 h-5 text-[#163A2D]" />,
    steps: [
      {
        heading: 'Open the Portal Login / Sign Up Dialog',
        detail:
          'Click Login / Sign Up in the home navigation bar (or Portals Login in the footer). Select your role tab — Student, Faculty, or Admin — and enter your institutional ID or registered email.',
      },
      {
        heading: 'Register or Update Your Password',
        detail:
          'New students or faculty can create an account or sign in with provisioned credentials. Inside your portal dashboard, use the password update tool to set a personal password and keep your contact details current.',
      },
      {
        heading: 'Browse the Official ID Card Showcase',
        detail:
          'On the home page, scroll to the Official University ID Cards section (or jump via #id-cards). Use the interactive modal controls to switch between the Teachers & Staff ID cards (Executive Leadership & Department Faculty) and the 4-Year Student ID cards organized by academic year.',
      },
    ],
    tips: [
      'Never share your portal password with third parties. If your account needs approval or a password reset, contact the Chief System Administrator or Registrar Desk.',
    ],
    keywords: ['portal', 'login', 'sign up', 'password', 'dashboard', 'id card', 'lanyard', 'student id', 'faculty id'],
  },
  {
    id: 'services-verification',
    number: '05',
    title: 'Academic Services, Routines & Verification',
    summary:
      'Look up semester GPA/CGPA results, verify graduate certificates, download class and exam routines, register for convocation, or contact all 12 Administrative Offices.',
    roles: ['students', 'faculty', 'visitors', 'applicants'],
    audienceLabel: 'Students · Employers · Alumni',
    icon: <Award className="w-5 h-5 text-[#163A2D]" />,
    steps: [
      {
        heading: 'Open CCNUST Services & Select a Tool Tab',
        detail:
          'Navigate to the Services page or pick a specific tool directly from the footer or navigation drawer (Result Search, Student Verification, All Routine, Convocation, Carnival, or Offices).',
      },
      {
        heading: 'Search Semester Results & Verify Credentials',
        detail:
          'Enter the student roll/ID in Semester Result Search for UGC-compliant grade summaries, or use Student & Certificate Verification to confirm degree authenticity for employers and institutions.',
      },
      {
        heading: 'Check Class & Exam Routines',
        detail:
          'Switch to All Routine (Class & Exam) to inspect current midterm, final, and regular semester room schedules across departments.',
      },
      {
        heading: 'Contact the 12 Administrative Offices',
        detail:
          'Open Administrative Offices to view direct extensions and office responsibilities for the VC Office, Registrar, Controller of Examinations, Proctor, Accounts, Central Library, and IT Wing.',
      },
    ],
    tips: [
      'Official transcript and provisional certificate applications must pair with printable clearance forms found in the Downloads Center.',
    ],
    keywords: ['result', 'cgpa', 'gpa', 'verification', 'certificate', 'routine', 'exam', 'convocation', 'offices', 'registrar'],
  },
  {
    id: 'downloads-transport-directories',
    number: '06',
    title: 'Downloads, Bus Transport & Campus Directories',
    summary:
      'Generate printable university forms, check daily Cumilla campus bus shuttle departure schedules, explore faculty profiles (115+), alumni, career placements, and campus helplines.',
    roles: ['students', 'faculty', 'visitors', 'applicants'],
    audienceLabel: 'Daily Commuters · Campus Community',
    icon: <Bus className="w-5 h-5 text-[#163A2D]" />,
    steps: [
      {
        heading: 'Download Official University Forms',
        detail:
          'Go to Official Forms & Downloads, filter by Examination, Registrar, Accounts, or Library & Clearance, preview required attachments and processing fees, and generate a ready-to-print form.',
      },
      {
        heading: 'Check Cumilla Shuttle Bus Schedules',
        detail:
          'Open Campus Transport & Bus Schedules to inspect departure times, pickup stops, and driver contact details for Kandirpar, Jangalia, Paduar Bazar, and Sasongachha routes to and from Kotbari.',
      },
      {
        heading: 'Search the 115+ Faculty & Governance Directories',
        detail:
          'Visit Faculty Directory to filter teachers by department or search by name/designation. Visit Higher Authorities to review the Board of Trustees, Vice Chancellor, Registrar, and Syndicate.',
      },
      {
        heading: 'Reach Alumni, Career Placement & Campus Contact',
        detail:
          'Explore Career Placement for corporate internship & job listings, Alumni Association to connect with 6,500+ graduates, and About & Contact for Kotbari campus maps and direct inquiry submission.',
      },
    ],
    tips: [
      'Arrive at city shuttle pickup points at least 10 minutes before scheduled departure; student ID cards must be carried on campus buses.',
    ],
    keywords: ['download', 'form', 'pdf', 'bus', 'transport', 'shuttle', 'kandirpar', 'kotbari', 'faculty', 'alumni', 'career', 'job', 'contact'],
  },
  {
    id: 'gallery-lightbox',
    number: '07',
    title: 'Campus Photo Gallery & Activity Archives',
    summary:
      'Browse 90+ curated Kotbari hill campus photographs alongside official event albums, filter by topic category, and navigate fullscreen lightbox previews.',
    roles: ['visitors', 'applicants', 'students', 'faculty'],
    audienceLabel: 'Prospective Visitors · Media',
    icon: <ImageIcon className="w-5 h-5 text-[#163A2D]" />,
    steps: [
      {
        heading: 'Switch Between Archives & Official Albums',
        detail:
          'Visit the Campus Gallery & Activities page. Toggle between All Collections, Campus Photographs (curated Kotbari hill scenes), and Official Activity Albums.',
      },
      {
        heading: 'Filter by Campus Theme',
        detail:
          'Select any category tab — such as Campus & Architecture, Transport & Student Life, Library & Academic, Events & Seminars, Cultural & Murals, or Sports & Games — to narrow the photo grid instantly.',
      },
      {
        heading: 'Open Fullscreen Lightbox View',
        detail:
          'Click any photograph to expand it full screen with caption details. Use the left/right arrow keys on your keyboard or on-screen buttons to step through the entire collection.',
      },
    ],
    tips: [
      'Authorized site administrators can upload new campus photographs or manage existing captions directly inside the Admin Cockpit.',
    ],
    keywords: ['gallery', 'photo', 'image', 'lightbox', 'campus', 'kotbari', 'events', 'activities', 'album'],
  },
  {
    id: 'admin-cockpit',
    number: '08',
    title: 'Administrator Cockpit & Cloud CMS Guide',
    summary:
      'Authorized university administrators can sign in via Google Admin SSO to publish live Notices, manage Gallery media, review Portal Users, inspect Admissions & Inquiries, and sync baseline records.',
    roles: ['admins'],
    audienceLabel: 'Authorized System Administrators',
    icon: <Settings className="w-5 h-5 text-[#163A2D]" />,
    steps: [
      {
        heading: 'Sign In with Authorized Google SSO',
        detail:
          'Open Login / Sign Up, choose the Admin tab, and click Sign in with Google using the authorized institutional administrator Google account. Allow the sign-in popup if prompted by your browser.',
      },
      {
        heading: 'Launch the Admin Cockpit',
        detail:
          'Once signed in as an administrator, click the floating "Open Admin Cockpit" button in the bottom-right corner or the Admin button in the top navigation bar.',
      },
      {
        heading: 'Publish Notices, Events & Gallery Media',
        detail:
          'Use the Notices & Events tab to create urgent circulars or campus announcements, and the Gallery Media tab to add high-resolution campus images with title, date, and category metadata.',
      },
      {
        heading: 'Review Admissions, Inquiries & Portal Accounts',
        detail:
          'Inspect incoming Fall 2026 applications and public contact inquiries in real time, approve or update portal user statuses, and run "Sync Baseline to Firestore" whenever refreshing baseline institutional data.',
      },
    ],
    tips: [
      'Always click "Sign Out" after finishing administrative work on a shared campus workstation.',
      'Keep photo uploads under recommended web sizes and ensure duplicate campus gallery items are not re-added.',
    ],
    keywords: ['admin', 'cockpit', 'cms', 'firestore', 'google', 'sso', 'notice', 'upload', 'sync', 'moderation'],
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-google-popup',
    question: 'Why did the Admin "Sign in with Google" window fail to open?',
    answer:
      'Modern browsers sometimes block sign-in popups on first click. Check your browser address bar for a blocked-popup icon, allow popups for this site, and click Sign in with Google again using the authorized administrator Google account.',
    roles: ['admins'],
  },
  {
    id: 'faq-tracking-id',
    question: 'What should I do after submitting an Online Admission Application?',
    answer:
      'Save or screenshot the Tracking Number displayed on the confirmation screen. The Admissions Office receives applications immediately and reaches out via your submitted mobile number or email for document verification and enrollment.',
    roles: ['applicants'],
  },
  {
    id: 'faq-download-forms',
    question: 'How do I print or save a university form from the Downloads Center?',
    answer:
      'Open the Downloads page, locate your form (e.g. Provisional Certificate, Transcript, or Clearance), click Preview / Download, fill or review the fields, and use the Print / Save as PDF option in your browser print dialog.',
    roles: ['students', 'visitors'],
  },
  {
    id: 'faq-search-shortcut',
    question: 'How can I find a specific faculty member or course quickly without scrolling?',
    answer:
      'Press Ctrl+K (Cmd+K on Mac) or forward-slash (/) on the home page, or click the magnifying glass button in the top bar. You can search across 115+ teachers, all departments, and every university service instantaneously.',
    roles: ['visitors', 'applicants', 'students', 'faculty'],
  },
  {
    id: 'faq-bus-schedule',
    question: 'Where do CCNUST student buses depart in Cumilla city?',
    answer:
      'Campus shuttles operate along four primary Cumilla corridors: Kandirpar, Jangalia, Paduar Bazar, and Sasongachha. Visit the Campus Transport page for exact morning pickup timings, return trips from Kotbari, and driver contact numbers.',
    roles: ['students', 'faculty', 'visitors'],
  },
  {
    id: 'faq-print-manual',
    question: 'Can I keep an offline copy of this User Manual?',
    answer:
      'Yes. Click the "Print / Save PDF" button at the top of this page to print a clean reading layout or save it directly as a PDF document on your computer or phone.',
    roles: ['visitors', 'applicants', 'students', 'faculty', 'admins'],
  },
];

export default function UserManualPage({
  onOpenApplyModal,
  onOpenPortalModal,
  onOpenServiceModal,
}: UserManualPageProps) {
  const [selectedRole, setSelectedRole] = useState<RoleFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChapterId, setActiveChapterId] = useState<string>('navigation-search');
  const [openFaqIds, setOpenFaqIds] = useState<string[]>(['faq-google-popup', 'faq-search-shortcut']);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const visibleChapters = useMemo(() => {
    return MANUAL_CHAPTERS.filter((chapter) => {
      const matchesRole = selectedRole === 'all' || chapter.roles.includes(selectedRole);
      if (!matchesRole) return false;
      if (!normalizedQuery) return true;

      const haystack = [
        chapter.number,
        chapter.title,
        chapter.summary,
        chapter.audienceLabel,
        ...chapter.keywords,
        ...chapter.steps.map((s) => `${s.heading} ${s.detail}`),
        ...chapter.tips,
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [selectedRole, normalizedQuery]);

  const visibleFaqs = useMemo(() => {
    return FAQ_ITEMS.filter((faq) => {
      const matchesRole = selectedRole === 'all' || faq.roles.includes(selectedRole);
      if (!matchesRole) return false;
      if (!normalizedQuery) return true;
      return `${faq.question} ${faq.answer}`.toLowerCase().includes(normalizedQuery);
    });
  }, [selectedRole, normalizedQuery]);

  const toggleFaq = (faqId: string) => {
    setOpenFaqIds((prev) =>
      prev.includes(faqId) ? prev.filter((id) => id !== faqId) : [...prev, faqId]
    );
  };

  const jumpToChapter = (chapterId: string) => {
    setActiveChapterId(chapterId);
    const target = document.getElementById(`manual-chapter-${chapterId}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getChapterActions = (chapterId: string): ManualAction[] => {
    switch (chapterId) {
      case 'navigation-search':
        return [
          { label: 'Return to Home Page', to: '/', primary: true },
          { label: 'About & Campus Map', to: '/about' },
        ];
      case 'admissions-scholarships':
        return [
          ...(onOpenApplyModal
            ? [{ label: 'Open Online Application', onClick: onOpenApplyModal, primary: true }]
            : []),
          { label: 'Admissions & Fee Calculator', to: '/admissions' },
        ];
      case 'academics-research':
        return [
          { label: 'Browse Faculties & Degrees', to: '/academics', primary: true },
          { label: 'CCNJST Research Journal', to: '/research-journal' },
        ];
      case 'portals-id-cards':
        return [
          ...(onOpenPortalModal
            ? [{ label: 'Open Login / Sign Up Portal', onClick: onOpenPortalModal, primary: true }]
            : []),
          { label: 'View ID Cards Showcase', to: '/#id-cards' },
        ];
      case 'services-verification':
        return [
          ...(onOpenServiceModal
            ? [
                {
                  label: 'Result Search Tool',
                  onClick: () => onOpenServiceModal('result'),
                  primary: true,
                },
                {
                  label: 'Student Verification',
                  onClick: () => onOpenServiceModal('verification'),
                },
              ]
            : []),
          { label: 'All Services & 12 Offices', to: '/services' },
        ];
      case 'downloads-transport-directories':
        return [
          { label: 'Forms & Downloads', to: '/downloads', primary: true },
          { label: 'Bus Schedules', to: '/transport' },
          { label: 'Faculty Directory (115+)', to: '/faculty' },
        ];
      case 'gallery-lightbox':
        return [
          { label: 'Open Campus Gallery', to: '/gallery-activities', primary: true },
        ];
      case 'admin-cockpit':
        return [
          ...(onOpenPortalModal
            ? [{ label: 'Open Admin SSO Sign-In', onClick: onOpenPortalModal, primary: true }]
            : []),
          { label: 'Higher Authorities & Governance', to: '/authorities' },
        ];
      default:
        return [];
    }
  };

  const handlePrintManual = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#EFF6F2] pb-24 relative print:bg-white print:pb-0">
      <div className="print:hidden">
        <SectionAtmosphere variant="light" showSakura={false} />
        <SecondaryPageHeader
          currentPageTitle="Website User Manual"
          category="Help & Documentation"
          onOpenApplyModal={onOpenApplyModal}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 relative z-10">
        {/* Institutional Editorial Hero Header */}
        <section className="bg-[#FAFDFB] border border-[#C8DFD2] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs mb-8 print:border-stone-300 print:shadow-none">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#D9EAE0]">
            <div className="space-y-3 max-w-3xl">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#4E7D68]">
                CCNUST Digital Campus Handbook · Edition 2026 · 8 Modules
              </div>
              <h1
                className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#163A2D] tracking-tight leading-[1.12]"
                style={{ textWrap: 'balance' }}
              >
                Website & Portal User Manual
              </h1>
              <p className="text-sm sm:text-base text-[#355A4A] leading-relaxed max-w-2xl">
                Step-by-step operating instructions for applicants, current students, faculty members, campus visitors, and authorized administrators using the CCN University of Science & Technology digital platform.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0 print:hidden">
              <button
                type="button"
                onClick={handlePrintManual}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#163A2D] hover:bg-[#0F281E] text-[#FAD02C] font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
              >
                <Printer className="w-4 h-4 shrink-0" />
                <span>Print / Save PDF</span>
              </button>
              {onOpenPortalModal && (
                <button
                  type="button"
                  onClick={onOpenPortalModal}
                  className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#FAD02C] hover:bg-[#FEF08A] text-[#163A2D] font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
                >
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Open Portal Login</span>
                </button>
              )}
            </div>
          </div>

          {/* Search & Interactive Role Filter Bar */}
          <div className="pt-6 space-y-4 print:hidden">
            <div className="relative max-w-2xl">
              <Search className="w-4 h-4 text-[#4E7D68] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any guide, button, or feature (e.g. scholarship, routine, Ctrl+K, admin, bus)..."
                aria-label="Search user manual topics"
                className="w-full pl-11 pr-10 py-3 rounded-xl bg-white border border-[#C8DFD2] focus:border-[#163A2D] focus:outline-none text-sm text-[#163A2D] placeholder:text-[#789D8B] shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-[#4E7D68] hover:text-[#163A2D] hover:bg-[#EFF6F2] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#4E7D68] mr-1">
                Filter by Role:
              </span>
              {ROLE_TABS.map((role) => {
                const isActive = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                      isActive
                        ? 'bg-[#163A2D] text-[#FAD02C] border-[#163A2D] shadow-xs'
                        : 'bg-white text-[#275443] border-[#C8DFD2] hover:border-[#163A2D] hover:bg-[#EFF6F2]'
                    }`}
                  >
                    {role.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Main Two-Column Asymmetric Manual Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sticky Sidebar: Quick Table of Contents & Campus Support */}
          <aside className="lg:col-span-4 lg:sticky lg:top-20 space-y-5 print:hidden">
            <div className="bg-[#FAFDFB] border border-[#C8DFD2] rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D9EAE0]">
                <h2 className="text-xs font-mono font-black uppercase tracking-widest text-[#163A2D]">
                  Table of Contents
                </h2>
                <span className="text-xs font-mono text-[#4E7D68]">
                  {visibleChapters.length} {visibleChapters.length === 1 ? 'section' : 'sections'}
                </span>
              </div>

              {visibleChapters.length === 0 ? (
                <p className="text-xs text-[#4E7D68] py-3">
                  No chapters match your active filter.
                </p>
              ) : (
                <nav aria-label="Manual Table of Contents" className="space-y-1">
                  {visibleChapters.map((chapter) => {
                    const isCurrent = activeChapterId === chapter.id;
                    return (
                      <button
                        key={chapter.id}
                        type="button"
                        onClick={() => jumpToChapter(chapter.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-start justify-between gap-2 cursor-pointer ${
                          isCurrent
                            ? 'bg-[#163A2D] text-white font-bold'
                            : 'text-[#275443] hover:bg-[#EFF6F2] font-medium'
                        }`}
                      >
                        <span className="leading-snug">
                          <span
                            className={`font-mono mr-2 ${
                              isCurrent ? 'text-[#FAD02C]' : 'text-[#4E7D68]'
                            }`}
                          >
                            {chapter.number}
                          </span>
                          {chapter.title}
                        </span>
                        <ChevronRight
                          className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            isCurrent ? 'text-[#FAD02C]' : 'text-[#789D8B]'
                          }`}
                        />
                      </button>
                    );
                  })}
                  {visibleFaqs.length > 0 && (
                    <button
                      type="button"
                      onClick={() => jumpToChapter('faq')}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-start justify-between gap-2 cursor-pointer ${
                        activeChapterId === 'faq'
                          ? 'bg-[#163A2D] text-white font-bold'
                          : 'text-[#275443] hover:bg-[#EFF6F2] font-medium'
                      }`}
                    >
                      <span className="leading-snug">
                        <span
                          className={`font-mono mr-2 ${
                            activeChapterId === 'faq' ? 'text-[#FAD02C]' : 'text-[#4E7D68]'
                          }`}
                        >
                          09
                        </span>
                        FAQ & Troubleshooting
                      </span>
                      <ChevronRight
                        className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                          activeChapterId === 'faq' ? 'text-[#FAD02C]' : 'text-[#789D8B]'
                        }`}
                      />
                    </button>
                  )}
                </nav>
              )}
            </div>

            {/* Keyboard Shortcuts Quick Reference */}
            <div className="bg-[#FAFDFB] border border-[#C8DFD2] rounded-2xl p-5 shadow-xs space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono font-black uppercase tracking-widest text-[#163A2D]">
                <Keyboard className="w-4 h-4 text-[#163A2D]" />
                <span>Keyboard Shortcuts</span>
              </div>
              <dl className="divide-y divide-[#D9EAE0] text-xs">
                <div className="py-2 flex items-center justify-between gap-3">
                  <dt className="text-[#355A4A]">Global University Search</dt>
                  <dd className="font-mono font-bold text-[#163A2D] whitespace-nowrap">Ctrl+K / ⌘K / /</dd>
                </div>
                <div className="py-2 flex items-center justify-between gap-3">
                  <dt className="text-[#355A4A]">Navigate Search List</dt>
                  <dd className="font-mono font-bold text-[#163A2D] whitespace-nowrap">↑ / ↓ / Enter</dd>
                </div>
                <div className="py-2 flex items-center justify-between gap-3">
                  <dt className="text-[#355A4A]">Gallery Lightbox Slide</dt>
                  <dd className="font-mono font-bold text-[#163A2D] whitespace-nowrap">← / → Keys</dd>
                </div>
                <div className="py-2 flex items-center justify-between gap-3">
                  <dt className="text-[#355A4A]">Close Any Modal / Menu</dt>
                  <dd className="font-mono font-bold text-[#163A2D] whitespace-nowrap">Esc</dd>
                </div>
              </dl>
            </div>

            {/* Helpdesk Support Card */}
            <div className="bg-[#163A2D] text-white border border-[#0F281E] rounded-2xl p-5 shadow-sm space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#FAD02C]">
                Direct Campus Support
              </div>
              <p className="text-xs text-[#D0E4DA] leading-relaxed">
                Need live assistance with online enrollment, transcripts, or portal access? Reach our Kotbari helpdesk directly.
              </p>
              <div className="space-y-2 text-xs font-mono pt-1">
                <a
                  href="tel:01715451599"
                  className="flex items-center space-x-2 text-[#FAD02C] hover:underline font-bold"
                >
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  <span>01715-451599 / 01888-042667</span>
                </a>
                <a
                  href="mailto:info@ccnust.ac.bd"
                  className="flex items-center space-x-2 text-[#D0E4DA] hover:text-white"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0 text-[#FAD02C]" />
                  <span>info@ccnust.ac.bd</span>
                </a>
                <div className="flex items-center space-x-2 text-[#A3C7B5]">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-[#FAD02C]" />
                  <span>Kotbari, Cumilla-3500, Bangladesh</span>
                </div>
              </div>
              <div className="pt-2 border-t border-white/15">
                <Link
                  to="/about"
                  className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-[#FAD02C] hover:underline"
                >
                  <span>Visit Campus Contact & Map</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Right Reading Column: Step-by-Step Chapters & FAQs */}
          <main className="lg:col-span-8 space-y-6 print:col-span-12">
            {visibleChapters.length === 0 && visibleFaqs.length === 0 ? (
              <div className="bg-[#FAFDFB] border border-[#C8DFD2] rounded-2xl p-10 text-center space-y-4 shadow-xs">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#EFF6F2] border border-[#C8DFD2] flex items-center justify-center text-[#163A2D]">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-black text-[#163A2D]">
                  No manual guides matched your search
                </h2>
                <p className="text-sm text-[#4E7D68] max-w-md mx-auto">
                  Try clearing your search term or switching back to All Guides to see every step-by-step handbook chapter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedRole('all');
                  }}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#163A2D] hover:bg-[#0F281E] text-[#FAD02C] font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span>Reset Search & Role Filter</span>
                </button>
              </div>
            ) : (
              visibleChapters.map((chapter) => {
                const actions = getChapterActions(chapter.id);
                return (
                  <article
                    key={chapter.id}
                    id={`manual-chapter-${chapter.id}`}
                    className="bg-[#FAFDFB] border border-[#C8DFD2] rounded-2xl p-6 sm:p-8 shadow-xs scroll-mt-24 print:break-inside-avoid print:border-stone-300"
                  >
                    {/* Chapter Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-[#D9EAE0]">
                      <div className="space-y-1.5">
                        <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#4E7D68]">
                          Section {chapter.number} · {chapter.audienceLabel}
                        </div>
                        <h2
                          className="text-xl sm:text-2xl font-black text-[#163A2D] tracking-tight"
                          style={{ textWrap: 'balance' }}
                        >
                          {chapter.title}
                        </h2>
                      </div>
                      <div className="w-11 h-11 rounded-xl bg-[#EFF6F2] border border-[#C8DFD2] flex items-center justify-center shrink-0">
                        {chapter.icon}
                      </div>
                    </div>

                    {/* Chapter Intro */}
                    <p className="text-sm sm:text-base text-[#355A4A] leading-relaxed max-w-prose mt-5">
                      {chapter.summary}
                    </p>

                    {/* Numbered Step-by-Step Procedure */}
                    <ol className="mt-6 space-y-4">
                      {chapter.steps.map((step, index) => (
                        <li
                          key={step.heading}
                          className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#DCECE2]"
                        >
                          <span className="w-7 h-7 rounded-lg bg-[#163A2D] text-[#FAD02C] font-mono font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <div className="space-y-1 min-w-0">
                            <h3 className="text-sm sm:text-base font-bold text-[#163A2D]">
                              {step.heading}
                            </h3>
                            <p className="text-xs sm:text-sm text-[#355A4A] leading-relaxed">
                              {step.detail}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>

                    {/* Editorial Notes / Practical Tips */}
                    {chapter.tips.length > 0 && (
                      <div className="mt-5 p-4 rounded-xl bg-[#EFF6F2] border border-[#C8DFD2] space-y-1.5">
                        <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#163A2D] flex items-center space-x-1.5">
                          <ShieldCheck className="w-4 h-4 text-[#163A2D] shrink-0" />
                          <span>Practical Guidance</span>
                        </div>
                        <ul className="space-y-1 text-xs sm:text-sm text-[#355A4A] list-disc pl-5">
                          {chapter.tips.map((tip) => (
                            <li key={tip} className="leading-relaxed">
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Direct Jump Actions */}
                    {actions.length > 0 && (
                      <div className="mt-6 pt-5 border-t border-[#D9EAE0] flex flex-wrap items-center gap-2.5 print:hidden">
                        {actions.map((action) => {
                          const cls = action.primary
                            ? 'inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#163A2D] hover:bg-[#0F281E] text-[#FAD02C] font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shrink-0'
                            : 'inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#EFF6F2] text-[#163A2D] border border-[#C8DFD2] hover:border-[#163A2D] font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shrink-0';

                          if (action.to) {
                            return (
                              <Link key={action.label} to={action.to} className={cls}>
                                <span>{action.label}</span>
                                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                              </Link>
                            );
                          }

                          return (
                            <button
                              key={action.label}
                              type="button"
                              onClick={action.onClick}
                              className={cls}
                            >
                              <span>{action.label}</span>
                              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </article>
                );
              })
            )}

            {/* Section 09: Frequently Asked Questions & Troubleshooting */}
            {visibleFaqs.length > 0 && (
              <section
                id="manual-chapter-faq"
                className="bg-[#FAFDFB] border border-[#C8DFD2] rounded-2xl p-6 sm:p-8 shadow-xs scroll-mt-24 print:border-stone-300"
              >
                <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#D9EAE0]">
                  <div className="space-y-1.5">
                    <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#4E7D68]">
                      Section 09 · Common Questions
                    </div>
                    <h2
                      className="text-xl sm:text-2xl font-black text-[#163A2D] tracking-tight"
                      style={{ textWrap: 'balance' }}
                    >
                      Frequently Asked Questions & Troubleshooting
                    </h2>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-[#EFF6F2] border border-[#C8DFD2] flex items-center justify-center shrink-0">
                    <HelpCircle className="w-5 h-5 text-[#163A2D]" />
                  </div>
                </div>

                <div className="mt-5 divide-y divide-[#D9EAE0] border border-[#DCECE2] rounded-xl bg-white overflow-hidden">
                  {visibleFaqs.map((faq) => {
                    const isOpen = openFaqIds.includes(faq.id);
                    return (
                      <div key={faq.id} className="transition-colors">
                        <button
                          type="button"
                          onClick={() => toggleFaq(faq.id)}
                          aria-expanded={isOpen}
                          className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-[#FAFDFB] transition-colors cursor-pointer"
                        >
                          <span className="text-sm sm:text-base font-bold text-[#163A2D]">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-[#4E7D68] shrink-0 transition-transform duration-200 ${
                              isOpen ? 'rotate-180 text-[#163A2D]' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-4 text-xs sm:text-sm text-[#355A4A] leading-relaxed border-t border-[#EFF6F2] pt-3 bg-[#FAFDFB]">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
