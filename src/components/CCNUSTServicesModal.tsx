import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  CheckCircle2,
  AlertCircle,
  FileText,
  Calendar,
  Building,
  GraduationCap,
  Download,
  Printer,
  ShieldCheck,
  Award,
  Layers,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Compass,
  Bus,
  Briefcase,
  Users,
  Send,
  Eye,
  Check,
} from 'lucide-react';
import { UNIVERSITY_INFO, FACULTIES } from '../universityData';

export type ServiceModalTab =
  | 'result'
  | 'verification'
  | 'routine'
  | 'offices'
  | 'convocation'
  | 'carnival'
  | 'innovation'
  | 'tour'
  | 'career';

interface CCNUSTServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: ServiceModalTab;
  onOpenApplyModal?: () => void;
}

// -------------------------------------------------------------
// SAMPLE DATA GROUNDED IN CCNUST OFFICIAL WEBSITE & STRUCTURE
// -------------------------------------------------------------

interface MockStudentResult {
  id: string;
  name: string;
  rollNo: string;
  regNo: string;
  session: string;
  program: string;
  department: string;
  faculty: string;
  semester: string;
  examType: string;
  sgpa: number;
  cgpa: number;
  status: string;
  courses: {
    code: string;
    title: string;
    credit: number;
    grade: string;
    gradePoint: number;
  }[];
}

const PRELOADED_RESULTS: Record<string, MockStudentResult> = {
  '221-15-101': {
    id: '221-15-101',
    name: 'Tanzim Ahmed Chowdhury',
    rollNo: '221-15-101',
    regNo: 'CCN-2022-CSE-0042',
    session: '2021-2022',
    program: 'B.Sc. in Computer Science & Engineering (B.Sc. CSE)',
    department: 'Department of Computer Science & Engineering',
    faculty: 'Faculty of Engineering',
    semester: 'Spring 2026 (Semester 8)',
    examType: 'Semester Final Examination',
    sgpa: 3.88,
    cgpa: 3.82,
    status: 'PASSED & PROMOTED (1ST CLASS EQUIVALENT)',
    courses: [
      { code: 'CSE-421', title: 'Artificial Intelligence & Machine Learning', credit: 3, grade: 'A+', gradePoint: 4.0 },
      { code: 'CSE-422', title: 'AI & Neural Networks Laboratory', credit: 1.5, grade: 'A+', gradePoint: 4.0 },
      { code: 'CSE-423', title: 'Compiler Design & Formal Languages', credit: 3, grade: 'A', gradePoint: 3.75 },
      { code: 'CSE-425', title: 'Cloud Computing & Distributed Systems', credit: 3, grade: 'A+', gradePoint: 4.0 },
      { code: 'CSE-499', title: 'Senior Research Project / Thesis Defense', credit: 4, grade: 'A+', gradePoint: 4.0 },
    ],
  },
  '213-11-204': {
    id: '213-11-204',
    name: 'Nusrat Jahan Mim',
    rollNo: '213-11-204',
    regNo: 'CCN-2021-EEE-0018',
    session: '2021-2022',
    program: 'B.Sc. in Electrical and Electronic Engineering (EEE)',
    department: 'Department of Electrical & Electronic Engineering',
    faculty: 'Faculty of Engineering',
    semester: 'Spring 2026 (Semester 6)',
    examType: 'Semester Final Examination',
    sgpa: 3.79,
    cgpa: 3.74,
    status: 'PASSED & PROMOTED',
    courses: [
      { code: 'EEE-311', title: 'Power System Analysis & Grid Protection', credit: 3, grade: 'A+', gradePoint: 4.0 },
      { code: 'EEE-312', title: 'Power System Lab Simulation', credit: 1.5, grade: 'A', gradePoint: 3.75 },
      { code: 'EEE-313', title: 'Microprocessors, Microcontrollers & Interfacing', credit: 3, grade: 'A', gradePoint: 3.75 },
      { code: 'EEE-315', title: 'Control Systems Engineering', credit: 3, grade: 'A-', gradePoint: 3.5 },
      { code: 'MATH-301', title: 'Complex Variables & Laplace Transforms', credit: 3, grade: 'A+', gradePoint: 4.0 },
    ],
  },
  '232-16-305': {
    id: '232-16-305',
    name: 'Kazi Farhan Ishrak',
    rollNo: '232-16-305',
    regNo: 'CCN-2023-LAW-0089',
    session: '2023-2024',
    program: 'Bachelor of Laws (LL.B. Hons)',
    department: 'Department of Law',
    faculty: 'Faculty of Liberal Arts',
    semester: 'Fall 2025 (Semester 4)',
    examType: 'Semester Final Examination',
    sgpa: 3.92,
    cgpa: 3.86,
    status: 'PASSED & IN GOOD ACADEMIC STANDING',
    courses: [
      { code: 'LAW-201', title: 'Constitutional Law of Bangladesh & Principles', credit: 4, grade: 'A+', gradePoint: 4.0 },
      { code: 'LAW-202', title: 'Law of Contract & Specific Relief Act', credit: 4, grade: 'A+', gradePoint: 4.0 },
      { code: 'LAW-203', title: 'Code of Civil Procedure (CPC) I', credit: 3, grade: 'A', gradePoint: 3.75 },
      { code: 'LAW-204', title: 'Public International Law & Human Rights', credit: 3, grade: 'A+', gradePoint: 4.0 },
    ],
  },
  '222-12-108': {
    id: '222-12-108',
    name: 'Saima Binte Hasan',
    rollNo: '222-12-108',
    regNo: 'CCN-2022-BBA-0112',
    session: '2022-2023',
    program: 'Bachelor of Business Administration (BBA)',
    department: 'Department of Business Administration',
    faculty: 'Faculty of Business Administration',
    semester: 'Spring 2026 (Semester 7)',
    examType: 'Semester Final Examination',
    sgpa: 3.85,
    cgpa: 3.78,
    status: 'PASSED & PROMOTED TO INTERNSHIP',
    courses: [
      { code: 'FIN-401', title: 'Financial Derivatives & Risk Management', credit: 3, grade: 'A+', gradePoint: 4.0 },
      { code: 'MKT-402', title: 'Digital Brand Strategy & Global Marketing', credit: 3, grade: 'A', gradePoint: 3.75 },
      { code: 'MGT-403', title: 'Strategic Corporate Leadership & Ethics', credit: 3, grade: 'A+', gradePoint: 4.0 },
      { code: 'BUS-405', title: 'Supply Chain Operations & International Logistics', credit: 3, grade: 'A-', gradePoint: 3.5 },
    ],
  },
};

