'use client';

import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, MapPin, MessageSquare, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO, CONFIG_TO_CONFIRM } from '@/data/eyerisData';
import { createWhatsAppBookingLink, EYERIS_LOCATION_URL } from './WhatsAppSync';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export const BookingSection: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('11:00 AM - 01:00 PM (Morning)');
  const [requirement, setRequirement] = useState('Frames (Optical Spectacles)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const requirements = [
    'Frames (Optical Spectacles)',
    'Prescription Lenses (Progressive / Digital / DriveSafe)',
    'Sunglasses (UV / Polarised)',
    "Kids' Eyewear & Myopia Consultation",
    'Contact Lenses Fitting',
    'General Optical Power Checkup Consultation',
    'Corporate Optical Benefit Inquiry',
  ];

  const timeSlots = [
    '11:00 AM - 01:00 PM (Morning Slot)',
    '02:00 PM - 04:00 PM (Afternoon Slot)',
    '05:00 PM - 07:00 PM (Peak Tech Hour Slot)',
    '07:30 PM - 09:00 PM (Evening Post-Work Slot)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const message = `Hello Eyeris Opticals! I am submitting an *Enquiry Request* for a visit at your KPHB Road No. 1 store.%0A%0A*Name:* ${encodeURIComponent(fullName)}%0A*Phone:* ${encodeURIComponent(phoneNumber)}%0A*Preferred Date:* ${encodeURIComponent(preferredDate)}%0A*Time Slot:* ${encodeURIComponent(preferredTime)}%0A*Requirement:* ${encodeURIComponent(requirement)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedMessage(message);
      // Open WhatsApp deep link
      const waUrl = `https://wa.me/${CONFIG_TO_CONFIRM.whatsappPhone}?text=${message}`;
      window.open(waUrl, '_blank');
    }, 600);
  };

  return (
    <section id="contact" className="py-24 sm:py-36 bg-[#050505] text-white border-b border-[#292929] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <ScrollReveal variant="fadeUp" className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#707070] mb-3">
            STORE VISIT &amp; CONSULTATION
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Plan Your Visit.{' '}
            <span className="font-light text-[#A1A1A6]">No Waiting.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1A6] font-light mt-4">
            Located at KPHB Road No. 1, Kukatpally. Direct ground-floor corridor connection with Global Eye Hospital.
          </p>
        </ScrollReveal>

        {/* 2-Column Layout: Form (Left) & Verified Store Details (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Real Form (7 cols) */}
          <ScrollReveal variant="fadeUp" delay={0.1} className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#101010] border border-[#292929] shadow-luxury-md">
              <div className="flex items-center justify-between pb-4 border-b border-[#292929] mb-6">
                <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                  Visit Enquiry Request
                </span>
                <span className="text-[10px] font-mono text-[#A1A1A6] bg-[#171717] px-2.5 py-0.5 rounded-full border border-[#292929]">
                  Instant WhatsApp Desk Link
                </span>
              </div>

              {!submittedMessage ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-mono text-[#A1A1A6] mb-1.5 flex items-center gap-1.5 uppercase">
                      <User className="w-3.5 h-3.5 text-white" />
                      <span>Full Name:</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Rao"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-[#292929] text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-white transition"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-mono text-[#A1A1A6] mb-1.5 flex items-center gap-1.5 uppercase">
                      <Phone className="w-3.5 h-3.5 text-white" />
                      <span>Mobile Number:</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-[#292929] text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-white transition"
                    />
                  </div>

                  {/* Requirement Selector */}
                  <div>
                    <label className="block text-xs font-mono text-[#A1A1A6] mb-1.5 flex items-center gap-1.5 uppercase">
                      <ShieldCheck className="w-3.5 h-3.5 text-white" />
                      <span>Requirement:</span>
                    </label>
                    <select
                      value={requirement}
                      onChange={(e) => setRequirement(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-[#292929] text-white text-sm focus:outline-none focus:border-white transition"
                    >
                      {requirements.map((req, idx) => (
                        <option key={idx} value={req} className="bg-[#101010] text-white">
                          {req}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date & Time Slot Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#A1A1A6] mb-1.5 flex items-center gap-1.5 uppercase">
                        <Calendar className="w-3.5 h-3.5 text-white" />
                        <span>Preferred Date:</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-[#292929] text-white text-xs focus:outline-none focus:border-white transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#A1A1A6] mb-1.5 flex items-center gap-1.5 uppercase">
                        <Clock className="w-3.5 h-3.5 text-white" />
                        <span>Preferred Slot:</span>
                      </label>
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-[#292929] text-white text-xs focus:outline-none focus:border-white transition"
                      >
                        {timeSlots.map((slot, idx) => (
                          <option key={idx} value={slot} className="bg-[#101010] text-white">
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Required Notice from Prompt Section 4 Item 12 */}
                  <div className="p-3.5 rounded-xl bg-[#050505] border border-[#292929] text-[11px] font-mono text-[#A1A1A6]">
                    <strong>Note:</strong> Eye examinations and clinical diagnostic assessments are arranged in coordination with Global Eye Hospital next door.
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-white hover:bg-neutral-200 text-black font-mono font-semibold text-xs tracking-wider flex items-center justify-center gap-2 transition shadow-md disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'PREPARING ENQUIRY...' : 'SUBMIT ENQUIRY REQUEST'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto text-white">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Enquiry Request Ready
                  </h3>
                  <p className="text-xs text-[#A1A1A6] max-w-sm mx-auto font-light leading-relaxed">
                    Your appointment details have been compiled. A WhatsApp chat with our store desk has been opened for direct confirmation.
                  </p>
                  <button
                    onClick={() => setSubmittedMessage(null)}
                    className="px-6 py-2.5 rounded-full border border-[#292929] hover:bg-white/10 text-xs font-mono text-white transition"
                  >
                    SUBMIT ANOTHER ENQUIRY
                  </button>
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Right Column: Store Details & Hospital Link (5 cols) */}
          <ScrollReveal variant="fadeUp" delay={0.2} className="lg:col-span-5 space-y-4">
            <div className="p-8 rounded-3xl bg-[#101010] border border-[#292929] space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] block">
                LOCATION &amp; STORE HOURS
              </span>

              <div className="space-y-3 text-xs font-mono">
                <div>
                  <span className="text-[#707070] block uppercase text-[10px]">Physical Store Address</span>
                  <p className="text-white mt-0.5 leading-relaxed font-sans">{BUSINESS_INFO.address}</p>
                </div>

                <div>
                  <span className="text-[#707070] block uppercase text-[10px]">Operating Hours</span>
                  <p className="text-white mt-0.5">{CONFIG_TO_CONFIRM.storeHours}</p>
                </div>

                <div>
                  <span className="text-[#707070] block uppercase text-[10px]">Direct Contact Phone</span>
                  <p className="text-white mt-0.5">{CONFIG_TO_CONFIRM.phone}</p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={EYERIS_LOCATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full border border-[#292929] hover:bg-white hover:text-black text-white font-mono text-xs tracking-wider flex items-center justify-center gap-2 transition"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>OPEN IN GOOGLE MAPS</span>
                </a>
              </div>
            </div>

            {/* Corporate Optical Benefits Soft Card */}
            <div className="p-6 rounded-3xl bg-[#101010] border border-[#292929] space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white font-bold block">
                CORPORATE VISION BENEFITS
              </span>
              <p className="text-xs text-[#A1A1A6] font-light leading-relaxed">
                Ask us how to use your company's optical benefits, subject to your company policy. Itemized GST medical invoices provided.
              </p>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
