import { useState, useEffect } from 'react';
import { STUDENT_LIFE_ACTIVITIES, StudentLifeActivity } from '../schoolData';
import { CheckCircle, Trophy, Sparkles, ArrowRight, Sun, Gift, Database } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export default function StudentLife() {
  const [selectedActivityId, setSelectedActivityId] = useState('sports');
  const [firestoreActivities, setFirestoreActivities] = useState<StudentLifeActivity[]>([]);

  useEffect(() => {
    try {
      const unsub = onSnapshot(collection(db, 'studentLife'), (snapshot) => {
        if (!snapshot.empty) {
          const loaded: StudentLifeActivity[] = snapshot.docs.map(d => {
            const data = d.data();
            return {
              id: d.id,
              title: data.title || '',
              description: data.description || '',
              highlights: Array.isArray(data.highlights) ? data.highlights : [],
              imageUrl: data.imageUrl || ''
            };
          });
          setFirestoreActivities(loaded);
        }
      }, (err) => {
        handleFirestoreError(err, OperationType.GET, 'studentLife');
      });
      return () => unsub();
    } catch (e) {
      console.warn('StudentLife Firestore subscription error:', e);
    }
  }, []);

  const allActivities = firestoreActivities.length > 0 ? firestoreActivities : STUDENT_LIFE_ACTIVITIES;
  const selectedActivity = allActivities.find(act => act.id === selectedActivityId) || allActivities[0] || STUDENT_LIFE_ACTIVITIES[0];

  const specialEvents = [
    {
      title: 'Annual Excursion & Picnic',
      description: 'An annual class journey to glorious historic sites like Sonargaon or Lalbagh Fort to blend research with active outdoor fun.',
      icon: Sun,
      season: 'Winter Season'
    },
    {
      title: 'Grand Prize Giving Ceremony',
      description: 'Awarding top academic achievers, debate champions, and physical legends with prestigious customized gold emblems.',
      icon: Gift,
      season: 'End of Session'
    }
  ];

  return (
    <section id="student-life" className="py-24 bg-[#FAF8F5] relative overflow-hidden border-t border-[#222222]/5">
      {/* Subtle background decorative ornament */}
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-[#C7A35A]/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Title Panel */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8B1E2D] font-bold bg-[#F4D9DE] px-3.5 py-1.5 rounded-full inline-block">
            Beyond Classrooms
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#222222] mt-3">
            Vibrant Student Life & Clubs
          </h2>
          <p className="text-xs sm:text-sm text-[#7A746D] mt-3 max-w-lg mx-auto font-sans font-light leading-relaxed">
            Nurturing athletic stamina, logical persuasion, computer science logic, and citizenship values through active student communities.
          </p>
        </div>

        {/* Modular Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Column 1: Activities Selection list (Span 4) */}
          <div className="lg:col-span-4 space-y-2.5 flex flex-col justify-start">
            <div className="text-[10px] font-mono uppercase text-[#7A746D] font-bold tracking-widest mb-2 px-1">
              Select Co-Curricular Club
            </div>
            {allActivities.map((act) => (
              <button
                key={act.id}
                onClick={() => setSelectedActivityId(act.id)}
                className={`w-full text-left px-5 py-4 rounded-xl border transition-all text-xs font-bold uppercase tracking-wider flex items-center justify-between group ${
                  selectedActivityId === act.id
                    ? 'bg-[#8B1E2D] text-white border-[#8B1E2D] shadow-md scale-[1.01]'
                    : 'bg-white text-[#7A746D] border-[#222222]/5 hover:border-[#8B1E2D]/20 hover:text-[#8B1E2D]'
                }`}
              >
                <span>{act.title}</span>
                <ArrowRight className={`w-4 h-4 transition-transform ${
                  selectedActivityId === act.id ? 'text-[#F4D9DE] translate-x-1' : 'text-gray-300 group-hover:translate-x-1'
                }`} />
              </button>
            ))}
          </div>

          {/* Column 2: Selected Activity Detail (Span 5) */}
          <div className="lg:col-span-5 bg-white border border-[#222222]/5 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              {/* Image box */}
              <div className="relative h-[220px] rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                <img
                  src={selectedActivity.imageUrl}
                  alt={selectedActivity.title}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#222222]/60 to-transparent pointer-events-none" />
                <span className="absolute bottom-4 left-4 text-[9px] font-mono text-white uppercase tracking-widest bg-[#8B1E2D] px-2.5 py-1 rounded font-bold">
                  Active Society
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#222222]">
                  {selectedActivity.title}
                </h3>
                <p className="text-[#7A746D] text-xs sm:text-sm leading-relaxed font-sans font-light">
                  {selectedActivity.description}
                </p>
              </div>

              {/* Highlighting list */}
              <div className="space-y-3">
                <h4 className="text-[9px] uppercase font-mono tracking-widest text-[#8B1E2D] font-bold">
                  Highlights & Benefits
                </h4>
                <div className="space-y-2">
                  {selectedActivity.highlights.map((hl, index) => (
                    <div key={index} className="flex items-start space-x-2.5">
                      <div className="mt-1 rounded-full bg-[#F4D9DE] p-0.5 text-[#8B1E2D] shrink-0">
                        <CheckCircle className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs sm:text-sm text-[#7A746D] leading-normal font-sans font-light">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-[8px] font-mono text-[#7A746D]">
              <span>SOCIETY ID: SHS-CLUB-{selectedActivity.id.toUpperCase()}</span>
              <span className="text-[#8B1E2D] font-bold">Attendance Required</span>
            </div>
          </div>

          {/* Column 3: Special Events / Picnic & Ceremony (Span 3) */}
          <div className="lg:col-span-3 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-[10px] font-mono uppercase text-[#7A746D] font-bold tracking-widest">
                Special Annual Events
              </div>
              
              {specialEvents.map((evt, idx) => {
                const IconComponent = evt.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white border border-[#222222]/5 rounded-xl p-5 shadow-xs space-y-3.5 hover:border-[#8B1E2D]/20 transition-all duration-300"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#F4D9DE]/40 flex items-center justify-center text-[#8B1E2D]">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#222222]">{evt.title}</h4>
                      <p className="text-[#7A746D] text-[11px] leading-relaxed font-sans font-light mt-1.5">
                        {evt.description}
                      </p>
                    </div>
                    <div className="pt-2.5 border-t border-gray-50 flex items-center justify-between text-[9px] font-mono text-[#8B1E2D] font-bold uppercase tracking-wider">
                      <span>Occasion</span>
                      <span className="text-[#C7A35A]">{evt.season}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* General co-curricular policy callout */}
            <div className="p-4 rounded-xl border border-dashed border-[#8B1E2D]/20 bg-white space-y-2">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-[#8B1E2D]">
                <Trophy className="w-4 h-4 text-[#C7A35A]" />
                <span>Extracurricular Policy</span>
              </div>
              <p className="text-[11px] text-[#7A746D] leading-relaxed font-sans font-light">
                Every secondary student must actively participate in at least one school-run club to foster balanced social and cognitive leadership skills.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
