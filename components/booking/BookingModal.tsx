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

    // Check existing stored appointments
    const stored = localStorage.getItem('eyeris_appointments');
    const storedBookings = stored ? JSON.parse(stored) : [];

    const isConflict = storedBookings.some(
      (b: any) =>
        b.date === formData.preferredDate &&
        b.time === formData.preferredTime &&
        b.status !== 'Cancelled'
    );

    if (isConflict) {
      setConflictError(
        'This specific time slot on that date has already been reserved. Please pick another convenient time slot!'
      );
      return;
    }

    const refId = `EY-${Math.floor(1000 + Math.random() * 9000)}`;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div className="bg-obsidian apple-glass-elevated rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full apple-glass text-apple-subtext hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Header */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full apple-glass text-apple-blue-light text-xs font-mono uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-apple-blue-light" />
              <span>DIRECT STORE APPOINTMENT • NO WAITING</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
              Reserve Your VIP Visit
            </h3>
            <p className="text-xs text-apple-subtext mb-6">
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
                <label className="block text-xs font-mono text-apple-subtext mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-apple-blue-light" />
                  <span>FULL NAME:</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Varma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-apple-border text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-apple-blue"
                />
              </div>

              {/* Mobile Phone */}
              <div>
                <label className="block text-xs font-mono text-apple-subtext mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-apple-blue-light" />
                  <span>WHATSAPP MOBILE NUMBER:</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-apple-border text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-apple-blue"
                />
              </div>

              {/* Select Service */}
              <div>
                <label className="block text-xs font-mono text-apple-subtext mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-apple-blue-light" />
                  <span>CONSULTATION SERVICE:</span>
                </label>
                <select
                  value={formData.visitReason}
                  onChange={(e) => setFormData({ ...formData, visitReason: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-apple-border text-white text-sm focus:outline-none focus:border-apple-blue"
                >
                  {services.map((s, idx) => (
                    <option key={idx} value={s} className="bg-obsidian text-white">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time Slot Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-apple-subtext mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-apple-blue-light" />
                    <span>DATE:</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3 py-3 rounded-xl bg-surface border border-apple-border text-white text-xs focus:outline-none focus:border-apple-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-apple-subtext mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-apple-blue-light" />
                    <span>TIME SLOT:</span>
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3 py-3 rounded-xl bg-surface border border-apple-border text-white text-xs focus:outline-none focus:border-apple-blue"
                  >
                    {timeSlots.map((ts, idx) => (
                      <option key={idx} value={ts} className="bg-obsidian text-white">
                        {ts}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Company / IT Allowance */}
              <div>
                <label className="block text-xs font-mono text-apple-subtext mb-1 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-apple-blue-light" />
                  <span>COMPANY (OPTIONAL FOR ₹20,000 CLAIM GST INVOICE):</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. TCS / Infosys / Microsoft / Amazon / Deloitte"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-apple-border text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-apple-blue"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 mt-2 rounded-xl bg-apple-blue hover:bg-apple-blue-hover text-white font-semibold text-xs font-mono tracking-wider flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-apple-blue/20"
              >
                <span>CONFIRM APPOINTMENT &amp; GET VIP PASS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* CONFIRMED VIP PASS SCREEN */
          <div className="space-y-6 text-center py-2">
            <div className="w-14 h-14 rounded-full bg-apple-blue/20 border border-apple-blue text-apple-blue-light flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-apple-blue-light" />
            </div>

            <div>
              <span className="text-xs font-mono text-apple-blue-light">BOOKING CONFIRMED</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Your EYERIS VIP Pass
              </h3>
              <p className="text-xs text-apple-subtext mt-1">
                Reference ID: <span className="font-mono text-white font-bold">{bookingId}</span>
              </p>
            </div>

            {/* Pass Card */}
            <div className="p-5 rounded-2xl apple-glass text-left space-y-3">
              <div className="flex justify-between border-b border-white/10 pb-2 text-xs">
                <span className="text-apple-subtext">Guest:</span>
                <span className="text-white font-medium">{formData.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2 text-xs">
                <span className="text-apple-subtext">Service:</span>
                <span className="text-apple-blue-light font-medium">{formData.visitReason}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2 text-xs">
                <span className="text-apple-subtext">Date &amp; Time:</span>
                <span className="text-white font-mono font-medium">{formData.preferredDate} • {formData.preferredTime}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-apple-subtext">Location:</span>
                <span className="text-white">KPHB Road No. 1 (Global Eye Hospital ground floor)</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-apple-green hover:opacity-90 text-black font-bold text-xs font-mono tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>CONFIRM ON WHATSAPP CONCIERGE</span>
              </a>

              <a
                href={EYERIS_LOCATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl apple-glass hover:bg-white/10 text-white font-mono text-xs tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <MapPin className="w-4 h-4 text-apple-blue-light" />
                <span>GET GOOGLE MAPS DIRECTIONS</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
