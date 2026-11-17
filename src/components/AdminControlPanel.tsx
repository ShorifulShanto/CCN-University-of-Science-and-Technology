import React, { useState, useMemo } from 'react';
import {
  ShieldAlert,
  Users,
  Bell,
  Image as ImageIcon,
  Trash2,
  Edit,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw,
  X,
  Activity,
  Save,
  Eye,
  EyeOff,
  Sparkles,
  Cloud,
  CloudUpload,
  GraduationCap,
  MessageSquare,
  Upload,
  Loader2,
} from 'lucide-react';
import { useCmsData, ADMIN_EMAIL } from '../lib/useCmsData';
import { uploadImageToCloudinary } from '../lib/cloudinary';
import { UserAccount } from '../lib/cmsState';
import {
  Notice,
  GalleryItem,
  UserSession,
  AdmissionApplication,
  ContactMessage,
} from '../types';

interface AdminControlPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentAdminEmail?: string;
  adminSession?: UserSession | null;
}

export default function AdminControlPanel({
  isOpen,
  onClose,
  currentAdminEmail = ADMIN_EMAIL,
}: AdminControlPanelProps) {
  const {
    notices,
    gallery,
    users,
    logs,
    admissions,
    contacts,
    isFirebaseAdmin,
    isCloudSeeded,
    cloudConnected,
    isSyncing,
    syncError,
    signInWithGoogle,
    syncBaselineToFirestore,
    addNotice,
    updateNotice,
    deleteNotice,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    createUser,
    updatePassword,
    updateUserStatus,
    updateAdmissionStatus,
    updateContactStatus,
    refresh,
  } = useCmsData();

  const [activeTab, setActiveTab] = useState<
    'users' | 'logs' | 'notices' | 'gallery' | 'admissions' | 'contacts'
  >('notices');

  // Users state
  const [userSearch, setUserSearch] = useState('');
  const [userFilterRole, setUserFilterRole] = useState<'all' | 'teacher' | 'student'>('all');
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [newPasswordValue, setNewPasswordValue] = useState('');
  const [showPasswords, setShowPasswords] = useState<{ [id: string]: boolean }>({});
  const [newUserModal, setNewUserModal] = useState(false);
  const [newUserData, setNewUserData] = useState<Partial<UserAccount>>({
    category: 'teacher',
    role: 'faculty',
    department: 'Computer Science & Engineering',
    status: 'Active',
    password: '123456',
  });

  // Notice state
  const [noticeSearch, setNoticeSearch] = useState('');
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [isAddingNotice, setIsAddingNotice] = useState(false);
  const [confirmDeleteNoticeId, setConfirmDeleteNoticeId] = useState<string | null>(null);
  const [noticeForm, setNoticeForm] = useState<Partial<Notice>>({
    category: 'academic',
    important: false,
    publishDate: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
  });

  // Gallery state
  const [gallerySearch, setGallerySearch] = useState('');
  const [editingGalleryItem, setEditingGalleryItem] = useState<GalleryItem | null>(null);
  const [isAddingGallery, setIsAddingGallery] = useState(false);
  const [confirmDeleteGalleryId, setConfirmDeleteGalleryId] = useState<string | null>(null);
  const [isUploadingGalleryImage, setIsUploadingGalleryImage] = useState(false);
  const [galleryUploadError, setGalleryUploadError] = useState<string | null>(null);
  const [galleryForm, setGalleryForm] = useState<Partial<GalleryItem>>({
    category: 'campus',
    date: 'Fall 2026',
  });

  // Feedback toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Filtered Users (Always runs unconditionally above any early return!)
  const filteredUsers = useMemo(() => {
    const clean = userSearch.trim().toLowerCase();
    return users.filter((u) => {
      const matchesSearch =
        !clean ||
        u.name.toLowerCase().includes(clean) ||
        u.email.toLowerCase().includes(clean) ||
        u.id.toLowerCase().includes(clean) ||
        u.department.toLowerCase().includes(clean);
      const matchesRole = userFilterRole === 'all' || u.category === userFilterRole;
      return matchesSearch && matchesRole;
    });
  }, [users, userSearch, userFilterRole]);

  const filteredNotices = useMemo(() => {
    const clean = noticeSearch.trim().toLowerCase();
    return notices.filter(
      (n) =>
        !clean ||
        n.title.toLowerCase().includes(clean) ||
        n.content.toLowerCase().includes(clean)
    );
  }, [notices, noticeSearch]);

  const filteredGallery = useMemo(() => {
    const clean = gallerySearch.trim().toLowerCase();
    return gallery.filter(
      (g) =>
        !clean ||
        g.title.toLowerCase().includes(clean) ||
        (g.caption && g.caption.toLowerCase().includes(clean))
    );
  }, [gallery, gallerySearch]);

  if (!isOpen) return null;

  const handleSavePassword = async (userId: string) => {
    if (!newPasswordValue.trim()) return;
    try {
      await updatePassword(userId, newPasswordValue.trim());
      setEditingUserId(null);
      setNewPasswordValue('');
      showToast('Password updated across real-time database.');
    } catch (err: any) {
      showToast(err?.message || 'Error updating password.');
    }
  };

  const handleResetDefaultPassword = async (userId: string) => {
    try {
      await updatePassword(userId, '123456');
      showToast('Password reset to default "123456"');
    } catch (err: any) {
      showToast(err?.message || 'Error resetting password.');
    }
  };

  const handleToggleStatus = async (user: UserAccount) => {
    const nextStatus = user.status === 'Active' ? 'Suspended' : 'Active';
    try {
      await updateUserStatus(user.id, nextStatus);
      showToast(`Account status updated to ${nextStatus}`);
    } catch (err: any) {
      showToast(err?.message || 'Error updating account status.');
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserData.id || !newUserData.name || !newUserData.email) return;

    const account: UserAccount = {
      id: newUserData.id.trim(),
      name: newUserData.name.trim(),
      email: newUserData.email.trim(),
      role: newUserData.category === 'teacher' ? 'faculty' : 'student',
      category: newUserData.category || 'student',
      department: newUserData.department || 'Computer Science & Engineering',
      designation:
        newUserData.designation ||
        (newUserData.category === 'teacher' ? 'Lecturer' : undefined),
      password: newUserData.password || '123456',
      status: (newUserData.status as UserAccount['status']) || 'Active',
      createdAt: new Date().toLocaleString(),
    };

    try {
      await createUser(account);
      setNewUserModal(false);
      setNewUserData({
        category: 'teacher',
        role: 'faculty',
        department: 'Computer Science & Engineering',
        status: 'Active',
        password: '123456',
      });
      showToast(`User ${account.name} created & synced live!`);
    } catch (err: any) {
      showToast(err?.message || 'Could not create user.');
    }
  };

  const handleSaveNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeForm.title || !noticeForm.content) return;

    try {
      if (editingNotice) {
        await updateNotice({
          ...editingNotice,
          title: noticeForm.title || '',
          category: (noticeForm.category as Notice['category']) || 'general',
          publishDate: noticeForm.publishDate || editingNotice.publishDate,
          content: noticeForm.content || '',
          important: !!noticeForm.important,
          pdfUrl: noticeForm.pdfUrl,
          attachmentName: noticeForm.attachmentName,
        });
        setEditingNotice(null);
        showToast('Notice updated live for all visitors!');
      } else {
        const newNotice: Notice = {
          id: `notice_${Date.now()}`,
          title: noticeForm.title || '',
          category: (noticeForm.category as Notice['category']) || 'general',
          publishDate:
            noticeForm.publishDate ||
            new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
          content: noticeForm.content || '',
          important: !!noticeForm.important,
          pdfUrl: noticeForm.pdfUrl,
          attachmentName: noticeForm.attachmentName,
        };
        await addNotice(newNotice);
        setIsAddingNotice(false);
        showToast('New notice published live!');
      }
      setNoticeForm({ category: 'academic', important: false });
    } catch (err: any) {
      showToast(err?.message || 'Error saving notice.');
    }
  };

  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.title || !galleryForm.imageUrl) return;

    try {
      if (editingGalleryItem) {
        await updateGalleryItem({
          ...editingGalleryItem,
          title: galleryForm.title || '',
          imageUrl: galleryForm.imageUrl || '',
          caption: galleryForm.caption || galleryForm.title || 'CCNUST Campus',
          category: (galleryForm.category as GalleryItem['category']) || 'campus',
          date: galleryForm.date || 'Fall 2026',
        });
        setEditingGalleryItem(null);
        showToast('Gallery photo updated live!');
      } else {
        const newItem: GalleryItem = {
          id: `gallery_${Date.now()}`,
          title: galleryForm.title || '',
          imageUrl: galleryForm.imageUrl || '',
          caption: galleryForm.caption || galleryForm.title || 'CCNUST Campus Photo',
          category: (galleryForm.category as GalleryItem['category']) || 'campus',
          date: galleryForm.date || 'Fall 2026',
        };
        await addGalleryItem(newItem);
        setIsAddingGallery(false);
        showToast('New campus photo published to live gallery!');
      }
      setGalleryForm({ category: 'campus', date: 'Fall 2026' });
      setGalleryUploadError(null);
    } catch (err: any) {
      showToast(err?.message || 'Error saving gallery item.');
    }
  };

  const handleGalleryFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    setIsUploadingGalleryImage(true);
    setGalleryUploadError(null);
    try {
      const result = await uploadImageToCloudinary(
        file,
        'ccn_university',
        galleryForm.title || file.name
      );
      setGalleryForm((prev) => ({
        ...prev,
        imageUrl: result.url,
        title: prev.title || file.name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' '),
      }));
      showToast('Photo uploaded to Cloudinary CDN!');
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Failed to upload image. Paste URL or local path.';
      setGalleryUploadError(msg);
      showToast(msg);
    } finally {
      setIsUploadingGalleryImage(false);
    }
  };

  const handleConnectGoogleAdmin = async () => {
    try {
      const fbUser = await signInWithGoogle();
      if (fbUser) {
        showToast(`Connected live cloud sync as ${fbUser.email}`);
      }
    } catch (err: any) {
      showToast(err?.message || 'Google Cloud SSO cancelled.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] max-w-6xl w-full shadow-2xl border-2 border-[#163A2D] overflow-hidden relative animate-in zoom-in-95 duration-150 max-h-[95vh] flex flex-col">
        {/* Toast feedback alert */}
        {toastMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-[#163A2D] border-2 border-[#FAD02C] text-[#FAD02C] px-4 py-2 font-mono text-xs font-bold shadow-xl flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#FAD02C]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Header */}
        <div className="bg-[#163A2D] text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 border-b-2 border-[#FAD02C]/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#FAD02C] border border-[#163A2D] flex items-center justify-center text-[#163A2D] font-black shrink-0">
              <ShieldAlert className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-[11px] font-mono font-black text-[#FAD02C] uppercase tracking-wider flex flex-wrap items-center gap-2">
                <span>CCNUST REAL-TIME CMS & ADMIN COCKPIT</span>
                <span
                  className={`px-2 py-0.5 text-[9px] border font-bold flex items-center space-x-1 ${
                    isFirebaseAdmin
                      ? 'bg-emerald-950/70 text-emerald-300 border-emerald-400/50'
                      : 'bg-[#FAF8F5]/15 text-[#FAD02C] border-[#FAD02C]/40'
                  }`}
                >
                  <Cloud className="w-3 h-3" />
                  <span>
                    {isFirebaseAdmin
                      ? isCloudSeeded
                        ? 'FIRESTORE LIVE SYNC ACTIVE'
                        : 'CONNECTED • SYNCING CLOUD'
                      : cloudConnected
                      ? 'CLOUD READ • DEMO ADMIN'
                      : 'LOCAL PREVIEW'}
                  </span>
                </span>
              </div>
              <h2 className="font-sans text-base sm:text-xl font-black text-white uppercase tracking-tight">
                Authority: {currentAdminEmail}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2 self-end sm:self-auto">
            {!isFirebaseAdmin ? (
              <button
                type="button"
                onClick={handleConnectGoogleAdmin}
                className="px-3 py-1.5 bg-[#FAD02C] hover:bg-[#FEF08A] text-[#163A2D] font-mono font-black text-[11px] uppercase tracking-wider cursor-pointer border border-[#FAD02C] flex items-center space-x-1.5"
                title="Authenticate via Google SSO to broadcast live updates to all connected visitors"
              >
                <CloudUpload className="w-3.5 h-3.5" />
                <span>Connect Google Cloud Sync</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => syncBaselineToFirestore()}
                disabled={isSyncing}
                className="px-3 py-1.5 bg-[#0D241C] hover:bg-[#21513F] text-[#FAD02C] font-mono font-bold text-[11px] uppercase tracking-wider cursor-pointer border border-[#FAD02C]/40 flex items-center space-x-1.5 disabled:opacity-60"
                title="Push baseline campus data & photos to live Firestore database"
              >
                <CloudUpload className="w-3.5 h-3.5" />
                <span>{isSyncing ? 'Syncing...' : isCloudSeeded ? 'Re-Sync Baseline' : 'Seed Cloud DB'}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-[#FAF8F5] hover:text-[#FAD02C] hover:bg-[#0D241C] transition-colors cursor-pointer"
              aria-label="Close admin control"
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Cloud Sync Banner if not verified Google SSO */}
        {(!isFirebaseAdmin || syncError) && (
          <div className="bg-amber-50 border-b border-amber-200 px-6 py-2 text-[11px] font-mono text-amber-900 flex flex-wrap items-center justify-between gap-2">
            <span>
              {syncError
                ? `Sync Notice: ${syncError}`
                : 'Tip: Connect with Google SSO (md.si.shanto001@gmail.com) so your Notice Board, Gallery, Admissions & User edits push live in real time across all users.'}
            </span>
          </div>
        )}

        {/* Navigation Tabs Bar */}
        <div className="bg-[#0D241C] px-4 sm:px-6 py-2.5 flex flex-wrap gap-1.5 sm:gap-2 border-b border-[#163A2D]">
          <button
            onClick={() => setActiveTab('notices')}
            className={`px-3 py-1.5 font-mono font-bold text-[11px] flex items-center space-x-1.5 transition-all cursor-pointer uppercase ${
              activeTab === 'notices'
                ? 'bg-[#FAD02C] text-[#163A2D] shadow-sm font-black'
                : 'text-[#FAF8F5]/80 hover:text-white hover:bg-[#163A2D]'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Notices ({notices.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-3 py-1.5 font-mono font-bold text-[11px] flex items-center space-x-1.5 transition-all cursor-pointer uppercase ${
              activeTab === 'gallery'
                ? 'bg-[#FAD02C] text-[#163A2D] shadow-sm font-black'
                : 'text-[#FAF8F5]/80 hover:text-white hover:bg-[#163A2D]'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Gallery ({gallery.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('admissions')}
            className={`px-3 py-1.5 font-mono font-bold text-[11px] flex items-center space-x-1.5 transition-all cursor-pointer uppercase ${
              activeTab === 'admissions'
                ? 'bg-[#FAD02C] text-[#163A2D] shadow-sm font-black'
                : 'text-[#FAF8F5]/80 hover:text-white hover:bg-[#163A2D]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Admissions ({admissions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-3 py-1.5 font-mono font-bold text-[11px] flex items-center space-x-1.5 transition-all cursor-pointer uppercase ${
              activeTab === 'contacts'
                ? 'bg-[#FAD02C] text-[#163A2D] shadow-sm font-black'
                : 'text-[#FAF8F5]/80 hover:text-white hover:bg-[#163A2D]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Inquiries ({contacts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1.5 font-mono font-bold text-[11px] flex items-center space-x-1.5 transition-all cursor-pointer uppercase ${
              activeTab === 'users'
                ? 'bg-[#FAD02C] text-[#163A2D] shadow-sm font-black'
                : 'text-[#FAF8F5]/80 hover:text-white hover:bg-[#163A2D]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Accounts ({users.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`px-3 py-1.5 font-mono font-bold text-[11px] flex items-center space-x-1.5 transition-all cursor-pointer uppercase ${
              activeTab === 'logs'
                ? 'bg-[#FAD02C] text-[#163A2D] shadow-sm font-black'
                : 'text-[#FAF8F5]/80 hover:text-white hover:bg-[#163A2D]'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Audit Trail ({logs.length})</span>
          </button>
        </div>

        {/* Tab Contents Area */}
        <div className="p-5 sm:p-6 overflow-y-auto grow text-[#163A2D] text-xs bg-[#FAF8F5]">
          {/* TAB: NOTICES */}
          {activeTab === 'notices' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-3 border-2 border-[#163A2D] shadow-xs">
                <div className="relative grow sm:grow-0 sm:w-72">
                  <Search className="w-4 h-4 text-[#4E7D68] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search circulars and notices..."
                    value={noticeSearch}
                    onChange={(e) => setNoticeSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-[#FAF8F5] border border-[#D0E4DA] text-xs font-semibold focus:outline-none focus:border-[#163A2D] text-[#163A2D]"
                  />
                </div>

                <button
                  onClick={() => {
                    setIsAddingNotice(true);
                    setEditingNotice(null);
                    setNoticeForm({
                      category: 'academic',
                      important: false,
                      publishDate: new Date().toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      }),
                    });
                  }}
                  className="bg-[#163A2D] hover:bg-[#0D241C] text-[#FAD02C] px-3.5 py-1.5 font-bold flex items-center space-x-1.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 cursor-pointer border border-[#163A2D]"
                >
                  <Plus className="w-4 h-4 text-[#FAD02C] stroke-[2.5]" />
                  <span>Publish New Notice</span>
                </button>
              </div>

              {(isAddingNotice || editingNotice) && (
                <form
                  onSubmit={handleSaveNotice}
                  className="bg-white border-2 border-[#163A2D] p-4 shadow-md space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-[#D0E4DA] pb-2">
                    <h4 className="font-sans font-black text-sm text-[#163A2D] uppercase tracking-tight">
                      {editingNotice ? 'Edit University Notice' : 'Publish New Notice to Website'}
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingNotice(false);
                        setEditingNotice(null);
                      }}
                      className="text-[#4E7D68] hover:text-[#163A2D] cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-[#163A2D] mb-1">
                        Notice Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={noticeForm.title || ''}
                        onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                        placeholder="e.g. Schedule of Fall 2026 Semester Final Examinations"
                        className="w-full p-2 bg-[#FAF8F5] border border-[#D0E4DA] text-xs font-semibold text-[#163A2D] focus:border-[#163A2D]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#163A2D] mb-1">
                        Category
                      </label>
                      <select
                        value={noticeForm.category || 'academic'}
                        onChange={(e) =>
                          setNoticeForm({
                            ...noticeForm,
                            category: e.target.value as Notice['category'],
                          })
                        }
                        className="w-full p-2 bg-[#FAF8F5] border border-[#D0E4DA] text-xs font-semibold text-[#163A2D] focus:border-[#163A2D]"
                      >
                        <option value="admission">Admission</option>
                        <option value="academic">Academic</option>
                        <option value="examination">Examination</option>
                        <option value="administrative">Administrative</option>
                        <option value="general">General</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#163A2D] mb-1">
                      Notice Content / Body *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={noticeForm.content || ''}
                      onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })}
                      placeholder="Enter detailed notice information, instructions, and dates..."
                      className="w-full p-2 bg-[#FAF8F5] border border-[#D0E4DA] text-xs text-[#163A2D] focus:border-[#163A2D]"
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-1.5 cursor-pointer font-bold text-[#163A2D]">
                      <input
                        type="checkbox"
                        checked={!!noticeForm.important}
                        onChange={(e) =>
                          setNoticeForm({ ...noticeForm, important: e.target.checked })
                        }
                        className="text-[#163A2D]"
                      />
                      <span>Mark as Urgent / Important Banner</span>
                    </label>
                  </div>

                  <div className="flex justify-end space-x-2 pt-2 border-t border-[#D0E4DA]">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingNotice(false);
                        setEditingNotice(null);
                      }}
                      className="px-3 py-1.5 border border-[#D0E4DA] font-bold text-[#4E7D68] hover:bg-[#FAF8F5] cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#163A2D] hover:bg-[#0D241C] text-[#FAD02C] px-4 py-1.5 font-bold shadow-sm cursor-pointer flex items-center space-x-1 transition-all duration-200 hover:-translate-y-0.5 border border-[#163A2D]"
                    >
                      <Save className="w-3.5 h-3.5 text-[#FAD02C]" />
                      <span>{editingNotice ? 'Update Notice' : 'Publish Live'}</span>
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-2">
                {filteredNotices.map((notice) => (
                  <div
                    key={notice.id}
                    className="bg-white border-2 border-[#163A2D] p-3.5 flex items-start justify-between gap-4 shadow-xs"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                            notice.important
                              ? 'bg-red-50 text-red-800 border border-red-300'
                              : 'bg-[#FAF8F5] text-[#163A2D] border border-[#163A2D]'
                          }`}
                        >
                          {notice.category} {notice.important && '• URGENT'}
                        </span>
                        <span className="text-[11px] text-[#4E7D68] font-mono">
                          {notice.publishDate}
                        </span>
                      </div>
                      <h4 className="font-sans font-bold text-sm text-[#163A2D] mt-1">
                        {notice.title}
                      </h4>
                      <p className="text-[#4E7D68] text-xs mt-0.5 line-clamp-2">{notice.content}</p>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        onClick={() => {
                          setEditingNotice(notice);
                          setIsAddingNotice(false);
                          setNoticeForm(notice);
                        }}
                        className="p-1.5 text-[#163A2D] hover:text-[#0D241C] bg-[#FAF8F5] hover:bg-[#D0E4DA] border border-[#163A2D] cursor-pointer transition-colors"
                        title="Edit notice"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      {confirmDeleteNoticeId === notice.id ? (
                        <div className="flex items-center space-x-1">
                          <button
                            type="button"
                            onClick={async () => {
                              await deleteNotice(notice.id);
                              setConfirmDeleteNoticeId(null);
                              showToast('Notice removed from live website.');
                            }}
                            className="px-2 py-1 bg-red-600 text-white font-mono font-bold text-[10px] cursor-pointer"
                          >
                            Confirm
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteNoticeId(null)}
                            className="px-2 py-1 bg-slate-200 text-slate-800 font-mono text-[10px] cursor-pointer"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteNoticeId(notice.id)}
                          className="p-1.5 text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 border border-red-200 cursor-pointer transition-colors"
                          title="Delete notice"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: GALLERY */}
          {activeTab === 'gallery' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-3 border-2 border-[#163A2D] shadow-xs">
                <div className="relative grow sm:grow-0 sm:w-72">
                  <Search className="w-4 h-4 text-[#4E7D68] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search campus photos..."
                    value={gallerySearch}
                    onChange={(e) => setGallerySearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-[#FAF8F5] border border-[#D0E4DA] text-xs font-semibold focus:outline-none focus:border-[#163A2D] text-[#163A2D]"
                  />
                </div>

                <button
                  onClick={() => {
                    setIsAddingGallery(true);
                    setEditingGalleryItem(null);
                    setGalleryUploadError(null);
                    setGalleryForm({ category: 'campus', date: 'Fall 2026' });
                  }}
                  className="bg-[#163A2D] hover:bg-[#0D241C] text-[#FAD02C] px-3.5 py-1.5 font-bold flex items-center space-x-1.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 cursor-pointer border border-[#163A2D]"
                >
                  <Plus className="w-4 h-4 text-[#FAD02C] stroke-[2.5]" />
                  <span>Add Gallery Photo</span>
                </button>
              </div>

              {(isAddingGallery || editingGalleryItem) && (
                <form
                  onSubmit={handleSaveGallery}
                  className="bg-white border-2 border-[#163A2D] p-4 shadow-md space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-[#D0E4DA] pb-2">
                    <h4 className="font-sans font-black text-sm text-[#163A2D] uppercase tracking-tight">
                      {editingGalleryItem ? 'Edit Gallery Photo' : 'Add New Photo to Campus Gallery'}
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingGallery(false);
                        setEditingGalleryItem(null);
                      }}
                      className="text-[#4E7D68] hover:text-[#163A2D] cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-[#163A2D] mb-1">
                        Photo Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={galleryForm.title || ''}
                        onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                        placeholder="e.g. Kotbari Main Campus Walkway"
                        className="w-full p-2 bg-[#FAF8F5] border border-[#D0E4DA] text-xs font-semibold text-[#163A2D] focus:border-[#163A2D]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#163A2D] mb-1">
                        Category
                      </label>
                      <select
                        value={galleryForm.category || 'campus'}
                        onChange={(e) =>
                          setGalleryForm({
                            ...galleryForm,
                            category: e.target.value as GalleryItem['category'],
                          })
                        }
                        className="w-full p-2 bg-[#FAF8F5] border border-[#D0E4DA] text-xs font-semibold text-[#163A2D] focus:border-[#163A2D]"
                      >
                        <option value="campus">Campus & Grounds</option>
                        <option value="academic">Academic & Computing Labs</option>
                        <option value="events">University Events & Convocation</option>
                        <option value="seminar">Seminars & Conferences</option>
                        <option value="cultural">Art & Cultural</option>
                        <option value="student_life">Student Life</option>
                        <option value="sports">Sports & Athletics</option>
                        <option value="international">International Delegations</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#163A2D] mb-1">
                      Image Path, External URL, or Direct Upload (Supports /assets/..., https://..., or File Upload) *
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        required
                        value={galleryForm.imageUrl || ''}
                        onChange={(e) => {
                          setGalleryUploadError(null);
                          setGalleryForm({ ...galleryForm, imageUrl: e.target.value });
                        }}
                        placeholder="/assets/aistudio/... or https://res.cloudinary.com/..."
                        className="flex-1 p-2 bg-[#FAF8F5] border border-[#D0E4DA] text-xs font-mono text-[#163A2D] focus:border-[#163A2D]"
                      />
                      <label
                        className={`shrink-0 px-3.5 py-2 border border-[#163A2D] font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors ${
                          isUploadingGalleryImage
                            ? 'bg-[#D0E4DA] text-[#163A2D] cursor-wait'
                            : 'bg-[#FAF8F5] hover:bg-[#163A2D] text-[#163A2D] hover:text-[#FAD02C] cursor-pointer'
                        }`}
                      >
                        {isUploadingGalleryImage ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Upload className="w-3.5 h-3.5" />
                        )}
                        <span>{isUploadingGalleryImage ? 'Uploading...' : 'Upload Photo'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          disabled={isUploadingGalleryImage}
                          onChange={handleGalleryFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    {galleryUploadError && (
                      <p className="mt-1.5 text-[11px] font-semibold text-red-700 bg-red-50 border border-red-200 px-2.5 py-1">
                        {galleryUploadError}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#163A2D] mb-1">
                      Caption / Description
                    </label>
                    <textarea
                      rows={2}
                      value={galleryForm.caption || ''}
                      onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })}
                      placeholder="Brief description of the campus view, lab, or event..."
                      className="w-full p-2 bg-[#FAF8F5] border border-[#D0E4DA] text-xs text-[#163A2D] focus:border-[#163A2D]"
                    />
                  </div>

                  {galleryForm.imageUrl && (
                    <div className="p-2 bg-[#FAF8F5] border border-[#D0E4DA] flex items-center space-x-3">
                      <img
                        src={galleryForm.imageUrl}
                        alt="Preview"
                        className="w-16 h-12 object-cover border border-[#163A2D]"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            '/assets/aistudio/2387c88a-009f-458a-bc56-fe24b26a4c06_c366e284.jpg';
                        }}
                      />
                      <span className="text-[11px] text-[#4E7D68]">Live preview thumbnail</span>
                    </div>
                  )}

                  <div className="flex justify-end space-x-2 pt-2 border-t border-[#D0E4DA]">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingGallery(false);
                        setEditingGalleryItem(null);
                      }}
                      className="px-3 py-1.5 border border-[#D0E4DA] font-bold text-[#4E7D68] hover:bg-[#FAF8F5] cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#163A2D] hover:bg-[#0D241C] text-[#FAD02C] px-4 py-1.5 font-bold shadow-sm cursor-pointer flex items-center space-x-1 transition-all duration-200 hover:-translate-y-0.5 border border-[#163A2D]"
                    >
                      <Save className="w-3.5 h-3.5 text-[#FAD02C]" />
                      <span>{editingGalleryItem ? 'Update Photo' : 'Add to Gallery'}</span>
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredGallery.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border-2 border-[#163A2D] overflow-hidden shadow-xs flex flex-col justify-between"
                  >
                    <div className="relative h-36 overflow-hidden bg-[#FAF8F5]">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            '/assets/aistudio/2387c88a-009f-458a-bc56-fe24b26a4c06_c366e284.jpg';
                        }}
                      />
                      <span className="absolute top-2 left-2 bg-[#163A2D] text-[#FAD02C] text-[10px] font-bold px-2 py-0.5 border border-[#FAD02C]/40">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-3">
                      <h4 className="font-sans font-bold text-xs text-[#163A2D] line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-[#4E7D68] text-[11px] line-clamp-2 mt-0.5">
                        {item.caption}
                      </p>

                      <div className="flex items-center justify-end space-x-1.5 mt-3 pt-2 border-t border-[#D0E4DA]">
                        <button
                          onClick={() => {
                            setEditingGalleryItem(item);
                            setIsAddingGallery(false);
                            setGalleryForm(item);
                          }}
                          className="p-1.5 text-[#163A2D] hover:text-[#0D241C] bg-[#FAF8F5] hover:bg-[#D0E4DA] border border-[#163A2D] cursor-pointer transition-colors"
                          title="Edit image details"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        {confirmDeleteGalleryId === item.id ? (
                          <div className="flex items-center space-x-1">
                            <button
                              type="button"
                              onClick={async () => {
                                await deleteGalleryItem(item.id);
                                setConfirmDeleteGalleryId(null);
                                showToast('Photo removed from live gallery.');
                              }}
                              className="px-2 py-1 bg-red-600 text-white font-mono font-bold text-[10px] cursor-pointer"
                            >
                              Delete
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteGalleryId(null)}
                              className="px-2 py-1 bg-slate-200 text-slate-800 font-mono text-[10px] cursor-pointer"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteGalleryId(item.id)}
                            className="p-1.5 text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 border border-red-200 cursor-pointer transition-colors"
                            title="Delete photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: ADMISSIONS INTAKE */}
          {activeTab === 'admissions' && (
            <div className="space-y-4">
              <div className="bg-white p-3 border-2 border-[#163A2D] flex items-center justify-between">
                <div>
                  <h4 className="font-sans font-black text-base text-[#163A2D] uppercase">
                    Live Student Admission Applications
                  </h4>
                  <p className="text-[11px] text-[#4E7D68]">
                    Review submitted Fall 2026 applications and update admission status in real time.
                  </p>
                </div>
                <span className="font-mono font-bold text-xs bg-[#EAF2ED] px-3 py-1 border border-[#163A2D]">
                  Total: {admissions.length}
                </span>
              </div>

              {admissions.length === 0 ? (
                <div className="bg-white border-2 border-[#163A2D] p-10 text-center text-[#4E7D68]">
                  No admission applications received yet. Applications submitted via "Apply Online" appear here live.
                </div>
              ) : (
                <div className="space-y-3">
                  {admissions.map((app) => (
                    <div
                      key={app.id}
                      className="bg-white border-2 border-[#163A2D] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[11px] font-black bg-[#163A2D] text-[#FAD02C] px-2 py-0.5">
                            {app.trackingNumber}
                          </span>
                          <span className="font-mono text-[11px] font-bold text-[#4E7D68]">
                            {app.submittedAt}
                          </span>
                          {app.quotaCategory && (
                            <span className="font-mono text-[10px] bg-[#EAF2ED] border border-[#D0E4DA] px-2 py-0.5 font-bold">
                              {app.quotaCategory}
                            </span>
                          )}
                        </div>
                        <h5 className="font-sans font-black text-sm text-[#163A2D]">
                          {app.applicantName} — {app.programName || app.programId}
                        </h5>
                        <div className="font-mono text-[11px] text-[#4E7D68]">
                          Email: {app.email} • Phone: {app.phone} • SSC GPA: {app.sscGpa} • HSC GPA:{' '}
                          {app.hscGpa}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <label className="text-[10px] font-mono font-bold uppercase text-[#4E7D68]">
                          Status:
                        </label>
                        <select
                          value={app.status}
                          onChange={async (e) => {
                            await updateAdmissionStatus(
                              app.id,
                              e.target.value as AdmissionApplication['status']
                            );
                            showToast(`Application ${app.trackingNumber} marked ${e.target.value}`);
                          }}
                          className="p-1.5 bg-[#FAF8F5] border-2 border-[#163A2D] font-mono text-xs font-bold text-[#163A2D]"
                        >
                          <option value="Received">Received</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Test Scheduled">Test Scheduled</option>
                          <option value="Admitted">Admitted</option>
                          <option value="Waitlisted">Waitlisted</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: CONTACT INQUIRIES */}
          {activeTab === 'contacts' && (
            <div className="space-y-4">
              <div className="bg-white p-3 border-2 border-[#163A2D] flex items-center justify-between">
                <div>
                  <h4 className="font-sans font-black text-base text-[#163A2D] uppercase">
                    Visitor Inquiries & Campus Messages
                  </h4>
                  <p className="text-[11px] text-[#4E7D68]">
                    Messages submitted via the Home and About/Contact inquiry desks.
                  </p>
                </div>
                <span className="font-mono font-bold text-xs bg-[#EAF2ED] px-3 py-1 border border-[#163A2D]">
                  Total: {contacts.length}
                </span>
              </div>

              {contacts.length === 0 ? (
                <div className="bg-white border-2 border-[#163A2D] p-10 text-center text-[#4E7D68]">
                  No contact inquiries received yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {contacts.map((msg) => (
                    <div
                      key={msg.id}
                      className="bg-white border-2 border-[#163A2D] p-4 flex flex-col md:flex-row md:items-start justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[10px] font-bold uppercase bg-[#EAF2ED] border border-[#163A2D]/30 px-2 py-0.5">
                            {msg.subject}
                          </span>
                          <span className="font-mono text-[11px] text-[#4E7D68]">
                            {msg.submittedAt}
                          </span>
                        </div>
                        <h5 className="font-sans font-black text-sm text-[#163A2D]">
                          {msg.name} ({msg.email}
                          {msg.phone ? ` • ${msg.phone}` : ''})
                        </h5>
                        <p className="text-xs text-[#4E7D68] whitespace-pre-line">{msg.message}</p>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <select
                          value={msg.status}
                          onChange={async (e) => {
                            await updateContactStatus(
                              msg.id,
                              e.target.value as ContactMessage['status']
                            );
                            showToast(`Inquiry status updated to ${e.target.value}`);
                          }}
                          className="p-1.5 bg-[#FAF8F5] border-2 border-[#163A2D] font-mono text-xs font-bold text-[#163A2D]"
                        >
                          <option value="New">New</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: USERS & PASSWORDS */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-3 border-2 border-[#163A2D] shadow-xs">
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <div className="relative grow sm:grow-0 sm:w-64">
                    <Search className="w-4 h-4 text-[#4E7D68] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search name, ID, email, dept..."
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 bg-[#FAF8F5] border border-[#D0E4DA] text-xs font-semibold focus:outline-none focus:border-[#163A2D] text-[#163A2D]"
                    />
                  </div>

                  <div className="flex gap-1">
                    {(['all', 'teacher', 'student'] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => setUserFilterRole(r)}
                        className={`px-2.5 py-1 text-[11px] font-bold capitalize transition-colors cursor-pointer ${
                          userFilterRole === r
                            ? 'bg-[#163A2D] text-[#FAD02C]'
                            : 'bg-[#FAF8F5] text-[#163A2D] border border-[#D0E4DA] hover:bg-[#D0E4DA]'
                        }`}
                      >
                        {r === 'all' ? 'All Roles' : `${r}s`}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setNewUserModal(true)}
                  className="bg-[#163A2D] hover:bg-[#0D241C] text-[#FAD02C] px-3.5 py-1.5 font-bold flex items-center space-x-1.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 cursor-pointer border border-[#163A2D]"
                >
                  <Plus className="w-4 h-4 text-[#FAD02C] stroke-[2.5]" />
                  <span>Add New User</span>
                </button>
              </div>

              <div className="bg-white border-2 border-[#163A2D] shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#163A2D] text-[#FAD02C] text-[11px] font-mono uppercase tracking-wider">
                        <th className="p-3">User & Identity</th>
                        <th className="p-3">Role / Dept</th>
                        <th className="p-3">Account Status</th>
                        <th className="p-3">Password</th>
                        <th className="p-3">Last Login</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D0E4DA] text-xs">
                      {filteredUsers.map((u) => {
                        const isShowingPass = showPasswords[u.id];
                        const isEditingThisUser = editingUserId === u.id;
                        const isSuperAdmin = u.email.toLowerCase() === ADMIN_EMAIL;

                        return (
                          <tr key={u.id} className="hover:bg-[#FAF8F5] transition-colors">
                            <td className="p-3">
                              <div className="font-bold text-[#163A2D] flex items-center space-x-1.5">
                                <span>{u.name}</span>
                                {isSuperAdmin && (
                                  <span className="bg-[#FAD02C] text-[#163A2D] text-[9px] font-mono font-black px-1.5 py-0.5 border border-[#163A2D]">
                                    ADMIN
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] font-mono text-[#4E7D68]">ID: {u.id}</div>
                              <div className="text-[11px] text-[#4E7D68] underline">{u.email}</div>
                            </td>

                            <td className="p-3">
                              <span
                                className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase mb-1 ${
                                  u.category === 'teacher'
                                    ? 'bg-[#D0E4DA] text-[#163A2D] border border-[#163A2D]/30'
                                    : 'bg-[#FAF8F5] text-[#163A2D] border border-[#163A2D]'
                                }`}
                              >
                                {u.category}
                              </span>
                              <div className="text-[11px] text-[#163A2D] font-bold">
                                {u.department}
                              </div>
                              {u.designation && (
                                <div className="text-[10px] text-[#4E7D68] font-medium">
                                  {u.designation}
                                </div>
                              )}
                            </td>

                            <td className="p-3">
                              <button
                                onClick={() => !isSuperAdmin && handleToggleStatus(u)}
                                disabled={isSuperAdmin}
                                className={`inline-flex items-center space-x-1 px-2.5 py-1 text-[10px] font-bold cursor-pointer transition-all ${
                                  u.status === 'Active'
                                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                                    : u.status === 'Suspended'
                                    ? 'bg-red-50 text-red-800 border border-red-300'
                                    : 'bg-amber-50 text-amber-800 border border-amber-300'
                                }`}
                              >
                                {u.status === 'Active' ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                                ) : (
                                  <XCircle className="w-3.5 h-3.5 text-red-700" />
                                )}
                                <span>{u.status}</span>
                              </button>
                            </td>

                            <td className="p-3">
                              {isEditingThisUser ? (
                                <div className="flex items-center space-x-1">
                                  <input
                                    type="text"
                                    value={newPasswordValue}
                                    onChange={(e) => setNewPasswordValue(e.target.value)}
                                    placeholder="Enter new pass"
                                    className="w-28 px-2 py-1 bg-white border-2 border-[#163A2D] text-xs font-mono font-bold text-[#163A2D]"
                                  />
                                  <button
                                    onClick={() => handleSavePassword(u.id)}
                                    className="bg-[#163A2D] text-[#FAD02C] p-1 hover:bg-[#0D241C] cursor-pointer"
                                    title="Save password"
                                  >
                                    <Save className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => setEditingUserId(null)}
                                    className="bg-[#D0E4DA] text-[#163A2D] p-1 hover:bg-[#FAF8F5] cursor-pointer"
                                    title="Cancel"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center space-x-2">
                                  <div className="font-mono text-xs font-bold text-[#163A2D] bg-[#FAF8F5] px-2 py-0.5 border border-[#D0E4DA]">
                                    {isShowingPass ? u.password || '123456' : '••••••••'}
                                  </div>
                                  <button
                                    onClick={() =>
                                      setShowPasswords((prev) => ({ ...prev, [u.id]: !prev[u.id] }))
                                    }
                                    className="text-[#4E7D68] hover:text-[#163A2D] cursor-pointer"
                                    title={isShowingPass ? 'Hide password' : 'Show password'}
                                  >
                                    {isShowingPass ? (
                                      <EyeOff className="w-3.5 h-3.5" />
                                    ) : (
                                      <Eye className="w-3.5 h-3.5" />
                                    )}
                                  </button>
                                  <button
                                    onClick={() => {
                                      setEditingUserId(u.id);
                                      setNewPasswordValue(u.password || '123456');
                                    }}
                                    className="text-[#4E7D68] hover:text-[#163A2D] cursor-pointer"
                                    title="Edit Password"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              )}
                            </td>

                            <td className="p-3 font-mono text-[11px] text-[#4E7D68]">
                              {u.lastLogin || 'Never logged in'}
                            </td>

                            <td className="p-3 text-right">
                              <button
                                onClick={() => handleResetDefaultPassword(u.id)}
                                className="text-[10px] font-bold text-[#163A2D] bg-[#FAD02C]/30 hover:bg-[#FAD02C] border border-[#163A2D] px-2 py-1 transition-colors cursor-pointer"
                              >
                                Reset Password
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: LOGIN AUDIT TRAIL */}
          {activeTab === 'logs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white p-3 border-2 border-[#163A2D] shadow-xs">
                <div>
                  <h4 className="font-sans font-black text-base text-[#163A2D] uppercase tracking-tight">
                    Real-time Authentication Audit Trail
                  </h4>
                  <p className="text-[#4E7D68] text-[11px]">
                    Monitors login activity across Teacher, Student, and Administrator portals.
                  </p>
                </div>
                <button
                  onClick={refresh}
                  className="bg-[#163A2D] text-[#FAD02C] px-3 py-1.5 font-bold flex items-center space-x-1 text-xs cursor-pointer hover:bg-[#0D241C] transition-colors border border-[#163A2D]"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh</span>
                </button>
              </div>

              <div className="bg-white border-2 border-[#163A2D] shadow-xs overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#163A2D] text-[#FAD02C] text-[11px] font-mono uppercase tracking-wider">
                      <th className="p-3">Timestamp</th>
                      <th className="p-3">User & Email</th>
                      <th className="p-3">Category / Role</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Device / Network</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D0E4DA] text-xs">
                    {logs.map((log) => (
                      <tr key={log.id} className="hover:bg-[#FAF8F5]">
                        <td className="p-3 font-mono text-[11px] text-[#4E7D68]">
                          {log.timestamp}
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-[#163A2D]">{log.userName}</div>
                          <div className="text-[11px] text-[#4E7D68] font-mono">
                            {log.email} ({log.userId})
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="capitalize font-bold text-[#163A2D]">
                            {log.category}
                          </span>
                          <span className="text-[11px] text-[#4E7D68] block">Role: {log.role}</span>
                        </td>
                        <td className="p-3">
                          <span
                            className={`inline-flex items-center space-x-1 px-2 py-0.5 text-[10px] font-bold ${
                              log.status === 'Success'
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                                : 'bg-red-50 text-red-800 border border-red-300'
                            }`}
                          >
                            {log.status === 'Success' ? (
                              <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                            ) : (
                              <AlertTriangle className="w-3 h-3 text-red-700" />
                            )}
                            <span>{log.status}</span>
                          </span>
                        </td>
                        <td className="p-3 font-mono text-[11px] text-[#4E7D68]">{log.ipDevice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#FAF8F5] px-6 py-3 border-t-2 border-[#163A2D] flex items-center justify-between text-[11px] text-[#4E7D68]">
          <div>
            Logged in authority: <strong className="text-[#163A2D]">{currentAdminEmail}</strong>
          </div>
          <button
            onClick={onClose}
            className="bg-[#163A2D] hover:bg-[#0D241C] text-[#FAD02C] px-4 py-1.5 font-bold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer border border-[#163A2D]"
          >
            Close Admin Cockpit
          </button>
        </div>
      </div>

      {/* CREATE NEW USER POPUP MODAL */}
      {newUserModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white max-w-md w-full p-5 border-2 border-[#163A2D] shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-[#D0E4DA] pb-2">
              <h3 className="font-sans font-black text-base text-[#163A2D] uppercase tracking-tight">
                Add New Teacher or Student
              </h3>
              <button
                onClick={() => setNewUserModal(false)}
                className="text-[#4E7D68] hover:text-[#163A2D] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-2.5">
              <div>
                <label className="block text-[11px] font-bold text-[#163A2D] mb-0.5">
                  Role Category
                </label>
                <select
                  value={newUserData.category}
                  onChange={(e) =>
                    setNewUserData({
                      ...newUserData,
                      category: e.target.value as 'student' | 'teacher',
                    })
                  }
                  className="w-full p-2 bg-[#FAF8F5] border border-[#D0E4DA] text-xs font-bold text-[#163A2D] focus:border-[#163A2D]"
                >
                  <option value="teacher">Teacher / Faculty</option>
                  <option value="student">Student</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#163A2D] mb-0.5">
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  required
                  value={newUserData.name || ''}
                  onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                  placeholder="e.g. Dr. Kazi Nazrul"
                  className="w-full p-2 bg-[#FAF8F5] border border-[#D0E4DA] text-xs text-[#163A2D] focus:border-[#163A2D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-[#163A2D] mb-0.5">
                    {newUserData.category === 'teacher' ? 'Faculty ID' : 'Student ID'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUserData.id || ''}
                    onChange={(e) => setNewUserData({ ...newUserData, id: e.target.value })}
                    placeholder={
                      newUserData.category === 'teacher' ? 'FAC-CSE-099' : 'CCN-2026-CSE-100'
                    }
                    className="w-full p-2 bg-[#FAF8F5] border border-[#D0E4DA] text-xs font-mono text-[#163A2D] focus:border-[#163A2D]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#163A2D] mb-0.5">
                    Department
                  </label>
                  <select
                    value={newUserData.department}
                    onChange={(e) => setNewUserData({ ...newUserData, department: e.target.value })}
                    className="w-full p-2 bg-[#FAF8F5] border border-[#D0E4DA] text-xs text-[#163A2D] focus:border-[#163A2D]"
                  >
                    <option value="Computer Science & Engineering">CSE</option>
                    <option value="Electrical & Electronic Engineering">EEE</option>
                    <option value="Civil Engineering">CE</option>
                    <option value="Business Administration">BBA</option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="English Literature">English</option>
                    <option value="Law & Human Rights">LLB</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#163A2D] mb-0.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={newUserData.email || ''}
                  onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                  placeholder="user@ccnust.ac.bd"
                  className="w-full p-2 bg-[#FAF8F5] border border-[#D0E4DA] text-xs font-mono text-[#163A2D] focus:border-[#163A2D]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#163A2D] mb-0.5">
                  Initial Password
                </label>
                <input
                  type="text"
                  value={newUserData.password || ''}
                  onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                  placeholder="Set account password"
                  className="w-full p-2 bg-[#FAF8F5] border border-[#D0E4DA] text-xs font-mono font-bold text-[#163A2D] focus:border-[#163A2D]"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-[#D0E4DA]">
                <button
                  type="button"
                  onClick={() => setNewUserModal(false)}
                  className="px-3 py-1.5 border border-[#D0E4DA] text-xs font-bold text-[#4E7D68] hover:bg-[#FAF8F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#163A2D] hover:bg-[#0D241C] text-[#FAD02C] px-4 py-1.5 text-xs font-bold shadow-sm transition-all duration-200 hover:-translate-y-0.5 border border-[#163A2D]"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
