import React, { useState, useMemo } from 'react';
import {
  Bell,
  Search,
  Calendar,
  Download,
  AlertCircle,
  FileText,
  ChevronRight,
  ExternalLink,
  X,
  Plus,
  Trash2,
  Edit,
  ShieldAlert,
  Award,
} from 'lucide-react';
import { useCmsData } from '../lib/useCmsData';
import { Notice } from '../types';
import { ServiceModalTab } from './CCNUSTServicesModal';

interface NoticeBoardProps {
  isAdmin?: boolean;
  onOpenAdminPanel?: () => void;
  onOpenServiceModal?: (tab: ServiceModalTab) => void;
}

export default function NoticeBoard({ isAdmin = false, onOpenAdminPanel, onOpenServiceModal }: NoticeBoardProps) {
  const { notices, deleteNotice } = useCmsData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNoticeModal, setActiveNoticeModal] = useState<Notice | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [downloadedNoticeId, setDownloadedNoticeId] = useState<string | null>(null);

  const handleDownloadCircular = (notice: Notice) => {
    const body = `CCN UNIVERSITY OF SCIENCE & TECHNOLOGY (CCNUST)\nKotbari, Cumilla-3500, Bangladesh\n\nOFFICIAL NOTICE CIRCULAR\nCategory: ${notice.category.toUpperCase()}\nPublished: ${notice.publishDate}\nTitle: ${notice.title}\n\n${notice.content}\n\nIssued by: Office of the Registrar, CCNUST\n`;
    const blob = new Blob([body], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CCNUST_Notice_${notice.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadedNoticeId(notice.id);
    setTimeout(() => setDownloadedNoticeId(null), 3000);
  };

  const filteredNotices = useMemo(() => {
    const cleanSearch = searchQuery.trim().toLowerCase();
    return notices.filter((notice) => {
      const matchesSearch =
        !cleanSearch ||
        notice.title.toLowerCase().includes(cleanSearch) ||
        notice.content.toLowerCase().includes(cleanSearch);
      const matchesCategory =
        selectedCategory === 'all' || notice.category.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [notices, searchQuery, selectedCategory]);

  return (
    <section id="notices" className="py-20 bg-gradient-to-b from-[#F2F7F4] via-[#ECF4EF] to-[#E8F1EB] border-b border-[#CFE2D7] relative overflow-hidden">
      <div className="ccn-bg-grid-masked absolute inset-0 pointer-events-none opacity-60" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="institutional-badge mb-2">
              <span>Official Circulars</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17342B] tracking-tight">
              University Notice Board & Announcements
            </h2>
            <p className="text-[#4A6E60] text-sm sm:text-base mt-2 max-w-2xl">
              Stay up-to-date with official academic circulars, semester final examination routines, and admissions updates.
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={onOpenAdminPanel}
              className="bg-[#264E41] hover:bg-[#1E3F35] text-[#FEF08A] border border-[#264E41] px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-sm cursor-pointer transition-all duration-200 hover:scale-102 active:scale-98"
            >
              <Plus className="w-4 h-4 text-[#FEF08A]" />
              <span>Admin: Add / Manage Notices</span>
            </button>
          )}
        </div>

        {/* Quick Links from ccnust.ac.bd */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6 font-mono text-xs">
          <button
            type="button"
            onClick={() => onOpenServiceModal?.('routine')}
            className="p-3 bg-white border border-[#DCEBE3] hover:border-emerald-600 rounded-xl text-left transition-all hover:-translate-y-0.5 cursor-pointer shadow-xs group"
          >
            <span className="text-[10px] text-emerald-800 font-bold uppercase block group-hover:text-emerald-600">
              CCN-UST Quick Links
            </span>
            <span className="font-bold text-slate-900 block mt-0.5">
              📅 All Routine & Schedules &rarr;
            </span>
          </button>

          <button
            type="button"
            onClick={() => onOpenServiceModal?.('result')}
            className="p-3 bg-white border border-[#DCEBE3] hover:border-purple-600 rounded-xl text-left transition-all hover:-translate-y-0.5 cursor-pointer shadow-xs group"
          >
            <span className="text-[10px] text-purple-800 font-bold uppercase block group-hover:text-purple-600">
              Exam Controller
            </span>
            <span className="font-bold text-slate-900 block mt-0.5">
              🏆 Search Semester Result &rarr;
            </span>
          </button>

          <button
            type="button"
            onClick={() => onOpenServiceModal?.('verification')}
            className="p-3 bg-white border border-[#DCEBE3] hover:border-rose-600 rounded-xl text-left transition-all hover:-translate-y-0.5 cursor-pointer shadow-xs group"
          >
            <span className="text-[10px] text-rose-800 font-bold uppercase block group-hover:text-rose-600">
              Registrar Office
            </span>
            <span className="font-bold text-slate-900 block mt-0.5">
              🛡️ Student Verification &rarr;
            </span>
          </button>

          <a
            href="#admission"
            className="p-3 bg-white border border-[#DCEBE3] hover:border-emerald-600 rounded-xl text-left transition-all hover:-translate-y-0.5 cursor-pointer shadow-xs group block"
          >
            <span className="text-[10px] text-emerald-800 font-bold uppercase block group-hover:text-emerald-600">
              Admission Office
            </span>
            <span className="font-bold text-slate-900 block mt-0.5">
              🎓 Fall 2026 Admissions &rarr;
            </span>
          </a>
        </div>

        {/* Filters & Search */}
        <div className="bg-white border border-[#DCEBE3] rounded-2xl p-4 sm:p-5 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {['all', 'admission', 'academic', 'examination', 'administrative'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#264E41] text-white shadow-sm'
                      : 'bg-[#EFF6F2] text-[#32574A] hover:bg-[#DCEBE3]'
                  }`}
                >
                  {cat === 'all' ? 'All Notices' : cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search notices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-[#F8FAF8] border border-[#DCEBE3] rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#FEF08A]"
              />
            </div>
          </div>
        </div>

        {/* Notices List */}
        <div className="space-y-3">
          {filteredNotices.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center text-slate-500 text-sm border border-[#DCEBE3]">
              No circulars found matching your criteria.
            </div>
          ) : (
            filteredNotices.map((notice) => (
              <div
                key={notice.id}
                onClick={() => setActiveNoticeModal(notice)}
                className="bg-white border border-[#DCEBE3] hover:border-[#FDE047] rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start space-x-4">
                  {/* Date Block */}
                  <div className="w-14 h-14 rounded-lg bg-[#EFF6F2] border border-[#DCEBE3] flex flex-col items-center justify-center text-center shrink-0 group-hover:bg-[#FEFCE8] group-hover:border-[#FEF08A] transition-colors">
                    <span className="text-[10px] uppercase font-bold text-[#4A6E60]">
                      {notice.publishDate.split(' ')[0]}
                    </span>
                    <span className="text-base font-bold text-[#17342B] leading-none">
                      {notice.publishDate.split(' ')[1]?.replace(',', '')}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#854D0E] bg-[#FEFCE8] border border-[#FEF08A] px-2 py-0.5 rounded font-mono">
                        {notice.category}
                      </span>
                      {notice.important && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                          Urgent Notice
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-sm sm:text-base font-bold text-[#17342B] group-hover:text-[#264E41] transition-colors">
                      {notice.title}
                    </h3>

                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                      {notice.content}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 shrink-0 self-end sm:self-center">
                  {isAdmin && (
                    confirmDeleteId === notice.id ? (
                      <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotice(notice.id);
                            setConfirmDeleteId(null);
                          }}
                          className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-mono font-bold rounded cursor-pointer"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setConfirmDeleteId(null);
                          }}
                          className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-mono font-bold rounded cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmDeleteId(notice.id);
                        }}
                        className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                        title="Admin Delete Notice"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveNoticeModal(notice);
                    }}
                    className="text-xs font-semibold text-[#32574A] hover:text-[#17342B] flex items-center space-x-1"
                  >
                    <span>Read Notice</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Notice Details Modal */}
        {activeNoticeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#DCEBE3] relative animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setActiveNoticeModal(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2 mb-3">
                <span className="text-xs font-bold text-[#854D0E] bg-[#FEFCE8] border border-[#FEF08A] px-2.5 py-0.5 rounded font-mono uppercase">
                  {activeNoticeModal.category}
                </span>
                <span className="text-xs text-slate-500 flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Published on {activeNoticeModal.publishDate}</span>
                </span>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#17342B] mb-4 leading-snug">
                {activeNoticeModal.title}
              </h2>

              <div className="bg-[#F8FAF8] border border-[#DCEBE3] rounded-xl p-5 text-slate-700 text-xs sm:text-sm leading-relaxed mb-6 whitespace-pre-line">
                {activeNoticeModal.content}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
                <div className="text-xs text-slate-500 font-mono">
                  Issued by: Registrar Office, CCNUST
                </div>
                <button
                  type="button"
                  onClick={() => handleDownloadCircular(activeNoticeModal)}
                  className="bg-[#264E41] hover:bg-[#1E3F35] text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#FEF08A]" />
                  <span>
                    {downloadedNoticeId === activeNoticeModal.id
                      ? 'Circular Downloaded!'
                      : 'Download Official Circular'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
