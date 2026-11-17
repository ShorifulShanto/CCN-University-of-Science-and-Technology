import React from 'react';
import {
  Globe2,
  Atom,
  Building2,
  ExternalLink,
  BookOpen,
  Award,
  Sparkles,
  FileCheck,
  CheckCircle2,
} from 'lucide-react';
import { INTERNATIONAL_COLLABORATIONS } from '../universityData';

export default function ResearchInternational() {
  const researchDomains = [
    {
      title: 'Machine Learning & Bengali Natural Language Processing (NLP)',
      faculty: 'Faculty of Engineering & Technology',
      desc: 'Developing specialized neural models and syntactic parsers for low-resource Bengali dialects in Southeastern Bangladesh.',
      tags: ['AI & Neural Nets', 'Bangla NLP', 'Speech Corpus'],
    },
    {
      title: 'IoT & Smart Water Management for Agritech',
      faculty: 'Dept of Computer Science & EEE',
      desc: 'Low-cost sensor networks for precision agriculture and moisture tracking across the Gumti River irrigation basin.',
      tags: ['Smart Sensors', 'Embedded Systems', 'Agritech'],
    },
    {
      title: 'Structural Integrity of Sustainable Geopolymer Concrete',
      faculty: 'Dept of Civil Engineering',
      desc: 'Industrial fly-ash based geopolymer concrete formulations reducing carbon footprint in deltaic flood-prone construction.',
      tags: ['Green Concrete', 'Earthquake Resilience', 'Materials'],
    },
    {
      title: 'Judicial Digitization & Alternative Dispute Resolution (ADR)',
      faculty: 'Faculty of Liberal Arts & Law',
      desc: 'Comparative legal frameworks for digital evidence authentication in Bangladesh commercial tribunals.',
      tags: ['Cyber Jurisprudence', 'ADR', 'Legal Tech'],
    },
  ];

  return (
    <section id="research" className="py-20 bg-[#F8FAF8] border-b border-[#DCEBE3] relative">
      <span id="research-international" className="absolute -top-24 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="institutional-badge mb-3">
            <span>Global Vision</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17342B] tracking-tight mb-4">
            Research Centers & Global Academic Linkages
          </h2>
          <p className="text-[#4A6E60] text-base sm:text-lg leading-relaxed">
            CCNUST connects local innovation with international academic networks through joint research projects, international MoUs, faculty exchange programs, and applied engineering labs.
          </p>
        </div>

        {/* Global MoUs Grid */}
        <div className="mb-16">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#17342B] uppercase tracking-wider mb-6">
            <Globe2 className="w-4 h-4 text-[#264E41]" />
            <span>International Memorandums of Understanding (MoUs) & Partnerships</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INTERNATIONAL_COLLABORATIONS.map((collab) => (
              <div
                key={collab.id}
                className="bg-white border border-[#DCEBE3] rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#FDE047] transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold font-mono text-[#854D0E] bg-[#FEFCE8] border border-[#FEF08A] px-2 py-0.5 rounded uppercase">
                      {collab.mouType}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 flex items-center space-x-1">
                      <span>{collab.country}</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#17342B] mb-2 leading-snug">
                    {collab.partnerName}
                  </h3>

                  <p className="text-xs text-[#4A6E60] leading-relaxed mb-4">
                    {collab.description}
                  </p>

                  <div className="text-xs text-[#17342B] bg-[#EFF6F2] border border-[#DCEBE3] rounded-lg p-2.5 mb-4">
                    <strong>Focus:</strong> {collab.partnershipScope}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#DCEBE3]/60">
                  <div className="text-[10px] font-bold text-[#4A6E60] uppercase tracking-wider mb-1.5">
                    Joint Initiatives:
                  </div>
                  <ul className="space-y-1 text-xs text-[#4A6E60]">
                    {collab.jointActivities.map((act, aIdx) => (
                      <li key={aIdx} className="flex items-start space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Applied Research Thrust Areas */}
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#17342B] uppercase tracking-wider mb-6">
            <Atom className="w-4 h-4 text-[#264E41]" />
            <span>Applied Research Domains & Institutional Publications</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {researchDomains.map((domain, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#DCEBE3] rounded-2xl p-6 shadow-sm hover:border-[#FDE047] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-mono font-bold text-[#4A6E60] uppercase mb-1">
                    {domain.faculty}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#17342B] mb-2">
                    {domain.title}
                  </h3>
                  <p className="text-xs text-[#4A6E60] leading-relaxed mb-4">
                    {domain.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#DCEBE3]/60">
                  {domain.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] bg-[#EFF6F2] text-[#264E41] px-2.5 py-1 rounded-md font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
