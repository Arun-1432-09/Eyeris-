'use client';

import React, { useState } from 'react';
import { REELS, ReelItem } from '@/data/reelsData';
import { Play, Eye, Share2, MessageCircle, X, CheckCircle, Video, Sparkles } from 'lucide-react';
import { generateQuickChatUrl } from '@/components/booking/WhatsAppSync';

interface ReelsSectionProps {
  onOpenBooking: () => void;
}

export const ReelsSection: React.FC<ReelsSectionProps> = ({ onOpenBooking }) => {
  const [activeReel, setActiveReel] = useState<ReelItem | null>(null);

  return (
    <section id="reels" className="py-20 bg-surface-raised/60 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-mono uppercase tracking-wider mb-3">
              <Video className="w-3.5 h-3.5 text-brand-400" />
              <span>Instagram &amp; YouTube Reels Hub</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
              Eyeris <span className="bg-gradient-to-r from-brand-300 to-optic-cyan bg-clip-text text-transparent">Lens Lab &amp; Reels</span>
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base mt-2 max-w-xl">
              Doctor insights, lens science, and styling masterclasses created in collaboration with Global Eye Hospital specialists.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span>240K+ Total Video Views</span>
            </span>
          </div>
        </div>

        {/* Reels Grid (Vertical Phone-Style Aspect Ratio) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REELS.map((reel) => (
            <div
              key={reel.id}
              onClick={() => setActiveReel(reel)}
              className="group relative bg-surface border border-white/10 hover:border-brand-500/50 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,196,159,0.15)] flex flex-col justify-between"
              style={{ minHeight: '440px' }}
            >
              {/* Simulated Video Preview Poster with dynamic gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-surface-raised/90 to-surface/60 z-10" />

              {/* Decorative optical grid pattern */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00c49f_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Top Meta: Category & Duration */}
              <div className="relative z-20 p-5 flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider uppercase bg-brand-500/20 text-brand-300 border border-brand-500/30 px-2.5 py-1 rounded-full backdrop-blur-md">
                  {reel.category}
                </span>
                <span className="text-[11px] font-mono text-neutral-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-md">
                  {reel.duration}
                </span>
              </div>

              {/* Center Play Button Graphic */}
              <div className="relative z-20 flex flex-col items-center justify-center my-auto py-6">
                <div className="w-14 h-14 rounded-full bg-brand-400 text-slate-950 flex items-center justify-center shadow-[0_0_30px_rgba(0,196,159,0.5)] group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-slate-950 ml-0.5" />
                </div>
                <span className="text-[11px] text-neutral-400 mt-2 font-mono">{reel.views}</span>
              </div>

              {/* Bottom Content Info */}
              <div className="relative z-20 p-5 pt-0">
                <h3 className="text-base font-bold text-white font-display leading-snug group-hover:text-brand-300 transition-colors mb-2">
                  {reel.title}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-2 mb-3">
                  {reel.hook}
                </p>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                  <span className="text-brand-300 font-medium">Watch Breakdown</span>
                  <span className="text-neutral-400">{reel.speaker}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Detail Modal */}
        {activeReel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-surface-raised border border-brand-500/40 rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden">
              <button
                onClick={() => setActiveReel(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-surface border border-white/10 text-neutral-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-300 text-xs font-mono mb-4">
                <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                <span>{activeReel.category} • {activeReel.duration}</span>
              </div>

              <h3 className="text-2xl font-bold text-white font-display mb-2">
                {activeReel.title}
              </h3>
              <p className="text-xs text-neutral-400 mb-4 font-mono">
                Presented by: <span className="text-white font-medium">{activeReel.speaker}</span>
              </p>

              <div className="p-4 rounded-2xl bg-surface border border-white/5 mb-5">
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {activeReel.description}
                </p>
              </div>

              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-300 mb-2 font-mono">
                Key Clinical Takeaways:
              </h4>
              <div className="space-y-2 mb-6">
                {activeReel.keyPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                    <CheckCircle className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setActiveReel(null);
                    onOpenBooking();
                  }}
                  className="flex-1 py-3 px-5 rounded-xl bg-brand-400 hover:bg-brand-300 text-slate-950 font-bold text-xs text-center transition shadow-[0_0_20px_rgba(0,196,159,0.3)]"
                >
                  {activeReel.ctaText}
                </button>

                <a
                  href={generateQuickChatUrl(`I watched the Reel about "${activeReel.title}" and want to discuss this with your optometrist`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-surface border border-white/10 hover:border-brand-500/40 text-neutral-200 text-xs font-medium transition"
                >
                  <MessageCircle className="w-4 h-4 text-brand-400" />
                  <span>Discuss on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
