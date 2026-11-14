'use client';

import React from 'react';
import { ShieldCheck, HeartHandshake, CheckCircle2, MapPin, Building2, Stethoscope, ArrowRight } from 'lucide-react';
import { EYERIS_LOCATION_URL } from '@/components/booking/WhatsAppSync';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface ConnectedCareProps {
  onOpenBooking: () => void;
}

export const ConnectedCare: React.FC<ConnectedCareProps> = ({ onOpenBooking }) => {
  return (
    <section id="hospital-care" className="py-20 bg-background border-t border-white/5 relative overflow-hidden">
      {/* Background soft ambient glows */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Top Header: Short & Clear */}
        <ScrollReveal variant="fadeUp" className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-mono uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5 text-brand-400" />
            <span>40 Years Family Trust • KPHB Rd #1</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            The <span className="bg-gradient-to-r from-brand-300 via-optic-blue to-brand-400 bg-clip-text text-transparent">Connected Care</span> Journey
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2">
            Interconnected on the ground floor with <strong className="text-white">Global Eye Hospital</strong>. Clinical doctor examination meets luxury optical dispensing.
          </p>
        </ScrollReveal>

        {/* 2-Column Story & Flow Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          {/* Visual Step-by-Step Pathway (7 cols) */}
          <ScrollReveal variant="fadeUp" delay={0.1} className="lg:col-span-7 bg-surface/80 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono uppercase tracking-wider text-brand-300 flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-brand-400" />
                <span>Seamless Patient Flow</span>
              </span>
              <span className="text-[11px] text-neutral-400 font-mono">Ground Floor Corridor</span>
            </div>

            <div className="space-y-6 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-brand-400 before:via-optic-blue before:to-brand-500">
              {/* Step 1 */}
              <div className="flex items-start gap-4 relative">
                <div className="w-10 h-10 rounded-full bg-brand-950 border border-brand-400 text-brand-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 z-10 shadow-lg shadow-brand-400/20">
                  01
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-serif">Ophthalmologist &amp; Doctor Examination</h4>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    Complete clinical eye examination, retina screening, and power checkup at Global Eye Hospital.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4 relative">
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-optic-blue text-optic-blue flex items-center justify-center font-mono font-bold text-xs shrink-0 z-10">
                  02
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-serif">Ground-Floor Corridor Transition</h4>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    Zero travel across city clinics. Walk directly through the internal lobby corridor into Eyeris with your prescription printout.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4 relative">
                <div className="w-10 h-10 rounded-full bg-brand-950 border border-brand-400 text-brand-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 z-10 shadow-lg shadow-brand-400/20">
                  03
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-serif">Designer Styling &amp; German Lens Surfacing</h4>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    Custom pantoscopic fitting for Ray-Ban, Oakley, or Stepper Titanium frames paired with ZEISS or German digital lenses.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Summary Pill */}
            <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-neutral-400">
                Prescribed eye drops and specialty medicines available at adjacent hospital counter.
              </span>
              <a
                href={EYERIS_LOCATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-brand-300 hover:text-white flex items-center gap-1.5 whitespace-nowrap"
              >
                <MapPin className="w-3.5 h-3.5 text-brand-400" />
                <span>Locate Store on Maps</span>
              </a>
            </div>
          </ScrollReveal>

          {/* Differentiator vs Commercial Chains (5 cols) */}
          <ScrollReveal variant="fadeUp" delay={0.2} className="lg:col-span-5 bg-surface-raised border border-white/10 rounded-3xl p-6 sm:p-7 backdrop-blur-xl shadow-2xl space-y-5">
            <div className="flex items-center gap-2 text-gold-400 pb-2 border-b border-white/10">
              <HeartHandshake className="w-4 h-4" />
              <h3 className="text-sm font-bold text-white font-serif">The Eyeris Distinction</h3>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              Unlike franchise chains selling mass-produced plastic spectacles, Eyeris focuses on authentic international frames, clinical lens precision, and lasting personal relationships.
            </p>

            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface/60 border border-white/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-white">40-Year Family Trust</p>
                  <p className="text-[10px] text-neutral-400">Two generations dedicated to precision dispensing.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface/60 border border-white/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-white">Practical Luxury Pricing</p>
                  <p className="text-[10px] text-neutral-400">Transparent pricing from ₹5,000 to ₹15,000+ for designer frames.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface/60 border border-white/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-white">Direct Medical Alignment</p>
                  <p className="text-[10px] text-neutral-400">Instant coordination with Global Eye Hospital doctors.</p>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-brand-400 to-brand-500 hover:from-brand-300 hover:to-brand-400 text-slate-950 font-bold text-xs shadow-lg transition"
            >
              <span>Schedule Eye Exam &amp; Styling</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
