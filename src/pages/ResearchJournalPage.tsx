import React, { useState } from 'react';
import {
  BookOpen,
  FileText,
  Download,
  Search,
  ExternalLink,
  Award,
  Users,
  CheckCircle2,
  Calendar,
  Send,
  Sparkles,
  Bookmark,
  ChevronDown,
  ChevronUp,
  FileCheck,
} from 'lucide-react';
import SectionAtmosphere from '../components/SectionAtmosphere';
import SecondaryPageHeader from '../components/SecondaryPageHeader';
import { JOURNAL_INFO, JOURNAL_ARTICLES } from '../universityData';
import { JournalArticle } from '../types';

export default function ResearchJournalPage() {
  const [activeTab, setActiveTab] = useState<'articles' | 'editorial' | 'guidelines' | 'submit'>('articles');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [expandedAbstractId, setExpandedAbstractId] = useState<string | null>(null);
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Submission Form State
  const [submitForm, setSubmitForm] = useState({
    authorName: '',
    email: '',
    phone: '',
    affiliation: 'CCN University of Science & Technology',
    articleTitle: '',
    department: 'Computer Science & Engineering',
    abstract: '',
    keywords: '',
    hasEthicalAgreement: false,
    submitted: false,
  });

  const departments = ['All', ...Array.from(new Set(JOURNAL_ARTICLES.map((a) => a.department)))];

  const filteredArticles = JOURNAL_ARTICLES.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.authors.some((author) => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
      article.keywords.some((k) => k.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDept = selectedDept === 'All' || article.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const handleSimulateDownload = (article: JournalArticle) => {
    setDownloadSuccessId(article.id);
    setTimeout(() => {
      // Create a lightweight simulated text paper for immediate download
      const content = `CCN JOURNAL OF SCIENCE AND TECHNOLOGY (CCNJST)
ISSN Print: 2709-183X | ISSN Online: 2709-1848
Centre for Higher Studies & Research, CCNUST Kotbari, Cumilla

Title: ${article.title}
Authors: ${article.authors.join(', ')}
Department: ${article.department}
Citation: ${article.volume}, ${article.issue} (${article.year})
DOI: https://doi.org/${article.doi}
Published Date: ${article.publishedDate}

ABSTRACT:
${article.abstract}

Keywords: ${article.keywords.join('; ')}

---
Official Open-Access Research Archive of CCN University of Science & Technology
Website: https://ccnust.ac.bd
`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${article.id}_CCNJST_${article.year}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 600);

    setTimeout(() => setDownloadSuccessId(null), 3000);
  };

  const handleSubmitManuscript = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitForm.hasEthicalAgreement) {
      setFormError('Please agree to the ethical publication terms before submitting.');
      return;
    }
    setFormError(null);
    setSubmitForm((prev) => ({ ...prev, submitted: true }));
  };

  return (
    <div className="min-h-screen bg-[#EFF6F2] pb-24 text-[#163A2D]">
      <SectionAtmosphere variant="light" />

      {/* Sticky Top Header */}
      <SecondaryPageHeader
        currentPageTitle="Research & Journal (CCNJST)"
        category="Research Wing"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-4">
        {/* Hero Section inspired by MIST MIJST & BUP Journal */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-[#EAF2ED] border border-[#D0E4DA] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-widest text-[#163A2D] mb-3.5 rounded shadow-xs">
            <BookOpen className="w-4 h-4 text-[#FAD02C]" />
            <span>ISSN {JOURNAL_INFO.issnPrint} (Print) • ISSN {JOURNAL_INFO.issnOnline} (Online)</span>
          </div>
          <h1 className="font-sans text-3xl sm:text-5xl font-black text-[#163A2D] uppercase tracking-tight mb-3">
            CCN Journal of Science & Technology
          </h1>
          <p className="text-[#4E7D68] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            A peer-reviewed, open-access international multidisciplinary journal published biannually by the Centre for Higher Studies & Research (CHSR), CCNUST.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 pt-2">
            {JOURNAL_INFO.indexing.map((idx, i) => (
              <span
                key={i}
                className="text-[11px] font-mono font-bold bg-white border border-[#D0E4DA] text-slate-700 px-2.5 py-1 rounded-md shadow-xs flex items-center space-x-1"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>{idx}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 pb-4 border-b border-[#D0E4DA]">
          <button
            type="button"
            onClick={() => setActiveTab('articles')}
            className={`px-4 py-2 font-mono text-xs sm:text-sm font-bold uppercase rounded-lg transition-all cursor-pointer border flex items-center space-x-2 ${
              activeTab === 'articles'
                ? 'bg-[#163A2D] text-[#FAD02C] border-[#163A2D] shadow-md'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4 text-[#FAD02C]" />
            <span>Published Articles ({JOURNAL_ARTICLES.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('editorial')}
            className={`px-4 py-2 font-mono text-xs sm:text-sm font-bold uppercase rounded-lg transition-all cursor-pointer border flex items-center space-x-2 ${
              activeTab === 'editorial'
                ? 'bg-[#163A2D] text-[#FAD02C] border-[#163A2D] shadow-md'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4 text-[#FAD02C]" />
            <span>Editorial Board</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guidelines')}
            className={`px-4 py-2 font-mono text-xs sm:text-sm font-bold uppercase rounded-lg transition-all cursor-pointer border flex items-center space-x-2 ${
              activeTab === 'guidelines'
                ? 'bg-[#163A2D] text-[#FAD02C] border-[#163A2D] shadow-md'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <FileCheck className="w-4 h-4 text-[#FAD02C]" />
            <span>Author Guidelines</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('submit')}
            className={`px-4 py-2 font-mono text-xs sm:text-sm font-bold uppercase rounded-lg transition-all cursor-pointer border flex items-center space-x-2 ${
              activeTab === 'submit'
                ? 'bg-[#163A2D] text-[#FAD02C] border-[#163A2D] shadow-md'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Send className="w-4 h-4 text-[#FAD02C]" />
            <span>Submit Manuscript</span>
          </button>
        </div>

        {/* TAB 1: PUBLISHED ARTICLES */}
        {activeTab === 'articles' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Search & Department Filters */}
            <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search articles by title, author, keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-slate-300 rounded-xl text-xs font-mono focus:outline-none focus:border-[#163A2D]"
                />
              </div>

              <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                <span className="text-xs font-mono font-bold text-slate-500 whitespace-nowrap">Filter:</span>
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap cursor-pointer transition-colors ${
                      selectedDept === dept
                        ? 'bg-[#163A2D] text-[#FAD02C] font-bold'
                        : 'bg-[#FAF8F5] text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {dept === 'All' ? 'All Disciplines' : dept}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles List */}
            <div className="space-y-4">
              {filteredArticles.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-300 p-8 font-mono text-sm text-slate-500">
                  No articles found matching "{searchTerm}". Try another keyword or discipline filter.
                </div>
              ) : (
                filteredArticles.map((article) => {
                  const isExpanded = expandedAbstractId === article.id;
                  const isDownloaded = downloadSuccessId === article.id;
                  return (
                    <div
                      key={article.id}
                      className="bg-white border-2 border-[#163A2D] rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-mono font-bold bg-[#EAF2ED] text-[#163A2D] px-2.5 py-0.5 rounded uppercase border border-[#D0E4DA]">
                            {article.department}
                          </span>
                          <span className="text-[11px] font-mono text-slate-500 font-bold">
                            {article.volume}, {article.issue} ({article.year})
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400">
                          DOI: {article.doi}
                        </span>
                      </div>

                      <h3 className="font-sans font-black text-base sm:text-lg text-slate-900 leading-snug">
                        {article.title}
                      </h3>

                      <div className="text-xs font-mono text-[#4E7D68] font-bold">
                        Authors: {article.authors.join(' • ')}
                      </div>

                      {/* Abstract Snippet / Accordion */}
                      <div className="text-xs font-mono text-slate-700 leading-relaxed bg-[#FAF8F5] p-3.5 rounded-xl border border-[#D0E4DA]">
                        <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedAbstractId(isExpanded ? null : article.id)}>
                          <span className="font-bold text-[#163A2D] uppercase text-[10px]">
                            {isExpanded ? 'Hide Abstract' : 'Read Abstract'}
                          </span>
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-[#163A2D]" /> : <ChevronDown className="w-4 h-4 text-[#163A2D]" />}
                        </div>
                        {isExpanded && (
                          <p className="mt-2 text-slate-600 animate-in fade-in">
                            {article.abstract}
                          </p>
                        )}
                      </div>

                      {/* Keywords & Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {article.keywords.map((kw, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
                            >
                              #{kw}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => handleSimulateDownload(article)}
                            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#163A2D] hover:bg-[#0D241C] text-[#FAD02C] font-mono text-xs font-bold transition-all shadow-xs cursor-pointer"
                          >
                            {isDownloaded ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Downloaded!</span>
                              </>
                            ) : (
                              <>
                                <Download className="w-3.5 h-3.5" />
                                <span>Download PDF ({article.downloadCount})</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 2: EDITORIAL BOARD */}
        {activeTab === 'editorial' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-6 shadow-sm">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#163A2D] bg-[#EAF2ED] px-2 py-0.5 rounded border border-[#D0E4DA]">
                CENTRE FOR HIGHER STUDIES & RESEARCH (CHSR)
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-sans text-slate-900 mt-1">
                Editorial Board of CCNJST
              </h2>
              <p className="text-xs font-mono text-slate-600 mt-1">
                Distinguished researchers, university professors, and industry reviewers guiding scholarly integrity, blind peer reviews, and international indexing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-5 shadow-sm space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase bg-[#FAD02C] text-[#163A2D] px-2 py-0.5 rounded">
                  EDITOR-IN-CHIEF
                </span>
                <h3 className="font-sans font-black text-lg text-slate-900">
                  {JOURNAL_INFO.editorInChief}
                </h3>
                <p className="text-xs font-mono text-slate-600">
                  Vice Chancellor (Acting) & Dean of Engineering, CCNUST. Former Senior Engineering Fellow, IEB.
                </p>
                <div className="text-xs font-mono text-[#163A2D] font-bold pt-2 border-t border-slate-100">
                  Email: vc@ccnust.ac.bd
                </div>
              </div>

              <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-5 shadow-sm space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase bg-[#FAD02C] text-[#163A2D] px-2 py-0.5 rounded">
                  EXECUTIVE EDITOR
                </span>
                <h3 className="font-sans font-black text-lg text-slate-900">
                  {JOURNAL_INFO.executiveEditor}
                </h3>
                <p className="text-xs font-mono text-slate-600">
                  Controller of Examinations & Dean, Faculty of Liberal Arts, CCNUST.
                </p>
                <div className="text-xs font-mono text-[#163A2D] font-bold pt-2 border-t border-slate-100">
                  Email: editor.journal@ccnust.ac.bd
                </div>
              </div>

              <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-5 shadow-sm space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                  ASSOCIATE EDITOR (BUSINESS & ECONOMICS)
                </span>
                <h3 className="font-sans font-black text-base text-slate-900">
                  Prof. Md. Jamal Nasser
                </h3>
                <p className="text-xs font-mono text-slate-600">
                  Registrar & Dean, Faculty of Business Administration, CCNUST.
                </p>
              </div>

              <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-5 shadow-sm space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                  ASSOCIATE EDITOR (SYSTEMS & COMPUTING)
                </span>
                <h3 className="font-sans font-black text-base text-slate-900">
                  Md. S. I. Shanto
                </h3>
                <p className="text-xs font-mono text-slate-600">
                  Lead System Administrator & Senior Faculty Member, Dept. of CSE.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AUTHOR GUIDELINES (Inspired by MIST MIJST) */}
        {activeTab === 'guidelines' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-6 shadow-sm space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#163A2D] bg-[#EAF2ED] px-2 py-0.5 rounded border border-[#D0E4DA]">
                SUBMISSION PROTOCOLS
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-sans text-slate-900">
                Author Submission Guidelines & Peer Review Model
              </h2>
              <p className="text-xs font-mono text-slate-600 leading-relaxed">
                CCNJST adheres to Committee on Publication Ethics (COPE) standards. All manuscripts undergo a double-blind peer-review process by at least two external reviewers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono text-xs">
              <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-5 shadow-sm space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#163A2D] text-[#FAD02C] flex items-center justify-center font-bold">1</div>
                <h4 className="font-bold text-slate-900 text-sm">Manuscript Formatting</h4>
                <p className="text-slate-600 leading-relaxed">
                  Submissions must be prepared in standard IEEE two-column format (Engineering/Science) or APA 7th style (Business/Law). Length: 6 to 12 pages including figures.
                </p>
              </div>

              <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-5 shadow-sm space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#163A2D] text-[#FAD02C] flex items-center justify-center font-bold">2</div>
                <h4 className="font-bold text-slate-900 text-sm">Blinded Peer Review</h4>
                <p className="text-slate-600 leading-relaxed">
                  Initial submission must omit author names and affiliations to ensure unbiased blind evaluation. Author details are submitted in a separate Author Info Form.
                </p>
              </div>

              <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-5 shadow-sm space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#163A2D] text-[#FAD02C] flex items-center justify-center font-bold">3</div>
                <h4 className="font-bold text-slate-900 text-sm">Plagiarism & Open Access</h4>
                <p className="text-slate-600 leading-relaxed">
                  Turnitin similarity index must be strictly below 18% (excluding bibliography). Accepted papers receive a persistent Crossref DOI with zero APC fees for university researchers.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SUBMIT MANUSCRIPT FORM */}
        {activeTab === 'submit' && (
          <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-6 sm:p-8 shadow-md max-w-3xl mx-auto animate-in fade-in">
            <div className="mb-6 pb-4 border-b border-slate-200">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#163A2D] bg-[#EAF2ED] px-2 py-0.5 rounded border border-[#D0E4DA]">
                ONLINE PORTAL INTAKE
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-sans text-slate-900 mt-1">
                Submit Research Paper to CCNJST
              </h2>
              <p className="text-xs font-mono text-slate-600 mt-1">
                Papers submitted here are routed directly to the CHSR Editorial Secretariat for initial screening.
              </p>
            </div>

            {submitForm.submitted ? (
              <div className="p-8 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-center space-y-3 font-mono text-xs">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-black text-emerald-950">Manuscript Received Successfully!</h3>
                <p className="text-slate-700 max-w-md mx-auto">
                  Tracking Code: <span className="font-bold text-emerald-900 font-mono">CCNJST-2026-MS-{Math.floor(1000 + Math.random() * 9000)}</span>.
                  A confirmation email with the review timeline (typically 4-6 weeks) has been sent to {submitForm.email}.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitForm({ authorName: '', email: '', phone: '', affiliation: '', articleTitle: '', department: 'Computer Science & Engineering', abstract: '', keywords: '', hasEthicalAgreement: false, submitted: false })}
                  className="px-4 py-2 bg-[#163A2D] text-[#FAD02C] font-bold rounded-lg cursor-pointer"
                >
                  Submit Another Paper
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitManuscript} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Corresponding Author Name *</label>
                    <input
                      type="text"
                      required
                      value={submitForm.authorName}
                      onChange={(e) => setSubmitForm({ ...submitForm, authorName: e.target.value })}
                      placeholder="e.g. Dr. Md. Rahman"
                      className="w-full p-2.5 bg-[#FAF8F5] border border-slate-300 rounded-lg focus:outline-none focus:border-[#163A2D]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Author Email Address *</label>
                    <input
                      type="email"
                      required
                      value={submitForm.email}
                      onChange={(e) => setSubmitForm({ ...submitForm, email: e.target.value })}
                      placeholder="e.g. author@ccnust.ac.bd"
                      className="w-full p-2.5 bg-[#FAF8F5] border border-slate-300 rounded-lg focus:outline-none focus:border-[#163A2D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Institutional Affiliation</label>
                    <input
                      type="text"
                      value={submitForm.affiliation}
                      onChange={(e) => setSubmitForm({ ...submitForm, affiliation: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-slate-300 rounded-lg focus:outline-none focus:border-[#163A2D]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Target Discipline *</label>
                    <select
                      value={submitForm.department}
                      onChange={(e) => setSubmitForm({ ...submitForm, department: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-slate-300 rounded-lg focus:outline-none focus:border-[#163A2D]"
                    >
                      <option>Computer Science & Engineering</option>
                      <option>Civil Engineering</option>
                      <option>Electrical & Electronic Engineering</option>
                      <option>Pharmacy & Biological Sciences</option>
                      <option>Department of Law</option>
                      <option>Business Administration</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Manuscript Title *</label>
                  <input
                    type="text"
                    required
                    value={submitForm.articleTitle}
                    onChange={(e) => setSubmitForm({ ...submitForm, articleTitle: e.target.value })}
                    placeholder="Full title of your research article"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-slate-300 rounded-lg focus:outline-none focus:border-[#163A2D]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Abstract (150-250 words) *</label>
                  <textarea
                    rows={4}
                    required
                    value={submitForm.abstract}
                    onChange={(e) => setSubmitForm({ ...submitForm, abstract: e.target.value })}
                    placeholder="Paste the unstructured abstract summarizing background, methods, results, and conclusion..."
                    className="w-full p-2.5 bg-[#FAF8F5] border border-slate-300 rounded-lg focus:outline-none focus:border-[#163A2D]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Keywords (4-6 separated by semicolons) *</label>
                  <input
                    type="text"
                    required
                    value={submitForm.keywords}
                    onChange={(e) => setSubmitForm({ ...submitForm, keywords: e.target.value })}
                    placeholder="e.g. Deep Learning; IoT; Edge Computing; Agriculture"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-slate-300 rounded-lg focus:outline-none focus:border-[#163A2D]"
                  />
                </div>

                <div className="pt-2">
                  <label className="flex items-start space-x-2 text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={submitForm.hasEthicalAgreement}
                      onChange={(e) => {
                        setSubmitForm({ ...submitForm, hasEthicalAgreement: e.target.checked });
                        if (e.target.checked) setFormError(null);
                      }}
                      className="mt-0.5"
                    />
                    <span>
                      I certify that this manuscript is original, not concurrently under consideration elsewhere, and meets the ethical standards of CCNJST.
                    </span>
                  </label>
                </div>

                {formError && (
                  <div className="p-3 bg-rose-50 border border-rose-300 rounded-lg text-rose-800 text-xs font-mono">
                    {formError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-[#163A2D] hover:bg-[#0D241C] text-[#FAD02C] font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Manuscript for Peer Review</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
