'use client';

import React, { useState } from 'react';
import { Eye, Glasses, Sun, Sparkles, Baby, Shield, Check, ArrowRight, Layers } from 'lucide-react';
import { createWhatsAppBookingLink } from '@/components/booking/WhatsAppSync';

interface CollectionItem {
  id: string;
  name: string;
  category: string;
  priceGuide: string;
  materials: string[];
  description: string;
  highlights: string[];
  badge: string;
}

const COLLECTIONS: CollectionItem[] = [
  {
    id: 'optical-frames',
    name: 'Precision Optical Frames',
    category: 'Everyday Optical & Office',
    priceGuide: '₹4,500 – ₹18,000',
    materials: ['Surgical Titanium', 'Mazzucchelli Italian Acetate', 'Stainless Steel'],
    description:
      'Engineered for 12+ hour daily comfort without pressure on the nasal bridge or ears. Selected for professionals who demand effortless poise and structural integrity.',
    highlights: ['Featherweight under 12g', 'Adjustable silicone & titanium nose pads', 'Prescription lens ready'],
    badge: 'Core Specialist',
  },
  {
    id: 'sunglasses',
    name: 'Luxury & Polarised Sunglasses',
    category: 'UV400 & Outdoor Lifestyle',
    priceGuide: '₹5,500 – ₹24,000',
    materials: ['Mineral Glass', 'Polarised Polycarbonate', 'O-Matter™'],
    description:
      'Iconic sunglasses engineered for tropical glare protection in Hyderabad. Featuring Ray-Ban Aviators & Wayfarers, Oakley Prizm™ sport optics, and Prada luxury silhouettes.',
    highlights: ['100% UVA / UVB protection', 'Polarised anti-reflection technology', 'Available in prescription sunglasses'],
    badge: 'Iconic Styles',
  },
  {
    id: 'designer-frames',
    name: 'Haute Couture Designer Collection',
    category: 'Runway & Luxury Editorial',
    priceGuide: '₹14,000 – ₹38,000',
    materials: ['Japanese Beta-Titanium', '24k Gold Accents', 'Hand-Polished Bio-Acetate'],
    description:
      'Distinguished statement eyewear from Milan and Paris. Unmistakable geometric architecture, sculpted bevels, and discreet signature branding for discerning leaders.',
    highlights: ['Prada Milano', 'Calvin Klein Luxury', 'Tommy Hilfiger Sartorial'],
    badge: 'Artisanal Luxury',
  },
  {
    id: 'kids-eyewear',
    name: 'Pediatric & Junior Eyewear',
    category: 'Kids & Teens (Ages 4–16)',
    priceGuide: '₹3,500 – ₹12,000',
    materials: ['TR90 Flexible Polymer', 'Trivex Shatterproof', 'Soft Rubber Temples'],
    description:
      'Specially designed anatomical bridge fits for developing child face contours. Rugged 180° flexible hinges that endure active playtime, sports, and heavy tablet usage.',
    highlights: ['Shatterproof safety certified', 'Specialised Myopia Management compatibility', 'Colorful hypoallergenic frames'],
    badge: 'Pediatric Care',
  },
  {
    id: 'zero-power-glasses',
    name: 'Zero-Power Computer Specs',
    category: 'IT Screen & Gamer Protection',
    priceGuide: '₹3,800 – ₹8,500',
    materials: ['High-Grade Cellulose Acetate', 'Ultra-light TR90'],
    description:
      'For professionals with 20/20 vision who suffer from end-of-day eye fatigue, dry eyes, and screen headaches. Infused with molecular blue-violet filtering and anti-glare coatings.',
    highlights: ['Zero magnification or distortion', 'Filters 415-455nm digital blue spike', 'Claimable under corporate optical perks'],
    badge: 'IT Favorite',
  },
  {
    id: 'contact-lenses',
    name: 'Clinical Contact Lenses',
    category: 'Daily & Monthly Disposables',
    priceGuide: '₹1,200 – ₹5,500',
    materials: ['Silicone Hydrogel (High Dk/t)', 'Moisture-Lock Technology'],
    description:
      'Breathable contact lens solutions for sports, weddings, and daily clear sight. Sourced from Alcon, Bausch & Lomb, and CooperVision with precision base curve fitting.',
    highlights: ['High oxygen transmissibility', 'Toric / Astigmatism & Multifocal lenses available', 'Doctor supervised trial fitting'],
    badge: 'Clinical Hygiene',
  },
];

