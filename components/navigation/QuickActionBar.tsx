'use client';

import React, { useState, useEffect } from 'react';
import { Glasses, Sparkles, Calendar, MessageCircle, ArrowUp } from 'lucide-react';
import { createWhatsAppBookingLink } from '@/components/booking/WhatsAppSync';

interface QuickActionBarProps {
  onOpenBooking: () => void;
  onOpenLensFinder: () => void;
}

export const QuickActionBar: React.FC<QuickActionBarProps> = ({ onOpenBooking, onOpenLensFinder }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show dock after scrolling down 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-lg w-full px-4 animate-fade-in pointer-events-auto">
      <div className="bg-graphite/90 backdrop-blur-xl border border-white/15 rounded-2xl p-2 px-3 sm:px-4 shadow-[0_15px_35px_rgba(0,0,0,0.8)] flex items-center justify-between gap-2 text-xs font-mono">
        
        {/* Quick Link 1: Trending Frames */}
        <a
          href="#trending-frames"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-white/10 text-neutral-300 hover:text-white transition"
        >
          <Glasses className="w-3.5 h-3.5 text-champagne-400" />
          <span className="hidden sm:inline">Frames</span>
        </a>

        {/* Quick Link 2: Lens Finder */}
        <button
          onClick={onOpenLensFinder}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-white/10 text-brand-300 hover:text-white transition"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          <span>Lens Finder</span>
        </button>

        {/* Quick Link 3: Book VIP Slot */}
        <button
          onClick={onOpenBooking}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-champagne-500 hover:bg-champagne-400 text-slate-950 font-bold transition shadow-md"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Visit</span>
        </button>

        {/* Quick Link 4: WhatsApp */}
        <a
          href={createWhatsAppBookingLink('Hello EYERIS Opticals! I would like to inquire about trending frames and doctor consultation slots at KPHB Road No. 1.')}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border border-brand-400/30 transition"
          aria-label="WhatsApp Concierge"
        >
          <MessageCircle className="w-4 h-4" />
        </a>

      </div>
    </div>
  );
};
