'use client';

import React, { useState } from 'react';
import { BRANDS } from '@/data/brandsData';
import { Sparkles, MessageCircle, Check, ArrowUpRight, Shield } from 'lucide-react';
import { generateQuickChatUrl } from '@/components/booking/WhatsAppSync';

interface BrandShowcaseProps {
  onOpenBooking: () => void;
}

export const BrandShowcase: React.FC<BrandShowcaseProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Collections' },
    { id: 'classic', label: 'Classic Icons (Ray-Ban)' },
    { id: 'sport', label: 'Sports & Active (Oakley)' },
    { id: 'titanium', label: 'Titanium (Stepper)' },
    { id: 'luxury', label: 'Haute Couture (Prada)' },
  ];

  const filteredBrands = BRANDS.filter((brand) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'classic') return brand.id === 'ray-ban' || brand.id === 'tommy-hilfiger';
    if (selectedCategory === 'sport') return brand.id === 'oakley';
    if (selectedCategory === 'titanium') return brand.id === 'stepper';
    if (selectedCategory === 'luxury') return brand.id === 'prada';
    return true;
  });

  return (
    <section id="brands" className="py-20 bg-background border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-raised border border-white/10 text-brand-300 text-xs font-mono uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Direct Authorized Stockists</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
              Curated International <span className="bg-gradient-to-r from-brand-300 to-optic-blue bg-clip-text text-transparent">Eyewear Brands</span>
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-xl">
              Authentic international collections under one roof in Kukatpally. Explore frames for every face shape, personality, and budget.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface-raised hover:bg-surface border border-white/10 hover:border-brand-400/40 text-neutral-200 text-sm font-semibold transition self-start md:self-auto"
          >
            <span>Book Styling Session</span>
            <ArrowUpRight className="w-4 h-4 text-brand-400" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-brand-500/20 text-brand-300 border border-brand-500/40 shadow-[0_0_15px_rgba(0,196,159,0.2)]'
                  : 'bg-surface text-neutral-400 border border-white/5 hover:border-white/15 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrands.map((brand) => (
            <div
              key={brand.id}
              className="group bg-surface/70 hover:bg-surface border border-white/10 hover:border-brand-500/40 rounded-3xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_10px_35px_rgba(0,0,0,0.4)]"
            >
              <div>
                {/* Brand Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400">
                      {brand.origin} • {brand.category}
                    </span>
                    <h3 className="text-2xl font-black text-white font-display mt-0.5 group-hover:text-brand-300 transition-colors">
                      {brand.name}
                    </h3>
                  </div>
                  {brand.badge && (
                    <span className="text-[10px] font-semibold tracking-wide bg-brand-500/10 text-brand-300 border border-brand-500/30 px-2.5 py-1 rounded-full">
                      {brand.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-gold-400 font-medium mb-3">{brand.tagline}</p>
                <p className="text-xs text-neutral-300 leading-relaxed mb-6">{brand.description}</p>

                {/* Features Bullet List */}
                <div className="space-y-2 mb-6 pt-4 border-t border-white/5">
                  {brand.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Price & WhatsApp Quick Inquiry */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 block font-mono">Typical Range</span>
                  <span className="text-xs font-bold text-white font-mono">{brand.priceRange}</span>
                </div>

                <a
                  href={generateQuickChatUrl(`${brand.name} frames and sunglasses availability`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-300 hover:text-white bg-brand-950/40 hover:bg-brand-900/60 border border-brand-500/30 px-3 py-1.5 rounded-xl transition"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-brand-400" />
                  <span>Check Stock</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Exclusive Kids & Sunglass Banner */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-surface to-brand-950/20 border border-brand-500/20 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-brand-300 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/30">
                Pediatric Vision Care
              </span>
              <h4 className="text-xl font-bold text-white font-display mt-2 mb-2">
                Exclusive Kids’ Frames &amp; Myopia Management
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Specialized flexible, shatter-proof frames sized for children of all ages, paired with clinical myopia-control lenses to slow vision decline.
              </p>
            </div>
            <button
              onClick={onOpenBooking}
              className="mt-4 self-start text-xs font-semibold text-brand-300 hover:text-white flex items-center gap-1"
            >
              <span>Book Kids Eye Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-surface to-gold-950/20 border border-gold-500/20 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-gold-300 bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/30">
                Outdoor &amp; Sports
              </span>
              <h4 className="text-xl font-bold text-white font-display mt-2 mb-2">
                Polarised &amp; 100% UV Protection Sunglasses
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Ray-Ban, Oakley, and Vogue sunglasses with specialized tints, prescription sun-lenses, and polarized glare filters for Hyderabad’s bright sun.
              </p>
            </div>
            <button
              onClick={onOpenBooking}
              className="mt-4 self-start text-xs font-semibold text-gold-300 hover:text-white flex items-center gap-1"
            >
              <span>Explore Sunglasses Collection</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
