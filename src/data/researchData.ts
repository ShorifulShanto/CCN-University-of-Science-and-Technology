export interface ResearchProject {
  id: string;
  title: string;
  department: string;
  deptCode: string;
  faculty: string;
  leadResearcher: string;
  researcherDesignation: string;
  team: string[];
  status: 'Active' | 'Field Trial' | 'Phase II' | 'Peer Review';
  grantAgency: string;
  grantAmount: string;
  duration: string;
  abstract: string;
  objectives: string[];
  tags: string[];
  progress: number;
  highlightStat: string;
}

export interface UniversityPublication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  indexing: 'Scopus Q1' | 'Scopus Q2' | 'IEEE Xplore' | 'Web of Science' | 'Springer' | 'Elsevier';
  year: number;
  month: string;
  department: string;
  deptCode: string;
  doi: string;
  citations: number;
  abstract: string;
  keywords: string[];
  downloadUrl?: string;
}

export interface ResearchMetric {
  label: string;
  value: string;
  subtext: string;
  iconName: string;
}

export const RESEARCH_METRICS: ResearchMetric[] = [
  {
    label: 'Indexed Publications',
    value: '58+',
    subtext: 'Scopus, IEEE & Web of Science',
    iconName: 'BookOpen',
  },
  {
    label: 'Active Grants',
    value: '৳2.8 Cr',
    subtext: 'University & National UGC Funds',
    iconName: 'Award',
  },
  {
    label: 'Specialized Labs',
    value: '14',
    subtext: 'Engineering & Computing Centers',
    iconName: 'FlaskConical',
  },
  {
    label: 'Global Co-Authors',
    value: '18+',
    subtext: 'International Universities',
    iconName: 'Globe',
  },
];

