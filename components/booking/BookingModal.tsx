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
    'Runway Lookbook 2026 Private Fitting',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md overflow-y-auto">
      <div className="bg-white border border-neutral-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-apple-xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full border border-neutral-200 text-apple-subtext hover:text-black hover:bg-neutral-100 transition"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Header */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-black text-xs font-mono uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>DIRECT STORE APPOINTMENT • NO WAITING</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-black mb-1">
              Reserve Your VIP Visit
            </h3>
            <p className="text-xs text-apple-subtext mb-6">
              Located at KPHB Road No. 1 (Interconnected on the ground floor with Global Eye Hospital).
            </p>

            {conflictError && (
              <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{conflictError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-mono text-apple-subtext mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-black" />
                  <span>FULL NAME:</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Varma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FBFBFD] border border-neutral-300 text-black placeholder-neutral-400 text-sm focus:outline-none focus:border-black"
                />
              </div>

              {/* Mobile Phone */}
              <div>
                <label className="block text-xs font-mono text-apple-subtext mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-black" />
                  <span>WHATSAPP MOBILE NUMBER:</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FBFBFD] border border-neutral-300 text-black placeholder-neutral-400 text-sm focus:outline-none focus:border-black"
                />
              </div>

              {/* Select Service */}
              <div>
                <label className="block text-xs font-mono text-apple-subtext mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  <span>CONSULTATION SERVICE:</span>
                </label>
                <select
                  value={formData.visitReason}
                  onChange={(e) => setFormData({ ...formData, visitReason: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FBFBFD] border border-neutral-300 text-black text-sm focus:outline-none focus:border-black"
                >
                  {services.map((s, idx) => (
                    <option key={idx} value={s} className="bg-white text-black">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time Slot Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-apple-subtext mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-black" />
                    <span>DATE:</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3 py-3 rounded-xl bg-[#FBFBFD] border border-neutral-300 text-black text-xs focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-apple-subtext mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-black" />
                    <span>TIME SLOT:</span>
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3 py-3 rounded-xl bg-[#FBFBFD] border border-neutral-300 text-black text-xs focus:outline-none focus:border-black"
                  >
                    {timeSlots.map((ts, idx) => (
                      <option key={idx} value={ts} className="bg-white text-black">
                        {ts}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Company / IT Allowance */}
              <div>
                <label className="block text-xs font-mono text-apple-subtext mb-1 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-black" />
                  <span>COMPANY (OPTIONAL FOR ₹20,000 CLAIM GST INVOICE):</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. TCS / Infosys / Microsoft / Amazon / Deloitte"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FBFBFD] border border-neutral-300 text-black placeholder-neutral-400 text-sm focus:outline-none focus:border-black"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 mt-2 rounded-full bg-black hover:bg-neutral-800 text-white font-medium text-xs font-mono tracking-wider flex items-center justify-center gap-2 transition-all shadow-apple-sm active:scale-95"
              >
                <span>CONFIRM APPOINTMENT &amp; GET VIP PASS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* CONFIRMED VIP PASS SCREEN */
          <div className="space-y-6 text-center py-2">
            <div className="w-14 h-14 rounded-full bg-neutral-100 border border-neutral-300 text-black flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8 text-black" />
            </div>

            <div>
              <span className="text-xs font-mono text-emerald-600 font-bold uppercase tracking-wider">Booking Confirmed</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-black mt-1">
                Your EYERIS VIP Pass
              </h3>
              <p className="text-xs text-apple-subtext mt-1">
                Reference ID: <span className="font-mono text-black font-bold">{bookingId}</span>
              </p>
            </div>

            {/* Pass Card */}
            <div className="p-5 rounded-2xl bg-[#FBFBFD] border border-neutral-200 text-left space-y-3">
              <div className="flex justify-between border-b border-neutral-200 pb-2 text-xs">
                <span className="text-apple-subtext">Guest:</span>
                <span className="text-black font-semibold">{formData.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-200 pb-2 text-xs">
                <span className="text-apple-subtext">Service:</span>
                <span className="text-black font-medium">{formData.visitReason}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-200 pb-2 text-xs">
                <span className="text-apple-subtext">Date &amp; Time:</span>
                <span className="text-black font-mono font-medium">{formData.preferredDate} • {formData.preferredTime}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-apple-subtext">Location:</span>
                <span className="text-black">KPHB Road No. 1 (Global Eye Hospital ground floor)</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-full bg-black hover:bg-neutral-800 text-white font-medium text-xs font-mono tracking-wider flex items-center justify-center gap-2 transition-all shadow-apple-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>CONFIRM ON WHATSAPP CONCIERGE</span>
              </a>

              <a
                href={EYERIS_LOCATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 text-black font-mono text-xs tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <MapPin className="w-4 h-4 text-black" />
                <span>GET GOOGLE MAPS DIRECTIONS</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
