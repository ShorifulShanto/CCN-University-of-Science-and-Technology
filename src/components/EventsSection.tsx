import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  Award,
  CheckCircle,
  X,
} from 'lucide-react';
import { UNIVERSITY_EVENTS } from '../universityData';
import { UniversityEvent } from '../types';

export default function EventsSection() {
  const [activeEventModal, setActiveEventModal] = useState<UniversityEvent | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  return (
    <section id="events" className="py-20 bg-white border-b border-[#DCEBE3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="institutional-badge mb-2">
              <span>Campus Happenings</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17342B] tracking-tight">
              Upcoming Conferences & Campus Events
            </h2>
            <p className="text-[#4A6E60] text-sm sm:text-base mt-2 max-w-2xl">
              Engage in inter-university programming contests, research symposiums, legal moot courts, and cultural festivals.
            </p>
          </div>
        </div>

        {/* Events Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {UNIVERSITY_EVENTS.map((event) => (
            <div
              key={event.id}
              className="bg-[#F8FAF8] border border-[#DCEBE3] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#FDE047] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-3 left-3 bg-[#264E41]/90 backdrop-blur-xs text-[#FEF08A] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {event.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-2 text-xs text-slate-500 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-[#264E41]" />
                    <span>{event.date}</span>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{event.time}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#17342B] group-hover:text-[#264E41] transition-colors mb-2 leading-snug">
                    {event.title}
                  </h3>

                  <p className="text-xs text-[#4A6E60] leading-relaxed mb-4 line-clamp-3">
                    {event.description}
                  </p>

                  <div className="flex items-center space-x-1.5 text-xs text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{event.venue}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => {
                    setActiveEventModal(event);
                    setRegistrationSuccess(false);
                  }}
                  className="w-full bg-[#264E41] hover:bg-[#1E3F35] text-white font-semibold text-xs py-2.5 rounded-lg transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>Event Details & Registration</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Event Detail & Registration Modal */}
        {activeEventModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#DCEBE3] relative animate-in zoom-in-95 duration-150">
              <button
                onClick={() => setActiveEventModal(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-44 rounded-xl overflow-hidden mb-4 relative">
                <img
                  src={activeEventModal.image}
                  alt={activeEventModal.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center space-x-2 text-xs text-[#854D0E] font-bold uppercase tracking-wider mb-1">
                <span>{activeEventModal.category}</span>
                <span>•</span>
                <span>{activeEventModal.date}</span>
              </div>

              <h2 className="font-serif text-xl font-bold text-[#17342B] mb-2">
                {activeEventModal.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {activeEventModal.description}
              </p>

              <div className="bg-[#F8FAF8] border border-[#DCEBE3] rounded-xl p-3.5 mb-6 text-xs text-slate-700 space-y-1.5">
                <div className="flex items-center space-x-2">
                  <Clock className="w-3.5 h-3.5 text-[#264E41]" />
                  <span>Time: <strong>{activeEventModal.time}</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-[#264E41]" />
                  <span>Venue: <strong>{activeEventModal.venue}</strong></span>
                </div>
              </div>

              {registrationSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center text-emerald-800 text-xs">
                  <CheckCircle className="w-6 h-6 mx-auto mb-1 text-emerald-600" />
                  <div className="font-bold text-sm">Registration Confirmed!</div>
                  <p className="mt-0.5">We have registered your seat. A confirmation pass has been noted.</p>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setRegistrationSuccess(true)}
                    className="flex-1 bg-[#264E41] hover:bg-[#1E3F35] text-[#FEF08A] font-bold text-xs py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Confirm Free Participation Seat
                  </button>
                  <button
                    onClick={() => setActiveEventModal(null)}
                    className="px-4 py-2.5 border border-[#DCEBE3] text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
