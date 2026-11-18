'use client';

import React, { useState } from 'react';
import { MessageSquare, X, Calendar, ShieldCheck } from 'lucide-react';
import { generateQuickChatUrl } from './WhatsAppSync';

interface WhatsAppFloatingButtonProps {
  onOpenBooking: () => void;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Quick Menu Popover */}
      {isOpen && (
        <div className="mb-3 bg-white/95 backdrop-blur-2xl border border-[#E5E5E5] rounded-2xl p-4 shadow-2xl max-w-xs w-72 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-2.5 border-b border-[#E5E5E5] mb-3">
            <span className="text-xs font-mono font-semibold text-[#111111] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>EYERIS STORE DESK</span>
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-[#666666] hover:text-[#111111] rounded-lg transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] font-mono text-[#666666] mb-3">
            How can our optical specialists assist your visit today?
          </p>

          <div className="space-y-2 text-xs font-mono">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F7F7F7] hover:bg-[#111111] hover:text-white text-[#111111] border border-[#E5E5E5] text-left transition"
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span>Book In-Store Visit Slot</span>
            </button>

            <a
              href={generateQuickChatUrl("Hello! I want to check availability and pricing for Ray-Ban and Oakley frames at your KPHB store.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F7F7F7] hover:bg-[#111111] hover:text-white text-[#111111] border border-[#E5E5E5] text-left transition"
            >
              <MessageSquare className="w-3.5 h-3.5 shrink-0" />
              <span>Ask About Branded Frames</span>
            </a>

            <a
              href={generateQuickChatUrl("Hello! I have an eye prescription from Global Eye Hospital and want to explore ZEISS and German progressive lens options.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F7F7F7] hover:bg-[#111111] hover:text-white text-[#111111] border border-[#E5E5E5] text-left transition"
            >
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>Consult on Prescription Lenses</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-[#111111] text-white hover:bg-neutral-800 flex items-center justify-center shadow-xl transition-all transform hover:scale-105 active:scale-95 relative border border-white/20"
        aria-label="WhatsApp Store Concierge"
      >
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white animate-ping" />
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
        {isOpen ? <X className="w-4 h-4" /> : <MessageSquare className="w-5 h-5 fill-white" />}
      </button>
    </div>
  );
};
