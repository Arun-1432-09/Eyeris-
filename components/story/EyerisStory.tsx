'use client';

import React from 'react';
import { Award, ShieldCheck, HeartHandshake, Eye, Sparkles, MapPin, Building2, Clock } from 'lucide-react';

interface EyerisStoryProps {
  onOpenBooking: () => void;
}

export const EyerisStory: React.FC<EyerisStoryProps> = ({ onOpenBooking }) => {
  return (
    <section id="story" className="py-24 bg-graphite/40 relative border-t border-white/5 overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-champagne-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-brand-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-champagne-500/10 border border-champagne-500/30 text-champagne-400 text-xs font-mono tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>SECTION 02 // HERITAGE & VISION</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1] mb-6">
            Two Decades in KPHB.{' '}
            <span className="text-gold-gradient italic font-light">Four Decades of Trust.</span>
          </h2>

          <p className="text-ivory-200/90 text-base sm:text-xl font-light leading-relaxed">
            EYERIS Opticals was established with a singular conviction: eyewear is neither a disposable fashion accessory nor a cold medical device. It is where personal identity meets clinical sight.
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Card 1: 40 Years of Generational Craftsmanship */}
          <div className="p-8 rounded-2xl bg-surface/90 border border-white/10 hover:border-champagne-500/30 transition-all duration-300 relative group">
            <div className="w-12 h-12 rounded-xl bg-champagne-500/10 border border-champagne-500/30 flex items-center justify-center text-champagne-400 mb-6 group-hover:scale-105 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-champagne-400 tracking-wider">GENERATIONAL EXPERTISE</span>
            <h3 className="text-2xl font-serif text-white font-bold mt-2 mb-3">40 Years of Optical Heritage</h3>
            <p className="text-neutral-300 text-sm leading-relaxed">
              Serving the Kukatpally and KPHB community for over 20 years, carrying forward our founder’s 40 years of optical precision across two generations. We build relationships that last lifetimes, not one-time transactions.
            </p>
          </div>

          {/* Card 2: 60-70% Prescription Lens Specialisation */}
          <div className="p-8 rounded-2xl bg-surface/90 border border-white/10 hover:border-brand-400/30 transition-all duration-300 relative group">
            <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-400/30 flex items-center justify-center text-brand-300 mb-6 group-hover:scale-105 transition-transform">
              <Eye className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-brand-300 tracking-wider">CLINICAL CORE</span>
            <h3 className="text-2xl font-serif text-white font-bold mt-2 mb-3">60–70% Lens Specialisation</h3>
            <p className="text-neutral-300 text-sm leading-relaxed">
              Unlike generic retail optical chains that prioritize frame markups, prescription lenses represent the majority of our craft. We analyse posture, focal distances, pupil heights, and screen habits before recommending a single lens.
            </p>
          </div>

          {/* Card 3: Interconnected with Global Eye Hospital */}
          <div className="p-8 rounded-2xl bg-surface/90 border border-white/10 hover:border-optic-blue/30 transition-all duration-300 relative group">
            <div className="w-12 h-12 rounded-xl bg-optic-blue/10 border border-optic-blue/30 flex items-center justify-center text-optic-blue mb-6 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-optic-blue tracking-wider">CONNECTED CARE</span>
            <h3 className="text-2xl font-serif text-white font-bold mt-2 mb-3">Global Eye Hospital Link</h3>
            <p className="text-neutral-300 text-sm leading-relaxed">
              Located right on KPHB Road No. 1, internally connected on the ground floor to Global Eye Hospital. Patients seamlessly collect their doctor prescription printouts and step directly into EYERIS for clinical optical dispensing.
            </p>
          </div>
        </div>

        {/* Feature Highlight Strip */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-graphite via-surface to-graphite border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-champagne-400 text-xs font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>THE EYERIS PROMISE</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-serif text-white font-bold">
              “Personal Attention You Travel For, Optical Engineering You Rely On.”
            </h4>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-2xl">
              We don’t compete on low-grade mass-market pricing. We deliver authentic international frames and clinically certified lenses at fair, transparent price points with corporate insurance assistance.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-semibold text-xs font-mono tracking-wider transition-all transform hover:scale-105"
          >
            SCHEDULE IN-STORE CONSULTATION
          </button>
        </div>

      </div>
    </section>
  );
};
