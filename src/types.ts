export type UserRole =
  | 'student'
  | 'guardian'
  | 'faculty'
  | 'hod'
  | 'exam_controller'
  | 'admission_officer'
  | 'accounts'
  | 'officer'
  | 'admin';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  rollNumber?: string;
  studentId?: string;
  designation?: string;
  department?: string;
  faculty?: string;
  avatarUrl?: string;
  isAdmin?: boolean;
}

export interface Program {
  id: string;
  departmentId: string;
  name: string;
  degree: string;
  level: 'Undergraduate' | 'Graduate' | 'Postgraduate';
  duration: string;
  totalCredits: number;
  totalSemesters: number;
  tuitionFeeText: string;
  estimatedTotalFee: string;
  admissionRequirements: string[];
  overview: string;
  vision?: string;
  mission?: string;
  curriculumOutline: {
    semester: string;
    courses: { code: string; title: string; credits: number }[];
  }[];
  careerOpportunities: string[];
  seatCapacity?: number;
  featured?: boolean;
}

export interface Department {
  id: string;
  facultyId: string;
  name: string;
  code: string;
  shortName: string;
  headOfDepartment: string;
  hodQualification?: string;
  description: string;
  vision: string;
  mission: string;
  labFacilities: string[];
  programs: Program[];
  contactEmail: string;
  contactPhone: string;
}

export interface Faculty {
  id: string;
  name: string;
  shortName: string;
  deanName: string;
  description: string;
  iconName: string;
  departments: Department[];
}

export interface LeadershipMember {
  id: string;
  name: string;
  designation: string;
  category: 'bot' | 'leadership' | 'syndicate' | 'academic_council' | 'administration';
  qualification: string;
  image: string;
  bio: string;
  email?: string;
  phone?: string;
  officeRoom?: string;
  message?: string;
  responsibilities?: string[];
  order?: number;
  academicBackground?: string[];
  degrees?: string[];
  statutoryBasis?: string;
  directDeskPhone?: string;
}

export interface BoardOfTrusteesMember {
  id: string;
  name: string;
  role: string;
  isChairman?: boolean;
  isExOfficio?: boolean;
  affiliation?: string;
  bio?: string;
  image?: string;
}

export interface SyndicateMember {
  id: string;
  name: string;
  designationInSyndicate: string;
  institutionalRole: string;
  isChairperson?: boolean;
  isMemberSecretary?: boolean;
}

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  departmentId: string;
  departmentName: string;
  qualification: string;
  email: string;
  phone?: string;
  image: string;
  bio: string;
  researchInterests: string[];
  roomNo?: string;
}

export interface Notice {
  id: string;
  title: string;
  category: 'admission' | 'academic' | 'examination' | 'administrative' | 'general';
  publishDate: string;
  content: string;
  important?: boolean;
  pdfUrl?: string;
  attachmentName?: string;
}

export interface UniversityEvent {
  id: string;
  title: string;
  category: 'academic' | 'seminar' | 'workshop' | 'cultural' | 'sports' | 'international';
  date: string;
  time: string;
  venue: string;
  image: string;
  description: string;
  speakers?: string[];
  registrationOpen?: boolean;
}

export interface InternationalCollaboration {
  id: string;
  partnerName: string;
  country: string;
  countryCode: string;
  mouType: string;
  partnershipScope: string;
  description: string;
  jointActivities: string[];
  websiteUrl?: string;
}

export interface Scholarship {
  id: string;
  title: string;
  waiver: string;
  eligibility: string;
  criteria: string[];
  category: 'Merit' | 'Freedom Fighter' | 'Special Quota' | 'Need-based' | 'Sibling/Spouse';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'campus' | 'academic' | 'events' | 'seminar' | 'sports' | 'cultural' | 'international' | 'student_life';
  imageUrl: string;
  caption: string;
  date?: string;
}

export interface CampusClub {
  id: string;
  name: string;
  category: string;
  description: string;
  activities: string[];
  advisor: string;
  memberCount: string;
  icon: string;
}

export interface AdmissionApplication {
  id: string;
  trackingNumber: string;
  applicantName: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  programId: string;
  programName: string;
  semester?: string;
  shift?: string;
  sscRoll: string;
  sscBoard: string;
  sscGpa: string;
  sscYear: string;
  hscRoll: string;
  hscBoard: string;
  hscGpa: string;
  hscYear: string;
  address: string;
  guardianPhone: string;
  quotaCategory?: string;
  submittedAt: string;
  status: 'Received' | 'Under Review' | 'Test Scheduled' | 'Admitted' | 'Waitlisted';
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'New' | 'In Progress' | 'Resolved';
  submittedAt: string;
}

export interface DepartmentEnrollment {
  id: string;
  code: string;
  label: string;
  shortName: string;
  faculty: string;
  value: number; // Total enrolled students
  undergraduate: number;
  graduate: number;
  maleStudents: number;
  femaleStudents: number;
  scholarshipHolders: number;
  color: string;
  accentColor: string;
  icon: string;
  description: string;
}
export interface JournalArticle {
  id: string;
  title: string;
  authors: string[];
  department: string;
  volume: string;
  issue: string;
  year: number;
  doi: string;
  abstract: string;
  keywords: string[];
  pdfUrl?: string;
  downloadCount: number;
  publishedDate: string;
}

export interface DownloadableForm {
  id: string;
  formCode: string;
  title: string;
  category: 'Examination' | 'Registrar' | 'Accounts' | 'Library & Clearance' | 'Admissions';
  office: string;
  fileType: 'PDF' | 'DOCX';
  fileSize: string;
  description: string;
  feeAmount?: string;
  processingTime?: string;
  requiredAttachments: string[];
}

export interface BusRoute {
  id: string;
  routeNumber: string;
  routeName: string;
  startPoint: string;
  endPoint: string;
  viaPoints: string[];
  morningDeparture: string[];
  middayDeparture: string[];
  eveningReturn: string[];
  busNumber: string;
  driverName: string;
  driverPhone: string;
  supervisorName: string;
  supervisorPhone: string;
  capacity: number;
  fareStatus: string;
}

export interface AlumniProfile {
  id: string;
  name: string;
  graduationYear: number;
  degree: string;
  department: string;
  currentRole: string;
  company: string;
  location: string;
  image: string;
  achievement: string;
  isMentor?: boolean;
  linkedinUrl?: string;
  quote?: string;
}

export interface JobInternship {
  id: string;
  title: string;
  company: string;
  companyType: 'Tech & Software' | 'Telecom & Network' | 'Engineering & Construction' | 'Financial & Banking' | 'Pharmaceutical & Health';
  jobType: 'Full-time' | 'Internship' | 'Trainee Engineer';
  location: string;
  salaryRange: string;
  deadline: string;
  eligibleDepartments: string[];
  description: string;
  keyResponsibilities: string[];
  requirements: string[];
  applyEmail: string;
  featured?: boolean;
}
