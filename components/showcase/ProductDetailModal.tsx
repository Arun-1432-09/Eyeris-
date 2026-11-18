'use client';

import React from 'react';
import { X, MessageCircle, MapPin, Eye, Layers, ShieldCheck, Heart } from 'lucide-react';
import { ShowcaseProduct } from '@/data/eyerisData';
import { createWhatsAppBookingLink, EYERIS_LOCATION_URL } from '@/components/booking/WhatsAppSync';

interface ProductDetailModalProps {
  product: ShowcaseProduct | null;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenBooking,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#101010] border border-[#292929] rounded-3xl overflow-hidden shadow-luxury-lg flex flex-col md:flex-row max-h-[92vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 rounded-full border border-[#292929] bg-[#171717] hover:bg-white/10 text-white transition"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Column: Large Image Gallery View */}
        <div className="md:w-1/2 bg-[#050505] p-8 flex flex-col justify-between items-center relative border-b md:border-b-0 md:border-r border-[#292929]">
          <div className="w-full flex items-center justify-between text-xs font-mono text-[#A1A1A6]">
            <span className="uppercase tracking-widest">{product.brand}</span>
            <span className="px-2.5 py-0.5 rounded-full border border-[#292929] text-[10px]">
              {product.type}
            </span>
          </div>

          <div className="my-auto py-8 w-full h-64 sm:h-80 flex items-center justify-center relative">
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full max-h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)]"
            />
          </div>

          <p className="text-[10px] font-mono text-[#707070] text-center uppercase tracking-wider">
            Verified Physical Display Model • KPHB Road No. 1
          </p>
        </div>

        {/* Right Column: Verified Specs Only & CTAs */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto no-scrollbar">
          <div className="space-y-6">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A1A1A6] mb-1.5">
                {product.brand} EYEWEAR
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                {product.name}
              </h3>
              {product.price && (
                <div className="text-base font-mono font-bold text-white mt-1">
                  {product.price}
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm text-[#A1A1A6] font-light leading-relaxed">
              {product.verifiedDescription}
            </p>

            {/* Verified Specifications Grid */}
            <div className="pt-4 border-t border-[#292929] space-y-3">
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-white">
                Verified Product Specifications
              </h4>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-[#171717] border border-[#292929]">
                  <span className="text-[#707070] block text-[10px] uppercase">Frame Shape</span>
                  <span className="text-white font-medium">{product.shape}</span>
                </div>

                <div className="p-3 rounded-xl bg-[#171717] border border-[#292929]">
                  <span className="text-[#707070] block text-[10px] uppercase">Frame Material</span>
                  <span className="text-white font-medium">{product.material}</span>
                </div>

                <div className="p-3 rounded-xl bg-[#171717] border border-[#292929]">
                  <span className="text-[#707070] block text-[10px] uppercase">Colourway</span>
                  <span className="text-white font-medium">{product.colour}</span>
                </div>

                <div className="p-3 rounded-xl bg-[#171717] border border-[#292929]">
                  <span className="text-[#707070] block text-[10px] uppercase">Category</span>
                  <span className="text-white font-medium">{product.category}</span>
                </div>
              </div>
            </div>

            {/* Optical Pairing Note */}
            <div className="p-3.5 rounded-xl bg-black/60 border border-[#292929] text-xs font-mono text-[#A1A1A6] flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-white shrink-0 mt-0.5" />
              <span>
                Available for custom surfacing with ZEISS DriveSafe, BlueProtect, or German freeform progressive lenses.
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-[#292929] space-y-2.5 mt-6">
            <a
              href={createWhatsAppBookingLink(
                `Hello Eyeris Opticals! I am inquiring about the *${product.brand} ${product.name}* (${product.colour}). Please confirm availability for a private fitting at your KPHB store.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-full bg-white hover:bg-neutral-200 text-black font-mono font-semibold text-xs tracking-wider flex items-center justify-center gap-2 transition shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>ENQUIRE ON WHATSAPP</span>
            </a>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="flex-1 py-3 rounded-full border border-[#292929] hover:bg-white/5 text-white font-mono text-xs tracking-wider flex items-center justify-center gap-2 transition"
              >
                <span>BOOK STORE VISIT</span>
              </button>

              <a
                href={EYERIS_LOCATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-full border border-[#292929] hover:bg-white/5 text-[#A1A1A6] hover:text-white flex items-center justify-center transition"
                title="Directions"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
