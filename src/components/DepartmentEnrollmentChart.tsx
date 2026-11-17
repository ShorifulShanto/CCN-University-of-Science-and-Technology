import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  Award,
  BookOpen,
  PieChart as PieChartIcon,
  Filter,
  ArrowRight,
  TrendingUp,
  Cpu,
  Zap,
  Hammer,
  Briefcase,
  Scale,
  Atom,
} from 'lucide-react';
import { DEPARTMENT_ENROLLMENT_DATA } from '../universityData';
import { DepartmentEnrollment } from '../types';
import { SwissSectionHeader, SwissButton, SwissCornerCross, SwissBadge } from './designSystem/SwissPrimitives';

interface DepartmentEnrollmentChartProps {
  onOpenApplyModal?: (programId?: string) => void;
}

export default function DepartmentEnrollmentChart({ onOpenApplyModal }: DepartmentEnrollmentChartProps) {
  const [facultyFilter, setFacultyFilter] = useState<string>('all');
  const [selectedDeptId, setSelectedDeptId] = useState<string>(DEPARTMENT_ENROLLMENT_DATA[0].id);
  const [hoveredDeptId, setHoveredDeptId] = useState<string | null>(null);

  const faculties = [
    'all',
    'Faculty of Engineering',
    'Faculty of Business Studies',
    'Faculty of Arts, Law & Social Science',
    'Faculty of Science & General Studies',
  ];

  const filteredData = DEPARTMENT_ENROLLMENT_DATA.filter((dept) => {
    if (facultyFilter === 'all') return true;
    return dept.faculty === facultyFilter;
  });

  const totalFilteredStudents = filteredData.reduce((acc, curr) => acc + curr.value, 0);
  const totalUniversityStudents = DEPARTMENT_ENROLLMENT_DATA.reduce((acc, curr) => acc + curr.value, 0);

  // Active department guarantees it belongs to current filtered view
  const activeDept =
    filteredData.find((d) => d.id === (hoveredDeptId || selectedDeptId)) ||
    filteredData[0] ||
    DEPARTMENT_ENROLLMENT_DATA[0];

  // Handler for faculty filter click - instantly sets active department to first in that faculty
  const handleFacultyChange = (newFac: string) => {
    setFacultyFilter(newFac);
    setHoveredDeptId(null);
    const newFiltered = DEPARTMENT_ENROLLMENT_DATA.filter((dept) => {
      if (newFac === 'all') return true;
      return dept.faculty === newFac;
    });
    if (newFiltered.length > 0) {
      setSelectedDeptId(newFiltered[0].id);
    }
  };

  const iconMap: Record<string, React.ReactNode> = {
    Cpu: <Cpu className="w-4 h-4" />,
    Zap: <Zap className="w-4 h-4" />,
    Hammer: <Hammer className="w-4 h-4" />,
    Briefcase: <Briefcase className="w-4 h-4" />,
    Scale: <Scale className="w-4 h-4" />,
    BookOpen: <BookOpen className="w-4 h-4" />,
    Atom: <Atom className="w-4 h-4" />,
    TrendingUp: <TrendingUp className="w-4 h-4" />,
  };

  // Helper to calculate SVG donut pie slices with polar coordinates
  let cumulativeAngle = 0;
  const radius = 120;
  const innerRadius = 68; // Donut hole
  const center = 150;

  const slices = filteredData.map((dept) => {
    const fraction = totalFilteredStudents > 0 ? dept.value / totalFilteredStudents : 0;
    const angle = fraction * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle += angle;

    let pathData = '';

    // If slice takes full 360° (or is single item), standard SVG arc with identical start/end degenerates.
    // We split into two 180° semi-circles for guaranteed rendering.
    if (fraction >= 0.999 || angle >= 359.9 || filteredData.length === 1) {
      const topY = center - radius;
      const botY = center + radius;
      const topInnerY = center - innerRadius;
      const botInnerY = center + innerRadius;
      pathData = [
        `M ${center} ${topY}`,
        `A ${radius} ${radius} 0 1 1 ${center} ${botY}`,
        `A ${radius} ${radius} 0 1 1 ${center} ${topY}`,
        `M ${center} ${topInnerY}`,
        `A ${innerRadius} ${innerRadius} 0 1 0 ${center} ${botInnerY}`,
        `A ${innerRadius} ${innerRadius} 0 1 0 ${center} ${topInnerY}`,
        'Z',
      ].join(' ');
    } else {
      const startRad = ((startAngle - 90) * Math.PI) / 180;
      const endRad = ((endAngle - 90) * Math.PI) / 180;

      const x1 = center + radius * Math.cos(startRad);
      const y1 = center + radius * Math.sin(startRad);
      const x2 = center + radius * Math.cos(endRad);
      const y2 = center + radius * Math.sin(endRad);

      const x1Inner = center + innerRadius * Math.cos(endRad);
      const y1Inner = center + innerRadius * Math.sin(endRad);
      const x2Inner = center + innerRadius * Math.cos(startRad);
      const y2Inner = center + innerRadius * Math.sin(startRad);

      const largeArcFlag = angle > 180 ? 1 : 0;

      pathData = [
        `M ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `L ${x1Inner} ${y1Inner}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x2Inner} ${y2Inner}`,
        'Z',
      ].join(' ');
    }

    return {
      dept,
      fraction,
      percentage: (fraction * 100).toFixed(1),
      pathData,
      startAngle,
      endAngle,
      midAngle: startAngle + angle / 2,
    };
  });

  return (
    <section id="enrollment-stats" className="py-20 bg-[#FAF8F5] border-b-2 border-[#163A2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SwissSectionHeader
          tag="ENROLLMENT ANALYTICS & DISTRIBUTION"
          title="Department Student Demographics"
          subtitle="Real-time statistical breakdown of enrolled scholars across engineering disciplines, business leadership, legal studies, and basic sciences."
        />

        {/* Filter controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs font-bold text-[#163A2D] uppercase flex items-center">
              <Filter className="w-3.5 h-3.5 mr-1.5 text-[#FAD02C] stroke-[2.5]" /> Filter Faculty:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {faculties.map((fac) => (
                <button
                  key={fac}
                  onClick={() => handleFacultyChange(fac)}
                  className={`px-3 py-1 text-xs font-mono font-bold uppercase transition-all duration-200 cursor-pointer border ${
                    facultyFilter === fac
                      ? 'bg-[#163A2D] text-[#FAD02C] border-[#163A2D] shadow-xs'
                      : 'bg-white text-[#163A2D] border-[#D0E4DA] hover:bg-[#D0E4DA]/40'
                  }`}
                >
                  {fac === 'all' ? 'All Faculties' : fac.replace('Faculty of ', '')}
                </button>
              ))}
            </div>
          </div>

          <div className="font-mono text-xs text-[#4E7D68] bg-white px-3 py-1 border-2 border-[#163A2D] shadow-xs">
            TOTAL ENROLLED: <strong className="text-[#163A2D]">{totalFilteredStudents.toLocaleString()}</strong> STUDENTS
          </div>
        </div>

        {/* Main Chart + Data Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Donut / Pie Chart (5 Cols) */}
          <div className="lg:col-span-5 bg-white border-2 border-[#163A2D] p-6 sm:p-8 relative shadow-xs flex flex-col items-center">
            <div className="w-full flex items-center justify-between border-b border-[#D0E4DA] pb-3 mb-6">
              <span className="font-mono text-xs font-bold text-[#163A2D] uppercase flex items-center">
                <PieChartIcon className="w-4 h-4 mr-2 text-[#FAD02C] stroke-[2.5]" />
                PROPORTIONAL SLICE RATIO
              </span>
              <span className="text-[10px] font-mono text-[#4E7D68] uppercase font-bold">
                {slices.length} DEPARTMENTS
              </span>
            </div>

            {/* Interactive SVG Pie / Donut Chart */}
            <div className="relative w-[300px] h-[300px] flex items-center justify-center my-2 select-none">
              <svg
                width="300"
                height="300"
                viewBox="0 0 300 300"
                className="transform transition-transform duration-300"
              >
                {slices.map((slice) => {
                  const isSelected = activeDept.id === slice.dept.id;
                  return (
                    <path
                      key={slice.dept.id}
                      d={slice.pathData}
                      fill={slice.dept.color}
                      stroke={isSelected ? '#FAD02C' : '#FFFFFF'}
                      strokeWidth={isSelected ? '3.5' : '2.5'}
                      className={`cursor-pointer transition-all duration-200 ${
                        isSelected ? 'opacity-100 filter drop-shadow-md scale-[1.03] origin-center' : 'opacity-90 hover:opacity-100'
                      }`}
                      onMouseEnter={() => setHoveredDeptId(slice.dept.id)}
                      onMouseLeave={() => setHoveredDeptId(null)}
                      onClick={() => setSelectedDeptId(slice.dept.id)}
                    />
                  );
                })}
              </svg>

              {/* Center Donut Hub */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center p-2"
                style={{ width: innerRadius * 2, height: innerRadius * 2, margin: 'auto' }}
              >
                <span className="font-mono text-[10px] font-bold text-[#4E7D68] uppercase tracking-wider">
                  {activeDept.code}
                </span>
                <span className="font-sans text-2xl font-black text-[#163A2D] leading-none my-0.5">
                  {activeDept.value.toLocaleString()}
                </span>
                <span className="text-[10px] font-mono font-bold text-[#163A2D] uppercase bg-[#FAD02C]/40 px-1.5 py-0.5 border border-[#163A2D]/20">
                  {((activeDept.value / totalUniversityStudents) * 100).toFixed(1)}% OF TOTAL
                </span>
              </div>
            </div>

            {/* Quick Slices Color Strip */}
            <div className="w-full mt-6 pt-4 border-t border-[#D0E4DA] grid grid-cols-2 gap-2 text-xs font-mono">
              {filteredData.map((dept) => {
                const isSelected = activeDept.id === dept.id;
                return (
                  <button
                    key={dept.id}
                    onClick={() => setSelectedDeptId(dept.id)}
                    onMouseEnter={() => setHoveredDeptId(dept.id)}
                    onMouseLeave={() => setHoveredDeptId(null)}
                    className={`flex items-center space-x-2 p-1.5 text-left border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[#163A2D] text-[#FAD02C] border-[#163A2D] shadow-xs font-bold'
                        : 'bg-[#FAF8F5] text-[#163A2D] border-[#D0E4DA] hover:border-[#163A2D]'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full shrink-0 border border-black/20"
                      style={{ backgroundColor: dept.color }}
                    />
                    <span className="truncate font-bold text-[11px]">{dept.code}</span>
                    <span className="ml-auto text-[10px] opacity-80">{dept.value}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Department Detailed Demographic Dossier (7 Cols) */}
          <div className="lg:col-span-7 bg-white border-2 border-[#163A2D] p-6 sm:p-8 relative shadow-xs">
            {/* Active Department Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#D0E4DA] pb-5">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span
                    className="w-3 h-3 rounded-full inline-block border border-black/20"
                    style={{ backgroundColor: activeDept.color }}
                  />
                  <span className="font-mono text-xs font-bold text-[#163A2D] uppercase tracking-wider">
                    {activeDept.faculty}
                  </span>
                </div>
                <h3 className="font-sans text-2xl sm:text-3xl font-black text-[#163A2D] uppercase tracking-tight">
                  {activeDept.label}
                </h3>
                <p className="text-xs text-[#4E7D68] font-mono mt-1">
                  DEPARTMENT IDENTIFIER: <strong className="text-[#163A2D]">{activeDept.code}</strong>
                </p>
              </div>

              <div className="text-left sm:text-right shrink-0 bg-[#FAF8F5] p-3 border-2 border-[#163A2D]">
                <div className="font-mono text-[10px] text-[#4E7D68] uppercase font-bold">
                  ENROLLED STUDENTS
                </div>
                <div className="font-sans text-3xl font-black text-[#163A2D]">
                  {activeDept.value.toLocaleString()}
                </div>
                <div className="font-mono text-[11px] font-bold text-[#163A2D] bg-[#FAD02C]/40 px-1 py-0.5 inline-block border border-[#163A2D]/20 mt-0.5">
                  {((activeDept.value / totalUniversityStudents) * 100).toFixed(1)}% of University
                </div>
              </div>
            </div>

            {/* Department Summary Description */}
            <p className="text-sm text-[#163A2D]/85 mt-4 leading-relaxed font-normal">
              {activeDept.description}
            </p>

            {/* Breakdown Metric Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
              {/* Undergraduate */}
              <div className="p-3 bg-[#FAF8F5] border border-[#D0E4DA]">
                <div className="font-mono text-[10px] text-[#4E7D68] uppercase font-bold flex items-center">
                  <GraduationCap className="w-3 h-3 mr-1 text-[#163A2D]" /> Undergrad
                </div>
                <div className="font-sans text-lg font-black text-[#163A2D] mt-1">
                  {activeDept.undergraduate.toLocaleString()}
                </div>
                <div className="font-mono text-[10px] text-[#4E7D68]">
                  {((activeDept.undergraduate / activeDept.value) * 100).toFixed(0)}% of Dept
                </div>
              </div>

              {/* Graduate / Master's */}
              <div className="p-3 bg-[#FAF8F5] border border-[#D0E4DA]">
                <div className="font-mono text-[10px] text-[#4E7D68] uppercase font-bold flex items-center">
                  <BookOpen className="w-3 h-3 mr-1 text-[#163A2D]" /> Graduate
                </div>
                <div className="font-sans text-lg font-black text-[#163A2D] mt-1">
                  {activeDept.graduate.toLocaleString()}
                </div>
                <div className="font-mono text-[10px] text-[#4E7D68]">
                  {((activeDept.graduate / activeDept.value) * 100).toFixed(0)}% of Dept
                </div>
              </div>

              {/* Male Students */}
              <div className="p-3 bg-[#FAF8F5] border border-[#D0E4DA]">
                <div className="font-mono text-[10px] text-[#4E7D68] uppercase font-bold flex items-center">
                  <Users className="w-3 h-3 mr-1 text-[#163A2D]" /> Male Scholars
                </div>
                <div className="font-sans text-lg font-black text-[#163A2D] mt-1">
                  {activeDept.maleStudents.toLocaleString()}
                </div>
                <div className="font-mono text-[10px] text-[#4E7D68]">
                  {((activeDept.maleStudents / activeDept.value) * 100).toFixed(0)}%
                </div>
              </div>

              {/* Female Students */}
              <div className="p-3 bg-[#FAF8F5] border border-[#D0E4DA]">
                <div className="font-mono text-[10px] text-[#4E7D68] uppercase font-bold flex items-center">
                  <Users className="w-3 h-3 mr-1 text-[#163A2D]" /> Female Scholars
                </div>
                <div className="font-sans text-lg font-black text-[#163A2D] mt-1">
                  {activeDept.femaleStudents.toLocaleString()}
                </div>
                <div className="font-mono text-[10px] text-[#4E7D68]">
                  {((activeDept.femaleStudents / activeDept.value) * 100).toFixed(0)}%
                </div>
              </div>
            </div>

            {/* Scholarship & Waiver Banner */}
            <div className="bg-[#163A2D] text-white p-4 border-2 border-[#163A2D] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#FAD02C]/20 border border-[#FAD02C]/40 flex items-center justify-center text-[#FAD02C] shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-sans text-xs font-black uppercase text-[#FAD02C] tracking-wide">
                    Merit Waivers & Scholarship Recipients
                  </div>
                  <div className="text-xs text-[#D0E4DA] font-mono">
                    <strong className="text-[#FAD02C]">{activeDept.scholarshipHolders}</strong> students currently receive 20%–100% financial waiver in {activeDept.code}.
                  </div>
                </div>
              </div>

              <SwissButton
                variant="gold"
                size="sm"
                onClick={() => onOpenApplyModal?.()}
                className="shrink-0"
              >
                Apply to {activeDept.code}
              </SwissButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
