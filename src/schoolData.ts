export interface Notice {
  id: string;
  title: string;
  category: 'admission' | 'exam' | 'academic' | 'event';
  date: string;
  pdfUrl?: string;
  content: string;
  important?: boolean;
}

export interface Teacher {
  id: string;
  name: string;
  designation: string;
  subject: string;
  qualification: string;
  experience: string;
  imageUrl: string;
  bio: string;
}

export interface AcademicClass {
  id: string;
  name: string; // e.g., "Class 6"
  description: string;
  folderUrl?: string;
  subjects: {
    name: string;
    code: string;
    description: string;
    fileName?: string;
    driveId?: string;
    driveViewUrl?: string;
    driveDownloadUrl?: string;
  }[];
  goals: string[];
}

export interface UniformItem {
  id: string;
  season: 'summer' | 'winter';
  gender: 'boy' | 'girl';
  description: string;
  components: string[];
  imageUrl: string;
}

export interface StudentLifeActivity {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  imageUrl: string;
}

export interface Achievement {
  id: string;
  title: string;
  metric: string;
  subtitle: string;
  description: string;
  year: string;
  category: 'academic' | 'sports' | 'cultural' | 'science';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'campus' | 'classroom' | 'laboratory' | 'sports' | 'events';
  imageUrl: string;
  description: string;
}

