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
  Check
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

  // Diagonal perspective offsets for white studio runway
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
      className="relative min-h-screen bg-[#FFFFFF] text-[#111111] pt-28 pb-8 overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Background Soft Studio Pedestal Illumination */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_75%_55%_at_50%_36%,rgba(0,0,0,0.02)_0%,rgba(255,255,255,1)_100%)]" />

      {/* Main Runway Stage Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 w-full relative z-10 flex-1 flex flex-col justify-between">
        
        {/* Top Grid: Headline (Left) | Perspective Corridor (Center) | Stacked Cards Rail (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center min-h-[500px] sm:min-h-[560px] mt-2 sm:mt-4">
          
          {/* Left Column: Brand Headline & Description (Image 3) */}
          <div className="lg:col-span-4 z-20 space-y-5 text-left pt-2 sm:pt-0">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-mono tracking-[0.35em] text-[#888888] uppercase">
                — OPTICALS —
              </span>
              <div className="inline-block text-[11px] font-mono tracking-[0.25em] uppercase text-[#111111] font-bold">
                SEE MORE. LIVE MORE.
              </div>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#111111] leading-[1.04]">
              PREMIUM <br />
              EYEWEAR <br />
              <span className="font-light text-[#777777]">COLLECTIONS</span>
            </h1>

            <p className="text-sm sm:text-base text-[#555555] font-normal max-w-sm leading-relaxed">
              Discover a world of style, precision and clarity at EYERIS. Branded frames paired with hospital-calibrated clinical lenses.
            </p>

            <div className="pt-2">
              <a
                href="#collections"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#111111] bg-white hover:bg-[#111111] hover:text-white text-[#111111] text-xs font-mono tracking-wider font-semibold transition-all duration-300 shadow-sm transform hover:-translate-y-0.5"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Center Column: 6-Product Perspective Depth Corridor (Diagonal & Non-Overlapping) */}
          <div className="lg:col-span-5 relative h-[360px] sm:h-[440px] flex items-center justify-center perspective-[1200px]">
            
            {/* Soft Studio Floor Reflection Base */}
            <div className="absolute bottom-2 inset-x-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />

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
                    filter: `blur(${slotConfig.blur})`,
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
                      className="max-w-full max-h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
                      loading={isForeground ? 'eager' : 'lazy'}
                    />

                    {/* Specular Light Sweep Animation on Foreground Frame */}
                    {isForeground && lightSweepActive && (
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="w-[140%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-light-sweep" />
                      </div>
                    )}

                    {/* Contact Ground Shadow */}
                    <div
                      className="absolute -bottom-4 w-3/4 h-6 contact-shadow pointer-events-none"
                      style={{ opacity: slotConfig.opacity * 0.75 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Stacked White Luxury Cards Rail (Minimal Apple Style) */}
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
                      ? 'bg-white text-[#111111] border-[#111111] shadow-md'
                      : 'bg-[#F7F7F7] text-[#111111] border-[#E5E5E5] hover:bg-white hover:border-[#CCCCCC]'
                  }`}
                >
                  {/* Card Header: Brand Wordmark & Wishlist Heart */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#111111]">
                      {item.brandLogoText}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(item);
                      }}
                      className="p-1 rounded-full text-[#888888] hover:text-red-500 transition-colors"
                      aria-label="Save to Wishlist"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Frame Image Thumbnail */}
                  <div className="relative w-full h-20 rounded-xl overflow-hidden bg-white border border-[#E5E5E5] mb-2 flex items-center justify-center p-2">
                    <img
                      src={item.image}
                      alt={item.modelName}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Model & Spec Label */}
                  <div className="mb-2">
                    <h4 className="text-xs font-bold text-[#111111] truncate leading-tight">
                      {item.modelName}
                    </h4>
                    <p className="text-[10px] font-mono text-[#666666] mt-0.5 truncate">
                      {item.shape} • {item.colour}
                    </p>
                  </div>

                  {/* Bottom Action Links */}
                  <div className="pt-2 border-t border-[#E5E5E5] flex items-center justify-between text-[10px] font-mono font-semibold">
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
                      className="text-[#666666] hover:text-[#111111] hover:underline flex items-center gap-1 cursor-pointer"
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
                      className="p-1.5 rounded-full bg-[#EAEAEA] hover:bg-[#111111] hover:text-white text-[#111111] transition-colors"
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

        {/* Dedicated Non-Overlapping Specs HUD Strip (Clean & Spacious) */}
        <div className="w-full mt-6 pt-5 border-t border-[#E5E5E5] z-20">
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
                <span className="text-sm sm:text-base font-bold font-mono tracking-wider text-[#111111]">
                  {currentProduct.brand}
                </span>
                <span className="h-3.5 w-[1px] bg-[#CCCCCC]" />
                <span className="text-xs sm:text-sm font-mono tracking-widest text-[#666666] uppercase font-semibold">
                  {currentProduct.modelName}
                </span>
              </div>

              {/* Center: Specs Badges */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono text-[#555555]">
                <div className="flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-[#111111]" />
                  <span>Shape: <strong className="text-[#111111]">{currentProduct.shape}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#111111]" />
                  <span>Material: <strong className="text-[#111111]">{currentProduct.material}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#111111]" />
                  <span>Colour: <strong className="text-[#111111]">{currentProduct.colour}</strong></span>
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
                  className="px-5 py-2.5 rounded-full bg-[#111111] text-white hover:bg-black font-mono text-xs font-semibold tracking-wider transition shadow-sm"
                >
                  VIEW DETAILS →
                </button>

                <a
                  href={createWhatsAppBookingLink(
                    `Hello Eyeris Opticals! I am interested in trying on the *${currentProduct.brand} ${currentProduct.modelName}* at your KPHB store.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#E5E5E5] hover:bg-[#F7F7F7] text-[#111111] font-mono text-xs tracking-wider font-semibold transition"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>ENQUIRE NOW</span>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Collection Selector & Bottom Trust Strip */}
        <div className="mt-6 pt-5 border-t border-[#E5E5E5] flex flex-col md:flex-row items-center justify-between gap-6 z-20">
          
          {/* Left: Collection Numbers (01, 02, 03, 04, 05, 06) */}
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#888888] uppercase font-bold">
              COLLECTION
            </span>

            <div className="flex items-center gap-3 font-mono text-xs">
              {RUNWAY_PRODUCTS.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => selectSlot(idx)}
                  className={`transition-all py-1 px-1 relative ${
                    currentIndex === idx
                      ? 'text-[#111111] font-bold text-sm'
                      : 'text-[#888888] hover:text-[#111111]'
                  }`}
                >
                  <span>{String(idx + 1).padStart(2, '0')}</span>
                  {currentIndex === idx && (
                    <motion.div
                      layoutId="activeCollectionUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#111111] rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-[#E5E5E5] text-xs font-mono">
              <span className="text-[#111111] font-semibold">{currentProduct.collectionName}</span>
              <span className="text-[#CCCCCC]">•</span>
              <a href="#collections" className="text-[#666666] hover:text-[#111111] hover:underline">
                Explore Collection →
              </a>
            </div>
          </div>

          {/* Right: Quick Directions / Visit Store */}
          <div className="flex items-center gap-4 text-xs font-mono text-[#666666]">
            <a
              href={EYERIS_LOCATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#111111] flex items-center gap-1.5 transition-colors font-medium"
            >
              <MapPin className="w-3.5 h-3.5 text-[#111111]" />
              <span>Visit EYERIS Store → KPHB Road No. 1</span>
            </a>
          </div>

        </div>

      </div>

      {/* Bottom Trust Strip */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 w-full mt-6 pt-4 border-t border-[#E5E5E5] flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-[#777777] z-20">
        <div className="flex flex-wrap items-center gap-6">
          <span className="flex items-center gap-2 text-[#333333]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
            Trusted for 2+ Decades
          </span>
          <span className="flex items-center gap-2 text-[#333333]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
            40 Years of Optical Expertise
          </span>
          <span className="flex items-center gap-2 text-[#333333]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
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
