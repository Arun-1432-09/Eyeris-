'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { 
  ArrowRight, 
  MessageCircle, 
  Heart, 
  Eye, 
  Layers, 
  MapPin,
  Sparkles,
  Shield,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  X,
  Check
} from 'lucide-react';
import { 
  RUNWAY_PRODUCTS, 
  DEPTH_SLOTS, 
  LENS_SHADE_PROFILES, 
  LensShadeProfile, 
  ShowcaseProduct 
} from '@/data/eyerisData';
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
  const [activeLens, setActiveLens] = useState<LensShadeProfile>(LENS_SHADE_PROFILES[0]);
  const [isLensDrawerOpen, setIsLensDrawerOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [wishlistMap, setWishlistMap] = useState<Record<string, boolean>>({});
  const [lightSweepActive, setLightSweepActive] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const isManualSelecting = useRef(false);

  const totalProducts = RUNWAY_PRODUCTS.length;
  const currentProduct = RUNWAY_PRODUCTS[currentIndex];

  // Framer Motion native scroll tracking across the 320vh scroll track
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  // Map native page scroll progress (0.0 -> 1.0) directly to active frame (0 -> 5)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (isManualSelecting.current) return;
    const targetIndex = Math.min(totalProducts - 1, Math.max(0, Math.floor(latest * totalProducts)));
    if (targetIndex !== currentIndex) {
      setCurrentIndex(targetIndex);
    }
  });

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
    if (index === currentIndex) return;
    isManualSelecting.current = true;
    setIsAnimating(true);
    setLightSweepActive(true);
    setCurrentIndex(index);

    setTimeout(() => {
      setIsAnimating(false);
      setLightSweepActive(false);
      isManualSelecting.current = false;
    }, 450);
  };

  // Keyboard navigation: strictly horizontal arrows only
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        selectSlot((currentIndex + 1) % totalProducts);
      } else if (e.key === 'ArrowLeft') {
        selectSlot((currentIndex - 1 + totalProducts) % totalProducts);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isAnimating]);

  // Diagonal perspective offsets for white studio runway
  const getCorridorOffset = (slotIndex: number) => {
    const xOffsets = [0, 80, 155, 220, 280, 335];
    const yOffsets = [0, -10, -18, -25, -31, -36];
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
      ref={trackRef}
      className="relative h-[300vh] bg-[#FFFFFF] text-[#111111]"
    >
      {/* Pinned 100vh Sticky Stage Container */}
      <div className="sticky top-0 h-screen max-h-screen w-full overflow-hidden flex flex-col justify-between pt-20 pb-3 px-4 sm:px-8 select-none bg-[#FFFFFF]">
        
        {/* Soft Apple Studio Pedestal Illumination */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_75%_55%_at_50%_36%,rgba(0,0,0,0.02)_0%,rgba(255,255,255,1)_100%)]" />

        {/* Inner Stage Grid (Fits within 100vh with Zero Overflow) */}
        <div className="max-w-[1440px] mx-auto w-full relative z-10 flex-1 flex flex-col justify-between my-auto">
          
          {/* Top Row: Headline (Left) | 3D Corridor (Center) | 3-Card Rail (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center flex-1 my-auto">
            
            {/* Left Column: Brand Headline & Editorial Typography (References 1 & 2) */}
            <div className="lg:col-span-4 z-20 space-y-3.5 text-left">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono tracking-[0.35em] text-[#888888] uppercase font-medium">
                  — OPTICALS —
                </span>
                <div className="inline-block text-[11px] font-mono tracking-[0.25em] uppercase text-[#111111] font-bold">
                  SEE MORE. LIVE MORE.
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111111] leading-[1.05]">
                PREMIUM <br />
                EYEWEAR <br />
                <span className="font-light text-[#777777]">COLLECTIONS</span>
              </h1>

              <p className="text-xs sm:text-sm text-[#555555] font-normal max-w-xs leading-relaxed">
                Discover a world of style, precision and clarity at EYERIS. Branded frames paired with hospital-calibrated clinical lenses.
              </p>

              <div className="pt-1">
                <a
                  href="#collections"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#111111] bg-white hover:bg-[#111111] hover:text-white text-[#111111] text-xs font-mono tracking-wider font-semibold transition-all duration-300 shadow-xs transform hover:-translate-y-0.5"
                >
                  <span>EXPLORE COLLECTION</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Center Column: 6-Product 3D Perspective Depth Corridor (Matching Reference 1 & 2) */}
            <div className="lg:col-span-5 relative h-[280px] sm:h-[350px] flex items-center justify-center perspective-[1200px]">
              
              {/* Soft Studio Floor Reflection Base */}
              <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />

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
                      duration: 0.55,
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
                    <div className="relative w-[300px] sm:w-[400px] h-[180px] sm:h-[240px] flex items-center justify-center">
                      
                      {/* Primary Photorealistic 3D Frame Image (3/4 Perspective) */}
                      <img
                        src={product.image}
                        alt={`${product.brand} ${product.modelName}`}
                        className="max-w-full max-h-full object-contain filter drop-shadow-[0_12px_22px_rgba(0,0,0,0.10)] relative z-10"
                        loading={isForeground ? 'eager' : 'lazy'}
                      />

                      {/* DYNAMIC PHOTOREALISTIC LENS OPTICAL TINT LAYER (Lead Frame Only) */}
                      {isForeground && (
                        <div
                          className="absolute inset-0 pointer-events-none z-15 flex items-center justify-center transition-all duration-300"
                          style={{
                            mixBlendMode: activeLens.id === 'clear-blueprotect' ? 'screen' : 'multiply',
                          }}
                        >
                          {/* Lens Tint Aperture Overlay */}
                          <div
                            className="w-[74%] h-[48%] rounded-[38%] transition-all duration-300"
                            style={{
                              background: activeLens.overlayGradient,
                              opacity: activeLens.opacity,
                              filter: activeLens.polarized ? 'contrast(1.15) brightness(0.95)' : 'none',
                            }}
                          />

                          {/* Realistic Multi-Layer Specular Glass Reflection Sheen */}
                          <div
                            className="absolute w-[74%] h-[48%] rounded-[38%] pointer-events-none opacity-40 bg-gradient-to-tr from-transparent via-white to-transparent"
                            style={{
                              backgroundSize: '200% 200%',
                              opacity: activeLens.specularReflectance * 0.45,
                            }}
                          />
                        </div>
                      )}

                      {/* Specular Light Sweep Animation on Transition */}
                      {isForeground && lightSweepActive && (
                        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
                          <div className="w-[140%] h-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-light-sweep" />
                        </div>
                      )}

                      {/* Ground Mirror Reflection on Studio Table */}
                      <div 
                        className="absolute -bottom-12 w-full h-[60%] pointer-events-none overflow-hidden opacity-20 filter blur-[0.8px]"
                        style={{
                          transform: 'scaleY(-1)',
                          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 75%)',
                          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 75%)',
                        }}
                      >
                        <img
                          src={product.image}
                          alt="reflection"
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Contact Ground Shadow */}
                      <div
                        className="absolute -bottom-3 w-3/4 h-5 contact-shadow pointer-events-none"
                        style={{ opacity: slotConfig.opacity * 0.7 }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Column: Floating 3-Card Stream Rail (Matching References 1 & 2) */}
            <div className="lg:col-span-3 z-20 flex flex-col max-w-xs ml-auto w-full bg-white/80 backdrop-blur-md p-3 rounded-3xl border border-[#E5E5E5] shadow-xs">
              
              {/* Header: Confirmed Brands & Live Counter (Reference 1) */}
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E5E5] mb-2 px-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-[#111111]">
                    CONFIRMED BRANDS
                  </span>
                </div>
                <div className="flex items-center gap-1 font-mono text-xs">
                  <span className="font-bold text-[#111111]">0{currentIndex + 1}</span>
                  <span className="text-[#888888]">/ 0{totalProducts}</span>
                </div>
              </div>

              {/* 3-Card Floating Stream Window */}
              <div className="flex flex-col gap-2 max-h-[310px] overflow-hidden pr-0.5">
                {[0, 1, 2].map((offset) => {
                  const itemIndex = (currentIndex + offset) % totalProducts;
                  const item = RUNWAY_PRODUCTS[itemIndex];
                  const isWishlisted = !!wishlistMap[item.id];
                  const isCurrent = offset === 0;

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      onClick={() => selectSlot(itemIndex)}
                      className={`p-2.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                        isCurrent
                          ? 'bg-white text-[#111111] border-[#111111] shadow-md ring-1 ring-black/5'
                          : 'bg-[#F9F9F9] text-[#111111] border-[#E5E5E5] opacity-75 hover:opacity-100 hover:bg-white'
                      }`}
                    >
                      {/* Card Header: Brand Wordmark & Wishlist Heart */}
                      <div className="flex items-center justify-between mb-1">
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

                      {/* Frame 3D Image Thumbnail */}
                      <div className="relative w-full h-14 rounded-xl overflow-hidden bg-white border border-[#E5E5E5] mb-1.5 flex items-center justify-center p-1">
                        <img
                          src={item.image}
                          alt={item.modelName}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Model & Spec Label */}
                      <div className="mb-1">
                        <h4 className="text-xs font-bold text-[#111111] truncate leading-tight">
                          {item.modelName}
                        </h4>
                        <p className="text-[10px] font-mono text-[#666666] mt-0.5 truncate">
                          {item.shape} • {item.colour}
                        </p>
                      </div>

                      {/* Bottom Action Links */}
                      <div className="pt-1.5 border-t border-[#E5E5E5] flex items-center justify-between text-[10px] font-mono font-semibold">
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
                            `Hi Eyeris! I'd like to check store availability and try on the *${item.brand} ${item.modelName}* (${item.colour}) paired with *${activeLens.name}* at your KPHB store.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 rounded-full bg-[#EAEAEA] hover:bg-[#111111] hover:text-white text-[#111111] transition-colors"
                          aria-label="Enquire on WhatsApp"
                        >
                          <MessageCircle className="w-3 h-3 fill-current" />
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Footer: [ ← ] [ → ] SCROLL OR SCRUB Controls (Reference 1) */}
              <div className="pt-2 border-t border-[#E5E5E5] mt-1.5 flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => selectSlot((currentIndex - 1 + totalProducts) % totalProducts)}
                    className="w-6 h-6 rounded-full border border-[#E5E5E5] bg-white hover:bg-[#111111] hover:text-white text-[#111111] flex items-center justify-center transition shadow-xs"
                    aria-label="Previous frame"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => selectSlot((currentIndex + 1) % totalProducts)}
                    className="w-6 h-6 rounded-full border border-[#E5E5E5] bg-white hover:bg-[#111111] hover:text-white text-[#111111] flex items-center justify-center transition shadow-xs"
                    aria-label="Next frame"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-mono text-[#888888]">
                  <span className="tracking-wider uppercase font-medium">SCROLL TO SCRUB</span>
                  {/* Mini Dot Indicator */}
                  <div className="flex items-center gap-1">
                    {RUNWAY_PRODUCTS.map((_, i) => (
                      <span
                        key={i}
                        className={`w-1 h-1 rounded-full transition-all duration-300 ${
                          currentIndex === i ? 'bg-[#111111] w-2' : 'bg-[#D1D1D1]'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom HUD: Specs Bar (Reference 2) + Minimal Apple Lens Drawer */}
          <div className="w-full pt-3 border-t border-[#E5E5E5] z-20 space-y-2.5">
            
            {/* Row 1: Collection Indicator, Frame Specs & CTAs */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProduct.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="flex flex-wrap items-center justify-between gap-3"
              >
                {/* Left: Collection Badges 01-06 & Active Wordmark */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 font-mono text-xs">
                    <span className="text-[10px] uppercase font-bold text-[#888888] tracking-widest mr-1">
                      COLLECTION
                    </span>
                    {RUNWAY_PRODUCTS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => selectSlot(i)}
                        className={`w-6 h-6 rounded-md font-mono text-xs flex items-center justify-center transition-all ${
                          currentIndex === i
                            ? 'bg-[#111111] text-white font-bold'
                            : 'text-[#666666] hover:text-[#111111] hover:bg-[#F2F2F2]'
                        }`}
                      >
                        0{i + 1}
                      </button>
                    ))}
                  </div>

                  <span className="h-3.5 w-[1px] bg-[#CCCCCC] hidden sm:inline" />

                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-xs sm:text-sm font-bold text-[#111111]">
                      {currentProduct.brand}
                    </span>
                    <span className="text-xs text-[#777777] uppercase hidden md:inline">
                      {currentProduct.modelName}
                    </span>
                  </div>
                </div>

                {/* Center: Frame Specs Badges (Reference 2) */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-[11px] font-mono text-[#555555]">
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-3 h-3 text-[#111111]" />
                    <span>Shape: <strong className="text-[#111111]">{currentProduct.shape}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-3 h-3 text-[#111111]" />
                    <span>Material: <strong className="text-[#111111]">{currentProduct.material}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                    <span>Colour: <strong className="text-[#111111]">{currentProduct.colour}</strong></span>
                  </div>
                </div>

                {/* Right: Minimal Apple Lens Drawer Trigger & CTAs */}
                <div className="flex items-center gap-2.5">
                  {/* Minimal Apple "Try Lenses" Pill Trigger */}
                  <button
                    onClick={() => setIsLensDrawerOpen(!isLensDrawerOpen)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono transition-all ${
                      isLensDrawerOpen || activeLens.id !== 'clear-blueprotect'
                        ? 'border-[#111111] bg-[#111111] text-white shadow-xs'
                        : 'border-[#E5E5E5] bg-white text-[#111111] hover:bg-[#F7F7F7]'
                    }`}
                  >
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    <span>Try Lenses</span>
                    {activeLens.id !== 'clear-blueprotect' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    )}
                    {isLensDrawerOpen ? (
                      <ChevronDown className="w-3 h-3" />
                    ) : (
                      <ChevronUp className="w-3 h-3" />
                    )}
                  </button>

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
                    className="px-4 py-1.5 rounded-full bg-[#111111] text-white hover:bg-black font-mono text-xs font-semibold tracking-wider transition shadow-xs"
                  >
                    VIEW DETAILS →
                  </button>

                  <a
                    href={createWhatsAppBookingLink(
                      `Hello Eyeris! I am interested in trying on the *${currentProduct.brand} ${currentProduct.modelName}* paired with *${activeLens.name}* at your KPHB store.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#E5E5E5] hover:bg-[#F7F7F7] text-[#111111] font-mono text-xs tracking-wider font-semibold transition shadow-xs"
                  >
                    <MessageCircle className="w-3 h-3 fill-current" />
                    <span>ENQUIRE NOW</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Minimal Apple Lens Drawer (Slides Open on Click) */}
            <AnimatePresence>
              {isLensDrawerOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: 10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: 10 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="p-3 rounded-2xl bg-[#F7F7F7] border border-[#E5E5E5] flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
                    
                    {/* Swatches List */}
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#111111] mr-1 uppercase">
                        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Clinical Lens Shade:</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5">
                        {LENS_SHADE_PROFILES.map((shade) => {
                          const isSelected = activeLens.id === shade.id;
                          return (
                            <button
                              key={shade.id}
                              onClick={() => setActiveLens(shade)}
                              className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono transition-all ${
                                isSelected
                                  ? 'bg-[#111111] text-white shadow-xs ring-1 ring-[#D4AF37]'
                                  : 'bg-white border border-[#E5E5E5] text-[#555555] hover:text-[#111111] hover:border-[#CCCCCC]'
                              }`}
                            >
                              <span
                                className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0"
                                style={{ backgroundColor: shade.swatchColor }}
                              />
                              <span className="font-medium whitespace-nowrap">{shade.shortLabel}</span>
                              {isSelected && <Check className="w-3 h-3 text-[#D4AF37]" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Clinical Badges */}
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                      {activeLens.polarized && (
                        <span className="px-2 py-0.5 rounded-full bg-[#111111] text-white font-medium flex items-center gap-1">
                          <Shield className="w-3 h-3 text-[#D4AF37]" />
                          <span>100% Polarized</span>
                        </span>
                      )}

                      {activeLens.blueCut && (
                        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-medium flex items-center gap-1">
                          <Eye className="w-3 h-3 text-blue-600" />
                          <span>BlueProtect™ Filter</span>
                        </span>
                      )}

                      <span className="px-2 py-0.5 rounded-full bg-white text-[#111111] border border-[#E5E5E5] font-medium">
                        {activeLens.uvDefense}
                      </span>

                      <button
                        onClick={() => setIsLensDrawerOpen(false)}
                        className="p-1 rounded-full text-[#888888] hover:text-[#111111] transition"
                        title="Close Lens Drawer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Row 2: Bottom Trust Strip (Reference 2) */}
            <div className="pt-2 border-t border-[#E5E5E5] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#666666]">
              <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                  Trusted for 2+ Decades in Kukatpally
                </span>
                <span className="hidden sm:inline text-[#CCCCCC]">•</span>
                <span className="flex items-center gap-1.5">
                  40 Years of Optical Industry Heritage
                </span>
                <span className="hidden sm:inline text-[#CCCCCC]">•</span>
                <span className="flex items-center gap-1.5">
                  In Association with Global Eye Hospital
                </span>
              </div>

              <a
                href={EYERIS_LOCATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#111111] transition-colors flex items-center gap-1 font-medium mt-1 sm:mt-0"
              >
                <MapPin className="w-3 h-3 text-[#111111]" />
                <span>Visit EYERIS Store (KPHB Road No. 1) →</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
