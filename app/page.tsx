'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { CinematicPreloader } from '@/components/animations/CinematicPreloader';
import { SmoothScrollProvider } from '@/components/animations/SmoothScrollProvider';
import { Navbar } from '@/components/navigation/Navbar';
import { CinematicHero } from '@/components/hero/CinematicHero';
import { BrandMarquee } from '@/components/brands/BrandMarquee';
import { TrendingFramesShowcase } from '@/components/frames/TrendingFramesShowcase';
import { CorporateCalculator } from '@/components/calculator/CorporateCalculator';
import { ReelsSection } from '@/components/reels/ReelsSection';
import { ConnectedCare } from '@/components/hospital/ConnectedCare';
import { Footer } from '@/components/navigation/Footer';
import { BookingModal } from '@/components/booking/BookingModal';
import { LensFinderModal } from '@/components/lensfinder/LensFinderModal';
import { WhatsAppFloatingButton } from '@/components/booking/WhatsAppFloatingButton';

// Dynamically import 3D Canvas with SSR disabled to guarantee zero hydration mismatch
const EyewearCanvas = dynamic(
  () => import('@/components/3d/EyewearCanvas').then((mod) => mod.EyewearCanvas),
  {
    ssr: false,
    loading: () => (
      <section className="relative min-h-[500px] bg-background text-white py-16 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-brand-300">
          <div className="w-8 h-8 border-2 border-brand-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono tracking-wider">Loading 3D Interactive Anatomy Studio...</span>
        </div>
      </section>
    ),
  }
);

export default function Home() {
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [lensFinderModalOpen, setLensFinderModalOpen] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(undefined);

  const handleOpenBooking = () => {
    setSelectedPackage(undefined);
    setBookingModalOpen(true);
  };

  const handleOpenBookingWithPackage = (pkg: string) => {
    setSelectedPackage(pkg);
    setBookingModalOpen(true);
  };

  const handleOpenLensFinder = () => {
    setLensFinderModalOpen(true);
  };

  return (
    <SmoothScrollProvider>
      {/* Luxury Cinematic Opening Preloader Animation */}
      <CinematicPreloader />

      <main className="min-h-screen bg-background text-neutral-100 flex flex-col relative selection:bg-brand-400 selection:text-black">
        
        {/* Sticky Top Navigation */}
        <Navbar onOpenBooking={handleOpenBooking} onOpenLensFinder={handleOpenLensFinder} />

        {/* Section 01: Cinematic Hero (Clean, Bold, Animated) */}
        <CinematicHero onOpenBooking={handleOpenBooking} onOpenLensFinder={handleOpenLensFinder} />

        {/* Brand Marquee Ticker */}
        <BrandMarquee />

        {/* Section 02: 3D Interactive Anatomy of Vision Experience */}
        <EyewearCanvas onOpenBooking={handleOpenBooking} />

        {/* Section 03: Trending Frames & Spectacles (Ray-Ban, Oakley, Prada, Stepper, Tommy Hilfiger, CK) */}
        <TrendingFramesShowcase onOpenBooking={handleOpenBooking} />

        {/* Section 04: Corporate Optical Benefit Calculator (₹20,000 Allowance Maximizer) */}
        <CorporateCalculator onOpenBookingWithPackage={handleOpenBookingWithPackage} />

        {/* Section 05: Connected Care Advantage (Global Eye Hospital Corridor + 40-Year Trust) */}
        <ConnectedCare onOpenBooking={handleOpenBooking} />

        {/* Section 06: Eyeris Lens Lab & Reels Hub (Doctor Talks & Styling) */}
        <ReelsSection onOpenBooking={handleOpenBooking} />

        {/* Section 07: Comprehensive Store Footer & Map */}
        <Footer onOpenBooking={handleOpenBooking} />

        {/* Interactive Slot Booking Modal */}
        <BookingModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          initialPackage={selectedPackage}
        />

        {/* Interactive Lens Diagnostic Modal */}
        <LensFinderModal
          isOpen={lensFinderModalOpen}
          onClose={() => setLensFinderModalOpen(false)}
          onOpenBooking={() => {
            setLensFinderModalOpen(false);
            handleOpenBooking();
          }}
        />

        {/* Persistent Floating WhatsApp Concierge */}
        <WhatsAppFloatingButton onOpenBooking={handleOpenBooking} />
      </main>
    </SmoothScrollProvider>
  );
}