export const ACADEMIC_CLASSES: AcademicClass[] = [
  {
    id: 'class-6',
    name: 'Class 6',
    description: 'Transitioning students from primary school to structured secondary discipline with core foundation concepts.',
    folderUrl: 'https://drive.google.com/drive/folders/1cxZJKd1J7SBz1weCniI_kRALB--7k4jJ',
    goals: [
      'Establish strong analytical foundations in Mathematics & General Science',
      'Foster bilingual proficiency in Bangla and English',
      'Introduce fundamental computing skills through ICT curriculum',
      'Encourage teamwork and moral values through sports and clubs'
    ],
    subjects: [
      {
        name: 'Charupath (Bangla Literature)',
        code: 'BAN101',
        description: 'Selected prose, poetry, and foundational literacy.',
        fileName: 'Charupath_compressed.pdf',
        driveId: '10PNjYuLFnynmhSyMorBns71MoCer4czO',
        driveViewUrl: 'https://drive.google.com/file/d/10PNjYuLFnynmhSyMorBns71MoCer4czO/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=10PNjYuLFnynmhSyMorBns71MoCer4czO'
      },
      {
        name: 'Bangla Grammar & Language',
        code: 'BAN102',
        description: 'Bengali phonetics, grammar structure, and composition.',
        fileName: 'Bangla bekoron_compressed.pdf',
        driveId: '1xY_hNEEp65AyuBUtr6Xd735t9dXk4CgH',
        driveViewUrl: 'https://drive.google.com/file/d/1xY_hNEEp65AyuBUtr6Xd735t9dXk4CgH/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1xY_hNEEp65AyuBUtr6Xd735t9dXk4CgH'
      },
      {
        name: 'Anandopath (Rapid Reading)',
        code: 'BAN103',
        description: 'Supplementary stories and imaginative readings.',
        fileName: 'Anandopath_compressed.pdf',
        driveId: '1YDaTJFTBqcsayNBNMGrBK_RF0ThlzqyO',
        driveViewUrl: 'https://drive.google.com/file/d/1YDaTJFTBqcsayNBNMGrBK_RF0ThlzqyO/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1YDaTJFTBqcsayNBNMGrBK_RF0ThlzqyO'
      },
      {
        name: 'English for Today',
        code: 'ENG101',
        description: 'Interactive reading, listening, and vocabulary building.',
        fileName: 'English_compressed.pdf',
        driveId: '10V2l2nNa-iErhnAf7nDC8eOEMU1W1chz',
        driveViewUrl: 'https://drive.google.com/file/d/10V2l2nNa-iErhnAf7nDC8eOEMU1W1chz/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=10V2l2nNa-iErhnAf7nDC8eOEMU1W1chz'
      },
      {
        name: 'English Grammar & Composition',
        code: 'ENG102',
        description: 'Essential sentence structure, tenses, and guided writing.',
        fileName: 'English Gerammar_compressed.pdf',
        driveId: '1DH1fGoohHdaF3QJAsRP8W2mSR8So37-P',
        driveViewUrl: 'https://drive.google.com/file/d/1DH1fGoohHdaF3QJAsRP8W2mSR8So37-P/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1DH1fGoohHdaF3QJAsRP8W2mSR8So37-P'
      },
      {
        name: 'Mathematics',
        code: 'MAT101',
        description: 'Arithmetic, fractions, basic equations, and geometric figures.',
        fileName: 'Math_compressed.pdf',
        driveId: '1htH_0_0lniPYEI4KuZn-MXCG9J2lsCr8',
        driveViewUrl: 'https://drive.google.com/file/d/1htH_0_0lniPYEI4KuZn-MXCG9J2lsCr8/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1htH_0_0lniPYEI4KuZn-MXCG9J2lsCr8'
      },
      {
        name: 'General Science',
        code: 'SCI101',
        description: 'Introductory biology, physics principles, and environmental science.',
        fileName: 'Science_compressed.pdf',
        driveId: '1EupEucUXBVrCffDMn5Od1zp83bClzKgb',
        driveViewUrl: 'https://drive.google.com/file/d/1EupEucUXBVrCffDMn5Od1zp83bClzKgb/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1EupEucUXBVrCffDMn5Od1zp83bClzKgb'
      },
      {
        name: 'Bangladesh & Global Studies',
        code: 'BGS101',
        description: 'Heritage, state history, community civics, and geography.',
        fileName: 'BGS_compressed.pdf',
        driveId: '1jkBzP4mkQezYAgU_1rWAyuPu65l7XOJ9',
        driveViewUrl: 'https://drive.google.com/file/d/1jkBzP4mkQezYAgU_1rWAyuPu65l7XOJ9/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1jkBzP4mkQezYAgU_1rWAyuPu65l7XOJ9'
      },
      {
        name: 'Information & Communication Tech',
        code: 'ICT101',
        description: 'Computer fundamentals, typing, software apps, and digital safety.',
        fileName: 'ICT_compressed.pdf',
        driveId: '1eodLUyj2xLXMiwpuxxfUtzjKS_AINytz',
        driveViewUrl: 'https://drive.google.com/file/d/1eodLUyj2xLXMiwpuxxfUtzjKS_AINytz/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1eodLUyj2xLXMiwpuxxfUtzjKS_AINytz'
      },
      {
        name: 'Islam & Moral Education',
        code: 'ISL101',
        description: 'Moral principles, ethical guidance, and religious studies.',
        fileName: 'Islam_compressed.pdf',
        driveId: '14WUpGnFCvaWIK-6dULpkaXAz1iH4EJkK',
        driveViewUrl: 'https://drive.google.com/file/d/14WUpGnFCvaWIK-6dULpkaXAz1iH4EJkK/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=14WUpGnFCvaWIK-6dULpkaXAz1iH4EJkK'
      }
    ]
  },
  {
    id: 'class-7',
    name: 'Class 7',
    description: 'Expanding analytical horizons and developing deeper conceptual understandings across natural and social sciences.',
    folderUrl: 'https://drive.google.com/drive/folders/1tmLPXy4VDQuNm8Z2K4DgwIbR39243P3z',
    goals: [
      'Nurture logical reasoning and critical comprehension abilities',
      'Develop intermediate mathematical modeling and problem solving',
      'Engage in hands-on science experiments in labs',
      'Deepen appreciation for regional cultural history'
    ],
    subjects: [
      {
        name: 'Bangla (Saptaborno)',
        code: 'BAN201',
        description: 'Selected prose, poetry, and literary analyses for Class 7.',
        fileName: 'Bangla_compressed.pdf',
        driveId: '1Y829zjQNR70zw9wPNa3qwXVbQoRecd_J',
        driveViewUrl: 'https://drive.google.com/file/d/1Y829zjQNR70zw9wPNa3qwXVbQoRecd_J/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1Y829zjQNR70zw9wPNa3qwXVbQoRecd_J'
      },
      {
        name: 'Bangla Bakoron & Nirmiti',
        code: 'BAN202',
        description: 'Intermediate grammar, morphology, and formal essay writing.',
        fileName: 'Bangla Bakoron_compressed.pdf',
        driveId: '1x5KQYS91pRBYgq7oW951vAlK7hzCa2je',
        driveViewUrl: 'https://drive.google.com/file/d/1x5KQYS91pRBYgq7oW951vAlK7hzCa2je/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1x5KQYS91pRBYgq7oW951vAlK7hzCa2je'
      },
      {
        name: 'Anandapatha (Rapid Reader)',
        code: 'BAN203',
        description: 'Supplementary reader focusing on fiction and drama.',
        fileName: 'Anandapatha_compressed.pdf',
        driveId: '1biK0UKLS-5Fhjfwlc30tFGBvt5Sk63TY',
        driveViewUrl: 'https://drive.google.com/file/d/1biK0UKLS-5Fhjfwlc30tFGBvt5Sk63TY/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1biK0UKLS-5Fhjfwlc30tFGBvt5Sk63TY'
      },
      {
        name: 'English for Today',
        code: 'ENG201',
        description: 'Intermediate reading comprehension, dialogs, and writing.',
        fileName: 'English_compressed (1).pdf',
        driveId: '1p8V0qadDVIvpAfOek_9OTTpLz13AgKD2',
        driveViewUrl: 'https://drive.google.com/file/d/1p8V0qadDVIvpAfOek_9OTTpLz13AgKD2/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1p8V0qadDVIvpAfOek_9OTTpLz13AgKD2'
      },
      {
        name: 'English Grammar & Composition',
        code: 'ENG202',
        description: 'Detailed grammar rules, paragraph development, and letters.',
        fileName: 'English Grammar_compressed.pdf',
        driveId: '12H1omE1oRvhZ2AXpqZMP6JUyrXmTnbV6',
        driveViewUrl: 'https://drive.google.com/file/d/12H1omE1oRvhZ2AXpqZMP6JUyrXmTnbV6/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=12H1omE1oRvhZ2AXpqZMP6JUyrXmTnbV6'
      },
      {
        name: 'Mathematics',
        code: 'MAT201',
        description: 'Algebraic expressions, linear equations, geometry, and ratios.',
        fileName: 'Math_compressed (1).pdf',
        driveId: '1nONwXrXE7drkvp-gXykgK__YFSszn7wN',
        driveViewUrl: 'https://drive.google.com/file/d/1nONwXrXE7drkvp-gXykgK__YFSszn7wN/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1nONwXrXE7drkvp-gXykgK__YFSszn7wN'
      },
      {
        name: 'General Science',
        code: 'SCI201',
        description: 'Cell structure, energy, elements, and environmental balance.',
        fileName: 'Science_compressed (1).pdf',
        driveId: '1NvDOTJHUJnVR94n4gQek5qSMC4c9zmDF',
        driveViewUrl: 'https://drive.google.com/file/d/1NvDOTJHUJnVR94n4gQek5qSMC4c9zmDF/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1NvDOTJHUJnVR94n4gQek5qSMC4c9zmDF'
      },
      {
        name: 'Bangladesh & Global Studies',
        code: 'BGS201',
        description: 'Culture, governance structures, economic development, and geography.',
        fileName: 'BGS_compressed (1).pdf',
        driveId: '1FYkJL9Enl_WzUJQ_GOm0Q5N7Nb8xONmx',
        driveViewUrl: 'https://drive.google.com/file/d/1FYkJL9Enl_WzUJQ_GOm0Q5N7Nb8xONmx/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1FYkJL9Enl_WzUJQ_GOm0Q5N7Nb8xONmx'
      },
      {
        name: 'Information & Communication Tech',
        code: 'ICT201',
        description: 'Hardware, operating systems, internet usage, and computer security.',
        fileName: 'ICT_compressed (1).pdf',
        driveId: '1iWWWzp1nLMVlTWZ2wo_TDawV6OIIoeyH',
        driveViewUrl: 'https://drive.google.com/file/d/1iWWWzp1nLMVlTWZ2wo_TDawV6OIIoeyH/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1iWWWzp1nLMVlTWZ2wo_TDawV6OIIoeyH'
      },
      {
        name: 'Islam & Moral Education',
        code: 'ISL201',
        description: 'Islamic history, moral values, and social ethics.',
        fileName: 'Islam_compressed (1).pdf',
        driveId: '1q5HivwnyNqFyrvOZ3vb8Vqgw0sSBLpWv',
        driveViewUrl: 'https://drive.google.com/file/d/1q5HivwnyNqFyrvOZ3vb8Vqgw0sSBLpWv/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1q5HivwnyNqFyrvOZ3vb8Vqgw0sSBLpWv'
      }
    ]
  },
  {
    id: 'class-8',
    name: 'Class 8',
    description: 'Preparing students for Junior Secondary graduation (JSC equivalency training) with focused learning frameworks.',
    folderUrl: 'https://drive.google.com/drive/folders/1Tl1NeOdk3BpeAIroZhxbmnlT3Pu7we4A',
    goals: [
      'Achieve competency in advanced arithmetic and basic trigonometry',
      'Synthesize historical processes and global administrative structures',
      'Refine scientific reasoning and physical principles',
      'Prepare for specialized paths in high secondary'
    ],
    subjects: [
      {
        name: 'Sahitto Konika (Bangla Literature)',
        code: 'BAN301',
        description: 'Class 8 Board textbook featuring classic Bengali literature and poetry.',
        fileName: 'Secondary (BV)-2026_Class 8_Sahitto Konika_compressed.pdf',
        driveId: '1Ed9KZ2aDa4bS_s4CZiI4VsTiuwm3ywKh',
        driveViewUrl: 'https://drive.google.com/file/d/1Ed9KZ2aDa4bS_s4CZiI4VsTiuwm3ywKh/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1Ed9KZ2aDa4bS_s4CZiI4VsTiuwm3ywKh'
      },
      {
        name: 'Bangla Grammar & Composition',
        code: 'BAN302',
        description: 'Advanced syntax, vocabulary, composition, and formal essay writing.',
        fileName: 'Secondary (BV)-2026_Class 8_Bangla Grammar_compressed.pdf',
        driveId: '1iz5zgtgSYwtgGVECVa0Z5dfUGePU3nB0',
        driveViewUrl: 'https://drive.google.com/file/d/1iz5zgtgSYwtgGVECVa0Z5dfUGePU3nB0/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1iz5zgtgSYwtgGVECVa0Z5dfUGePU3nB0'
      },
      {
        name: 'Anondopath (Rapid Reader)',
        code: 'BAN303',
        description: 'Supplementary literary works and drama for Class 8.',
        fileName: 'Secondary (BV)-2026_Class 8_Anondopath_compressed.pdf',
        driveId: '1UDXFLoqwU64itQqN2O3lrxd29IAWaC3I',
        driveViewUrl: 'https://drive.google.com/file/d/1UDXFLoqwU64itQqN2O3lrxd29IAWaC3I/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1UDXFLoqwU64itQqN2O3lrxd29IAWaC3I'
      },
      {
        name: 'English For Today',
        code: 'ENG301',
        description: 'Board curriculum for reading skills, comprehension, and conversation.',
        fileName: 'Secondary (BV)-2026_Class 8_English For Today_compressed.pdf',
        driveId: '1_cidTcKNoNzj5Z_jCj8tQsQJw5aMPq_s',
        driveViewUrl: 'https://drive.google.com/file/d/1_cidTcKNoNzj5Z_jCj8tQsQJw5aMPq_s/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1_cidTcKNoNzj5Z_jCj8tQsQJw5aMPq_s'
      },
      {
        name: 'English Grammar and Composition',
        code: 'ENG302',
        description: 'Complex sentence structures, formal letters, reports, and grammar.',
        fileName: 'Secondary (BV)-2026_Class 8_English Grammar and Composition_compressed.pdf',
        driveId: '1BUc_19DNSVWQfVhb-xIcV4yEdHUQpA-V',
        driveViewUrl: 'https://drive.google.com/file/d/1BUc_19DNSVWQfVhb-xIcV4yEdHUQpA-V/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1BUc_19DNSVWQfVhb-xIcV4yEdHUQpA-V'
      },
      {
        name: 'Mathematics',
        code: 'MAT301',
        description: 'Real numbers, set theory, algebraic factorization, statistics, and geometry.',
        fileName: 'Secondary (BV)-2026_Class 8_Math_compressed.pdf',
        driveId: '1zIbQT8uX8uRM-GyJzGCDYudiX-7dFrpH',
        driveViewUrl: 'https://drive.google.com/file/d/1zIbQT8uX8uRM-GyJzGCDYudiX-7dFrpH/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1zIbQT8uX8uRM-GyJzGCDYudiX-7dFrpH'
      },
      {
        name: 'General Science',
        code: 'SCI301',
        description: 'Physics mechanics, chemical reactions, genetics, and ecology.',
        fileName: 'Secondary (BV)-2026_Class 8_Science_compressed.pdf',
        driveId: '1xCnjsMs6uj2TH7oigFs1s0CwPJDe2Khq',
        driveViewUrl: 'https://drive.google.com/file/d/1xCnjsMs6uj2TH7oigFs1s0CwPJDe2Khq/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1xCnjsMs6uj2TH7oigFs1s0CwPJDe2Khq'
      },
      {
        name: 'Bangladesh & Global Studies',
        code: 'BGS301',
        description: '1971 Liberation War history, constitution, governance, and geography.',
        fileName: 'Secondary (BV)-2026_Class 8_BGS_compressed.pdf',
        driveId: '1ElVYJV_oSyAXcJMhWJvbRwQvaio_DxLF',
        driveViewUrl: 'https://drive.google.com/file/d/1ElVYJV_oSyAXcJMhWJvbRwQvaio_DxLF/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1ElVYJV_oSyAXcJMhWJvbRwQvaio_DxLF'
      },
      {
        name: 'Information & Communication Tech',
        code: 'ICT301',
        description: 'Database management, networking concepts, cyber law, and software tools.',
        fileName: 'Secondary (BV)-2026_Class 8_ICT_compressed.pdf',
        driveId: '1B5m92m1nwDDoqRySp_UIWrashKnjitmz',
        driveViewUrl: 'https://drive.google.com/file/d/1B5m92m1nwDDoqRySp_UIWrashKnjitmz/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1B5m92m1nwDDoqRySp_UIWrashKnjitmz'
      },
      {
        name: 'Islam & Moral Education',
        code: 'ISL301',
        description: 'Moral philosophy, Quranic studies, Hadith, and human character building.',
        fileName: 'Secondary (BV)-2026_Class 8_Islam_compressed.pdf',
        driveId: '1_wKk4VsSxvAKNVLmROovsHoEzdOkS4o3',
        driveViewUrl: 'https://drive.google.com/file/d/1_wKk4VsSxvAKNVLmROovsHoEzdOkS4o3/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1_wKk4VsSxvAKNVLmROovsHoEzdOkS4o3'
      }
    ]
  },
  {
    id: 'class-9',
    name: 'Class 9',
    description: 'Specialization begins. Science, Commerce, and Humanities streams prepare for the Secondary School Certificate (SSC) Board exams.',
    folderUrl: 'https://drive.google.com/drive/folders/1HLbIV3vIzrjVUwvzDyyrMW2GqzkV288Z',
    goals: [
      'Differentiate into specialized Physics, Chemistry, and Biology modules',
      'Establish core commerce principles if choosing Business Studies',
      'Integrate higher mathematical skills (coordinate geometry, vectors, algebra)',
      'Prepare for structured board practical lab sessions and exam standards'
    ],
    subjects: [
      {
        name: 'Bangla Sahitto',
        code: 'BAN401',
        description: 'Comprehensive Bangladeshi prose, poetry, and classical literature.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Bangla Sahitto_compressed.pdf',
        driveId: '1_3dLQldLJ8btsLKOSwHopJrmns-rLZQ0',
        driveViewUrl: 'https://drive.google.com/file/d/1_3dLQldLJ8btsLKOSwHopJrmns-rLZQ0/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1_3dLQldLJ8btsLKOSwHopJrmns-rLZQ0'
      },
      {
        name: 'Bangla Grammar & Composition',
        code: 'BAN402',
        description: 'SSC standard Bangla grammar, sentence analysis, and rhetoric.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Bangla Grammar_compressed.pdf',
        driveId: '1ZciS175X8YcawA1UVDYmfZ_NUutkXtcd',
        driveViewUrl: 'https://drive.google.com/file/d/1ZciS175X8YcawA1UVDYmfZ_NUutkXtcd/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1ZciS175X8YcawA1UVDYmfZ_NUutkXtcd'
      },
      {
        name: 'Bangla Sohopath (Novel & Drama)',
        code: 'BAN403',
        description: 'Required novels and theatrical plays for SSC examination.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Bangla Sohopath_compressed.pdf',
        driveId: '1Gci5ANARdJGZ36wl5kJA6BUgcDYOx4yt',
        driveViewUrl: 'https://drive.google.com/file/d/1Gci5ANARdJGZ36wl5kJA6BUgcDYOx4yt/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1Gci5ANARdJGZ36wl5kJA6BUgcDYOx4yt'
      },
      {
        name: 'English For Today',
        code: 'ENG401',
        description: 'National curriculum English for advanced secondary level.',
        fileName: 'Secondary (BV)-2026_Class 9-10_English For Today_compressed.pdf',
        driveId: '1HmGnnOl_52f1zEmstyTY2RmS01O8tWoR',
        driveViewUrl: 'https://drive.google.com/file/d/1HmGnnOl_52f1zEmstyTY2RmS01O8tWoR/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1HmGnnOl_52f1zEmstyTY2RmS01O8tWoR'
      },
      {
        name: 'English Grammar and Composition',
        code: 'ENG402',
        description: 'Advanced syntax, formal essays, report writing, and comprehension.',
        fileName: 'Secondary (BV)-2026_Class 9-10_English Grammar and Composition_compressed.pdf',
        driveId: '1cXduU38lOfivcDkP16XC63X1R9Uj9-g9',
        driveViewUrl: 'https://drive.google.com/file/d/1cXduU38lOfivcDkP16XC63X1R9Uj9-g9/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1cXduU38lOfivcDkP16XC63X1R9Uj9-g9'
      },
      {
        name: 'General Mathematics',
        code: 'MAT401',
        description: 'Functions, logarithms, trigonometry, circle theorems, and statistics.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Math_compressed (1).pdf',
        driveId: '18T-gMqF3YGKaXg4_XIhdvZLBFGhjJccT',
        driveViewUrl: 'https://drive.google.com/file/d/18T-gMqF3YGKaXg4_XIhdvZLBFGhjJccT/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=18T-gMqF3YGKaXg4_XIhdvZLBFGhjJccT'
      },
      {
        name: 'Higher Mathematics',
        code: 'HMA401',
        description: 'Coordinate geometry, vectors, solid geometry, polynomials, and probability.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Higher Math_compressed.pdf',
        driveId: '1lBGcV9ti8t2YxF-ycFQMa2zSGfrWIJB9',
        driveViewUrl: 'https://drive.google.com/file/d/1lBGcV9ti8t2YxF-ycFQMa2zSGfrWIJB9/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1lBGcV9ti8t2YxF-ycFQMa2zSGfrWIJB9'
      },
      {
        name: 'Physics',
        code: 'PHY401',
        description: 'Mechanics, wave motion, sound, thermodynamics, electricity, and modern physics.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Physics_compressed.pdf',
        driveId: '1Cd9Xx_TKumITecB3WK4muH8qJSSvpZl5',
        driveViewUrl: 'https://drive.google.com/file/d/1Cd9Xx_TKumITecB3WK4muH8qJSSvpZl5/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1Cd9Xx_TKumITecB3WK4muH8qJSSvpZl5'
      },
      {
        name: 'Chemistry',
        code: 'CHE401',
        description: 'Atomic structure, periodic table, chemical bonding, acids, bases, and organic chemistry.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Chemistry_compressed.pdf',
        driveId: '1QHQD4CBlbPO9baSVWuLNKtKUOas9H8HH',
        driveViewUrl: 'https://drive.google.com/file/d/1QHQD4CBlbPO9baSVWuLNKtKUOas9H8HH/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1QHQD4CBlbPO9baSVWuLNKtKUOas9H8HH'
      },
      {
        name: 'Biology',
        code: 'BIO401',
        description: 'Cell biology, bio-energetics, human physiological systems, genetics, and ecology.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Biology_compressed.pdf',
        driveId: '1hGgj3d1iX9hvQCPsDjKqij5_R2KKWjcB',
        driveViewUrl: 'https://drive.google.com/file/d/1hGgj3d1iX9hvQCPsDjKqij5_R2KKWjcB/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1hGgj3d1iX9hvQCPsDjKqij5_R2KKWjcB'
      },
      {
        name: 'General Science',
        code: 'SCI401',
        description: 'Integrated science for humanities & business studies streams.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Science_compressed.pdf',
        driveId: '12I4odqBq9oePPas3Y7QTj4sWUueVI2_l',
        driveViewUrl: 'https://drive.google.com/file/d/12I4odqBq9oePPas3Y7QTj4sWUueVI2_l/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=12I4odqBq9oePPas3Y7QTj4sWUueVI2_l'
      },
      {
        name: 'Bangladesh & Global Studies',
        code: 'BGS401',
        description: 'Comprehensive national history, Constitution, international relations, and socio-economic governance.',
        fileName: 'Secondary (BV)-2026_Class 9-10_BGS_compressed.pdf',
        driveId: '1vM6ecLYJPEXmtsMonKhUn3TpQtMbfkP_',
        driveViewUrl: 'https://drive.google.com/file/d/1vM6ecLYJPEXmtsMonKhUn3TpQtMbfkP_/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1vM6ecLYJPEXmtsMonKhUn3TpQtMbfkP_'
      },
      {
        name: 'Geography & Environment (Bhugol)',
        code: 'GEO401',
        description: 'Physical geography, climate science, map analysis, and environmental management.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Bhugol_compressed.pdf',
        driveId: '1Fa-GudvsEa7ao9vi8cULZWddZzgCdn2I',
        driveViewUrl: 'https://drive.google.com/file/d/1Fa-GudvsEa7ao9vi8cULZWddZzgCdn2I/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1Fa-GudvsEa7ao9vi8cULZWddZzgCdn2I'
      },
      {
        name: 'Civics & Citizenship',
        code: 'CIV401',
        description: 'Democratic principles, rights, state organs, and international organs.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Civics_compressed.pdf',
        driveId: '1D56JkNqwyDbnD5PS4PRXdiiildUpcBTy',
        driveViewUrl: 'https://drive.google.com/file/d/1D56JkNqwyDbnD5PS4PRXdiiildUpcBTy/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1D56JkNqwyDbnD5PS4PRXdiiildUpcBTy'
      },
      {
        name: 'Economics',
        code: 'ECO401',
        description: 'Micro & macro economic concepts, national revenue, budget, and development.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Economics_compressed.pdf',
        driveId: '1EfE7kD3pK4xPuqNml0pBa_BcT1Xa3VSS',
        driveViewUrl: 'https://drive.google.com/file/d/1EfE7kD3pK4xPuqNml0pBa_BcT1Xa3VSS/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1EfE7kD3pK4xPuqNml0pBa_BcT1Xa3VSS'
      },
      {
        name: 'History of Bangladesh & World Civ',
        code: 'HIS401',
        description: 'Ancient Bengal, colonial movements, 1952 Language Movement, and 1971 Liberation War.',
        fileName: 'Secondary (BV)-2026_Class 9-10_History_compressed.pdf',
        driveId: '100eAS2jBC9UhZh4V6uay1I8piOQSvhuJ',
        driveViewUrl: 'https://drive.google.com/file/d/100eAS2jBC9UhZh4V6uay1I8piOQSvhuJ/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=100eAS2jBC9UhZh4V6uay1I8piOQSvhuJ'
      },
      {
        name: 'Accounting',
        code: 'ACC401',
        description: 'Double entry bookkeeping, ledger, trial balance, and financial statements.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Accounting_compressed.pdf',
        driveId: '1Y_erl9o6NLTxB2LmAgZNVAg7IrS5459S',
        driveViewUrl: 'https://drive.google.com/file/d/1Y_erl9o6NLTxB2LmAgZNVAg7IrS5459S/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1Y_erl9o6NLTxB2LmAgZNVAg7IrS5459S'
      },
      {
        name: 'Business Entrepreneurship',
        code: 'BUS401',
        description: 'Small business planning, risk management, trade, and enterprise growth.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Business Entrepreneurship_compressed.pdf',
        driveId: '1iZZr1ajopTxWHUPFOqP6nL3zgToSzUR7',
        driveViewUrl: 'https://drive.google.com/file/d/1iZZr1ajopTxWHUPFOqP6nL3zgToSzUR7/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1iZZr1ajopTxWHUPFOqP6nL3zgToSzUR7'
      },
      {
        name: 'Finance and Banking',
        code: 'FIN401',
        description: 'Time value of money, capital budgeting, commercial banking, and central bank operations.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Finance and Banking_compressed.pdf',
        driveId: '1ab-gIxOAjQAwPamvTw7zwc669wr5WhWO',
        driveViewUrl: 'https://drive.google.com/file/d/1ab-gIxOAjQAwPamvTw7zwc669wr5WhWO/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1ab-gIxOAjQAwPamvTw7zwc669wr5WhWO'
      },
      {
        name: 'Agriculture Studies',
        code: 'AGR401',
        description: 'Crop technology, soil management, poultry, fisheries, and agro-business.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Agriculture_compressed.pdf',
        driveId: '19gPhQ056_nz1l_tdz-oEV-0gjh6SB_uJ',
        driveViewUrl: 'https://drive.google.com/file/d/19gPhQ056_nz1l_tdz-oEV-0gjh6SB_uJ/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=19gPhQ056_nz1l_tdz-oEV-0gjh6SB_uJ'
      },
      {
        name: 'Home Science',
        code: 'HMS401',
        description: 'Nutrition, family resource management, child development, and textile design.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Home Science_compressed.pdf',
        driveId: '1JJbIX6Zxvy7BftynMDinkjH4G2E9qnRw',
        driveViewUrl: 'https://drive.google.com/file/d/1JJbIX6Zxvy7BftynMDinkjH4G2E9qnRw/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1JJbIX6Zxvy7BftynMDinkjH4G2E9qnRw'
      },
      {
        name: 'Information & Communication Tech',
        code: 'ICT401',
        description: 'Database design, HTML web basics, multimedia tools, and computer safety.',
        fileName: 'Secondary (BV)-2026_Class 9-10_ICT_compressed.pdf',
        driveId: '16qwYhVIcFUo967XrHFbAOq5NenYXIKuI',
        driveViewUrl: 'https://drive.google.com/file/d/16qwYhVIcFUo967XrHFbAOq5NenYXIKuI/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=16qwYhVIcFUo967XrHFbAOq5NenYXIKuI'
      },
      {
        name: 'Islam & Moral Education',
        code: 'ISL401',
        description: 'Comprehensive Quranic exegesis, Hadith studies, Islamic law, and ethics.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Islam_compressed.pdf',
        driveId: '1rSw2E7csXj6mrfhqg9vp5vhs4Tz7CT4o',
        driveViewUrl: 'https://drive.google.com/file/d/1rSw2E7csXj6mrfhqg9vp5vhs4Tz7CT4o/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1rSw2E7csXj6mrfhqg9vp5vhs4Tz7CT4o'
      }
    ]
  },
  {
    id: 'class-10',
    name: 'Class 10',
    description: 'Final prep year leading to the national SSC Board exams. Uses the exact same comprehensive secondary curriculum files as Class 9.',
    folderUrl: 'https://drive.google.com/drive/folders/1HLbIV3vIzrjVUwvzDyyrMW2GqzkV288Z',
    goals: [
      'Master Board Exam syllabus requirements completely',
      'Deliver peak performance in school-wide pre-test and test mock exams',
      'Optimize speed and accuracy in analytical problems',
      'Foster independent research and scientific validation'
    ],
    subjects: [
      {
        name: 'Bangla Sahitto',
        code: 'BAN501',
        description: 'Comprehensive Bangladeshi prose, poetry, and classical literature.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Bangla Sahitto_compressed.pdf',
        driveId: '1_3dLQldLJ8btsLKOSwHopJrmns-rLZQ0',
        driveViewUrl: 'https://drive.google.com/file/d/1_3dLQldLJ8btsLKOSwHopJrmns-rLZQ0/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1_3dLQldLJ8btsLKOSwHopJrmns-rLZQ0'
      },
      {
        name: 'Bangla Grammar & Composition',
        code: 'BAN502',
        description: 'SSC standard Bangla grammar, sentence analysis, and rhetoric.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Bangla Grammar_compressed.pdf',
        driveId: '1ZciS175X8YcawA1UVDYmfZ_NUutkXtcd',
        driveViewUrl: 'https://drive.google.com/file/d/1ZciS175X8YcawA1UVDYmfZ_NUutkXtcd/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1ZciS175X8YcawA1UVDYmfZ_NUutkXtcd'
      },
      {
        name: 'Bangla Sohopath (Novel & Drama)',
        code: 'BAN503',
        description: 'Required novels and theatrical plays for SSC examination.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Bangla Sohopath_compressed.pdf',
        driveId: '1Gci5ANARdJGZ36wl5kJA6BUgcDYOx4yt',
        driveViewUrl: 'https://drive.google.com/file/d/1Gci5ANARdJGZ36wl5kJA6BUgcDYOx4yt/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1Gci5ANARdJGZ36wl5kJA6BUgcDYOx4yt'
      },
      {
        name: 'English For Today',
        code: 'ENG501',
        description: 'National curriculum English for advanced secondary level.',
        fileName: 'Secondary (BV)-2026_Class 9-10_English For Today_compressed.pdf',
        driveId: '1HmGnnOl_52f1zEmstyTY2RmS01O8tWoR',
        driveViewUrl: 'https://drive.google.com/file/d/1HmGnnOl_52f1zEmstyTY2RmS01O8tWoR/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1HmGnnOl_52f1zEmstyTY2RmS01O8tWoR'
      },
      {
        name: 'English Grammar and Composition',
        code: 'ENG502',
        description: 'Advanced syntax, formal essays, report writing, and comprehension.',
        fileName: 'Secondary (BV)-2026_Class 9-10_English Grammar and Composition_compressed.pdf',
        driveId: '1cXduU38lOfivcDkP16XC63X1R9Uj9-g9',
        driveViewUrl: 'https://drive.google.com/file/d/1cXduU38lOfivcDkP16XC63X1R9Uj9-g9/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1cXduU38lOfivcDkP16XC63X1R9Uj9-g9'
      },
      {
        name: 'General Mathematics',
        code: 'MAT501',
        description: 'Functions, logarithms, trigonometry, circle theorems, and statistics.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Math_compressed (1).pdf',
        driveId: '18T-gMqF3YGKaXg4_XIhdvZLBFGhjJccT',
        driveViewUrl: 'https://drive.google.com/file/d/18T-gMqF3YGKaXg4_XIhdvZLBFGhjJccT/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=18T-gMqF3YGKaXg4_XIhdvZLBFGhjJccT'
      },
      {
        name: 'Higher Mathematics',
        code: 'HMA501',
        description: 'Coordinate geometry, vectors, solid geometry, polynomials, and probability.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Higher Math_compressed.pdf',
        driveId: '1lBGcV9ti8t2YxF-ycFQMa2zSGfrWIJB9',
        driveViewUrl: 'https://drive.google.com/file/d/1lBGcV9ti8t2YxF-ycFQMa2zSGfrWIJB9/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1lBGcV9ti8t2YxF-ycFQMa2zSGfrWIJB9'
      },
      {
        name: 'Physics',
        code: 'PHY501',
        description: 'Mechanics, wave motion, sound, thermodynamics, electricity, and modern physics.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Physics_compressed.pdf',
        driveId: '1Cd9Xx_TKumITecB3WK4muH8qJSSvpZl5',
        driveViewUrl: 'https://drive.google.com/file/d/1Cd9Xx_TKumITecB3WK4muH8qJSSvpZl5/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1Cd9Xx_TKumITecB3WK4muH8qJSSvpZl5'
      },
      {
        name: 'Chemistry',
        code: 'CHE501',
        description: 'Atomic structure, periodic table, chemical bonding, acids, bases, and organic chemistry.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Chemistry_compressed.pdf',
        driveId: '1QHQD4CBlbPO9baSVWuLNKtKUOas9H8HH',
        driveViewUrl: 'https://drive.google.com/file/d/1QHQD4CBlbPO9baSVWuLNKtKUOas9H8HH/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1QHQD4CBlbPO9baSVWuLNKtKUOas9H8HH'
      },
      {
        name: 'Biology',
        code: 'BIO501',
        description: 'Cell biology, bio-energetics, human physiological systems, genetics, and ecology.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Biology_compressed.pdf',
        driveId: '1hGgj3d1iX9hvQCPsDjKqij5_R2KKWjcB',
        driveViewUrl: 'https://drive.google.com/file/d/1hGgj3d1iX9hvQCPsDjKqij5_R2KKWjcB/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1hGgj3d1iX9hvQCPsDjKqij5_R2KKWjcB'
      },
      {
        name: 'General Science',
        code: 'SCI501',
        description: 'Integrated science for humanities & business studies streams.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Science_compressed.pdf',
        driveId: '12I4odqBq9oePPas3Y7QTj4sWUueVI2_l',
        driveViewUrl: 'https://drive.google.com/file/d/12I4odqBq9oePPas3Y7QTj4sWUueVI2_l/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=12I4odqBq9oePPas3Y7QTj4sWUueVI2_l'
      },
      {
        name: 'Bangladesh & Global Studies',
        code: 'BGS501',
        description: 'Comprehensive national history, Constitution, international relations, and socio-economic governance.',
        fileName: 'Secondary (BV)-2026_Class 9-10_BGS_compressed.pdf',
        driveId: '1vM6ecLYJPEXmtsMonKhUn3TpQtMbfkP_',
        driveViewUrl: 'https://drive.google.com/file/d/1vM6ecLYJPEXmtsMonKhUn3TpQtMbfkP_/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1vM6ecLYJPEXmtsMonKhUn3TpQtMbfkP_'
      },
      {
        name: 'Geography & Environment (Bhugol)',
        code: 'GEO501',
        description: 'Physical geography, climate science, map analysis, and environmental management.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Bhugol_compressed.pdf',
        driveId: '1Fa-GudvsEa7ao9vi8cULZWddZzgCdn2I',
        driveViewUrl: 'https://drive.google.com/file/d/1Fa-GudvsEa7ao9vi8cULZWddZzgCdn2I/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1Fa-GudvsEa7ao9vi8cULZWddZzgCdn2I'
      },
      {
        name: 'Civics & Citizenship',
        code: 'CIV501',
        description: 'Democratic principles, rights, state organs, and international organs.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Civics_compressed.pdf',
        driveId: '1D56JkNqwyDbnD5PS4PRXdiiildUpcBTy',
        driveViewUrl: 'https://drive.google.com/file/d/1D56JkNqwyDbnD5PS4PRXdiiildUpcBTy/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1D56JkNqwyDbnD5PS4PRXdiiildUpcBTy'
      },
      {
        name: 'Economics',
        code: 'ECO501',
        description: 'Micro & macro economic concepts, national revenue, budget, and development.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Economics_compressed.pdf',
        driveId: '1EfE7kD3pK4xPuqNml0pBa_BcT1Xa3VSS',
        driveViewUrl: 'https://drive.google.com/file/d/1EfE7kD3pK4xPuqNml0pBa_BcT1Xa3VSS/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1EfE7kD3pK4xPuqNml0pBa_BcT1Xa3VSS'
      },
      {
        name: 'History of Bangladesh & World Civ',
        code: 'HIS501',
        description: 'Ancient Bengal, colonial movements, 1952 Language Movement, and 1971 Liberation War.',
        fileName: 'Secondary (BV)-2026_Class 9-10_History_compressed.pdf',
        driveId: '100eAS2jBC9UhZh4V6uay1I8piOQSvhuJ',
        driveViewUrl: 'https://drive.google.com/file/d/100eAS2jBC9UhZh4V6uay1I8piOQSvhuJ/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=100eAS2jBC9UhZh4V6uay1I8piOQSvhuJ'
      },
      {
        name: 'Accounting',
        code: 'ACC501',
        description: 'Double entry bookkeeping, ledger, trial balance, and financial statements.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Accounting_compressed.pdf',
        driveId: '1Y_erl9o6NLTxB2LmAgZNVAg7IrS5459S',
        driveViewUrl: 'https://drive.google.com/file/d/1Y_erl9o6NLTxB2LmAgZNVAg7IrS5459S/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1Y_erl9o6NLTxB2LmAgZNVAg7IrS5459S'
      },
      {
        name: 'Business Entrepreneurship',
        code: 'BUS501',
        description: 'Small business planning, risk management, trade, and enterprise growth.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Business Entrepreneurship_compressed.pdf',
        driveId: '1iZZr1ajopTxWHUPFOqP6nL3zgToSzUR7',
        driveViewUrl: 'https://drive.google.com/file/d/1iZZr1ajopTxWHUPFOqP6nL3zgToSzUR7/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1iZZr1ajopTxWHUPFOqP6nL3zgToSzUR7'
      },
      {
        name: 'Finance and Banking',
        code: 'FIN501',
        description: 'Time value of money, capital budgeting, commercial banking, and central bank operations.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Finance and Banking_compressed.pdf',
        driveId: '1ab-gIxOAjQAwPamvTw7zwc669wr5WhWO',
        driveViewUrl: 'https://drive.google.com/file/d/1ab-gIxOAjQAwPamvTw7zwc669wr5WhWO/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1ab-gIxOAjQAwPamvTw7zwc669wr5WhWO'
      },
      {
        name: 'Agriculture Studies',
        code: 'AGR501',
        description: 'Crop technology, soil management, poultry, fisheries, and agro-business.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Agriculture_compressed.pdf',
        driveId: '19gPhQ056_nz1l_tdz-oEV-0gjh6SB_uJ',
        driveViewUrl: 'https://drive.google.com/file/d/19gPhQ056_nz1l_tdz-oEV-0gjh6SB_uJ/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=19gPhQ056_nz1l_tdz-oEV-0gjh6SB_uJ'
      },
      {
        name: 'Home Science',
        code: 'HMS501',
        description: 'Nutrition, family resource management, child development, and textile design.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Home Science_compressed.pdf',
        driveId: '1JJbIX6Zxvy7BftynMDinkjH4G2E9qnRw',
        driveViewUrl: 'https://drive.google.com/file/d/1JJbIX6Zxvy7BftynMDinkjH4G2E9qnRw/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1JJbIX6Zxvy7BftynMDinkjH4G2E9qnRw'
      },
      {
        name: 'Information & Communication Tech',
        code: 'ICT501',
        description: 'Database design, HTML web basics, multimedia tools, and computer safety.',
        fileName: 'Secondary (BV)-2026_Class 9-10_ICT_compressed.pdf',
        driveId: '16qwYhVIcFUo967XrHFbAOq5NenYXIKuI',
        driveViewUrl: 'https://drive.google.com/file/d/16qwYhVIcFUo967XrHFbAOq5NenYXIKuI/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=16qwYhVIcFUo967XrHFbAOq5NenYXIKuI'
      },
      {
        name: 'Islam & Moral Education',
        code: 'ISL501',
        description: 'Comprehensive Quranic exegesis, Hadith studies, Islamic law, and ethics.',
        fileName: 'Secondary (BV)-2026_Class 9-10_Islam_compressed.pdf',
        driveId: '1rSw2E7csXj6mrfhqg9vp5vhs4Tz7CT4o',
        driveViewUrl: 'https://drive.google.com/file/d/1rSw2E7csXj6mrfhqg9vp5vhs4Tz7CT4o/preview',
        driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1rSw2E7csXj6mrfhqg9vp5vhs4Tz7CT4o'
      }
    ]
  }
];

