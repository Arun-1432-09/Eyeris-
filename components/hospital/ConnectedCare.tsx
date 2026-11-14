'use client';

import React from 'react';
import { ShieldCheck, HeartHandshake, CheckCircle2, MapPin, Building2, UserCheck, Stethoscope, ArrowRight } from 'lucide-react';
import { EYERIS_LOCATION_URL } from '@/components/booking/WhatsAppSync';

interface ConnectedCareProps {
  onOpenBooking: () => void;
}

export const ConnectedCare: React.FC<ConnectedCareProps> = ({ onOpenBooking }) => {
  return (
    <section id="hospital-care" className="py-20 bg-background border-b border-white/5 relative overflow-hidden">
      {/* Background soft ambient glows */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Top Heritage Badge */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-mono uppercase tracking-wider mb-4">
            <Building2 className="w-3.5 h-3.5 text-brand-400" />
            <span>Two Decades in KPHB • 40 Years Family Trust</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white mb-4">
            The <span className="bg-gradient-to-r from-brand-300 via-optic-blue to-brand-400 bg-clip-text text-transparent">Connected Care</span> Advantage
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            We are not just a retail optical showroom. Eyeris is internally interconnected on the ground floor with{' '}
            <strong className="text-white">Global Eye Hospital</strong> at KPHB Road No. 1, offering Hyderabad’s only true end-to-end clinical eye care and luxury eyewear sanctuary.
          </p>
        </div>

        {/* 2-Column Story & Flow Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Visual Step-by-Step Pathway (7 cols) */}
          <div className="lg:col-span-7 bg-surface/80 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs font-mono uppercase tracking-wider text-brand-300 flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-brand-400" />
                <span>The Patient &amp; Client Journey</span>
              </span>
              <span className="text-[11px] text-neutral-400">Ground Floor Internal Corridor</span>
            </div>

            <div className="space-y-6 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-brand-400 before:via-optic-blue before:to-brand-500">
              {/* Step 1 */}
              <div className="flex items-start gap-4 relative">
                <div className="w-10 h-10 rounded-full bg-brand-950 border border-brand-400 text-brand-400 flex items-center justify-center font-mono font-bold text-sm shrink-0 z-10 shadow-[0_0_15px_rgba(0,196,159,0.3)]">
                  1
                </div>
                <div>
                  <h4 className="text-base font-bold text-white font-display">Ophthalmologist &amp; Doctor Consultation</h4>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    Complete eye examinations, retina screening, and intraocular pressure checks by senior specialists at Global Eye Hospital.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4 relative">
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-optic-blue text-optic-blue flex items-center justify-center font-mono font-bold text-sm shrink-0 z-10">
                  2
                </div>
                <div>
                  <h4 className="text-base font-bold text-white font-display">Direct Ground-Floor Corridor Transition</h4>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    No need to travel between clinics and markets. Walk straight through the internal hospital lobby counter directly into Eyeris with your prescription printout.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4 relative">
                <div className="w-10 h-10 rounded-full bg-brand-950 border border-brand-400 text-brand-400 flex items-center justify-center font-mono font-bold text-sm shrink-0 z-10">
                  3
                </div>
                <div>
                  <h4 className="text-base font-bold text-white font-display">Bespoke Frame Selection &amp; Lens Calibration</h4>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    Our master opticians evaluate your pantoscopic tilt, bridge fit, and daily occupational screen demands before customizing German digital lenses.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Summary Pill */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-neutral-300">
                Prescribed eye drops and specialty medicines also available at our attached hospital counter.
              </span>
              <a
                href={EYERIS_LOCATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-brand-300 hover:text-white flex items-center gap-1.5 whitespace-nowrap"
              >
                <MapPin className="w-3.5 h-3.5 text-brand-400" />
                <span>Locate KPHB Road No. 1</span>
              </a>
            </div>
          </div>

          {/* Differentiator vs Chains (5 cols) */}
          <div className="lg:col-span-5 bg-surface-raised border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="flex items-center gap-2 text-gold-400 pb-3 border-b border-white/10">
              <HeartHandshake className="w-5 h-5" />
              <h3 className="text-base font-bold text-white font-display">Why Hyderabad Trusts Eyeris</h3>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              In a market crowded with franchise chains like Lenskart and Titan Eye+, Eyeris remains the chosen optical home for families who value personal attention and uncompromised optical accuracy over mass-produced plastics.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-surface/60 border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-white">40-Year Family Legacy</p>
                  <p className="text-[11px] text-neutral-400">Two generations dedicated exclusively to precision dispensing.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-surface/60 border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-white">Practical Luxury Pricing</p>
                  <p className="text-[11px] text-neutral-400">Authentic Ray-Ban, Oakley, and Prada at practical, transparent prices.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-surface/60 border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-white">Direct Medical Alignment</p>
                  <p className="text-[11px] text-neutral-400">Instant coordination with Global Eye Hospital doctors for complex refractive powers.</p>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-brand-400 to-brand-500 hover:from-brand-300 hover:to-brand-400 text-slate-950 font-bold text-xs shadow-lg transition"
            >
              <span>Schedule Hospital-Backed Eye Exam</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
