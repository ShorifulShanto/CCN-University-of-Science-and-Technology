import React, { useState } from 'react';
import { Teacher } from '../schoolData';
import { Phone, Mail, MapPin, Copy, Check, RotateCw, Printer, QrCode, Sparkles, Building2 } from 'lucide-react';

interface TeacherVisitingCardProps {
  teacher: Teacher;
  onCloseModal?: () => void;
  isModalView?: boolean;
}

export default function TeacherVisitingCard({ teacher, isModalView = false }: TeacherVisitingCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Generate standardized email and phone for each teacher
  const teacherEmail = `${teacher.name.toLowerCase().replace(/[^a-z]/g, '')}@sakurahighschool.edu.bd`;
  const teacherPhone = `+880 17${(10000000 + parseInt(teacher.id.replace(/[^0-9]/g, '') || '1') * 87654).toString().substring(0, 8)}`;
  const roomNumber = 300 + parseInt(teacher.id.replace(/[^0-9]/g, '') || '1');

  const handleCopy = (e: React.MouseEvent, text: string, fieldName: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const handlePrint = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.print();
  };

  return (
    <div className="flex flex-col items-center space-y-4 my-2">
      
      {/* CARD PERSPECTIVE WRAPPER */}
      <div 
        className="vcard-perspective w-[340px] h-[210px] sm:w-[350px] sm:h-[215px] cursor-pointer group select-none"
        onClick={() => setIsFlipped(!isFlipped)}
        title="Click to flip visiting card"
      >
        <div className={`vcard-inner ${isFlipped ? 'flipped' : ''}`}>
          
          {/* ==================== FRONT SIDE (School Identity & Watercolor Aesthetic) ==================== */}
          <div className="vcard-face vcard-front bg-[#FAF7F2] text-[#1C2B40] relative flex flex-col justify-between p-5 border border-[#1C2B40]/15 rounded-2xl overflow-hidden shadow-lg">
            
            {/* Background Artwork: Watercolor Ink Mountains & Sun */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 350 215" preserveAspectRatio="none">
              <defs>
                <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FAF7F2"/>
                  <stop offset="65%" stopColor="#F3EFE6"/>
                  <stop offset="100%" stopColor="#E2EBF0"/>
                </linearGradient>
                <linearGradient id="mountainGrad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5D738A" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#9BB0C1" stopOpacity="0.25"/>
                </linearGradient>
                <linearGradient id="mountainGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2E4357" stopOpacity="0.85"/>
                  <stop offset="100%" stopColor="#687F96" stopOpacity="0.35"/>
                </linearGradient>
                <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#E05252" stopOpacity="0.85"/>
                  <stop offset="70%" stopColor="#E86A82" stopOpacity="0.5"/>
                  <stop offset="100%" stopColor="#FAF7F2" stopOpacity="0"/>
                </radialGradient>
              </defs>

              {/* Base sky paper texture */}
              <rect width="350" height="215" fill="url(#skyGrad)"/>

              {/* Sun */}
              <circle cx="282" cy="55" r="18" fill="url(#sunGrad)"/>

              {/* Flying Birds */}
              <g fill="#2E4357" opacity="0.6">
                <path d="M220 38 Q223 35 226 38 Q229 35 232 38 Q229 37 226 39 Q223 37 220 38 Z" transform="translate(10, -5)" />
                <path d="M235 44 Q238 41 241 44 Q244 41 247 44 Q244 43 241 45 Q238 43 235 44 Z" transform="translate(15, -8)" />
                <path d="M210 48 Q213 45 216 48 Q219 45 222 48 Q219 47 216 49 Q213 47 210 48 Z" transform="translate(20, -10)" />
              </g>

              {/* Far Mountain Range */}
              <path d="M0 152 Q50 120 100 142 Q160 112 220 138 Q280 118 350 148 L350 215 L0 215 Z" fill="url(#mountainGrad1)"/>

              {/* Near Mountain Range */}
              <path d="M0 168 Q70 142 130 162 Q190 132 260 158 Q310 145 350 170 L350 215 L0 215 Z" fill="url(#mountainGrad2)"/>

              {/* Water Reflection */}
              <rect x="0" y="182" width="350" height="33" fill="#EBF2F7" opacity="0.65"/>
              <line x1="20" y1="188" x2="110" y2="188" stroke="#5D738A" strokeWidth="0.8" opacity="0.3"/>
              <line x1="150" y1="192" x2="270" y2="192" stroke="#5D738A" strokeWidth="0.8" opacity="0.3"/>
              <line x1="80" y1="198" x2="190" y2="198" stroke="#5D738A" strokeWidth="0.5" opacity="0.2"/>
            </svg>

            {/* Background Artwork: Sakura Blossom Branches */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 350 215">
              {/* Top Left Main Branch */}
              <g stroke="#4E342E" strokeWidth="1.8" strokeLinecap="round" fill="none">
                <path d="M-10 -5 C35 15 75 10 110 38 C130 52 145 48 160 62" />
                <path d="M48 22 C65 12 80 8 95 -2" strokeWidth="1.2" />
                <path d="M90 28 C105 22 120 26 130 16" strokeWidth="1" />
                <path d="M125 48 C140 42 150 48 158 40" strokeWidth="0.9" />
              </g>

              {/* Top Right Secondary Branch */}
              <g stroke="#4E342E" strokeWidth="1.4" strokeLinecap="round" fill="none">
                <path d="M360 -5 C330 15 305 10 280 32" />
                <path d="M320 12 C305 5 295 0 285 -10" strokeWidth="1" />
              </g>

              {/* Sakura Blossoms Flowers */}
              <g>
                <g transform="translate(110, 38)">
                  <circle cx="0" cy="0" r="5.5" fill="#F48FB1" opacity="0.95"/>
                  <circle cx="0" cy="0" r="3.8" fill="#F8BBD0"/>
                  <circle cx="0" cy="0" r="1.5" fill="#C2185B"/>
                </g>
                <g transform="translate(130, 52)">
                  <circle cx="0" cy="0" r="6.5" fill="#EC407A" opacity="0.9"/>
                  <circle cx="0" cy="0" r="4.2" fill="#F8BBD0"/>
                  <circle cx="0" cy="0" r="1.8" fill="#AD1457"/>
                </g>
                <g transform="translate(95, -2)">
                  <circle cx="0" cy="0" r="5" fill="#F48FB1"/>
                  <circle cx="0" cy="0" r="3.2" fill="#F8BBD0"/>
                </g>
                <g transform="translate(130, 16)">
                  <circle cx="0" cy="0" r="5.5" fill="#F06292"/>
                  <circle cx="0" cy="0" r="3.5" fill="#F8BBD0"/>
                </g>
                <g transform="translate(280, 32)">
                  <circle cx="0" cy="0" r="5.5" fill="#F48FB1"/>
                  <circle cx="0" cy="0" r="3.5" fill="#F8BBD0"/>
                  <circle cx="0" cy="0" r="1.5" fill="#C2185B"/>
                </g>
                <g transform="translate(305, 10)">
                  <circle cx="0" cy="0" r="6" fill="#F06292"/>
                  <circle cx="0" cy="0" r="4" fill="#F8BBD0"/>
                </g>
              </g>

              {/* Falling Petals */}
              <g fill="#F48FB1" opacity="0.8">
                <ellipse cx="145" cy="85" rx="3.2" ry="1.6" transform="rotate(25 145 85)"/>
                <ellipse cx="175" cy="115" rx="2.8" ry="1.3" transform="rotate(-15 175 115)"/>
                <ellipse cx="195" cy="145" rx="2.2" ry="1.1" transform="rotate(40 195 145)"/>
                <ellipse cx="235" cy="130" rx="2.6" ry="1.3" transform="rotate(10 235 130)"/>
              </g>
            </svg>

            {/* Front Card Main Content: School Emblem & Name */}
            <div className="relative z-20 flex flex-col items-center justify-center h-full text-center space-y-2 pt-2">
              
              {/* School Logo Avatar Emblem */}
              <div className="relative p-1 bg-white/80 rounded-full border border-[#C7A35A]/60 shadow-md backdrop-blur-xs">
                <img
                  src="https://res.cloudinary.com/drmpjeatm/image/upload/v1784660941/WhatsApp_Image_2026-07-20_at_12.45.28_AM_d6si5r.jpg"
                  alt="Sakura High Emblem"
                  className="w-12 h-12 rounded-full object-cover border border-[#8B1E2D]/20"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* School Name */}
              <div className="space-y-0.5">
                <h3 className="font-serif text-lg font-extrabold tracking-wider text-[#1C2B40] uppercase">
                  SAKURA HIGH SCHOOL
                </h3>
                <div className="flex items-center justify-center space-x-2 text-[8px] font-mono font-bold text-[#8B1E2D] tracking-widest uppercase">
                  <span className="h-[1px] w-5 bg-[#8B1E2D]/40"></span>
                  <span>CHARACTER • DISCIPLINE • WISDOM</span>
                  <span className="h-[1px] w-5 bg-[#8B1E2D]/40"></span>
                </div>
              </div>

              {/* Website & Estd Line */}
              <div className="pt-1">
                <span className="text-[9px] font-mono text-[#5D738A] tracking-wider uppercase font-semibold bg-white/70 px-2.5 py-0.5 rounded-full border border-[#1C2B40]/10 shadow-2xs">
                  WWW.SAKURAHIGHEXCELLENCE.EDU.BD
                </span>
              </div>
            </div>

            {/* Flip Hint Label */}
            <div className="relative z-20 flex items-center justify-between text-[8px] font-mono text-[#5D738A] font-semibold border-t border-[#1C2B40]/10 pt-1.5 px-1">
              <span>UTTARA, DHAKA • ESTD 2012</span>
              <span className="text-[#8B1E2D] flex items-center space-x-1 group-hover:underline">
                <RotateCw className="w-2.5 h-2.5 animate-spin-slow" />
                <span>Tap to flip</span>
              </span>
            </div>

          </div>

          {/* ==================== BACK SIDE (Teacher Contact Details ONLY) ==================== */}
          <div className="vcard-face vcard-back bg-[#FAF7F2] text-[#1C2B40] relative flex flex-col justify-between p-4 sm:p-5 border border-[#1C2B40]/15 rounded-2xl overflow-hidden shadow-lg">
            
            {/* Background Artwork for Back Side (Matching Oriental Watercolor Style) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 350 215" preserveAspectRatio="none">
              <defs>
                <linearGradient id="backBgGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FAF7F2"/>
                  <stop offset="70%" stopColor="#F5F0E6"/>
                  <stop offset="100%" stopColor="#E5EDF2"/>
                </linearGradient>
                <linearGradient id="backMtnGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4A607A" stopOpacity="0.25"/>
                  <stop offset="100%" stopColor="#8DA4B8" stopOpacity="0.05"/>
                </linearGradient>
              </defs>

              <rect width="350" height="215" fill="url(#backBgGrad)"/>

              {/* Faint Mountain Base */}
              <path d="M0 170 Q60 150 130 168 Q200 145 280 165 L350 178 L350 215 L0 215 Z" fill="url(#backMtnGrad)"/>

              {/* Corner Sakura Blossoms on Back */}
              <g stroke="#4E342E" strokeWidth="1.2" strokeLinecap="round" fill="none">
                <path d="M-5 180 C20 175 40 185 55 195" />
                <path d="M355 10 C335 15 320 8 300 18" />
              </g>
              <g>
                <circle cx="55" cy="195" r="4.5" fill="#F48FB1" opacity="0.8"/>
                <circle cx="300" cy="18" r="4.5" fill="#F48FB1" opacity="0.8"/>
              </g>
            </svg>

            {/* Back Header: School Branding Bar */}
            <div className="relative z-20 flex items-center justify-between border-b border-[#1C2B40]/15 pb-2">
              <div className="flex items-center space-x-1.5">
                <img
                  src="https://res.cloudinary.com/drmpjeatm/image/upload/v1784660941/WhatsApp_Image_2026-07-20_at_12.45.28_AM_d6si5r.jpg"
                  alt="School Crest"
                  className="w-4 h-4 rounded-full object-cover border border-[#C7A35A]"
                  referrerPolicy="no-referrer"
                />
                <span className="font-serif text-[10px] font-bold text-[#1C2B40] uppercase tracking-wider">
                  SAKURA HIGH SCHOOL
                </span>
              </div>
              <span className="text-[8px] font-mono bg-[#8B1E2D] text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                FACULTY VCARD
              </span>
            </div>

            {/* Middle Main Content: Teacher Identity & Contact Info */}
            <div className="relative z-20 grid grid-cols-12 gap-2 items-center my-auto pt-1">
              
              {/* Left Column (9 cols): Teacher Information */}
              <div className="col-span-8 space-y-2">
                <div>
                  <h4 className="font-serif text-sm font-extrabold text-[#1C2B40] leading-tight">
                    {teacher.name}
                  </h4>
                  <p className="text-[9.5px] font-mono font-bold text-[#8B1E2D] uppercase tracking-wide">
                    {teacher.designation}
                  </p>
                  <p className="text-[8.5px] font-sans text-[#5D738A] font-medium">
                    {teacher.subject} Department
                  </p>
                </div>

                {/* Contact Rows */}
                <div className="space-y-1 text-[9px] font-mono text-[#2E4357]">
                  {/* Phone */}
                  <div className="flex items-center justify-between bg-white/80 px-2 py-1 rounded border border-[#1C2B40]/10 shadow-2xs">
                    <div className="flex items-center space-x-1.5 truncate">
                      <Phone className="w-3 h-3 text-[#8B1E2D] shrink-0" />
                      <span className="truncate font-medium">{teacherPhone}</span>
                    </div>
                    <button
                      onClick={(e) => handleCopy(e, teacherPhone, 'phone')}
                      className="p-0.5 hover:text-[#8B1E2D] transition-colors cursor-pointer"
                      title="Copy Phone"
                    >
                      {copiedField === 'phone' ? (
                        <Check className="w-3 h-3 text-green-600" />
                      ) : (
                        <Copy className="w-3 h-3 text-[#5D738A]" />
                      )}
                    </button>
                  </div>

                  {/* Email */}
                  <div className="flex items-center justify-between bg-white/80 px-2 py-1 rounded border border-[#1C2B40]/10 shadow-2xs">
                    <div className="flex items-center space-x-1.5 truncate">
                      <Mail className="w-3 h-3 text-[#8B1E2D] shrink-0" />
                      <span className="truncate font-medium">{teacherEmail}</span>
                    </div>
                    <button
                      onClick={(e) => handleCopy(e, teacherEmail, 'email')}
                      className="p-0.5 hover:text-[#8B1E2D] transition-colors cursor-pointer"
                      title="Copy Email"
                    >
                      {copiedField === 'email' ? (
                        <Check className="w-3 h-3 text-green-600" />
                      ) : (
                        <Copy className="w-3 h-3 text-[#5D738A]" />
                      )}
                    </button>
                  </div>

                  {/* Office Room */}
                  <div className="flex items-center space-x-1.5 bg-white/80 px-2 py-1 rounded border border-[#1C2B40]/10 text-[8.5px] shadow-2xs">
                    <Building2 className="w-3 h-3 text-[#8B1E2D] shrink-0" />
                    <span className="truncate font-medium">Uttara Sec-11, Dhaka • Room {roomNumber}</span>
                  </div>
                </div>
              </div>

              {/* Right Column (4 cols): Teacher Photo & QR Code Badge */}
              <div className="col-span-4 flex flex-col items-center justify-center space-y-1.5 pl-1">
                {/* Teacher Photo */}
                <img
                  src={teacher.imageUrl}
                  alt={teacher.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#8B1E2D] shadow-md bg-white"
                  referrerPolicy="no-referrer"
                />

                {/* QR Code Graphic Box (Like reference image) */}
                <div className="bg-white p-1 rounded-md border border-[#1C2B40]/20 shadow-2xs text-center">
                  <QrCode className="w-7 h-7 text-[#1C2B40]" />
                  <span className="text-[6.5px] font-mono text-[#5D738A] block uppercase font-bold tracking-tight">
                    SCAN VCARD
                  </span>
                </div>
              </div>

            </div>

            {/* Back Footer Bar */}
            <div className="relative z-20 flex items-center justify-between text-[7.5px] font-mono text-[#5D738A] border-t border-[#1C2B40]/15 pt-1.5 px-0.5">
              <span>STAFF ID: SHS-FAC-{teacher.id.split('-')[1]}</span>
              <span className="font-bold text-[#8B1E2D]">VERIFIED FACULTY</span>
            </div>

          </div>

        </div>
      </div>

      {/* CARD ACTION TOOLBAR */}
      <div className="flex items-center space-x-2 pt-1">
        {/* Flip Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFlipped(!isFlipped);
          }}
          className="px-3.5 py-1.5 rounded-lg bg-[#8B1E2D] hover:bg-[#6D1521] text-white text-[10px] font-mono font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-sm transition-all border border-[#C7A35A]/40 cursor-pointer"
        >
          <RotateCw className={`w-3 h-3 text-[#F4D9DE] transition-transform duration-500 ${isFlipped ? 'rotate-180' : ''}`} />
          <span>{isFlipped ? 'Show Front Logo' : 'Flip Visiting Card'}</span>
        </button>

        {/* Copy Contact Info */}
        <button
          onClick={(e) => handleCopy(e, `${teacher.name}\n${teacher.designation}\nPhone: ${teacherPhone}\nEmail: ${teacherEmail}\nSakura High School, Uttara, Dhaka`, 'all')}
          className="px-3 py-1.5 rounded bg-white hover:bg-gray-50 text-[#222222] text-[10px] font-mono font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-2xs transition-all border border-gray-300 cursor-pointer"
        >
          {copiedField === 'all' ? (
            <>
              <Check className="w-3 h-3 text-green-600" />
              <span className="text-green-600">Copied VCard</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-[#8B1E2D]" />
              <span>Copy Contact</span>
            </>
          )}
        </button>

        {/* Print / Save Card */}
        <button
          onClick={handlePrint}
          className="p-1.5 rounded bg-white hover:bg-gray-50 text-[#7A746D] hover:text-[#8B1E2D] border border-gray-300 transition-colors cursor-pointer"
          title="Print / Save Visiting Card"
        >
          <Printer className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
