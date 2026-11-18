'use client';

import React from 'react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export const OurStoryTimeline: React.FC = () => {
  const milestones = [
    {
      era: 'THE 1980s FOUNDATION',
      heading: "The Father's 40-Year Optical Craft",
      description:
        'Mastering manual lens edging, lens neutralization, and precision lens dispensing. Grounding the family name in accuracy, patient listening, and optical integrity.',
      tag: 'First Generation',
    },
    {
      era: '20+ YEARS IN KUKATPALLY',
      heading: 'Establishment of Eyeris Opticals',
      description:
        'Serving Kukatpally families across two decades on KPHB Road No. 1. Developing long-term customer relationships rooted in transparent recommendations.',
      tag: 'KPHB Landmark',
    },
    {
      era: 'FOUNDATIONAL ALLIANCE',
      heading: 'Ground-Floor Global Eye Hospital Association',
      description:
        'Establishing the internal ground-floor corridor counter setup with Global Eye Hospital, connecting clinical ophthalmology directly with optical styling.',
      tag: 'Clinical Partnership',
    },
    {
      era: 'SECOND GENERATION & TODAY',
      heading: 'International Curation & Digital Surfacing',
      description:
        'The second generation brings authorized international collections from Ray-Ban, Oakley, Prada, and Stepper Titanium together with modern ZEISS and German freeform lens technology.',
      tag: 'Current Era',
    },
  ];

  return (
    <section id="our-story" className="py-24 sm:py-36 bg-[#050505] text-white border-b border-[#292929] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <ScrollReveal variant="fadeUp" className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#707070] mb-3">
            HERITAGE &amp; PROVENANCE
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            FOUR DECADES. <br />
            TWO GENERATIONS. <br />
            <span className="font-light text-[#A1A1A6]">ONE VISION.</span>
          </h2>
          <p className="text-sm text-[#A1A1A6] font-light mt-4">
            A family-run optical practice built on decades of trust, not corporate franchising.
          </p>
        </ScrollReveal>

        {/* Timeline Line & Milestones */}
        <div className="relative border-l border-[#292929] ml-4 sm:ml-32 space-y-12 sm:space-y-16">
          {milestones.map((m, idx) => (
            <ScrollReveal
              key={idx}
              variant="fadeUp"
              delay={idx * 0.1}
              className="relative pl-6 sm:pl-10"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white ring-4 ring-[#050505]" />

              {/* Mobile Tag / Era */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4AF37]">
                  {m.era}
                </span>
                <span className="text-[10px] font-mono uppercase bg-[#171717] border border-[#292929] text-[#A1A1A6] px-2 py-0.5 rounded-full">
                  {m.tag}
                </span>
              </div>

              {/* Heading */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {m.heading}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#A1A1A6] font-light leading-relaxed max-w-xl">
                {m.description}
              </p>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
