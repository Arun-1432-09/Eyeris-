'use client';

import React, { useState } from 'react';
import { REELS, ReelItem } from '@/data/reelsData';
import { Play, MessageCircle, X, CheckCircle, Video, Sparkles } from 'lucide-react';
import { generateQuickChatUrl } from '@/components/booking/WhatsAppSync';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface ReelsSectionProps {
  onOpenBooking: () => void;
}

export const ReelsSection: React.FC<ReelsSectionProps> = ({ onOpenBooking }) => {
  const [activeReel, setActiveReel] = useState<ReelItem | null>(null);

  return (
    <section id="reels" className="py-20 bg-background border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header: Short & Clear */}
        <ScrollReveal variant="fadeUp" className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-mono uppercase tracking-wider mb-3">
              <Video className="w-3.5 h-3.5 text-brand-400" />
              <span>Doctor Talks &amp; Reels</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Eyeris <span className="bg-gradient-to-r from-brand-300 to-optic-blue bg-clip-text text-transparent">Lens Lab &amp; Reels</span>
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2">
              Clinical ophthalmologist advice, IT screen-strain science &amp; frame styling guides.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span>240K+ Community Views</span>
          </div>
        </ScrollReveal>

        {/* Reels Grid (Vertical Phone-Style Aspect Ratio) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REELS.map((reel, idx) => (
            <ScrollReveal
              key={reel.id}
              variant="fadeUp"
              delay={idx * 0.1}
            >
              <div
                onClick={() => setActiveReel(reel)}
                className="group relative bg-surface border border-white/10 hover:border-brand-400/50 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,196,159,0.15)] flex flex-col justify-between"
                style={{ minHeight: '400px' }}
              >
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-surface-raised/80 to-surface/40 z-10" />

                {/* Top Meta */}
                <div className="relative z-20 p-4 flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-brand-500/20 text-brand-300 border border-brand-500/30 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                    {reel.category}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-md">
                    {reel.duration}
                  </span>
                </div>

                {/* Center Play Button Graphic */}
                <div className="relative z-20 flex flex-col items-center justify-center my-auto py-4">
                  <div className="w-12 h-12 rounded-full bg-brand-400 text-slate-950 flex items-center justify-center shadow-lg shadow-brand-400/30 group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                  </div>
                  <span className="text-[10px] text-neutral-400 mt-2 font-mono">{reel.views}</span>
                </div>

                {/* Bottom Content Info */}
                <div className="relative z-20 p-4 pt-0">
                  <h3 className="text-sm font-bold text-white font-serif leading-snug group-hover:text-brand-300 transition-colors mb-1.5">
                    {reel.title}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 mb-2 font-light">
                    {reel.hook}
                  </p>
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-brand-300">Watch Insights</span>
                    <span className="text-neutral-400">{reel.speaker.split(',')[0]}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Video Detail Modal */}
        {activeReel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-surface-raised border border-brand-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-7 relative shadow-2xl overflow-hidden">
              <button
                onClick={() => setActiveReel(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-surface border border-white/10 text-neutral-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-300 text-xs font-mono mb-3">
                <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                <span>{activeReel.category} • {activeReel.duration}</span>
              </div>

              <h3 className="text-xl font-bold text-white font-serif mb-1">
                {activeReel.title}
              </h3>
              <p className="text-xs text-neutral-400 mb-3 font-mono">
                Speaker: <span className="text-white font-medium">{activeReel.speaker}</span>
              </p>

              <div className="p-3.5 rounded-2xl bg-surface border border-white/5 mb-4 text-xs text-neutral-300 leading-relaxed">
                {activeReel.description}
              </div>

              <h4 className="text-[10px] font-bold uppercase tracking-wider text-brand-300 mb-2 font-mono">
                Key Takeaways:
              </h4>
              <div className="space-y-1.5 mb-5">
                {activeReel.keyPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() => {
                    setActiveReel(null);
                    onOpenBooking();
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-brand-400 hover:bg-brand-300 text-slate-950 font-bold text-xs text-center transition shadow-md"
                >
                  {activeReel.ctaText}
                </button>

                <a
                  href={generateQuickChatUrl(`I watched the Reel "${activeReel.title}" and want to discuss this with your optometrist`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-surface border border-white/10 hover:border-brand-500/40 text-neutral-200 text-xs font-medium transition"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-brand-400" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