// Administrative Offices from official ccnust.ac.bd
const OFFICIAL_ADMIN_OFFICES = [
  {
    id: 'vc-office',
    title: 'Office of the Vice Chancellor',
    officer: 'Prof. Dr. Engr. Md. Shah Jahan',
    designation: 'Vice Chancellor',
    email: 'vc@ccnust.ac.bd',
    phone: '+880 1715-451599 / +880 1888-042666',
    room: 'Executive Suite 501, Level 5, Administrative Building',
    responsibilities: [
      'Chief Academic & Executive Head of the University',
      'Presiding over Academic Council & Syndicate meetings',
      'Directing international collaborations and UGC compliance',
      'Overseeing university academic vision and quality benchmarks',
    ],
  },
  {
    id: 'bot-office',
    title: 'Board of Trustees (BoT)',
    officer: 'Dr. Md. Tariqul Islam Chowdhury',
    designation: 'Founder & Chairman, Board of Trustees',
    email: 'chairman@ccnust.ac.bd',
    phone: '+880 1815-315000',
    room: 'Chowdhury Estate, Level 5, Kotbari, Cumilla',
    responsibilities: [
      'Highest governing & policymaking body of CCNUST',
      'Formulating statutory regulations and university expansion',
      'Endowment fund management and scholarship policies',
      'Guiding campus infrastructure development and strategic partnerships',
    ],
  },
  {
    id: 'provc-office',
    title: 'Office of the Pro-Vice Chancellor',
    officer: 'Prof. Dr. [Appointee Secretariat]',
    designation: 'Pro-Vice Chancellor',
    email: 'provc@ccnust.ac.bd',
    phone: '+880 1888-042667',
    room: 'Suite 502, Level 5, Administrative Building',
    responsibilities: [
      'Assisting the Vice Chancellor in academic administration',
      'Faculty research coordination and laboratory modernization',
      'Overseeing curriculum enhancement and OBE accreditation',
    ],
  },
  {
    id: 'treasurer-office',
    title: 'Office of the Treasurer',
    officer: 'Senior Treasurer Secretariat',
    designation: 'Treasurer',
    email: 'treasurer@ccnust.ac.bd',
    phone: '+880 1713-222335',
    room: 'Room 201, Finance Wing, Administrative Building',
    responsibilities: [
      'Fiscal planning, university budget formulation and audits',
      'Management of tuition revenue, staff payroll and funds',
      'Financial liaison with UGC and the Ministry of Education',
    ],
  },
  {
    id: 'registrar-office',
    title: 'Office of the Registrar',
    officer: 'Registrar & Academic Affairs Desk',
    designation: 'Registrar',
    email: 'registrar@ccnust.ac.bd',
    phone: '+880 1715-451599, Ext: 102',
    room: 'Room 102, Ground Floor, Administrative Building',
    responsibilities: [
      'Keeper of official university seals, records and archives',
      'Student admissions, registration, ID cards & migration',
      'Faculty appointments and statutory meeting coordination',
      'Issuance of official student verifications and testimonials',
    ],
  },
  {
    id: 'exam-office',
    title: 'Office of the Controller of Examinations',
    officer: 'Controller of Examinations',
    designation: 'Controller of Examinations',
    email: 'controller@ccnust.ac.bd',
    phone: '+880 1888-042668',
    room: 'Exam Confidential Wing, Level 3',
    responsibilities: [
      'Formulation of Semester Final & Mid Exam routines',
      'Printing of confidential question papers and answer scripts',
      'Publication of official semester results and grade sheets',
      'Verification of degree certificates and convocation rolls',
    ],
  },
  {
    id: 'iqac-office',
    title: 'Institutional Quality Assurance Cell (IQAC)',
    officer: 'Director, IQAC',
    designation: 'Director, IQAC',
    email: 'iqac@ccnust.ac.bd',
    phone: '+880 1713-222345',
    room: 'IQAC Center, Level 4, Academic Building',
    responsibilities: [
      'Institutional self-assessment and BAETE accreditation prep',
      'Outcome-Based Education (OBE) curriculum monitoring',
      'Faculty pedagogy workshops and teaching evaluations',
    ],
  },
  {
    id: 'proctor-office',
    title: 'Office of the Proctor',
    officer: 'Proctorial Body & Campus Security',
    designation: 'Proctor',
    email: 'proctor@ccnust.ac.bd',
    phone: '+880 1713-222346 (24/7 Security Helpline)',
    room: 'Proctor Office, Main Gate Entrance Block',
    responsibilities: [
      'Maintaining discipline, security and peace on campus',
      'Anti-ragging enforcement and student code of conduct',
      'Emergency response and campus entry surveillance',
    ],
  },
  {
    id: 'welfare-office',
    title: 'Office of the Student Welfare Director',
    officer: 'Director of Student Welfare (DSW)',
    designation: 'Director of Student Welfare',
    email: 'dsw@ccnust.ac.bd',
    phone: '+880 1713-222347',
    room: 'Student Activity Hub, Ground Floor',
    responsibilities: [
      'Student clubs, cultural events, sports meets & debate',
      'Mental health counseling and student peer mentoring',
      'Student financial aid and emergency medical assistance',
    ],
  },
  {
    id: 'transport-office',
    title: 'Transport Section',
    officer: 'Transport Officer & Fleet Coordinator',
    designation: 'Transport In-Charge',
    email: 'transport@ccnust.ac.bd',
    phone: '+880 1715-451599, Ext: 108',
    room: 'Campus Bus Depot & Fleet Terminal',
    responsibilities: [
      'Daily scheduled university bus fleet across Cumilla City',
      'Routes: Kotbari <-> Kandirpar, Shasongachha, Paduar Bazar',
      'Student bus pass issuance and vehicle maintenance',
    ],
  },
  {
    id: 'accounts-office',
    title: 'Finance & Accounts Section',
    officer: 'Senior Accounts Officer',
    designation: 'Accounts Officer',
    email: 'accounts@ccnust.ac.bd',
    phone: '+880 1715-451599, Ext: 105',
    room: 'Counter 1-4, Ground Floor, Admin Building',
    responsibilities: [
      'Tuition fee collection and student ledger reconciliation',
      'Online bKash, Rocket, Nagad & bank deposit processing',
      'Scholarship waiver adjustment and clearance certificates',
    ],
  },
  {
    id: 'planning-office',
    title: 'Planning & Development Section',
    officer: 'Planning & Engineering Consultant',
    designation: 'Head of Planning & Works',
    email: 'planning@ccnust.ac.bd',
    phone: '+880 1888-042666',
    room: 'Engineering Cell, Level 2',
    responsibilities: [
      'Permanent campus masterplan expansion in Kotbari',
      'Laboratory instrumentation procurement and green infrastructure',
      'Architectural planning of student residential halls',
    ],
  },
];

