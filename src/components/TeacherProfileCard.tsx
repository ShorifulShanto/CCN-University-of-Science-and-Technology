import React from 'react';
import { FacultyMember } from '../types';
import { Mail, Phone, MapPin, X, Award, Sparkles, BookOpen, GraduationCap } from 'lucide-react';

interface TeacherProfileCardProps {
  key?: React.Key;
  member: FacultyMember;
  index?: number;
  onContact?: (member: FacultyMember) => void;
  onClose?: () => void;
  isModal?: boolean;
}

export default function TeacherProfileCard({
  member,
  index = 1,
  onContact,
  onClose,
  isModal = false,
}: TeacherProfileCardProps) {
  // Extract initials for fallback avatar
  const initials = member.name
    .replace(/^(Engr\.|Dr\.|Prof\.|Barrister|Advocate|Md\.|Mr\.|Ms\.)\s+/i, '')
    .trim()
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase() || 'CT';

  // Department code / handle & Theme accents
  let handleTag = 'CCNUST_FACULTY';
  let deptBg = '#1E293B'; // Slate 800
  let badgeText = 'ACTIVE FACULTY';
  let badgeBg = '#FEF3C7'; // Amber 100
  let badgeColor = '#92400E'; // Amber 800

  if (member.departmentName.includes('Computer')) {
    handleTag = 'CSE_FACULTY';
    deptBg = '#0F172A';
    badgeText = 'UGC ACCREDITED';
  } else if (member.departmentName.includes('Electrical')) {
    handleTag = 'EEE_FACULTY';
    deptBg = '#0369A1'; // Sky 700
    badgeText = 'POWER & TECH';
  } else if (member.departmentName.includes('Civil')) {
    handleTag = 'CE_FACULTY';
    deptBg = '#C2410C'; // Orange 700
    badgeText = 'IEB ALIGNED';
  } else if (member.departmentName.includes('Law')) {
    handleTag = 'LAW_FACULTY';
    deptBg = '#991B1B'; // Red 800
    badgeText = 'BAR ENROLLED';
  } else if (member.departmentName.includes('Business')) {
    handleTag = 'BBA_FACULTY';
    deptBg = '#047857'; // Emerald 700
    badgeText = 'FINANCE & MGMT';
  } else if (member.departmentName.includes('English') || member.departmentName.includes('Bangla')) {
    handleTag = 'ARTS_FACULTY';
    deptBg = '#6D28D9'; // Purple 700
    badgeText = 'HUMANITIES';
  } else if (member.departmentName.includes('Mathematics') || member.departmentName.includes('Economics')) {
    handleTag = 'MATH_FACULTY';
    deptBg = '#0284C7'; // Light Blue 600
    badgeText = 'QUANT & APPLIED';
  }

  if (member.designation.toLowerCase().includes('head') || member.designation.toLowerCase().includes('dean')) {
    badgeText = 'DEPARTMENT HEAD';
    badgeBg = '#FEF3C7';
    badgeColor = '#92400E';
  }

  // Calculate realistic faculty stats
  const publicationCount = Math.max(12, (index * 4 + 7) % 38);
  const experienceYears = Math.max(6, (index * 3 + 5) % 22);
  const coursesCount = Math.max(4, (index * 2 + 3) % 12);

  const handleContactClick = () => {
    if (onContact) {
      onContact(member);
    } else {
      window.location.href = `mailto:${member.email}?subject=Inquiry%20to%20${encodeURIComponent(member.name)}%20-%20CCNUST`;
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Uiverse.io Card by andrew-demchenk0 for Teacher Profile with Site Colors */}
      <div className="card shadow-lg hover:shadow-2xl">
        {/* If rendered in modal or has onClose, show an integrated cross button on header */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 left-3 z-30 w-7 h-7 bg-black/60 hover:bg-black text-white rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm"
            title="Close Profile"
            aria-label="Close Profile"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        <div className="card__img">
          {/* University Artistic Wave / Geometric Banner Header */}
          <svg viewBox="0 0 300 192" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="192" fill="#163A2D" />
            <path d="M0 120 C 80 180, 200 60, 300 140 L 300 0 L 0 0 Z" fill="#0F281E" opacity="0.6" />
            <path d="M0 160 C 100 110, 180 180, 300 120 L 300 192 L 0 192 Z" fill="#21513F" opacity="0.3" />
            <circle cx="260" cy="35" r="45" fill="#FAD02C" opacity="0.12" />
            <circle cx="40" cy="40" r="25" fill="#FAD02C" opacity="0.08" />
          </svg>
          <span className="absolute top-3 right-3 text-[10px] font-mono font-bold bg-[#FAF8F5] text-[#163A2D] px-2 py-0.5 rounded shadow-xs">
            {badgeText}
          </span>
        </div>

        <div className="card__avatar">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="w-[100px] h-[100px] rounded-full object-cover object-top"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop';
              }}
            />
          ) : (
            <svg viewBox="0 0 100 100" fill="none" className="w-[100px] h-[100px] rounded-full bg-[#163A2D]">
              <circle cx="50" cy="50" r="50" fill="#163A2D" />
              <circle cx="50" cy="38" r="18" fill="#FAD02C" />
              <path d="M20 86 C 24 64, 76 64, 80 86" fill="#FAD02C" />
            </svg>
          )}
        </div>

        <div className="card__title" title={member.name}>
          {member.name}
        </div>

        <div className="card__subtitle" title={member.designation}>
          {member.designation}
        </div>

        <div className="card__dept" title={member.departmentName}>
          {member.departmentName}
        </div>

        <div className="card__wrapper">
          <button
            type="button"
            onClick={handleContactClick}
            className="card__btn card__btn-solid"
          >
            DOSSIER
          </button>
          <a
            href={`mailto:${member.email}?subject=Inquiry%20to%20${encodeURIComponent(member.name)}%20-%20CCNUST`}
            className="card__btn"
          >
            EMAIL
          </a>
        </div>
      </div>

      {/* Secondary Quick Contact Details when rendered inside modal */}
      {isModal && (
        <div className="w-full max-w-[380px] mt-4 bg-white border border-slate-200 rounded-xl shadow-sm p-4 text-xs font-mono space-y-2 text-slate-800">
          <div className="flex items-center space-x-2 text-xs">
            <Mail className="w-4 h-4 text-amber-600 shrink-0" />
            <a
              href={`mailto:${member.email}`}
              className="font-bold text-slate-900 hover:text-amber-600 hover:underline truncate"
            >
              {member.email}
            </a>
          </div>
          {member.roomNo && (
            <div className="flex items-center space-x-2 text-xs">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="text-slate-600">{member.roomNo}</span>
            </div>
          )}
          {member.researchInterests && member.researchInterests.length > 0 && (
            <div className="pt-2 border-t border-slate-200 flex flex-wrap gap-1.5">
              {member.researchInterests.slice(0, 4).map((res, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-slate-100 text-slate-800 font-bold px-2 py-0.5 rounded border border-slate-200"
                >
                  {res}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
