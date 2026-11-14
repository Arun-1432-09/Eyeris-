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
      {/* Top Editorial Banner */}
      <div className="bg-graphite border-b border-white/5 py-1.5 px-4 text-xs text-neutral-300 font-mono">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-brand-400 animate-pulse"></span>
            <span>
              KPHB Road No. 1, Kukatpally • Ground-floor linked to <strong className="text-white">Global Eye Hospital</strong>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-neutral-400 text-[11px]">
            <span className="flex items-center gap-1 text-champagne-300">
              <ShieldCheck className="w-3.5 h-3.5" /> 40 Years of Optical Trust
            </span>
            <Link
              href="/admin"
              className="flex items-center gap-1 text-neutral-400 hover:text-brand-300 transition"
            >
              <Lock className="w-3 h-3 text-brand-400" /> Staff Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-background/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3'
            : 'bg-background/50 backdrop-blur-sm border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-champagne-500/20 via-brand-500/10 to-transparent border border-champagne-500/30 flex items-center justify-center text-champagne-400 group-hover:border-brand-400 transition-all shadow-[0_0_20px_rgba(185,154,104,0.2)]">
              <Eye className="w-5 h-5 text-champagne-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-wider text-white font-serif">EYERIS</span>
                <span className="text-[10px] tracking-widest uppercase bg-brand-500/15 text-brand-300 px-1.5 py-0.5 rounded font-mono border border-brand-400/30">
                  OPTICALS
                </span>
              </div>
              <p className="text-[9px] tracking-widest text-neutral-400 uppercase font-mono">
                Precision Vision • Hyderabad
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-mono text-neutral-300">
            <a href="#story" className="hover:text-champagne-300 transition">Heritage</a>
            <a href="#collections" className="hover:text-champagne-300 transition">Collections</a>
            <a href="#brands" className="hover:text-champagne-300 transition">Brands</a>
            <a href="#anatomy-3d" className="hover:text-brand-300 transition flex items-center gap-1">
              <span>3D Anatomy</span>
              <span className="text-[9px] text-brand-400 bg-brand-950/80 border border-brand-400/30 px-1 rounded">Interactive</span>
            </a>
            <a href="#lens-lab" className="hover:text-brand-300 transition">Lens Lab</a>
            {onOpenLensFinder && (
              <button
                onClick={onOpenLensFinder}
                className="hover:text-brand-300 text-brand-400 transition flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-brand-400" />
                <span>Lens Finder</span>
              </button>
            )}
            <a href="#calculator" className="hover:text-champagne-300 transition flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
              <span>₹20k Allowance</span>
            </a>
            <a href="#reels" className="hover:text-champagne-300 transition">Journal</a>
            <a href="#contact" className="hover:text-champagne-300 transition">Visit Store</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${EYERIS_STORE_PHONE}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-neutral-300 hover:text-white px-3 py-2 rounded-lg border border-white/10 hover:border-white/20 transition bg-surface/50"
            >
              <Phone className="w-3.5 h-3.5 text-brand-400" />
              <span>Call Store</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-champagne-500 hover:bg-champagne-400 text-slate-950 font-bold text-xs font-mono tracking-wider transition-all transform hover:-translate-y-0.5 shadow-[0_0_20px_rgba(185,154,104,0.3)]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>BOOK VIP SLOT</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-graphite border border-white/10 text-neutral-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-graphite border-b border-white/10 px-6 py-6 space-y-4">
            <div className="flex flex-col gap-3 text-sm font-mono text-neutral-300">
              <a href="#story" onClick={() => setMobileMenuOpen(false)} className="hover:text-champagne-400">01. Heritage &amp; Trust</a>
              <a href="#collections" onClick={() => setMobileMenuOpen(false)} className="hover:text-champagne-400">02. Curated Collections</a>
              <a href="#brands" onClick={() => setMobileMenuOpen(false)} className="hover:text-champagne-400">03. International Brands</a>
              <a href="#anatomy-3d" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-300">04. 3D Anatomy of Vision</a>
              <a href="#lens-lab" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-300">05. Lens Lab &amp; Science</a>
              {onOpenLensFinder && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLensFinder();
                  }}
                  className="text-left text-brand-300 hover:text-white flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                  <span>06. AI Lens Finder Quiz</span>
                </button>
              )}
              <a href="#calculator" onClick={() => setMobileMenuOpen(false)} className="hover:text-champagne-400">07. ₹20,000 Corporate Claim</a>
              <a href="#reels" onClick={() => setMobileMenuOpen(false)} className="hover:text-champagne-400">08. EYERIS Journal</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-champagne-400">09. Visit Showroom</a>
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="text-brand-400 pt-2 border-t border-white/10 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" /> Staff Console &amp; CRM
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
