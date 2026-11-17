import React, { useState } from 'react';
import {
  Building2,
  BookOpen,
  Bus,
  Users,
  Trophy,
  HeartHandshake,
  Cpu,
  Sparkles,
  CheckCircle2,
  MapPin,
} from 'lucide-react';
import { CAMPUS_CLUBS } from '../universityData';
import SectionAtmosphere from './SectionAtmosphere';

export default function CampusLife() {
  const [activeTab, setActiveTab] = useState<'facilities' | 'clubs' | 'transport'>('facilities');

  const FACILITIES = [
    {
      title: 'Advanced Computing & AI Laboratories',
      category: 'Academic Technology',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=800&auto=format&fit=crop',
      desc: 'High-speed gigabit workstations, GPU clusters for machine learning research, software engineering labs, and networking rigs.',
    },
    {
      title: 'Central Digital Library & Research Center',
      category: 'Knowledge Hub',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop',
      desc: 'Air-conditioned study halls housing 15,000+ physical volumes, subscribed international journals (IEEE, JSTOR, Springer), and high-speed e-resource terminals.',
    },
    {
      title: 'Electrical Machines & Circuit Labs',
      category: 'Engineering Workshop',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop',
      desc: 'Equipped with oscilloscopes, power system simulators, microcontrollers, VLSI trainers, and telecommunication testing modules.',
    },
    {
      title: 'Civil Engineering Materials & Concrete Lab',
      category: 'Structural Testing',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
      desc: 'Hydraulics flumes, universal testing machines, soil mechanics equipment, and total stations for precision geographic surveying.',
    },
  ];

  return (
    <section id="campus-life" className="relative py-20 bg-[#FAF8F5] border-b-2 border-[#163A2D] overflow-hidden">
      {/* Ambient Animation Atmosphere */}
      <SectionAtmosphere variant="light" showFog={true} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="font-mono text-xs font-bold text-[#163A2D] bg-[#EAF2ED] border border-[#D0E4DA] px-3 py-1 inline-block uppercase tracking-wider mb-3">
            <span>05 // Vibrant Student Experience</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-black text-[#163A2D] uppercase tracking-tight mb-4">
            Campus Life & Infrastructure
          </h2>
          <p className="text-[#4E7D68] text-base sm:text-lg leading-relaxed">
            Located in scenic Kotbari, Cumilla, CCNUST offers a balanced ecosystem combining high-tech academic laboratories, sports, cultural clubs, and dedicated student transport.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center gap-2 mb-10 border-b border-[#D0E4DA] pb-4">
          <button
            onClick={() => setActiveTab('facilities')}
            className={`px-4 py-2 font-mono text-xs sm:text-sm font-bold uppercase transition-all cursor-pointer border ${
              activeTab === 'facilities'
                ? 'bg-[#163A2D] text-white border-[#163A2D]'
                : 'text-[#163A2D] bg-white border-[#D0E4DA] hover:bg-[#FAF8F5]'
            }`}
          >
            Laboratories & Library
          </button>
          <button
            onClick={() => setActiveTab('clubs')}
            className={`px-4 py-2 font-mono text-xs sm:text-sm font-bold uppercase transition-all cursor-pointer border ${
              activeTab === 'clubs'
                ? 'bg-[#163A2D] text-white border-[#163A2D]'
                : 'text-[#163A2D] bg-white border-[#D0E4DA] hover:bg-[#FAF8F5]'
            }`}
          >
            Student Clubs & Societies
          </button>
          <button
            onClick={() => setActiveTab('transport')}
            className={`px-4 py-2 font-mono text-xs sm:text-sm font-bold uppercase transition-all cursor-pointer border ${
              activeTab === 'transport'
                ? 'bg-[#163A2D] text-white border-[#163A2D]'
                : 'text-[#163A2D] bg-white border-[#D0E4DA] hover:bg-[#FAF8F5]'
            }`}
          >
            University Bus Service
          </button>
        </div>

        {/* Tab 1: Facilities */}
        {activeTab === 'facilities' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-200">
            {FACILITIES.map((facility, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-[#D0E4DA] overflow-hidden group"
              >
                <div className="h-56 overflow-hidden relative border-b border-[#D0E4DA]">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-3 right-3 bg-[#163A2D] text-[#FAD02C] text-[11px] font-mono font-bold px-2.5 py-1 uppercase tracking-wider border border-[#FAD02C]/30">
                    {facility.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-sans text-lg font-black text-[#163A2D] group-hover:text-[#21513F] uppercase transition-colors mb-2">
                    {facility.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4E7D68] leading-relaxed">
                    {facility.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Clubs & Societies */}
        {activeTab === 'clubs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
            {CAMPUS_CLUBS.map((club) => (
              <div
                key={club.id}
                className="bg-white border-2 border-[#D0E4DA] p-6 flex flex-col justify-between hover:border-[#163A2D] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-[#163A2D] bg-[#EAF2ED] border border-[#D0E4DA] px-2 py-0.5 uppercase font-mono">
                      {club.category}
                    </span>
                    <span className="text-xs text-[#4E7D68] font-mono font-semibold">
                      {club.memberCount}
                    </span>
                  </div>

                  <h3 className="font-sans text-base sm:text-lg font-black text-[#163A2D] uppercase mb-2">
                    {club.name}
                  </h3>

                  <p className="text-xs text-[#4E7D68] leading-relaxed mb-4">
                    {club.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#D0E4DA] flex items-center justify-between text-xs">
                  <span className="text-[#4E7D68] font-mono text-[11px]">
                    Advisor: {club.advisor}
                  </span>
                  <span className="text-[#163A2D] font-mono font-bold text-[11px]">
                    Active Member Wing
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Transport */}
        {activeTab === 'transport' && (
          <div className="bg-white border-2 border-[#D0E4DA] p-6 sm:p-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center space-x-2 text-[#163A2D] font-bold text-xs uppercase tracking-wider font-mono">
                  <Bus className="w-4 h-4" />
                  <span>Student & Faculty Commute Network</span>
                </div>
                <h3 className="font-sans text-2xl font-black text-[#163A2D] uppercase">
                  Dedicated Transport Fleet Across Cumilla
                </h3>
                <p className="text-[#4E7D68] text-xs sm:text-sm leading-relaxed">
                  CCNUST operates a dedicated fleet of university buses connecting major transport hubs across Cumilla metropolitan city, ensuring convenient, safe, and punctual commuting for students, faculty, and administrative staff.
                </p>

                <div className="space-y-2 text-xs text-[#163A2D] pt-2">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#163A2D] shrink-0 mt-0.5" />
                    <span><strong>Route 1:</strong> Sasongachha &rarr; Tomsom Bridge &rarr; Paduar Bazar &rarr; Kotbari Campus</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#163A2D] shrink-0 mt-0.5" />
                    <span><strong>Route 2:</strong> Kandirpar &rarr; Rajganj &rarr; Jangalia &rarr; Kotbari Campus</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#163A2D] shrink-0 mt-0.5" />
                    <span><strong>Route 3:</strong> Cantonment &rarr; Mainamati &rarr; Kotbari Campus</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="border-2 border-[#163A2D] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop"
                    alt="CCNUST Campus Bus Fleet"
                    className="w-full h-64 object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="bg-[#163A2D] text-white p-3 text-xs flex items-center justify-between font-mono">
                    <span>Equipped with GPS tracking and safety features</span>
                    <span className="text-[#FAD02C]">Daily Schedule</span>
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
