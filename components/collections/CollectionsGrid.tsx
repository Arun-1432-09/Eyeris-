'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { COLLECTIONS_TILES } from '@/data/eyerisData';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export const CollectionsGrid: React.FC = () => {
  return (
    <section id="collections" className="py-24 sm:py-32 bg-[#F7F7F7] text-[#111111] border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <ScrollReveal variant="fadeUp" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#888888] mb-3 font-bold">
              CURATED EYEWEAR DIVISIONS
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#111111] leading-tight">
              Essential Collections.{' '}
              <span className="font-light text-[#777777]">Product Only.</span>
            </h2>
          </div>

          <p className="text-sm text-[#666666] font-normal max-w-sm">
            Hand-selected international frames, dedicated pediatric ranges, certified digital screen filters, and clinical contact lenses.
          </p>
        </ScrollReveal>

        {/* 6 Product-Only Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {COLLECTIONS_TILES.map((tile, idx) => (
            <ScrollReveal
              key={tile.id}
              variant="fadeUp"
              delay={idx * 0.08}
            >
              <a
                href={tile.href}
                className="group relative rounded-3xl overflow-hidden bg-white border border-[#E5E5E5] hover:border-[#111111] transition-all duration-300 flex flex-col justify-between h-[360px] sm:h-[400px] p-6 sm:p-8 block shadow-sm hover:shadow-md"
              >
                {/* Background Image Stage with Gentle Gradient Mask */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={tile.image}
                    alt={tile.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
                </div>

                {/* Top Category Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#444444] bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-[#E5E5E5] font-semibold">
                    {tile.category}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#888888]">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111] mb-2 group-hover:text-black transition-colors">
                    {tile.title}
                  </h3>
                  <p className="text-xs text-[#555555] leading-relaxed mb-4 line-clamp-2">
                    {tile.subtitle}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#111111] group-hover:translate-x-1 transition-transform">
                    <span>EXPLORE COLLECTION</span>
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
