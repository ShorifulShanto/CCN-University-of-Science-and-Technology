import { db, auth } from './lib/firebase';
import { signInAnonymously } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import {
  NOTICES,
  TEACHERS,
  ACADEMIC_CLASSES,
  ACHIEVEMENTS,
  STUDENT_LIFE_ACTIVITIES,
  GALLERY_ITEMS,
  UNIFORMS
} from './schoolData';

async function seedDatabase() {
  console.log('🚀 Seeding existing Firestore collections for Sakura High School...');

  try {
    try {
      console.log('🔑 Authenticating anonymously...');
      await signInAnonymously(auth);
      console.log('   [✓] Authenticated');
    } catch (authErr) {
      console.warn('   [!] Anonymous auth warning:', authErr);
    }

    // 1. notices
    console.log(`\n📌 Migrating ${NOTICES.length} items into 'notices'...`);
    for (const item of NOTICES) {
      await setDoc(doc(db, 'notices', item.id), {
        title: item.title,
        category: item.category,
        date: item.date,
        content: item.content,
        isImportant: !!item.important,
        pdfUrl: item.pdfUrl || null,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      console.log(`   [✓] notices: ${item.title.substring(0, 40)}...`);
    }

    // 2. teachers
    console.log(`\n👨‍🏫 Migrating ${TEACHERS.length} items into 'teachers'...`);
    for (const item of TEACHERS) {
      await setDoc(doc(db, 'teachers', item.id), {
        name: item.name,
        designation: item.designation,
        subject: item.subject,
        qualification: item.qualification,
        experience: item.experience,
        imageUrl: item.imageUrl,
        bio: item.bio,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      console.log(`   [✓] teachers: ${item.name}`);
    }

    // 3. academicClasses
    console.log(`\n📚 Migrating ${ACADEMIC_CLASSES.length} items into 'academicClasses'...`);
    for (const item of ACADEMIC_CLASSES) {
      await setDoc(doc(db, 'academicClasses', item.id), {
        name: item.name,
        description: item.description,
        folderUrl: item.folderUrl || null,
        goals: item.goals,
        subjects: item.subjects,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      console.log(`   [✓] academicClasses: ${item.name}`);
    }

    // 4. achievements
    console.log(`\n🏆 Migrating ${ACHIEVEMENTS.length} items into 'achievements'...`);
    for (const item of ACHIEVEMENTS) {
      await setDoc(doc(db, 'achievements', item.id), {
        title: item.title,
        metric: item.metric,
        subtitle: item.subtitle,
        description: item.description,
        year: item.year,
        category: item.category,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      console.log(`   [✓] achievements: ${item.title}`);
    }

    // 5. studentLife
    console.log(`\n🎨 Migrating ${STUDENT_LIFE_ACTIVITIES.length} items into 'studentLife'...`);
    for (const item of STUDENT_LIFE_ACTIVITIES) {
      await setDoc(doc(db, 'studentLife', item.id), {
        title: item.title,
        description: item.description,
        highlights: item.highlights,
        imageUrl: item.imageUrl,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      console.log(`   [✓] studentLife: ${item.title}`);
    }

    // 6. Gallery
    console.log(`\n🖼️ Migrating ${GALLERY_ITEMS.length} items into 'Gallery'...`);
    for (const item of GALLERY_ITEMS) {
      await setDoc(doc(db, 'Gallery', item.id), {
        title: item.title,
        category: item.category,
        imageUrl: item.imageUrl,
        description: item.description,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      console.log(`   [✓] Gallery: ${item.title}`);
    }

    // 7. uniforms
    console.log(`\n👔 Migrating ${UNIFORMS.length} items into 'uniforms'...`);
    for (const item of UNIFORMS) {
      await setDoc(doc(db, 'uniforms', item.id), {
        season: item.season,
        gender: item.gender,
        description: item.description,
        components: item.components,
        imageUrl: item.imageUrl,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      console.log(`   [✓] uniforms: ${item.season} ${item.gender}`);
    }

    // 8. Events
    console.log(`\n📅 Seeding initial data into 'Events'...`);
    const sampleEvents = [
      {
        id: 'evt-001',
        title: 'Annual Sports Day 2026',
        date: '2026-11-15',
        location: 'Sakura High School Athletics Ground',
        description: 'Track and field competitions, march past, and inter-house championship trophies.',
        category: 'Sports',
        updatedAt: new Date().toISOString()
      },
      {
        id: 'evt-002',
        title: 'National Science & Robotics Fair',
        date: '2026-09-20',
        location: 'Main Auditorium & STEM Labs',
        description: 'Student project displays, automated robotics showcase, and quiz competition.',
        category: 'Academic',
        updatedAt: new Date().toISOString()
      },
      {
        id: 'evt-003',
        title: 'Cultural Festival & Art Exhibition',
        date: '2026-10-08',
        location: 'Open Air Amphitheatre',
        description: 'Drama performances, musical recitals, and traditional art gallery exhibition.',
        category: 'Cultural',
        updatedAt: new Date().toISOString()
      }
    ];
    for (const item of sampleEvents) {
      await setDoc(doc(db, 'Events', item.id), item, { merge: true });
      console.log(`   [✓] Events: ${item.title}`);
    }

    // 9. Contacts
    console.log(`\n📬 Seeding initial sample log into 'Contacts'...`);
    await setDoc(doc(db, 'Contacts', 'sample-contact-1'), {
      name: 'Sharmin Akter',
      email: 'sharmin.parent@example.com',
      phone: '+880 1711-234567',
      targetClass: 'Class 8',
      message: 'Inquiring about syllabus and transportation routes for upcoming term.',
      createdAt: new Date().toISOString()
    }, { merge: true });
    console.log(`   [✓] Contacts: sample-contact-1`);

    // 10. Admissions
    console.log(`\n📝 Seeding initial sample record into 'Admissions'...`);
    await setDoc(doc(db, 'Admissions', 'SHS-20270001'), {
      applicationId: 'SHS-20270001',
      studentName: 'Tawhid Islam',
      applyingClass: 'Class 9',
      gender: 'Male',
      dob: '2012-04-12',
      bloodGroup: 'B+',
      lastSchool: 'Dhaka Ideal School',
      sscStream: 'Science',
      fatherName: 'Md. Rafiqul Islam',
      motherName: 'Nasrin Jahan',
      phone: '+880 1812-987654',
      email: 'tawhid.parent@example.com',
      district: 'Dhaka',
      address: 'House 24, Road 5, Mirpur, Dhaka',
      status: 'Pending',
      createdAt: new Date().toISOString()
    }, { merge: true });
    console.log(`   [✓] Admissions: SHS-20270001`);

    // 11. Students
    console.log(`\n🎒 Seeding initial records into 'Students'...`);
    const sampleStudents = [
      { id: 'std-101', studentName: 'Abrar Fahim', rollNo: '01', class: 'Class 10', stream: 'Science', year: '2026' },
      { id: 'std-102', studentName: 'Nusrat Jahan', rollNo: '02', class: 'Class 10', stream: 'Science', year: '2026' },
      { id: 'std-103', studentName: 'Rifat Hossain', rollNo: '01', class: 'Class 9', stream: 'General', year: '2026' }
    ];
    for (const std of sampleStudents) {
      await setDoc(doc(db, 'Students', std.id), std, { merge: true });
      console.log(`   [✓] Students: ${std.studentName}`);
    }

    // 12. Users
    console.log(`\n👤 Seeding initial roles into 'Users'...`);
    const sampleUsers = [
      { id: 'usr-admin', email: 'principal@sakurahighschool.edu.bd', role: 'Admin', name: 'Dr. Jahanara Rahman' },
      { id: 'usr-teacher-1', email: 'mahbub.alam@sakurahighschool.edu.bd', role: 'Teacher', name: 'Md. Mahbub Alam' }
    ];
    for (const usr of sampleUsers) {
      await setDoc(doc(db, 'Users', usr.id), usr, { merge: true });
      console.log(`   [✓] Users: ${usr.email}`);
    }

    console.log('\n✅ SUCCESSFULLY SEEDED ALL 12 LIVE FIRESTORE COLLECTIONS!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding Firestore collections:', error);
    process.exit(1);
  }
}

seedDatabase();
