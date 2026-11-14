'use client';

import React from 'react';
import { Eye, Phone, MapPin, Clock, MessageSquare, Instagram, Youtube, ShieldCheck, Heart } from 'lucide-react';
import { EYERIS_STORE_PHONE, EYERIS_LOCATION_URL, EYERIS_ADDRESS, EYERIS_WHATSAPP_NUMBER } from '@/components/booking/WhatsAppSync';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer id="contact" className="bg-background text-neutral-400 border-t border-white/10 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
                <Eye className="w-5 h-5 text-brand-400" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-wider text-white font-display">EYERIS</span>
                <span className="text-[10px] tracking-widest uppercase bg-brand-500/20 text-brand-300 ml-2 px-1.5 py-0.5 rounded font-mono">
                  OPTICALS
                </span>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest">KPHB Road No. 1 • Hyderabad</p>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              Carrying forward 40 years and two generations of optical mastery. A connected eye care destination internally linked on the ground floor with Global Eye Hospital.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${EYERIS_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-surface border border-white/10 hover:border-green-500/40 text-neutral-300 hover:text-green-400 flex items-center justify-center transition"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-surface border border-white/10 hover:border-pink-500/40 text-neutral-300 hover:text-pink-400 flex items-center justify-center transition"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-surface border border-white/10 hover:border-red-500/40 text-neutral-300 hover:text-red-400 flex items-center justify-center transition"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Optical Specializations (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Lens Specialisation (60–70% Focus)
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li>Digital Blue-Block Pro (IT Corridors)</li>
              <li>Personalized Freeform Progressives (35+)</li>
              <li>ZEISS DriveSafe Anti-Glare Optics</li>
              <li>Pediatric Myopia Management</li>
              <li>Adaptive Photochromic Transitions®</li>
              <li>High-Power Astigmatism Precision Lenses</li>
            </ul>
          </div>

          {/* Curated Brands (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Authorized Brands
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li>Ray-Ban</li>
              <li>Oakley O-Matter™</li>
              <li>Prada Milano</li>
              <li>Stepper Titanium</li>
              <li>Tommy Hilfiger</li>
              <li>Calvin Klein (CK)</li>
              <li>Vogue Eyewear</li>
            </ul>
          </div>

          {/* Store Hours & KPHB Map Location (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Visit Standalone Store
            </h4>
            
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span className="text-neutral-300">{EYERIS_ADDRESS}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-400 shrink-0" />
                <span className="text-neutral-300">Mon – Sun: 10:00 AM – 9:30 PM</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <a href={`tel:${EYERIS_STORE_PHONE}`} className="text-brand-300 hover:text-white transition">
                  {EYERIS_STORE_PHONE}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={EYERIS_LOCATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-surface border border-white/10 hover:border-brand-400/40 text-xs font-semibold text-white transition"
              >
                <MapPin className="w-3.5 h-3.5 text-brand-400" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Eyeris Opticals. All Rights Reserved. KPHB Road No. 1, Hyderabad.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with medical precision &amp; aesthetic taste</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
