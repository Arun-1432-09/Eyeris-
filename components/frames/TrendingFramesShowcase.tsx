'use client';

import React, { useState } from 'react';
import { TRENDING_FRAMES } from '@/data/brandsData';
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
    <section id="trending-frames" className="py-24 sm:py-32 bg-white relative border-b border-neutral-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Apple Minimalist Header */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-apple-subtext text-xs font-mono uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span>Curated Eyewear Vault</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black leading-tight">
                Iconic Silhouettes.{' '}
                <span className="text-neutral-500 font-light block sm:inline">
                  Precision Optics.
                </span>
              </h2>
              <p className="text-apple-subtext text-sm sm:text-base mt-2 max-w-xl">
                Authentic collections from Milan to Germany. Explore real-time frame weights, materials, and live lens tint pairings.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-apple-subtext bg-neutral-100 border border-neutral-200 px-4 py-2 rounded-full shadow-apple-sm">
                7 Official Brands In Stock
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Apple Pill Brand Switcher */}
        <ScrollReveal animation="fade-up" delay={0.1}>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-8 sm:mb-12 border-b border-neutral-200">
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBrand(b)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedBrand === b
                    ? 'bg-black text-white font-semibold shadow-apple-sm'
                    : 'bg-neutral-100 text-apple-subtext hover:text-black hover:bg-neutral-200 border border-neutral-200/60'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Multi-Brand Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFrames.map((frame, idx) => {
            const currentTint = lensTintMap[frame.id] || 'clear';

            return (
              <ScrollReveal
                key={frame.id}
                animation="fade-up"
                delay={idx * 0.05}
              >
                <div className="group flex flex-col justify-between bg-[#FBFBFD] border border-neutral-200/90 rounded-3xl p-5 hover:border-black/30 transition-all duration-300 hover:shadow-apple-md hover:-translate-y-1 h-full">
                  <div>
                    {/* Image with Dynamic Tint Overlay Simulation */}
                    <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-neutral-100 mb-4 flex items-center justify-center">
                      <img
                        src={frame.image}
                        alt={`${frame.brand} ${frame.modelName}`}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />

                      {/* Dynamic Simulated Tint Filter */}
                      {currentTint === 'sun-green' && (
                        <div className="absolute inset-0 bg-emerald-950/40 mix-blend-multiply transition-opacity duration-300 pointer-events-none" />
                      )}
                      {currentTint === 'dark' && (
                        <div className="absolute inset-0 bg-black/60 mix-blend-multiply transition-opacity duration-300 pointer-events-none" />
                      )}

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        {frame.badge && (
                          <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono tracking-wider text-black border border-neutral-200 shadow-sm font-semibold">
                            {frame.badge}
                          </span>
                        )}
                      </div>

                      <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-[10px] font-mono text-apple-subtext border border-neutral-200">
                        {frame.weight}
                      </span>
                    </div>

                    {/* Brand & Price Header */}
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-black font-bold">
                        {frame.brand}
                      </span>
                      <span className="text-xs font-bold text-black font-mono">
                        {frame.priceGuide}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-black mb-1 leading-snug group-hover:text-neutral-600 transition-colors">
                      {frame.modelName}
                    </h3>

                    <p className="text-xs text-apple-subtext line-clamp-2 mb-3">
                      {frame.description}
                    </p>

                    {/* Interactive In-Card Lens Tint Switcher */}
                    <div className="p-2.5 rounded-xl bg-white border border-neutral-200 mb-4 space-y-1.5 shadow-sm">
                      <div className="flex items-center justify-between text-[10px] text-apple-subtext font-mono">
                        <span className="flex items-center gap-1">
                          <Sun className="w-3 h-3 text-amber-500" />
                          <span>Simulate Shade:</span>
                        </span>
                        <span className="text-black uppercase font-bold">
                          {currentTint === 'clear' ? 'Clear Rx' : currentTint === 'sun-green' ? 'Transitions®' : 'Dark Sun'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setTintForFrame(frame.id, 'clear')}
                          className={`flex-1 py-1 rounded text-[10px] font-mono transition ${
                            currentTint === 'clear'
                              ? 'bg-black text-white font-bold'
                              : 'text-apple-subtext hover:text-black bg-neutral-100'
                          }`}
                        >
                          Clear
                        </button>
                        <button
                          onClick={() => setTintForFrame(frame.id, 'sun-green')}
                          className={`flex-1 py-1 rounded text-[10px] font-mono transition ${
                            currentTint === 'sun-green'
                              ? 'bg-emerald-800 text-white font-bold'
                              : 'text-apple-subtext hover:text-black bg-neutral-100'
                          }`}
                        >
                          Emerald
                        </button>
                        <button
                          onClick={() => setTintForFrame(frame.id, 'dark')}
                          className={`flex-1 py-1 rounded text-[10px] font-mono transition ${
                            currentTint === 'dark'
                              ? 'bg-neutral-800 text-white font-bold'
                              : 'text-apple-subtext hover:text-black bg-neutral-100'
                          }`}
                        >
                          Polarized
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-3 border-t border-neutral-200 flex items-center gap-2">
                    <a
                      href={createWhatsAppBookingLink(
                        `Hello Eyeris! I'm interested in trying on the *${frame.brand} ${frame.modelName}* with *${currentTint}* lenses at your KPHB Road No. 1 store.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-black hover:bg-neutral-800 text-white text-xs font-medium transition shadow-apple-sm active:scale-95"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Reserve In-Store</span>
                    </a>

                    <button
                      onClick={onOpenBooking}
                      className="p-2.5 rounded-full border border-neutral-200 hover:bg-neutral-100 text-black transition"
                      title="Book Consultation"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
