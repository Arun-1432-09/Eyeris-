'use client';

import React, { useState, useRef } from 'react';
import { TRENDING_FRAMES } from '@/data/brandsData';
import { Sparkles, MessageCircle, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { createWhatsAppBookingLink } from '@/components/booking/WhatsAppSync';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface TrendingFramesShowcaseProps {
  onOpenBooking: () => void;
}

export const TrendingFramesShowcase: React.FC<TrendingFramesShowcaseProps> = ({ onOpenBooking }) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [selectedFace, setSelectedFace] = useState<string>('All');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const brands = ['All', 'Ray-Ban', 'Oakley', 'Prada', 'Stepper Titanium', 'Tommy Hilfiger', 'Calvin Klein', 'Vogue Eyewear'];
  const faceShapes = ['All', 'Square', 'Round', 'Oval', 'Heart'];

  const filteredFrames = TRENDING_FRAMES.filter((frame) => {
    const matchesBrand = selectedBrand === 'All' || frame.brand === selectedBrand;
    const matchesFace =
      selectedFace === 'All' ||
      frame.faceShape === selectedFace ||
      frame.faceShape === 'All Face Shapes';
    return matchesBrand && matchesFace;
  });

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const scrollAmount = clientWidth * 0.75;
    scrollContainerRef.current.scrollTo({
      left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="trending-frames" className="py-20 bg-background relative border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-brand-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header: Short, Minimal, Editorial */}
        <ScrollReveal variant="fadeUp" className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-mono uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Trending Designer Eyewear</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Curated Frames &amp;{' '}
              <span className="bg-gradient-to-r from-gold-300 to-amber-200 bg-clip-text text-transparent">
                Spectacles.
              </span>
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2">
              Trending styles from Ray-Ban, Oakley, Prada, Stepper Titanium, Tommy Hilfiger &amp; Calvin Klein on display at KPHB Road No. 1.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-full bg-surface border border-white/10 hover:border-brand-400/50 text-white transition hover:scale-105"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-full bg-surface border border-white/10 hover:border-brand-400/50 text-white transition hover:scale-105"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </ScrollReveal>

        {/* Filter Bar */}
        <ScrollReveal variant="fadeIn" delay={0.1} className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-white/10">
          {/* Brand Filter */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBrand(b)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wider whitespace-nowrap transition-all ${
                  selectedBrand === b
                    ? 'bg-brand-400 text-slate-950 font-bold shadow-md shadow-brand-400/20'
                    : 'bg-surface/80 hover:bg-surface text-neutral-400 hover:text-white border border-white/5'
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          {/* Face Shape Filter */}
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="hidden sm:inline">FACE SHAPE:</span>
            <div className="flex items-center gap-1.5">
              {faceShapes.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFace(f)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] transition ${
                    selectedFace === f
                      ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40 font-bold'
                      : 'bg-surface text-neutral-400 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Horizontal Cards Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-1"
        >
          {filteredFrames.map((frame, idx) => (
            <ScrollReveal
              key={frame.id}
              variant="fadeUp"
              delay={idx * 0.05}
              className="shrink-0 w-[290px] sm:w-[330px]"
            >
              <div className="group h-full bg-surface/90 rounded-3xl border border-white/10 hover:border-brand-400/40 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,196,159,0.12)]">
                <div>
                  {/* Image Showcase */}
                  <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-black/40 border border-white/5 mb-4 flex items-center justify-center">
                    <img
                      src={frame.image}
                      alt={`${frame.brand} ${frame.modelName}`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Top Badge */}
                    {frame.badge && (
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-brand-500/30 text-brand-300 text-[10px] font-mono tracking-wider">
                        {frame.badge}
                      </span>
                    )}

                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/80 text-[10px] font-mono text-neutral-300">
                      {frame.weight}
                    </span>
                  </div>

                  {/* Brand & Model */}
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-brand-300">
                      {frame.brand} • {frame.category}
                    </span>
                    <span className="text-xs font-bold text-white font-mono">
                      {frame.priceGuide}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white font-serif group-hover:text-brand-300 transition-colors mb-1.5 leading-snug">
                    {frame.modelName}
                  </h3>

                  <p className="text-xs text-neutral-400 line-clamp-2 mb-3">
                    {frame.description}
                  </p>

                  <div className="p-2 rounded-xl bg-surface-raised border border-white/5 text-[11px] text-neutral-300 mb-4 font-mono">
                    <span className="text-gold-400 font-bold">Lens: </span>
                    {frame.lensTech}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                  <a
                    href={createWhatsAppBookingLink(`Hello Eyeris! I want to check availability and try on *${frame.brand} ${frame.modelName}* at your KPHB Road No. 1 store.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 border border-brand-400/30 text-brand-300 hover:text-white text-xs font-mono font-medium transition"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Reserve Frame</span>
                  </a>

                  <button
                    onClick={onOpenBooking}
                    className="py-2.5 px-3.5 rounded-xl bg-surface-raised hover:bg-surface border border-white/10 text-neutral-300 hover:text-white text-xs transition"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
