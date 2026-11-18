'use client';

import React from 'react';
import { Eye, Phone, MapPin, Clock, MessageSquare, Instagram, Youtube } from 'lucide-react';
import { EYERIS_STORE_PHONE, EYERIS_LOCATION_URL, EYERIS_ADDRESS, EYERIS_WHATSAPP_NUMBER } from '@/components/booking/WhatsAppSync';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer id="contact" className="bg-black text-apple-subtext border-t border-apple-border pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-apple-border">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl apple-glass flex items-center justify-center text-apple-blue-light">
                <Eye className="w-4 h-4 text-apple-blue-light" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-white">EYERIS</span>
                <span className="text-[9px] tracking-widest uppercase bg-white/10 text-apple-text ml-2 px-1.5 py-0.5 rounded font-mono">
                  OPTICALS
                </span>
                <p className="text-[10px] text-apple-subtext uppercase tracking-widest">KPHB Road No. 1 • Hyderabad</p>
              </div>
            </div>

            <p className="text-xs text-apple-subtext leading-relaxed">
              Carrying forward 40 years and two generations of optical precision. Internally interconnected on the ground floor with Global Eye Hospital.
            </p>

            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={`https://wa.me/${EYERIS_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full apple-glass hover:border-apple-blue text-apple-subtext hover:text-white flex items-center justify-center transition"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full apple-glass hover:border-apple-blue text-apple-subtext hover:text-white flex items-center justify-center transition"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full apple-glass hover:border-apple-blue text-apple-subtext hover:text-white flex items-center justify-center transition"
                aria-label="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Optical Specializations (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white font-mono">
              Lens Specialisation (60–70%)
            </h4>
            <ul className="space-y-2 text-xs text-apple-subtext">
              <li>ZEISS BlueGuard® IT Screen Optics</li>
              <li>German Freeform Progressives (35+)</li>
              <li>ZEISS DriveSafe Anti-Glare Commute</li>
              <li>Pediatric Myopia Management Lenses</li>
              <li>Transitions® GEN S™ Adaptive Sunlight Tint</li>
            </ul>
          </div>

          {/* Curated Brands (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white font-mono">
              Curated Brands
            </h4>
            <ul className="space-y-2 text-xs text-apple-subtext">
              <li>Ray-Ban (Reverse &amp; Classic)</li>
              <li>Oakley (O-Matter™ Optics)</li>
              <li>Prada (Milano Sculpted)</li>
              <li>Stepper Titanium (&lt;8.6g)</li>
              <li>Tommy Hilfiger &amp; CK</li>
              <li>Vogue Eyewear</li>
            </ul>
          </div>

          {/* Store Hours & KPHB Map Location (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white font-mono">
              Store Details
            </h4>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-apple-blue-light shrink-0 mt-0.5" />
                <span className="text-apple-subtext">{EYERIS_ADDRESS}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-apple-blue-light shrink-0" />
                <span className="text-apple-subtext">Mon – Sun: 10:00 AM – 9:30 PM</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-apple-blue-light shrink-0" />
                <a href={`tel:${EYERIS_STORE_PHONE}`} className="text-white hover:text-apple-blue-light transition">
                  {EYERIS_STORE_PHONE}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={EYERIS_LOCATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-full apple-glass hover:bg-white/10 text-xs font-medium text-white transition"
              >
                <MapPin className="w-3 h-3 text-apple-blue-light" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-apple-tertiary">
          <p>© {new Date().getFullYear()} Eyeris Opticals. All Rights Reserved. KPHB Road No. 1, Hyderabad.</p>
          <p>
            Designed with Apple Pro Modern aesthetic &amp; clinical precision
          </p>
        </div>
      </div>
    </footer>
  );
};