export const ONGOING_RESEARCH_PROJECTS: ResearchProject[] = [
  {
    id: 'proj-ai-agritech',
    title: 'Edge-AI & Drone Multispectral Sensing for Micro-Pest Detection in Cumilla Delta Agro-Ecosystems',
    department: 'Department of Computer Science & Engineering',
    deptCode: 'CSE',
    faculty: 'Faculty of Engineering',
    leadResearcher: 'Dr. Md. Tariqul Islam',
    researcherDesignation: 'Founder & Senior Research Supervisor',
    team: ['Engr. S. A. Shanto', 'Engr. Tanvir Ahmed', '3 Senior Graduate Scholars'],
    status: 'Field Trial',
    grantAgency: 'CCNUST Innovation Fund & UGC Collaborative Research Grant',
    grantAmount: '৳18,50,000',
    duration: '2025 - 2027',
    abstract:
      'Developing low-power embedded edge compute nodes running quantized convolutional neural networks (YOLOv10-Nano) on autonomous UAVs. The system identifies insect infestation signatures across local vegetable and paddy fields with 94.2% precision under varying monsoon illumination.',
    objectives: [
      'Deploy localized offline inference on battery-constrained UAV hardware.',
      'Construct a 15,000-image labeled repository of Southeastern Bangladesh agricultural crop diseases.',
      'Transmit automated early-warning SMS alerts directly to regional agricultural extension officers.',
    ],
    tags: ['Edge AI', 'Computer Vision', 'Precision Agriculture', 'UAV Drones'],
    progress: 75,
    highlightStat: '94.2% Detection Accuracy',
  },
  {
    id: 'proj-civil-concrete',
    title: 'Utilization of Local River Silt & Industrial Fly-Ash in High-Durability Geopolymer Concrete',
    department: 'Department of Civil Engineering',
    deptCode: 'CE',
    faculty: 'Faculty of Engineering',
    leadResearcher: 'Engr. B. Majumder',
    researcherDesignation: 'Assistant Professor & Head of CE Materials Lab',
    team: ['Dr. M. Haque', 'Engr. A. K. Azad', 'Structural Lab Assistants'],
    status: 'Active',
    grantAgency: 'Ministry of Science & Technology (MoST) Grant',
    grantAmount: '৳14,20,000',
    duration: '2024 - 2026',
    abstract:
      'Formulating zero-cement structural binders using alkaline-activated local thermal fly ash and calcined river sediments. The study investigates compressive strength growth, chloride permeability, and carbon footprint reduction over 28-day and 90-day curing intervals.',
    objectives: [
      'Replace 100% of Ordinary Portland Cement with environmentally benign geopolymer slurry.',
      'Achieve 42 MPa compressive strength conforming to BNBC 2020 seismic standards.',
      'Mitigate riverbed silt accumulation in Cumilla Gomti watershed.',
    ],
    tags: ['Geopolymer', 'Green Concrete', 'Seismic Resilience', 'BNBC 2020'],
    progress: 85,
    highlightStat: '42 MPa Compressive Strength',
  },
  {
    id: 'proj-eee-microgrid',
    title: 'Adaptive MPPT Controllers for Hybrid Solar-Wind Microgrids in Southeastern Coastal Isolated Zones',
    department: 'Department of Electrical & Electronic Engineering',
    deptCode: 'EEE',
    faculty: 'Faculty of Engineering',
    leadResearcher: 'Engr. K. Rahman',
    researcherDesignation: 'Associate Professor, Power Systems Hub',
    team: ['Engr. N. Hossain', 'Graduate Lab Fellows'],
    status: 'Active',
    grantAgency: 'National Renewable Energy Research Trust',
    grantAmount: '৳16,80,000',
    duration: '2025 - 2027',
    abstract:
      'Designing intelligent sliding-mode maximum power point tracking algorithms for decentralized solar photovoltaic and small-scale wind turbine installations. Prevents sub-harmonic grid fluctuations under rapid cloud-cover transients.',
    objectives: [
      'Design bidirectional inverter hardware with total harmonic distortion < 3%.',
      'Optimize battery degradation lifecycle using Kalman-filter state-of-charge tracking.',
      'Publish open-source microcontroller firmware for rural solar electrification.',
    ],
    tags: ['Renewable Energy', 'MPPT', 'Smart Microgrids', 'Power Electronics'],
    progress: 60,
    highlightStat: '< 2.8% Voltage THD',
  },
  {
    id: 'proj-law-privacy',
    title: 'Constitutional Data Sovereignty, Cybersecurity & Cross-Border Cloud Jurisprudence in South Asia',
    department: 'Department of Law',
    deptCode: 'LAW',
    faculty: 'Faculty of Liberal Arts',
    leadResearcher: 'Barrister S. Khan',
    researcherDesignation: 'Senior Lecturer & Moot Court Mentor',
    team: ['Adv. F. Yasmin', 'Senior LL.B Research Cohort'],
    status: 'Peer Review',
    grantAgency: 'CCNUST Institute of Law & Public Policy Research',
    grantAmount: '৳8,50,000',
    duration: '2025 - 2026',
    abstract:
      'A comparative legal treatise examining statutory alignment between the Bangladesh Cyber Security Act 2023, EU GDPR benchmarks, and cross-border digital financial transaction mandates.',
    objectives: [
      'Map legal remedies for unauthorized biometric data commercialization.',
      'Draft policy recommendations for Bangladesh Bank cyber banking regulations.',
      'Publish a peer-reviewed monograph on judicial review of electronic evidence.',
    ],
    tags: ['Cyber Law', 'Data Sovereignty', 'Constitutional Rights', 'Digital Evidence'],
    progress: 90,
    highlightStat: 'Policy Monograph in Review',
  },
  {
    id: 'proj-bba-fintech',
    title: 'Financial Inclusion Dynamics: Mobile Money Adoption & Micro-Enterprise Growth in Rural Hubs',
    department: 'Department of Business Administration',
    deptCode: 'DBA',
    faculty: 'Faculty of Business Administration',
    leadResearcher: 'Dr. H. Mahmud',
    researcherDesignation: 'Professor & Dean of Business Studies',
    team: ['Mr. A. Rauf', 'Ms. T. Sultana', 'MBA Survey Team'],
    status: 'Phase II',
    grantAgency: 'South Asian Economic Development Initiative',
    grantAmount: '৳11,00,000',
    duration: '2024 - 2026',
    abstract:
      'Empirical econometric analysis of 1,200 micro-entrepreneurs in the Chittagong-Cumilla industrial corridor. Evaluates cash-flow stability, digital lending uptake, and female entrepreneur empowerment metrics.',
    objectives: [
      'Quantify credit default probabilities under automated scoring algorithms.',
      'Analyze the socio-economic impact of smartphone-based merchant QR payments.',
      'Present findings at the South Asian Management Forum (SAMF 2026).',
    ],
    tags: ['FinTech', 'Micro-Finance', 'Econometrics', 'Financial Inclusion'],
    progress: 80,
    highlightStat: '1,200 Surveyed Enterprises',
  },
];

