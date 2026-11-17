import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Building,
  Navigation,
} from 'lucide-react';
import { UNIVERSITY_INFO } from '../universityData';
import { SwissBadge, SwissButton } from './designSystem/SwissPrimitives';
import { useCmsData } from '../lib/useCmsData';

export default function Contact() {
  const { submitContact } = useCmsData();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Admission Inquiry',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      await submitContact(formData);
      setFormSubmitted(true);
    } catch (err: any) {
      setSubmitError(err?.message || 'Unable to dispatch inquiry right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#FAF8F5] border-b border-[#D0E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-3">
            <SwissBadge variant="accent">
              Get in Touch
            </SwissBadge>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-black text-[#163A2D] tracking-tight mb-4">
            Contact & Campus Location
          </h2>
          <p className="text-[#4E7D68] text-base sm:text-lg leading-relaxed font-sans">
            Visit our admissions office in Kotbari, Cumilla or reach out to our departmental counselors for academic guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 5 Cols: Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border-2 border-[#163A2D] p-6 shadow-none space-y-6">
              <div className="flex items-start space-x-4 group cursor-default">
                <div className="w-10 h-10 bg-[#EAF2ED] border border-[#D0E4DA] group-hover:bg-[#163A2D] group-hover:border-[#163A2D] group-hover:text-[#FAD02C] flex items-center justify-center text-[#163A2D] shrink-0 mt-1 transition-colors duration-200">
                  <MapPin className="w-5 h-5 text-current transition-colors duration-200" />
                </div>
                <div>
                  <h4 className="font-sans text-base font-black text-[#163A2D]">Permanent Campus</h4>
                  <p className="text-xs sm:text-sm text-[#4E7D68] leading-relaxed mt-1">
                    CCN University of Science & Technology<br />
                    Kotbari, Cumilla-3500, Bangladesh
                  </p>
                  <div className="text-[11px] text-[#163A2D] font-bold mt-1 font-mono">
                    (Close to Shalban Vihara Archaeological Zone)
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4 group cursor-default">
                <div className="w-10 h-10 bg-[#EAF2ED] border border-[#D0E4DA] group-hover:bg-[#163A2D] group-hover:border-[#163A2D] group-hover:text-[#FAD02C] flex items-center justify-center text-[#163A2D] shrink-0 mt-1 transition-colors duration-200">
                  <Phone className="w-5 h-5 text-current transition-colors duration-200" />
                </div>
                <div>
                  <h4 className="font-sans text-base font-black text-[#163A2D]">Admission Hotlines</h4>
                  <div className="space-y-0.5 text-xs sm:text-sm text-[#4E7D68] font-mono mt-1">
                    <div>+880 1713-222333 (Admission Section)</div>
                    <div>+880 1713-222444 (Information Desk)</div>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4 group cursor-default">
                <div className="w-10 h-10 bg-[#EAF2ED] border border-[#D0E4DA] group-hover:bg-[#163A2D] group-hover:border-[#163A2D] group-hover:text-[#FAD02C] flex items-center justify-center text-[#163A2D] shrink-0 mt-1 transition-colors duration-200">
                  <Mail className="w-5 h-5 text-current transition-colors duration-200" />
                </div>
                <div>
                  <h4 className="font-sans text-base font-black text-[#163A2D]">Official Correspondence</h4>
                  <div className="space-y-0.5 text-xs sm:text-sm text-[#4E7D68] font-mono mt-1">
                    <div>admission@ccnust.ac.bd</div>
                    <div>registrar@ccnust.ac.bd</div>
                    <div>info@ccnust.ac.bd</div>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4 group cursor-default">
                <div className="w-10 h-10 bg-[#EAF2ED] border border-[#D0E4DA] group-hover:bg-[#163A2D] group-hover:border-[#163A2D] group-hover:text-[#FAD02C] flex items-center justify-center text-[#163A2D] shrink-0 mt-1 transition-colors duration-200">
                  <Clock className="w-5 h-5 text-current transition-colors duration-200" />
                </div>
                <div>
                  <h4 className="font-sans text-base font-black text-[#163A2D]">Admissions Office Hours</h4>
                  <p className="text-xs sm:text-sm text-[#4E7D68] mt-1">
                    Saturday – Thursday: <strong className="text-[#163A2D]">9:00 AM – 5:00 PM</strong><br />
                    Friday: <strong className="text-[#A32222]">Closed</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Campus Travel Tip */}
            <div className="bg-[#163A2D] text-white border-2 border-[#163A2D] p-5 text-xs space-y-1.5 shadow-none">
              <div className="text-[#FAD02C] font-black uppercase font-mono tracking-wider flex items-center space-x-1.5">
                <Navigation className="w-4 h-4 text-[#FAD02C]" />
                <span>How to Reach Kotbari Campus:</span>
              </div>
              <p className="text-[#D0E4DA] leading-relaxed">
                From Dhaka or Chattogram highway, take Paduar Bazar or Tomsom Bridge interchange towards Kotbari road. The university campus is situated directly on the Kotbari main road with dedicated shuttle bus connectivity.
              </p>
            </div>
          </div>

          {/* Right 7 Cols: Inquiry Form & Campus Map */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border-2 border-[#163A2D] p-6 sm:p-8 shadow-none">
              <h3 className="font-sans text-xl font-black text-[#163A2D] mb-2">
                Send an Inquiry or Schedule a Campus Visit
              </h3>
              <p className="text-xs sm:text-sm text-[#4E7D68] mb-6 font-sans">
                Our admission advisors will respond to your queries within 24 hours.
              </p>

              {formSubmitted ? (
                <div className="bg-[#EAF2ED] border-2 border-[#163A2D] p-6 text-center text-[#163A2D]">
                  <CheckCircle className="w-10 h-10 mx-auto mb-2 text-[#163A2D]" />
                  <h4 className="font-sans text-lg font-black">Inquiry Successfully Received</h4>
                  <p className="text-xs mt-1 text-[#4E7D68]">
                    Thank you, {formData.name}. An admissions officer from CCNUST will contact you shortly via email or phone.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: 'Admission Inquiry', message: '' });
                    }}
                    className="mt-4 text-xs font-bold text-[#163A2D] hover:text-[#FAD02C] underline cursor-pointer"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#163A2D] font-bold mb-1 uppercase font-mono text-[11px] tracking-wider">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Tanvir Ahmed"
                        className="w-full bg-[#FAF8F5] border border-[#D0E4DA] px-3 py-2.5 text-[#163A2D] focus:outline-none focus:border-[#163A2D] focus:ring-1 focus:ring-[#163A2D]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#163A2D] font-bold mb-1 uppercase font-mono text-[11px] tracking-wider">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+880 1XXXXXXXXX"
                        className="w-full bg-[#FAF8F5] border border-[#D0E4DA] px-3 py-2.5 text-[#163A2D] focus:outline-none focus:border-[#163A2D] focus:ring-1 focus:ring-[#163A2D]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#163A2D] font-bold mb-1 uppercase font-mono text-[11px] tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="youremail@example.com"
                        className="w-full bg-[#FAF8F5] border border-[#D0E4DA] px-3 py-2.5 text-[#163A2D] focus:outline-none focus:border-[#163A2D] focus:ring-1 focus:ring-[#163A2D]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#163A2D] font-bold mb-1 uppercase font-mono text-[11px] tracking-wider">
                        Inquiry Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-[#D0E4DA] px-3 py-2.5 text-[#163A2D] focus:outline-none focus:border-[#163A2D] focus:ring-1 focus:ring-[#163A2D]"
                      >
                        <option value="Admission Inquiry">Undergraduate Admission</option>
                        <option value="Graduate Inquiry">Graduate / Master's Admission</option>
                        <option value="Scholarship Inquiry">Scholarships & 100% Waivers</option>
                        <option value="Campus Visit">Schedule Campus Visit</option>
                        <option value="General Query">General Administrative Query</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#163A2D] font-bold mb-1 uppercase font-mono text-[11px] tracking-wider">
                      Your Message / Questions *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your questions about programs, fees, or admission deadlines..."
                      className="w-full bg-[#FAF8F5] border border-[#D0E4DA] px-3 py-2.5 text-[#163A2D] focus:outline-none focus:border-[#163A2D] focus:ring-1 focus:ring-[#163A2D]"
                    ></textarea>
                  </div>

                  {submitError && (
                    <div className="p-3 bg-rose-50 border border-rose-300 text-rose-800 text-xs font-mono">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#163A2D] hover:bg-[#0D241C] disabled:opacity-60 disabled:cursor-not-allowed text-[#FAD02C] font-black uppercase tracking-wider text-xs py-3.5 flex items-center justify-center space-x-2 transition-colors duration-150 cursor-pointer border border-[#163A2D]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Sending Inquiry...' : 'Submit Inquiry to Admissions Office'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
