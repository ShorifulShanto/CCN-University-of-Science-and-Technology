import React, { useState } from 'react';
import {
  X,
  User,
  Lock,
  GraduationCap,
  BookOpen,
  FileText,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  Sparkles,
  Download,
  AlertCircle,
  Mail,
  UserCheck,
  Building,
  KeyRound,
  ShieldAlert,
  Edit,
  Eye,
  EyeOff,
} from 'lucide-react';
import { UserSession } from '../types';
import { cmsStore, UserAccount } from '../lib/cmsState';
import { useCmsData, ADMIN_EMAIL } from '../lib/useCmsData';
import ChangePasswordModal from './ChangePasswordModal';

interface PortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (session: UserSession) => void;
  currentSession: UserSession | null;
  onLogout: () => void;
  onOpenAdminPanel?: () => void;
  initialMode?: 'login' | 'signup';
}

type UserCategory = 'student' | 'teacher';
type AuthMode = 'login' | 'signup';

export default function PortalModal({
  isOpen,
  onClose,
  onLogin,
  currentSession,
  onLogout,
  onOpenAdminPanel,
  initialMode = 'login',
}: PortalModalProps) {
  // Auth Form State
  const [authMode, setAuthMode] = useState<AuthMode>(initialMode);
  const [userCategory, setUserCategory] = useState<UserCategory>('student');

  React.useEffect(() => {
    if (initialMode) {
      setAuthMode(initialMode);
    }
  }, [initialMode, isOpen]);
  
  // Login Form Inputs
  const [loginIdentifier, setLoginIdentifier] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Sign Up Form Inputs
  const [signupName, setSignupName] = useState<string>('');
  const [signupId, setSignupId] = useState<string>('');
  const [signupEmail, setSignupEmail] = useState<string>('');
  const [signupPassword, setSignupPassword] = useState<string>('');
  const [signupDept, setSignupDept] = useState<string>('Computer Science & Engineering');
  const [signupDesignation, setSignupDesignation] = useState<string>('Assistant Professor');
  const [signupSuccess, setSignupSuccess] = useState<boolean>(false);

  // Password Modal
  const [isChangePassOpen, setIsChangePassOpen] = useState(false);

  const { createUser, logLoginAudit, signInWithGoogle } = useCmsData();

  // Active dashboard tab when logged in
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'grades' | 'admit' | 'fees'>('overview');
  const [admitDownloadBanner, setAdmitDownloadBanner] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCategoryChange = (category: UserCategory) => {
    setUserCategory(category);
    setAuthError(null);
  };

  const handleGoogleSignIn = async () => {
    setAuthError(null);
    setGoogleLoading(true);
    try {
      const fbUser = await signInWithGoogle();
      if (fbUser) {
        const emailLower = (fbUser.email || '').toLowerCase();
        const isSuperAdmin = emailLower === ADMIN_EMAIL && fbUser.emailVerified;
        const session: UserSession = {
          role: isSuperAdmin ? 'admin' : userCategory === 'teacher' ? 'faculty' : 'student',
          id: isSuperAdmin ? 'FAC-ADMIN-001' : fbUser.uid.slice(0, 12).toUpperCase(),
          email: fbUser.email || '',
          name: fbUser.displayName || (isSuperAdmin ? 'Md. Shanto (Admin)' : 'CCNUST Google Member'),
          department: 'Computer Science & Engineering',
          designation: isSuperAdmin ? 'Chief System Administrator' : undefined,
          avatarUrl: fbUser.photoURL || undefined,
          isAdmin: isSuperAdmin,
        };
        onLogin(session);
      }
    } catch (err: any) {
      setAuthError(err?.message || 'Google authentication was cancelled or failed.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const result = cmsStore.authenticate(loginIdentifier, loginPassword, userCategory);

    if (!result.success || !result.user) {
      setAuthError(result.error || 'Authentication failed. Please check your credentials.');
      return;
    }

    const user: UserAccount = result.user;
    logLoginAudit(user, 'Success').catch(() => {});

    const session: UserSession = {
      role: user.role,
      id: user.id,
      email: user.email,
      name: user.name,
      department: user.department,
      designation: user.designation,
      isAdmin: user.isAdmin || user.email.toLowerCase() === ADMIN_EMAIL || user.role === 'admin',
    };

    onLogin(session);
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!signupName || !signupEmail || !signupId) {
      setAuthError('Please fill in all required fields.');
      return;
    }

    const newAccount: UserAccount = {
      id: signupId.trim(),
      name: signupName.trim(),
      email: signupEmail.trim(),
      role: userCategory === 'student' ? 'student' : 'faculty',
      category: userCategory,
      department: signupDept,
      designation: userCategory === 'teacher' ? signupDesignation : undefined,
      password: signupPassword.trim() || '123456',
      status: 'Active',
      createdAt: new Date().toLocaleString(),
      lastLogin: new Date().toLocaleString(),
    };

    await createUser(newAccount);
    await logLoginAudit(newAccount, 'Success');

    setSignupSuccess(true);
    setTimeout(() => {
      const session: UserSession = {
        role: newAccount.role,
        id: newAccount.id,
        email: newAccount.email,
        name: newAccount.name,
        department: newAccount.department,
        designation: newAccount.designation,
        isAdmin: newAccount.isAdmin || newAccount.email.toLowerCase() === ADMIN_EMAIL,
      };
      onLogin(session);
    }, 600);
  };

  const handleDownloadAdmitCard = () => {
    if (!currentSession) return;
    const content = [
      'CCN UNIVERSITY OF SCIENCE & TECHNOLOGY (CCNUST)',
      'Kotbari, Cumilla-3500, Bangladesh',
      '============================================================',
      'OFFICIAL SEMESTER FINAL EXAMINATION ADMIT CARD — FALL 2026',
      '============================================================',
      `Student Name : ${currentSession.name}`,
      `Student ID   : ${currentSession.id}`,
      `Department   : ${currentSession.department || 'Computer Science & Engineering'}`,
      `Exam Venue   : Academic Building 1, Kotbari Main Campus`,
      `Clearance    : Dues Cleared | Attendance: 94.2% (Eligible)`,
      `Issued At    : ${new Date().toLocaleString()}`,
      '------------------------------------------------------------',
      'Signed: Controller of Examinations, CCNUST',
    ].join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CCNUST_AdmitCard_${currentSession.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setAdmitDownloadBanner('Official Admit Card summary downloaded for Exam Hall Kotbari Campus.');
  };

  const isAdminUser =
    currentSession?.isAdmin ||
    currentSession?.email?.toLowerCase() === ADMIN_EMAIL ||
    currentSession?.role === 'admin';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] border-2 border-[#163A2D] max-w-xl w-full shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-150 max-h-[94vh] flex flex-col">
        {/* Modal Institutional Header */}
        <div className="bg-[#163A2D] text-white px-6 py-4 flex items-center justify-between shrink-0 border-b-2 border-[#163A2D]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/10 border border-[#FAD02C]/40 flex items-center justify-center text-[#FAD02C]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono font-bold text-[#FAD02C] uppercase tracking-wider">
                CCNUST Institutional Integrated Systems
              </div>
              <h2 className="font-sans text-base sm:text-lg font-black text-white">
                {currentSession ? 'University Portal Dashboard' : 'Academic Portal & ERP Gateway'}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#D0E4DA] hover:text-[#FAD02C] hover:bg-[#0D241C] transition-colors cursor-pointer"
            aria-label="Close portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto grow text-xs text-[#4E7D68] bg-[#FAF8F5]">
          {currentSession ? (
            /* Logged-In User Dashboard */
            <div className="space-y-5">
              {/* User Profile Card */}
              <div className="bg-[#163A2D] text-white p-4 sm:p-5 border-2 border-[#163A2D] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5 text-center sm:text-left">
                  <div className="w-12 h-12 bg-[#FAD02C] border-2 border-[#FAD02C] flex items-center justify-center text-[#163A2D] font-black text-lg font-mono shrink-0">
                    {currentSession.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-[#FAD02C] font-mono text-[11px] uppercase tracking-wider font-bold flex items-center space-x-1.5 justify-center sm:justify-start">
                      <span>{currentSession.role.toUpperCase()}</span>
                      {isAdminUser && (
                        <span className="bg-[#FAD02C] text-[#163A2D] text-[9px] px-1.5 py-0.2 font-black">
                          SUPER ADMIN
                        </span>
                      )}
                    </div>
                    <h3 className="font-sans text-base sm:text-lg font-black">{currentSession.name}</h3>
                    <div className="text-[11px] text-[#D0E4DA]">
                      ID: <strong className="text-white">{currentSession.id}</strong> • {currentSession.email}
                    </div>
                    <div className="text-[10px] text-[#A3C7B5]">{currentSession.department}</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-end">
                  <button
                    onClick={() => setIsChangePassOpen(true)}
                    className="bg-white/10 hover:bg-[#FAD02C] hover:text-[#163A2D] text-[#FAD02C] border border-[#FAD02C]/40 px-3 py-1.5 font-bold text-xs transition-colors cursor-pointer flex items-center space-x-1 uppercase tracking-wider font-mono"
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>Change Password</span>
                  </button>

                  <button
                    onClick={onLogout}
                    className="bg-rose-500/20 hover:bg-rose-500/40 text-rose-200 border border-rose-500/40 px-3 py-1.5 font-bold text-xs transition-colors cursor-pointer uppercase tracking-wider font-mono"
                  >
                    Sign Out
                  </button>
                </div>
              </div>

              {/* SUPER ADMIN MASTER CONTROL BANNER */}
              {isAdminUser && (
                <div className="bg-white border-2 border-[#163A2D] p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#163A2D] text-[#FAD02C] flex items-center justify-center shrink-0">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-black text-sm text-[#163A2D]">
                        Super Admin Master Control Center
                      </h4>
                      <p className="text-[#4E7D68] text-xs">
                        Full permissions granted to control website notices, gallery photos, passwords & accounts.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (onOpenAdminPanel) onOpenAdminPanel();
                    }}
                    className="bg-[#163A2D] hover:bg-[#0D241C] text-[#FAD02C] border border-[#163A2D] px-4 py-2 font-black text-xs uppercase tracking-wider cursor-pointer flex items-center space-x-1.5 shrink-0 transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-[#FAD02C]" />
                    <span>Launch Admin Cockpit</span>
                  </button>
                </div>
              )}

              {/* Student Role Dashboard Content */}
              {currentSession.role === 'student' ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 border-b border-[#D0E4DA] pb-2">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`px-3 py-1.5 font-bold cursor-pointer transition-colors uppercase tracking-wider font-mono text-[11px] ${
                        activeTab === 'overview' ? 'bg-[#163A2D] text-white' : 'text-[#4E7D68] hover:bg-white'
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab('courses')}
                      className={`px-3 py-1.5 font-bold cursor-pointer transition-colors uppercase tracking-wider font-mono text-[11px] ${
                        activeTab === 'courses' ? 'bg-[#163A2D] text-white' : 'text-[#4E7D68] hover:bg-white'
                      }`}
                    >
                      Courses
                    </button>
                    <button
                      onClick={() => setActiveTab('admit')}
                      className={`px-3 py-1.5 font-bold cursor-pointer transition-colors uppercase tracking-wider font-mono text-[11px] ${
                        activeTab === 'admit' ? 'bg-[#163A2D] text-white' : 'text-[#4E7D68] hover:bg-white'
                      }`}
                    >
                      Admit Card
                    </button>
                    <button
                      onClick={() => setActiveTab('fees')}
                      className={`px-3 py-1.5 font-bold cursor-pointer transition-colors uppercase tracking-wider font-mono text-[11px] ${
                        activeTab === 'fees' ? 'bg-[#163A2D] text-white' : 'text-[#4E7D68] hover:bg-white'
                      }`}
                    >
                      Ledger
                    </button>
                  </div>

                  {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-white border-2 border-[#163A2D] p-3 text-center shadow-none">
                        <div className="text-[#4E7D68] text-[10px] uppercase font-bold font-mono">Cumulative CGPA</div>
                        <div className="font-mono text-2xl font-black text-[#163A2D] mt-0.5">3.88 / 4.00</div>
                        <div className="text-[10px] text-[#163A2D] font-bold">Top 5% Merit Standing</div>
                      </div>
                      <div className="bg-white border-2 border-[#163A2D] p-3 text-center shadow-none">
                        <div className="text-[#4E7D68] text-[10px] uppercase font-bold font-mono">Credits Completed</div>
                        <div className="font-mono text-2xl font-black text-[#163A2D] mt-0.5">84 / 148</div>
                        <div className="text-[10px] text-[#4E7D68]">Semester: 5th (Junior)</div>
                      </div>
                      <div className="bg-white border-2 border-[#163A2D] p-3 text-center shadow-none">
                        <div className="text-[#4E7D68] text-[10px] uppercase font-bold font-mono">Attendance Rate</div>
                        <div className="font-mono text-2xl font-black text-[#163A2D] mt-0.5">94.2%</div>
                        <div className="text-[10px] text-[#163A2D] font-bold">Eligible for finals</div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'courses' && (
                    <div className="bg-white border-2 border-[#163A2D] overflow-hidden">
                      <div className="bg-[#163A2D] text-white p-2.5 font-bold text-xs flex justify-between">
                        <span>Current Registered Modules</span>
                        <span className="text-[#FAD02C] font-mono">Fall 2026</span>
                      </div>
                      <div className="divide-y divide-[#D0E4DA] text-xs">
                        {[
                          { code: 'CSE 311', name: 'Database Management Systems & SQL', credits: 3.0, instructor: 'Dr. Md. Ahsan Habib', room: 'Lab 402' },
                          { code: 'CSE 312', name: 'Database Systems Laboratory', credits: 1.5, instructor: 'Engr. K. Hasan', room: 'Computing Lab 2' },
                          { code: 'CSE 321', name: 'Software Engineering & Design Patterns', credits: 3.0, instructor: 'Prof. S. R. Majumder', room: 'Auditorium Annex' },
                        ].map((c, i) => (
                          <div key={i} className="p-2.5 flex items-center justify-between">
                            <div>
                              <div className="font-bold text-[#163A2D]">{c.code}: {c.name}</div>
                              <div className="text-[10px] text-[#4E7D68]">Instructor: {c.instructor} • Venue: {c.room}</div>
                            </div>
                            <span className="font-mono font-bold text-[#163A2D] bg-[#FAF8F5] border border-[#D0E4DA] px-2 py-0.5 text-[11px]">
                              {c.credits} Cr
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'admit' && (
                    <div className="border-2 border-[#163A2D] p-5 bg-white text-center space-y-2.5">
                      <FileText className="w-8 h-8 text-[#163A2D] mx-auto" />
                      <h4 className="font-sans text-base font-black text-[#163A2D]">Semester Final Exam Admit Card</h4>
                      <p className="text-[11px] text-[#4E7D68] max-w-sm mx-auto">
                        Your dues are fully cleared and attendance exceeds 75%. Digital admit card verification is ready.
                      </p>
                      <button
                        type="button"
                        onClick={handleDownloadAdmitCard}
                        className="bg-[#163A2D] hover:bg-[#0D241C] text-[#FAD02C] text-xs font-black uppercase tracking-wider py-2 px-5 inline-flex items-center justify-center space-x-1 cursor-pointer border border-[#163A2D]"
                      >
                        <Download className="w-3.5 h-3.5 mr-1" />
                        <span>Download Admit Card</span>
                      </button>
                      {admitDownloadBanner && (
                        <div className="mt-2 p-2 bg-emerald-50 border border-emerald-300 text-emerald-900 text-[11px] font-mono">
                          {admitDownloadBanner}
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'fees' && (
                    <div className="bg-white border-2 border-[#163A2D] p-4 space-y-2">
                      <div className="flex items-center justify-between font-bold text-[#163A2D] pb-1.5 border-b border-[#D0E4DA]">
                        <span>Tuition Ledger & Merit Waiver</span>
                        <span className="text-[#163A2D] bg-[#EAF2ED] border border-[#163A2D] px-2 py-0.5 text-[10px] font-bold font-mono">Cleared</span>
                      </div>
                      <div className="space-y-1.5 text-xs text-[#4E7D68]">
                        <div className="flex justify-between"><span>Semester Tuition Fee:</span><strong className="text-[#163A2D]">BDT 38,000</strong></div>
                        <div className="flex justify-between text-[#163A2D]"><span>Merit Waiver (50%):</span><strong>- BDT 19,000</strong></div>
                        <div className="flex justify-between"><span>Lab & Library Fee:</span><strong className="text-[#163A2D]">BDT 4,500</strong></div>
                        <div className="flex justify-between font-bold pt-1.5 border-t border-[#D0E4DA] text-[#163A2D]">
                          <span>Net Amount Paid:</span>
                          <strong>BDT 23,500 (Paid via bKash)</strong>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Teacher / Admin Role Dashboard Content */
                <div className="space-y-4">
                  <div className="bg-white border-2 border-[#163A2D] p-5">
                    <div className="flex items-center space-x-3 mb-3">
                      <CheckCircle2 className="w-6 h-6 text-[#163A2D] shrink-0" />
                      <div>
                        <h4 className="font-sans text-base font-black text-[#163A2D]">
                          Faculty Management Portal Active
                        </h4>
                        <p className="text-xs text-[#4E7D68]">
                          Assigned Department: {currentSession.department}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                      <div className="p-3 bg-[#FAF8F5] border border-[#D0E4DA]">
                        <div className="font-bold text-[#163A2D] flex items-center justify-between">
                          <span>Gradebook Submission</span>
                          <span className="text-[10px] bg-[#EAF2ED] text-[#163A2D] border border-[#163A2D] px-1.5 py-0.5 font-mono">Active</span>
                        </div>
                        <p className="text-[11px] text-[#4E7D68] mt-1">Midterm and Final assessment submission open.</p>
                      </div>

                      <div className="p-3 bg-[#FAF8F5] border border-[#D0E4DA]">
                        <div className="font-bold text-[#163A2D] flex items-center justify-between">
                          <span>Course Material Upload</span>
                          <span className="text-[10px] bg-[#FAF8F5] text-[#163A2D] border border-[#163A2D] px-1.5 py-0.5 font-mono">Enabled</span>
                        </div>
                        <p className="text-[11px] text-[#4E7D68] mt-1">Syllabus, slide decks, and assignment portal.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ========================================================
               UIVERSE 3D FLIP CARD AUTHENTICATION SYSTEM
               Log in / Sign up Flip + Teacher / Student Toggle Switch
               ======================================================== */
            <div className="uiverse-portal-wrapper py-1">
              {/* Dual Switch Controls Section */}
              <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-4 bg-[#FFFFFF] p-3 rounded-xl border border-[#DCEBE3] shadow-sm">
                {/* 1. Log In / Sign Up 3D Flip Toggle */}
                <div className="flex items-center space-x-3">
                  <span
                    onClick={() => {
                      setAuthMode('login');
                      setAuthError(null);
                    }}
                    className={`text-xs font-extrabold cursor-pointer transition-colors ${
                      authMode === 'login'
                        ? 'text-[#17342B] underline decoration-2 decoration-[#D9A74A] underline-offset-4'
                        : 'text-[#6A8F80] hover:text-[#17342B]'
                    }`}
                  >
                    Log In
                  </span>

                  <label className="uiverse-switch">
                    <input
                      type="checkbox"
                      className="uiverse-toggle"
                      checked={authMode === 'signup'}
                      onChange={(e) => {
                        setAuthMode(e.target.checked ? 'signup' : 'login');
                        setAuthError(null);
                      }}
                      aria-label="Toggle Log In and Sign Up"
                    />
                    <span className="uiverse-slider" />
                  </label>

                  <span
                    onClick={() => {
                      setAuthMode('signup');
                      setAuthError(null);
                    }}
                    className={`text-xs font-extrabold cursor-pointer transition-colors ${
                      authMode === 'signup'
                        ? 'text-[#17342B] underline decoration-2 decoration-[#D9A74A] underline-offset-4'
                        : 'text-[#6A8F80] hover:text-[#17342B]'
                    }`}
                  >
                    Sign Up
                  </span>
                </div>

                {/* Vertical separator on desktop */}
                <div className="hidden sm:block w-px h-6 bg-[#DCEBE3]" />

                {/* 2. Student / Teacher Role Toggle */}
                <div className="flex items-center space-x-3">
                  <span
                    onClick={() => handleCategoryChange('student')}
                    className={`text-xs font-extrabold cursor-pointer flex items-center space-x-1 transition-colors ${
                      userCategory === 'student'
                        ? 'text-[#17342B] underline decoration-2 decoration-[#D9A74A] underline-offset-4'
                        : 'text-[#6A8F80] hover:text-[#17342B]'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Student</span>
                  </span>

                  <label className="uiverse-switch">
                    <input
                      type="checkbox"
                      className="uiverse-toggle"
                      checked={userCategory === 'teacher'}
                      onChange={(e) => handleCategoryChange(e.target.checked ? 'teacher' : 'student')}
                      aria-label="Toggle Student and Teacher"
                    />
                    <span className="uiverse-slider" />
                  </label>

                  <span
                    onClick={() => handleCategoryChange('teacher')}
                    className={`text-xs font-extrabold cursor-pointer flex items-center space-x-1 transition-colors ${
                      userCategory === 'teacher'
                        ? 'text-[#17342B] underline decoration-2 decoration-[#D9A74A] underline-offset-4'
                        : 'text-[#6A8F80] hover:text-[#17342B]'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Teacher / Admin</span>
                  </span>
                </div>
              </div>

              {/* Authentication error box */}
              {authError && (
                <div className="mb-3 p-2.5 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-xs text-red-700 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{authError}</span>
                </div>
              )}

              {/* 3D Flip Card */}
              <div className="uiverse-flip-card">
                <div className={`uiverse-flip-card__inner ${authMode === 'signup' ? 'is-flipped' : ''}`}>
                  {/* FRONT: LOG IN FORM */}
                  <div className="uiverse-flip-card__front">
                    <div>
                      {/* Institutional Role Badge */}
                      <div className="inline-flex items-center space-x-1.5 bg-[#EFF6F2] border border-[#D1E5DB] text-[#1E3F35] font-mono text-[11px] font-bold px-3 py-1 rounded-md mb-2">
                        {userCategory === 'student' ? (
                          <>
                            <GraduationCap className="w-3.5 h-3.5 text-[#D9A74A]" />
                            <span>STUDENT PORTAL LOGIN</span>
                          </>
                        ) : (
                          <>
                            <BookOpen className="w-3.5 h-3.5 text-[#D9A74A]" />
                            <span>FACULTY & ADMIN LOGIN</span>
                          </>
                        )}
                      </div>

                      <h3 className="font-serif text-xl font-black text-[#17342B] tracking-tight">
                        Log In to your Account
                      </h3>
                      <p className="text-[#4A6E60] text-xs mt-0.5">
                        Please enter your institutional credentials to continue.
                      </p>
                    </div>

                    <form onSubmit={handleLoginSubmit} className="space-y-4 my-2">
                      <div className="text-left pt-2">
                        {/* From Uiverse.io by AbanoubMagdy1 - Original Code */}
                        <div className="wave-group w-full">
                          <input
                            type="text"
                            required
                            value={loginIdentifier}
                            onChange={(e) => {
                              setLoginIdentifier(e.target.value);
                              setAuthError(null);
                            }}
                            className="input w-full font-mono text-sm"
                          />
                          <span className="bar w-full"></span>
                          <label className="label">
                            {(userCategory === 'student' ? 'Student ID or Email' : 'Institutional Email / ID').split('').map((char, index) => (
                              <span
                                key={index}
                                className="label-char"
                                style={{ ['--index' as any]: index }}
                              >
                                {char === ' ' ? '\u00A0' : char}
                              </span>
                            ))}
                          </label>
                        </div>
                      </div>

                      <div className="text-left pt-2">
                        {/* From Uiverse.io by AbanoubMagdy1 - Original Code */}
                        <div className="wave-group w-full relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={loginPassword}
                            onChange={(e) => {
                              setLoginPassword(e.target.value);
                              setAuthError(null);
                            }}
                            className="input w-full font-mono text-sm pr-9"
                          />
                          <span className="bar w-full"></span>
                          <label className="label">
                            {'Password'.split('').map((char, index) => (
                              <span
                                key={index}
                                className="label-char"
                                style={{ ['--index' as any]: index }}
                              >
                                {char}
                              </span>
                            ))}
                          </label>
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-1 top-2.5 text-[#515151] hover:text-[#008000] cursor-pointer"
                            title={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-[#4A6E60] pt-1">
                        <label className="flex items-center space-x-1.5 cursor-pointer select-none">
                          <input type="checkbox" defaultChecked className="rounded text-[#244D40]" />
                          <span>Remember device</span>
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="uiverse-flip-card__btn w-full flex items-center justify-center space-x-2 cursor-pointer mt-3 transition-all duration-200 hover:scale-102 active:scale-98"
                      >
                        <span>Access {userCategory === 'student' ? 'Student' : 'Faculty & Admin'} Portal</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <div className="pt-2 border-t border-[#D0E4DA]">
                        <button
                          type="button"
                          onClick={handleGoogleSignIn}
                          disabled={googleLoading}
                          className="w-full py-2 px-3 bg-white hover:bg-[#EAF2ED] text-[#163A2D] border-2 border-[#163A2D] font-mono font-bold text-[11px] uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer transition-colors disabled:opacity-60"
                        >
                          <ShieldCheck className="w-4 h-4 text-[#163A2D]" />
                          <span>
                            {googleLoading
                              ? 'Connecting Google SSO...'
                              : 'Continue with Google (Admin Live Cloud SSO)'}
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* BACK: SIGN UP FORM */}
                  <div className="uiverse-flip-card__back">
                    <div>
                      <div className="inline-flex items-center space-x-1.5 bg-[#EFF6F2] border border-[#D1E5DB] text-[#163A2D] font-mono text-[11px] font-bold px-3 py-1 rounded-md mb-1.5">
                        {userCategory === 'student' ? (
                          <>
                            <UserCheck className="w-3.5 h-3.5 text-[#163A2D]" />
                            <span>STUDENT REGISTRATION</span>
                          </>
                        ) : (
                          <>
                            <Building className="w-3.5 h-3.5 text-[#163A2D]" />
                            <span>FACULTY ONBOARDING</span>
                          </>
                        )}
                      </div>

                      <h3 className="font-sans text-xl font-black text-[#163A2D] tracking-tight">
                        Create Portal Account
                      </h3>
                      <p className="text-[#4E7D68] text-xs mt-0.5">
                        Register for digital admission, courses & campus access
                      </p>
                    </div>

                    <form onSubmit={handleSignupSubmit} className="space-y-2 my-2">
                      <div className="text-left">
                        <label className="block text-[11px] font-bold text-[#163A2D] mb-0.5 uppercase tracking-wider">
                          Full Legal Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={signupName}
                          onChange={(e) => setSignupName(e.target.value)}
                          placeholder="e.g. Dr. Kazi Nazrul or Tanvir Hossain"
                          className="uiverse-flip-card__input"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-left">
                        <div>
                          <label className="block text-[11px] font-bold text-[#163A2D] mb-0.5 uppercase tracking-wider">
                            {userCategory === 'student' ? 'Student ID / HSC Roll' : 'Faculty Code'} *
                          </label>
                          <input
                            type="text"
                            required
                            value={signupId}
                            onChange={(e) => setSignupId(e.target.value)}
                            placeholder={userCategory === 'student' ? 'CCN-2026-...' : 'FAC-2026-...'}
                            className="uiverse-flip-card__input font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-[#163A2D] mb-0.5 uppercase tracking-wider">
                            Department
                          </label>
                          <select
                            value={signupDept}
                            onChange={(e) => setSignupDept(e.target.value)}
                            className="uiverse-flip-card__input text-xs"
                          >
                            <option value="Computer Science & Engineering">CSE</option>
                            <option value="Electrical & Electronic Engineering">EEE</option>
                            <option value="Civil Engineering">CE</option>
                            <option value="Business Administration">BBA / MBA</option>
                            <option value="Pharmacy">Pharmacy</option>
                            <option value="English Literature">English</option>
                            <option value="Law & Human Rights">LLB / LLM</option>
                          </select>
                        </div>
                      </div>

                      <div className="text-left">
                        <label className="block text-[11px] font-bold text-[#163A2D] mb-0.5 uppercase tracking-wider">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          placeholder="e.g. yourname@gmail.com"
                          className="uiverse-flip-card__input font-mono"
                        />
                      </div>

                      <div className="text-left">
                        <label className="block text-[11px] font-bold text-[#163A2D] mb-0.5 uppercase tracking-wider">
                          Set Password
                        </label>
                        <input
                          type="password"
                          required
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          placeholder="Create a strong password"
                          className="uiverse-flip-card__input font-mono"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={signupSuccess}
                        className="uiverse-flip-card__btn w-full flex items-center justify-center space-x-2 cursor-pointer mt-2 transition-all duration-200 hover:scale-102 active:scale-98"
                      >
                        {signupSuccess ? (
                          <span className="flex items-center space-x-1 text-emerald-950">
                            <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                            <span>Account Initialized...</span>
                          </span>
                        ) : (
                          <>
                            <span>Register {userCategory === 'student' ? 'Student' : 'Faculty'} Account</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isChangePassOpen}
        onClose={() => setIsChangePassOpen(false)}
        userSession={currentSession}
      />
    </div>
  );
}
