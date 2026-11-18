'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShieldCheck, Eye } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export interface RunwayLookbookItem {
  id: string;
  season: string;
  title: string;
  brand: string;
  material: string;
  weight: string;
  optics: string;
  aesthetic: string;
  description: string;
  gradient: string;
  badge: string;
  features: string[];
}

export const RUNWAY_COLLECTIONS: RunwayLookbookItem[] = [
  {
    id: 'milanese-couture',
    season: 'Haute Runway 2026',
    title: 'Milanese Sculpted Acetate',
    brand: 'Prada & Vogue Atelier',
    material: 'Hand-Milled Italian Cellulosic Acetate',
    weight: '32g Balanced Ergonomics',
    optics: '1.67 High-Index Aspheric / 100% UV400',
    aesthetic: 'Geometric beveling, high-gloss obsidian finish, architectural presence.',
    description: 'Direct from Milan Fashion Week. Bold, faceted temples with signature dimensional geometry tailored for statement presence in executive and evening settings.',
    gradient: 'from-neutral-900 via-neutral-800 to-black',
    badge: 'Runway Exclusive',
    features: ['Precision-beveled edges', 'High-gloss obsidian sheen', 'Cat-eye architectural lift', 'Rx Progressive ready'],
  },
  {
    id: 'titanium-purism',
    season: 'Atelier Minimal',
    title: 'Aerospace Beta-Titanium',
    brand: 'Stepper Titanium & Silhouette',
    material: 'Japanese Laser-Machined Beta-Titanium',
    weight: '< 8.6g Featherweight',
    optics: 'ZEISS ClearView 1.60 FreeForm Optics',
    aesthetic: 'Monolithic hairline profiles, hypoallergenic skin contact, zero screw tension.',
    description: 'Engineering stripped to pure function. Weighing less than two coins, this collection delivers all-day weightlessness for high-focus software leaders.',
    gradient: 'from-neutral-800 via-neutral-700 to-neutral-900',
    badge: 'German Engineering',
    features: ['<8.6g total frame weight', '100% Nickel-free hypoallergenic', 'Screwless friction hinges', 'Zero pressure temple tips'],
  },
  {
    id: 'neo-heritage',
    season: 'Heritage Archive',
    title: 'Reverse Concave Silhouette',
    brand: 'Ray-Ban Reverse & Clubmaster',
    material: 'Bio-Based Acetate & Polished Gold Wire',
    weight: '24g Balanced Pivot',
    optics: 'Reverse Concave Ergonomic Curve',
    aesthetic: 'First-ever inverted lens curvature following the natural cheekbone contour.',
    description: 'An audacious redesign of the iconic 1952 Wayfarer silhouette. The lens curves inward to match natural ocular angles while deflecting stray peripheral glare.',
    gradient: 'from-black via-neutral-900 to-neutral-800',
    badge: 'Global Icon Reborn',
    features: ['World-first inverted lens', 'Bio-acetate sustainable core', 'Classic 24K gold rivets', 'Transitions GEN S ready'],
  },
  {
    id: 'aerodynamic-speed',
    season: 'Active Performance',
    title: 'High-Velocity O-Matter™',
    brand: 'Oakley Hex Jector & Holbrook',
    material: 'Stress-Resistant O-Matter™ Synthetic',
    weight: '21g Kinetic Balance',
    optics: 'Prizm™ High-Definition Contrast Lens',
    aesthetic: 'Sculpted airflow intakes, three-point anatomical skull anchor.',
    description: 'Designed for Hyderabad commuters and fitness enthusiasts. Unobtainium® ear-socks increase grip when perspiring, maintaining laser-calibrated optic alignment.',
    gradient: 'from-neutral-900 via-neutral-800 to-black',
    badge: 'Sports Performance',
    features: ['Three-Point Anatomical Fit', 'Sweat-activated grip sockets', 'Impact-resistant polycarbonate', 'Wide peripheral visual field'],
  },
  {
    id: 'metropolitan-minimal',
    season: 'Executive Suite',
    title: 'Monolithic Architectural Wire',
    brand: 'Calvin Klein & Tommy Hilfiger',
    material: 'Fine-Brushed Gunmetal & Medical Monel',
    weight: '14g Precision Thin-Wire',
    optics: 'BlueProtect™ 415-455nm HEV Filter',
    aesthetic: 'Subtle clean bridge, understated luxury for conference rooms and keynote stages.',
    description: 'The epitome of quiet luxury. Crisp geometric rectangular silhouettes finished in brushed graphite and titanium grey, engineered for screen-heavy workdays.',
    gradient: 'from-neutral-800 via-neutral-900 to-black',
    badge: 'Executive Suite',
    features: ['Ultra-slim 1.2mm wire rim', 'Integrated BlueProtect coating', 'Adjustable silicone pads', 'Progressive dual-zone optics'],
  },
  {
    id: 'pediatric-nextgen',
    season: 'Clinical Pediatric',
    title: 'Bio-Flexible Memory Alloy',
    brand: 'SmartFlex Pediatric & Ray-Ban Junior',
    material: 'Medical-Grade Thermoplastic Elastomer',
    weight: '11g Flexible Memory',
    optics: 'Myopia Defocus Management Glass',
    aesthetic: 'Bright joyful tones, 180° twistable hinges, drop-proof everyday durability.',
    description: 'Tailored for children with growing vision needs. Compatible with clinical myopia control defocus lenses prescribed directly by Global Eye Hospital ophthalmologists.',
    gradient: 'from-neutral-900 via-neutral-800 to-neutral-700',
    badge: 'Hospital Pediatric Link',
    features: ['180° twistable memory frame', 'Shatter-proof organic lenses', 'Myopia progression control', 'Soft anatomical bridge'],
  },
];

