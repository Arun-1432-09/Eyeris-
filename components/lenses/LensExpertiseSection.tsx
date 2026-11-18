'use client';

import React, { useState } from 'react';
import { LENS_GROUPS, LensExpertiseGroup } from '@/data/eyerisData';
import { Check, ShieldAlert, ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import { createWhatsAppBookingLink } from '@/components/booking/WhatsAppSync';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface LensExpertiseSectionProps {
  onOpenBooking: () => void;
  onOpenLensFinder?: () => void;
}

export const LensExpertiseSection: React.FC<LensExpertiseSectionProps> = ({
  onOpenBooking,
  onOpenLensFinder,
}) => {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const activeGroup = LENS_GROUPS[activeGroupIndex];

  return (
    <section id="eye-care" className="py-24 sm:py-36 bg-[#050505] text-white border-b border-[#292929] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <ScrollReveal variant="fadeUp" className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#707070] mb-3">
            FLAGSHIP OPHTHALMIC DISPENSING
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Lens Expertise.{' '}
            <span className="font-light text-[#A1A1A6]">Equal in Weight to Frames.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1A6] font-light mt-4 leading-relaxed">
            Eyeris studies your prescription, occupation, lifestyle and daily visual activities before suggesting lenses, taking millimeter-accurate pupil and pantoscopic measurements.
          </p>
        </ScrollReveal>

        {/* 4-Step Personal Consultation Process Ribbon */}
        <ScrollReveal variant="fadeUp" delay={0.1}>
          <div className="p-6 rounded-3xl bg-[#101010] border border-[#292929] mb-12 sm:mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#707070] block mb-4">
              THE 4-STEP PERSONAL CONSULTATION PROTOCOL
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-1.5 border-l-2 border-white/20 pl-4">
                <span className="text-[11px] font-mono text-white font-bold">01 // PRESCRIPTION</span>
                <p className="text-xs text-[#A1A1A6] leading-relaxed">
                  Doctor prescription printout review from Global Eye Hospital or external clinic.
                </p>
              </div>

              <div className="space-y-1.5 border-l-2 border-white/20 pl-4">
                <span className="text-[11px] font-mono text-white font-bold">02 // OCCUPATION</span>
                <p className="text-xs text-[#A1A1A6] leading-relaxed">
                  Analyzing daily screen hours, dual-monitor desks, driving habits, or school requirements.
                </p>
              </div>

              <div className="space-y-1.5 border-l-2 border-white/20 pl-4">
                <span className="text-[11px] font-mono text-white font-bold">03 // MEASUREMENTS</span>
                <p className="text-xs text-[#A1A1A6] leading-relaxed">
                  Taking precise pupillary distance (PD), fitting height, and frame vertex tilt calibration.
                </p>
              </div>

              <div className="space-y-1.5 border-l-2 border-white/20 pl-4">
                <span className="text-[11px] font-mono text-white font-bold">04 // RECOMMENDATION</span>
                <p className="text-xs text-[#A1A1A6] leading-relaxed">
                  Selecting the exact lens index, freeform corridor design, and anti-reflective coating.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Tabbed Interactive Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 6 Category Selector Tabs (5 cols) */}
          <div className="lg:col-span-5 space-y-2">
            {LENS_GROUPS.map((group, idx) => (
              <button
                key={group.id}
                onClick={() => setActiveGroupIndex(idx)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                  activeGroupIndex === idx
                    ? 'bg-white text-black border-white shadow-luxury-md'
                    : 'bg-[#101010] text-[#A1A1A6] border-[#292929] hover:border-neutral-500 hover:text-white'
                }`}
              >
                <div>
                  <span className={`text-[10px] font-mono uppercase tracking-wider block ${activeGroupIndex === idx ? 'text-neutral-600' : 'text-[#707070]'}`}>
                    Category 0{idx + 1}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold leading-tight mt-0.5">
                    {group.title}
                  </h3>
                </div>

                <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${activeGroupIndex === idx ? 'translate-x-1 text-black' : 'text-[#707070]'}`} />
              </button>
            ))}
          </div>

          {/* Right Column: Detailed Group Stage with Minimal SVG Diagram (7 cols) */}
          <div className="lg:col-span-7 bg-[#101010] border border-[#292929] rounded-3xl p-6 sm:p-10 shadow-luxury-lg space-y-6">
            
            {/* Header */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#A1A1A6] pb-3 border-b border-[#292929] mb-4">
                <span className="uppercase tracking-widest">{activeGroup.subtitle}</span>
                <span className="text-white font-bold">Category 0{activeGroupIndex + 1} of 06</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {activeGroup.title}
              </h3>
              <p className="text-xs font-mono text-[#707070]">
                Target Focus: <span className="text-[#A1A1A6]">{activeGroup.targetAudience}</span>
              </p>
            </div>

            {/* Minimal SVG Lens Diagram Visualization */}
            <div className="w-full h-44 rounded-2xl bg-[#050505] border border-[#292929] flex items-center justify-center p-6 relative overflow-hidden">
              <svg className="w-64 h-32" viewBox="0 0 240 120" fill="none">
                {/* Aspheric Convex/Concave Curve */}
                <path
                  d="M 30,60 Q 120,15 210,60 Q 120,105 30,60 Z"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeOpacity="0.8"
                  fill="rgba(255,255,255,0.03)"
                />
                {/* Multi-layer AR Coating Sheen Lines */}
                <path
                  d="M 45,60 Q 120,28 195,60"
                  stroke="#D8DEE8"
                  strokeWidth="1"
                  strokeDasharray="4 3"
                  strokeOpacity="0.6"
                />
                <path
                  d="M 45,60 Q 120,92 195,60"
                  stroke="#D8DEE8"
                  strokeWidth="1"
                  strokeDasharray="4 3"
                  strokeOpacity="0.6"
                />
                {/* Focal center calibration crosshair */}
                <circle cx="120" cy="60" r="3" fill="#D4AF37" />
                <line x1="120" y1="46" x2="120" y2="74" stroke="#D4AF37" strokeWidth="0.75" />
                <line x1="106" y1="60" x2="134" y2="60" stroke="#D4AF37" strokeWidth="0.75" />
              </svg>
              <div className="absolute bottom-3 right-4 text-[9px] font-mono text-[#707070] uppercase">
                Digital Freeform Surfacing Matrix
              </div>
            </div>

            {/* Plain-Language Clinical Benefit */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-white">
                Clinical Optic Function
              </h4>
              <p className="text-xs sm:text-sm text-[#A1A1A6] font-light leading-relaxed">
                {activeGroup.plainLanguageBenefit}
              </p>
            </div>

            {/* Verified Feature Checklist */}
            <div className="space-y-2.5 pt-2">
              {activeGroup.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs font-mono text-neutral-300">
                  <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Mandatory Medical Disclaimer (Section 4, Item 7) */}
            <div className="p-3.5 rounded-xl bg-black/80 border border-[#292929] text-[11px] font-mono text-[#A1A1A6] flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-white shrink-0 mt-0.5" />
              <span>
                {activeGroup.medicalDisclaimer ||
                  'No lens prevents, cures, or treats a condition. Consult an eye-care professional for your individual needs.'}
              </span>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#292929] flex flex-wrap gap-3">
              <button
                onClick={onOpenBooking}
                className="flex-1 py-3 px-6 rounded-full bg-white hover:bg-neutral-200 text-black font-mono font-semibold text-xs tracking-wider transition text-center"
              >
                SCHEDULE LENS CONSULTATION
              </button>

              {onOpenLensFinder && (
                <button
                  onClick={onOpenLensFinder}
                  className="py-3 px-5 rounded-full border border-[#292929] hover:bg-white/5 text-white font-mono text-xs tracking-wider transition"
                >
                  FIND YOUR LENS (5-STEPS)
                </button>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
