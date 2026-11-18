'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  MessageCircle, 
  Heart, 
  ShieldCheck, 
  Eye, 
  Cross, 
  Layers, 
  ChevronLeft, 
  ChevronRight, 
  MapPin,
  Sparkles
} from 'lucide-react';
import { RUNWAY_PRODUCTS, DEPTH_SLOTS, BUSINESS_INFO, ShowcaseProduct } from '@/data/eyerisData';
import { createWhatsAppBookingLink, EYERIS_LOCATION_URL } from '@/components/booking/WhatsAppSync';

interface CinematicRunwayHeroProps {
  onOpenBooking: () => void;
  onOpenProductDetail?: (product: ShowcaseProduct) => void;
}

export const CinematicRunwayHero: React.FC<CinematicRunwayHeroProps> = ({
  onOpenBooking,
  onOpenProductDetail,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [wishlistMap, setWishlistMap] = useState<Record<string, boolean>>({});
  const [lightSweepActive, setLightSweepActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalProducts = RUNWAY_PRODUCTS.length;
  const currentProduct = RUNWAY_PRODUCTS[currentIndex];

  // Sync wishlist from localStorage
  const syncWishlist = () => {
    try {
      const stored = localStorage.getItem('eyeris_wishlist');
      if (stored) {
        const list: ShowcaseProduct[] = JSON.parse(stored);
        const map: Record<string, boolean> = {};
        list.forEach((item) => (map[item.id] = true));
        setWishlistMap(map);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    syncWishlist();
    window.addEventListener('eyeris_wishlist_updated', syncWishlist);
    return () => window.removeEventListener('eyeris_wishlist_updated', syncWishlist);
  }, []);

  const toggleWishlist = (product: typeof currentProduct) => {
    try {
      const stored = localStorage.getItem('eyeris_wishlist');
      let list: ShowcaseProduct[] = stored ? JSON.parse(stored) : [];
      const exists = list.some((item) => item.id === product.id);

      if (exists) {
        list = list.filter((item) => item.id !== product.id);
      } else {
        const itemToAdd: ShowcaseProduct = {
          id: product.id,
          brand: product.brand as any,
          name: product.modelName,
          category: 'Frames',
          image: product.image,
          shape: product.shape,
          material: product.material,
          colour: product.colour,
          type: 'Optical Frame',
          verifiedDescription: product.description,
        };
        list.push(itemToAdd);
      }

      localStorage.setItem('eyeris_wishlist', JSON.stringify(list));
      syncWishlist();
      window.dispatchEvent(new Event('eyeris_wishlist_updated'));
    } catch (e) {
      console.error(e);
    }
  };

  // Step transitions
  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setLightSweepActive(true);
    setCurrentIndex((prev) => (prev + 1) % totalProducts);
    setTimeout(() => {
      setIsAnimating(false);
      setLightSweepActive(false);
    }, 700);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setLightSweepActive(true);
    setCurrentIndex((prev) => (prev - 1 + totalProducts) % totalProducts);
    setTimeout(() => {
      setIsAnimating(false);
      setLightSweepActive(false);
    }, 700);
  };

  const selectSlot = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setLightSweepActive(true);
    setCurrentIndex(index);
    setTimeout(() => {
      setIsAnimating(false);
      setLightSweepActive(false);
    }, 700);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Compute depth items for perspective corridor
  const getSlotProduct = (slotIndex: number) => {
    const productIdx = (currentIndex + slotIndex) % totalProducts;
    return {
      product: RUNWAY_PRODUCTS[productIdx],
      slotConfig: DEPTH_SLOTS[slotIndex],
    };
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen bg-[#050505] text-white pt-24 pb-8 overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Background Subtle Atmospheric Curved Wave Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.06)_0%,_rgba(0,0,0,0)_70%)] blur-[90px]" />
        {/* Subtle curved arc lighting line */}
        <div className="absolute top-[28%] left-1/2 -translate-x-1/2 w-[980px] h-[340px] border-t border-white/[0.08] rounded-[50%] blur-[1px]" />
      </div>

      {/* Main Runway Stage Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 w-full relative z-10 flex-1 flex flex-col justify-center">
        
        {/* Top Grid: Headline (Left) & Perspective Corridor (Center) & Cards Rail (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[580px] sm:min-h-[640px]">
          
          {/* Left Column: Brand Headline & Description (Reference 1 & 2) */}
          <div className="lg:col-span-4 z-20 space-y-5 text-left pt-6 sm:pt-0">
            <div className="inline-block text-[11px] font-mono tracking-[0.3em] uppercase text-[#A1A1A6]">
              SEE MORE. LIVE MORE.
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.04]">
              PREMIUM <br />
              EYEWEAR <br />
              <span className="font-light text-[#D8DEE8]">COLLECTIONS</span>
            </h1>

            <p className="text-sm sm:text-base text-[#A1A1A6] font-light max-w-sm leading-relaxed">
              Discover a world of style, precision and clarity at EYERIS. Branded frames paired with hospital-calibrated clinical lenses.
            </p>

            <div className="pt-2">
              <a
                href="#collections"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black text-white text-xs font-mono tracking-wider font-semibold transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Center Column: 6-Product Perspective Depth Corridor (Flagship) */}
          <div className="lg:col-span-5 relative h-[380px] sm:h-[480px] flex items-center justify-center perspective-[1200px]">
            
            {/* Mirrored floor gradient */}
            <div className="absolute bottom-6 inset-x-0 h-32 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent pointer-events-none z-10" />

            {/* Depth Slots Loop (Slots 5 down to 0) */}
            {[5, 4, 3, 2, 1, 0].map((slotNumber) => {
              const { product, slotConfig } = getSlotProduct(slotNumber);
              const isForeground = slotNumber === 0;

              return (
                <motion.div
                  key={`${product.id}-${slotNumber}`}
                  animate={{
                    scale: slotConfig.scale,
                    z: slotConfig.z,
                    opacity: slotConfig.opacity,
                    filter: `blur(${slotConfig.blur}) brightness(${slotConfig.brightness})`,
                  }}
                  transition={{
                    duration: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onClick={() => !isForeground && selectSlot((currentIndex + slotNumber) % totalProducts)}
                  style={{
                    position: 'absolute',
                    zIndex: 20 - slotNumber,
                    transformStyle: 'preserve-3d',
                    cursor: isForeground ? 'default' : 'pointer',
                  }}
                  className="flex flex-col items-center justify-center will-change-transform"
                >
                  {/* Eyewear Image Stage */}
                  <div className="relative w-[340px] sm:w-[480px] h-[220px] sm:h-[280px] flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={`${product.brand} ${product.modelName}`}
                      className="max-w-full max-h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
                      loading={isForeground ? 'eager' : 'lazy'}
                    />

                    {/* Specular Light Sweep Animation on Foreground Frame */}
                    {isForeground && lightSweepActive && (
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="w-[120%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-light-sweep" />
                      </div>
                    )}

                    {/* Contact Ground Shadow */}
                    <div
                      className="absolute -bottom-4 w-3/4 h-6 rounded-full bg-black/80 blur-md pointer-events-none"
                      style={{ opacity: slotConfig.opacity * 0.9 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Stacked Product Cards Rail (Reference 1 & 2) */}
          <div className="lg:col-span-3 z-20 flex flex-col gap-3.5 max-w-xs ml-auto w-full">
            {RUNWAY_PRODUCTS.slice(0, 3).map((item, idx) => {
              const isWishlisted = !!wishlistMap[item.id];

              return (
                <div
                  key={item.id}
                  onClick={() => selectSlot(idx)}
                  className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    currentIndex === idx
                      ? 'bg-white text-black border-white shadow-luxury-md'
                      : 'bg-[#101010]/90 text-white border-[#292929] hover:border-neutral-500'
                  }`}
                >
                  {/* Card Header: Brand Logo & Wishlist Heart */}
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[11px] font-mono font-bold tracking-wider uppercase ${currentIndex === idx ? 'text-black' : 'text-neutral-300'}`}>
                      {item.brandLogoText}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(item);
                      }}
                      className={`p-1 rounded-full transition ${
                        currentIndex === idx
                          ? 'text-black hover:bg-neutral-100'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                      aria-label="Save to Wishlist"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Frame Image Thumbnail */}
                  <div className="relative w-full h-24 rounded-xl overflow-hidden bg-black/40 mb-2 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.modelName}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Model & Spec Label */}
                  <div className="mb-2.5">
                    <h4 className="text-xs font-bold truncate leading-tight">
                      {item.modelName}
                    </h4>
                    <p className={`text-[10px] font-mono mt-0.5 truncate ${currentIndex === idx ? 'text-neutral-600' : 'text-[#707070]'}`}>
                      {item.shape} | {item.colour}
                    </p>
                  </div>

                  {/* Bottom Action Links */}
                  <div className={`pt-2 border-t flex items-center justify-between text-[10px] font-mono font-semibold ${currentIndex === idx ? 'border-neutral-200' : 'border-[#292929]'}`}>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenProductDetail) {
                          onOpenProductDetail({
                            id: item.id,
                            brand: item.brand as any,
                            name: item.modelName,
                            category: 'Frames',
                            image: item.image,
                            shape: item.shape,
                            material: item.material,
                            colour: item.colour,
                            type: 'Optical Frame',
                            verifiedDescription: item.description,
                          });
                        }
                      }}
                      className="hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      View Details →
                    </span>

                    <a
                      href={createWhatsAppBookingLink(
                        `Hi Eyeris! I'd like to check store availability and try on the *${item.brand} ${item.modelName}* (${item.colour}) at your KPHB store.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`p-1.5 rounded-full transition ${
                        currentIndex === idx ? 'bg-neutral-100 hover:bg-neutral-200 text-black' : 'hover:bg-white/10 text-neutral-400 hover:text-white'
                      }`}
                      aria-label="Enquire on WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Foreground Frame Specifications HUD Strip (Reference 2) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProduct.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="w-full mt-4 sm:mt-6 pt-4 border-t border-[#292929]/80 flex flex-wrap items-center justify-between gap-4 z-20"
          >
            {/* Left: Brand & Model Name */}
            <div className="flex items-center gap-3">
              <span className="text-sm sm:text-base font-bold font-mono tracking-wider text-white">
                {currentProduct.brand}
              </span>
              <span className="h-3.5 w-[1px] bg-white/20" />
              <span className="text-xs sm:text-sm font-mono tracking-widest text-[#A1A1A6] uppercase">
                {currentProduct.modelName}
              </span>
            </div>

            {/* Center: Verified Spec Badges */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono text-[#A1A1A6]">
              <div className="flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-white" />
                <span>Shape: <strong className="text-white">{currentProduct.shape}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-white" />
                <span>Material: <strong className="text-white">{currentProduct.material}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white" />
                <span>Colour: <strong className="text-white">{currentProduct.colour}</strong></span>
              </div>
            </div>

            {/* Right: Action Buttons (Reference 2) */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (onOpenProductDetail) {
                    onOpenProductDetail({
                      id: currentProduct.id,
                      brand: currentProduct.brand as any,
                      name: currentProduct.modelName,
                      category: 'Frames',
                      image: currentProduct.image,
                      shape: currentProduct.shape,
                      material: currentProduct.material,
                      colour: currentProduct.colour,
                      type: 'Optical Frame',
                      verifiedDescription: currentProduct.description,
                    });
                  }
                }}
                className="px-5 py-2 rounded-full bg-white text-black hover:bg-neutral-200 font-mono text-xs font-semibold tracking-wider transition shadow-sm"
              >
                VIEW DETAILS →
              </button>

              <a
                href={createWhatsAppBookingLink(
                  `Hello Eyeris Opticals! I am interested in trying on the *${currentProduct.brand} ${currentProduct.modelName}* at your KPHB store.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 text-white font-mono text-xs tracking-wider transition"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>ENQUIRE NOW</span>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Collection Selector & Bottom Trust Strip (Reference 1 & 2) */}
        <div className="mt-8 pt-6 border-t border-[#1C1C1C] flex flex-col md:flex-row items-center justify-between gap-6 z-20">
          
          {/* Left: Collection Numbers (01, 02, 03, 04, 05, 06) */}
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#707070] uppercase">
              COLLECTION
            </span>

            <div className="flex items-center gap-3 font-mono text-xs">
              {RUNWAY_PRODUCTS.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => selectSlot(idx)}
                  className={`transition-all py-1 px-1 relative ${
                    currentIndex === idx
                      ? 'text-white font-bold text-sm'
                      : 'text-[#707070] hover:text-white'
                  }`}
                >
                  <span>{String(idx + 1).padStart(2, '0')}</span>
                  {currentIndex === idx && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white rounded-full" />
                  )}
                </button>
              ))}
            </div>

            <span className="hidden sm:inline-block h-3.5 w-[1px] bg-[#292929]" />

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono">
              <span className="text-white font-semibold">{currentProduct.collectionName}</span>
              <span className="text-[#707070]">•</span>
              <a href="#collections" className="text-[#A1A1A6] hover:text-white transition">
                Explore Collection →
              </a>
            </div>
          </div>

          {/* Right Carousel Next/Prev Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrev}
              className="w-9 h-9 rounded-full border border-[#292929] hover:border-white text-white flex items-center justify-center transition active:scale-95"
              aria-label="Previous frame"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goToNext}
              className="w-9 h-9 rounded-full border border-[#292929] hover:border-white text-white flex items-center justify-center transition active:scale-95"
              aria-label="Next frame"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Trust Strip (Reference 1 & 2) */}
        <div className="mt-6 pt-5 border-t border-[#1C1C1C] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#A1A1A6] z-20">
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>Trusted for 2+ Decades</span>
            </div>

            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-white" />
              <span>40 Years of Optical Expertise</span>
            </div>

            <div className="flex items-center gap-2">
              <Cross className="w-4 h-4 text-white rotate-45" />
              <span>In Association with Global Eye Hospital</span>
            </div>
          </div>

          <div>
            <a
              href={EYERIS_LOCATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white hover:underline"
            >
              <MapPin className="w-3.5 h-3.5 text-white" />
              <span>Visit EYERIS Store → KPHB Road No. 1, Kukatpally</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
