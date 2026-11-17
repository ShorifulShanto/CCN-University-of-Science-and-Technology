import React from 'react';
import {
  ShieldCheck,
  Building,
  Cpu,
  GraduationCap,
  Award,
  Briefcase,
  ArrowRight,
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface WhyChooseProps {
  onOpenApplyModal: () => void;
  onExplorePrograms: () => void;
}

export default function WhyChoose({ onOpenApplyModal, onExplorePrograms }: WhyChooseProps) {
  const PILLARS = [
    {
      number: '01',
      icon: <ShieldCheck className="w-5 h-5 text-[#163A2D] group-hover:text-[#FAD02C] transition-colors" />,
      title: 'Full UGC & Govt. Recognition',
      desc: 'Established in 2014 under the Private University Act 2010. Approved by the University Grants Commission (UGC) and Ministry of Education, Govt. of Bangladesh.',
      kicker: 'Govt. Accredited',
    },
    {
      number: '02',
      icon: <Building className="w-5 h-5 text-[#163A2D] group-hover:text-[#FAD02C] transition-colors" />,
      title: 'Serene Green Campus in Kotbari',
      desc: 'Situated amidst the historic and peaceful archaeological landscape of Kotbari, Cumilla, providing an inspiring, eco-friendly learning environment with modern infrastructure.',
      kicker: 'Permanent Campus',
    },
    {
      number: '03',
      icon: <Cpu className="w-5 h-5 text-[#163A2D] group-hover:text-[#FAD02C] transition-colors" />,
      title: '18+ Modern Engineering & Science Labs',
      desc: 'Hands-on practical training in cutting-edge computer clusters, AI hubs, electrical machines labs, materials testing workshops, and moot court facilities.',
      kicker: 'Advanced Labs',
    },
    {
      number: '04',
      icon: <GraduationCap className="w-5 h-5 text-[#163A2D] group-hover:text-[#FAD02C] transition-colors" />,
      title: 'Distinguished & Dedicated Faculty',
      desc: 'Mentored by highly qualified scholars, professors, and industry practitioners with degrees from BUET, Dhaka University, CUET, and prestigious overseas institutions.',
      kicker: 'OBE Curricula',
    },
    {
      number: '05',
      icon: <Award className="w-5 h-5 text-[#163A2D] group-hover:text-[#FAD02C] transition-colors" />,
      title: 'Generous Merit Scholarships (Up to 100%)',
      desc: 'Committed to affordable higher education with full tuition waivers for GPA 5.00 achievers, Freedom Fighter offspring quotas, female student incentives, and sibling waivers.',
      kicker: 'Up to 100% Waiver',
    },
    {
      number: '06',
      icon: <Briefcase className="w-5 h-5 text-[#163A2D] group-hover:text-[#FAD02C] transition-colors" />,
      title: 'Career Readiness & Industry Placement',
      desc: 'Outcome-Based Education (OBE) curriculum aligned with industry demands, active student tech clubs, internship placements, and international university MoUs.',
      kicker: 'Industry Ready',
    },
  ];

  return (
    <section
      id="why-choose"
      className="pt-16 pb-20 sm:pt-22 sm:pb-28 bg-gradient-to-b from-[#F2F7F4] via-[#EDF5F0] to-[#E8F1EB] border-b border-[#CFE2D7] relative overflow-hidden"
    >
      {/* Subtle Masked Architectural Grid Texture */}
      <div className="ccn-bg-grid-masked absolute inset-0 pointer-events-none opacity-80" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="max-w-3xl mb-12 space-y-2.5">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#4E7D68]">
              01 · Academic Distinction
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-[42px] font-sans font-black tracking-tight text-[#102B21] leading-[1.1]"
              style={{ textWrap: 'balance' }}
            >
              Why Choose{' '}
              <span className="ccn-text-gradient-dark">CCN University</span>
            </h2>
            <p className="text-sm sm:text-base text-[#355A4A] leading-relaxed max-w-2xl">
              CCNUST blends rigorous scientific inquiry with hands-on technological training, ethical values, and inclusive scholarship support in the scenic hills of Kotbari, Cumilla.
            </p>
          </div>
        </ScrollReveal>

        {/* 6 Grid Cards with Rotating Conic Border Glow & Staggered Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map((item, idx) => (
            <ScrollReveal key={item.number} delayMs={idx * 55} className="h-full">
              <div className="ccn-glow-card h-full bg-[#FAFDFB]/90 backdrop-blur-sm border border-[#C8DFD2] rounded-2xl p-7 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#DCECE2] mb-5">
                    <div className="w-11 h-11 rounded-xl bg-[#EAF2ED] border border-[#C8DFD2] group-hover:bg-[#163A2D] flex items-center justify-center transition-colors">
                      {item.icon}
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#4E7D68] tracking-wider uppercase">
                      {item.number} · {item.kicker}
                    </span>
                  </div>

                  <h3 className="font-sans text-lg font-black text-[#163A2D] tracking-tight mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-[#355A4A] text-sm leading-relaxed mb-6 font-sans">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#DCECE2] flex items-center justify-between text-xs font-mono font-bold text-[#163A2D] transition-colors">
                  <span className="uppercase tracking-wider">Institutional Standard</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#163A2D]" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Luminous Emerald Gradient Banner */}
        <ScrollReveal delayMs={120}>
          <div className="mt-12 relative overflow-hidden rounded-2xl border border-[#245A45] bg-gradient-to-br from-[#163A2D] via-[#123126] to-[#0B2018] p-8 sm:p-10 text-white shadow-[0_20px_50px_-18px_rgba(16,43,33,0.45)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40"
              style={{
                background: 'radial-gradient(circle, rgba(250, 208, 44, 0.32) 0%, transparent 70%)',
                filter: 'blur(45px)',
              }}
            />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="font-mono text-xs font-bold text-[#FAD02C] uppercase tracking-widest">
                  Fall 2026 Admission Intake · Kotbari Campus
                </div>
                <h3
                  className="font-sans text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Ready to Join CCN University of Science &amp; Technology?
                </h3>
                <p className="text-[#D0E4DA] text-sm leading-relaxed">
                  Take the first step toward a future in engineering, computer science, law, or business administration.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={onOpenApplyModal}
                  className="bg-[#FAD02C] hover:bg-[#FEF08A] text-[#0D241C] font-mono font-black uppercase text-xs tracking-wider px-6 py-3.5 rounded-xl transition-all cursor-pointer shadow-sm whitespace-nowrap shrink-0"
                >
                  Apply Online
                </button>
                <button
                  type="button"
                  onClick={onExplorePrograms}
                  className="bg-white/10 hover:bg-white/20 text-white font-mono font-bold uppercase text-xs tracking-wider px-6 py-3.5 rounded-xl border border-white/25 transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  View Curricula
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

