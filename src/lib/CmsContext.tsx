import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  db,
  auth,
  googleProvider,
  OperationType,
  handleFirestoreError,
} from './firebase';
import {
  cmsStore,
  UserAccount,
  LoginAuditLog,
  DEFAULT_USERS,
  DEFAULT_LOGS,
} from './cmsState';
import {
  Notice,
  GalleryItem,
  UserRole,
  AdmissionApplication,
  ContactMessage,
} from '../types';
import {
  NOTICES as INITIAL_NOTICES,
  GALLERY_ITEMS as INITIAL_GALLERY_ITEMS,
} from '../universityData';

export const ADMIN_EMAIL = 'md.si.shanto001@gmail.com';
const LOCAL_ADMISSIONS_KEY = 'ccnust_admissions_local_v1';
const LOCAL_CONTACTS_KEY = 'ccnust_contacts_local_v1';

// Legacy broken HTTP-500 fake Drive IDs & pre-dedup duplicate/hyphenated IDs to purge safely
const LEGACY_INVALID_GALLERY_IDS = new Set([
  'drive-gal-1Ksk5jUaQ9yGqK2vDvd09e1jXm-bQWv4L',
  'drive-gal-1aW4q0K7Z6Y0m-XbS7bF0xJvF_uX5zJ7Q',
  'drive-gal-1eL6M3qJ5sU8hN1bZ7Y4vP9kX0wT2rE5Q',
  'drive-gal-1uY8N4wK6mP2xR7vT1bJ5sE9qL0hN3aZ8',
  'drive-gal-1tP5X7mK2bL9wR4vN8jE0sQ1uY3hN6aZ5',
  'drive-gal-1mQ8N2wK5bL7vP4xR9jE1sT0uY6hN3aZ4',
  'drive-gal-1KC4Y5OtKKhwa1k-5xWHoQwCxMqavhJdm',
  'drive-gal-1MI4RdIZwXXtaQa2IKnb7pMiTQWw_uIa6',
  'drive-gal-19eIwdybok0gZPEraTy8FvG0kkkZ_Df61',
  'drive-gal-1nnbNuq1YKhEZfo3QU6yTyGCDPodvGYc_',
  'drive-gal-1Y94KPjoLY56Ln_RvREmFwVQ5Peciwyxf',
  'drive-gal-1i3yo7kBOsKcNR5a7dPm5TZ9ZDeJxpjdg',
  'drive-gal-1eXagxfEH-3yJ0e1eHs9FxFMcSofeZokj',
]);

function normalizeGalleryKey(imageUrl: string): string {
  const m = imageUrl.match(/lh3\.googleusercontent\.com\/d\/([^=?&/]+)|thumbnail\?id=([^&]+)/);
  if (m) return `drive:${m[1] || m[2]}`;
  return imageUrl.trim();
}

function sanitizeId(raw: string, prefix = 'doc'): string {
  const cleaned = String(raw || '')
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .slice(0, 128);
  if (cleaned.length >= 2) return cleaned;
  return `${prefix}_${Date.now()}`;
}

function cleanStr(val: unknown, maxLen: number, fallback = ''): string {
  const s = typeof val === 'string' ? val.trim() : String(val ?? fallback).trim();
  const res = s || fallback;
  return res.slice(0, maxLen);
}

