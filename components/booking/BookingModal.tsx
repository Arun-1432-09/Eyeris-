'use client';

import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, MessageSquare, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BookingData, generateWhatsAppBookingUrl, EYERIS_LOCATION_URL } from './WhatsAppSync';
import { CONFIG_TO_CONFIRM } from '@/data/eyerisData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackage?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, initialPackage }) => {
  const [formData, setFormData] = useState<BookingData>({
    fullName: '',
    phone: '',
    visitReason: initialPackage || 'Lens Consultation & Prescription Surfacing',
    preferredDate: '',
    preferredTime: '11:00 AM - 01:00 PM (Morning Slot)',
    companyName: '',
    hasPrescription: false,
    notes: initialPackage ? `Requirement: ${initialPackage}` : '',
  });

  const [bookingId, setBookingId] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');

  useEffect(() => {
    if (!formData.preferredDate && typeof window !== 'undefined') {
      const today = new Date().toISOString().split('T')[0];
      setFormData((prev) => ({ ...prev, preferredDate: today }));
    }
  }, [formData.preferredDate]);

  if (!isOpen) return null;

  const timeSlots = [
    '11:00 AM - 01:00 PM (Morning Slot)',
    '02:00 PM - 04:00 PM (Afternoon Slot)',
    '05:00 PM - 07:00 PM (Peak Tech Hour Slot)',
    '07:30 PM - 09:00 PM (Evening Post-Work Slot)',
  ];

  const services = [
    'Runway Collection Private Fitting',
    'Lens Consultation (Progressive / Digital / DriveSafe)',
    'Curated Designer Frame Selection (Ray-Ban / Oakley / Prada / Stepper)',
    'Doctor Prescription Lens Fitting (Global Eye Hospital Corridor)',
    "Kids' Eyewear & Pediatric Consultation",
    'General Optical Consultation & Power Checkup',
    'Store Visit & In-Person Frame Try-On',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refId = `EY-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingId(refId);

    const message = `Hello Eyeris Opticals! I am submitting an *Enquiry Request* for an in-store appointment at your KPHB Road No. 1 store.%0A%0A*Reference ID:* ${refId}%0A*Name:* ${encodeURIComponent(formData.fullName)}%0A*Phone:* ${encodeURIComponent(formData.phone)}%0A*Service:* ${encodeURIComponent(formData.visitReason)}%0A*Preferred Date:* ${encodeURIComponent(formData.preferredDate)}%0A*Time Slot:* ${encodeURIComponent(formData.preferredTime)}`;

    const url = `https://wa.me/${CONFIG_TO_CONFIRM.whatsappPhone}?text=${message}`;
    setWhatsappUrl(url);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#101010] border border-[#292929] rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-luxury-lg my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full border border-[#292929] text-[#A1A1A6] hover:text-white hover:bg-white/10 transition"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Header */}
            <div className="inline-block text-[10px] font-mono tracking-[0.25em] uppercase text-[#707070] mb-2">
              KPHB ROAD NO. 1 // PRIVATE CONSULTATION
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
              Visit Enquiry Request
            </h3>
            <p className="text-xs text-[#A1A1A6] mb-6 font-light">
              Submit your request to receive an immediate WhatsApp confirmation pass with our store desk.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-mono text-[#A1A1A6] mb-1 flex items-center gap-1.5 uppercase">
                  <User className="w-3.5 h-3.5 text-white" />
                  <span>Full Name:</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Kumar"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-[#292929] text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-white transition"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-mono text-[#A1A1A6] mb-1 flex items-center gap-1.5 uppercase">
                  <Phone className="w-3.5 h-3.5 text-white" />
                  <span>WhatsApp Mobile Number:</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-[#292929] text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-white transition"
                />
              </div>

              {/* Consultation Service */}
              <div>
                <label className="block text-xs font-mono text-[#A1A1A6] mb-1 flex items-center gap-1.5 uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-white" />
                  <span>Service:</span>
                </label>
                <select
                  value={formData.visitReason}
                  onChange={(e) => setFormData({ ...formData, visitReason: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-[#292929] text-white text-sm focus:outline-none focus:border-white transition"
                >
                  {services.map((s, idx) => (
                    <option key={idx} value={s} className="bg-[#101010] text-white">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time Slot Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-[#A1A1A6] mb-1 flex items-center gap-1.5 uppercase">
                    <Calendar className="w-3.5 h-3.5 text-white" />
                    <span>Date:</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3 py-3 rounded-xl bg-[#050505] border border-[#292929] text-white text-xs focus:outline-none focus:border-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#A1A1A6] mb-1 flex items-center gap-1.5 uppercase">
                    <Clock className="w-3.5 h-3.5 text-white" />
                    <span>Time Slot:</span>
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3 py-3 rounded-xl bg-[#050505] border border-[#292929] text-white text-xs focus:outline-none focus:border-white transition"
                  >
                    {timeSlots.map((ts, idx) => (
                      <option key={idx} value={ts} className="bg-[#101010] text-white">
                        {ts}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Required Hospital Note */}
              <div className="p-3 rounded-xl bg-[#050505] border border-[#292929] text-[11px] font-mono text-[#A1A1A6]">
                Eye examinations and power assessments are arranged with Global Eye Hospital next door.
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 mt-2 rounded-full bg-white hover:bg-neutral-200 text-black font-mono font-semibold text-xs tracking-wider flex items-center justify-center gap-2 transition shadow-md"
              >
                <span>SUBMIT ENQUIRY TO WHATSAPP DESK</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="space-y-6 text-center py-4">
            <div className="w-14 h-14 rounded-full bg-white/10 text-white flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4AF37]">
                ENQUIRY REQUEST READY
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                Your EYERIS Store Pass
              </h3>
              <p className="text-xs font-mono text-[#A1A1A6] mt-1">
                Reference: <strong className="text-white">{bookingId}</strong>
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#050505] border border-[#292929] text-left space-y-2.5 text-xs font-mono">
              <div className="flex justify-between border-b border-[#292929] pb-2">
                <span className="text-[#707070]">Name:</span>
                <span className="text-white">{formData.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-[#292929] pb-2">
                <span className="text-[#707070]">Service:</span>
                <span className="text-white">{formData.visitReason}</span>
              </div>
              <div className="flex justify-between border-b border-[#292929] pb-2">
                <span className="text-[#707070]">Slot:</span>
                <span className="text-white">{formData.preferredDate} • {formData.preferredTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#707070]">Store:</span>
                <span className="text-white">KPHB Road No. 1, Kukatpally</span>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-full bg-white hover:bg-neutral-200 text-black font-mono font-semibold text-xs tracking-wider flex items-center justify-center gap-2 transition shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>CONFIRM ON WHATSAPP NOW</span>
              </a>

              <a
                href={EYERIS_LOCATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full border border-[#292929] hover:bg-white/5 text-white font-mono text-xs tracking-wider flex items-center justify-center gap-2 transition"
              >
                <span>OPEN IN GOOGLE MAPS</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