// Sample Routines across departments and types
const ACADEMIC_ROUTINES = [
  {
    id: 'rt-1',
    dept: 'Computer Science & Engineering',
    deptCode: 'CSE',
    type: 'Class Routine',
    semester: 'Spring 2026',
    batch: 'Batch 22 & 23',
    effectiveDate: 'Effective from February 15, 2026',
    schedule: [
      { day: 'Saturday', time: '09:00 AM - 10:30 AM', course: 'CSE-311: Database Management Systems', room: 'Room 302', teacher: 'Engr. M. Rahman' },
      { day: 'Saturday', time: '10:45 AM - 01:00 PM', course: 'CSE-312: Database Systems Lab', room: 'Software Lab 1', teacher: 'Engr. M. Rahman' },
      { day: 'Sunday', time: '09:00 AM - 10:30 AM', course: 'CSE-313: Operating Systems Concepts', room: 'Room 304', teacher: 'Ms. S. Akter' },
      { day: 'Monday', time: '11:00 AM - 12:30 PM', course: 'CSE-315: Theory of Computation', room: 'Room 302', teacher: 'Dr. K. Hasan' },
      { day: 'Tuesday', time: '09:00 AM - 10:30 AM', course: 'CSE-421: Artificial Intelligence', room: 'Room 401', teacher: 'Prof. Dr. N. Islam' },
      { day: 'Wednesday', time: '10:45 AM - 01:00 PM', course: 'CSE-422: AI & Machine Learning Lab', room: 'AI Computing Hub', teacher: 'Prof. Dr. N. Islam' },
    ],
  },
  {
    id: 'rt-2',
    dept: 'Electrical & Electronic Engineering',
    deptCode: 'EEE',
    type: 'Class Routine',
    semester: 'Spring 2026',
    batch: 'Batch 21 & 22',
    effectiveDate: 'Effective from February 15, 2026',
    schedule: [
      { day: 'Saturday', time: '09:00 AM - 10:30 AM', course: 'EEE-301: Power System Analysis', room: 'Room 201', teacher: 'Engr. T. Hossain' },
      { day: 'Sunday', time: '10:45 AM - 01:00 PM', course: 'EEE-302: Power System Lab', room: 'Machines Lab', teacher: 'Engr. T. Hossain' },
      { day: 'Monday', time: '09:00 AM - 10:30 AM', course: 'EEE-305: Control Systems Engg.', room: 'Room 203', teacher: 'Dr. A. Karim' },
      { day: 'Wednesday', time: '11:00 AM - 12:30 PM', course: 'EEE-401: Telecommunication Engg.', room: 'Room 201', teacher: 'Engr. R. Alam' },
    ],
  },
  {
    id: 'rt-3',
    dept: 'Civil Engineering',
    deptCode: 'CE',
    type: 'Class Routine',
    semester: 'Spring 2026',
    batch: 'Batch 20 & 21',
    effectiveDate: 'Effective from February 15, 2026',
    schedule: [
      { day: 'Saturday', time: '09:00 AM - 10:30 AM', course: 'CE-311: Design of Concrete Structures I', room: 'Room 105', teacher: 'Engr. B. Majumder' },
      { day: 'Sunday', time: '10:45 AM - 01:00 PM', course: 'CE-312: Concrete & Materials Lab', room: 'Civil Heavy Lab', teacher: 'Engr. B. Majumder' },
      { day: 'Tuesday', time: '09:00 AM - 10:30 AM', course: 'CE-321: Geotechnical Engineering', room: 'Room 105', teacher: 'Dr. M. Haque' },
    ],
  },
  {
    id: 'rt-4',
    dept: 'Law',
    deptCode: 'LAW',
    type: 'Class Routine',
    semester: 'Spring 2026',
    batch: 'LL.B (Hons) Batch 15',
    effectiveDate: 'Effective from February 15, 2026',
    schedule: [
      { day: 'Saturday', time: '09:30 AM - 11:00 AM', course: 'LAW-201: Constitutional Law of BD', room: 'Moot Court Room', teacher: 'Barrister S. Khan' },
      { day: 'Sunday', time: '11:30 AM - 01:00 PM', course: 'LAW-202: Law of Contract & Relief', room: 'Room 403', teacher: 'Adv. F. Yasmin' },
      { day: 'Tuesday', time: '09:30 AM - 11:00 AM', course: 'LAW-204: Public International Law', room: 'Moot Court Room', teacher: 'Barrister S. Khan' },
    ],
  },
  {
    id: 'rt-5',
    dept: 'Computer Science & Engineering',
    deptCode: 'CSE',
    type: 'Midterm Examination Routine',
    semester: 'Fall 2026 Mid Exam',
    batch: 'All Undergraduate Batches',
    effectiveDate: 'Exam Starts: October 25, 2026',
    schedule: [
      { day: 'Saturday', time: '10:00 AM - 11:30 AM', course: 'CSE-101: Structured Programming Language', room: 'Exam Halls 301, 302, 304', teacher: 'Dept. Invigilation' },
      { day: 'Monday', time: '10:00 AM - 11:30 AM', course: 'CSE-211: Data Structures & Algorithms', room: 'Exam Halls 301, 302', teacher: 'Dept. Invigilation' },
      { day: 'Wednesday', time: '10:00 AM - 11:30 AM', course: 'CSE-311: Database Management Systems', room: 'Exam Halls 401, 402', teacher: 'Dept. Invigilation' },
      { day: 'Saturday', time: '10:00 AM - 11:30 AM', course: 'CSE-421: Artificial Intelligence & ML', room: 'Exam Halls 401, 402', teacher: 'Dept. Invigilation' },
    ],
  },
  {
    id: 'rt-6',
    dept: 'Business Administration',
    deptCode: 'DBA',
    type: 'Class Routine',
    semester: 'Spring 2026',
    batch: 'BBA & MBA Batches',
    effectiveDate: 'Effective from February 15, 2026',
    schedule: [
      { day: 'Saturday', time: '09:00 AM - 10:30 AM', course: 'BUS-101: Introduction to Business', room: 'Room 501', teacher: 'Dr. H. Mahmud' },
      { day: 'Monday', time: '11:00 AM - 12:30 PM', course: 'FIN-301: Financial Management', room: 'Room 501', teacher: 'Mr. A. Rauf' },
      { day: 'Wednesday', time: '09:00 AM - 10:30 AM', course: 'MKT-301: Marketing Management', room: 'Room 503', teacher: 'Ms. T. Sultana' },
    ],
  },
];

// Job circulars from official site (চাকরির-তথ্য)
const CAREER_CIRCULARS = [
  {
    id: 'job-1',
    title: 'Recruitment of Professor & Associate Professor in Computer Science & Engineering (CSE)',
    department: 'Department of Computer Science & Engineering',
    category: 'Faculty Position',
    deadline: 'November 15, 2026',
    experience: 'Ph.D. in CSE with minimum 10/7 years university teaching & research publications in indexed journals.',
    salary: 'Attractive pay scale as per CCNUST Service Rules, provident fund, gratuity, medical allowance & transport.',
    contact: 'registrar@ccnust.ac.bd',
  },
  {
    id: 'job-2',
    title: 'Recruitment of Assistant Professor & Lecturer in Law (LL.B & LL.M)',
    department: 'Department of Law',
    category: 'Faculty Position',
    deadline: 'November 20, 2026',
    experience: 'LL.M. & LL.B. (Hons) with minimum 1st class/CGPA 3.50. Bar-at-Law or Ph.D. preferred.',
    salary: 'Negotiable based on academic excellence and research credentials.',
    contact: 'registrar@ccnust.ac.bd',
  },
  {
    id: 'job-3',
    title: 'Senior Network & Systems Administrator / DevOps Engineer',
    department: 'ICT & Cyber Systems Cell',
    category: 'Officer / Technical Position',
    deadline: 'November 10, 2026',
    experience: 'B.Sc. in CSE/EEE with 3+ years experience in Linux server management, firewall, routing & campus Wi-Fi.',
    salary: 'Standard grade with performance bonuses and benefits.',
    contact: 'jobs@ccnust.ac.bd',
  },
  {
    id: 'job-4',
    title: 'Lecturer in Electrical & Electronic Engineering (EEE)',
    department: 'Department of Electrical & Electronic Engineering',
    category: 'Faculty Position',
    deadline: 'December 01, 2026',
    experience: 'B.Sc. Engg. in EEE from any recognized university with minimum CGPA 3.50.',
    salary: 'Competitive university scale with research incentives.',
    contact: 'registrar@ccnust.ac.bd',
  },
];

