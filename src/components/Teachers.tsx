import { useState, useEffect } from 'react';
import { TEACHERS, Teacher } from '../schoolData';
import { X, GraduationCap, Clock, Filter, CreditCard, User, Sparkles, Phone, Mail, MapPin, Database } from 'lucide-react';
import TeacherVisitingCard from './TeacherVisitingCard';
import { db } from '../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export default function Teachers() {
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [activeTeacher, setActiveTeacher] = useState<Teacher | null>(null);
  const [activeVisitingCard, setActiveVisitingCard] = useState<Teacher | null>(null);
  const [viewMode, setViewMode] = useState<'profiles' | 'visiting-cards'>('profiles');
  const [firestoreTeachers, setFirestoreTeachers] = useState<Teacher[]>([]);
  const [isLiveConnected, setIsLiveConnected] = useState(false);

  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(collection(db, 'teachers'), (snapshot) => {
        if (!snapshot.empty) {
          const loaded: Teacher[] = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              name: data.name || '',
              designation: data.designation || '',
              subject: data.subject || '',
              qualification: data.qualification || '',
              experience: data.experience || '',
              imageUrl: data.imageUrl || '',
              bio: data.bio || ''
            };
          });
          setFirestoreTeachers(loaded);
          setIsLiveConnected(true);
        } else {
          setIsLiveConnected(true);
        }
      }, (err) => {
        console.warn('Firestore snapshot error for teachers:', err);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn('Firestore subscription setup failed:', e);
    }
  }, []);

  const subjects = ['All', 'English', 'Mathematics', 'Physics', 'ICT', 'Biology'];

  const allTeachers = firestoreTeachers.length > 0 ? firestoreTeachers : TEACHERS;

  const filteredTeachers = allTeachers.filter(teacher => {
    if (selectedSubject === 'All') return true;
    return teacher.subject.toLowerCase().includes(selectedSubject.toLowerCase());
  });

  return (
    <section id="teachers" className="py-24 bg-[#FAF8F5] relative overflow-hidden">
      {/* Subtle cherry blossom top accent watermark */}
      <div className="absolute top-12 left-6 w-72 h-72 opacity-[0.015] pointer-events-none select-none">
        <svg viewBox="0 0 400 400" className="w-full h-full fill-[#8B1E2D]">
          <path d="M400,0 C320,40 260,110 230,190 C210,130 180,90 120,60" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8B1E2D] font-bold bg-[#F4D9DE] px-3.5 py-1.5 rounded-full inline-flex items-center space-x-1.5">
            <span>Our Faculty</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#222222] mt-3">
            Distinguished Faculty & Mentors
          </h2>
          <p className="text-xs sm:text-sm text-[#7A746D] mt-3 max-w-lg mx-auto font-sans font-light leading-relaxed">
            A team of deeply dedicated, highly qualified, and empathetic educators who combine academic rigor with traditional moral character.
          </p>
        </div>

        {/* View Switcher: Profiles vs Digital Visiting Cards */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-white p-1 rounded-full border border-[#222222]/10 shadow-xs flex items-center space-x-1">
            <button
              onClick={() => setViewMode('profiles')}
              className={`px-5 py-2 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer ${
                viewMode === 'profiles'
                  ? 'bg-[#8B1E2D] text-white shadow-sm'
                  : 'text-[#7A746D] hover:text-[#222222] hover:bg-gray-50'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Faculty Profiles</span>
            </button>
            <button
              onClick={() => setViewMode('visiting-cards')}
              className={`px-5 py-2 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer ${
                viewMode === 'visiting-cards'
                  ? 'bg-[#8B1E2D] text-white shadow-sm'
                  : 'text-[#7A746D] hover:text-[#222222] hover:bg-gray-50'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Digital Visiting Cards</span>
            </button>
          </div>
        </div>

        {/* Minimal Subjects Filter Bar */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
          <div className="flex items-center space-x-2 text-[10px] font-mono text-[#7A746D] mr-2 uppercase tracking-widest font-bold">
            <Filter className="w-3.5 h-3.5 text-[#8B1E2D]" />
            <span>Filter Subject:</span>
          </div>
          {subjects.map((subj) => (
            <button
              key={subj}
              onClick={() => setSelectedSubject(subj)}
              className={`px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all border cursor-pointer ${
                selectedSubject === subj
                  ? 'bg-[#8B1E2D] text-white border-[#8B1E2D]'
                  : 'bg-white text-[#7A746D] border-[#222222]/10 hover:border-[#8B1E2D] hover:text-[#8B1E2D]'
              }`}
            >
              {subj}
            </button>
          ))}
        </div>

        {/* MODE 1: STANDARD FACULTY PROFILES GRID */}
        {viewMode === 'profiles' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {filteredTeachers.map((teacher) => (
              <div key={teacher.id} className="card shadow-md hover:shadow-xl">
                {/* Card Image Banner with University Graphic */}
                <div className="card__img">
                  <svg viewBox="0 0 300 192" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="300" height="192" fill="#163A2D" />
                    <path d="M0 120 C 80 180, 200 60, 300 140 L 300 0 L 0 0 Z" fill="#0F281E" opacity="0.6" />
                    <path d="M0 160 C 100 110, 180 180, 300 120 L 300 192 L 0 192 Z" fill="#21513F" opacity="0.3" />
                    <circle cx="260" cy="35" r="45" fill="#FAD02C" opacity="0.12" />
                    <circle cx="40" cy="40" r="25" fill="#FAD02C" opacity="0.08" />
                  </svg>
                  <span className="absolute top-3 right-3 text-[10px] font-mono font-bold bg-[#FAF8F5] text-[#163A2D] px-2 py-0.5 rounded shadow-xs">
                    {teacher.subject} Division
                  </span>
                </div>

                {/* Card Avatar with circular photo */}
                <div className="card__avatar">
                  <img
                    src={teacher.imageUrl}
                    alt={teacher.name}
                    className="w-[100px] h-[100px] rounded-full object-cover object-top"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop';
                    }}
                  />
                </div>

                {/* Card Title & Subtitle */}
                <div className="card__title" title={teacher.name}>
                  {teacher.name}
                </div>

                <div className="card__subtitle" title={teacher.designation}>
                  {teacher.designation}
                </div>

                <div className="card__dept" title={teacher.subject}>
                  {teacher.subject} &bull; {teacher.qualification}
                </div>

                {/* Card Action Buttons */}
                <div className="card__wrapper">
                  <button
                    id={`view-bio-btn-${teacher.id}`}
                    type="button"
                    onClick={() => setActiveTeacher(teacher)}
                    className="card__btn card__btn-solid"
                  >
                    PROFILE
                  </button>
                  <button
                    id={`view-vcard-btn-${teacher.id}`}
                    type="button"
                    onClick={() => setActiveVisitingCard(teacher)}
                    className="card__btn"
                  >
                    V-CARD
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MODE 2: DIGITAL VISITING CARDS GALLERY */}
        {viewMode === 'visiting-cards' && (
          <div className="space-y-8">
            <div className="bg-white/80 p-4 rounded-xl border border-[#222222]/10 max-w-2xl mx-auto text-center space-y-1">
              <div className="flex items-center justify-center space-x-2 text-[#8B1E2D]">
                <Sparkles className="w-4 h-4 text-[#C7A35A]" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Interactive Faculty V-Cards</span>
              </div>
              <p className="text-xs text-[#7A746D]">
                Hover over any card to trigger the dynamic Sakura golden border & logo expansion animation. Click "Flip Visiting Card" or click on the card to see back contact details!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {filteredTeachers.map((teacher) => (
                <div key={`vcard-grid-${teacher.id}`} className="flex flex-col items-center bg-white p-6 rounded-2xl border border-[#222222]/5 shadow-xs hover:shadow-md transition-all">
                  <div className="mb-3 text-center">
                    <h4 className="font-serif text-sm font-bold text-[#222222]">{teacher.name}</h4>
                    <p className="text-[10px] font-mono text-[#C7A35A] uppercase">{teacher.designation}</p>
                  </div>
                  <TeacherVisitingCard teacher={teacher} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* If filtered list is empty */}
        {filteredTeachers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-[#222222]/15">
            <p className="text-xs font-mono text-[#7A746D]">No faculty members found for this filter selection.</p>
          </div>
        )}

        {/* VISITING CARD MODAL POPUP */}
        {activeVisitingCard && (
          <div
            id="visiting-card-modal-backdrop"
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-[#222222]/80 backdrop-blur-xs animate-fade-in"
            onClick={() => setActiveVisitingCard(null)}
          >
            <div
              className="relative bg-[#FAF8F5] w-full max-w-md rounded-2xl shadow-2xl border border-[#C7A35A]/40 overflow-hidden p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Premium Burgundy Top Ribbon */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#8B1E2D]" />

              {/* Close Button */}
              <button
                onClick={() => setActiveVisitingCard(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-[#7A746D] hover:text-[#222222] hover:bg-gray-100 transition-colors z-20 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-2 mb-6 pt-2">
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#8B1E2D] font-bold bg-[#F4D9DE] px-3 py-1 rounded-full inline-block">
                  Faculty Visiting Card
                </span>
                <h3 className="font-serif text-xl font-bold text-[#222222]">
                  {activeVisitingCard.name}
                </h3>
                <p className="text-xs text-[#7A746D] font-sans">
                  {activeVisitingCard.designation} • {activeVisitingCard.subject}
                </p>
              </div>

              {/* Interactive Uiverse Visiting Card */}
              <div className="flex justify-center">
                <TeacherVisitingCard teacher={activeVisitingCard} isModalView={true} />
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                <button
                  onClick={() => setActiveVisitingCard(null)}
                  className="px-6 py-2 rounded bg-[#8B1E2D] hover:bg-[#6D1521] text-white text-[10px] font-mono font-bold uppercase tracking-widest cursor-pointer shadow-sm transition-all"
                >
                  Close Card
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BIO DETAIL MODAL POPUP */}
        {activeTeacher && (
          <div
            id="teacher-bio-modal-backdrop"
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#222222]/80 backdrop-blur-xs animate-fade-in"
          >
            <div className="relative bg-[#FAF8F5] w-full max-w-xl rounded-xl shadow-2xl border border-[#8B1E2D]/20 overflow-hidden">
              {/* Premium Burgundy Top Ribbon */}
              <div className="h-1.5 bg-[#8B1E2D]" />
              
              {/* Close Button */}
              <button
                onClick={() => setActiveTeacher(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-[#7A746D] hover:text-[#222222] hover:bg-gray-100 transition-colors z-20 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Meta details header */}
                <div className="flex items-start space-x-4">
                  <img
                    src={activeTeacher.imageUrl}
                    alt={activeTeacher.name}
                    className="w-20 h-20 rounded-xl object-cover object-center border border-[#8B1E2D]/10 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-1.5">
                    <span className="text-[8px] uppercase font-mono tracking-widest bg-[#F4D9DE] text-[#8B1E2D] px-2.5 py-1 rounded font-bold border border-[#8B1E2D]/10 inline-block">
                      {activeTeacher.subject} Division
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#222222] leading-tight">
                      {activeTeacher.name}
                    </h3>
                    <p className="text-[10px] uppercase font-mono font-bold text-[#C7A35A] tracking-wider">
                      {activeTeacher.designation}
                    </p>
                  </div>
                </div>

                {/* Sub-details card */}
                <div className="bg-white border border-[#222222]/5 rounded-lg p-4 space-y-3 text-xs text-[#7A746D] font-sans font-light">
                  <div className="flex items-start space-x-2">
                    <GraduationCap className="w-4 h-4 text-[#8B1E2D] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#222222] font-semibold">Educational Credentials: </strong>
                      {activeTeacher.qualification}
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Clock className="w-4 h-4 text-[#8B1E2D] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#222222] font-semibold">Teaching Experience: </strong>
                      {activeTeacher.experience} of dedicated secondary coaching
                    </span>
                  </div>
                </div>

                {/* Extended Bio / Vision */}
                <div className="space-y-2">
                  <h4 className="text-[9px] font-mono uppercase tracking-widest text-[#8B1E2D] font-bold">
                    Academic Vision & Biography
                  </h4>
                  <p className="text-[#222222] text-sm leading-relaxed font-sans font-light italic bg-white p-4 rounded-lg border border-[#222222]/5">
                    "{activeTeacher.bio}"
                  </p>
                </div>

                {/* Modal Footer */}
                <div className="pt-4 border-t border-gray-150 flex items-center justify-between text-[8px] font-mono text-[#7A746D]">
                  <span>STAFF ID: SHS-FAC-{activeTeacher.id.split('-')[1]}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        const t = activeTeacher;
                        setActiveTeacher(null);
                        setActiveVisitingCard(t);
                      }}
                      className="px-4 py-2 rounded bg-[#243137] hover:bg-[#1A2328] text-[#C7A35A] font-mono font-bold uppercase tracking-widest text-[9px] shadow-sm transition-all border border-[#C7A35A]/30 flex items-center space-x-1 cursor-pointer"
                    >
                      <CreditCard className="w-3 h-3 text-[#C7A35A]" />
                      <span>Visiting Card</span>
                    </button>
                    <button
                      onClick={() => setActiveTeacher(null)}
                      className="px-5 py-2 rounded bg-[#8B1E2D] hover:bg-[#6D1521] text-white font-sans font-bold uppercase tracking-widest text-[10px] shadow-sm transition-all cursor-pointer"
                    >
                      Close Profile
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
