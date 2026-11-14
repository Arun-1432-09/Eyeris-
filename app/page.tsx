'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/navigation/Navbar';
import { HeroSection } from '@/components/hero/HeroSection';
import { CorporateCalculator } from '@/components/calculator/CorporateCalculator';
import { BrandShowcase } from '@/components/brands/BrandShowcase';
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
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(undefined);

  const handleOpenBooking = () => {
    setSelectedPackage(undefined);
    setBookingModalOpen(true);
  };

  const handleOpenBookingWithPackage = (pkg: string) => {
    setSelectedPackage(pkg);
    setBookingModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-background text-neutral-100 flex flex-col relative">
      {/* Sticky Top Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Hero Section */}
      <HeroSection onOpenBooking={handleOpenBooking} />

      {/* 3D Interactive Anatomy of Vision Experience */}
      <EyewearCanvas onOpenBooking={handleOpenBooking} />

      {/* Corporate Benefit & Lens Prescription Calculator */}
      <CorporateCalculator onOpenBookingWithPackage={handleOpenBookingWithPackage} />

      {/* Curated International Brand Showcase */}
      <BrandShowcase onOpenBooking={handleOpenBooking} />

      {/* Eyeris Lens Lab & Social Reels Feed */}
      <ReelsSection onOpenBooking={handleOpenBooking} />

      {/* Hospital Connected Care & 40-Year Legacy Section */}
      <ConnectedCare onOpenBooking={handleOpenBooking} />

      {/* Comprehensive Footer */}
      <Footer onOpenBooking={handleOpenBooking} />

      {/* Interactive Slot Booking & WhatsApp Pass Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialPackage={selectedPackage}
      />

      {/* Persistent Floating WhatsApp Concierge */}
      <WhatsAppFloatingButton onOpenBooking={handleOpenBooking} />
    </main>
  );
}
