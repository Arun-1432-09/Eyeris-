'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  MessageCircle, 
  Heart, 
  Eye, 
  Layers, 
  MapPin,
  Check,
  Plus
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

  const selectSlot = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setLightSweepActive(true);
    setCurrentIndex(index);
    setTimeout(() => {
      setIsAnimating(false);
      setLightSweepActive(false);
    }, 600);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        selectSlot((currentIndex + 1) % totalProducts);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        selectSlot((currentIndex - 1 + totalProducts) % totalProducts);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isAnimating]);

  // Diagonal perspective offsets matching Reference 1 & 2
  const getCorridorOffset = (slotIndex: number) => {
    const xOffsets = [0, 85, 160, 230, 295, 355];
    const yOffsets = [0, -12, -22, -30, -38, -44];
    return {
      x: xOffsets[slotIndex] || 0,
      y: yOffsets[slotIndex] || 0,
    };
  };

  // Resolve product for slot relative to currentIndex
  const getSlotProduct = (slotIndex: number) => {
    const productIdx = (currentIndex + slotIndex) % totalProducts;
    return {
      product: RUNWAY_PRODUCTS[productIdx],
      slotConfig: DEPTH_SLOTS[slotIndex],
      offsets: getCorridorOffset(slotIndex),
    };
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen bg-[#050505] text-white pt-24 pb-8 overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Background Atmospheric Curved Wave Light (Reference 1 & 2) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[16%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.07)_0%,_rgba(0,0,0,0)_70%)] blur-[100px]" />
        {/* Subtle curved arc lighting sweep */}
        <div className="absolute top-[26%] left-1/2 -translate-x-1/2 w-[1050px] h-[360px] border-t border-white/[0.09] rounded-[50%] blur-[1px]" />
      </div>

      {/* Main Runway Stage Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 w-full relative z-10 flex-1 flex flex-col justify-between">
        
        {/* Top Grid: Headline (Left) | Perspective Corridor (Center) | Stacked Cards Rail (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center min-h-[500px] sm:min-h-[560px] mt-2 sm:mt-4">
          
          {/* Left Column: Brand Headline & Description (Image 3) */}
          <div className="lg:col-span-4 z-20 space-y-5 text-left pt-2 sm:pt-0">
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

          {/* Center Column: 6-Product Perspective Depth Corridor (Reference 1 & 2) */}
          <div className="lg:col-span-5 relative h-[360px] sm:h-[440px] flex items-center justify-center perspective-[1200px]">
            
            {/* Mirrored Floor Reflection Base */}
            <div className="absolute bottom-2 inset-x-0 h-28 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent pointer-events-none z-10" />

            {/* Depth Slots Loop (Render from slot 5 down to 0) */}
            {[5, 4, 3, 2, 1, 0].map((slotNumber) => {
              const { product, slotConfig, offsets } = getSlotProduct(slotNumber);
              const isForeground = slotNumber === 0;

              return (
                <motion.div
                  key={`${product.id}-${slotNumber}`}
                  animate={{
                    x: offsets.x,
                    y: offsets.y,
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
                  <div className="relative w-[320px] sm:w-[440px] h-[200px] sm:h-[260px] flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={`${product.brand} ${product.modelName}`}
                      className="max-w-full max-h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]"
                      loading={isForeground ? 'eager' : 'lazy'}
                    />

                    {/* Specular Light Sweep Animation on Foreground Frame */}
                    {isForeground && lightSweepActive && (
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="w-[140%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent animate-light-sweep" />
                      </div>
                    )}

                    {/* Contact Ground Shadow */}
                    <div
                      className="absolute -bottom-4 w-3/4 h-6 rounded-full bg-black/90 blur-md pointer-events-none"
                      style={{ opacity: slotConfig.opacity * 0.95 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Stacked White Luxury Cards Rail (Reference 1 & 2) */}
          <div className="lg:col-span-3 z-20 flex flex-col gap-3 max-w-xs ml-auto w-full">
            {RUNWAY_PRODUCTS.slice(0, 3).map((item, idx) => {
              const isWishlisted = !!wishlistMap[item.id];
              const isCurrent = currentIndex === idx;

              return (
                <div
                  key={item.id}
                  onClick={() => selectSlot(idx)}
                  className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? 'bg-white text-black border-white shadow-luxury-md'
                      : 'bg-white/95 text-black border-transparent hover:bg-white hover:scale-[1.02]'
                  }`}
                >
                  {/* Card Header: Brand Wordmark & Wishlist Heart */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono font-bold tracking-wider uppercase text-black">
                      {item.brandLogoText}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(item);
                      }}
                      className="p-1 rounded-full text-neutral-400 hover:text-red-500 transition-colors"
                      aria-label="Save to Wishlist"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Frame Image Thumbnail */}
                  <div className="relative w-full h-20 rounded-xl overflow-hidden bg-neutral-100 mb-2 flex items-center justify-center p-2">
                    <img
                      src={item.image}
                      alt={item.modelName}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Model & Spec Label */}
                  <div className="mb-2">
                    <h4 className="text-xs font-bold text-black truncate leading-tight">
                      {item.modelName}
                    </h4>
                    <p className="text-[10px] font-mono text-neutral-500 mt-0.5 truncate">
                      {item.shape} | {item.colour}
                    </p>
                  </div>

                  {/* Bottom Action Links */}
                  <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-[10px] font-mono font-semibold">
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
                      className="text-neutral-700 hover:text-black hover:underline flex items-center gap-1 cursor-pointer"
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
                      className="p-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-black transition-colors"
                      aria-label="Enquire on WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Dedicated Non-Overlapping Specs HUD Strip (Reference 2) */}
        <div className="w-full mt-6 pt-5 border-t border-white/10 z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProduct.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap items-center justify-between gap-4"
            >
              {/* Left: Brand & Model Typography */}
              <div className="flex items-center gap-3">
                <span className="text-sm sm:text-base font-bold font-mono tracking-wider text-white">
                  {currentProduct.brand}
                </span>
                <span className="h-3.5 w-[1px] bg-white/20" />
                <span className="text-xs sm:text-sm font-mono tracking-widest text-[#A1A1A6] uppercase">
                  {currentProduct.modelName}
                </span>
              </div>

              {/* Center: Specs Badges (Reference 2) */}
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

              {/* Right: Actions */}
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
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/25 hover:bg-white/10 text-white font-mono text-xs tracking-wider transition"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>ENQUIRE NOW</span>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Collection Selector & Bottom Trust Strip (Reference 1 & 2) */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 z-20">
          
          {/* Left: Collection Numbers (01, 02, 03, 04, 05, 06) */}
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#707070] uppercase font-bold">
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
                    <motion.div
                      layoutId="activeCollectionUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-white/15 text-xs font-mono">
              <span className="text-white font-semibold">{currentProduct.collectionName}</span>
              <span className="text-[#707070]">•</span>
              <a href="#collections" className="text-[#A1A1A6] hover:text-white hover:underline">
                Explore Collection →
              </a>
            </div>
          </div>

          {/* Right: Quick Directions / Visit Store */}
          <div className="flex items-center gap-4 text-xs font-mono text-[#A1A1A6]">
            <a
              href={EYERIS_LOCATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-white" />
              <span>Visit EYERIS Store → KPHB Road No. 1</span>
            </a>
          </div>

        </div>

      </div>

      {/* Bottom Trust Strip */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 w-full mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-[#707070] z-20">
        <div className="flex flex-wrap items-center gap-6">
          <span className="flex items-center gap-2 text-[#A1A1A6]">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            Trusted for 2+ Decades
          </span>
          <span className="flex items-center gap-2 text-[#A1A1A6]">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            40 Years of Optical Expertise
          </span>
          <span className="flex items-center gap-2 text-[#A1A1A6]">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            In Association with Global Eye Hospital
          </span>
        </div>

        <div className="text-right">
          <span>KPHB Road No. 1, Kukatpally, Hyderabad</span>
        </div>
      </div>

    </section>
  );
};
