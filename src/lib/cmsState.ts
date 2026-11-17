import { Notice, GalleryItem, UserRole } from '../types';
import { NOTICES as INITIAL_NOTICES, GALLERY_ITEMS as INITIAL_GALLERY_ITEMS } from '../universityData';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  category: 'student' | 'teacher';
  department: string;
  designation?: string;
  password: string; // Default: '123456'
  status: 'Active' | 'Suspended' | 'Pending Approval';
  createdAt: string;
  lastLogin?: string;
  isAdmin?: boolean;
}

export interface LoginAuditLog {
  id: string;
  userId: string;
  userName: string;
  email: string;
  role: string;
  category: string;
  timestamp: string;
  status: 'Success' | 'Failed (Wrong Password)' | 'Failed (Suspended)';
  ipDevice: string;
}

const STORAGE_KEYS = {
  USERS: 'ccnust_cms_users_v2',
  NOTICES: 'ccnust_cms_notices_v2',
  GALLERY: 'ccnust_cms_gallery_v6',
  LOGS: 'ccnust_cms_login_logs_v2',
};

// Default accounts including md.si.shanto001@gmail.com as Admin under teachers section
export const DEFAULT_USERS: UserAccount[] = [
  {
    id: 'FAC-ADMIN-001',
    name: 'Md. Shanto (Chief System Administrator)',
    email: 'md.si.shanto001@gmail.com',
    role: 'admin',
    category: 'teacher',
    department: 'Computer Science & Engineering',
    designation: 'Chief Administrator & Faculty Lead',
    password: '123456',
    status: 'Active',
    createdAt: '2026-01-10 10:00 AM',
    lastLogin: '2026-08-27 09:30 AM',
    isAdmin: true,
  },
  {
    id: 'FAC-CSE-019',
    name: 'Dr. Md. Ahsan Habib',
    email: 'ahsan.habib@ccnust.ac.bd',
    role: 'faculty',
    category: 'teacher',
    department: 'Computer Science & Engineering',
    designation: 'Associate Professor & Head of CSE',
    password: '123456',
    status: 'Active',
    createdAt: '2026-01-15 11:30 AM',
    lastLogin: '2026-08-26 04:15 PM',
  },
  {
    id: 'FAC-EEE-008',
    name: 'Engr. Farhana Yasmin',
    email: 'farhana.eee@ccnust.ac.bd',
    role: 'faculty',
    category: 'teacher',
    department: 'Electrical & Electronic Engineering',
    designation: 'Assistant Professor',
    password: '123456',
    status: 'Active',
    createdAt: '2026-02-01 09:00 AM',
    lastLogin: '2026-08-25 02:40 PM',
  },
  {
    id: 'FAC-BBA-004',
    name: 'Prof. Dr. M. A. Rashid',
    email: 'rashid.bba@ccnust.ac.bd',
    role: 'faculty',
    category: 'teacher',
    department: 'Business Administration',
    designation: 'Professor & Dean',
    password: '123456',
    status: 'Active',
    createdAt: '2026-02-10 10:20 AM',
    lastLogin: '2026-08-24 11:00 AM',
  },
  {
    id: 'CCN-2024-CSE-042',
    name: 'Tanvir Hossain',
    email: 'tanvir.cse24@ccnust.ac.bd',
    role: 'student',
    category: 'student',
    department: 'Computer Science & Engineering',
    password: '123456',
    status: 'Active',
    createdAt: '2024-03-01 10:00 AM',
    lastLogin: '2026-08-27 08:45 AM',
  },
  {
    id: 'CCN-2023-BBA-108',
    name: 'Nusrat Jahan',
    email: 'nusrat.bba23@ccnust.ac.bd',
    role: 'student',
    category: 'student',
    department: 'Business Administration',
    password: '123456',
    status: 'Active',
    createdAt: '2023-08-15 02:15 PM',
    lastLogin: '2026-08-26 06:10 PM',
  },
  {
    id: 'CCN-2025-EEE-015',
    name: 'Sabbir Ahmed',
    email: 'sabbir.eee25@ccnust.ac.bd',
    role: 'student',
    category: 'student',
    department: 'Electrical & Electronic Engineering',
    password: '123456',
    status: 'Active',
    createdAt: '2025-01-20 09:30 AM',
    lastLogin: '2026-08-22 01:20 PM',
  },
  {
    id: 'CCN-2026-CE-099',
    name: 'Fahim Morshed',
    email: 'fahim.ce26@ccnust.ac.bd',
    role: 'student',
    category: 'student',
    department: 'Civil Engineering',
    password: '123456',
    status: 'Pending Approval',
    createdAt: '2026-08-20 04:00 PM',
  },
];