function loadLocalArray<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function saveLocalArray<T>(key: string, items: T[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch (err) {
    console.warn(`Unable to persist ${key} locally:`, err);
  }
}

function serializeNoticeForCreate(notice: Notice) {
  const id = sanitizeId(notice.id, 'notice');
  const payload: Record<string, unknown> = {
    id,
    title: cleanStr(notice.title, 240, 'University Circular'),
    category: ['admission', 'academic', 'examination', 'administrative', 'general'].includes(
      notice.category
    )
      ? notice.category
      : 'general',
    publishDate: cleanStr(
      notice.publishDate,
      60,
      new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    ),
    content: cleanStr(notice.content, 5000, 'Official CCNUST notification.'),
    important: Boolean(notice.important),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  if (notice.pdfUrl && notice.pdfUrl.trim()) {
    payload.pdfUrl = cleanStr(notice.pdfUrl, 1000);
  }
  if (notice.attachmentName && notice.attachmentName.trim()) {
    payload.attachmentName = cleanStr(notice.attachmentName, 200);
  }
  return { id, payload };
}

function serializeGalleryForCreate(item: GalleryItem) {
  const id = sanitizeId(item.id, 'gallery');
  const allowedCats = [
    'campus',
    'academic',
    'events',
    'seminar',
    'sports',
    'cultural',
    'international',
    'student_life',
  ];
  const payload: Record<string, unknown> = {
    id,
    title: cleanStr(item.title, 200, 'CCNUST Campus Photo'),
    category: allowedCats.includes(item.category) ? item.category : 'campus',
    imageUrl: cleanStr(item.imageUrl, 1000, '/assets/aistudio/2387c88a-009f-458a-bc56-fe24b26a4c06_c366e284.jpg'),
    caption: cleanStr(item.caption, 1000, item.title || 'CCNUST Kotbari Campus'),
    date: cleanStr(item.date, 60, 'Fall 2026'),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  return { id, payload };
}

function serializeUserForCreate(user: UserAccount) {
  const id = sanitizeId(user.id, 'user');
  const allowedRoles: UserRole[] = [
    'student',
    'guardian',
    'faculty',
    'hod',
    'exam_controller',
    'admission_officer',
    'accounts',
    'officer',
    'admin',
  ];
  const payload: Record<string, unknown> = {
    id,
    name: cleanStr(user.name, 150, 'CCNUST Member'),
    email: cleanStr(user.email, 150, 'member@ccnust.ac.bd'),
    role: allowedRoles.includes(user.role) ? user.role : 'student',
    category: user.category === 'teacher' ? 'teacher' : 'student',
    department: cleanStr(user.department, 150, 'Computer Science & Engineering'),
    password: cleanStr(user.password, 128, '123456'),
    status: ['Active', 'Suspended', 'Pending Approval'].includes(user.status)
      ? user.status
      : 'Active',
    createdAt: cleanStr(user.createdAt, 80, new Date().toLocaleString()),
    updatedAt: serverTimestamp(),
  };
  if (user.designation && user.designation.trim()) {
    payload.designation = cleanStr(user.designation, 150);
  }
  if (user.lastLogin && user.lastLogin.trim()) {
    payload.lastLogin = cleanStr(user.lastLogin, 80);
  }
  if (typeof user.isAdmin === 'boolean') {
    payload.isAdmin = user.isAdmin;
  }
  return { id, payload };
}

function serializeLogForCreate(log: LoginAuditLog) {
  const id = sanitizeId(log.id, 'log');
  return {
    id,
    payload: {
      id,
      userId: cleanStr(log.userId, 128, 'unknown'),
      userName: cleanStr(log.userName, 150, 'Portal User'),
      email: cleanStr(log.email, 150, 'user@ccnust.ac.bd'),
      role: cleanStr(log.role, 50, 'student'),
      category: cleanStr(log.category, 50, 'student'),
      timestamp: cleanStr(log.timestamp, 80, new Date().toLocaleString()),
      status: ['Success', 'Failed (Wrong Password)', 'Failed (Suspended)'].includes(log.status)
        ? log.status
        : 'Success',
      ipDevice: cleanStr(log.ipDevice, 200, 'Web Client'),
      createdAt: serverTimestamp(),
    },
  };
}

export interface CmsContextValue {
  notices: Notice[];
  gallery: GalleryItem[];
  users: UserAccount[];
  logs: LoginAuditLog[];
  admissions: AdmissionApplication[];
  contacts: ContactMessage[];
  authUser: FirebaseUser | null;
  authReady: boolean;
  isFirebaseAdmin: boolean;
  isCloudSeeded: boolean;
  cloudConnected: boolean;
  isSyncing: boolean;
  syncError: string | null;
  refresh: () => void;
  signInWithGoogle: () => Promise<FirebaseUser | null>;
  signOutFirebase: () => Promise<void>;
  syncBaselineToFirestore: () => Promise<void>;
  addNotice: (notice: Notice) => Promise<void>;
  updateNotice: (notice: Notice) => Promise<void>;
  deleteNotice: (noticeId: string) => Promise<void>;
  addGalleryItem: (item: GalleryItem) => Promise<void>;
  updateGalleryItem: (item: GalleryItem) => Promise<void>;
  deleteGalleryItem: (itemId: string) => Promise<void>;
  createUser: (user: UserAccount) => Promise<void>;
  updatePassword: (userId: string, newPass: string) => Promise<boolean>;
  updateUserStatus: (userId: string, status: UserAccount['status']) => Promise<boolean>;
  updateUserRole: (userId: string, role: UserRole, isAdmin?: boolean) => Promise<boolean>;
  deleteUser: (userId: string) => Promise<void>;
  logLoginAudit: (user: UserAccount, status: LoginAuditLog['status']) => Promise<void>;
  submitAdmission: (
    application: Omit<AdmissionApplication, 'id' | 'trackingNumber' | 'submittedAt' | 'status'>
  ) => Promise<AdmissionApplication>;
  updateAdmissionStatus: (
    admissionId: string,
    status: AdmissionApplication['status']
  ) => Promise<void>;
  submitContact: (
    contact: Omit<ContactMessage, 'id' | 'status' | 'submittedAt'>
  ) => Promise<ContactMessage>;
  updateContactStatus: (
    contactId: string,
    status: ContactMessage['status']
  ) => Promise<void>;
}

const CmsContext = createContext<CmsContextValue | null>(null);

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(() => auth.currentUser);
  const [authReady, setAuthReady] = useState<boolean>(false);

  const [isCloudSeeded, setIsCloudSeeded] = useState<boolean>(false);
  const [metaLoaded, setMetaLoaded] = useState<boolean>(false);
  const [cloudConnected, setCloudConnected] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  // Cloud vs local fallback slices
  const [cloudNotices, setCloudNotices] = useState<Notice[]>([]);
  const [cloudGallery, setCloudGallery] = useState<GalleryItem[]>([]);
  const [cloudUsers, setCloudUsers] = useState<UserAccount[] | null>(null);
  const [cloudLogs, setCloudLogs] = useState<LoginAuditLog[] | null>(null);
  const [cloudAdmissions, setCloudAdmissions] = useState<AdmissionApplication[] | null>(null);
  const [cloudContacts, setCloudContacts] = useState<ContactMessage[] | null>(null);

  const [localNotices, setLocalNotices] = useState<Notice[]>(() => cmsStore.getNotices());
  const [localGallery, setLocalGallery] = useState<GalleryItem[]>(() => cmsStore.getGallery());
  const [localUsers, setLocalUsers] = useState<UserAccount[]>(() => cmsStore.getUsers());
  const [localLogs, setLocalLogs] = useState<LoginAuditLog[]>(() => cmsStore.getLogs());
  const [localAdmissions, setLocalAdmissions] = useState<AdmissionApplication[]>(() =>
    loadLocalArray<AdmissionApplication>(LOCAL_ADMISSIONS_KEY)
  );
  const [localContacts, setLocalContacts] = useState<ContactMessage[]>(() =>
    loadLocalArray<ContactMessage>(LOCAL_CONTACTS_KEY)
  );

  const autoSeedTriggeredRef = useRef<boolean>(false);

  const isFirebaseAdmin = Boolean(
    authUser &&
      authUser.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
      authUser.emailVerified
  );

  // 1. Track Firebase Authentication State
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setAuthReady(true);
    });
    return () => unsub();
  }, []);

  // 2. Listen to local cmsStore events so fallback edits re-render cleanly
  const refresh = useCallback(() => {
    setLocalNotices(cmsStore.getNotices());
    setLocalGallery(cmsStore.getGallery());
    setLocalUsers(cmsStore.getUsers());
    setLocalLogs(cmsStore.getLogs());
    setLocalAdmissions(loadLocalArray<AdmissionApplication>(LOCAL_ADMISSIONS_KEY));
    setLocalContacts(loadLocalArray<ContactMessage>(LOCAL_CONTACTS_KEY));
  }, []);

  useEffect(() => {
    const onLocalUpdate = () => refresh();
    window.addEventListener('ccnust_cms_update', onLocalUpdate);
    window.addEventListener('storage', onLocalUpdate);
    return () => {
      window.removeEventListener('ccnust_cms_update', onLocalUpdate);
      window.removeEventListener('storage', onLocalUpdate);
    };
  }, [refresh]);

  // 3. Public Shared Root Listeners (1 listener per collection across entire app)
  useEffect(() => {
    const metaRef = doc(db, 'cmsMeta', 'seedState');
    const unsubMeta = onSnapshot(
      metaRef,
      (snap) => {
        setCloudConnected(true);
        setMetaLoaded(true);
        setIsCloudSeeded(Boolean(snap.exists() && snap.data()?.seeded === true));
      },
      (err) => {
        console.warn('cmsMeta listener warning:', err.message);
        setMetaLoaded(true);
      }
    );

    const noticesQ = query(collection(db, 'notices'), orderBy('createdAt', 'desc'), limit(50));
    const unsubNotices = onSnapshot(
      noticesQ,
      (snap) => {
        setCloudConnected(true);
        const items: Notice[] = snap.docs.map((d) => {
          const data = d.data();
          return {
            id: String(data.id || d.id),
            title: String(data.title || ''),
            category: (data.category as Notice['category']) || 'general',
            publishDate: String(data.publishDate || ''),
            content: String(data.content || ''),
            important: Boolean(data.important),
            pdfUrl: typeof data.pdfUrl === 'string' ? data.pdfUrl : undefined,
            attachmentName: typeof data.attachmentName === 'string' ? data.attachmentName : undefined,
          };
        });
        setCloudNotices(items);
      },
      (err) => {
        console.warn('Notices live listener fallback:', err.message);
      }
    );

    const galleryQ = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'), limit(250));
    const unsubGallery = onSnapshot(
      galleryQ,
      (snap) => {
        setCloudConnected(true);
        const items: GalleryItem[] = snap.docs.map((d) => {
          const data = d.data();
          return {
            id: String(data.id || d.id),
            title: String(data.title || ''),
            category: (data.category as GalleryItem['category']) || 'campus',
            imageUrl: String(data.imageUrl || ''),
            caption: String(data.caption || ''),
            date: typeof data.date === 'string' ? data.date : 'Fall 2026',
          };
        });
        setCloudGallery(items);
      },
      (err) => {
        console.warn('Gallery live listener fallback:', err.message);
      }
    );

    return () => {
      unsubMeta();
      unsubNotices();
      unsubGallery();
    };
  }, []);

  // 4. Protected Admin-Only Listeners (only attached when verified Admin is authenticated)
  useEffect(() => {
    if (!isFirebaseAdmin) {
      setCloudUsers(null);
      setCloudLogs(null);
      setCloudAdmissions(null);
      setCloudContacts(null);
      return;
    }

    const usersQ = query(collection(db, 'portalUsers'), limit(200));
    const unsubUsers = onSnapshot(
      usersQ,
      (snap) => {
        const items: UserAccount[] = snap.docs.map((d) => {
          const data = d.data();
          return {
            id: String(data.id || d.id),
            name: String(data.name || ''),
            email: String(data.email || ''),
            role: (data.role as UserRole) || 'student',
            category: data.category === 'teacher' ? 'teacher' : 'student',
            department: String(data.department || ''),
            designation: typeof data.designation === 'string' ? data.designation : undefined,
            password: String(data.password || '123456'),
            status: (data.status as UserAccount['status']) || 'Active',
            createdAt: String(data.createdAt || ''),
            lastLogin: typeof data.lastLogin === 'string' ? data.lastLogin : undefined,
            isAdmin: Boolean(data.isAdmin),
          };
        });
        setCloudUsers(items);
        if (items.length > 0) {
          cmsStore.saveUsers(items);
        }
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'portalUsers')
    );

    const logsQ = query(collection(db, 'auditLogs'), orderBy('createdAt', 'desc'), limit(50));
    const unsubLogs = onSnapshot(
      logsQ,
      (snap) => {
        const items: LoginAuditLog[] = snap.docs.map((d) => {
          const data = d.data();
          return {
            id: String(data.id || d.id),
            userId: String(data.userId || ''),
            userName: String(data.userName || ''),
            email: String(data.email || ''),
            role: String(data.role || 'student'),
            category: String(data.category || 'student'),
            timestamp: String(data.timestamp || ''),
            status: (data.status as LoginAuditLog['status']) || 'Success',
            ipDevice: String(data.ipDevice || ''),
          };
        });
        setCloudLogs(items);
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'auditLogs')
    );

    const admQ = query(collection(db, 'admissions'), orderBy('createdAt', 'desc'), limit(100));
    const unsubAdmissions = onSnapshot(
      admQ,
      (snap) => {
        const items: AdmissionApplication[] = snap.docs.map((d) => {
          const data = d.data();
          return {
            id: String(data.id || d.id),
            trackingNumber: String(data.trackingNumber || ''),
            applicantName: String(data.applicantName || ''),
            fatherName: String(data.fatherName || ''),
            motherName: String(data.motherName || ''),
            dateOfBirth: String(data.dateOfBirth || ''),
            gender: String(data.gender || 'male'),
            email: String(data.email || ''),
            phone: String(data.phone || ''),
            programId: String(data.programId || ''),
            programName: String(data.programName || ''),
            semester: typeof data.semester === 'string' ? data.semester : 'Fall 2026',
            shift: typeof data.shift === 'string' ? data.shift : 'Day',
            sscRoll: String(data.sscRoll || ''),
            sscBoard: String(data.sscBoard || ''),
            sscGpa: String(data.sscGpa || ''),
            sscYear: String(data.sscYear || ''),
            hscRoll: String(data.hscRoll || ''),
            hscBoard: String(data.hscBoard || ''),
            hscGpa: String(data.hscGpa || ''),
            hscYear: String(data.hscYear || ''),
            address: String(data.address || ''),
            guardianPhone: String(data.guardianPhone || ''),
            quotaCategory:
              typeof data.quotaCategory === 'string' ? data.quotaCategory : 'General Merit',
            submittedAt: String(data.submittedAt || ''),
            status: (data.status as AdmissionApplication['status']) || 'Received',
          };
        });
        setCloudAdmissions(items);
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'admissions')
    );

    const contactsQ = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'), limit(100));
    const unsubContacts = onSnapshot(
      contactsQ,
      (snap) => {
        const items: ContactMessage[] = snap.docs.map((d) => {
          const data = d.data();
          return {
            id: String(data.id || d.id),
            name: String(data.name || ''),
            email: String(data.email || ''),
            phone: typeof data.phone === 'string' ? data.phone : undefined,
            subject: String(data.subject || ''),
            message: String(data.message || ''),
            status: (data.status as ContactMessage['status']) || 'New',
            submittedAt: String(data.submittedAt || ''),
          };
        });
        setCloudContacts(items);
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'contacts')
    );

    return () => {
      unsubUsers();
      unsubLogs();
      unsubAdmissions();
      unsubContacts();
    };
  }, [isFirebaseAdmin]);

  // 5. Batched Baseline Cloud Sync (seeds Notices, Gallery, PortalUsers, AuditLogs + cmsMeta)
  const syncBaselineToFirestore = useCallback(async () => {
    if (!isFirebaseAdmin) {
      setSyncError('Sign in with Google Admin SSO first to synchronize baseline records to Firestore.');
      return;
    }

    setIsSyncing(true);
    setSyncError(null);
    try {
      const ops: { ref: ReturnType<typeof doc>; data: Record<string, unknown> }[] = [];

      // Notices
      const baseNotices = localNotices.length > 0 ? localNotices : INITIAL_NOTICES;
      baseNotices.forEach((n) => {
        const { id, payload } = serializeNoticeForCreate(n);
        ops.push({ ref: doc(db, 'notices', id), data: payload });
      });

      // Gallery (always ensure updated unique INITIAL_GALLERY_ITEMS override stale records & purge legacy broken IDs)
      const galleryMap = new Map<string, GalleryItem>();
      const seenKeys = new Set<string>();
      INITIAL_GALLERY_ITEMS.forEach((g) => {
        galleryMap.set(g.id, g);
        seenKeys.add(normalizeGalleryKey(g.imageUrl));
      });
      localGallery.forEach((g) => {
        if (LEGACY_INVALID_GALLERY_IDS.has(g.id)) return;
        const key = normalizeGalleryKey(g.imageUrl);
        if (!galleryMap.has(g.id) && !seenKeys.has(key)) {
          galleryMap.set(g.id, g);
          seenKeys.add(key);
        }
      });
      Array.from(galleryMap.values()).forEach((g) => {
        const { id, payload } = serializeGalleryForCreate(g);
        ops.push({ ref: doc(db, 'gallery', id), data: payload });
      });

      // Portal Users
      const baseUsers = localUsers.length > 0 ? localUsers : DEFAULT_USERS;
      baseUsers.forEach((u) => {
        const { id, payload } = serializeUserForCreate(u);
        ops.push({ ref: doc(db, 'portalUsers', id), data: payload });
      });

      // Logs
      const baseLogs = localLogs.length > 0 ? localLogs : DEFAULT_LOGS;
      baseLogs.forEach((l) => {
        const { id, payload } = serializeLogForCreate(l);
        ops.push({ ref: doc(db, 'auditLogs', id), data: payload });
      });

      // Chunk writes cleanly (max 450 per batch, under Firestore 500 cap)
      const CHUNK_SIZE = 450;
      for (let i = 0; i < ops.length; i += CHUNK_SIZE) {
        const batch = writeBatch(db);
        const slice = ops.slice(i, i + CHUNK_SIZE);
        slice.forEach((op) => {
          batch.set(op.ref, op.data, { merge: false });
        });
        await batch.commit();
      }

      // Clean up any legacy broken or duplicate gallery documents previously seeded in Firestore
      const purgeIds = Array.from(LEGACY_INVALID_GALLERY_IDS);
      if (purgeIds.length > 0) {
        const deleteBatch = writeBatch(db);
        purgeIds.forEach((legacyId) => {
          deleteBatch.delete(doc(db, 'gallery', sanitizeId(legacyId, 'gallery')));
        });
        await deleteBatch.commit().catch(() => {});
      }

      // Mark seedState flag
      await setDoc(doc(db, 'cmsMeta', 'seedState'), {
        seeded: true,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      setSyncError(error instanceof Error ? error.message : String(error));
      handleFirestoreError(error, OperationType.WRITE, 'cmsMeta/seedState');
    } finally {
      setIsSyncing(false);
    }
  }, [isFirebaseAdmin, localNotices, localGallery, localUsers, localLogs]);

  // Auto-seed once when verified Admin connects on an unseeded project
  useEffect(() => {
    if (isFirebaseAdmin && metaLoaded && !isCloudSeeded && !autoSeedTriggeredRef.current) {
      autoSeedTriggeredRef.current = true;
      syncBaselineToFirestore().catch((err) => {
        console.error('Auto-seed error:', err);
      });
    }
  }, [isFirebaseAdmin, metaLoaded, isCloudSeeded, syncBaselineToFirestore]);

  // Resolved Live Lists
  const notices = useMemo<Notice[]>(() => {
    if (isCloudSeeded) {
      return cloudNotices;
    }
    if (cloudNotices.length === 0) {
      return localNotices.length > 0 ? localNotices : INITIAL_NOTICES;
    }
    const cloudById = new Map(cloudNotices.map((n) => [n.id, n]));
    const merged: Notice[] = [...cloudNotices];
    (localNotices.length > 0 ? localNotices : INITIAL_NOTICES).forEach((item) => {
      if (!cloudById.has(item.id)) merged.push(item);
    });
    return merged;
  }, [isCloudSeeded, cloudNotices, localNotices]);

  const gallery = useMemo<GalleryItem[]>(() => {
    const baseline = INITIAL_GALLERY_ITEMS;
    const dedupeList = (source: GalleryItem[]): GalleryItem[] => {
      const seenIds = new Set<string>();
      const seenMedia = new Set<string>();
      const out: GalleryItem[] = [];
      for (const item of source) {
        if (LEGACY_INVALID_GALLERY_IDS.has(item.id)) continue;
        const key = normalizeGalleryKey(item.imageUrl);
        if (seenIds.has(item.id) || seenMedia.has(key)) continue;
        seenIds.add(item.id);
        seenMedia.add(key);
        out.push(item);
      }
      return out;
    };

    if (isCloudSeeded && cloudGallery.length > 0) {
      // Ensure any newly added Drive baseline items appear alongside valid cloud docs without duplicates
      const validCloud = dedupeList(cloudGallery);
      const cloudMedia = new Set(validCloud.map((g) => normalizeGalleryKey(g.imageUrl)));
      const cloudIds = new Set(validCloud.map((g) => g.id));
      const additions = baseline.filter(
        (b) => !cloudIds.has(b.id) && !cloudMedia.has(normalizeGalleryKey(b.imageUrl))
      );
      return dedupeList([...validCloud, ...additions]);
    }
    if (cloudGallery.length === 0) {
      return dedupeList([...baseline, ...localGallery]);
    }
    return dedupeList([...cloudGallery, ...baseline]);
  }, [isCloudSeeded, cloudGallery, localGallery]);

  const users = useMemo<UserAccount[]>(() => {
    if (isFirebaseAdmin && cloudUsers !== null) {
      return cloudUsers.length > 0 ? cloudUsers : localUsers;
    }
    return localUsers;
  }, [isFirebaseAdmin, cloudUsers, localUsers]);

  const logs = useMemo<LoginAuditLog[]>(() => {
    if (isFirebaseAdmin && cloudLogs !== null) {
      return cloudLogs;
    }
    return localLogs;
  }, [isFirebaseAdmin, cloudLogs, localLogs]);

  const admissions = useMemo<AdmissionApplication[]>(() => {
    if (isFirebaseAdmin && cloudAdmissions !== null) {
      return cloudAdmissions;
    }
    return localAdmissions;
  }, [isFirebaseAdmin, cloudAdmissions, localAdmissions]);

  const contacts = useMemo<ContactMessage[]>(() => {
    if (isFirebaseAdmin && cloudContacts !== null) {
      return cloudContacts;
    }
    return localContacts;
  }, [isFirebaseAdmin, cloudContacts, localContacts]);

  // Auth Methods
  const signInWithGoogle = useCallback(async () => {
    setSyncError(null);
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  }, []);

  const signOutFirebase = useCallback(async () => {
    await signOut(auth);
  }, []);

  // Notice CRUD
  const addNotice = useCallback(
    async (notice: Notice) => {
      const normalized: Notice = { ...notice, id: sanitizeId(notice.id, 'notice') };
      cmsStore.addNotice(normalized);
      if (isFirebaseAdmin) {
        const { id, payload } = serializeNoticeForCreate(normalized);
        try {
          await setDoc(doc(db, 'notices', id), payload);
        } catch (error) {
          handleFirestoreError(error, OperationType.CREATE, `notices/${id}`);
        }
      }
    },
    [isFirebaseAdmin]
  );

  const updateNotice = useCallback(
    async (updated: Notice) => {
      cmsStore.updateNotice(updated);
      if (isFirebaseAdmin) {
        const id = sanitizeId(updated.id, 'notice');
        const patch: Record<string, unknown> = {
          title: cleanStr(updated.title, 240, 'University Circular'),
          category: ['admission', 'academic', 'examination', 'administrative', 'general'].includes(
            updated.category
          )
            ? updated.category
            : 'general',
          publishDate: cleanStr(updated.publishDate, 60, 'Fall 2026'),
          content: cleanStr(updated.content, 5000, 'Official CCNUST notification.'),
          important: Boolean(updated.important),
          updatedAt: serverTimestamp(),
        };
        if (updated.pdfUrl && updated.pdfUrl.trim()) {
          patch.pdfUrl = cleanStr(updated.pdfUrl, 1000);
        }
        if (updated.attachmentName && updated.attachmentName.trim()) {
          patch.attachmentName = cleanStr(updated.attachmentName, 200);
        }
        try {
          await updateDoc(doc(db, 'notices', id), patch);
        } catch (error) {
          handleFirestoreError(error, OperationType.UPDATE, `notices/${id}`);
        }
      }
    },
    [isFirebaseAdmin]
  );

  const deleteNotice = useCallback(
    async (noticeId: string) => {
      cmsStore.deleteNotice(noticeId);
      if (isFirebaseAdmin) {
        const id = sanitizeId(noticeId, 'notice');
        try {
          await deleteDoc(doc(db, 'notices', id));
        } catch (error) {
          handleFirestoreError(error, OperationType.DELETE, `notices/${id}`);
        }
      }
    },
    [isFirebaseAdmin]
  );

  // Gallery CRUD
  const addGalleryItem = useCallback(
    async (item: GalleryItem) => {
      const normalized: GalleryItem = { ...item, id: sanitizeId(item.id, 'gallery') };
      cmsStore.addGalleryItem(normalized);
      if (isFirebaseAdmin) {
        const { id, payload } = serializeGalleryForCreate(normalized);
        try {
          await setDoc(doc(db, 'gallery', id), payload);
        } catch (error) {
          handleFirestoreError(error, OperationType.CREATE, `gallery/${id}`);
        }
      }
    },
    [isFirebaseAdmin]
  );

  const updateGalleryItem = useCallback(
    async (updated: GalleryItem) => {
      cmsStore.updateGalleryItem(updated);
      if (isFirebaseAdmin) {
        const id = sanitizeId(updated.id, 'gallery');
        const allowedCats = [
          'campus',
          'academic',
          'events',
          'seminar',
          'sports',
          'cultural',
          'international',
          'student_life',
        ];
        const patch: Record<string, unknown> = {
          title: cleanStr(updated.title, 200, 'CCNUST Campus Photo'),
          category: allowedCats.includes(updated.category) ? updated.category : 'campus',
          imageUrl: cleanStr(updated.imageUrl, 1000),
          caption: cleanStr(updated.caption, 1000, updated.title || 'CCNUST Campus'),
          date: cleanStr(updated.date, 60, 'Fall 2026'),
          updatedAt: serverTimestamp(),
        };
        try {
          await updateDoc(doc(db, 'gallery', id), patch);
        } catch (error) {
          handleFirestoreError(error, OperationType.UPDATE, `gallery/${id}`);
        }
      }
    },
    [isFirebaseAdmin]
  );

  const deleteGalleryItem = useCallback(
    async (itemId: string) => {
      cmsStore.deleteGalleryItem(itemId);
      if (isFirebaseAdmin) {
        const id = sanitizeId(itemId, 'gallery');
        try {
          await deleteDoc(doc(db, 'gallery', id));
        } catch (error) {
          handleFirestoreError(error, OperationType.DELETE, `gallery/${id}`);
        }
      }
    },
    [isFirebaseAdmin]
  );

  // User Management CRUD
  const createUser = useCallback(
    async (user: UserAccount) => {
      const normalized: UserAccount = { ...user, id: sanitizeId(user.id, 'user') };
      const existing = cmsStore.getUsers();
      cmsStore.saveUsers([normalized, ...existing.filter((u) => u.id !== normalized.id)]);
      if (isFirebaseAdmin) {
        const { id, payload } = serializeUserForCreate(normalized);
        try {
          await setDoc(doc(db, 'portalUsers', id), payload);
        } catch (error) {
          handleFirestoreError(error, OperationType.CREATE, `portalUsers/${id}`);
        }
      }
    },
    [isFirebaseAdmin]
  );

  const updatePassword = useCallback(
    async (userId: string, newPass: string): Promise<boolean> => {
      const ok = cmsStore.updatePassword(userId, newPass);
      const targetUser = users.find(
        (u) => u.id === userId || u.email.toLowerCase() === userId.toLowerCase()
      );
      const docId = targetUser ? sanitizeId(targetUser.id, 'user') : sanitizeId(userId, 'user');
      if (isFirebaseAdmin || (authUser?.emailVerified && authUser.email === targetUser?.email)) {
        try {
          await updateDoc(doc(db, 'portalUsers', docId), {
            password: cleanStr(newPass, 128, '123456'),
            updatedAt: serverTimestamp(),
          });
        } catch (error) {
          if (isFirebaseAdmin) {
            handleFirestoreError(error, OperationType.UPDATE, `portalUsers/${docId}`);
          }
        }
      }
      return ok;
    },
    [isFirebaseAdmin, authUser, users]
  );

  const updateUserStatus = useCallback(
    async (userId: string, status: UserAccount['status']): Promise<boolean> => {
      const ok = cmsStore.updateUserStatus(userId, status);
      if (isFirebaseAdmin) {
        const docId = sanitizeId(userId, 'user');
        try {
          await updateDoc(doc(db, 'portalUsers', docId), {
            status,
            updatedAt: serverTimestamp(),
          });
        } catch (error) {
          handleFirestoreError(error, OperationType.UPDATE, `portalUsers/${docId}`);
        }
      }
      return ok;
    },
    [isFirebaseAdmin]
  );

  const updateUserRole = useCallback(
    async (userId: string, role: UserRole, isAdminFlag?: boolean): Promise<boolean> => {
      const ok = cmsStore.updateUserRole(userId, role, isAdminFlag);
      if (isFirebaseAdmin) {
        const docId = sanitizeId(userId, 'user');
        const patch: Record<string, unknown> = {
          role,
          updatedAt: serverTimestamp(),
        };
        if (typeof isAdminFlag === 'boolean') {
          patch.isAdmin = isAdminFlag;
        }
        try {
          await updateDoc(doc(db, 'portalUsers', docId), patch);
        } catch (error) {
          handleFirestoreError(error, OperationType.UPDATE, `portalUsers/${docId}`);
        }
      }
      return ok;
    },
    [isFirebaseAdmin]
  );

  const deleteUser = useCallback(
    async (userId: string) => {
      const next = cmsStore.getUsers().filter((u) => u.id !== userId);
      cmsStore.saveUsers(next);
      if (isFirebaseAdmin) {
        const docId = sanitizeId(userId, 'user');
        try {
          await deleteDoc(doc(db, 'portalUsers', docId));
        } catch (error) {
          handleFirestoreError(error, OperationType.DELETE, `portalUsers/${docId}`);
        }
      }
    },
    [isFirebaseAdmin]
  );

  const logLoginAudit = useCallback(
    async (user: UserAccount, status: LoginAuditLog['status']) => {
      const entry: LoginAuditLog = {
        id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        userId: user.id,
        userName: user.name,
        email: user.email,
        role: user.role,
        category: user.category,
        timestamp: new Date().toLocaleString(),
        status,
        ipDevice:
          typeof navigator !== 'undefined'
            ? `${navigator.platform || 'Browser'} - Verified`
            : 'Web Client',
      };
      const current = cmsStore.getLogs();
      cmsStore.saveLogs([entry, ...current.slice(0, 49)]);
      if (isFirebaseAdmin) {
        const { id, payload } = serializeLogForCreate(entry);
        try {
          await setDoc(doc(db, 'auditLogs', id), payload);
        } catch (error) {
          handleFirestoreError(error, OperationType.CREATE, `auditLogs/${id}`);
        }
      }
    },
    [isFirebaseAdmin]
  );

  // Admissions Intake & Status Update
  const submitAdmission = useCallback(
    async (
      appData: Omit<AdmissionApplication, 'id' | 'trackingNumber' | 'submittedAt' | 'status'>
    ): Promise<AdmissionApplication> => {
      const now = Date.now();
      const id = `adm_${now}_${Math.random().toString(36).slice(2, 6)}`;
      const trackingNumber = `CCN-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      const submittedAt = new Date().toLocaleString();

      const record: AdmissionApplication = {
        ...appData,
        id,
        trackingNumber,
        submittedAt,
        status: 'Received',
      };

      const payload: Record<string, unknown> = {
        id,
        trackingNumber: cleanStr(trackingNumber, 64),
        applicantName: cleanStr(record.applicantName, 150),
        fatherName: cleanStr(record.fatherName, 150),
        motherName: cleanStr(record.motherName, 150),
        email: cleanStr(record.email, 150),
        phone: cleanStr(record.phone, 40),
        programId: cleanStr(record.programId, 100),
        sscGpa: cleanStr(record.sscGpa, 20),
        hscGpa: cleanStr(record.hscGpa, 20),
        address: cleanStr(record.address, 400),
        status: 'Received',
        submittedAt: cleanStr(submittedAt, 80),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      if (record.dateOfBirth) payload.dateOfBirth = cleanStr(record.dateOfBirth, 40);
      if (record.gender) payload.gender = cleanStr(record.gender, 20);
      if (record.programName) payload.programName = cleanStr(record.programName, 200);
      if (record.semester) payload.semester = cleanStr(record.semester, 60);
      if (record.shift) payload.shift = cleanStr(record.shift, 40);
      if (record.sscRoll) payload.sscRoll = cleanStr(record.sscRoll, 40);
      if (record.sscBoard) payload.sscBoard = cleanStr(record.sscBoard, 60);
      if (record.sscYear) payload.sscYear = cleanStr(record.sscYear, 20);
      if (record.hscRoll) payload.hscRoll = cleanStr(record.hscRoll, 40);
      if (record.hscBoard) payload.hscBoard = cleanStr(record.hscBoard, 60);
      if (record.hscYear) payload.hscYear = cleanStr(record.hscYear, 20);
      if (record.guardianPhone) payload.guardianPhone = cleanStr(record.guardianPhone, 40);
      if (record.quotaCategory) payload.quotaCategory = cleanStr(record.quotaCategory, 100);

      try {
        await setDoc(doc(db, 'admissions', id), payload);
      } catch (err) {
        console.warn('Admission Firestore write fallback:', err);
      }

      const next = [record, ...loadLocalArray<AdmissionApplication>(LOCAL_ADMISSIONS_KEY)];
      saveLocalArray(LOCAL_ADMISSIONS_KEY, next);
      setLocalAdmissions(next);
      return record;
    },
    []
  );

  const updateAdmissionStatus = useCallback(
    async (admissionId: string, status: AdmissionApplication['status']) => {
      const next = loadLocalArray<AdmissionApplication>(LOCAL_ADMISSIONS_KEY).map((a) =>
        a.id === admissionId ? { ...a, status } : a
      );
      saveLocalArray(LOCAL_ADMISSIONS_KEY, next);
      setLocalAdmissions(next);

      if (isFirebaseAdmin) {
        const docId = sanitizeId(admissionId, 'adm');
        try {
          await updateDoc(doc(db, 'admissions', docId), {
            status,
            updatedAt: serverTimestamp(),
          });
        } catch (error) {
          handleFirestoreError(error, OperationType.UPDATE, `admissions/${docId}`);
        }
      }
    },
    [isFirebaseAdmin]
  );

  // Contact Messages Intake & Status Update
  const submitContact = useCallback(
    async (
      contactData: Omit<ContactMessage, 'id' | 'status' | 'submittedAt'>
    ): Promise<ContactMessage> => {
      const id = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
      const submittedAt = new Date().toLocaleString();

      const record: ContactMessage = {
        ...contactData,
        id,
        status: 'New',
        submittedAt,
      };

      const payload: Record<string, unknown> = {
        id,
        name: cleanStr(record.name, 150),
        email: cleanStr(record.email, 150),
        subject: cleanStr(record.subject, 150, 'General Inquiry'),
        message: cleanStr(record.message, 3000),
        status: 'New',
        submittedAt: cleanStr(submittedAt, 80),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      if (record.phone && record.phone.trim()) {
        payload.phone = cleanStr(record.phone, 40);
      }

      try {
        await setDoc(doc(db, 'contacts', id), payload);
      } catch (err) {
        console.warn('Contact Firestore write fallback:', err);
      }

      const next = [record, ...loadLocalArray<ContactMessage>(LOCAL_CONTACTS_KEY)];
      saveLocalArray(LOCAL_CONTACTS_KEY, next);
      setLocalContacts(next);
      return record;
    },
    []
  );

  const updateContactStatus = useCallback(
    async (contactId: string, status: ContactMessage['status']) => {
      const next = loadLocalArray<ContactMessage>(LOCAL_CONTACTS_KEY).map((c) =>
        c.id === contactId ? { ...c, status } : c
      );
      saveLocalArray(LOCAL_CONTACTS_KEY, next);
      setLocalContacts(next);

      if (isFirebaseAdmin) {
        const docId = sanitizeId(contactId, 'msg');
        try {
          await updateDoc(doc(db, 'contacts', docId), {
            status,
            updatedAt: serverTimestamp(),
          });
        } catch (error) {
          handleFirestoreError(error, OperationType.UPDATE, `contacts/${docId}`);
        }
      }
    },
    [isFirebaseAdmin]
  );

  const value = useMemo<CmsContextValue>(
    () => ({
      notices,
      gallery,
      users,
      logs,
      admissions,
      contacts,
      authUser,
      authReady,
      isFirebaseAdmin,
      isCloudSeeded,
      cloudConnected,
      isSyncing,
      syncError,
      refresh,
      signInWithGoogle,
      signOutFirebase,
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
      updateUserRole,
      deleteUser,
      logLoginAudit,
      submitAdmission,
      updateAdmissionStatus,
      submitContact,
      updateContactStatus,
    }),
    [
      notices,
      gallery,
      users,
      logs,
      admissions,
      contacts,
      authUser,
      authReady,
      isFirebaseAdmin,
      isCloudSeeded,
      cloudConnected,
      isSyncing,
      syncError,
      refresh,
      signInWithGoogle,
      signOutFirebase,
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
      updateUserRole,
      deleteUser,
      logLoginAudit,
      submitAdmission,
      updateAdmissionStatus,
      submitContact,
      updateContactStatus,
    ]
  );

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCmsData(): CmsContextValue {
  const ctx = useContext(CmsContext);
  if (!ctx) {
    throw new Error('useCmsData must be used inside a <CmsProvider>.');
  }
  return ctx;
}
