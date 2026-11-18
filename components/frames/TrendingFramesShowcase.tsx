'use client';

import React, { useState } from 'react';
import { TRENDING_FRAMES, TrendingFrame } from '@/data/brandsData';
import { MessageCircle, ArrowRight, Sun, Sparkles, ShieldCheck } from 'lucide-react';
import { createWhatsAppBookingLink } from '@/components/booking/WhatsAppSync';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface TrendingFramesShowcaseProps {
  onOpenBooking: () => void;
}

export const TrendingFramesShowcase: React.FC<TrendingFramesShowcaseProps> = ({ onOpenBooking }) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [lensTintMap, setLensTintMap] = useState<Record<string, 'clear' | 'sun-green' | 'dark'>>({});

  const brands = ['All', 'Ray-Ban', 'Oakley', 'Prada', 'Stepper Titanium', 'Tommy Hilfiger', 'Calvin Klein', 'Vogue Eyewear'];

  const filteredFrames = TRENDING_FRAMES.filter((frame) => {
    return selectedBrand === 'All' || frame.brand === selectedBrand;
  });

  const setTintForFrame = (id: string, tint: 'clear' | 'sun-green' | 'dark') => {
    setLensTintMap((prev) => ({ ...prev, [id]: tint }));
  };

  return (
    <section id="trending-frames" className="py-24 bg-black relative border-t border-apple-border overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-apple-blue/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Apple Keynote Header */}
        <ScrollReveal variant="fadeUp" className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full apple-glass text-apple-subtext text-xs font-mono uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-apple-blue-light" />
              <span>Curated Eyewear Vault</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              Iconic Design.{' '}
              <span className="text-apple-gradient">
                Precision Calibrated.
              </span>
            </h2>
            <p className="text-apple-subtext text-base mt-2 max-w-xl">
              Authentic collections from Milan to Germany. Explore real-time frame weights, materials, and custom lens tint pairings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-apple-subtext apple-glass px-4 py-2 rounded-full">
              7 International Brands In Stock
            </span>
          </div>
        </ScrollReveal>

        {/* Apple Pill Brand Switcher */}
        <ScrollReveal variant="fadeIn" delay={0.1} className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-8 border-b border-apple-border">
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBrand(b)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedBrand === b
                  ? 'bg-apple-text text-black font-semibold shadow-md'
                  : 'apple-glass text-apple-subtext hover:text-white'
              }`}
            >
              {b}
            </button>
          ))}
        </ScrollReveal>

        {/* Multi-Brand Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFrames.map((frame, idx) => {
            const currentTint = lensTintMap[frame.id] || 'clear';

            return (
              <ScrollReveal
                key={frame.id}
                variant="fadeUp"
                delay={idx * 0.05}
                className="group flex flex-col justify-between apple-glass-card rounded-3xl p-5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  {/* Image with Dynamic Tint Overlay Simulation */}
                  <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-surface-raised mb-4 flex items-center justify-center">
                    <img
                      src={frame.image}
                      alt={`${frame.brand} ${frame.modelName}`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Dynamic Simulated Tint Filter */}
                    {currentTint === 'sun-green' && (
                      <div className="absolute inset-0 bg-emerald-950/45 mix-blend-multiply transition-opacity duration-300 pointer-events-none" />
                    )}
                    {currentTint === 'dark' && (
                      <div className="absolute inset-0 bg-black/60 mix-blend-multiply transition-opacity duration-300 pointer-events-none" />
                    )}

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      {frame.badge && (
                        <span className="px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-mono tracking-wider text-apple-text border border-white/10">
                          {frame.badge}
                        </span>
                      )}
                    </div>

                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[10px] font-mono text-apple-subtext">
                      {frame.weight}
                    </span>
                  </div>

                  {/* Brand & Price Header */}
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-apple-blue-light font-semibold">
                      {frame.brand}
                    </span>
                    <span className="text-xs font-bold text-white font-mono">
                      {frame.priceGuide}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1 leading-snug group-hover:text-apple-blue-light transition-colors">
                    {frame.modelName}
                  </h3>

                  <p className="text-xs text-apple-subtext line-clamp-2 mb-3">
                    {frame.description}
                  </p>

                  {/* Interactive In-Card Lens Tint Switcher */}
                  <div className="p-2.5 rounded-xl apple-glass mb-4 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] text-apple-subtext font-mono">
                      <span className="flex items-center gap-1">
                        <Sun className="w-3 h-3 text-amber-400" />
                        <span>Try Lens Shade:</span>
                      </span>
                      <span className="text-white uppercase font-bold">
                        {currentTint === 'clear' ? 'Clear Rx' : currentTint === 'sun-green' ? 'Transitions®' : 'Dark Sun'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setTintForFrame(frame.id, 'clear')}
                        className={`flex-1 py-1 rounded text-[10px] font-mono transition ${
                          currentTint === 'clear'
                            ? 'bg-white/20 text-white font-bold'
                            : 'text-apple-subtext hover:text-white'
                        }`}
                      >
                        Clear
                      </button>
                      <button
                        onClick={() => setTintForFrame(frame.id, 'sun-green')}
                        className={`flex-1 py-1 rounded text-[10px] font-mono transition ${
                          currentTint === 'sun-green'
                            ? 'bg-emerald-900/60 border border-emerald-500/50 text-emerald-300 font-bold'
                            : 'text-apple-subtext hover:text-white'
                        }`}
                      >
                        Emerald
                      </button>
                      <button
                        onClick={() => setTintForFrame(frame.id, 'dark')}
                        className={`flex-1 py-1 rounded text-[10px] font-mono transition ${
                          currentTint === 'dark'
                            ? 'bg-neutral-800 text-white font-bold'
                            : 'text-apple-subtext hover:text-white'
                        }`}
                      >
                        Polarized
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-apple-border flex items-center gap-2">
                  <a
                    href={createWhatsAppBookingLink(
                      `Hello Eyeris! I'm interested in trying on the *${frame.brand} ${frame.modelName}* with *${currentTint}* lenses at your KPHB Road No. 1 store.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-apple-blue hover:bg-apple-blue-hover text-white text-xs font-medium transition shadow-md shadow-apple-blue/15"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Reserve in Store</span>
                  </a>

                  <button
                    onClick={onOpenBooking}
                    className="p-2.5 rounded-xl apple-glass hover:bg-white/10 text-apple-subtext hover:text-white transition"
                    title="Book Consultation"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