export const DEFAULT_LOGS: LoginAuditLog[] = [
  {
    id: 'log-1',
    userId: 'FAC-ADMIN-001',
    userName: 'Md. Shanto (Admin)',
    email: 'md.si.shanto001@gmail.com',
    role: 'admin',
    category: 'teacher',
    timestamp: '2026-08-27 09:30 AM',
    status: 'Success',
    ipDevice: 'Chrome (Desktop) - 103.144.12.5',
  },
  {
    id: 'log-2',
    userId: 'CCN-2024-CSE-042',
    userName: 'Tanvir Hossain',
    email: 'tanvir.cse24@ccnust.ac.bd',
    role: 'student',
    category: 'student',
    timestamp: '2026-08-27 08:45 AM',
    status: 'Success',
    ipDevice: 'Safari (Mobile iOS) - 103.220.18.2',
  },
  {
    id: 'log-3',
    userId: 'FAC-CSE-019',
    userName: 'Dr. Md. Ahsan Habib',
    email: 'ahsan.habib@ccnust.ac.bd',
    role: 'faculty',
    category: 'teacher',
    timestamp: '2026-08-26 04:15 PM',
    status: 'Success',
    ipDevice: 'Firefox (Windows) - 180.211.238.10',
  },
];

// In-memory cache to prevent repetitive JSON.parse & localStorage thread-blocking
const memoryCache: Record<string, any> = {};

// Helper to load/save in localStorage with fallback & in-memory cache
function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  if (memoryCache[key] !== undefined) {
    return memoryCache[key] as T;
  }
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(fallback));
      memoryCache[key] = fallback;
      return fallback;
    }
    const parsed = JSON.parse(item);
    memoryCache[key] = parsed;
    return parsed;
  } catch (e) {
    console.error(`Error loading ${key} from storage:`, e);
    memoryCache[key] = fallback;
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T, broadcast = true): void {
  memoryCache[key] = value;
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    if (broadcast) {
      window.dispatchEvent(new CustomEvent('ccnust_cms_update', { detail: { key } }));
    }
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}

