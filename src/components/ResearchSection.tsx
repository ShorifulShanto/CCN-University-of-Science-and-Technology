import React, { useState, useMemo, useCallback } from 'react';
import {
  FlaskConical,
  BookOpen,
  Award,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Users,
  CheckCircle2,
  FileText,
  TrendingUp,
  X,
  Search,
  Layers,
  ArrowRight,
} from 'lucide-react';
import {
  ONGOING_RESEARCH_PROJECTS,
  RECENT_PUBLICATIONS,
  RESEARCH_METRICS,
  ResearchProject,
  UniversityPublication,
} from '../data/researchData';

export default function ResearchSection() {
  const [activeTab, setActiveTab] = useState<'projects' | 'publications'>('projects');
  const [projectIndex, setProjectIndex] = useState(0);
  const [publicationIndex, setPublicationIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ResearchProject | null>(null);
  const [selectedPublication, setSelectedPublication] = useState<UniversityPublication | null>(null);
  const [filterDept, setFilterDept] = useState<string>('ALL');

  // Filtered lists
  const filteredProjects = useMemo(() => {
    if (filterDept === 'ALL') return ONGOING_RESEARCH_PROJECTS;
    return ONGOING_RESEARCH_PROJECTS.filter((p) => p.deptCode === filterDept);
  }, [filterDept]);

  const filteredPublications = useMemo(() => {
    if (filterDept === 'ALL') return RECENT_PUBLICATIONS;
    return RECENT_PUBLICATIONS.filter((p) => p.deptCode === filterDept);
  }, [filterDept]);

  // Safe navigation handlers
  const handlePrevProject = useCallback(() => {
    setProjectIndex((prev) => (prev > 0 ? prev - 1 : Math.max(0, filteredProjects.length - 1)));
  }, [filteredProjects.length]);

  const handleNextProject = useCallback(() => {
    setProjectIndex((prev) => (prev < filteredProjects.length - 1 ? prev + 1 : 0));
  }, [filteredProjects.length]);

  const handlePrevPub = useCallback(() => {
    setPublicationIndex((prev) => (prev > 0 ? prev - 1 : Math.max(0, filteredPublications.length - 1)));
  }, [filteredPublications.length]);

  const handleNextPub = useCallback(() => {
    setPublicationIndex((prev) => (prev < filteredPublications.length - 1 ? prev + 1 : 0));
  }, [filteredPublications.length]);

  return (
    <section id="research" className="py-20 bg-gradient-to-b from-[#F2F7F4] via-[#ECF4EF] to-[#E8F1EB] border-b border-[#CFE2D7] relative overflow-hidden">
      {/* Subtle Masked Architectural Grid */}
      <div className="ccn-bg-grid-masked absolute inset-0 pointer-events-none opacity-65" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#163A2D] bg-[#FAFDFB] border border-[#21513F]/20 px-3 py-1 rounded-full uppercase tracking-wider">
              <FlaskConical className="w-3.5 h-3.5 text-[#163A2D]" />
              <span>Center for Advanced Research & Innovation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-sans font-black text-slate-900 uppercase tracking-tight mt-3">
              Research & University Publications
            </h2>
            <p className="text-sm font-mono text-slate-600 mt-1 max-w-2xl">
              Fostering outcome-driven technological inquiry, Scopus-indexed faculty publications, and UGC-funded interdisciplinary grants addressing national and industrial challenges.
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 self-start md:self-auto shrink-0">
            {RESEARCH_METRICS.map((metric, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-[#163A2D] p-3 rounded-xl shadow-xs text-center min-w-[105px]"
              >
                <div className="text-lg font-sans font-black text-[#163A2D] leading-none">
                  {metric.value}
                </div>
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-800 mt-1">
                  {metric.label}
                </div>
                <div className="text-[9px] font-mono text-slate-500 truncate mt-0.5">
                  {metric.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View Switcher Bar & Department Quick Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 bg-white border-2 border-[#163A2D] p-2.5 rounded-2xl shadow-sm">
          {/* Main Tabs */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-[#163A2D] text-[#FAD02C] shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <FlaskConical className="w-4 h-4" />
              <span>Ongoing Projects ({ONGOING_RESEARCH_PROJECTS.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('publications')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'publications'
                  ? 'bg-[#163A2D] text-[#FAD02C] shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Recent Publications ({RECENT_PUBLICATIONS.length})</span>
            </button>
          </div>

          {/* Department Filter Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 text-[11px] font-mono">
            <span className="text-slate-400 mr-1 hidden lg:inline">Filter:</span>
            {['ALL', 'CSE', 'CE', 'EEE', 'LAW', 'DBA'].map((code) => (
              <button
                key={code}
                onClick={() => {
                  setFilterDept(code);
                  setProjectIndex(0);
                  setPublicationIndex(0);
                }}
                className={`px-2.5 py-1 rounded-lg font-bold uppercase transition-colors cursor-pointer ${
                  filterDept === code
                    ? 'bg-[#FAD02C] text-[#163A2D] font-black'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>

        {/* =========================================================================
            TAB 1: ONGOING RESEARCH PROJECTS CAROUSEL (Lightweight & Hardware Accelerated)
            ========================================================================= */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {/* Carousel Container */}
            <div className="relative">
              {filteredProjects.length === 0 ? (
                <div className="p-12 text-center bg-white border-2 border-dashed border-slate-300 rounded-2xl">
                  <p className="text-slate-500 font-mono text-sm">No research projects match this filter.</p>
                </div>
              ) : (
                <div className="overflow-hidden rounded-2xl">
                  {/* Sliding Track using GPU transform */}
                  <div
                    className="flex transition-transform duration-500 ease-out will-change-transform"
                    style={{ transform: `translate3d(-${projectIndex * 100}%, 0, 0)` }}
                  >
                    {filteredProjects.map((proj) => (
                      <div key={proj.id} className="w-full shrink-0 px-0.5">
                        <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow">
                          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
                            {/* Left Content */}
                            <div className="flex-1 space-y-4">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="px-2.5 py-1 bg-[#163A2D] text-[#FAD02C] font-mono font-bold text-xs uppercase tracking-wider rounded-md">
                                  {proj.deptCode}
                                </span>
                                <span className="px-2.5 py-1 bg-amber-100 text-amber-900 border border-amber-300 font-mono font-bold text-xs uppercase rounded-md">
                                  {proj.status}
                                </span>
                                <span className="text-xs font-mono text-slate-500">
                                  Duration: {proj.duration}
                                </span>
                              </div>

                              <h3 className="text-xl sm:text-2xl font-sans font-black text-slate-900 leading-snug">
                                {proj.title}
                              </h3>

                              <p className="text-xs sm:text-sm font-mono text-slate-700 leading-relaxed line-clamp-3">
                                {proj.abstract}
                              </p>

                              {/* Lead Investigator & Team */}
                              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4 text-xs font-mono border-t border-slate-100">
                                <div>
                                  <span className="text-slate-500">Principal Investigator:</span>{' '}
                                  <span className="font-bold text-[#163A2D]">{proj.leadResearcher}</span>
                                  <span className="text-slate-500 text-[11px] block sm:inline sm:ml-1">
                                    ({proj.researcherDesignation})
                                  </span>
                                </div>
                                <div className="sm:ml-auto flex items-center space-x-1.5 text-slate-500">
                                  <Users className="w-3.5 h-3.5" />
                                  <span>{proj.team.length + 1} Researchers</span>
                                </div>
                              </div>

                              {/* Tags */}
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {proj.tags.map((t, idx) => (
                                  <span
                                    key={idx}
                                    className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200"
                                  >
                                    #{t}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Right Sidebar: Grant & Progress Details */}
                            <div className="w-full lg:w-72 bg-[#FAF8F5] border-2 border-slate-200 rounded-xl p-5 shrink-0 flex flex-col justify-between space-y-4">
                              <div>
                                <div className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-wider">
                                  Research Allocation
                                </div>
                                <div className="text-2xl font-sans font-black text-[#163A2D] mt-0.5">
                                  {proj.grantAmount}
                                </div>
                                <div className="text-[11px] font-mono text-slate-600 mt-1 line-clamp-2">
                                  {proj.grantAgency}
                                </div>
                              </div>

                              <div>
                                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                                  <span className="text-slate-600 font-bold">Investigation Progress</span>
                                  <span className="text-[#163A2D] font-black">{proj.progress}%</span>
                                </div>
                                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-emerald-600 rounded-full transition-all duration-700"
                                    style={{ width: `${proj.progress}%` }}
                                  />
                                </div>
                                <div className="text-[10px] font-mono text-emerald-800 font-bold mt-1.5 flex items-center space-x-1">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                  <span>{proj.highlightStat}</span>
                                </div>
                              </div>

                              <button
                                onClick={() => setSelectedProject(proj)}
                                className="w-full py-2.5 bg-[#163A2D] hover:bg-[#0D241C] text-[#FAD02C] font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
                              >
                                <span>Project Dossier & Abstract</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Carousel Controls */}
            {filteredProjects.length > 1 && (
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2">
                  {filteredProjects.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setProjectIndex(i)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        projectIndex === i ? 'w-8 bg-[#163A2D]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                  <span className="text-xs font-mono text-slate-500 ml-2">
                    {projectIndex + 1} of {filteredProjects.length}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrevProject}
                    className="p-2.5 bg-white hover:bg-slate-100 text-[#163A2D] border-2 border-[#163A2D] rounded-xl transition-colors cursor-pointer shadow-xs"
                    aria-label="Previous project"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextProject}
                    className="p-2.5 bg-[#163A2D] hover:bg-[#0D241C] text-[#FAD02C] border-2 border-[#163A2D] rounded-xl transition-colors cursor-pointer shadow-xs"
                    aria-label="Next project"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 2: RECENT PUBLICATIONS CAROUSEL (Fast, Clean, Citation Ready)
            ========================================================================= */}
        {activeTab === 'publications' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPublications.map((pub) => (
                <div
                  key={pub.id}
                  className="bg-white border-2 border-slate-200 hover:border-[#163A2D] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                        {pub.indexing}
                      </span>
                      <span className="text-xs font-mono text-slate-500 font-bold">
                        {pub.month} {pub.year}
                      </span>
                    </div>

                    <h4 className="font-sans font-bold text-slate-900 text-base leading-snug line-clamp-3">
                      {pub.title}
                    </h4>

                    <p className="text-xs font-mono text-[#163A2D] font-bold">
                      {pub.journal}
                    </p>

                    <div className="text-[11px] font-mono text-slate-600">
                      <span className="text-slate-400">Authors:</span> {pub.authors.join(', ')}
                    </div>

                    <p className="text-xs font-mono text-slate-500 line-clamp-3 leading-relaxed">
                      {pub.abstract}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-[11px] font-mono text-slate-500">
                      <span className="font-bold text-[#163A2D]">{pub.citations}</span> Citations
                    </div>
                    <button
                      onClick={() => setSelectedPublication(pub)}
                      className="text-xs font-mono font-bold text-[#163A2D] hover:text-[#0D241C] underline flex items-center space-x-1 cursor-pointer"
                    >
                      <span>Abstract & DOI</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Light Modal: Project Details */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl border-2 border-[#163A2D] overflow-hidden p-6 sm:p-8 space-y-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-[#FAD02C] bg-[#163A2D] px-2.5 py-1 rounded">
                    {selectedProject.deptCode} • {selectedProject.status}
                  </span>
                  <h3 className="text-xl font-sans font-black text-slate-900 uppercase mt-2">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-xs font-mono text-slate-600 space-y-1 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="font-bold text-[#163A2D]">Principal Investigator:</span>{' '}
                  {selectedProject.leadResearcher} ({selectedProject.researcherDesignation})
                </div>
                <div>
                  <span className="font-bold text-[#163A2D]">Research Team:</span>{' '}
                  {selectedProject.team.join(', ')}
                </div>
                <div>
                  <span className="font-bold text-[#163A2D]">Grant Agency:</span>{' '}
                  {selectedProject.grantAgency} ({selectedProject.grantAmount})
                </div>
                <div>
                  <span className="font-bold text-[#163A2D]">Investigation Period:</span>{' '}
                  {selectedProject.duration}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase text-slate-900 mb-1">
                  Full Project Abstract
                </h4>
                <p className="text-xs font-mono text-slate-700 leading-relaxed">
                  {selectedProject.abstract}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase text-slate-900 mb-2">
                  Core Research Objectives
                </h4>
                <ul className="space-y-1.5 text-xs font-mono text-slate-700">
                  {selectedProject.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2 bg-[#163A2D] text-[#FAD02C] font-mono font-bold text-xs uppercase rounded-lg hover:bg-[#0D241C] cursor-pointer"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Light Modal: Publication Details */}
        {selectedPublication && (
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedPublication(null)}
          >
            <div
              className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl border-2 border-[#163A2D] overflow-hidden p-6 sm:p-8 space-y-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded">
                    {selectedPublication.indexing} • {selectedPublication.year}
                  </span>
                  <h3 className="text-lg font-sans font-black text-slate-900 mt-2">
                    {selectedPublication.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedPublication(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-xs font-mono text-slate-600 space-y-1 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="font-bold text-[#163A2D]">Journal / Publisher:</span>{' '}
                  {selectedPublication.journal}
                </div>
                <div>
                  <span className="font-bold text-[#163A2D]">Contributing Authors:</span>{' '}
                  {selectedPublication.authors.join(', ')}
                </div>
                <div>
                  <span className="font-bold text-[#163A2D]">Permanent DOI:</span>{' '}
                  <span className="text-blue-700 font-semibold">{selectedPublication.doi}</span>
                </div>
                <div>
                  <span className="font-bold text-[#163A2D]">Academic Citations:</span>{' '}
                  {selectedPublication.citations} citations recorded
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase text-slate-900 mb-1">Abstract</h4>
                <p className="text-xs font-mono text-slate-700 leading-relaxed">
                  {selectedPublication.abstract}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href={`https://doi.org/${selectedPublication.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-[#163A2D] hover:underline"
                >
                  <span>Open via International DOI Resolver</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setSelectedPublication(null)}
                  className="px-5 py-2 bg-[#163A2D] text-[#FAD02C] font-mono font-bold text-xs uppercase rounded-lg hover:bg-[#0D241C] cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
