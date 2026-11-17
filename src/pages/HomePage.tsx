import React, { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import Hero from '../components/Hero';
import WhyChoose from '../components/WhyChoose';
import NoticeBoard from '../components/NoticeBoard';
import ResearchSection from '../components/ResearchSection';
import UniversityIDCards from '../components/UniversityIDCards';
import ScrollReveal from '../components/ScrollReveal';
import { REAL_FACULTY_MEMBERS, REAL_ACTIVITY_ALBUMS } from '../data/ccnustRealData';
import { FACULTIES } from '../universityData';
import { ServiceModalTab } from '../components/CCNUSTServicesModal';

interface HomePageProps {
  onOpenApplyModal: () => void;
  onOpenServiceModal: (tab?: ServiceModalTab) => void;
  onSelectProgram?: (programId: string) => void;
  isAdmin?: boolean;
  onOpenAdminPanel?: () => void;
}

export default function HomePage({
  onOpenApplyModal,
  onOpenServiceModal,
  onSelectProgram: _onSelectProgram,
  isAdmin,
  onOpenAdminPanel,
}: HomePageProps) {
  // Stabilize static featured selections
  const featuredTeachers = useMemo(() => REAL_FACULTY_MEMBERS.slice(0, 4), []);
  const featuredAlbums = useMemo(() => REAL_ACTIVITY_ALBUMS.slice(0, 2), []);

  const handleExplorePrograms = useCallback(() => {
    const el = document.getElementById('featured-programs-preview');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#F2F7F4] relative overflow-x-clip">
      {/* Subtle Breathing Emerald & Gold Ambient Aura Behind Entire Home Canvas */}
      <div className="ccn-aura-bg" aria-hidden="true">
        <div className="ccn-aura-orb-1 ccn-animate-drift" />
        <div className="ccn-aura-orb-2 ccn-animate-drift-reverse" />
        <div className="ccn-aura-orb-3 ccn-animate-drift" />
      </div>

      <div className="relative z-10">
        {/* 1. Hero Section (Fast, Responsive, Dynamic) */}
        <Hero
          onOpenApplyModal={onOpenApplyModal}
          onExplorePrograms={handleExplorePrograms}
        />

        {/* 2. Institutional Pillars (Why Choose CCNUST) */}
        <WhyChoose
          onOpenApplyModal={onOpenApplyModal}
          onExplorePrograms={handleExplorePrograms}
        />

        {/* 3. Featured Degree Programs Preview */}
        <section
          id="featured-programs-preview"
          className="py-20 bg-gradient-to-b from-[#E8F1EB] via-[#EFF6F2] to-[#F2F7F4] border-b border-[#CFE2D7] relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                <div>
                  <div className="text-xs font-mono font-bold text-[#4E7D68] uppercase tracking-widest">
                    02 · Academic Offerings
                  </div>
                  <h2
                    className="text-3xl sm:text-4xl font-sans font-black text-[#102B21] tracking-tight mt-2"
                    style={{ textWrap: 'balance' }}
                  >
                    Undergraduate &amp;{' '}
                    <span className="ccn-text-gradient-dark">Graduate Faculties</span>
                  </h2>
                  <p className="text-sm text-[#355A4A] mt-2 max-w-xl leading-relaxed">
                    4 specialized faculties delivering BAETE and UGC outcome-based degrees in engineering, law, arts, and business.
                  </p>
                </div>

                <Link
                  to="/academics"
                  className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#163A2D] hover:underline uppercase tracking-wider whitespace-nowrap shrink-0"
                >
                  <span>Explore All Degree Programs</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FACULTIES.map((fac, idx) => (
                <ScrollReveal key={fac.id} delayMs={idx * 65} className="h-full">
                  <div className="ccn-glow-card h-full bg-[#FAFDFB]/90 backdrop-blur-sm border border-[#C8DFD2] rounded-2xl p-6 flex flex-col justify-between group">
                    <div>
                      <div className="w-11 h-11 rounded-xl bg-[#163A2D] group-hover:bg-[#FAD02C] text-[#FAD02C] group-hover:text-[#163A2D] flex items-center justify-center font-bold mb-4 transition-colors shadow-xs">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <h3 className="font-sans font-black text-[#102B21] text-base mb-2 leading-snug">
                        {fac.name}
                      </h3>
                      <p className="text-xs text-[#355A4A] leading-relaxed line-clamp-3 mb-4">
                        {fac.description}
                      </p>
                    </div>

                    <div className="pt-3.5 border-t border-[#DCECE2] flex items-center justify-between">
                      <span className="text-[11px] font-mono text-[#4E7D68] font-bold tabular-nums">
                        {fac.departments.length} Programs
                      </span>
                      <Link
                        to="/academics"
                        className="text-xs font-mono font-bold text-[#163A2D] hover:underline whitespace-nowrap shrink-0"
                      >
                        View Curricula &rarr;
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Faculty Spotlight (Real Teachers from ccnust.ac.bd) */}
        <section className="py-20 bg-gradient-to-b from-[#F2F7F4] via-[#ECF4EF] to-[#E8F1EB] border-b border-[#CFE2D7] relative overflow-hidden">
          <div className="ccn-bg-grid-masked absolute inset-0 pointer-events-none opacity-65" aria-hidden="true" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                <div>
                  <div className="text-xs font-mono font-bold text-[#4E7D68] uppercase tracking-widest">
                    03 · Faculty Roster Spotlight
                  </div>
                  <h2
                    className="text-3xl sm:text-4xl font-sans font-black text-[#102B21] tracking-tight mt-2"
                    style={{ textWrap: 'balance' }}
                  >
                    Distinguished{' '}
                    <span className="ccn-text-gradient-dark">Academic Mentors</span>
                  </h2>
                  <p className="text-sm text-[#355A4A] mt-2 max-w-xl leading-relaxed">
                    Official faculty profiles and lecturers directly sourced from the CCNUST academic departments.
                  </p>
                </div>

                <Link
                  to="/faculty"
                  className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#163A2D] hover:underline uppercase tracking-wider whitespace-nowrap shrink-0"
                >
                  <span>View Full Faculty Directory ({REAL_FACULTY_MEMBERS.length}+ Teachers)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
              {featuredTeachers.map((teacher, idx) => (
                <ScrollReveal key={teacher.id} delayMs={idx * 65}>
                  <div className="card ccn-glow-card shadow-md">
                    {/* Card Image Banner with University Decorative Graphic */}
                    <div className="card__img">
                      <svg viewBox="0 0 300 192" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="300" height="192" fill="#163A2D" />
                        <path d="M0 120 C 80 180, 200 60, 300 140 L 300 0 L 0 0 Z" fill="#0F281E" opacity="0.6" />
                        <path d="M0 160 C 100 110, 180 180, 300 120 L 300 192 L 0 192 Z" fill="#21513F" opacity="0.3" />
                        <circle cx="260" cy="35" r="45" fill="#FAD02C" opacity="0.12" />
                        <circle cx="40" cy="40" r="25" fill="#FAD02C" opacity="0.08" />
                      </svg>
                      <span className="absolute top-3 right-3 text-[10px] font-mono font-bold bg-[#FAF8F5] text-[#163A2D] px-2 py-0.5 rounded shadow-xs">
                        {teacher.deptCode}
                      </span>
                    </div>

                    {/* Card Avatar with circular photo */}
                    <div className="card__avatar">
                      <img
                        src={teacher.imageUrl}
                        alt={teacher.name}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/ccnustEmblem.png';
                        }}
                        className="w-[100px] h-[100px] rounded-full object-cover object-top"
                      />
                    </div>

                    {/* Card Title & Subtitle */}
                    <div className="card__title" title={teacher.name}>
                      {teacher.name}
                    </div>

                    <div className="card__subtitle" title={teacher.designation}>
                      {teacher.designation}
                    </div>

                    <div className="card__dept" title={teacher.department}>
                      {teacher.department}
                    </div>

                    {/* Card Action Buttons */}
                    <div className="card__wrapper">
                      <Link
                        to="/faculty"
                        className="card__btn card__btn-solid"
                      >
                        DOSSIER
                      </Link>
                      <a
                        href={`mailto:${teacher.email}`}
                        className="card__btn"
                        title={teacher.email}
                      >
                        EMAIL
                      </a>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Official University ID Cards (Teachers & Staff + 4-Semester Students) */}
        <UniversityIDCards />

        {/* 6. Research & Publications (Ongoing Projects & University Journals Carousel) */}
        <ResearchSection />

        {/* 7. Campus Activities & Gallery Spotlight (Real Photos from ccnust.ac.bd) */}
        <section className="py-20 bg-gradient-to-b from-[#E8F1EB] via-[#EFF6F2] to-[#F2F7F4] border-b border-[#CFE2D7] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                <div>
                  <div className="text-xs font-mono font-bold text-[#4E7D68] uppercase tracking-widest">
                    06 · Campus Archives &amp; Activities
                  </div>
                  <h2
                    className="text-3xl sm:text-4xl font-sans font-black text-[#102B21] tracking-tight mt-2"
                    style={{ textWrap: 'balance' }}
                  >
                    Life at <span className="ccn-text-gradient-dark">CCNUST</span>
                  </h2>
                  <p className="text-sm text-[#355A4A] mt-2 max-w-xl leading-relaxed">
                    Recent orientations, cultural foundation celebrations, seminars, and international academic exchange records.
                  </p>
                </div>

                <Link
                  to="/gallery-activities"
                  className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#163A2D] hover:underline uppercase tracking-wider whitespace-nowrap shrink-0"
                >
                  <span>Explore All Campus Albums</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredAlbums.map((alb, idx) => (
                <ScrollReveal key={alb.id} delayMs={idx * 90}>
                  <div className="ccn-glow-card bg-[#FAFDFB]/90 backdrop-blur-sm border border-[#C8DFD2] rounded-2xl p-6 transition-all h-full">
                    <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#4E7D68]">
                      <span className="font-bold text-[#163A2D] uppercase tracking-wider">
                        {alb.category}
                      </span>
                      <span>{alb.date}</span>
                    </div>
                    <h3 className="font-sans font-black text-[#102B21] text-lg mb-2">
                      {alb.title}
                    </h3>
                    <p className="text-xs text-[#355A4A] mb-4 line-clamp-2 leading-relaxed">
                      {alb.description}
                    </p>

                    <div className="grid grid-cols-3 gap-2.5">
                      {alb.images.slice(0, 3).map((img, i) => (
                        <div key={i} className="h-28 rounded-xl overflow-hidden border border-[#DCECE2] bg-[#EAF2ED]">
                          <img
                            src={img}
                            alt={`${alb.title} preview ${i + 1}`}
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Official Notice Board Ticker & Announcements */}
        <NoticeBoard
          isAdmin={isAdmin}
          onOpenAdminPanel={onOpenAdminPanel}
          onOpenServiceModal={onOpenServiceModal}
        />

        {/* 9. Bottom Admission Call To Action */}
        <section className="py-20 bg-gradient-to-br from-[#163A2D] via-[#112F24] to-[#0A1F17] text-white relative overflow-hidden">
          <div
            aria-hidden="true"
            className="ccn-animate-drift pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full opacity-40"
            style={{
              background: 'radial-gradient(circle, rgba(250, 208, 44, 0.25) 0%, transparent 70%)',
              filter: 'blur(70px)',
            }}
          />
          <div
            aria-hidden="true"
            className="ccn-animate-drift-reverse pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full opacity-35"
            style={{
              background: 'radial-gradient(circle, rgba(78, 125, 104, 0.45) 0%, transparent 72%)',
              filter: 'blur(75px)',
            }}
          />
          <div className="ccn-bg-grid-dark-masked absolute inset-0 pointer-events-none opacity-45" aria-hidden="true" />

          <ScrollReveal>
            <div className="max-w-5xl mx-auto px-4 text-center space-y-6 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#0F281E]/90 border border-[#FAD02C]/70 text-[#FAD02C] flex items-center justify-center mx-auto shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2
                className="text-3xl sm:text-4xl lg:text-[42px] font-sans font-black tracking-tight leading-[1.12]"
                style={{ textWrap: 'balance' }}
              >
                Ready to Build Your{' '}
                <span className="ccn-text-gradient-light">
                  Engineering &amp; Professional Career?
                </span>
              </h2>
              <p className="text-sm sm:text-base text-[#D0E4DA] max-w-2xl mx-auto leading-relaxed">
                Apply online for Fall 2026. Eligible candidates receive up to 100% tuition fee waivers based on academic results.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={onOpenApplyModal}
                  className="px-8 py-3.5 bg-[#FAD02C] hover:bg-[#FEF08A] text-[#163A2D] font-mono font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl cursor-pointer whitespace-nowrap shrink-0"
                >
                  Start Admission Application
                </button>
                <Link
                  to="/admissions"
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl border border-white/25 transition-all whitespace-nowrap shrink-0"
                >
                  View Tuition &amp; Scholarships
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
}
