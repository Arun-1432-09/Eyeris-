'use client';

import React from 'react';
import { Sparkles, Eye, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface LensFinderSectionProps {
  onOpenLensFinder: () => void;
}

export const LensFinderSection: React.FC<LensFinderSectionProps> = ({ onOpenLensFinder }) => {
  return (
    <section id="lens-finder" className="py-24 bg-background relative border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="rounded-3xl bg-gradient-to-r from-graphite via-surface to-graphite border border-brand-400/30 p-8 sm:p-14 relative overflow-hidden shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/15 border border-brand-400/40 text-brand-300 text-xs font-mono tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SECTION 07 // INTERACTIVE LIFESTYLE DIAGNOSTIC</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                Not Sure Which Lenses Suit You?{' '}
                <span className="text-teal-gradient italic font-light">Take the 60-Second Lens Finder.</span>
              </h2>

              <p className="text-ivory-200/90 text-sm sm:text-base font-light leading-relaxed max-w-2xl">
                Whether you spend 10 hours programming, endure night commuting glare on Hyderabad highways, or require seamless reading without changing glasses—our interactive engine matches your lifestyle to the ideal German lens profile.
              </p>

              {/* Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono text-neutral-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>Ciliary Strain Profiling</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>ZEISS Night Glare Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>Progressive Corridor Fit</span>
                </div>
              </div>
            </div>

            {/* Right Column: CTA Box */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
              <div className="p-6 rounded-2xl bg-surface/90 border border-white/10 text-center w-full max-w-sm space-y-4 shadow-xl">
                <div className="w-12 h-12 rounded-xl bg-brand-500/15 border border-brand-400/30 flex items-center justify-center text-brand-300 mx-auto">
                  <Eye className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-serif font-bold text-white">Interactive Assessment</h4>
                <p className="text-xs text-neutral-400">
                  Instant personalized recommendation with direct WhatsApp sync & corporate eligibility.
                </p>

                <button
                  onClick={onOpenLensFinder}
                  className="w-full py-4 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs font-mono tracking-wider flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 shadow-[0_0_25px_rgba(0,196,159,0.4)]"
                >
                  <span>LAUNCH LENS FINDER</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
