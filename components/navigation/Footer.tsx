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
    <footer className="bg-[#050505] text-[#A1A1A6] border-t border-[#292929] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-[#1C1C1C]">
          
          {/* Brand & One-line Statement (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <EyerisWhiteLogo size="md" />

            <p className="text-xs text-[#A1A1A6] font-light leading-relaxed max-w-sm pt-2">
              Branded frames. Expert lenses. Personal attention, from a family that has served Kukatpally for over two decades.
            </p>

            <div className="pt-2 text-[11px] font-mono text-[#707070]">
              40 Years of Family Optical Industry Experience • Two Generations
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href={`https://wa.me/${CONFIG_TO_CONFIRM.whatsappPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#292929] hover:border-white text-[#A1A1A6] hover:text-white flex items-center justify-center transition"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </a>
              <a
                href={CONFIG_TO_CONFIRM.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#292929] hover:border-white text-[#A1A1A6] hover:text-white flex items-center justify-center transition"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href={CONFIG_TO_CONFIRM.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#292929] hover:border-white text-[#A1A1A6] hover:text-white flex items-center justify-center transition"
                aria-label="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-mono text-[#707070]">
              <li><a href="#home" className="hover:text-white transition">Home</a></li>
              <li><a href="#collections" className="hover:text-white transition">Collections</a></li>
              <li><a href="#showcase" className="hover:text-white transition">Product Vault</a></li>
              <li><a href="#eye-care" className="hover:text-white transition">Lens Expertise</a></li>
              <li><a href="#our-story" className="hover:text-white transition">Our Story</a></li>
              <li><a href="#contact" className="hover:text-white transition">Visit Store</a></li>
            </ul>
          </div>

          {/* Curated Collections (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
              Collections
            </h4>
            <ul className="space-y-2 text-xs font-mono text-[#707070]">
              {COLLECTIONS_TILES.map((c) => (
                <li key={c.id}>
                  <a href="#collections" className="hover:text-white transition">
                    {c.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Store Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3 font-mono text-xs">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Store Details
            </h4>
            
            <div className="space-y-2.5 text-[#707070]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                <span className="text-white font-sans text-xs">{BUSINESS_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-white shrink-0" />
                <span>{CONFIG_TO_CONFIRM.storeHours}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-white shrink-0" />
                <span>{CONFIG_TO_CONFIRM.phone}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={EYERIS_LOCATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-[#292929] hover:bg-white hover:text-black text-white text-xs font-medium transition"
              >
                <span>OPEN IN GOOGLE MAPS</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Legal Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#707070]">
          <p>© {new Date().getFullYear()} Eyeris Opticals. All Rights Reserved. KPHB Road No. 1, Kukatpally, Hyderabad.</p>
          <p>
            Ground Floor Interconnected with Global Eye Hospital
          </p>
        </div>

      </div>
    </footer>
  );
};
