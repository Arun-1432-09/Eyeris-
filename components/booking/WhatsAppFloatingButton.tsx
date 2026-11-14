'use client';

import React, { useState } from 'react';
import { MessageSquare, X, Calendar, ShieldCheck, Sparkles } from 'lucide-react';
import { EYERIS_WHATSAPP_NUMBER, generateQuickChatUrl } from './WhatsAppSync';

interface WhatsAppFloatingButtonProps {
  onOpenBooking: () => void;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Expanded Quick Options Menu */}
      {isOpen && (
        <div className="mb-3 bg-surface-raised border border-brand-500/40 rounded-2xl p-4 shadow-2xl backdrop-blur-xl max-w-xs w-72 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
            <span className="text-xs font-bold text-white font-display flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span>Eyeris Store Desk (Online)</span>
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-neutral-400 hover:text-white rounded-lg transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-neutral-300 mb-3">
            How can our optical specialists assist your visit today?
          </p>

          <div className="space-y-2">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center gap-2 p-2.5 rounded-xl bg-surface border border-white/5 hover:border-brand-500/40 text-left transition group"
            >
              <Calendar className="w-4 h-4 text-brand-400 shrink-0" />
              <span className="text-xs font-medium text-neutral-200 group-hover:text-white">
                Book VIP Store Slot Pass
              </span>
            </button>

            <a
              href={generateQuickChatUrl("I want to claim my ₹20,000 corporate optical allowance for frames and lenses")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-2 p-2.5 rounded-xl bg-surface border border-white/5 hover:border-gold-400/40 text-left transition group"
            >
              <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
              <span className="text-xs font-medium text-neutral-200 group-hover:text-white">
                Claim ₹20,000 Corporate Benefit
              </span>
            </a>

            <a
              href={generateQuickChatUrl("I have an eye test prescription and want to check pricing for Ray-Ban / Oakley frames & lenses")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-2 p-2.5 rounded-xl bg-surface border border-white/5 hover:border-green-500/40 text-left transition group"
            >
              <MessageSquare className="w-4 h-4 text-green-400 shrink-0" />
              <span className="text-xs font-medium text-neutral-200 group-hover:text-white">
                Send Prescription on WhatsApp
              </span>
            </a>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.45)] transition-all transform hover:scale-105 active:scale-95 group relative"
        aria-label="Open WhatsApp Store Concierge"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-brand-400 border-2 border-surface animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-brand-400 border-2 border-surface" />
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
};