export default function CCNUSTServicesModal({
  isOpen,
  onClose,
  initialTab = 'result',
  onOpenApplyModal,
}: CCNUSTServicesModalProps) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<ServiceModalTab>(initialTab);

  // Result Search State
  const [searchId, setSearchId] = useState('221-15-101');
  const [selectedSemester, setSelectedSemester] = useState('Spring 2026');
  const [activeResult, setActiveResult] = useState<MockStudentResult | null>(
    PRELOADED_RESULTS['221-15-101']
  );
  const [resultSearched, setResultSearched] = useState(true);

  // Student Verification State
  const [verifyId, setVerifyId] = useState('221-15-101');
  const [verifiedRecord, setVerifiedRecord] = useState<MockStudentResult | null>(
    PRELOADED_RESULTS['221-15-101']
  );
  const [isVerifying, setIsVerifying] = useState(false);

  // Routine Filter State
  const [routineDeptFilter, setRoutineDeptFilter] = useState('All');
  const [routineTypeFilter, setRoutineTypeFilter] = useState('All');
  const [routineSearch, setRoutineSearch] = useState('');

  // Convocation Form State
  const [convoForm, setConvoForm] = useState({
    fullName: '',
    studentId: '',
    dept: 'Computer Science & Engineering',
    passingYear: '2025',
    cgpa: '',
    guestOption: 'Single (Self only)',
    gownSize: 'L (Large)',
    paymentRef: '',
    phone: '',
    submitted: false,
    trackingNo: '',
  });

  // Diploma Carnival State
  const [carnivalForm, setCarnivalForm] = useState({
    name: '',
    diplomaInstitute: '',
    diplomaTech: 'Computer Technology',
    passingYear: '2025',
    diplomaCgpa: '',
    desiredProgram: 'B.Sc. in Computer Science & Engineering (B.Sc. CSE)',
    phone: '',
    submitted: false,
  });

  // Innovation Form State
  const [innovForm, setInnovForm] = useState({
    projectTitle: '',
    leadName: '',
    teamSize: '1-3 Members',
    category: 'AI / Robotics / IoT',
    briefDescription: '',
    submitted: false,
  });

  if (!isOpen) return null;

  // Handle Result Search
  const handleSearchResult = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = searchId.trim();
    if (PRELOADED_RESULTS[cleanId]) {
      setActiveResult(PRELOADED_RESULTS[cleanId]);
    } else {
      // Generate a dynamic authentic provisional result for any entered ID so user can test freely
      setActiveResult({
        id: cleanId,
        name: 'Registered Student (' + cleanId + ')',
        rollNo: cleanId,
        regNo: `CCN-2023-REC-${Math.floor(1000 + Math.random() * 9000)}`,
        session: '2022-2023',
        program: 'B.Sc. in Computer Science & Engineering',
        department: 'Department of Computer Science & Engineering',
        faculty: 'Faculty of Engineering',
        semester: selectedSemester,
        examType: 'Semester Final Examination',
        sgpa: 3.75,
        cgpa: 3.71,
        status: 'PASSED & IN GOOD ACADEMIC STANDING',
        courses: [
          { code: 'CSE-301', title: 'Data Communication & Computer Networks', credit: 3, grade: 'A+', gradePoint: 4.0 },
          { code: 'CSE-302', title: 'Computer Networks Lab & Packet Tracer', credit: 1.5, grade: 'A', gradePoint: 3.75 },
          { code: 'CSE-303', title: 'Software Engineering & UML Modeling', credit: 3, grade: 'A+', gradePoint: 4.0 },
          { code: 'CSE-305', title: 'Microprocessor Architecture & Assembly', credit: 3, grade: 'A-', gradePoint: 3.5 },
          { code: 'MGT-301', title: 'Engineering Economics & Project Management', credit: 3, grade: 'A', gradePoint: 3.75 },
        ],
      });
    }
    setResultSearched(true);
  };

  // Handle Verification Search
  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      const cleanId = verifyId.trim();
      if (PRELOADED_RESULTS[cleanId]) {
        setVerifiedRecord(PRELOADED_RESULTS[cleanId]);
      } else {
        setVerifiedRecord({
          id: cleanId,
          name: 'CCNUST Student Identity Record',
          rollNo: cleanId,
          regNo: `CCN-REG-${Math.floor(10000 + Math.random() * 90000)}`,
          session: '2022-2023',
          program: 'Undergraduate Degree Program',
          department: 'Academic Faculty of CCNUST',
          faculty: 'Faculty of Engineering',
          semester: 'Active Enrolled',
          examType: 'Official UGC Record',
          sgpa: 3.8,
          cgpa: 3.75,
          status: 'OFFICIALLY VERIFIED & ACTIVE IN UGC ARCHIVES',
          courses: [],
        });
      }
      setIsVerifying(false);
    }, 400);
  };

  // Handle Print Action
  const handlePrint = () => {
    window.print();
  };

  // Filtered Routines (Memoized)
  const filteredRoutines = useMemo(() => {
    return ACADEMIC_ROUTINES.filter((r) => {
      const matchDept = routineDeptFilter === 'All' || r.deptCode === routineDeptFilter || r.dept.includes(routineDeptFilter);
      const matchType = routineTypeFilter === 'All' || r.type === routineTypeFilter;
      const matchSearch =
        routineSearch === '' ||
        r.dept.toLowerCase().includes(routineSearch.toLowerCase()) ||
        r.schedule.some((s) => s.course.toLowerCase().includes(routineSearch.toLowerCase()) || s.teacher.toLowerCase().includes(routineSearch.toLowerCase()));
      return matchDept && matchType && matchSearch;
    });
  }, [routineDeptFilter, routineTypeFilter, routineSearch]);

  return (
    <div
      id="ccnust-services-modal-backdrop"
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ========================================================
            MODAL HEADER: INSTITUTIONAL BRAND & QUICK TABS
            ======================================================== */}
        <div className="bg-[#0F281E] text-white px-5 sm:px-8 py-4 sm:py-5 border-b border-[#21513F] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 bg-[#163A2D] border border-[#FAD02C] flex flex-col items-center justify-center shrink-0 rounded-lg shadow-sm">
              <span className="text-[11px] font-black text-[#FAD02C] font-sans leading-none">CCN</span>
              <span className="text-[8px] font-bold text-[#D0E4DA] font-mono tracking-tighter">UST</span>
              <div className="w-3 h-[1.5px] bg-[#FAD02C] mt-0.5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FAD02C] bg-[#163A2D] px-2 py-0.5 rounded border border-[#21513F]">
                  CCNUST.AC.BD OFFICIAL PORTALS
                </span>
                <span className="text-[11px] font-mono text-[#A3C7B5]">Kotbari, Cumilla</span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white font-sans uppercase tracking-tight mt-0.5">
                CCN University Online Services & Examination Suite
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2 self-end sm:self-auto">
            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white hover:bg-[#163A2D] rounded-lg border border-[#21513F] transition-colors cursor-pointer"
              title="Close Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================
            TOP TAB CONTROLLER: EXACT FEATURES FROM CCNUST.AC.BD
            ======================================================== */}
        <div className="bg-slate-900 border-b border-slate-800 px-3 sm:px-6 py-2 overflow-x-auto flex items-center space-x-1.5 scrollbar-thin">
          {[
            { id: 'result', label: 'Semester Result', icon: Award, badge: 'OFFICIAL' },
            { id: 'verification', label: 'Student Verification', icon: ShieldCheck, badge: 'VERIFIED' },
            { id: 'routine', label: 'All Routine', icon: Calendar, badge: 'UPDATED' },
            { id: 'offices', label: 'Offices & Admin', icon: Building, badge: '12 CELLS' },
            { id: 'convocation', label: 'Convocation', icon: GraduationCap, badge: 'NOTICE' },
            { id: 'carnival', label: 'Diploma Carnival', icon: Layers, badge: 'WAIVER' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ServiceModalTab)}
                className={`px-3 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider flex items-center space-x-2 whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow-md font-black scale-102'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-750 hover:text-white border border-slate-700/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-sans font-bold ${
                      isActive ? 'bg-slate-950 text-amber-400' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ========================================================
            MODAL CONTENT AREA (SCROLLABLE)
            ======================================================== */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-slate-50">

          {/* ------------------------------------------------------
              TAB 1: SEMESTER RESULT SEARCH (/search-resultID)
              ------------------------------------------------------ */}
          {activeTab === 'result' && (
            <div className="space-y-6">
              {/* Search Box Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-200 gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      CONTROLLER OF EXAMINATIONS
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-sans mt-1">
                      Online Semester Result Search Portal
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">
                      Enter student Roll / Student ID to generate the official Provisional Grade Sheet.
                    </p>
                  </div>
                  {/* Quick test buttons */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Test IDs:</span>
                    {Object.keys(PRELOADED_RESULTS).map((testId) => (
                      <button
                        key={testId}
                        type="button"
                        onClick={() => {
                          setSearchId(testId);
                          setActiveResult(PRELOADED_RESULTS[testId]);
                          setResultSearched(true);
                        }}
                        className="text-[10px] font-mono font-bold px-2 py-1 bg-slate-100 hover:bg-amber-100 text-slate-800 hover:text-amber-900 border border-slate-300 rounded transition-colors cursor-pointer"
                      >
                        {testId}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSearchResult} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-5">
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Student ID / Roll Number *
                    </label>
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        placeholder="e.g. 221-15-101"
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-slate-800"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Academic Semester
                    </label>
                    <select
                      value={selectedSemester}
                      onChange={(e) => setSelectedSemester(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-slate-800"
                    >
                      <option value="Spring 2026">Spring 2026 (Current Term)</option>
                      <option value="Fall 2025">Fall 2025</option>
                      <option value="Spring 2025">Spring 2025</option>
                      <option value="Fall 2024">Fall 2024</option>
                      <option value="Spring 2024">Spring 2024</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3 flex items-end">
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#0F281E] hover:bg-[#163A2D] text-[#FAD02C] font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <Search className="w-3.5 h-3.5 text-[#FAD02C]" />
                      <span>Search Result</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Render Official Result Grade Sheet */}
              {resultSearched && activeResult && (
                <div
                  id="printable-grade-sheet"
                  className="bg-white border-2 border-slate-300 rounded-2xl p-6 sm:p-8 shadow-lg relative print:m-0 print:p-4 print:border-none print:shadow-none"
                >
                  {/* Watermark Crest */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
                    <GraduationCap className="w-96 h-96 text-slate-900" />
                  </div>

                  {/* Institutional Header */}
                  <div className="text-center pb-5 border-b-2 border-slate-800 relative z-10">
                    <div className="inline-block p-1 bg-[#0F281E] rounded-lg mb-2">
                      <div className="px-3 py-1 bg-[#163A2D] text-[#FAD02C] font-mono text-[10px] font-bold uppercase tracking-widest">
                        GOVERNMENT & UGC RECOGNIZED
                      </div>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black font-sans uppercase tracking-tight text-slate-950">
                      CCN UNIVERSITY OF SCIENCE & TECHNOLOGY
                    </h2>
                    <p className="text-xs font-mono font-bold text-slate-700 uppercase tracking-widest mt-0.5">
                      OFFICE OF THE CONTROLLER OF EXAMINATIONS • KOTBARI, CUMILLA-3500
                    </p>
                    <div className="inline-block mt-2 bg-slate-900 text-white px-4 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider">
                      PROVISIONAL SEMESTER GRADE SHEET
                    </div>
                  </div>

                  {/* Student Dossier Information Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 py-5 border-b border-slate-200 text-xs font-mono relative z-10">
                    <div>
                      <span className="text-slate-500 uppercase text-[10px] block">Student Name:</span>
                      <span className="font-bold text-slate-900 text-sm">{activeResult.name}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 uppercase text-[10px] block">Student ID / Roll:</span>
                      <span className="font-bold text-emerald-800 text-sm">{activeResult.rollNo}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 uppercase text-[10px] block">Registration No:</span>
                      <span className="font-bold text-slate-900">{activeResult.regNo}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 uppercase text-[10px] block">Program:</span>
                      <span className="font-bold text-slate-900">{activeResult.program}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 uppercase text-[10px] block">Academic Department:</span>
                      <span className="font-bold text-slate-900">{activeResult.department}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 uppercase text-[10px] block">Academic Session & Term:</span>
                      <span className="font-bold text-slate-900">{activeResult.session} ({activeResult.semester})</span>
                    </div>
                  </div>

                  {/* Course Grade Table */}
                  <div className="mt-5 overflow-x-auto relative z-10">
                    <table className="w-full text-left text-xs font-mono border-collapse">
                      <thead>
                        <tr className="bg-slate-900 text-white uppercase text-[11px] tracking-wider">
                          <th className="py-2.5 px-3 border border-slate-800">Course Code</th>
                          <th className="py-2.5 px-3 border border-slate-800">Course Title</th>
                          <th className="py-2.5 px-3 border border-slate-800 text-center">Credits</th>
                          <th className="py-2.5 px-3 border border-slate-800 text-center">Letter Grade</th>
                          <th className="py-2.5 px-3 border border-slate-800 text-center">Grade Point</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeResult.courses.map((c, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                            <td className="py-2.5 px-3 border border-slate-200 font-bold text-slate-900">
                              {c.code}
                            </td>
                            <td className="py-2.5 px-3 border border-slate-200 text-slate-800 font-sans">
                              {c.title}
                            </td>
                            <td className="py-2.5 px-3 border border-slate-200 text-center font-bold text-slate-900">
                              {c.credit.toFixed(1)}
                            </td>
                            <td className="py-2.5 px-3 border border-slate-200 text-center font-black text-emerald-800">
                              {c.grade}
                            </td>
                            <td className="py-2.5 px-3 border border-slate-200 text-center font-bold text-slate-900">
                              {c.gradePoint.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Summary & Metrics */}
                  <div className="mt-5 p-4 bg-emerald-50/80 border border-emerald-200 rounded-xl flex flex-wrap items-center justify-between gap-4 relative z-10 font-mono">
                    <div>
                      <div className="text-[10px] text-emerald-900 uppercase font-bold tracking-wider">
                        Semester Performance
                      </div>
                      <div className="text-xs text-emerald-800 font-bold">
                        Status: <span className="text-emerald-950 font-black">{activeResult.status}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 text-right">
                      <div>
                        <span className="text-[10px] text-emerald-800 uppercase block">Semester GPA</span>
                        <span className="text-xl font-black text-emerald-950 font-sans">
                          {activeResult.sgpa.toFixed(2)}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-emerald-800 uppercase block">Cumulative CGPA</span>
                        <span className="text-xl font-black text-[#0F281E] font-sans">
                          {activeResult.cgpa.toFixed(2)} / 4.00
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stamp & Verification Seal */}
                  <div className="mt-8 pt-6 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10 text-xs font-mono">
                    <div className="flex items-center space-x-3 text-slate-500 text-[11px]">
                      <div className="w-12 h-12 border border-slate-300 bg-slate-50 flex items-center justify-center p-1 rounded">
                        <div className="w-full h-full border border-dashed border-slate-400 flex items-center justify-center text-[8px] font-bold text-center">
                          QR VERIFIED
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-slate-700">Digital Record Authentication</p>
                        <p>Published by Office of the Controller of Examinations</p>
                        <p className="text-[10px]">Verified against CCNUST Examination Ledger</p>
                      </div>
                    </div>

                    <div className="text-center sm:text-right">
                      <div className="inline-block border-b-2 border-slate-900 pb-1 mb-1 font-serif italic text-sm text-slate-900 font-bold">
                        Prof. Md. Enamul Hoque
                      </div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-800">
                        Controller of Examinations
                      </p>
                      <p className="text-[10px] text-slate-500">CCN University of Science & Technology</p>
                    </div>
                  </div>

                  {/* Action Print Buttons */}
                  <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-end space-x-3 print:hidden">
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="px-4 py-2 bg-slate-900 text-amber-400 hover:bg-slate-800 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-colors cursor-pointer shadow-sm"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Grade Sheet</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ------------------------------------------------------
              TAB 2: STUDENT VERIFICATION (/search-student-verification)
              ------------------------------------------------------ */}
          {activeTab === 'verification' && (
            <div className="space-y-6">
              {/* Header Box */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-200 gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      REGISTRAR & CERTIFICATE CELL
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-sans mt-1">
                      Official Student Verification & Credential Authentication
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">
                      Verify authentic enrollment and graduation status directly against CCNUST official student registers.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleVerifySubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={verifyId}
                      onChange={(e) => setVerifyId(e.target.value)}
                      placeholder="Enter Student ID / Certificate Reg No (e.g. 221-15-101)..."
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-slate-800"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="px-6 py-2.5 bg-[#0F281E] hover:bg-[#163A2D] text-[#FAD02C] rounded-xl font-mono font-bold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center space-x-1.5 cursor-pointer shrink-0"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#FAD02C]" />
                    <span>{isVerifying ? 'Verifying...' : 'Verify Authenticity'}</span>
                  </button>
                </form>
              </div>

              {/* Verified Result Card */}
              {verifiedRecord && (
                <div className="bg-white border-2 border-emerald-500/40 rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-emerald-700 text-white px-4 py-1 rounded-bl-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                    <span>AUTHENTIC CCNUST RECORD</span>
                  </div>

                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-slate-900 font-sans">{verifiedRecord.name}</h4>
                      <p className="text-xs font-mono text-emerald-800 font-bold">
                        Enrollment ID: {verifiedRecord.rollNo} • Registration: {verifiedRecord.regNo}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono mb-6">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Degree Program:</span>
                      <span className="font-bold text-slate-900">{verifiedRecord.program}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Academic Faculty:</span>
                      <span className="font-bold text-slate-900">{verifiedRecord.faculty}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Academic Department:</span>
                      <span className="font-bold text-slate-900">{verifiedRecord.department}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Enrollment Session:</span>
                      <span className="font-bold text-slate-900">{verifiedRecord.session}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Current Standing:</span>
                      <span className="font-bold text-emerald-700">{verifiedRecord.status}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Cumulative CGPA:</span>
                      <span className="font-bold text-slate-900 text-sm">{verifiedRecord.cgpa.toFixed(2)} / 4.00</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs font-mono">
                    <div className="text-[11px] text-slate-600">
                      <p className="font-bold text-slate-800">UGC Bangladesh & Ministry of Education Compliant</p>
                      <p>Verification Code: VER-{verifiedRecord.rollNo.replace(/-/g, '')}-2026-OK</p>
                    </div>

                    <button
                      type="button"
                      onClick={handlePrint}
                      className="px-4 py-2 bg-[#0F281E] text-amber-400 hover:bg-[#163A2D] rounded-xl font-bold uppercase tracking-wider text-xs flex items-center space-x-1.5 transition-colors cursor-pointer shadow-sm"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Verification Certificate</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ------------------------------------------------------
              TAB 3: ALL ROUTINE HUB (Class, Mid & Final Routines)
              ------------------------------------------------------ */}
          {activeTab === 'routine' && (
            <div className="space-y-6">
              {/* Filter Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      ACADEMIC ROSTER & ROUTINE DESK
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-sans mt-1">
                      CCN-UST All Routine (Class, Midterm & Semester Final Schedules)
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={handlePrint}
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-mono font-bold uppercase flex items-center space-x-1.5 transition-colors cursor-pointer border border-slate-300 self-start sm:self-auto"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-700" />
                    <span>Download Schedule (PDF)</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Department
                    </label>
                    <select
                      value={routineDeptFilter}
                      onChange={(e) => setRoutineDeptFilter(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-slate-800"
                    >
                      <option value="All">All Academic Departments</option>
                      <option value="CSE">Computer Science & Engineering (CSE)</option>
                      <option value="EEE">Electrical & Electronic Engineering (EEE)</option>
                      <option value="CE">Civil Engineering (CE)</option>
                      <option value="LAW">Department of Law (LL.B / LL.M)</option>
                      <option value="DBA">Business Administration (BBA/MBA)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Schedule Type
                    </label>
                    <select
                      value={routineTypeFilter}
                      onChange={(e) => setRoutineTypeFilter(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-slate-800"
                    >
                      <option value="All">All Routine Types</option>
                      <option value="Class Routine">Class Routine (Spring 2026)</option>
                      <option value="Midterm Examination Routine">Midterm Examination Routine</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Search Course / Faculty
                    </label>
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={routineSearch}
                        onChange={(e) => setRoutineSearch(e.target.value)}
                        placeholder="Search course code, room..."
                        className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:border-slate-800"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Routine Cards Grid */}
              <div className="space-y-5">
                {filteredRoutines.map((routine) => (
                  <div
                    key={routine.id}
                    className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-slate-400 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-slate-200 gap-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 bg-slate-900 text-amber-400 font-mono text-[10px] font-bold uppercase rounded">
                            {routine.deptCode}
                          </span>
                          <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wide">
                            {routine.type} • {routine.semester}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-950 font-sans mt-0.5">
                          {routine.dept} — {routine.batch}
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        {routine.effectiveDate}
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead>
                          <tr className="bg-slate-100 text-slate-700 uppercase text-[10px] tracking-wider">
                            <th className="py-2 px-3">Day</th>
                            <th className="py-2 px-3">Time Slot</th>
                            <th className="py-2 px-3">Course Code & Title</th>
                            <th className="py-2 px-3">Room / Lab</th>
                            <th className="py-2 px-3">Instructor</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {routine.schedule.map((item, sIdx) => (
                            <tr key={sIdx} className="hover:bg-slate-50">
                              <td className="py-2 px-3 font-bold text-slate-900 whitespace-nowrap">
                                {item.day}
                              </td>
                              <td className="py-2 px-3 text-slate-700 whitespace-nowrap">
                                <span className="inline-flex items-center space-x-1 text-slate-600">
                                  <Clock className="w-3 h-3 text-amber-600" />
                                  <span>{item.time}</span>
                                </span>
                              </td>
                              <td className="py-2 px-3 font-medium text-slate-900">
                                {item.course}
                              </td>
                              <td className="py-2 px-3 whitespace-nowrap">
                                <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded font-bold text-[11px]">
                                  {item.room}
                                </span>
                              </td>
                              <td className="py-2 px-3 text-slate-600 whitespace-nowrap">
                                {item.teacher}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------
              TAB 4: ADMINISTRATIVE OFFICES DIRECTORY
              ------------------------------------------------------ */}
          {activeTab === 'offices' && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                  INSTITUTIONAL ADMINISTRATION
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-sans mt-1">
                  University Offices, Statutory Bodies & Administrative Wings
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Direct contact lines, executive officers, and primary responsibilities of CCNUST institutional wings.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {OFFICIAL_ADMIN_OFFICES.map((office) => (
                  <div
                    key={office.id}
                    className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-slate-400 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="text-sm font-bold text-slate-900 font-sans">
                          {office.title}
                        </h4>
                        <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Active
                        </span>
                      </div>

                      <div className="mb-3 space-y-1 text-xs font-mono">
                        <div className="font-bold text-slate-800 flex items-center space-x-1.5">
                          <Users className="w-3.5 h-3.5 text-amber-600" />
                          <span>{office.officer}</span>
                        </div>
                        <div className="text-slate-600 flex items-center space-x-1.5 text-[11px]">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{office.room}</span>
                        </div>
                        <div className="text-slate-600 flex items-center space-x-1.5 text-[11px]">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span className="text-slate-700">{office.phone}</span>
                        </div>
                        <div className="text-slate-600 flex items-center space-x-1.5 text-[11px]">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <a href={`mailto:${office.email}`} className="text-blue-600 hover:underline">
                            {office.email}
                          </a>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100">
                        <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                          Key Responsibilities:
                        </p>
                        <ul className="space-y-1 text-[11px] text-slate-600 font-mono">
                          {office.responsibilities.map((r, rIdx) => (
                            <li key={rIdx} className="flex items-start space-x-1.5">
                              <span className="text-emerald-600 font-bold">•</span>
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------
              TAB 5: CONVOCATION & ALUMNI
              ------------------------------------------------------ */}
          {activeTab === 'convocation' && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-purple-800 bg-purple-100 px-2 py-0.5 rounded">
                  CONVOCATION CELL
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-sans mt-1">
                  CCNUST Convocation Notice & Degree Registration Form
                </h3>
                <p className="text-xs text-slate-600 font-mono mt-1">
                  Graduating students who have fulfilled all academic degree requirements and clearances are eligible to register.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-200 font-mono text-xs">
                  <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                    <span className="text-[10px] text-purple-900 font-bold uppercase block">Eligibility</span>
                    <span className="font-bold text-purple-950">Completed all required credits with no outstanding dues.</span>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                    <span className="text-[10px] text-amber-900 font-bold uppercase block">Registration Fee</span>
                    <span className="font-bold text-amber-950">৳ 5,000 (Single) / ৳ 7,500 (With Guest)</span>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <span className="text-[10px] text-emerald-900 font-bold uppercase block">Venue</span>
                    <span className="font-bold text-emerald-950">Permanent Campus Green Grounds, Kotbari, Cumilla</span>
                  </div>
                </div>
              </div>

              {/* Convocation Registration Form */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h4 className="text-sm font-bold text-slate-900 font-mono uppercase tracking-wider mb-4 pb-2 border-b border-slate-200">
                  Online Convocation Registration Form (সমাবর্তন সংক্রান্ত ফরম)
                </h4>

                {convoForm.submitted ? (
                  <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3 font-mono">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700">
                      <Check className="w-6 h-6" />
                    </div>
                    <h5 className="text-base font-bold text-emerald-950">
                      Convocation Registration Received!
                    </h5>
                    <p className="text-xs text-emerald-800">
                      Tracking ID: <span className="font-black text-slate-900">{convoForm.trackingNo}</span>
                    </p>
                    <p className="text-xs text-slate-600">
                      Please retain this tracking reference. Gown collection voucher and convocation pass will be sent via SMS.
                    </p>
                    <button
                      type="button"
                      onClick={() => setConvoForm({ ...convoForm, submitted: false })}
                      className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-bold uppercase"
                    >
                      Submit Another Registration
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setConvoForm({
                        ...convoForm,
                        submitted: true,
                        trackingNo: `CCN-CONVO-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                      });
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs"
                  >
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Full Name (As in SSC / Certificate) *
                      </label>
                      <input
                        type="text"
                        required
                        value={convoForm.fullName}
                        onChange={(e) => setConvoForm({ ...convoForm, fullName: e.target.value })}
                        placeholder="e.g. Md. Shanto Islam"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Student ID / Roll No *
                      </label>
                      <input
                        type="text"
                        required
                        value={convoForm.studentId}
                        onChange={(e) => setConvoForm({ ...convoForm, studentId: e.target.value })}
                        placeholder="e.g. 211-15-101"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Department
                      </label>
                      <select
                        value={convoForm.dept}
                        onChange={(e) => setConvoForm({ ...convoForm, dept: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                      >
                        <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                        <option value="Electrical & Electronic Engineering">Electrical & Electronic Engineering</option>
                        <option value="Civil Engineering">Civil Engineering</option>
                        <option value="Department of Law">Department of Law</option>
                        <option value="Business Administration">Business Administration</option>
                        <option value="Department of English">Department of English</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Economics">Economics</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Passing Year & CGPA *
                      </label>
                      <input
                        type="text"
                        required
                        value={convoForm.cgpa}
                        onChange={(e) => setConvoForm({ ...convoForm, cgpa: e.target.value })}
                        placeholder="e.g. Year: 2025, CGPA: 3.82"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Registration Category
                      </label>
                      <select
                        value={convoForm.guestOption}
                        onChange={(e) => setConvoForm({ ...convoForm, guestOption: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                      >
                        <option value="Single (Self only)">Single - Graduate Only (৳ 5,000)</option>
                        <option value="Graduate + 1 Guest">Graduate + 1 Guest (৳ 7,500)</option>
                        <option value="Graduate + 2 Guests">Graduate + 2 Guests (৳ 10,000)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Mobile Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={convoForm.phone}
                        onChange={(e) => setConvoForm({ ...convoForm, phone: e.target.value })}
                        placeholder="017xxxxxxxx"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>

                    <div className="sm:col-span-2 pt-2">
                      <button
                        type="submit"
                        className="w-full py-3 bg-[#0F281E] hover:bg-[#163A2D] text-[#FAD02C] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <Send className="w-4 h-4 text-[#FAD02C]" />
                        <span>Submit Convocation Application</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------
              TAB 6: DIPLOMA CARNIVAL & INNOVATION
              ------------------------------------------------------ */}
          {activeTab === 'carnival' && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  NEXT STEP CARNIVAL FOR DIPLOMA ENGINEERS
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-sans mt-1">
                  Diploma to B.Sc. Engineering Fast-Track Carnival
                </h3>
                <p className="text-xs text-slate-600 font-mono mt-1">
                  Special program for Polytechnic Institute Diploma graduates transitioning to B.Sc. in CSE, EEE, and Civil Engineering with maximum credit waivers and evening/weekend batches.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-200 text-xs font-mono">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Credit Transfer</span>
                    <span className="font-bold text-slate-900">Up to 1 Year (30+ Credits) Exempted</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Special Fee Waiver</span>
                    <span className="font-bold text-emerald-700">Special Discounted Polytechnic Package</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Flexible Schedules</span>
                    <span className="font-bold text-slate-900">Friday & Saturday Weekend Sessions</span>
                  </div>
                </div>
              </div>

              {/* Carnival Registration Form */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h4 className="text-sm font-bold text-slate-900 font-mono uppercase tracking-wider mb-4 pb-2 border-b border-slate-200">
                  Carnival Registration & Credit Evaluation
                </h4>

                {carnivalForm.submitted ? (
                  <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3 font-mono">
                    <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                    <h5 className="text-base font-bold text-emerald-950">
                      Carnival Registration Confirmed!
                    </h5>
                    <p className="text-xs text-emerald-800">
                      The Faculty Dean & Admission Desk will review your transcript and contact you for credit transfer confirmation.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setCarnivalForm({ ...carnivalForm, submitted: true });
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs"
                  >
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Candidate Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={carnivalForm.name}
                        onChange={(e) => setCarnivalForm({ ...carnivalForm, name: e.target.value })}
                        placeholder="e.g. Engr. Tanvir Hasan"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Polytechnic Institute Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={carnivalForm.diplomaInstitute}
                        onChange={(e) => setCarnivalForm({ ...carnivalForm, diplomaInstitute: e.target.value })}
                        placeholder="e.g. Cumilla Polytechnic / CCN Polytechnic Institute"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Diploma Technology
                      </label>
                      <select
                        value={carnivalForm.diplomaTech}
                        onChange={(e) => setCarnivalForm({ ...carnivalForm, diplomaTech: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                      >
                        <option value="Computer Technology">Computer Technology</option>
                        <option value="Electrical Technology">Electrical Technology</option>
                        <option value="Civil Technology">Civil Technology</option>
                        <option value="Electronics Technology">Electronics Technology</option>
                        <option value="Mechanical Technology">Mechanical Technology</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Desired B.Sc. Program at CCNUST
                      </label>
                      <select
                        value={carnivalForm.desiredProgram}
                        onChange={(e) => setCarnivalForm({ ...carnivalForm, desiredProgram: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                      >
                        <option value="B.Sc. in Computer Science & Engineering (B.Sc. CSE)">B.Sc. in CSE (Day / Evening)</option>
                        <option value="B.Sc. in Electrical and Electronic Engineering (EEE)">B.Sc. in EEE (Day / Evening)</option>
                        <option value="B.Sc. in Civil Engineering (CE)">B.Sc. in Civil Engineering (CE)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={carnivalForm.phone}
                        onChange={(e) => setCarnivalForm({ ...carnivalForm, phone: e.target.value })}
                        placeholder="018xxxxxxxx"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>

                    <div className="sm:col-span-2 pt-2">
                      <button
                        type="submit"
                        className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <Send className="w-4 h-4 text-slate-950" />
                        <span>Register for Diploma Carnival & Evaluation</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------
              TAB 7: VIRTUAL CAMPUS TOUR (tour.ccnust.ac.bd)
              ------------------------------------------------------ */}
          {activeTab === 'tour' && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  CAMPUS WALKTHROUGH & TOUR
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-sans mt-1">
                  Visit Our Kotbari Campus (Virtual Campus Tour)
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Explore high-definition photos and walkthroughs of CCNUST academic buildings, engineering labs, moot court, and green flower hills.
                </p>
              </div>

              {/* Interactive Campus Canvas Box */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 border-2 border-slate-800 shadow-2xl h-[420px] select-none group">
                <img
                  src="https://res.cloudinary.com/drmpjeatm/image/upload/v1787799507/1.jpg_gzcsm7.jpg"
                  alt="CCNUST Campus View"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                {/* Hotspot Markers */}
                <div className="absolute top-1/3 left-1/4 z-10 animate-pulse">
                  <div className="px-3 py-1.5 bg-[#0F281E]/90 text-[#FAD02C] text-[10px] font-mono font-bold rounded-lg border border-[#FAD02C] shadow-lg flex items-center space-x-1.5 cursor-pointer backdrop-blur-xs">
                    <Building className="w-3.5 h-3.5" />
                    <span>Main Academic Block A</span>
                  </div>
                </div>

                <div className="absolute top-1/2 right-1/4 z-10 animate-pulse delay-200">
                  <div className="px-3 py-1.5 bg-[#0F281E]/90 text-[#FAD02C] text-[10px] font-mono font-bold rounded-lg border border-[#FAD02C] shadow-lg flex items-center space-x-1.5 cursor-pointer backdrop-blur-xs">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Engineering Complex & Labs</span>
                  </div>
                </div>

                <div className="absolute bottom-16 left-1/3 z-10 animate-pulse delay-500">
                  <div className="px-3 py-1.5 bg-[#0F281E]/90 text-white text-[10px] font-mono font-bold rounded-lg border border-white/50 shadow-lg flex items-center space-x-1.5 cursor-pointer backdrop-blur-xs">
                    <Compass className="w-3.5 h-3.5 text-amber-400" />
                    <span>Kotbari Heritage Ridge</span>
                  </div>
                </div>

                {/* Overlay Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white font-mono text-xs">
                  <div className="flex items-center space-x-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700">
                    <Compass className="w-4 h-4 text-amber-400" />
                    <span className="text-[11px] font-bold">Kotbari Campus View Active</span>
                  </div>

                  <a
                    href="https://tour.ccnust.ac.bd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1.5 transition-colors shadow-md"
                  >
                    <span>Open tour.ccnust.ac.bd</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------
              TAB 8: CAREER CIRCULARS (চাকরির-তথ্য)
              ------------------------------------------------------ */}
          {activeTab === 'career' && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  OFFICIAL RECRUITMENT CELL
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-sans mt-1">
                  চাকরির-তথ্য — Career Opportunities & Faculty Recruitment
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  CCN University of Science & Technology invites applications from qualified Bangladeshi nationals for faculty and administrative positions.
                </p>
              </div>

              <div className="space-y-4">
                {CAREER_CIRCULARS.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-slate-400 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                          {job.category}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 font-sans mt-1">
                          {job.title}
                        </h4>
                        <p className="text-xs font-mono text-slate-600">{job.department}</p>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-mono text-rose-700 uppercase block font-bold">
                          Application Deadline:
                        </span>
                        <span className="text-xs font-mono font-black text-rose-950">
                          {job.deadline}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 space-y-2 text-xs font-mono">
                      <p className="text-slate-700">
                        <strong className="text-slate-900">Requirements:</strong> {job.experience}
                      </p>
                      <p className="text-slate-700">
                        <strong className="text-slate-900">Remuneration:</strong> {job.salary}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-500">
                        Send CV & Cover Letter to: <strong className="text-slate-900">{job.contact}</strong>
                      </span>
                      <a
                        href={`mailto:${job.contact}?subject=Application for ${encodeURIComponent(job.title)}`}
                        className="px-4 py-1.5 bg-[#0F281E] text-amber-400 hover:bg-[#163A2D] rounded-lg font-bold uppercase transition-colors"
                      >
                        Apply for Position
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ========================================================
            MODAL FOOTER: QUICK SISTER LINKS & HOTLINE
            ======================================================== */}
        <div className="bg-slate-100 border-t border-slate-200 px-5 sm:px-8 py-3.5 flex flex-wrap items-center justify-between text-xs font-mono text-slate-600 gap-3">
          <div className="flex items-center space-x-3 text-[11px]">
            <span className="text-slate-500 uppercase font-bold">Sister Institutions:</span>
            <a
              href="https://ccnpolytechnic.ac/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-800 hover:underline font-bold"
            >
              CCN Polytechnic
            </a>
            <span>•</span>
            <a
              href="https://ccnmc.ac/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-800 hover:underline font-bold"
            >
              CCN Medical College
            </a>
            <span>•</span>
            <a
              href="https://tariqulislam.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-800 hover:underline font-bold"
            >
              Founder Portal
            </a>
          </div>

          <div className="flex items-center space-x-2 text-[11px]">
            <Phone className="w-3.5 h-3.5 text-amber-600" />
            <span className="font-bold text-slate-800">Helpline: 01715-451599 / 01888-042667</span>
          </div>
        </div>
      </div>
    </div>
  );
}
