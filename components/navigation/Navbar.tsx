'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye, Calendar, Phone, Sparkles, MapPin, Menu, X, ShieldCheck, Lock } from 'lucide-react';
import { EYERIS_STORE_PHONE, EYERIS_LOCATION_URL } from '@/components/booking/WhatsAppSync';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenLensFinder?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenLensFinder }) => {
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
      {/* Top Apple Minimal Announcement Banner */}
      <div className="bg-black/90 border-b border-white/5 py-1.5 px-4 text-xs text-apple-subtext font-mono">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-apple-green animate-pulse"></span>
            <span>
              KPHB Road No. 1, Kukatpally • Ground-floor linked to <strong className="text-white">Global Eye Hospital</strong>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-apple-subtext text-[11px]">
            <span className="flex items-center gap-1 text-apple-text">
              <ShieldCheck className="w-3.5 h-3.5 text-apple-blue-light" /> 40 Years of Optical Trust
            </span>
            <Link
              href="/admin"
              className="flex items-center gap-1 text-apple-subtext hover:text-white transition"
            >
              <Lock className="w-3 h-3 text-apple-blue-light" /> Staff Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Apple Frosted Glass Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-black/85 backdrop-blur-2xl border-b border-white/10 shadow-2xl py-3'
            : 'bg-black/40 backdrop-blur-xl border-b border-white/5 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Wordmark */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-apple-blue-light group-hover:border-apple-blue transition-all">
              <Eye className="w-4 h-4 text-apple-blue-light" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-white">EYERIS</span>
                <span className="text-[9px] tracking-widest uppercase bg-white/10 text-apple-text px-1.5 py-0.2 rounded font-mono">
                  OPTICALS
                </span>
              </div>
              <p className="text-[9px] tracking-widest text-apple-subtext uppercase">
                KPHB Rd #1 • Hyderabad
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-apple-subtext">
            <a href="#anatomy-3d" className="hover:text-white transition flex items-center gap-1">
              <span>3D Anatomy &amp; Physics</span>
              <span className="text-[9px] text-apple-blue-light bg-apple-blue/10 px-1 rounded">Simulator</span>
            </a>
            <a href="#trending-frames" className="hover:text-white transition">Trending Brands</a>
            <a href="#calculator" className="hover:text-white transition">₹20k Corporate Benefit</a>
            <a href="#hospital-care" className="hover:text-white transition">Hospital Link</a>
            <a href="#reels" className="hover:text-white transition">Doctor Reels</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <a
              href={`tel:${EYERIS_STORE_PHONE}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-apple-subtext hover:text-white px-3 py-1.5 rounded-full apple-glass transition"
            >
              <Phone className="w-3.5 h-3.5 text-apple-blue-light" />
              <span>Call Store</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-apple-blue hover:bg-apple-blue-hover px-4 py-2 rounded-full shadow-lg shadow-apple-blue/20 transition-all transform hover:-translate-y-0.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book VIP Slot</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-apple-subtext hover:text-white rounded-lg apple-glass"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-2xl border-b border-white/10 px-4 pt-3 pb-6 mt-3 space-y-3">
            <a
              href="#anatomy-3d"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-apple-text py-1.5"
            >
              3D Anatomy &amp; Lens Simulator
            </a>
            <a
              href="#trending-frames"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-apple-text py-1.5"
            >
              Trending Brands (Ray-Ban, Oakley, Prada, Stepper)
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-apple-blue-light py-1.5"
            >
              ₹20,000 Corporate Claim Calculator
            </a>
            <a
              href="#hospital-care"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-apple-text py-1.5"
            >
              Global Eye Hospital Corridor Link
            </a>
            <a
              href="#reels"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-apple-text py-1.5"
            >
              Doctor Talks &amp; Reels
            </a>
            <div className="pt-2 border-t border-white/10 flex gap-2">
              <a
                href={EYERIS_LOCATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2 text-xs apple-glass rounded-lg text-apple-subtext"
              >
                Directions
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="flex-1 text-center py-2 text-xs bg-apple-blue font-semibold text-white rounded-lg"
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
