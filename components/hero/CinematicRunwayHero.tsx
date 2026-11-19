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
  Sparkles,
  Shield,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight
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
  const [isAnimating, setIsAnimating] = useState(false);
  const [wishlistMap, setWishlistMap] = useState<Record<string, boolean>>({});
  const [lightSweepActive, setLightSweepActive] = useState(false);
  
  // Auto-Slide State (Default false so scrolling the landing page is never interrupted)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [autoSlideProgress, setAutoSlideProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRailRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const totalProducts = RUNWAY_PRODUCTS.length;
  const currentProduct = RUNWAY_PRODUCTS[currentIndex];

  // Pause auto-slide when the hero section scrolls out of viewport
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

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

  // Auto-scroll the active card inside the right rail ONLY (eliminates page snap back to top)
  useEffect(() => {
    const activeEl = cardRefs.current[currentIndex];
    const rail = scrollRailRef.current;
    if (activeEl && rail) {
      const targetTop = activeEl.offsetTop - rail.offsetTop;
      rail.scrollTo({ top: Math.max(0, targetTop - 6), behavior: 'smooth' });
    }
  }, [currentIndex]);

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
    setAutoSlideProgress(0); // Reset timer on manual action
    setTimeout(() => {
      setIsAnimating(false);
      setLightSweepActive(false);
    }, 600);
  };

  // 5-Second Gentle Auto-Slide Interval Loop (Only runs when explicitly enabled via Play button)
  useEffect(() => {
    if (!isAutoPlaying || isHovered || !isHeroVisible) return;

    const intervalStep = 50; // update progress every 50ms
    const totalDuration = 5000; // 5000ms = 5 seconds

    const timer = setInterval(() => {
      setAutoSlideProgress((prev) => {
        if (prev >= 100) {
          selectSlot((currentIndex + 1) % totalProducts);
          return 0;
        }
        return prev + (intervalStep / totalDuration) * 100;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [isAutoPlaying, isHovered, isHeroVisible, currentIndex, isAnimating]);

  // Keyboard navigation (Strictly horizontal arrows only - NEVER intercept page scroll keys ArrowDown/ArrowUp)
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
        
        {/* Top Grid: Headline (Left) | Perspective Corridor (Center) | 6-Card Scrollable Rail (Right) */}
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

          {/* Center Column: 6-Product 3D Perspective Depth Corridor (Matching Reference 1) */}
          <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="lg:col-span-5 relative h-[360px] sm:h-[440px] flex items-center justify-center perspective-[1200px]"
          >
            
            {/* Top Toolbar: Auto-Slide Timer & Controls */}
            <div className="absolute top-0 right-0 z-30 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#E5E5E5] shadow-xs">
              {/* Play/Pause Button */}
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="p-1 text-[#666666] hover:text-[#111111] transition"
                title={isAutoPlaying ? 'Pause Auto-Slide' : 'Start Auto-Slide'}
              >
                {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              </button>

              {/* Progress Bar Line */}
              <div className="w-14 h-1 bg-[#EAEAEA] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#111111] transition-all duration-75"
                  style={{ width: `${autoSlideProgress}%` }}
                />
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-1 pl-1 border-l border-[#E5E5E5]">
                <button
                  onClick={() => selectSlot((currentIndex - 1 + totalProducts) % totalProducts)}
                  className="p-0.5 text-[#666666] hover:text-[#111111]"
                  aria-label="Previous Frame"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => selectSlot((currentIndex + 1) % totalProducts)}
                  className="p-0.5 text-[#666666] hover:text-[#111111]"
                  aria-label="Next Frame"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

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
                    
                    {/* Primary Photorealistic 3D Frame Image (3/4 Perspective) */}
                    <img
                      src={product.image}
                      alt={`${product.brand} ${product.modelName}`}
                      className="max-w-full max-h-full object-contain filter drop-shadow-[0_16px_28px_rgba(0,0,0,0.14)] relative z-10"
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

                    {/* Realistic Ground Mirror Reflection on Studio Table */}
                    <div 
                      className="absolute -bottom-16 w-full h-[65%] pointer-events-none overflow-hidden opacity-25 filter blur-[0.8px]"
                      style={{
                        transform: 'scaleY(-1)',
                        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 75%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 75%)',
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
                      className="absolute -bottom-4 w-3/4 h-6 contact-shadow pointer-events-none"
                      style={{ opacity: slotConfig.opacity * 0.75 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Scrollable 6-Card Stream Rail (Reference 1 Style) */}
          <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="lg:col-span-3 z-20 flex flex-col max-w-xs ml-auto w-full bg-white/70 backdrop-blur-sm p-3 rounded-3xl border border-[#E5E5E5] shadow-xs"
          >
            
            {/* Header: Confirmed Brands & Live Counter (Reference 1) */}
            <div className="flex items-center justify-between pb-2.5 border-b border-[#E5E5E5] mb-2 px-1">
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

            {/* Scrollable Container for ALL 6 Brands */}
            <div 
              ref={scrollRailRef}
              className="relative flex flex-col gap-2.5 max-h-[360px] overflow-y-auto no-scrollbar pr-0.5 scroll-smooth"
            >
              {RUNWAY_PRODUCTS.map((item, idx) => {
                const isWishlisted = !!wishlistMap[item.id];
                const isCurrent = currentIndex === idx;

                return (
                  <div
                    key={item.id}
                    ref={(el) => { cardRefs.current[idx] = el; }}
                    onClick={() => selectSlot(idx)}
                    className={`p-3 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      isCurrent
                        ? 'bg-white text-[#111111] border-[#111111] shadow-md ring-1 ring-black/5'
                        : 'bg-[#F7F7F7] text-[#111111] border-[#E5E5E5] hover:bg-white hover:border-[#CCCCCC]'
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
                    <div className="relative w-full h-16 rounded-xl overflow-hidden bg-white border border-[#E5E5E5] mb-2 flex items-center justify-center p-1.5">
                      <img
                        src={item.image}
                        alt={item.modelName}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Model & Spec Label */}
                    <div className="mb-1.5">
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
                  </div>
                );
              })}
            </div>

            {/* Bottom Footer: [ ← ] [ → ] SCROLL OR SCRUB Controls (Reference 1) */}
            <div className="pt-2.5 border-t border-[#E5E5E5] mt-2 flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => selectSlot((currentIndex - 1 + totalProducts) % totalProducts)}
                  className="w-7 h-7 rounded-full border border-[#E5E5E5] bg-white hover:bg-[#111111] hover:text-white text-[#111111] flex items-center justify-center transition shadow-xs"
                  aria-label="Previous frame"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => selectSlot((currentIndex + 1) % totalProducts)}
                  className="w-7 h-7 rounded-full border border-[#E5E5E5] bg-white hover:bg-[#111111] hover:text-white text-[#111111] flex items-center justify-center transition shadow-xs"
                  aria-label="Next frame"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-mono text-[#888888]">
                <span className="tracking-wider uppercase font-medium">SCROLL OR SCRUB</span>
                {/* Mini Dot Indicator */}
                <div className="flex items-center gap-1">
                  {RUNWAY_PRODUCTS.map((_, i) => (
                    <span
                      key={i}
                      className={`w-1 h-1 rounded-full transition-all duration-300 ${
                        currentIndex === i ? 'bg-[#111111] w-2.5' : 'bg-[#D1D1D1]'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Dedicated Non-Overlapping Specs HUD Strip & Dynamic Lens Shade Selector */}
        <div className="w-full mt-6 pt-5 border-t border-[#E5E5E5] z-20 space-y-4">
          
          {/* Row 1: Brand Typography, Specs Badges & CTAs */}
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
                    `Hello Eyeris Opticals! I am interested in trying on the *${currentProduct.brand} ${currentProduct.modelName}* paired with *${activeLens.name}* at your KPHB store.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#E5E5E5] hover:bg-[#F7F7F7] text-[#111111] font-mono text-xs tracking-wider font-semibold transition shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>ENQUIRE WITH THIS SHADE</span>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Row 2: Dynamic Branded Lens Shades Selector & Real-Time Optical Badges */}
          <div className="p-3.5 rounded-2xl bg-[#F7F7F7] border border-[#E5E5E5] flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Swatch Selector */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#111111] mr-1 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Try Lens Shade:</span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {LENS_SHADE_PROFILES.map((shade) => {
                  const isSelected = activeLens.id === shade.id;
                  return (
                    <button
                      key={shade.id}
                      onClick={() => setActiveLens(shade)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#111111] text-white shadow-sm ring-2 ring-[#D4AF37]'
                          : 'bg-white border border-[#E5E5E5] text-[#555555] hover:text-[#111111] hover:border-[#CCCCCC]'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0"
                        style={{ backgroundColor: shade.swatchColor }}
                      />
                      <span className="font-medium whitespace-nowrap">{shade.shortLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Clinical Badges for the Active Lens Shade */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
              {activeLens.polarized && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#111111] text-white font-medium flex items-center gap-1">
                  <Shield className="w-3 h-3 text-[#D4AF37]" />
                  <span>100% Polarized (Cat 3)</span>
                </span>
              )}

              {activeLens.blueCut && (
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-medium flex items-center gap-1">
                  <Eye className="w-3 h-3 text-blue-600" />
                  <span>BlueProtect™ Filter</span>
                </span>
              )}

              <span className="px-2.5 py-0.5 rounded-full bg-white text-[#111111] border border-[#E5E5E5] font-medium">
                {activeLens.uvDefense}
              </span>

              <span className="text-[#888888] hidden xl:inline">
                • {activeLens.category}
              </span>
            </div>

          </div>

        </div>

        {/* Collection Selector & Bottom Store Info Strip */}
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
