'use client';

import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, Briefcase, MapPin, CheckCircle2, MessageSquare, Sparkles, ArrowRight } from 'lucide-react';
import { BookingData, generateWhatsAppBookingUrl, EYERIS_LOCATION_URL, EYERIS_ADDRESS } from './WhatsAppSync';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackage?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, initialPackage }) => {
  const [formData, setFormData] = useState<BookingData>({
    fullName: '',
    phone: '',
    visitReason: initialPackage || '14-Point Comprehensive Eye Power Checkup',
    preferredDate: '',
    preferredTime: '06:00 PM - 07:00 PM (Evening Slot)',
    companyName: '',
    hasPrescription: false,
    notes: initialPackage ? `Interested in: ${initialPackage}` : '',
  });

  useEffect(() => {
    if (!formData.preferredDate && typeof window !== 'undefined') {
      const today = new Date().toISOString().split('T')[0];
      setFormData((prev) => ({ ...prev, preferredDate: today }));
    }
  }, [formData.preferredDate]);

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = generateWhatsAppBookingUrl(formData);
    setWhatsappUrl(url);
    setIsSubmitted(true);
    // Automatically launch WhatsApp in new tab for instant sync
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const timeSlots = [
    '11:00 AM - 12:00 PM (Morning)',
    '01:00 PM - 02:00 PM (Afternoon)',
    '04:00 PM - 05:00 PM (Late Afternoon)',
    '06:00 PM - 07:00 PM (Peak Tech Hour)',
    '07:30 PM - 08:30 PM (Evening Post-Work)',
  ];

  const reasons = [
    '14-Point Comprehensive Eye Power Checkup',
    'Doctor Rx Lens Fitting (Global Eye Hospital Corridor)',
    '₹20,000 Corporate Vision Insurance Claim & Styling',
    'Curated Designer Frame Try-on (Ray-Ban / Oakley / Prada)',
    'ZEISS DriveSafe / Night Driving Lens Consultation',
    'Pediatric & Kids Myopia Management Lens Fit',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-surface-raised border border-brand-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-surface border border-white/10 text-neutral-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Header */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 text-xs font-mono uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>Direct Store Appointment &amp; WhatsApp VIP Pass</span>
            </div>

            <h3 className="text-2xl font-bold text-white font-display mb-1">
              Reserve Your Consultation
            </h3>
            <p className="text-xs text-neutral-400 mb-6">
              Located at KPHB Road No. 1 (Interconnected with Global Eye Hospital). Zero waiting time with your reserved VIP slot.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-brand-400" />
                  <span>Full Name:</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sravan Kumar"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-400"
                />
              </div>

              {/* WhatsApp Phone */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-brand-400" />
                  <span>WhatsApp Number (for instant confirmation &amp; pass):</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-400"
                />
              </div>

              {/* Visit Reason */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Reason for Store Visit:
                </label>
                <select
                  value={formData.visitReason}
                  onChange={(e) => setFormData({ ...formData, visitReason: e.target.value })}
                  className="w-full bg-surface border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-400"
                >
                  {reasons.map((r, i) => (
                    <option key={i} value={r} className="bg-surface-raised text-white">
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-brand-400" />
                    <span>Preferred Date:</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-400" />
                    <span>Time Slot:</span>
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-400"
                  >
                    {timeSlots.map((ts, i) => (
                      <option key={i} value={ts} className="bg-surface-raised text-white">
                        {ts}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Corporate Company Name (Optional) */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1 flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-gold-400" />
                  <span>Company Name (For corporate insurance invoice, optional):</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Microsoft, TCS, Infosys, Amazon, Tech Mahindra"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full bg-surface border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-brand-400"
                />
              </div>

              {/* Checkbox for existing prescription */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="hasRx"
                  checked={formData.hasPrescription}
                  onChange={(e) => setFormData({ ...formData, hasPrescription: e.target.checked })}
                  className="w-4 h-4 rounded border-neutral-700 text-brand-500 focus:ring-brand-400 bg-surface"
                />
                <label htmlFor="hasRx" className="text-xs text-neutral-300 cursor-pointer">
                  I already have an eye power prescription from Global Eye Hospital or another clinic
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full mt-4 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-brand-400 to-brand-500 hover:from-brand-300 hover:to-brand-400 text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(0,196,159,0.35)] transition-all flex items-center justify-center gap-2"
              >
                <span>Generate VIP Pass &amp; Open WhatsApp CRM</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* VIP Pass Confirmation State */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-brand-500/20 border border-brand-500 text-brand-300 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(0,196,159,0.4)]">
              <CheckCircle2 className="w-8 h-8 text-brand-400" />
            </div>

            <h3 className="text-2xl font-bold text-white font-display mb-1">
              VIP Slot Pass Reserved!
            </h3>
            <p className="text-xs text-neutral-400 mb-6">
              Your appointment details have been dispatched to the Eyeris KPHB Store Desk.
            </p>

            {/* Pass Summary Ticket */}
            <div className="p-5 rounded-2xl bg-surface border border-brand-500/30 text-left space-y-2 mb-6">
              <div className="flex justify-between text-xs pb-2 border-b border-white/10">
                <span className="text-neutral-400">Reserved Guest:</span>
                <span className="font-bold text-white">{formData.fullName}</span>
              </div>
              <div className="flex justify-between text-xs pb-2 border-b border-white/10">
                <span className="text-neutral-400">Date &amp; Slot:</span>
                <span className="font-bold text-brand-300">{formData.preferredDate} • {formData.preferredTime}</span>
              </div>
              <div className="flex justify-between text-xs pb-2 border-b border-white/10">
                <span className="text-neutral-400">Service:</span>
                <span className="text-white font-medium">{formData.visitReason}</span>
              </div>
              <div className="flex items-start gap-2 pt-1 text-[11px] text-neutral-400">
                <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0 mt-0.5" />
                <span>{EYERIS_ADDRESS}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-green-500 hover:bg-green-400 text-slate-950 font-bold text-xs transition shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open WhatsApp Chat Confirmation</span>
              </a>

              <a
                href={EYERIS_LOCATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-surface border border-white/10 hover:border-white/20 text-neutral-200 text-xs font-semibold transition"
              >
                <MapPin className="w-4 h-4 text-brand-400" />
                <span>Open Google Maps Directions</span>
              </a>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="text-xs text-neutral-400 hover:text-white pt-2 block mx-auto transition"
              >
                Close and return to page
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
