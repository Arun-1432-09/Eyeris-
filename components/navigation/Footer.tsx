'use client';

import React from 'react';
import { EyerisWhiteLogo } from './EyerisWhiteLogo';
import { BUSINESS_INFO, CONFIG_TO_CONFIRM, COLLECTIONS_TILES } from '@/data/eyerisData';
import { MapPin, Phone, Clock, MessageSquare, Instagram, Youtube } from 'lucide-react';
import { EYERIS_LOCATION_URL } from '@/components/booking/WhatsAppSync';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-[#F7F7F7] text-[#666666] border-t border-[#E5E5E5] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-[#E5E5E5]">
          
          {/* Brand & One-line Statement (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <EyerisWhiteLogo size="md" theme="light" />

            <p className="text-xs text-[#666666] font-light leading-relaxed max-w-sm pt-2">
              Branded frames. Expert lenses. Personal attention, from a family that has served Kukatpally for over two decades.
            </p>

            <div className="pt-2 text-[11px] font-mono text-[#888888]">
              40 Years of Family Optical Industry Experience • Two Generations
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href={`https://wa.me/${CONFIG_TO_CONFIRM.whatsappPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#E5E5E5] bg-white hover:border-[#111111] text-[#666666] hover:text-[#111111] flex items-center justify-center transition shadow-xs"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </a>
              <a
                href={CONFIG_TO_CONFIRM.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#E5E5E5] bg-white hover:border-[#111111] text-[#666666] hover:text-[#111111] flex items-center justify-center transition shadow-xs"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href={CONFIG_TO_CONFIRM.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#E5E5E5] bg-white hover:border-[#111111] text-[#666666] hover:text-[#111111] flex items-center justify-center transition shadow-xs"
                aria-label="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#111111]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-mono text-[#666666]">
              <li><a href="#home" className="hover:text-[#111111] transition">Home</a></li>
              <li><a href="#collections" className="hover:text-[#111111] transition">Collections</a></li>
              <li><a href="#showcase" className="hover:text-[#111111] transition">Product Vault</a></li>
              <li><a href="#eye-care" className="hover:text-[#111111] transition">Lens Expertise</a></li>
              <li><a href="#our-story" className="hover:text-[#111111] transition">Our Story</a></li>
              <li><a href="#contact" className="hover:text-[#111111] transition">Visit Store</a></li>
            </ul>
          </div>

          {/* Curated Collections (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#111111]">
              Collections
            </h4>
            <ul className="space-y-2 text-xs font-mono text-[#666666]">
              {COLLECTIONS_TILES.map((c) => (
                <li key={c.id}>
                  <a href="#collections" className="hover:text-[#111111] transition">
                    {c.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Store Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3 font-mono text-xs">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#111111]">
              Store Details
            </h4>
            
            <div className="space-y-2.5 text-[#666666]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#111111] shrink-0 mt-0.5" />
                <span className="text-[#111111] font-sans text-xs">{BUSINESS_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                <span>{CONFIG_TO_CONFIRM.storeHours}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                <span>{CONFIG_TO_CONFIRM.phone}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={EYERIS_LOCATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-[#E5E5E5] bg-white hover:bg-[#111111] hover:text-white text-[#111111] text-xs font-medium transition shadow-xs"
              >
                <span>OPEN IN GOOGLE MAPS</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Legal Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#888888]">
          <p>© {new Date().getFullYear()} Eyeris Opticals. All Rights Reserved. KPHB Road No. 1, Kukatpally, Hyderabad.</p>
          <p>
            Ground Floor Interconnected with Global Eye Hospital
          </p>
        </div>

      </div>
    </footer>
  );
};
