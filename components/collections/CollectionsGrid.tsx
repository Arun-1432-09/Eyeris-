'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { COLLECTIONS_TILES } from '@/data/eyerisData';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export const CollectionsGrid: React.FC = () => {
  return (
    <section id="collections" className="py-24 sm:py-32 bg-[#050505] text-white border-b border-[#292929]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <ScrollReveal variant="fadeUp" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#707070] mb-3">
              CURATED EYEWEAR DIVISIONS
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Essential Collections.{' '}
              <span className="font-light text-[#A1A1A6]">Product Only.</span>
            </h2>
          </div>

          <p className="text-sm text-[#A1A1A6] font-light max-w-sm">
            Hand-selected international frames, dedicated pediatric ranges, certified digital screen filters, and clinical contact lenses.
          </p>
        </ScrollReveal>

        {/* 6 Product-Only Tiles (Section 4, Item 4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {COLLECTIONS_TILES.map((tile, idx) => (
            <ScrollReveal
              key={tile.id}
              variant="fadeUp"
              delay={idx * 0.08}
            >
              <a
                href={tile.href}
                className="group relative rounded-3xl overflow-hidden bg-[#101010] border border-[#292929] hover:border-white/30 transition-all duration-500 flex flex-col justify-between h-[360px] sm:h-[400px] p-6 sm:p-8 block shadow-luxury-sm hover:shadow-luxury-md"
              >
                {/* Background Image Stage with Gradient Mask */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={tile.image}
                    alt={tile.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
                </div>

                {/* Top Category Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#A1A1A6] bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    {tile.category}
                  </span>
                  <span className="text-[11px] font-mono text-white/50">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Bottom Title, 1-Line Description & Refined Hover CTA */}
                <div className="relative z-10 space-y-3 pt-6 border-t border-white/10">
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-white transition-colors">
                    {tile.title}
                  </h3>
                  <p className="text-xs text-[#A1A1A6] font-light leading-relaxed">
                    {tile.subtitle}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-xs font-mono font-semibold text-white group-hover:translate-x-1 transition-transform">
                    <span>EXPLORE CATALOGUE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
