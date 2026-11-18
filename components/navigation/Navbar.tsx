'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Heart, ArrowRight, Menu, X, Phone } from 'lucide-react';
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
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'collections', 'our-story', 'eye-care', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
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
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E5E5E5] py-3'
            : 'bg-white/85 backdrop-blur-sm border-b border-[#F0F0F0] py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          
          {/* Authentic Eyeris Logo (Black Lettering) */}
          <Link href="#home" className="flex items-center group">
            <div className="relative w-36 sm:w-44 h-9 sm:h-10 overflow-hidden">
              <Image
                src="/logo.jpeg"
                alt="Eyeris Opticals Logo"
                fill
                priority
                className="object-contain object-left mix-blend-multiply"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links (Image 2) */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`text-[11px] font-mono tracking-[0.25em] transition-colors relative py-1 ${
                    isActive ? 'text-[#111111] font-bold' : 'text-[#666666] hover:text-[#111111]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Enquire Now Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Quick Call */}
            <a
              href={`tel:${CONFIG_TO_CONFIRM.phone}`}
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full border border-[#E5E5E5] text-[#666666] hover:text-[#111111] hover:bg-[#F7F7F7] transition-colors"
              title="Call Store Concierge"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>

            {/* Wishlist Button */}
            <button
              onClick={() => setWishlistOpen(true)}
              aria-label="View Wishlist"
              className="relative p-2 rounded-full border border-[#E5E5E5] text-[#666666] hover:text-[#111111] hover:bg-[#F7F7F7] transition-all"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#111111] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Enquire Now Pill Button */}
            <a
              href={generateQuickChatUrl("Hi EYERIS, I would like to enquire about your optical collections and book a consultation.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] hover:bg-black text-white text-xs font-semibold tracking-wider transition-all shadow-sm active:scale-95"
            >
              <span>ENQUIRE NOW</span>
              <ArrowRight className="w-3 h-3" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#111111] focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/98 backdrop-blur-xl border-b border-[#E5E5E5] px-6 py-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-bold tracking-[0.2em] text-[#111111] hover:text-[#666666] py-1 border-b border-[#F0F0F0]"
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-2.5 rounded-lg bg-[#111111] text-white text-xs font-semibold tracking-wider"
                >
                  BOOK STORE VISIT
                </button>
                <a
                  href={`tel:${CONFIG_TO_CONFIRM.phone}`}
                  className="w-full py-2 rounded-lg border border-[#E5E5E5] text-[#111111] text-xs font-medium text-center"
                >
                  CALL CONCIERGE: {CONFIG_TO_CONFIRM.phone}
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Wishlist Slide-Out Drawer */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        onOpenBooking={onOpenBooking}
      />
    </>
  );
};