export const TEACHERS: Teacher[] = [
  {
    id: 'teacher-1',
    name: 'Kamal Ahmed Choudhury',
    designation: 'Head Teacher & Principal',
    subject: 'Administration & Bangladesh Studies',
    qualification: 'M.A. in History (Dhaka University), M.Ed (Leeds University, UK)',
    experience: '24 Years',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop',
    bio: 'Dedicated to fostering holistic development, moral uprightness, and academic rigor in Bangladeshi secondary education. Believes in combining modern science with ethical values.'
  },
  {
    id: 'teacher-2',
    name: 'Anika Rahman, PhD',
    designation: 'Assistant Headmistress & Senior Lecturer',
    subject: 'English Literature',
    qualification: 'Ph.D. in Applied Linguistics (Jahangirnagar University)',
    experience: '15 Years',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop',
    bio: 'Passionate about communication-driven language learning. Directs the Sakura English Literary Society and guides the Debate Club toward national tournaments.'
  },
  {
    id: 'teacher-3',
    name: 'Mohammad Rafiqul Islam',
    designation: 'Senior Faculty Member',
    subject: 'Mathematics & Higher Math',
    qualification: 'M.Sc. in Mathematics (BUET)',
    experience: '18 Years',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&auto=format&fit=crop',
    bio: 'Known for demystifying complex algebraic equations and coordinate geometry. Trains students for the National Math Olympiad and competitive SSC standards.'
  },
  {
    id: 'teacher-4',
    name: 'Nusrat Jahan Jony',
    designation: 'Senior Lecturer',
    subject: 'Physics & Chemistry',
    qualification: 'M.Sc. in Physics (Rajshahi University)',
    experience: '10 Years',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop',
    bio: 'Encourages inquiry-based laboratory practices. Leads the Science Club and annual school exhibitions, focusing on green energies and physics logic.'
  },
  {
    id: 'teacher-5',
    name: 'Sajid Al-Hasan',
    designation: 'Lecturer & Head of ICT Club',
    subject: 'Information & Communications Tech',
    qualification: 'B.Sc. in Computer Science & Engineering (BRAC University)',
    experience: '7 Years',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=500&auto=format&fit=crop',
    bio: 'Brings active tech industry perspectives. Trains students in coding algorithms, dynamic web technologies, computer graphics, and robotics.'
  },
  {
    id: 'teacher-6',
    name: 'Zareen Tasnim',
    designation: 'Faculty Member',
    subject: 'Biology & Life Sciences',
    qualification: 'M.Sc. in Botany (Dhaka University)',
    experience: '8 Years',
    imageUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=500&auto=format&fit=crop',
    bio: 'Deeply devoted to botanical and medical studies. Maintains the school organic garden and mentors girls in extracurricular biology explorations.'
  }
];

