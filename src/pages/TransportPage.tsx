import React, { useState } from 'react';
import {
  Bus,
  Clock,
  Phone,
  MapPin,
  ShieldCheck,
  AlertCircle,
  Users,
  Navigation,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import SectionAtmosphere from '../components/SectionAtmosphere';
import SecondaryPageHeader from '../components/SecondaryPageHeader';
import { TRANSPORT_OFFICE_INFO, BUS_ROUTES } from '../universityData';
import { BusRoute } from '../types';

export default function TransportPage() {
  const [selectedRouteId, setSelectedRouteId] = useState<string>(BUS_ROUTES[0].id);

  const activeRoute = BUS_ROUTES.find((r) => r.id === selectedRouteId) || BUS_ROUTES[0];

  return (
    <div className="min-h-screen bg-[#EFF6F2] pb-24 text-[#163A2D]">
      <SectionAtmosphere variant="light" />

      {/* Sticky Top Header */}
      <SecondaryPageHeader
        currentPageTitle="Campus Transport & Bus Routes"
        category="Campus Logistics"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-4">
        {/* Hero Section inspired by MIST & BUP Transport Portals */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-[#EAF2ED] border border-[#D0E4DA] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-widest text-[#163A2D] mb-3.5 rounded shadow-xs">
            <Bus className="w-4 h-4 text-[#FAD02C]" />
            <span>Complimentary Daily Student & Faculty Shuttle Network</span>
          </div>
          <h1 className="font-sans text-3xl sm:text-5xl font-black text-[#163A2D] uppercase tracking-tight mb-3">
            Campus Transport Schedules
          </h1>
          <p className="text-[#4E7D68] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {TRANSPORT_OFFICE_INFO.fleetSummary} Free transport with valid CCNUST Student ID card.
          </p>

          {/* Quick Transport Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 pt-2">
            {TRANSPORT_OFFICE_INFO.features.map((feat, i) => (
              <span
                key={i}
                className="text-[11px] font-mono font-bold bg-white border border-[#D0E4DA] text-slate-700 px-2.5 py-1 rounded-md shadow-xs flex items-center space-x-1"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>{feat}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Route Selector Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {BUS_ROUTES.map((route) => {
            const isSelected = route.id === selectedRouteId;
            return (
              <button
                key={route.id}
                type="button"
                onClick={() => setSelectedRouteId(route.id)}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer shadow-sm ${
                  isSelected
                    ? 'bg-[#163A2D] text-white border-[#FAD02C] shadow-lg -translate-y-0.5'
                    : 'bg-white text-slate-800 border-[#163A2D]/30 hover:border-[#163A2D]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      isSelected ? 'bg-[#FAD02C] text-[#163A2D]' : 'bg-[#EAF2ED] text-[#163A2D]'
                    }`}
                  >
                    {route.routeNumber}
                  </span>
                  <Bus className={`w-4 h-4 ${isSelected ? 'text-[#FAD02C]' : 'text-[#163A2D]'}`} />
                </div>
                <h3 className={`font-sans font-black text-sm ${isSelected ? 'text-white' : 'text-slate-900'} leading-snug`}>
                  {route.routeName}
                </h3>
                <div className={`text-[11px] font-mono mt-1 ${isSelected ? 'text-[#D0E4DA]' : 'text-slate-500'}`}>
                  {route.busNumber}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Route Deep-Dive Card */}
        <div className="bg-white border-2 border-[#163A2D] rounded-3xl p-6 sm:p-8 shadow-xl mb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#D0E4DA]">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest bg-[#163A2D] text-[#FAD02C] px-3 py-1 rounded">
                {activeRoute.routeNumber} DETAILS
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-sans text-slate-900 mt-2">
                {activeRoute.routeName}
              </h2>
              <div className="flex items-center space-x-2 text-xs font-mono text-[#4E7D68] mt-1">
                <span>Start: <strong>{activeRoute.startPoint}</strong></span>
                <span>&rarr;</span>
                <span>Terminus: <strong>{activeRoute.endPoint}</strong></span>
              </div>
            </div>

            <div className="bg-[#FAF8F5] border border-[#D0E4DA] rounded-xl p-3 font-mono text-xs space-y-1">
              <div>Bus Vehicle: <strong className="text-[#163A2D]">{activeRoute.busNumber}</strong></div>
              <div>Seating Capacity: <strong>{activeRoute.capacity} Seats</strong> • <span className="text-emerald-700 font-bold">{activeRoute.fareStatus}</span></div>
            </div>
          </div>

          {/* Schedule Timing Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6 font-mono text-xs">
            {/* Morning Inbound */}
            <div className="bg-[#FAF8F5] border-2 border-[#163A2D] rounded-2xl p-4 sm:p-5 shadow-xs">
              <div className="flex items-center space-x-2 mb-3">
                <Clock className="w-4 h-4 text-[#163A2D]" />
                <h4 className="font-sans font-black text-xs uppercase tracking-wider text-slate-900">
                  Morning Inbound to Campus
                </h4>
              </div>
              <ul className="space-y-2">
                {activeRoute.morningDeparture.map((time, idx) => (
                  <li key={idx} className="flex items-center justify-between p-2 rounded bg-white border border-[#D0E4DA]">
                    <span className="text-slate-600">Trip #{idx + 1}</span>
                    <strong className="text-[#163A2D] text-sm">{time}</strong>
                  </li>
                ))}
              </ul>
            </div>

            {/* Midday Return */}
            <div className="bg-[#FAF8F5] border-2 border-[#163A2D] rounded-2xl p-4 sm:p-5 shadow-xs">
              <div className="flex items-center space-x-2 mb-3">
                <Clock className="w-4 h-4 text-amber-700" />
                <h4 className="font-sans font-black text-xs uppercase tracking-wider text-slate-900">
                  Midday Return / Interchange
                </h4>
              </div>
              <ul className="space-y-2">
                {activeRoute.middayDeparture.map((time, idx) => (
                  <li key={idx} className="flex items-center justify-between p-2 rounded bg-white border border-[#D0E4DA]">
                    <span className="text-slate-600">Trip #{idx + 1}</span>
                    <strong className="text-[#163A2D] text-sm">{time}</strong>
                  </li>
                ))}
              </ul>
            </div>

            {/* Evening Outbound */}
            <div className="bg-[#FAF8F5] border-2 border-[#163A2D] rounded-2xl p-4 sm:p-5 shadow-xs">
              <div className="flex items-center space-x-2 mb-3">
                <Clock className="w-4 h-4 text-emerald-800" />
                <h4 className="font-sans font-black text-xs uppercase tracking-wider text-slate-900">
                  Afternoon & Night Shuttles
                </h4>
              </div>
              <ul className="space-y-2">
                {activeRoute.eveningReturn.map((time, idx) => (
                  <li key={idx} className="flex items-center justify-between p-2 rounded bg-white border border-[#D0E4DA]">
                    <span className="text-slate-600">Departure</span>
                    <strong className="text-[#163A2D] text-sm">{time}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Via Stops Ordered Timeline */}
          <div className="bg-[#FAF8F5] border border-[#D0E4DA] rounded-2xl p-5 mb-6">
            <h4 className="font-sans font-black text-xs text-[#163A2D] uppercase tracking-wider mb-3 flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#FAD02C]" />
              <span>Route Pickup & Drop-Off Points (Chronological)</span>
            </h4>
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              {activeRoute.viaPoints.map((point, idx) => (
                <React.Fragment key={idx}>
                  <div className="bg-white border border-slate-300 px-3 py-1.5 rounded-lg font-bold text-slate-800 shadow-xs flex items-center space-x-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#163A2D] text-[#FAD02C] text-[10px] flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span>{point}</span>
                  </div>
                  {idx < activeRoute.viaPoints.length - 1 && (
                    <span className="text-slate-400 font-bold">&rarr;</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Assigned Driver & Transport Supervisor Hotlines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs pt-2">
            <div className="bg-white border border-[#D0E4DA] rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-slate-400 block">Assigned Bus Driver</span>
                <span className="font-bold text-slate-900 text-sm">{activeRoute.driverName}</span>
                <div className="text-slate-500 text-[11px] mt-0.5">{activeRoute.driverPhone}</div>
              </div>
              <a
                href={`tel:${activeRoute.driverPhone.replace(/[^0-9+]/g, '')}`}
                className="px-3 py-1.5 rounded-lg bg-[#163A2D] hover:bg-[#0D241C] text-[#FAD02C] font-bold flex items-center space-x-1 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Driver</span>
              </a>
            </div>

            <div className="bg-white border border-[#D0E4DA] rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-slate-400 block">Route Student Supervisor</span>
                <span className="font-bold text-slate-900 text-sm">{activeRoute.supervisorName}</span>
                <div className="text-slate-500 text-[11px] mt-0.5">{activeRoute.supervisorPhone}</div>
              </div>
              <a
                href={`tel:${activeRoute.supervisorPhone.replace(/[^0-9+]/g, '')}`}
                className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#163A2D] text-[#163A2D] hover:text-[#FAD02C] border border-[#D0E4DA] font-bold flex items-center space-x-1 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Supervisor</span>
              </a>
            </div>
          </div>
        </div>

        {/* Transport Officer Contact & Guidelines */}
        <div className="bg-[#163A2D] text-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-[#163A2D]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#FAD02C] font-bold">
                CENTRAL TRANSPORT SECRETARIAT
              </span>
              <h3 className="text-xl font-sans font-black">
                {TRANSPORT_OFFICE_INFO.office}
              </h3>
              <p className="text-xs text-[#D0E4DA] font-mono leading-relaxed">
                {TRANSPORT_OFFICE_INFO.location}. For route diversion notices, lost & found items on buses, or special shuttle requests during university events, contact the Transport In-Charge directly.
              </p>
              <div className="pt-2 font-mono text-xs space-y-1">
                <div>Transport Officer: <strong>{TRANSPORT_OFFICE_INFO.transportOfficer}</strong></div>
                <div>Telephone Hotline: <strong>{TRANSPORT_OFFICE_INFO.phone}</strong></div>
                <div>Official Email: <strong>{TRANSPORT_OFFICE_INFO.email}</strong></div>
              </div>
            </div>

            <div className="bg-[#0F281E] border border-[#21513F] rounded-2xl p-5 space-y-3 font-mono text-xs">
              <h4 className="font-bold text-[#FAD02C] uppercase text-xs">
                Passenger Code of Conduct
              </h4>
              <ul className="space-y-1.5 text-slate-300">
                <li className="flex items-start space-x-1.5">
                  <span className="text-[#FAD02C] font-bold">•</span>
                  <span>Students must show their official CCNUST ID Card upon boarding.</span>
                </li>
                <li className="flex items-start space-x-1.5">
                  <span className="text-[#FAD02C] font-bold">•</span>
                  <span>Front 4 rows are strictly reserved for female students and faculty.</span>
                </li>
                <li className="flex items-start space-x-1.5">
                  <span className="text-[#FAD02C] font-bold">•</span>
                  <span>Buses depart on the exact schedule; arrive 5 minutes in advance.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
