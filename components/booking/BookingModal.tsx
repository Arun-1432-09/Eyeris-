'use client';

import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, MessageSquare, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BookingData, EYERIS_LOCATION_URL } from './WhatsAppSync';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white border border-[#E5E5E5] rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full border border-[#E5E5E5] bg-white text-[#666666] hover:text-[#111111] hover:bg-[#F7F7F7] transition"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Header */}
            <div className="inline-block text-[10px] font-mono tracking-[0.25em] uppercase text-[#888888] mb-2">
              KPHB ROAD NO. 1 // PRIVATE CONSULTATION
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#111111] mb-1">
              Visit Enquiry Request
            </h3>
            <p className="text-xs text-[#666666] mb-6 font-light">
              Submit your request to receive an immediate WhatsApp confirmation pass with our store desk.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-mono text-[#666666] mb-1 flex items-center gap-1.5 uppercase">
                  <User className="w-3.5 h-3.5 text-[#111111]" />
                  <span>Full Name:</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Kumar"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F7F7] border border-[#E5E5E5] text-[#111111] placeholder-neutral-400 text-sm focus:outline-none focus:border-[#111111] transition"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-mono text-[#666666] mb-1 flex items-center gap-1.5 uppercase">
                  <Phone className="w-3.5 h-3.5 text-[#111111]" />
                  <span>WhatsApp Mobile Number:</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F7F7] border border-[#E5E5E5] text-[#111111] placeholder-neutral-400 text-sm focus:outline-none focus:border-[#111111] transition"
                />
              </div>

              {/* Consultation Service */}
              <div>
                <label className="block text-xs font-mono text-[#666666] mb-1 flex items-center gap-1.5 uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#111111]" />
                  <span>Service:</span>
                </label>
                <select
                  value={formData.visitReason}
                  onChange={(e) => setFormData({ ...formData, visitReason: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F7F7] border border-[#E5E5E5] text-[#111111] text-sm focus:outline-none focus:border-[#111111] transition"
                >
                  {services.map((s, idx) => (
                    <option key={idx} value={s} className="bg-white text-[#111111]">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time Slot Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-[#666666] mb-1 flex items-center gap-1.5 uppercase">
                    <Calendar className="w-3.5 h-3.5 text-[#111111]" />
                    <span>Date:</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3 py-3 rounded-xl bg-[#F7F7F7] border border-[#E5E5E5] text-[#111111] text-xs focus:outline-none focus:border-[#111111] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#666666] mb-1 flex items-center gap-1.5 uppercase">
                    <Clock className="w-3.5 h-3.5 text-[#111111]" />
                    <span>Time Slot:</span>
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3 py-3 rounded-xl bg-[#F7F7F7] border border-[#E5E5E5] text-[#111111] text-xs focus:outline-none focus:border-[#111111] transition"
                  >
                    {timeSlots.map((ts, idx) => (
                      <option key={idx} value={ts} className="bg-white text-[#111111]">
                        {ts}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notice */}
              <div className="p-3 rounded-xl bg-[#F7F7F7] border border-[#E5E5E5] text-[11px] font-mono text-[#666666]">
                Eye examinations and power assessments are arranged with Global Eye Hospital next door.
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 mt-2 rounded-full bg-[#111111] hover:bg-neutral-800 text-white font-mono font-semibold text-xs tracking-wider flex items-center justify-center gap-2 transition shadow-md"
              >
                <span>SUBMIT ENQUIRY TO WHATSAPP DESK</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="space-y-6 text-center py-4">
            <div className="w-14 h-14 rounded-full bg-[#111111]/10 text-[#111111] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                ENQUIRY REQUEST READY
              </span>
              <h3 className="text-2xl font-bold text-[#111111] mt-1">
                Your EYERIS Store Pass
              </h3>
              <p className="text-xs font-mono text-[#666666] mt-1">
                Reference: <strong className="text-[#111111]">{bookingId}</strong>
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F7F7F7] border border-[#E5E5E5] text-left space-y-2.5 text-xs font-mono">
              <div className="flex justify-between border-b border-[#E5E5E5] pb-2">
                <span className="text-[#888888]">Name:</span>
                <span className="text-[#111111] font-medium">{formData.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-[#E5E5E5] pb-2">
                <span className="text-[#888888]">Service:</span>
                <span className="text-[#111111] font-medium">{formData.visitReason}</span>
              </div>
              <div className="flex justify-between border-b border-[#E5E5E5] pb-2">
                <span className="text-[#888888]">Slot:</span>
                <span className="text-[#111111] font-medium">{formData.preferredDate} • {formData.preferredTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888888]">Store:</span>
                <span className="text-[#111111] font-medium">KPHB Road No. 1, Kukatpally</span>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-full bg-[#111111] hover:bg-neutral-800 text-white font-mono font-semibold text-xs tracking-wider flex items-center justify-center gap-2 transition shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>CONFIRM ON WHATSAPP NOW</span>
              </a>

              <a
                href={EYERIS_LOCATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full border border-[#E5E5E5] hover:bg-[#F7F7F7] text-[#111111] font-mono text-xs tracking-wider flex items-center justify-center gap-2 transition"
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