export const UNIFORMS: UniformItem[] = [
  {
    id: 'summer-boy',
    season: 'summer',
    gender: 'boy',
    description: 'Crisp white shirt and tailored black trousers featuring official Sakura gold-chain collar pins, black tie, and embroidered school crest.',
    components: [
      'Crisp white shirt for a clean and smart look',
      'Elegant Sakura collar show button with golden chain pin',
      'Official black tie with gold star emblem detail',
      'Embroidered school crest badge with Sakura emblem on chest pocket',
      'Tailored black trousers with matching black belt and gold buckle',
      'Polished black leather shoes with all-day comfort lightweight fabric'
    ],
    imageUrl: 'https://res.cloudinary.com/drmpjeatm/image/upload/v1784660938/WhatsApp_Image_2026-07-20_at_12.45.26_AM_1_omqvnf.jpg'
  },
  {
    id: 'summer-girl',
    season: 'summer',
    gender: 'girl',
    description: 'Crisp white shirt paired with a long pleated black skirt, black tie with gold star pin, and optional black hijab variant.',
    components: [
      'Crisp white shirt for a clean and smart look',
      'Elegant Sakura collar show button with golden detail',
      'Official black tie featuring gold star emblem pin',
      'Embroidered school crest badge with Sakura emblem on chest pocket',
      'Long pleated black skirt below the knee (with optional black hijab)',
      'Sleeve cuffs with golden button accents and black buckle shoes'
    ],
    imageUrl: 'https://res.cloudinary.com/drmpjeatm/image/upload/v1784660939/WhatsApp_Image_2026-07-20_at_12.45.27_AM_2_e5w1ai.jpg'
  },
  {
    id: 'winter-boy',
    season: 'winter',
    gender: 'boy',
    description: 'Dignified and layered winter uniform featuring a tailored black blazer coat with golden school crest badge over crisp white shirt and tie.',
    components: [
      'Tailored black blazer coat with embroidered gold Sakura crest badge',
      'Full-sleeve white cotton shirt with black tie featuring gold star emblem pin',
      'Elegant Sakura collar show button with golden chain pin',
      'Matching deep black structured trousers with belt',
      'Polished black leather shoes and formal winter attire'
    ],
    imageUrl: 'https://res.cloudinary.com/drmpjeatm/image/upload/v1784660940/WhatsApp_Image_2026-07-20_at_12.45.27_AM_eejis6.jpg'
  },
  {
    id: 'winter-girl',
    season: 'winter',
    gender: 'girl',
    description: 'Charming and warm winter attire featuring a tailored black blazer coat over crisp white shirt, pleated skirt (with optional hijab), and school crest.',
    components: [
      'Tailored black blazer coat with embroidered gold Sakura crest badge',
      'Full-sleeve crisp white shirt with black tie featuring gold star emblem pin',
      'Elegant Sakura collar show button with golden detail',
      'Long pleated black skirt below the knee (with optional black hijab)',
      'Black leather shoes with gold buckle accents'
    ],
    imageUrl: 'https://res.cloudinary.com/drmpjeatm/image/upload/v1784660940/WhatsApp_Image_2026-07-20_at_12.45.27_AM_1_smszjz.jpg'
  }
];

