'use client';

import React from 'react';
import { ShieldCheck, ArrowRight, Sparkles, MapPin, Award, CheckCircle2, Star, Clock } from 'lucide-react';
import { EYERIS_LOCATION_URL } from '@/components/booking/WhatsAppSync';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative pt-8 pb-20 overflow-hidden bg-background">
      {/* Background ambient lighting glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-gradient-to-b from-brand-500/15 via-optic-blue/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-[350px] h-[350px] bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-raised border border-brand-500/30 text-brand-300 text-xs font-medium shadow-lg backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-brand-400 animate-ping"></span>
            <span>KPHB Road No. 1, Kukatpally, Hyderabad</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-medium">
            <Award className="w-3.5 h-3.5 text-gold-400" />
            <span>40 Years of Family Optical Trust</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-display text-white mb-6 leading-[1.12]">
            Where Iconic Style Meets{' '}
            <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-optic-blue bg-clip-text text-transparent">
              Clinical Precision.
            </span>
          </h1>

          <p className="text-neutral-300 text-base sm:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-normal">
            Hyderabad’s premier standalone optical boutique. Curated designer frames from{' '}
            <span className="text-white font-semibold">Ray-Ban, Oakley & Prada</span> paired with bespoke German-engineered lenses, backed by our direct hospital partnership.
          </p>

          {/* Primary Action Button Cluster */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-400 via-brand-500 to-brand-400 hover:from-brand-300 hover:to-brand-400 text-slate-950 font-bold text-base shadow-[0_0_35px_rgba(0,196,159,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Book In-Store VIP Slot</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href="#calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-surface-raised/90 hover:bg-surface-raised border border-white/10 hover:border-gold-400/40 text-neutral-200 hover:text-white font-semibold text-sm transition-all"
            >
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>Calculate ₹20,000 Corporate Benefit</span>
            </a>

            <a
              href={EYERIS_LOCATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-surface/60 hover:bg-surface border border-white/10 text-neutral-300 hover:text-white text-sm font-medium transition"
            >
              <MapPin className="w-4 h-4 text-brand-400" />
              <span>Get Directions</span>
            </a>
          </div>

          {/* Value Props & Trust Badges Strip */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white font-display">Hospital Linked</p>
                <p className="text-xs text-neutral-400">Ground floor connected to Global Eye Hospital</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-400 shrink-0">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white font-display">60–70% Lens Focus</p>
                <p className="text-xs text-neutral-400">ZEISS DriveSafe, BlueProtect, & Digital Progressives</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-optic-blue/10 border border-optic-blue/20 text-optic-blue shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white font-display">Corporate Claim Ready</p>
                <p className="text-xs text-neutral-400">GST medical bills for ₹20,000 tech reimbursements</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white font-display">Open 7 Days</p>
                <p className="text-xs text-neutral-400">10:00 AM – 9:30 PM at KPHB Road No. 1</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
