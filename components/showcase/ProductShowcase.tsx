'use client';

import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { SHOWCASE_CATALOG, ShowcaseProduct } from '@/data/eyerisData';
import { ProductDetailModal } from './ProductDetailModal';
import { createWhatsAppBookingLink } from '@/components/booking/WhatsAppSync';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface ProductShowcaseProps {
  onOpenBooking: () => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [activeProduct, setActiveProduct] = useState<ShowcaseProduct | null>(null);
  const [wishlistMap, setWishlistMap] = useState<Record<string, boolean>>({});

  const categories = ['All', 'Frames', 'Sunglasses', 'Kids'];
  const brands = ['All', 'Ray-Ban', 'Oakley', 'Prada', 'Stepper Titanium', 'Tommy Hilfiger', 'Calvin Klein', 'Vogue'];

  const syncWishlist = () => {
    try {
      const stored = localStorage.getItem('eyeris_wishlist');
      if (stored) {
        const list: ShowcaseProduct[] = JSON.parse(stored);
        const map: Record<string, boolean> = {};
        list.forEach((item) => (map[item.id] = true));
        setWishlistMap(map);
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    syncWishlist();
    window.addEventListener('eyeris_wishlist_updated', syncWishlist);
    return () => window.removeEventListener('eyeris_wishlist_updated', syncWishlist);
  }, []);

  const toggleWishlist = (product: ShowcaseProduct) => {
    try {
      const stored = localStorage.getItem('eyeris_wishlist');
      let list: ShowcaseProduct[] = stored ? JSON.parse(stored) : [];
      const exists = list.some((item) => item.id === product.id);

      if (exists) {
        list = list.filter((item) => item.id !== product.id);
      } else {
        list.push(product);
      }

      localStorage.setItem('eyeris_wishlist', JSON.stringify(list));
      syncWishlist();
      window.dispatchEvent(new Event('eyeris_wishlist_updated'));
    } catch (e) {
      console.error(e);
    }
  };

  const filteredProducts = SHOWCASE_CATALOG.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesBrand = selectedBrand === 'All' || item.brand === selectedBrand;
    return matchesCat && matchesBrand;
  });

  return (
    <section id="showcase" className="py-24 sm:py-32 bg-[#050505] text-white border-b border-[#292929]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <ScrollReveal variant="fadeUp" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#707070] mb-3">
              CURATED EYEWEAR VAULT
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Branded Showcase.{' '}
              <span className="font-light text-[#A1A1A6]">Verified Specs.</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1A6]">
            <span className="w-2 h-2 rounded-full bg-white" />
            <span>Exclusively Authorised International Brands</span>
          </div>
        </ScrollReveal>

        {/* Filters: Category & Brand Switcher */}
        <ScrollReveal variant="fadeUp" delay={0.1}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#292929] mb-8">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition ${
                    selectedCategory === cat
                      ? 'bg-white text-black font-semibold'
                      : 'border border-[#292929] text-[#A1A1A6] hover:text-white hover:border-neutral-500'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Brand Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {brands.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBrand(b)}
                  className={`px-3 py-1 rounded-full text-[11px] font-mono whitespace-nowrap transition ${
                    selectedBrand === b
                      ? 'bg-[#1E1E1E] text-white border border-white/40'
                      : 'text-[#707070] hover:text-[#A1A1A6]'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, idx) => {
            const isWishlisted = !!wishlistMap[product.id];

            return (
              <ScrollReveal
                key={product.id}
                variant="fadeUp"
                delay={idx * 0.05}
              >
                <div className="group rounded-3xl bg-[#101010] border border-[#292929] hover:border-white/30 transition-all duration-300 p-5 flex flex-col justify-between h-full shadow-luxury-sm hover:shadow-luxury-md">
                  <div>
                    {/* Image Container with Wishlist Button */}
                    <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-black mb-4 flex items-center justify-center p-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product);
                        }}
                        className="absolute top-3 right-3 p-2 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition"
                        aria-label="Wishlist"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>

                      {product.isKids && (
                        <span className="absolute top-3 left-3 text-[9px] font-mono uppercase bg-white/15 backdrop-blur-md text-white px-2 py-0.5 rounded-full border border-white/20">
                          Kids Range
                        </span>
                      )}
                    </div>

                    {/* Brand & Type */}
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#A1A1A6] mb-1">
                      <span className="uppercase tracking-wider font-semibold text-white">
                        {product.brand}
                      </span>
                      <span>{product.type}</span>
                    </div>

                    <h3 className="text-sm font-bold text-white mb-2 leading-snug truncate group-hover:text-white">
                      {product.name}
                    </h3>

                    {/* Shape, Material & Colour */}
                    <div className="text-[11px] font-mono text-[#707070] space-y-1 mb-4">
                      <p>Shape: <span className="text-[#A1A1A6]">{product.shape}</span></p>
                      <p>Material: <span className="text-[#A1A1A6]">{product.material}</span></p>
                      <p>Colour: <span className="text-[#A1A1A6]">{product.colour}</span></p>
                    </div>
                  </div>

                  {/* Bottom Actions: View Details & WhatsApp Enquiry */}
                  <div className="pt-3 border-t border-[#292929] flex items-center gap-2">
                    <button
                      onClick={() => setActiveProduct(product)}
                      className="flex-1 py-2 px-3 rounded-full border border-[#292929] hover:bg-white hover:text-black text-white text-xs font-mono font-medium tracking-wider transition text-center"
                    >
                      View Details →
                    </button>

                    <a
                      href={createWhatsAppBookingLink(
                        `Hi Eyeris Opticals! I am inquiring about the *${product.brand} ${product.name}* (${product.colour}) at your KPHB store.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full border border-[#292929] hover:bg-white/10 text-[#A1A1A6] hover:text-white transition"
                      aria-label="Enquire on WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>

      {/* Product Detail Modal Overlay */}
      <ProductDetailModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onOpenBooking={onOpenBooking}
      />
    </section>
  );
};