export const STUDENT_LIFE_ACTIVITIES: StudentLifeActivity[] = [
  {
    id: 'sports',
    title: 'Athletics & Physical Training',
    description: 'Promoting peak physical health, active sportsmanship, and teamwork through regular sports sessions and competitive events.',
    highlights: [
      'Annual Sports Meet with Inter-House Football and Cricket tournaments',
      'Specialized table-tennis and chess sessions in the indoor sports room',
      'Morning daily drill and physical fitness assembly routines',
      'Participates in national inter-school football leagues'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'science-fair',
    title: 'Annual Science Exhibition',
    description: 'Where imagination meets physics and chemistry. Students engineer solutions for real-world environmental and physical challenges.',
    highlights: [
      'Bento-style project showcases (robotics, solar water systems, eco-cities)',
      'Mentored directly by BUET graduates and university research fellows',
      'Awards across multiple categories: Innovation, Presentation, Ecology',
      'Winners participate in the National Science Fair'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'debate',
    title: 'Sakura Debating Club (SDC)',
    description: 'Sharpening logic, vocabulary, public speech, and critical questioning through British Parliamentary style debate formats.',
    highlights: [
      'Weekly practice debates on modern environmental and ethical subjects',
      'Annual Sakura Inter-School Debate Gold Championship',
      'Special focus on public confidence and vocabulary enrichment',
      'Runners up in the National Television Debate Championship 2025'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'ict-club',
    title: 'ICT & Robotics Laboratory',
    description: 'Nurturing digital leaders of tomorrow with early coding practices, algorithmic thinking, and basic electronic assemblies.',
    highlights: [
      'Introduction to web technologies, Python, and Scratch',
      'Robotics assembly workshops with Arduino and microcontrollers',
      'Annual Coding Hackathon for Classes 9 and 10',
      'Certified system operations and safety workshops'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'scouts',
    title: 'Bangladesh Scouts (Sakura Troop)',
    description: 'Fostering disciplined community service, survival skills, patriotism, and volunteer management.',
    highlights: [
      'Regular camping trips and nature survival excursions',
      'Active leadership in managing school order and safety during major events',
      'First-aid training programs certified by Bangladesh Red Crescent',
      'President’s Scout Award training routines'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1501535033-a5989c07b46d?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'cultural',
    title: 'Cultural Society & Music Program',
    description: 'Celebrating our beautiful Bangladeshi roots, poetry, classical music, and the timeless legacy of Tagore & Nazrul.',
    highlights: [
      'Annual Pohela Boishakh celebrations with colorful assemblies',
      'Drama production on National Victory Day and Language Martyrs Day',
      'Coaching in classical singing and traditional instruments',
      'Poetry recitation and creative writing contests'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=600&auto=format&fit=crop'
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: 'SSC Board Results',
    metric: '100% Pass Rate',
    subtitle: '94% GPA 5.00',
    description: 'Outstanding scores in Dhaka Board examinations across Science and Commerce streams for five consecutive years.',
    year: '2025',
    category: 'academic'
  },
  {
    id: 'ach-2',
    title: 'National Robotics Fair',
    metric: '1st Place Winner',
    subtitle: 'Smart Traffic Controller',
    description: 'Students from Class 9 designed an AI-grounded dynamic micro-controller circuit solving traffic signals.',
    year: '2025',
    category: 'science'
  },
  {
    id: 'ach-3',
    title: 'Dhaka Inter-School Debate',
    metric: 'Champions Cup',
    subtitle: 'British Parliamentary Style',
    description: 'Defeated major premium secondary institutions in Dhaka in the annual championship finals on global warmings.',
    year: '2025',
    category: 'cultural'
  },
  {
    id: 'ach-4',
    title: 'Under-16 Football Cup',
    metric: 'Gold Medalists',
    subtitle: 'Inter-School Athletics Division',
    description: 'Secured first place in the regional championship, demonstrating stellar discipline and athletic capability.',
    year: '2024',
    category: 'sports'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Modern Front Courtyard',
    category: 'campus',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop', // beautiful red-brick / modern architectural structure
    description: 'Our modern school campus featuring warm red bricks, pristine lawns, and a majestic cherry blossom tree in full bloom.'
  },
  {
    id: 'gal-2',
    title: 'Active Smart Classroom',
    category: 'classroom',
    imageUrl: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop',
    description: 'Class 8 students engaging in visual geometry modules on our touch-enabled smart interactive boards.'
  },
  {
    id: 'gal-3',
    title: 'Hands-on Chemistry Lab',
    category: 'laboratory',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop',
    description: 'Science stream students performing titration and solution pH measurements under expert guidance.'
  },
  {
    id: 'gal-4',
    title: 'Annual Sports Day Finalists',
    category: 'sports',
    imageUrl: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?q=80&w=800&auto=format&fit=crop',
    description: 'Inter-house 400m relays with massive student cheers and healthy sportsman spirit.'
  },
  {
    id: 'gal-5',
    title: 'International Mother Language Day',
    category: 'events',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop', // cultural flowers event
    description: 'Students offering floral tribute at the model Shaheed Minar during February 21st early morning assemblies.'
  },
  {
    id: 'gal-6',
    title: 'Well-Stocked Resource Library',
    category: 'campus',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop',
    description: 'Over 12,000 reference manuals, journals, research literature, and a cozy study nook for student self-enrichment.'
  },
  {
    id: 'gal-7',
    title: 'ICT Coding Workshop',
    category: 'laboratory',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
    description: 'Class 9 computer science students building algorithms and layout structures using basic Python frameworks.'
  },
  {
    id: 'gal-8',
    title: 'Debate Club Grand Finals',
    category: 'events',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop',
    description: 'The final session of our Annual Inter-school English Debate League, judged by guest university professors.'
  }
];

export const NOTICES: Notice[] = [
  {
    id: 'not-1',
    title: 'Admissions Circular for Academic Session 2027 (Classes 6-9)',
    category: 'admission',
    date: 'July 15, 2026',
    important: true,
    content: 'Online applications for Sakura High School admissions for the upcoming 2027 session are now open. Prospective guardians can submit online forms through our website portal or collect application packets directly from the school administrative wing between 8:30 AM and 2:30 PM on school days. Admission tests will cover English, Bangla, and Mathematics.'
  },
  {
    id: 'not-2',
    title: 'Mid-Term Examination Routine & Instruction Guidelines',
    category: 'exam',
    date: 'July 18, 2026',
    important: true,
    content: 'The Mid-Term Examinations for Classes 6 to 10 will commence on August 3, 2026. All student fees must be cleared by July 31st to secure admit cards. Regular revision classes are currently held daily. Please check the detailed subject-wise examination time routine attached below.'
  },
  {
    id: 'not-3',
    title: 'Holiday Announcement: Janmashtami & National Mourning Day',
    category: 'academic',
    date: 'August 10, 2026',
    important: false,
    content: 'The school administrative office and classroom activities will remain suspended on August 15 in observance of National Mourning Day and on August 24 in celebration of Janmashtami. Online makeup modules will be posted on student boards where appropriate.'
  },
  {
    id: 'not-4',
    title: 'SSC Board Final Practical Exam Schedule (Dhaka Board)',
    category: 'exam',
    date: 'July 10, 2026',
    important: true,
    content: 'Dhaka Board Practical Examinations for SSC 2026 (Science Group) in Physics, Chemistry, and Biology are scheduled from July 22 to July 29. Students must bring completed lab notebooks, standard equipment, and dress strictly in official summer uniforms.'
  },
  {
    id: 'not-5',
    title: 'Annual Science Fair Registration & Team Selection Criteria',
    category: 'event',
    date: 'June 28, 2026',
    important: false,
    content: 'Registrations are officially open for our Annual Science & Technology Exhibition 2026. Teams may consist of a maximum of three students from any class. Project blueprints must be submitted to Ms. Nusrat Jahan Jony by July 25th for safety clearance and space assignments.'
  }
];
