'use client';

import React, { useState, useEffect } from 'react';
import { Eye, Calendar, Phone, Sparkles, MapPin, Menu, X, ShieldCheck } from 'lucide-react';
import { EYERIS_STORE_PHONE, EYERIS_LOCATION_URL } from '@/components/booking/WhatsAppSync';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top micro-announcement banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-surface to-slate-900 border-b border-white/5 py-1.5 px-4 text-xs text-neutral-300 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-brand-400 animate-pulse"></span>
            <span>Ground-floor interconnected with <strong className="text-white">Global Eye Hospital</strong> • 40 Years of Optical Trust</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-neutral-400 text-[11px]">
            <span className="flex items-center gap-1 text-brand-300">
              <ShieldCheck className="w-3.5 h-3.5" /> ₹20,000 Corporate Vision Claim Support
            </span>
            <a 
              href={EYERIS_LOCATION_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1 hover:text-white transition"
            >
              <MapPin className="w-3 h-3 text-brand-400" /> KPHB Rd #1, Kukatpally
            </a>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-background/85 backdrop-blur-md border-b border-white/10 shadow-2xl py-3'
            : 'bg-background/40 backdrop-blur-sm border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400/20 via-brand-500/10 to-transparent border border-brand-500/30 flex items-center justify-center text-brand-400 group-hover:border-brand-400 transition-all shadow-[0_0_20px_rgba(0,196,159,0.2)]">
              <Eye className="w-5 h-5 text-brand-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-wider text-white font-display">EYERIS</span>
                <span className="text-[10px] tracking-widest uppercase bg-brand-500/20 text-brand-300 px-1.5 py-0.5 rounded font-mono border border-brand-500/30">
                  OPTICALS
                </span>
              </div>
              <p className="text-[10px] tracking-widest text-neutral-400 uppercase font-medium">
                KPHB Road No. 1 • Hyderabad
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
            <a href="#anatomy-3d" className="hover:text-brand-300 transition flex items-center gap-1">
              <span>3D Anatomy</span>
              <span className="text-[9px] text-brand-400 bg-brand-950/60 border border-brand-500/30 px-1 rounded">Interactive</span>
            </a>
            <a href="#brands" className="hover:text-brand-300 transition">Brands</a>
            <a href="#calculator" className="hover:text-brand-300 transition flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Corporate Calculator</span>
            </a>
            <a href="#lens-lab" className="hover:text-brand-300 transition">Lens Lab & Reels</a>
            <a href="#hospital-care" className="hover:text-brand-300 transition">Hospital Care</a>
            <a href="#contact" className="hover:text-brand-300 transition">Store Visit</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${EYERIS_STORE_PHONE}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white px-3 py-2 rounded-lg border border-white/10 hover:border-white/20 transition bg-surface/50"
            >
              <Phone className="w-3.5 h-3.5 text-brand-400" />
              <span>Call Store</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-brand-300 to-brand-400 hover:from-brand-200 hover:to-brand-300 px-4 py-2.5 rounded-xl shadow-[0_0_25px_rgba(0,196,159,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-4 h-4" />
              <span>Book VIP Slot</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-400 hover:text-white rounded-lg border border-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-surface-raised border-b border-white/10 px-4 pt-3 pb-6 mt-3 space-y-3">
            <a
              href="#anatomy-3d"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-neutral-200 py-1.5"
            >
              3D Anatomy of Vision
            </a>
            <a
              href="#brands"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-neutral-200 py-1.5"
            >
              Curated Brands (Ray-Ban, Oakley, Prada)
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-brand-300 py-1.5"
            >
              ₹20,000 Corporate Benefit Calculator
            </a>
            <a
              href="#lens-lab"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-neutral-200 py-1.5"
            >
              Lens Lab & Doctor Reels
            </a>
            <a
              href="#hospital-care"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-neutral-200 py-1.5"
            >
              Global Eye Hospital Connection & Legacy
            </a>
            <div className="pt-2 border-t border-white/10 flex gap-2">
              <a
                href={EYERIS_LOCATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2 text-xs bg-surface border border-white/10 rounded-lg text-neutral-300"
              >
                Directions (KPHB Rd #1)
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="flex-1 text-center py-2 text-xs bg-brand-400 font-semibold text-slate-950 rounded-lg"
              >
                Book Appointment
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
