import React, { useState, Suspense, lazy, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingPetals from './components/FloatingPetals';
import { Program, UserSession } from './types';
import { ShieldAlert, Sparkles } from 'lucide-react';
import { ServiceModalTab } from './components/CCNUSTServicesModal';
import { CmsProvider, useCmsData, ADMIN_EMAIL } from './lib/useCmsData';
import ErrorBoundary from './components/ErrorBoundary';

// Dedicated fast-loading separate pages
import HomePage from './pages/HomePage';
const FacultyPage = lazy(() => import('./pages/FacultyPage'));
const GalleryActivitiesPage = lazy(() => import('./pages/GalleryActivitiesPage'));
const AcademicsPage = lazy(() => import('./pages/AcademicsPage'));
const AdmissionsPage = lazy(() => import('./pages/AdmissionsPage'));
const AboutContactPage = lazy(() => import('./pages/AboutContactPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const AuthoritiesPage = lazy(() => import('./pages/AuthoritiesPage'));
const ResearchJournalPage = lazy(() => import('./pages/ResearchJournalPage'));
const DownloadsPage = lazy(() => import('./pages/DownloadsPage'));
const TransportPage = lazy(() => import('./pages/TransportPage'));
const AlumniPage = lazy(() => import('./pages/AlumniPage'));
const PlacementPage = lazy(() => import('./pages/PlacementPage'));
const UserManualPage = lazy(() => import('./pages/UserManualPage'));

// Lazy-loaded interactive modals (fetched on-demand when user opens them)
const IntroExperience = lazy(() => import('./components/IntroExperience'));
const AdmissionModal = lazy(() => import('./components/AdmissionModal'));
const PortalModal = lazy(() => import('./components/PortalModal'));
const ProgramDetailModal = lazy(() => import('./components/ProgramDetailModal'));
const AdminControlPanel = lazy(() => import('./components/AdminControlPanel'));
const CCNUSTServicesModal = lazy(() => import('./components/CCNUSTServicesModal'));

// Helper to scroll to top immediately whenever page route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Lightweight page loading fallback
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-3">
      <div className="w-10 h-10 border-3 border-[#163A2D] border-t-[#FAD02C] rounded-full animate-spin" />
      <span className="font-mono text-xs text-[#163A2D] uppercase font-bold tracking-wider">
        Loading CCNUST Portal...
      </span>
    </div>
  );
}

function AppContent() {
  const { authUser, isFirebaseAdmin, signOutFirebase } = useCmsData();
  const [showIntro, setShowIntro] = useState<boolean>(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isPortalModalOpen, setIsPortalModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);
  const [servicesModalTab, setServicesModalTab] = useState<ServiceModalTab>('result');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [applyProgramId, setApplyProgramId] = useState<string | undefined>(undefined);

  // Sync verified Google Firebase session automatically into portal session
  useEffect(() => {
    if (authUser && isFirebaseAdmin) {
      setUserSession((prev) => {
        if (prev && prev.email.toLowerCase() === ADMIN_EMAIL && prev.isAdmin) {
          return prev;
        }
        return {
          id: 'FAC-ADMIN-001',
          name: authUser.displayName || 'Md. Shanto (Chief System Administrator)',
          email: authUser.email || ADMIN_EMAIL,
          role: 'admin',
          department: 'Computer Science & Engineering',
          designation: 'Chief System Administrator',
          avatarUrl: authUser.photoURL || undefined,
          isAdmin: true,
        };
      });
    }
  }, [authUser, isFirebaseAdmin]);

  const handleLogout = useCallback(() => {
    setUserSession(null);
    setIsAdminPanelOpen(false);
    if (authUser) {
      signOutFirebase().catch((err) => console.warn('Sign out note:', err));
    }
  }, [authUser, signOutFirebase]);

  const handleOpenServicesModal = useCallback((tab: ServiceModalTab = 'result') => {
    setServicesModalTab(tab);
    setIsServicesModalOpen(true);
  }, []);

  const handleOpenApplyModal = useCallback((programId?: string) => {
    setApplyProgramId(programId);
    setIsApplyModalOpen(true);
  }, []);

  const handleSelectProgram = useCallback((programOrId: Program | string) => {
    if (typeof programOrId === 'string') {
      setApplyProgramId(programOrId);
      setIsApplyModalOpen(true);
    } else {
      setSelectedProgram(programOrId);
    }
  }, []);

  const isAdmin = Boolean(
    isFirebaseAdmin ||
      userSession?.isAdmin ||
      userSession?.email?.toLowerCase() === ADMIN_EMAIL ||
      userSession?.role === 'admin'
  );

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="relative min-h-screen flex flex-col bg-[#F2F7F4] text-[#1E293B] antialiased selection:bg-[#FAD02C] selection:text-[#163A2D] font-sans">
        {/* Continuous subtle sakura petal ambience */}
        <FloatingPetals />

        {/* Cinematic Replayable Intro Experience */}
        {showIntro && (
          <Suspense fallback={null}>
            <IntroExperience onComplete={() => setShowIntro(false)} />
          </Suspense>
        )}

        {/* Institutional Minimalist Header (Single Menu + Standalone Login/Sign Up) */}
        <Header
          onOpenApplyModal={() => handleOpenApplyModal()}
          onOpenPortalModal={() => setIsPortalModalOpen(true)}
          onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
          onOpenServiceModal={handleOpenServicesModal}
          onReplayIntro={() => setShowIntro(true)}
          userSession={userSession}
          onLogout={handleLogout}
        />

        {/* Multi-Page Routes: Fast, Discrete, Device-Optimized */}
        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* 1. Fast Home Page */}
              <Route
                path="/"
                element={
                  <HomePage
                    onOpenApplyModal={() => handleOpenApplyModal()}
                    onOpenServiceModal={handleOpenServicesModal}
                    onSelectProgram={handleSelectProgram}
                    isAdmin={isAdmin}
                    onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
                  />
                }
              />

              {/* 2. Real Faculty Directory Page */}
              <Route path="/faculty" element={<FacultyPage />} />

              {/* 3. Real Gallery & Campus Activities Page */}
              <Route path="/gallery-activities" element={<GalleryActivitiesPage />} />

              {/* 4. Faculties, Degrees & OBE Curricula Page */}
              <Route
                path="/academics"
                element={
                  <AcademicsPage
                    onOpenApplyModal={() => handleOpenApplyModal()}
                    onSelectProgram={(id) => handleOpenApplyModal(id)}
                  />
                }
              />

              {/* 5. Admissions, Fees & 100% Scholarship Estimator Page */}
              <Route
                path="/admissions"
                element={
                  <AdmissionsPage
                    onOpenApplyModal={() => handleOpenApplyModal()}
                  />
                }
              />

              {/* 6. About CCNUST & Contact Page (Contact inside About) */}
              <Route path="/about" element={<AboutContactPage />} />

              {/* 7. CCNUST Official Services & 12 Administrative Offices Page */}
              <Route
                path="/services"
                element={
                  <ServicesPage
                    onOpenServiceModal={handleOpenServicesModal}
                  />
                }
              />

              {/* 8. Higher Authorities & Statutory Governance Page */}
              <Route path="/authorities" element={<AuthoritiesPage />} />

              {/* 9. CCN Journal of Science & Technology (Research Wing) */}
              <Route path="/research-journal" element={<ResearchJournalPage />} />

              {/* 10. Official Forms & Downloads Center */}
              <Route path="/downloads" element={<DownloadsPage />} />

              {/* 11. Campus Transport & Shuttle Routes */}
              <Route path="/transport" element={<TransportPage />} />

              {/* 12. CCNUST Alumni Association */}
              <Route path="/alumni" element={<AlumniPage />} />

              {/* 13. Career Placement & Internship Cell */}
              <Route path="/career-placement" element={<PlacementPage />} />

              {/* 14. Website & Portal User Manual */}
              <Route
                path="/user-manual"
                element={
                  <UserManualPage
                    onOpenApplyModal={() => handleOpenApplyModal()}
                    onOpenPortalModal={() => setIsPortalModalOpen(true)}
                    onOpenServiceModal={handleOpenServicesModal}
                  />
                }
              />

              {/* Fallback to Home */}
              <Route
                path="*"
                element={
                  <HomePage
                    onOpenApplyModal={() => handleOpenApplyModal()}
                    onOpenServiceModal={handleOpenServicesModal}
                    onSelectProgram={handleSelectProgram}
                    isAdmin={isAdmin}
                    onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
                  />
                }
              />
            </Routes>
          </Suspense>
        </main>

        {/* Institutional Footer */}
        <Footer
          onOpenApplyModal={() => handleOpenApplyModal()}
          onOpenPortalModal={() => setIsPortalModalOpen(true)}
          onOpenServiceModal={handleOpenServicesModal}
          onReplayIntro={() => setShowIntro(true)}
        />

        {/* Floating Admin Cockpit Launcher (When logged in as Admin) */}
        {isAdmin && (
          <div className="fixed bottom-6 right-6 z-40 animate-in slide-in-from-bottom-5">
            <button
              onClick={() => setIsAdminPanelOpen(true)}
              className="group flex items-center space-x-2.5 bg-slate-900 text-amber-400 border border-amber-400/60 px-4 py-3 rounded-2xl shadow-xl hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <div className="relative">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-slate-900 animate-ping" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-slate-900" />
              </div>
              <div className="text-left font-mono">
                <div className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">
                  Admin Mode Active
                </div>
                <div className="text-xs font-bold text-white group-hover:text-amber-400 flex items-center space-x-1">
                  <span>Open Admin Cockpit</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </div>
              </div>
            </button>
          </div>
        )}

        {/* --- Global Modals (Loaded only when user opens them) --- */}
        {isAdminPanelOpen && (
          <Suspense fallback={null}>
            <AdminControlPanel
              isOpen={isAdminPanelOpen}
              onClose={() => setIsAdminPanelOpen(false)}
              currentAdminEmail={userSession?.email || authUser?.email || ADMIN_EMAIL}
              adminSession={userSession}
            />
          </Suspense>
        )}

        {isPortalModalOpen && (
          <Suspense fallback={null}>
            <PortalModal
              isOpen={isPortalModalOpen}
              onClose={() => setIsPortalModalOpen(false)}
              onLogin={(session) => {
                setUserSession(session);
                if (!session.isAdmin && session.role !== 'admin') {
                  setIsPortalModalOpen(false);
                }
              }}
              currentSession={userSession}
              onLogout={handleLogout}
              onOpenAdminPanel={() => {
                setIsPortalModalOpen(false);
                setIsAdminPanelOpen(true);
              }}
            />
          </Suspense>
        )}

        {isApplyModalOpen && (
          <Suspense fallback={null}>
            <AdmissionModal
              isOpen={isApplyModalOpen}
              onClose={() => {
                setIsApplyModalOpen(false);
                setApplyProgramId(undefined);
              }}
              initialProgramId={applyProgramId}
            />
          </Suspense>
        )}

        {selectedProgram && (
          <Suspense fallback={null}>
            <ProgramDetailModal
              program={selectedProgram}
              onClose={() => setSelectedProgram(null)}
              onApply={() => {
                const programId = selectedProgram.id;
                setSelectedProgram(null);
                handleOpenApplyModal(programId);
              }}
            />
          </Suspense>
        )}

        {isServicesModalOpen && (
          <Suspense fallback={null}>
            <CCNUSTServicesModal
              isOpen={isServicesModalOpen}
              onClose={() => setIsServicesModalOpen(false)}
              initialTab={servicesModalTab}
              onOpenApplyModal={() => handleOpenApplyModal()}
            />
          </Suspense>
        )}
      </div>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <CmsProvider>
        <AppContent />
      </CmsProvider>
    </ErrorBoundary>
  );
}
