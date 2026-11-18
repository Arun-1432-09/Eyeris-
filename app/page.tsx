'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { CinematicPreloader } from '@/components/animations/CinematicPreloader';
import { SmoothScrollProvider } from '@/components/animations/SmoothScrollProvider';
import { Navbar } from '@/components/navigation/Navbar';
import { CinematicRunwayHero } from '@/components/hero/CinematicRunwayHero';
import { BrandIntro } from '@/components/story/BrandIntro';
import { CollectionsGrid } from '@/components/collections/CollectionsGrid';
import { ProductShowcase } from '@/components/showcase/ProductShowcase';
import { LensExpertiseSection } from '@/components/lenses/LensExpertiseSection';
import { HospitalConnection } from '@/components/hospital/HospitalConnection';
import { OurStoryTimeline } from '@/components/story/OurStoryTimeline';
import { EyeCareInsights } from '@/components/insights/EyeCareInsights';
import { BookingSection } from '@/components/booking/BookingSection';
import { Footer } from '@/components/navigation/Footer';
import { BookingModal } from '@/components/booking/BookingModal';
import { LensFinderModal } from '@/components/lensfinder/LensFinderModal';
import { ProductDetailModal } from '@/components/showcase/ProductDetailModal';
import { WhatsAppFloatingButton } from '@/components/booking/WhatsAppFloatingButton';
import { ShowcaseProduct } from '@/data/eyerisData';

// Dynamically import 3D Canvas with SSR disabled
const EyewearCanvas = dynamic(
  () => import('@/components/3d/EyewearCanvas').then((mod) => mod.EyewearCanvas),
  {
    ssr: false,
    loading: () => (
      <section className="relative min-h-[500px] bg-[#050505] text-white py-16 flex items-center justify-center border-b border-[#292929]">
        <div className="flex flex-col items-center gap-3 text-[#A1A1A6]">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono tracking-wider">Loading Three.js Ophthalmic Studio...</span>
        </div>
      </section>
    ),
  }
);

export default function Home() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [lensFinderModalOpen, setLensFinderModalOpen] = useState(false);
  const [activeDetailProduct, setActiveDetailProduct] = useState<ShowcaseProduct | null>(null);

  const handleOpenBooking = () => {
    setBookingModalOpen(true);
  };

  const handleOpenLensFinder = () => {
    setLensFinderModalOpen(true);
  };

  const handleOpenProductDetail = (product: ShowcaseProduct) => {
    setActiveDetailProduct(product);
  };

  return (
    <SmoothScrollProvider>
      {/* Luxury Cinematic Preloader */}
      <CinematicPreloader />

      <main className="min-h-screen bg-[#050505] text-white flex flex-col relative selection:bg-white selection:text-black">
        
        {/* Top Floating Luxury Navbar */}
        <Navbar
          onOpenBooking={handleOpenBooking}
          onOpenLensFinder={handleOpenLensFinder}
        />

        {/* Section 01: Flagship Hero & Cinematic Eyewear Runway (References 1 & 2) */}
        <CinematicRunwayHero
          onOpenBooking={handleOpenBooking}
          onOpenProductDetail={handleOpenProductDetail}
        />

        {/* Section 02: Brand Intro ("VISION. PERFECTED." Scroll-Scrubbed Reveal) */}
        <BrandIntro />

        {/* Section 03: Collections (6 Product-Only Tiles) */}
        <CollectionsGrid />

        {/* Section 04: Product Showcase (Filterable Grid + Wishlist + WhatsApp) */}
        <ProductShowcase onOpenBooking={handleOpenBooking} />

        {/* Section 05: 3D Interactive Anatomy Studio (Three.js Lens Physics) */}
        <EyewearCanvas onOpenBooking={handleOpenBooking} />

        {/* Section 06: Flagship Lens Expertise (Equal in Weight to Frames) */}
        <LensExpertiseSection
          onOpenBooking={handleOpenBooking}
          onOpenLensFinder={handleOpenLensFinder}
        />

        {/* Section 07: Eyeris + Global Eye Hospital ("WHERE VISION MEETS EXPERTISE") */}
        <HospitalConnection onOpenBooking={handleOpenBooking} />

        {/* Section 08: Our Story ("FOUR DECADES. TWO GENERATIONS. ONE VISION.") */}
        <OurStoryTimeline />

        {/* Section 09: Eye Care & Insights (Video-Ready Editorial Cards) */}
        <EyeCareInsights />

        {/* Section 10: Plan Your Visit & Booking Section (Real Form) */}
        <BookingSection />

        {/* Section 11: Comprehensive Store Footer */}
        <Footer onOpenBooking={handleOpenBooking} />

        {/* Global Modal Overlays */}
        <BookingModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
        />

        <LensFinderModal
          isOpen={lensFinderModalOpen}
          onClose={() => setLensFinderModalOpen(false)}
          onOpenBooking={handleOpenBooking}
        />

        <ProductDetailModal
          product={activeDetailProduct}
          onClose={() => setActiveDetailProduct(null)}
          onOpenBooking={handleOpenBooking}
        />

        {/* Persistent Floating WhatsApp Concierge */}
        <WhatsAppFloatingButton onOpenBooking={handleOpenBooking} />
      </main>
    </SmoothScrollProvider>
  );
}
