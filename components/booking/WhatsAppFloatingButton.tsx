'use client';

import React, { useState } from 'react';
import { MessageSquare, X, Calendar, ShieldCheck } from 'lucide-react';
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
        <div className="mb-3 bg-white/95 backdrop-blur-2xl border border-neutral-200 rounded-2xl p-4 shadow-apple-xl max-w-xs w-72 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-200 mb-3">
            <span className="text-xs font-semibold text-black flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Eyeris Store Desk (Online)</span>
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-apple-subtext hover:text-black rounded-lg transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-apple-subtext mb-3">
            How can our optical specialists assist your visit today?
          </p>

          <div className="space-y-2">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-[#FBFBFD] hover:bg-neutral-100 border border-neutral-200/80 text-left transition"
            >
              <Calendar className="w-4 h-4 text-black shrink-0" />
              <span className="text-xs font-medium text-black">
                Book VIP Store Slot Pass
              </span>
            </button>

            <a
              href={generateQuickChatUrl("I want to claim my ₹20,000 corporate optical allowance for frames and lenses")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-[#FBFBFD] hover:bg-neutral-100 border border-neutral-200/80 text-left transition"
            >
              <ShieldCheck className="w-4 h-4 text-black shrink-0" />
              <span className="text-xs font-medium text-black">
                Claim ₹20,000 Corporate Benefit
              </span>
            </a>

            <a
              href={generateQuickChatUrl("I have an eye test prescription and want to check pricing for Ray-Ban / Oakley frames & lenses")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-[#FBFBFD] hover:bg-neutral-100 border border-neutral-200/80 text-left transition"
            >
              <MessageSquare className="w-4 h-4 text-black shrink-0" />
              <span className="text-xs font-medium text-black">
                Send Prescription on WhatsApp
              </span>
            </a>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button (Apple Black) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 p-3.5 rounded-full bg-black hover:bg-neutral-800 text-white flex items-center justify-center shadow-apple-lg transition-all transform hover:scale-105 active:scale-95 relative"
        aria-label="Open WhatsApp Store Concierge"
      >
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white animate-ping" />
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
        {isOpen ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
      </button>
    </div>
  );
};
