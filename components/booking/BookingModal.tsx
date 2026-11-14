'use client';

import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, Briefcase, MapPin, CheckCircle2, MessageSquare, Sparkles, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
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
    visitReason: initialPackage || 'Lens Consultation (Progressive / Digital / DriveSafe)',
    preferredDate: '',
    preferredTime: '06:00 PM - 07:00 PM (Evening Slot)',
    companyName: '',
    hasPrescription: false,
    notes: initialPackage ? `Interested in: ${initialPackage}` : '',
  });

  const [bookingId, setBookingId] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');
  const [conflictError, setConflictError] = useState<string | null>(null);

  useEffect(() => {
    if (!formData.preferredDate && typeof window !== 'undefined') {
      const today = new Date().toISOString().split('T')[0];
      setFormData((prev) => ({ ...prev, preferredDate: today }));
    }
  }, [formData.preferredDate]);

  if (!isOpen) return null;

  const timeSlots = [
    '11:00 AM - 12:00 PM (Morning Slot)',
    '01:00 PM - 02:00 PM (Afternoon Slot)',
    '04:00 PM - 05:00 PM (Late Afternoon Slot)',
    '06:00 PM - 07:00 PM (Peak Tech Hour Slot)',
    '07:30 PM - 08:30 PM (Evening Post-Work Slot)',
  ];

  const services = [
    'Lens Consultation (Progressive / Digital / DriveSafe)',
    'Curated Designer Frame Selection (Ray-Ban / Oakley / Prada)',
    '₹20,000 Corporate Vision Insurance Claim & Styling',
    'Doctor Rx Lens Fitting (Global Eye Hospital Connected Corridor)',
    'Kids & Pediatric Eyewear Consultation',
    'General Optical Consultation & Power Checkup',
    'Store Visit & In-Person Frame Try-On',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConflictError(null);

    // Double booking prevention check against stored appointments
    const storedBookings = JSON.parse(localStorage.getItem('eyeris_appointments') || '[]');
    const isSlotTaken = storedBookings.some(
      (b: any) =>
        b.date === formData.preferredDate &&
        b.time === formData.preferredTime &&
        b.status !== 'Cancelled'
    );

    if (isSlotTaken) {
      setConflictError(
        'This specific slot is already reserved. Please select another time slot or date.'
      );
      return;
    }

    const refId = 'EYR-' + Math.floor(10000 + Math.random() * 90000);
    setBookingId(refId);

    // Save to appointments store
    const newAppointment = {
      id: refId,
      customerName: formData.fullName,
      phone: formData.phone,
      service: formData.visitReason,
      date: formData.preferredDate,
      time: formData.preferredTime,
      company: formData.companyName || 'Individual',
      notes: formData.notes,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('eyeris_appointments', JSON.stringify([newAppointment, ...storedBookings]));

    const url = generateWhatsAppBookingUrl(formData);
    setWhatsappUrl(url);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-surface border border-white/15 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-graphite border border-white/10 text-neutral-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Header */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-500/10 border border-champagne-500/30 text-champagne-400 text-xs font-mono uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DIRECT STORE APPOINTMENT • NO WAITING</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-1">
              Reserve Your VIP Visit
            </h3>
            <p className="text-xs text-neutral-400 mb-6 font-sans">
              Located at KPHB Road No. 1 (Interconnected on the ground floor with Global Eye Hospital).
            </p>

            {conflictError && (
              <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{conflictError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-champagne-400" />
                  <span>FULL NAME:</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Varma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-graphite border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-brand-400"
                />
              </div>

              {/* Mobile Phone */}
              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-champagne-400" />
                  <span>WHATSAPP MOBILE NUMBER:</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-graphite border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-brand-400"
                />
              </div>

              {/* Select Service */}
              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
                  <span>CONSULTATION SERVICE:</span>
                </label>
                <select
                  value={formData.visitReason}
                  onChange={(e) => setFormData({ ...formData, visitReason: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-graphite border border-white/10 text-white text-sm focus:outline-none focus:border-brand-400"
                >
                  {services.map((s, idx) => (
                    <option key={idx} value={s} className="bg-graphite text-white">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time Slot Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-champagne-400" />
                    <span>DATE:</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3 py-3 rounded-xl bg-graphite border border-white/10 text-white text-xs focus:outline-none focus:border-brand-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-champagne-400" />
                    <span>TIME SLOT:</span>
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3 py-3 rounded-xl bg-graphite border border-white/10 text-white text-xs focus:outline-none focus:border-brand-400"
                  >
                    {timeSlots.map((ts, idx) => (
                      <option key={idx} value={ts} className="bg-graphite text-white">
                        {ts}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Company / IT Allowance */}
              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-champagne-400" />
                  <span>COMPANY (OPTIONAL FOR ₹20,000 CLAIM GST INVOICE):</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. TCS / Infosys / Microsoft / Amazon / Deloitte"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-graphite border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-brand-400"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 mt-2 rounded-xl bg-champagne-500 hover:bg-champagne-400 text-slate-950 font-bold text-xs font-mono tracking-wider flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 shadow-lg"
              >
                <span>CONFIRM APPOINTMENT &amp; GET VIP PASS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* CONFIRMED VIP PASS SCREEN */
          <div className="space-y-6 text-center py-2">
            <div className="w-14 h-14 rounded-2xl bg-brand-500/20 border border-brand-400/40 text-brand-300 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-brand-400" />
            </div>

            <div>
              <span className="text-xs font-mono text-champagne-400">BOOKING CONFIRMED</span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                Your EYERIS VIP Pass
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Reference ID: <span className="font-mono text-brand-300 font-bold">{bookingId}</span>
              </p>
            </div>

            {/* Pass Card */}
            <div className="p-5 rounded-2xl bg-graphite border border-brand-400/30 text-left space-y-3">
              <div className="flex justify-between border-b border-white/10 pb-2 text-xs">
                <span className="text-neutral-400">Guest:</span>
                <span className="text-white font-medium">{formData.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2 text-xs">
                <span className="text-neutral-400">Service:</span>
                <span className="text-brand-300 font-medium">{formData.visitReason}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2 text-xs">
                <span className="text-neutral-400">Date & Time:</span>
                <span className="text-champagne-300 font-mono font-medium">{formData.preferredDate} • {formData.preferredTime}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Location:</span>
                <span className="text-white">KPHB Road No. 1 (Global Eye Hospital ground floor)</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs font-mono tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>CONFIRM ON WHATSAPP CONCIERGE</span>
              </a>

              <a
                href={EYERIS_LOCATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-surface hover:bg-surface-hover border border-white/15 text-neutral-200 hover:text-white font-mono text-xs tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <MapPin className="w-4 h-4 text-brand-400" />
                <span>GET GOOGLE MAPS DIRECTIONS</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
