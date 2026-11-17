import React, { useState } from 'react';
import {
  Download,
  FileText,
  Search,
  CheckCircle2,
  Printer,
  X,
  Building,
  Clock,
  DollarSign,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import SectionAtmosphere from '../components/SectionAtmosphere';
import SecondaryPageHeader from '../components/SecondaryPageHeader';
import { DOWNLOADABLE_FORMS } from '../universityData';
import { DownloadableForm } from '../types';

export default function DownloadsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [previewForm, setPreviewForm] = useState<DownloadableForm | null>(null);
  const [downloadSuccessCode, setDownloadSuccessCode] = useState<string | null>(null);

  // Student Fillable Preview State
  const [studentDetails, setStudentDetails] = useState({
    name: 'Md. Tariqul Hasan',
    studentId: 'CCN-2023-CSE-042',
    department: 'Computer Science & Engineering',
    semester: '7th Semester (Fall 2026)',
    phone: '01715-451599',
    reason: 'Application for semester evaluation & official transcript dispatch.',
  });

  const categories = ['All', 'Examination', 'Registrar', 'Accounts', 'Library & Clearance'];

  const filteredForms = DOWNLOADABLE_FORMS.filter((form) => {
    const matchesSearch =
      form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.formCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.office.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || form.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownloadFile = (form: DownloadableForm) => {
    setDownloadSuccessCode(form.formCode);
    setTimeout(() => {
      const formContent = `========================================================================
CCN UNIVERSITY OF SCIENCE & TECHNOLOGY (CCNUST)
Established under Private University Act 2010 • Approved by UGC & Govt.
Kotbari, Cumilla-3500, Bangladesh | Website: https://ccnust.ac.bd
========================================================================

OFFICIAL APPLICATION FORM: ${form.title}
Form Code: ${form.formCode}
Responsible Office: ${form.office}
Official Processing Fee: ${form.feeAmount || 'N/A'}
Standard Processing Time: ${form.processingTime || 'Standard'}

REQUIRED ATTACHMENTS & ENCLOSURES:
${form.requiredAttachments.map((att, i) => `[  ] ${i + 1}. ${att}`).join('\n')}

APPLICANT PARTICULARS:
Student Full Name: ____________________________________________________
Student ID / Roll No: _______________________  Batch / Session: _________
Department: ________________________________  Program: _________________
Contact Mobile: ____________________________  Email: ___________________
Reason / Purpose of Application:
________________________________________________________________________
________________________________________________________________________

OFFICIAL RECOMMENDATION & CLEARANCE:
Department Head Signature: ______________________ Date: _______________
Exam Controller / Registrar Endorsement: ________ Date: _______________
Accounts Division Receipt Seal & Voucher No: _____ Date: _______________

========================================================================
Generated via CCNUST Official Electronic Forms & Downloads Portal
`;
      const blob = new Blob([formContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${form.formCode}_${form.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 400);

    setTimeout(() => setDownloadSuccessCode(null), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#EFF6F2] pb-24 text-[#163A2D]">
      <SectionAtmosphere variant="light" />

      {/* Sticky Header */}
      <SecondaryPageHeader
        currentPageTitle="Official Forms & Downloads"
        category="Student Services"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-4">
        {/* Page Hero inspired by BUP & MIST Downloads Portal */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-[#EAF2ED] border border-[#D0E4DA] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-widest text-[#163A2D] mb-3.5 rounded shadow-xs">
            <Download className="w-4 h-4 text-[#FAD02C]" />
            <span>Standardized University Secretariat Documents</span>
          </div>
          <h1 className="font-sans text-3xl sm:text-5xl font-black text-[#163A2D] uppercase tracking-tight mb-3">
            Forms & Downloads Center
          </h1>
          <p className="text-[#4E7D68] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Directly download, digitally pre-fill, or print official academic transcript requests, clearance certificates, provisional degrees, and waiver renewal forms.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="bg-white border-2 border-[#163A2D] rounded-2xl p-4 sm:p-5 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by form name, code (e.g. CCN-EXM-01)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-slate-300 rounded-xl text-xs font-mono focus:outline-none focus:border-[#163A2D]"
            />
          </div>

          <div className="flex items-center space-x-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 font-mono text-xs">
            <span className="font-bold text-slate-500 whitespace-nowrap mr-1">Section:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#163A2D] text-[#FAD02C] font-bold'
                    : 'bg-[#FAF8F5] text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Forms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredForms.map((form) => {
            const isDownloaded = downloadSuccessCode === form.formCode;
            return (
              <div
                key={form.id}
                className="bg-white border-2 border-[#163A2D] rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold bg-[#163A2D] text-[#FAD02C] px-2.5 py-0.5 rounded uppercase tracking-wider">
                      {form.formCode}
                    </span>
                    <span className="text-[11px] font-mono bg-[#EAF2ED] text-[#163A2D] px-2 py-0.5 rounded font-bold">
                      {form.category} • {form.fileType} ({form.fileSize})
                    </span>
                  </div>

                  <h3 className="font-sans font-black text-base sm:text-lg text-slate-900 leading-snug">
                    {form.title}
                  </h3>

                  <div className="text-xs font-mono text-slate-500 flex items-center space-x-1">
                    <Building className="w-3.5 h-3.5 text-[#163A2D]" />
                    <span>{form.office}</span>
                  </div>

                  <p className="text-xs font-mono text-slate-700 leading-relaxed bg-[#FAF8F5] p-3 rounded-xl border border-[#D0E4DA]">
                    {form.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-600 pt-1">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Fee: <strong className="text-slate-800">{form.feeAmount}</strong></span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Timeline: <strong className="text-slate-800">{form.processingTime}</strong></span>
                    </div>
                  </div>

                  {/* Required Enclosures */}
                  <div className="pt-2">
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">
                      Required Enclosures:
                    </span>
                    <ul className="space-y-0.5 text-[11px] font-mono text-slate-600">
                      {form.requiredAttachments.map((att, idx) => (
                        <li key={idx} className="flex items-start space-x-1.5">
                          <span className="text-[#163A2D] font-bold">•</span>
                          <span>{att}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-5 mt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => setPreviewForm(form)}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#163A2D] text-[#163A2D] hover:text-[#FAD02C] border border-[#D0E4DA] transition-colors cursor-pointer font-bold"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Fill & Print Preview</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownloadFile(form)}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-[#163A2D] hover:bg-[#0D241C] text-[#FAD02C] font-bold transition-all shadow-xs cursor-pointer"
                  >
                    {isDownloaded ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Downloaded!</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>Download {form.fileType}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pre-fillable Printable Document Modal */}
      {previewForm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border-2 border-[#163A2D] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative font-mono text-xs">
            <button
              onClick={() => setPreviewForm(null)}
              className="absolute top-4 right-4 p-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Printable Form Sheet Header */}
            <div className="text-center pb-4 mb-4 border-b-2 border-[#163A2D]">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                People's Republic of Bangladesh • UGC Approved
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-sans text-[#163A2D] uppercase mt-1">
                CCN University of Science & Technology
              </h2>
              <div className="text-[11px] text-[#4E7D68]">
                Kotbari, Cumilla-3500 • Secretariat & Examination Division
              </div>
              <div className="inline-block mt-2 bg-[#163A2D] text-[#FAD02C] px-3 py-1 rounded font-bold uppercase text-xs">
                {previewForm.title} ({previewForm.formCode})
              </div>
            </div>

            {/* Fillable Fields */}
            <div className="space-y-3 mb-6 bg-[#FAF8F5] p-4 rounded-xl border border-[#D0E4DA]">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">
                Edit Student Details (Pre-fills Document for Printing):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold text-[10px] mb-0.5">Student Full Name</label>
                  <input
                    type="text"
                    value={studentDetails.name}
                    onChange={(e) => setStudentDetails({ ...studentDetails, name: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold text-[10px] mb-0.5">Student ID / Roll</label>
                  <input
                    type="text"
                    value={studentDetails.studentId}
                    onChange={(e) => setStudentDetails({ ...studentDetails, studentId: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold text-[10px] mb-0.5">Department</label>
                  <input
                    type="text"
                    value={studentDetails.department}
                    onChange={(e) => setStudentDetails({ ...studentDetails, department: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold text-[10px] mb-0.5">Current Contact Mobile</label>
                  <input
                    type="text"
                    value={studentDetails.phone}
                    onChange={(e) => setStudentDetails({ ...studentDetails, phone: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Form Clauses & Signature Lines */}
            <div className="space-y-4 text-[11px] text-slate-700 border-t border-slate-200 pt-3">
              <div>
                <strong>Office Routing:</strong> {previewForm.office} | <strong>Fee:</strong> {previewForm.feeAmount}
              </div>
              <div>
                <strong>Enclosures Verified:</strong>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-1 text-[10px] text-slate-600">
                  {previewForm.requiredAttachments.map((att, i) => (
                    <div key={i} className="flex items-center space-x-1">
                      <span className="w-3 h-3 border border-slate-400 rounded-xs inline-block" />
                      <span>{att}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Official Signatures Grid */}
              <div className="grid grid-cols-3 gap-4 pt-10 text-center text-[10px] text-slate-500">
                <div className="border-t border-slate-400 pt-1 font-bold">
                  Applicant's Signature
                </div>
                <div className="border-t border-slate-400 pt-1 font-bold">
                  Head of Department Seal
                </div>
                <div className="border-t border-slate-400 pt-1 font-bold">
                  Authorized University Officer
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => setPreviewForm(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2 rounded-lg bg-[#163A2D] hover:bg-[#0D241C] text-[#FAD02C] font-bold shadow-sm cursor-pointer flex items-center space-x-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Form</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
