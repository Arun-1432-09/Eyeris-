'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Phone, MapPin, Menu, X, ShieldCheck, Lock } from 'lucide-react';
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
      <div className="bg-[#F5F5F7] border-b border-neutral-200/80 py-1.5 px-4 text-xs text-apple-subtext font-mono">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
            <span>
              KPHB Road No. 1, Kukatpally • Ground Floor linked with <strong className="text-black font-semibold">Global Eye Hospital</strong>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-apple-subtext text-[11px]">
            <span className="flex items-center gap-1 text-apple-text">
              <ShieldCheck className="w-3.5 h-3.5 text-black" /> 40 Years of Clinical Trust
            </span>
            <Link
              href="/admin"
              className="flex items-center gap-1 text-apple-subtext hover:text-black transition"
            >
              <Lock className="w-3 h-3 text-neutral-400" /> Staff Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Apple Pure Light Frosted Glass Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-2xl border-b border-black/[0.08] shadow-apple-sm py-2.5'
            : 'bg-white/80 backdrop-blur-xl border-b border-black/[0.05] py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo - Official Eyeris Opticals Logo */}
          <a href="#" className="flex items-center gap-3 group">
            {/* Real Logo Image */}
            <div className="relative h-8 sm:h-9 w-28 sm:w-36 flex items-center">
              <Image
                src="/logo.jpeg"
                alt="Eyeris Opticals Logo"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
            <span className="hidden md:inline-block h-4 w-[1px] bg-neutral-300 mx-1"></span>
            <span className="hidden md:inline-block text-[10px] tracking-wider text-apple-subtext uppercase font-mono">
              KPHB Rd #1 • Hyderabad
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-medium text-apple-subtext">
            <a href="#runway-lookbook" className="hover:text-black transition-colors flex items-center gap-1">
              <span>Runway Lookbook</span>
              <span className="text-[9px] bg-black text-white px-1.5 py-0.2 rounded-full uppercase tracking-wider font-mono">2026</span>
            </a>
            <a href="#anatomy-3d" className="hover:text-black transition-colors">
              3D Anatomy
            </a>
            <a href="#trending-frames" className="hover:text-black transition-colors">
              Curated Brands
            </a>
            <a href="#calculator" className="hover:text-black transition-colors">
              ₹20k Claim Tool
            </a>
            <a href="#hospital-care" className="hover:text-black transition-colors">
              Hospital Corridor
            </a>
            <a href="#reels" className="hover:text-black transition-colors">
              Doctor Talks
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <a
              href={`tel:${EYERIS_STORE_PHONE}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-apple-text hover:text-black px-3.5 py-1.5 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 transition"
            >
              <Phone className="w-3.5 h-3.5 text-black" />
              <span>Call Store</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-black hover:bg-neutral-800 px-4 sm:px-5 py-2 rounded-full shadow-apple-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book VIP Slot</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-apple-subtext hover:text-black rounded-lg border border-neutral-200 bg-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-black/[0.08] px-4 pt-3 pb-6 mt-3 space-y-3">
            <a
              href="#runway-lookbook"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-black py-1.5"
            >
              Runway Lookbook Collection 2026
            </a>
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
              Curated Brands (Ray-Ban, Oakley, Prada, Stepper)
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-apple-text py-1.5"
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
            <div className="pt-2 border-t border-neutral-200 flex gap-2">
              <a
                href={EYERIS_LOCATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2 text-xs border border-neutral-200 rounded-full text-black hover:bg-neutral-50"
              >
                Directions
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="flex-1 text-center py-2 text-xs bg-black font-semibold text-white rounded-full"
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