interface RunwayLookbookCarouselProps {
  onOpenBooking: () => void;
}

export const RunwayLookbookCarousel: React.FC<RunwayLookbookCarouselProps> = ({ onOpenBooking }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % RUNWAY_COLLECTIONS.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + RUNWAY_COLLECTIONS.length) % RUNWAY_COLLECTIONS.length);
  };

  const currentItem = RUNWAY_COLLECTIONS[activeIndex];

  return (
    <section id="runway-lookbook" className="relative bg-white text-black py-24 sm:py-32 overflow-hidden border-b border-neutral-200">
      {/* Background Subtle Apple Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FBFBFD] via-white to-[#F5F5F7] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Eyebrow & Title */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono tracking-widest uppercase text-apple-subtext mb-4">
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span>Runway Lookbook Collection 2026</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black">
                Couture Architecture. <br className="hidden sm:inline" />
                <span className="text-neutral-500 font-light">Haute Vision.</span>
              </h2>
            </div>

            <div className="flex flex-col items-start md:items-end gap-4">
              <p className="text-sm sm:text-base text-apple-subtext max-w-md md:text-right">
                Explore hand-curated editorial eyewear crafted from sculpted Italian acetate, Japanese aerospace beta-titanium, and clinical precision glass.
              </p>

              {/* Carousel Navigation Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full border border-neutral-300 bg-white hover:bg-neutral-100 flex items-center justify-center text-black shadow-apple-sm transition active:scale-95"
                  aria-label="Previous Collection"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="text-xs font-mono text-apple-subtext px-2">
                  <span className="font-bold text-black">{String(activeIndex + 1).padStart(2, '0')}</span>
                  <span className="mx-1">/</span>
                  <span>{String(RUNWAY_COLLECTIONS.length).padStart(2, '0')}</span>
                </div>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full border border-neutral-300 bg-white hover:bg-neutral-100 flex items-center justify-center text-black shadow-apple-sm transition active:scale-95"
                  aria-label="Next Collection"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Feature Runway Presentation Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Visual Editorial Runway Card (Left 7 Cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, scale: 0.98, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -12 }}
                transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative rounded-3xl overflow-hidden bg-neutral-900 text-white min-h-[460px] sm:min-h-[520px] flex flex-col justify-between p-8 sm:p-12 shadow-apple-lg border border-neutral-800"
              >
                {/* Visual Atmospheric Stage Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${currentItem.gradient} opacity-95`} />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/60 pointer-events-none" />

                {/* Eyewear Spec Silhouette Abstract Accent */}
                <div className="absolute right-[-20%] bottom-[-10%] w-[380px] h-[380px] rounded-full border border-white/[0.08] pointer-events-none flex items-center justify-center">
                  <div className="w-[280px] h-[280px] rounded-full border border-white/[0.05]" />
                </div>

                {/* Top Badge & Brand Tag */}
                <div className="relative z-10 flex items-center justify-between gap-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-mono tracking-wider uppercase text-white font-semibold">
                    {currentItem.badge}
                  </span>
                  <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
                    {currentItem.brand}
                  </span>
                </div>

                {/* Center High-Fashion Eyewear Silhouette Display */}
                <div className="relative z-10 my-auto py-8">
                  <div className="inline-block text-xs font-mono tracking-widest uppercase text-neutral-300 mb-2">
                    {currentItem.season}
                  </div>
                  <h3 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
                    {currentItem.title}
                  </h3>
                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-xl font-light">
                    {currentItem.description}
                  </p>
                </div>

                {/* Bottom Spec Pills */}
                <div className="relative z-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-3 text-xs font-mono">
                  <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10 text-white">
                    <span className="text-neutral-400 mr-1.5">Weight:</span>
                    <strong className="font-semibold">{currentItem.weight}</strong>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10 text-white">
                    <span className="text-neutral-400 mr-1.5">Optics:</span>
                    <strong className="font-semibold">{currentItem.optics}</strong>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Editorial Details & In-Store Action (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="bg-[#FBFBFD] border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-apple-sm flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-apple-subtext uppercase tracking-widest mb-3">
                  <Eye className="w-4 h-4 text-black" />
                  <span>Curated Runway Specifications</span>
                </div>
                <h4 className="text-2xl font-bold tracking-tight text-black mb-2">
                  {currentItem.material}
                </h4>
                <p className="text-xs text-apple-subtext mb-6">
                  {currentItem.aesthetic}
                </p>

                {/* Feature Checklist */}
                <div className="space-y-3 mb-8">
                  {currentItem.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-apple-text">
                      <div className="w-5 h-5 rounded-full bg-neutral-100 border border-neutral-300 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-black" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Private Fitting CTA */}
              <div className="pt-6 border-t border-neutral-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-apple-subtext">Location</span>
                    <p className="text-xs font-semibold text-black">Ground Floor, KPHB Road #1</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-apple-subtext">Trial Status</span>
                    <p className="text-xs font-semibold text-emerald-600">Available In-Store</p>
                  </div>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="w-full bg-black hover:bg-neutral-800 text-white font-medium py-3.5 px-6 rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 shadow-apple-md transition active:scale-[0.98]"
                >
                  <span>Book Private Runway Fitting</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Carousel Thumbnails Bar */}
            <div className="grid grid-cols-6 gap-2">
              {RUNWAY_COLLECTIONS.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`py-2 px-1 rounded-xl text-center border transition-all ${
                    activeIndex === idx
                      ? 'bg-black text-white border-black shadow-apple-sm'
                      : 'bg-white text-apple-subtext border-neutral-200 hover:border-neutral-300 hover:text-black'
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold block">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="text-[9px] truncate block opacity-80">{item.brand.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
