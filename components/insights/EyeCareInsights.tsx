'use client';

import React, { useState } from 'react';
import { Play, X, Video, ShieldCheck, ArrowRight } from 'lucide-react';
import { INSIGHTS_TOPICS } from '@/data/eyerisData';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export const EyeCareInsights: React.FC = () => {
  const [activeVideoTopic, setActiveVideoTopic] = useState<string | null>(null);

  return (
    <section id="eye-care-insights" className="py-24 sm:py-32 bg-[#050505] text-white border-b border-[#292929]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <ScrollReveal variant="fadeUp" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#707070] mb-3">
              EDITORIAL VIDEO ARCHIVE
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Eye Care &amp; Insights.{' '}
              <span className="font-light text-[#A1A1A6]">Education First.</span>
            </h2>
          </div>

          <p className="text-sm text-[#A1A1A6] font-light max-w-sm">
            Clinical optometrist insights, lens science breakdowns, and digital ergonomic guides from our KPHB showroom.
          </p>
        </ScrollReveal>

        {/* Video-Ready Editorial Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INSIGHTS_TOPICS.map((topic, idx) => (
            <ScrollReveal
              key={topic.id}
              variant="fadeUp"
              delay={idx * 0.08}
            >
              <div
                onClick={() => setActiveVideoTopic(topic.title)}
                className="group rounded-3xl bg-[#101010] border border-[#292929] hover:border-white/30 transition-all duration-300 p-6 flex flex-col justify-between h-[360px] cursor-pointer shadow-luxury-sm hover:shadow-luxury-md"
              >
                {/* Top Meta */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
                    {topic.category}
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-[#171717] px-2 py-0.5 rounded text-[#707070]">
                    {topic.tag}
                  </span>
                </div>

                {/* Center Play Button Overlay */}
                <div className="my-auto py-6 flex flex-col items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-luxury-md group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-black ml-0.5" />
                  </div>
                  <span className="text-[10px] font-mono text-[#707070] mt-3 uppercase tracking-wider">
                    Watch Briefing
                  </span>
                </div>

                {/* Bottom Topic Details */}
                <div className="space-y-1.5 pt-4 border-t border-[#292929]">
                  <h3 className="text-sm font-bold text-white group-hover:text-white leading-snug line-clamp-2">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-[#A1A1A6] font-light line-clamp-2">
                    {topic.summary}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Video Modal Placeholder (TO CONFIRM URLs) */}
        {activeVideoTopic && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
            <div className="bg-[#101010] border border-[#292929] rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-luxury-lg space-y-4">
              <button
                onClick={() => setActiveVideoTopic(null)}
                className="absolute top-5 right-5 p-2 rounded-full border border-[#292929] text-[#A1A1A6] hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] block">
                EDITORIAL VIDEO BRIEFING
              </span>

              <h3 className="text-xl font-bold text-white">
                {activeVideoTopic}
              </h3>

              <div className="w-full h-48 rounded-2xl bg-black border border-[#292929] flex flex-col items-center justify-center text-center p-6 space-y-2">
                <Video className="w-8 h-8 text-[#707070]" />
                <span className="text-xs font-mono text-[#A1A1A6]">
                  Production Studio Video Stream Placeholder
                </span>
                <span className="text-[10px] font-mono text-[#707070]">
                  URL: [TO CONFIRM with store video master assets]
                </span>
              </div>

              <p className="text-xs text-[#A1A1A6] font-light leading-relaxed">
                Our licensed optometrists will explain the optical physics and fitting adjustments for this vision profile in-store.
              </p>

              <button
                onClick={() => setActiveVideoTopic(null)}
                className="w-full py-3 rounded-full bg-white text-black font-mono text-xs font-semibold tracking-wider transition"
              >
                CLOSE BRIEFING
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
