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
    <section id="hospital-care" className="py-24 sm:py-32 bg-white text-black border-b border-neutral-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Top Header: Short & Clear */}
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-apple-subtext text-xs font-mono uppercase tracking-wider mb-4 shadow-apple-sm">
              <Building2 className="w-3.5 h-3.5 text-black" />
              <span>40 Years Family Trust • KPHB Rd #1</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-black tracking-tight leading-tight">
              The Connected Care{' '}
              <span className="text-neutral-500 font-light block sm:inline">
                Corridor.
              </span>
            </h2>
            <p className="text-apple-subtext text-sm sm:text-base mt-3">
              Interconnected on the ground floor with <strong className="text-black font-semibold">Global Eye Hospital</strong>. Clinical ophthalmologist examination meets luxury optical dispensing.
            </p>
          </div>
        </ScrollReveal>

        {/* 2-Column Story & Flow Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-10">
          {/* Visual Step-by-Step Pathway (7 cols) */}
          <ScrollReveal animation="fade-up" delay={0.1} className="lg:col-span-7">
            <div className="bg-[#FBFBFD] border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-apple-sm space-y-6 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-black font-bold flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-black" />
                    <span>Seamless Clinical Pathway</span>
                  </span>
                  <span className="text-[11px] text-apple-subtext font-mono">Ground Floor Corridor</span>
                </div>

                <div className="space-y-6 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-neutral-200">
                  {/* Step 1 */}
                  <div className="flex items-start gap-4 relative">
                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 z-10 shadow-apple-sm">
                      01
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-black">Ophthalmologist &amp; Doctor Examination</h4>
                      <p className="text-xs text-apple-subtext mt-1 leading-relaxed">
                        Complete clinical eye examination, retina screening, and power checkup inside Global Eye Hospital.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-4 relative">
                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 z-10 shadow-apple-sm">
                      02
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-black">Ground-Floor Corridor Transition</h4>
                      <p className="text-xs text-apple-subtext mt-1 leading-relaxed">
                        Zero travel across city clinics. Walk directly through the internal lobby corridor into Eyeris with your prescription printout.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-4 relative">
                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 z-10 shadow-apple-sm">
                      03
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-black">Designer Styling &amp; German Lens Surfacing</h4>
                      <p className="text-xs text-apple-subtext mt-1 leading-relaxed">
                        Custom pantoscopic fitting for Ray-Ban, Oakley, or Stepper Titanium frames paired with ZEISS or German digital lenses.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Summary Pill */}
              <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] text-apple-subtext">
                  Prescription eye drops and specialty medicines available at adjacent hospital counter.
                </span>
                <a
                  href={EYERIS_LOCATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-black hover:text-neutral-700 flex items-center gap-1.5 whitespace-nowrap"
                >
                  <MapPin className="w-3.5 h-3.5 text-black" />
                  <span>Locate Store on Maps</span>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Differentiator vs Commercial Chains (5 cols) */}
          <ScrollReveal animation="fade-up" delay={0.2} className="lg:col-span-5">
            <div className="bg-[#FBFBFD] border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-apple-sm space-y-6 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-black pb-3 border-b border-neutral-200 mb-4">
                  <HeartHandshake className="w-4 h-4 text-black" />
                  <h3 className="text-sm font-bold text-black">The Eyeris Distinction</h3>
                </div>

                <p className="text-xs text-apple-subtext leading-relaxed mb-4">
                  Unlike commercial franchise chains selling mass-produced plastic spectacles, Eyeris focuses on authentic international frames, clinical lens precision, and lasting personal relationships.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-neutral-200 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-black">40-Year Family Trust</p>
                      <p className="text-[11px] text-apple-subtext">Two generations dedicated to precision optical dispensing in Hyderabad.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-neutral-200 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-black">Practical Luxury Pricing</p>
                      <p className="text-[11px] text-apple-subtext">Transparent pricing from ₹5,000 to ₹15,000+ for designer frames.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-neutral-200 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-black">Direct Medical Coordination</p>
                      <p className="text-[11px] text-apple-subtext">Instant verification with Global Eye Hospital ophthalmologists.</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenBooking}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-black hover:bg-neutral-800 text-white font-medium text-xs tracking-wide shadow-apple-sm transition active:scale-95"
              >
                <span>Schedule Eye Exam &amp; Styling</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