export const RECENT_PUBLICATIONS: UniversityPublication[] = [
  {
    id: 'pub-1',
    title: 'A Lightweight CNN-BiLSTM Ensemble for Bengali Handwritten Numeral and Script Recognition with Attention Mechanism',
    authors: ['Dr. Md. Tariqul Islam', 'S. A. Shanto', 'Tanvir Ahmed'],
    journal: 'IEEE Transactions on Pattern Analysis and Machine Intelligence / IEEE Access',
    indexing: 'IEEE Xplore',
    year: 2026,
    month: 'February',
    department: 'Computer Science & Engineering',
    deptCode: 'CSE',
    doi: '10.1109/ACCESS.2026.3421890',
    citations: 14,
    abstract:
      'Proposes a dual-stream spatial attention architecture tailored for dense cursive Bengali character recognition. Achieves 98.6% recognition rate on the CMATERdb benchmark while minimizing model size by 62% for deployment on embedded edge hardware.',
    keywords: ['Bengali OCR', 'BiLSTM', 'Spatial Attention', 'Embedded Deep Learning'],
  },
  {
    id: 'pub-2',
    title: 'Compressive Strength and Durability Characteristics of Geopolymer Mortars Synthesized from Industrial By-Products Under Extreme Weathering',
    authors: ['Engr. B. Majumder', 'Dr. M. Haque', 'A. K. Azad'],
    journal: 'Construction and Building Materials (Elsevier)',
    indexing: 'Scopus Q1',
    year: 2025,
    month: 'November',
    department: 'Civil Engineering',
    deptCode: 'CE',
    doi: '10.1016/j.conbuildmat.2025.138402',
    citations: 28,
    abstract:
      'Investigates the durability of fly-ash and slag based geopolymer concrete when subjected to aggressive sulfate cycles and high-humidity tropical conditions typical of the deltaic climate of Bangladesh.',
    keywords: ['Geopolymer Mortar', 'Fly Ash', 'Sulfate Resistance', 'Carbon Neutral'],
  },
  {
    id: 'pub-3',
    title: 'Optimal Sizing and Techno-Economic Analysis of Isolated Microgrids with Battery-Supercapacitor Hybrid Energy Storage',
    authors: ['Engr. K. Rahman', 'N. Hossain'],
    journal: 'Journal of Energy Storage (Elsevier)',
    indexing: 'Scopus Q1',
    year: 2026,
    month: 'January',
    department: 'Electrical & Electronic Engineering',
    deptCode: 'EEE',
    doi: '10.1016/j.est.2026.110294',
    citations: 19,
    abstract:
      'Formulates a mixed-integer linear programming model to minimize the levelized cost of energy (LCOE) in off-grid renewable installations, balancing battery cycle life with supercapacitor transient response.',
    keywords: ['Microgrid', 'Supercapacitor', 'LCOE', 'Hybrid Storage'],
  },
  {
    id: 'pub-4',
    title: 'Corporate Governance and Capital Structure Decisions: Evidence from Emerging Frontier Markets in South Asia',
    authors: ['Dr. H. Mahmud', 'Mr. A. Rauf'],
    journal: 'Asian Journal of Business and Accounting (Springer)',
    indexing: 'Scopus Q2',
    year: 2025,
    month: 'October',
    department: 'Business Administration',
    deptCode: 'DBA',
    doi: '10.1007/s43546-025-00412-8',
    citations: 11,
    abstract:
      'Applies generalized method of moments (GMM) panel regression across 180 listed firms on the Dhaka Stock Exchange to evaluate board independence, audit quality, and institutional debt ratios.',
    keywords: ['Corporate Governance', 'Capital Structure', 'Panel GMM', 'DSE'],
  },
  {
    id: 'pub-5',
    title: 'Algorithmic Discrimination and Due Process Protections in South Asian Judicial Systems',
    authors: ['Barrister S. Khan', 'Adv. F. Yasmin'],
    journal: 'Journal of Law and Information Science (Web of Science)',
    indexing: 'Web of Science',
    year: 2025,
    month: 'December',
    department: 'Law',
    deptCode: 'LAW',
    doi: '10.53300/001c.2025.99120',
    citations: 8,
    abstract:
      'Critiques predictive analytics used in criminal bail determinations and analyzes constitutional protections against algorithmic bias under Article 27 and Article 31 of the Constitution of Bangladesh.',
    keywords: ['Algorithmic Bias', 'Due Process', 'Constitutional Law', 'AI Ethics'],
  },
];
