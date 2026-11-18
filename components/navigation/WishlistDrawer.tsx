'use client';

import React, { useEffect, useState } from 'react';
import { X, Trash2, MessageCircle, Heart, ArrowRight } from 'lucide-react';
import { ShowcaseProduct } from '@/data/eyerisData';
import { createWhatsAppBookingLink } from '@/components/booking/WhatsAppSync';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ isOpen, onClose, onOpenBooking }) => {
  const [wishlist, setWishlist] = useState<ShowcaseProduct[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('eyeris_wishlist');
        if (stored) {
          setWishlist(JSON.parse(stored));
        }
      } catch (e) {
        console.error('Failed to read wishlist:', e);
      }
    }
  }, [isOpen]);

  const removeFromWishlist = (id: string) => {
    try {
      const updated = wishlist.filter((item) => item.id !== id);
      setWishlist(updated);
      localStorage.setItem('eyeris_wishlist', JSON.stringify(updated));
      window.dispatchEvent(new Event('eyeris_wishlist_updated'));
    } catch (e) {
      console.error(e);
    }
  };

  const getWhatsAppMessage = () => {
    const names = wishlist.map((item) => `${item.brand} ${item.name}`).join(', ');
    return `Hello Eyeris Opticals! I am interested in trying on my saved frames at your KPHB Road No. 1 store: ${names}.`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#101010] border-l border-[#292929] h-full flex flex-col justify-between p-6 sm:p-8 shadow-2xl relative animate-in slide-in-from-right duration-300">
        
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#292929]">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-white fill-white" />
              <h3 className="text-sm font-mono tracking-widest uppercase font-semibold text-white">
                Saved Wishlist ({wishlist.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full border border-[#292929] hover:bg-white/10 text-neutral-400 hover:text-white transition"
              aria-label="Close wishlist"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Items List */}
          <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar pr-1">
            {wishlist.length === 0 ? (
              <div className="py-16 text-center text-neutral-400 space-y-3">
                <Heart className="w-8 h-8 mx-auto text-neutral-600" />
                <p className="text-xs font-mono">Your wishlist is currently empty.</p>
                <p className="text-[11px] text-neutral-500">
                  Tap the heart icon on any frame in the showcase or runway to save it for your store visit.
                </p>
              </div>
            ) : (
              wishlist.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-3 rounded-2xl bg-[#171717] border border-[#292929] group"
                >
                  <div className="w-20 h-16 rounded-xl overflow-hidden bg-black shrink-0 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-mono tracking-wider uppercase text-neutral-400 block">
                      {item.brand}
                    </span>
                    <h4 className="text-xs font-bold text-white truncate">
                      {item.name}
                    </h4>
                    <span className="text-[10px] text-neutral-400 font-mono block mt-0.5">
                      {item.shape} • {item.colour}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="p-2 text-neutral-500 hover:text-red-400 transition"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bottom Actions */}
        {wishlist.length > 0 && (
          <div className="pt-6 border-t border-[#292929] space-y-3">
            <a
              href={createWhatsAppBookingLink(getWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs font-mono tracking-wider flex items-center justify-center gap-2 transition shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>ENQUIRE ALL ON WHATSAPP</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="w-full py-3 rounded-full border border-[#292929] hover:bg-white/5 text-white font-mono text-xs tracking-wider flex items-center justify-center gap-2 transition"
            >
              <span>SCHEDULE IN-STORE TRY-ON</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
