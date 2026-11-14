'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/navigation/Navbar';
import { CinematicHero } from '@/components/hero/CinematicHero';
import { EyerisStory } from '@/components/story/EyerisStory';
import { ExploreCollections } from '@/components/collections/ExploreCollections';
import { BrandShowcase } from '@/components/brands/BrandShowcase';
import { InteractiveLensLab } from '@/components/lenslab/InteractiveLensLab';
import { LensFinderSection } from '@/components/lensfinder/LensFinderSection';
import { LensFinderModal } from '@/components/lensfinder/LensFinderModal';
import { CorporateCalculator } from '@/components/calculator/CorporateCalculator';
import { ReelsSection } from '@/components/reels/ReelsSection';
import { ConnectedCare } from '@/components/hospital/ConnectedCare';
import { Footer } from '@/components/navigation/Footer';
import { BookingModal } from '@/components/booking/BookingModal';
import { WhatsAppFloatingButton } from '@/components/booking/WhatsAppFloatingButton';

// Dynamically import 3D Canvas with SSR disabled to guarantee zero hydration mismatch
const EyewearCanvas = dynamic(
  () => import('@/components/3d/EyewearCanvas').then((mod) => mod.EyewearCanvas),
  {
    ssr: false,
    loading: () => (
      <section className="relative min-h-[600px] bg-background text-white py-16 flex items-center justify-center">
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
    <main className="min-h-screen bg-background text-ivory-100 flex flex-col relative selection:bg-brand-400 selection:text-black">
      
      {/* Sticky Top Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} onOpenLensFinder={handleOpenLensFinder} />

      {/* Section 01 — Cinematic Hero with Reference-Video 3D Perspective Stage & Tilt */}
      <CinematicHero onOpenBooking={handleOpenBooking} onOpenLensFinder={handleOpenLensFinder} />

      {/* Section 02 — The EYERIS Story (20+ Years, 40-Year Family Optical Trust, Global Eye Hospital Link) */}
      <EyerisStory onOpenBooking={handleOpenBooking} />

      {/* Section 03 — Explore Collections (6 Curated Luxury Categories) */}
      <ExploreCollections onOpenBooking={handleOpenBooking} />

      {/* Section 04 — Curated International Brand Showcase (Ray-Ban, Oakley, Prada, Stepper Titanium) */}
      <BrandShowcase onOpenBooking={handleOpenBooking} />

      {/* Section 05 — 3D Interactive Anatomy of Vision Experience (Three.js Parametric Exploded Glasses) */}
      <EyewearCanvas onOpenBooking={handleOpenBooking} />

      {/* Section 06 — Interactive Lens Lab (Live Optical Simulator: Digital, Progressive, DriveSafe, Transitions) */}
      <InteractiveLensLab onOpenBooking={handleOpenBooking} onOpenLensFinder={handleOpenLensFinder} />

      {/* Section 07 — Interactive EYERIS Lens Finder Diagnostic */}
      <LensFinderSection onOpenLensFinder={handleOpenLensFinder} />

      {/* Section 08 — Corporate Benefit & Lens Prescription Calculator (₹20,000 Claim Optimizer) */}
      <CorporateCalculator onOpenBookingWithPackage={handleOpenBookingWithPackage} />

      {/* Section 09 — EYERIS Journal & Reels Hub (Doctor talks, screen strain, progressive myths) */}
      <ReelsSection onOpenBooking={handleOpenBooking} />

      {/* Section 10 — Hospital Connected Care & Ground-Floor Physical Interconnection */}
      <ConnectedCare onOpenBooking={handleOpenBooking} />

      {/* Section 11 — Comprehensive Footer with Location, Authorized Brands & Store Hours */}
      <Footer onOpenBooking={handleOpenBooking} />

      {/* Real Appointment Booking Modal & WhatsApp VIP Pass */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialPackage={selectedPackage}
      />

      {/* Multi-Step Interactive Lens Finder Modal */}
      <LensFinderModal
        isOpen={lensFinderModalOpen}
        onClose={() => setLensFinderModalOpen(false)}
        onOpenBooking={handleOpenBooking}
      />

      {/* Persistent Floating WhatsApp Concierge */}
      <WhatsAppFloatingButton onOpenBooking={handleOpenBooking} />
    </main>
  );
}