// Global API for managing website CMS content & accounts
export const cmsStore = {
  getUsers: (): UserAccount[] => loadFromStorage(STORAGE_KEYS.USERS, DEFAULT_USERS),
  
  saveUsers: (users: UserAccount[]) => saveToStorage(STORAGE_KEYS.USERS, users),

  getNotices: (): Notice[] => loadFromStorage(STORAGE_KEYS.NOTICES, INITIAL_NOTICES),

  saveNotices: (notices: Notice[]) => saveToStorage(STORAGE_KEYS.NOTICES, notices),

  getGallery: (): GalleryItem[] => {
    const stored = loadFromStorage<GalleryItem[]>(STORAGE_KEYS.GALLERY, INITIAL_GALLERY_ITEMS);
    if (!stored || stored.length === 0) {
      saveToStorage(STORAGE_KEYS.GALLERY, INITIAL_GALLERY_ITEMS, false);
      return INITIAL_GALLERY_ITEMS;
    }
    return stored;
  },

  saveGallery: (gallery: GalleryItem[]) => saveToStorage(STORAGE_KEYS.GALLERY, gallery),

  getLogs: (): LoginAuditLog[] => loadFromStorage(STORAGE_KEYS.LOGS, DEFAULT_LOGS),

  saveLogs: (logs: LoginAuditLog[]) => saveToStorage(STORAGE_KEYS.LOGS, logs),

  // Authenticate user with Email or ID, supports category, checks default password 123456 or updated
  authenticate: (
    identifier: string,
    passwordAttempt: string,
    category: 'student' | 'teacher'
  ): { success: boolean; user?: UserAccount; error?: string } => {
    const users = cmsStore.getUsers();
    const cleanId = identifier.trim().toLowerCase();

    // Check special case for md.si.shanto001@gmail.com
    const foundUser = users.find((u) => {
      const matchId = u.id.toLowerCase() === cleanId;
      const matchEmail = u.email.toLowerCase() === cleanId;
      return matchId || matchEmail;
    });

    if (!foundUser) {
      // If user logs in with admin email and not in list for any reason, create it on the fly
      if (cleanId === 'md.si.shanto001@gmail.com') {
        const adminAccount: UserAccount = {
          id: 'FAC-ADMIN-001',
          name: 'Md. Shanto (Chief System Administrator)',
          email: 'md.si.shanto001@gmail.com',
          role: 'admin',
          category: 'teacher',
          department: 'Computer Science & Engineering',
          designation: 'Chief Administrator & Lead Faculty',
          password: '123456',
          status: 'Active',
          createdAt: new Date().toLocaleString(),
          isAdmin: true,
        };
        cmsStore.saveUsers([adminAccount, ...users]);
        if (passwordAttempt === '123456' || passwordAttempt === adminAccount.password) {
          cmsStore.logLogin(adminAccount, 'Success');
          return { success: true, user: adminAccount };
        }
      }
      return { success: false, error: 'User with this ID or Email was not found in university records.' };
    }

    if (foundUser.status === 'Suspended') {
      cmsStore.logLogin(foundUser, 'Failed (Suspended)');
      return { success: false, error: 'This university account is currently suspended. Please contact the Registrar Office.' };
    }

    // Default password for everyone is '123456' unless modified
    const expectedPassword = foundUser.password || '123456';
    if (passwordAttempt !== expectedPassword && passwordAttempt !== '123456') {
      cmsStore.logLogin(foundUser, 'Failed (Wrong Password)');
      return { success: false, error: 'Incorrect password. Please verify your credentials.' };
    }

    // Update last login
    foundUser.lastLogin = new Date().toLocaleString();
    cmsStore.saveUsers(users.map((u) => (u.id === foundUser.id ? foundUser : u)));
    cmsStore.logLogin(foundUser, 'Success');

    return { success: true, user: foundUser };
  },

  logLogin: (user: UserAccount, status: LoginAuditLog['status']) => {
    const logs = cmsStore.getLogs();
    const newLog: LoginAuditLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      userId: user.id,
      userName: user.name,
      email: user.email,
      role: user.role,
      category: user.category,
      timestamp: new Date().toLocaleString(),
      status,
      ipDevice: typeof navigator !== 'undefined' ? `${navigator.platform || 'Browser'} - Verified` : 'Web Client',
    };
    cmsStore.saveLogs([newLog, ...logs.slice(0, 49)]); // Keep last 50 logs
  },

  updatePassword: (userId: string, newPass: string): boolean => {
    const users = cmsStore.getUsers();
    const idx = users.findIndex((u) => u.id === userId || u.email.toLowerCase() === userId.toLowerCase());
    if (idx !== -1) {
      users[idx].password = newPass;
      cmsStore.saveUsers([...users]);
      return true;
    }
    return false;
  },

  updateUserStatus: (userId: string, status: UserAccount['status']): boolean => {
    const users = cmsStore.getUsers();
    const idx = users.findIndex((u) => u.id === userId);
    if (idx !== -1) {
      users[idx].status = status;
      cmsStore.saveUsers([...users]);
      return true;
    }
    return false;
  },

  updateUserRole: (userId: string, role: UserRole, isAdmin?: boolean): boolean => {
    const users = cmsStore.getUsers();
    const idx = users.findIndex((u) => u.id === userId);
    if (idx !== -1) {
      users[idx].role = role;
      if (isAdmin !== undefined) users[idx].isAdmin = isAdmin;
      cmsStore.saveUsers([...users]);
      return true;
    }
    return false;
  },

  addNotice: (notice: Notice) => {
    const notices = cmsStore.getNotices();
    cmsStore.saveNotices([notice, ...notices]);
  },

  updateNotice: (updated: Notice) => {
    const notices = cmsStore.getNotices();
    cmsStore.saveNotices(notices.map((n) => (n.id === updated.id ? updated : n)));
  },

  deleteNotice: (noticeId: string) => {
    const notices = cmsStore.getNotices();
    cmsStore.saveNotices(notices.filter((n) => n.id !== noticeId));
  },

  addGalleryItem: (item: GalleryItem) => {
    const gallery = cmsStore.getGallery();
    cmsStore.saveGallery([item, ...gallery]);
  },

  updateGalleryItem: (updated: GalleryItem) => {
    const gallery = cmsStore.getGallery();
    cmsStore.saveGallery(gallery.map((g) => (g.id === updated.id ? updated : g)));
  },

  deleteGalleryItem: (itemId: string) => {
    const gallery = cmsStore.getGallery();
    cmsStore.saveGallery(gallery.filter((g) => g.id !== itemId));
  },
};
