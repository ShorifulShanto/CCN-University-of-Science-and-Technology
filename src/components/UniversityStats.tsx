import React from 'react';
import {
  GraduationCap,
  Building2,
  Cpu,
  Award,
  Users,
  CheckCircle2,
  FileCheck2,
} from 'lucide-react';
import { UNIVERSITY_INFO } from '../universityData';
import { SwissCornerCross } from './designSystem/SwissPrimitives';

export default function UniversityStats() {
  const iconMap: Record<string, React.ReactNode> = {
    'Academic Programs': <GraduationCap className="w-4 h-4 text-current transition-colors duration-200" />,
    'Specialized Faculties': <Building2 className="w-4 h-4 text-current transition-colors duration-200" />,
    'UGC Approval': <FileCheck2 className="w-4 h-4 text-current transition-colors duration-200" />,
    'Merit Scholarships': <Award className="w-4 h-4 text-current transition-colors duration-200" />,
    'Modern Labs': <Cpu className="w-4 h-4 text-current transition-colors duration-200" />,
    'Alumni & Enrolled': <Users className="w-4 h-4 text-current transition-colors duration-200" />,
  };

  return (
    <section id="stats" className="relative -mt-8 sm:-mt-12 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-none border-2 border-[#163A2D] relative shadow-none overflow-hidden">
        {/* Registration crosses */}
        <SwissCornerCross className="absolute top-1.5 left-1.5 z-10" />
        <SwissCornerCross className="absolute top-1.5 right-1.5 z-10" />
        <SwissCornerCross className="absolute bottom-1.5 left-1.5 z-10" />
        <SwissCornerCross className="absolute bottom-1.5 right-1.5 z-10" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-y lg:divide-y-0 lg:divide-x divide-[#D0E4DA]">
          {UNIVERSITY_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 flex flex-col justify-between hover:bg-[#FAF8F5] transition-colors duration-150 group cursor-default"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] font-bold text-[#4E7D68] tracking-widest uppercase">
                    0{idx + 1} //
                  </span>
                  <div className="p-1.5 bg-[#EAF2ED] border border-[#D0E4DA] text-[#163A2D] group-hover:bg-[#163A2D] group-hover:text-[#FAD02C] group-hover:border-[#163A2D] hover:bg-[#163A2D] hover:text-[#FAD02C] hover:border-[#163A2D] transition-colors duration-200 cursor-pointer flex items-center justify-center">
                    {iconMap[stat.label] || <CheckCircle2 className="w-4 h-4 text-current transition-colors duration-200" />}
                  </div>
                </div>

                <div className="font-sans text-2xl sm:text-3xl font-black text-[#163A2D] tracking-tighter leading-none group-hover:text-[#0D241C] transition-colors">
                  {stat.value}
                </div>
                
                <div className="text-[11px] font-black text-[#163A2D] uppercase tracking-wider mt-3 font-sans">
                  {stat.label}
                </div>
              </div>

              <div className="text-[11px] text-[#4E7D68] font-sans mt-2.5 leading-snug">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

