'use client';

import React from 'react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export const BrandIntro: React.FC = () => {
  const words = [
    'Two', 'decades', 'of', 'unwavering', 'trust.',
    '40', 'years', 'of', 'optical', 'family', 'experience.',
    'Two', 'generations', 'dedicated', 'to', 'personal',
    'frame', 'styling', 'and', 'clinical', 'lens', 'dispensing.',
  ];

  return (
    <section className="py-24 sm:py-36 bg-[#FFFFFF] text-[#111111] border-b border-[#E5E5E5] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center relative z-10">
        
        {/* Eyebrow */}
        <ScrollReveal variant="fadeUp">
          <div className="inline-block text-[11px] font-mono tracking-[0.25em] uppercase text-[#888888] font-bold mb-6">
            EST. KPHB ROAD NO. 1 // HYDERABAD
          </div>
        </ScrollReveal>

        {/* Master Heading */}
        <ScrollReveal variant="fadeUp" delay={0.1}>
          <h2 className="text-4xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-[#111111] mb-10 leading-none">
            VISION. <span className="font-light text-[#777777]">PERFECTED.</span>
          </h2>
        </ScrollReveal>

        {/* Scroll-Scrubbed Words Reveal */}
        <div className="max-w-3xl mx-auto text-xl sm:text-3xl font-light text-[#666666] leading-relaxed flex flex-wrap justify-center gap-x-2.5 gap-y-1.5">
          {words.map((word, idx) => (
            <ScrollReveal
              key={idx}
              variant="fadeUp"
              delay={0.15 + (idx % 8) * 0.04}
              className="inline-block"
            >
              <span className={word === 'trust.' || word === 'experience.' || word === 'dispensing.' ? 'text-[#111111] font-semibold' : ''}>
                {word}
              </span>
            </ScrollReveal>
          ))}
        </div>

        {/* Differentiator note */}
        <ScrollReveal variant="fadeUp" delay={0.4}>
          <p className="text-xs sm:text-sm font-mono text-[#888888] uppercase tracking-widest mt-12 max-w-xl mx-auto">
            Practical luxury pricing • No mass-market compromises • Ground-floor Global Eye Hospital corridor
          </p>
        </ScrollReveal>

      </div>
    </section>
  );
};