interface ExploreCollectionsProps {
  onOpenBooking: () => void;
}

export const ExploreCollections: React.FC<ExploreCollectionsProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<string>('optical-frames');
  const activeItem = COLLECTIONS.find((c) => c.id === activeTab) || COLLECTIONS[0];

  return (
    <section id="collections" className="py-24 bg-background relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-champagne-500/10 border border-champagne-500/30 text-champagne-400 text-xs font-mono tracking-wider mb-4">
              <Glasses className="w-3.5 h-3.5" />
              <span>SECTION 03 // CURATED COLLECTIONS</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1]">
              Explore Eyewear{' '}
              <span className="text-gold-gradient italic font-light">Collections.</span>
            </h2>
          </div>

          <p className="text-neutral-400 text-sm sm:text-base max-w-md font-sans leading-relaxed">
            From featherweight pure titanium opticals to haute couture sunglasses and pediatric safety frames—discover our full range under one roof.
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-4 mb-10 border-b border-white/10">
          {COLLECTIONS.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveTab(c.id)}
              className={`shrink-0 px-5 py-3 rounded-xl text-xs sm:text-sm font-mono tracking-wide transition-all duration-200 ${
                activeTab === c.id
                  ? 'bg-ivory-100 text-black font-semibold shadow-[0_4px_20px_rgba(255,255,255,0.2)]'
                  : 'bg-graphite/60 hover:bg-graphite text-neutral-300 hover:text-white border border-white/5'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Active Collection Spotlight Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-graphite/50 rounded-3xl border border-white/10 p-8 sm:p-12 relative overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Left: Detailed Information */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded bg-brand-500/10 border border-brand-400/30 text-brand-300 text-xs font-mono">
                {activeItem.badge}
              </span>
              <span className="text-xs font-mono text-champagne-400">{activeItem.category}</span>
            </div>

            <h3 className="text-3xl sm:text-5xl font-serif text-white font-bold leading-tight">
              {activeItem.name}
            </h3>

            <p className="text-ivory-200/90 text-sm sm:text-base font-light leading-relaxed">
              {activeItem.description}
            </p>

            {/* Key Highlights */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-mono text-neutral-400 tracking-wider">ENGINEERING HIGHLIGHTS:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {activeItem.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-neutral-200">
                    <Check className="w-4 h-4 text-brand-400 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Materials & Investment Guide */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono text-neutral-400 block">MATERIALS</span>
                <span className="text-xs text-champagne-300 font-medium">
                  {activeItem.materials.join(' • ')}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono text-neutral-400 block">TYPICAL BUDGET GUIDE</span>
                <span className="text-sm font-mono text-white font-bold">
                  {activeItem.priceGuide}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 rounded-xl bg-champagne-500 hover:bg-champagne-400 text-slate-950 font-semibold text-xs font-mono tracking-wider transition-all transform hover:-translate-y-0.5 shadow-lg"
              >
                RESERVE TRY-ON SLOT
              </button>

              <a
                href={createWhatsAppBookingLink(
                  `Hi EYERIS Opticals! I am interested in viewing your collection: ${activeItem.name}. Could you share available styles and slot timings?`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-surface hover:bg-surface-hover border border-white/15 text-neutral-200 hover:text-white font-mono text-xs tracking-wider transition-all"
              >
                ENQUIRE VIA WHATSAPP
              </a>
            </div>
          </div>

          {/* Right: Curated Aesthetic Frame Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-2xl bg-surface/90 border border-white/10 text-center relative">
            <div className="w-full h-48 sm:h-56 flex items-center justify-center relative">
              {/* Decorative radial lens glare */}
              <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-brand-400/20 via-transparent to-champagne-400/20 blur-xl" />
              
              {/* Graphic Icon */}
              <div className="relative z-10 flex flex-col items-center">
                <Glasses className="w-24 h-24 text-champagne-400 drop-shadow-[0_0_20px_rgba(185,154,104,0.4)]" />
                <span className="mt-4 text-[11px] font-mono tracking-widest text-brand-300">
                  EYERIS SIGNATURE DISPLAY
                </span>
              </div>
            </div>

            <div className="w-full pt-4 border-t border-white/10 text-center">
              <p className="text-xs text-neutral-400">
                Over 500+ genuine frames on display at our KPHB showroom.
              </p>
              <p className="text-[11px] font-mono text-champagne-400 mt-1">
                Zero fake replicas • 100% Brand Authenticity Certificate
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
