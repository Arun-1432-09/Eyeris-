'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, ArrowRight, Menu, X, Phone } from 'lucide-react';
import { EyerisWhiteLogo } from './EyerisWhiteLogo';
import { WishlistDrawer } from './WishlistDrawer';
import { CONFIG_TO_CONFIRM } from '@/data/eyerisData';
import { generateQuickChatUrl } from '@/components/booking/WhatsAppSync';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenLensFinder?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenLensFinder }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  const updateWishlistCount = () => {
    try {
      const stored = localStorage.getItem('eyeris_wishlist');
      if (stored) {
        setWishlistCount(JSON.parse(stored).length);
      } else {
        setWishlistCount(0);
      }
    } catch {
      setWishlistCount(0);
    }
  };

  useEffect(() => {
    updateWishlistCount();

    const handleScroll = () => {
      setScrolled(window.scrollY > 25);

      const sections = ['home', 'collections', 'our-story', 'eye-care', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('eyeris_wishlist_updated', updateWishlistCount);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('eyeris_wishlist_updated', updateWishlistCount);
    };
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#home', id: 'home' },
    { label: 'COLLECTIONS', href: '#collections', id: 'collections' },
    { label: 'OUR STORY', href: '#our-story', id: 'our-story' },
    { label: 'EYE CARE', href: '#eye-care', id: 'eye-care' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#050505]/90 backdrop-blur-2xl border-b border-[#292929] py-3.5 shadow-luxury-md'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Left: Eyeris White Vector Logo */}
          <a href="#home" className="flex items-center group">
            <EyerisWhiteLogo size="md" />
          </a>

          {/* Center: Desktop Navigation Links (Reference 1 & 2) */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`text-[11px] font-mono tracking-[0.25em] transition-colors relative py-1 ${
                    isActive ? 'text-white font-semibold' : 'text-[#A1A1A6] hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#D4AF37] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right: Search, Wishlist & Enquire Now Pill (Reference 1 & 2) */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Trigger */}
            <a
              href="#showcase"
              className="p-2 text-[#A1A1A6] hover:text-white transition"
              aria-label="Search Collection"
            >
              <Search className="w-4 h-4" />
            </a>

            {/* Wishlist Trigger with Badge */}
            <button
              onClick={() => setWishlistOpen(true)}
              className="p-2 text-[#A1A1A6] hover:text-white transition relative"
              aria-label="View Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-[#D4AF37] text-black font-mono text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Vertical separator */}
            <span className="hidden sm:inline-block h-4 w-[1px] bg-[#292929]" />

            {/* Enquire Now Pill Button */}
            <button
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#292929] bg-[#101010] hover:bg-white hover:text-black text-white text-[11px] font-mono tracking-wider font-semibold transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-luxury-sm"
            >
              <span>ENQUIRE NOW</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white border border-[#292929] rounded-lg bg-[#101010]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Full-screen Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-[60px] bg-[#050505]/98 backdrop-blur-2xl border-b border-[#292929] px-6 py-8 space-y-5 animate-in slide-in-from-top duration-200">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-mono tracking-[0.2em] text-[#A1A1A6] hover:text-white py-1.5"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4 border-t border-[#292929] flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-full bg-white text-black font-mono font-semibold text-xs tracking-wider flex items-center justify-center gap-2"
              >
                <span>ENQUIRE NOW</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setWishlistOpen(true);
                }}
                className="w-full py-3 rounded-full border border-[#292929] bg-[#101010] text-white font-mono text-xs tracking-wider flex items-center justify-center gap-2"
              >
                <Heart className="w-3.5 h-3.5" />
                <span>SAVED WISHLIST ({wishlistCount})</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Slide-out Wishlist Drawer */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        onOpenBooking={onOpenBooking}
      />
    </>
  );
};
