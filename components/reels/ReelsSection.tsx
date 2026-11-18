'use client';

import React, { useState } from 'react';
import { REELS, ReelItem } from '@/data/reelsData';
import { Play, MessageCircle, X, CheckCircle, Video, Sparkles, ArrowRight } from 'lucide-react';
import { generateQuickChatUrl } from '@/components/booking/WhatsAppSync';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface ReelsSectionProps {
  onOpenBooking: () => void;
}

export const ReelsSection: React.FC<ReelsSectionProps> = ({ onOpenBooking }) => {
  const [activeReel, setActiveReel] = useState<ReelItem | null>(null);

  return (
    <section id="reels" className="py-24 sm:py-32 bg-[#FBFBFD] text-black border-b border-neutral-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header: Short & Clear */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200 text-apple-subtext text-xs font-mono uppercase tracking-wider mb-4 shadow-apple-sm">
                <Video className="w-3.5 h-3.5 text-black" />
                <span>Clinical &amp; Styling Science</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-black tracking-tight leading-tight">
                Lens Lab &amp;{' '}
                <span className="text-neutral-500 font-light block sm:inline">
                  Doctor Insights.
                </span>
              </h2>
              <p className="text-apple-subtext text-sm sm:text-base mt-2">
                Clinical ophthalmologist guidance, IT screen-strain science, and frame styling guides from our KPHB store.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-apple-subtext bg-white border border-neutral-200 px-4 py-2 rounded-full shadow-apple-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>240K+ Community Views</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Reels Grid (Vertical Phone-Style Aspect Ratio) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REELS.map((reel, idx) => (
            <ScrollReveal
              key={reel.id}
              animation="fade-up"
              delay={idx * 0.08}
            >
              <div
                onClick={() => setActiveReel(reel)}
                className="group relative bg-white border border-neutral-200 hover:border-black/30 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-apple-md flex flex-col justify-between p-5"
                style={{ minHeight: '380px' }}
              >
                {/* Top Meta */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-neutral-100 text-black border border-neutral-200 px-2.5 py-0.5 rounded-full font-mono">
                    {reel.category}
                  </span>
                  <span className="text-[10px] font-mono text-apple-subtext bg-neutral-100 px-2 py-0.5 rounded">
                    {reel.duration}
                  </span>
                </div>

                {/* Center Play Button Graphic */}
                <div className="flex flex-col items-center justify-center my-auto py-8">
                  <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-apple-md group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                  <span className="text-[10px] text-apple-subtext mt-3 font-mono">{reel.views}</span>
                </div>

                {/* Bottom Content Info */}
                <div>
                  <h3 className="text-sm font-bold text-black leading-snug group-hover:text-neutral-600 transition-colors mb-1.5">
                    {reel.title}
                  </h3>
                  <p className="text-xs text-apple-subtext line-clamp-2 mb-3 font-normal">
                    {reel.hook}
                  </p>
                  <div className="pt-3 border-t border-neutral-200 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-black font-semibold">Watch Insights</span>
                    <span className="text-apple-subtext">{reel.speaker.split(',')[0]}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Video Detail Modal */}
        {activeReel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white border border-neutral-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-apple-xl overflow-hidden">
              <button
                onClick={() => setActiveReel(null)}
                className="absolute top-5 right-5 p-2 rounded-full border border-neutral-200 text-apple-subtext hover:text-black hover:bg-neutral-100 transition"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-4">
                <span className="text-[10px] font-mono uppercase bg-neutral-100 text-black px-2.5 py-0.5 rounded-full font-bold">
                  {activeReel.category}
                </span>
                <h3 className="text-xl font-bold text-black mt-2 leading-tight">
                  {activeReel.title}
                </h3>
                <p className="text-xs text-apple-subtext font-mono mt-1">
                  Speaker: {activeReel.speaker}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FBFBFD] border border-neutral-200 mb-6 space-y-2">
                <p className="text-xs font-semibold text-black">Clinical Takeaways:</p>
                <p className="text-xs text-apple-subtext leading-relaxed">
                  {activeReel.hook}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setActiveReel(null);
                    onOpenBooking();
                  }}
                  className="flex-1 py-3 px-4 rounded-full bg-black text-white text-xs font-semibold hover:bg-neutral-800 transition shadow-apple-sm text-center"
                >
                  Consult In-Store Doctor
                </button>
                <a
                  href={generateQuickChatUrl('eye_exam')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-full border border-neutral-200 text-black text-xs font-medium hover:bg-neutral-100 transition text-center flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
