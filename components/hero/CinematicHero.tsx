'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, MapPin, Shield, Star, Compass, Layers, Eye, ChevronDown } from 'lucide-react';
import { EYERIS_LOCATION_URL } from '@/components/booking/WhatsAppSync';

interface CinematicHeroProps {
  onOpenBooking: () => void;
  onOpenLensFinder: () => void;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({ onOpenBooking, onOpenLensFinder }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  // Smooth mouse tilt effect for 3D stage
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
      setMousePos({ x, y });
    };

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height * 0.75)));
      setScrollProgress(progress);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Compute 3D stage rotation (interpolating mouse tilt + scroll down progression like reference video)
  const rotX = 18 - scrollProgress * 16 + mousePos.y * -6;
  const rotY = -12 + scrollProgress * 12 + mousePos.x * 6;
  const rotZ = 3 - scrollProgress * 3;
  const scale = 1 + scrollProgress * 0.08;

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] lg:min-h-screen pt-28 pb-16 overflow-hidden bg-background flex flex-col justify-between"
    >
      {/* Cinematic Ambient Glows & Grid (Reference video aesthetic) */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      
      {/* Holographic atmospheric glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[550px] bg-gradient-to-tr from-brand-400/15 via-optic-purple/10 to-champagne-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-10 -right-20 w-[420px] h-[420px] bg-champagne-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-optic-blue/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10 my-auto">
        
        {/* Top Editorial Status Pill */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-graphite/80 border border-brand-400/30 text-brand-300 text-xs font-mono tracking-wider shadow-lg backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-400"></span>
            </span>
            <span>KPHB ROAD NO. 1 • GROUND FLOOR LINKED TO GLOBAL EYE HOSPITAL</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-champagne-500/10 border border-champagne-500/30 text-champagne-300 text-xs font-mono tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
            <span>40 YEARS FAMILY OPTICAL TRUST</span>
          </div>
        </div>

        {/* Central Master Headline */}
        <div className="text-center max-w-5xl mx-auto mb-8 sm:mb-12">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-white leading-[1.05] mb-6">
            VISION,{' '}
            <span className="italic font-light text-gold-gradient">REFINED.</span>
          </h1>

          <p className="text-ivory-200/90 text-lg sm:text-2xl max-w-3xl mx-auto leading-relaxed font-light mb-8">
            Discover exceptional eyewear where timeless luxury design meets precision optical craftsmanship.
            Featuring authentic collections from <span className="text-white font-medium">Ray-Ban, Oakley, Prada</span> &{' '}
            <span className="text-champagne-400 font-medium">Stepper Titanium</span>.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#collections"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-ivory-100 hover:bg-white text-black font-semibold text-sm tracking-wide transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_10px_30px_rgba(255,255,255,0.15)]"
            >
              <span>EXPLORE COLLECTIONS</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-graphite/90 hover:bg-surface-hover border border-champagne-500/40 hover:border-champagne-400 text-champagne-300 hover:text-white font-semibold text-sm tracking-wide transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-champagne-400" />
              <span>BOOK YOUR VISIT</span>
            </button>

            <button
              onClick={onOpenLensFinder}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 border border-brand-400/30 text-brand-300 text-sm font-mono tracking-wider transition-all"
            >
              <Eye className="w-4 h-4" />
              <span>AI LENS FINDER</span>
            </button>
          </div>
        </div>

        {/* 3D Tilted Perspective Viewport Stage (Exact signature effect from the Reference Video) */}
        <div className="w-full max-w-5xl mx-auto perspective-stage mt-6 sm:mt-10">
          <div
            ref={stageRef}
            style={{
              transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`,
            }}
            className="perspective-card relative rounded-3xl bg-gradient-to-b from-graphite via-surface to-background border border-white/15 p-6 sm:p-8 shadow-[0_35px_80px_rgba(0,0,0,0.85)] overflow-hidden transition-transform duration-150 ease-out"
          >
            {/* Viewport Top Bar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-brand-400" />
                <span className="ml-2 text-ivory-200">EYERIS // 3D OPTICAL PERSPECTIVE</span>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-champagne-400">
                <span>INDEX 1.67 SURFACING</span>
                <span>•</span>
                <span>TITANIUM PURE</span>
              </div>
            </div>

            {/* Viewport Centerpiece: Live Holographic Stage Simulation */}
            <div className="relative py-8 sm:py-14 flex flex-col md:flex-row items-center justify-between gap-8">
              
              {/* Left Column: Interactive Telemetry & Metrics */}
              <div className="text-left space-y-4 max-w-xs z-10">
                <div className="inline-block px-3 py-1 rounded bg-brand-500/10 border border-brand-400/20 text-brand-300 font-mono text-xs">
                  OPTICAL ACCURACY 100%
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-white font-bold leading-tight">
                  German Freeform Digital Surfacing
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                  Sub-micron precision lens curve customization tailored for computer displays, highway night driving, and wide-corridor progressives.
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <a
                    href="#anatomy-3d"
                    className="text-xs font-mono text-brand-300 hover:text-white flex items-center gap-1.5 underline decoration-brand-400/50"
                  >
                    <span>Inspect 3D Anatomy</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Center Holographic Eyewear Emblem & Orbital Rings */}
              <div className="relative w-64 h-56 sm:w-80 sm:h-64 flex items-center justify-center">
                {/* Glowing Orbital Rings */}
                <div className="absolute inset-0 rounded-full border border-brand-400/20 animate-spinSlow" />
                <div className="absolute inset-4 rounded-full border border-champagne-500/20" style={{ animation: 'spin 35s linear infinite reverse' }} />
                <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-brand-400/20 to-optic-purple/20 blur-2xl" />

                {/* Eyewear SVG Iconography Silhouette */}
                <div className="relative z-10 flex flex-col items-center">
                  <svg className="w-48 sm:w-60 text-white drop-shadow-[0_0_25px_rgba(56,205,187,0.6)]" viewBox="0 0 200 65" fill="none" stroke="currentColor">
                    {/* Left Frame */}
                    <rect x="15" y="12" width="65" height="42" rx="12" strokeWidth="3" stroke="#B99A68" fill="rgba(8,9,11,0.7)" />
                    {/* Left Lens Glare */}
                    <path d="M 28 20 L 45 44" stroke="#38CDBB" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                    {/* Right Frame */}
                    <rect x="120" y="12" width="65" height="42" rx="12" strokeWidth="3" stroke="#B99A68" fill="rgba(8,9,11,0.7)" />
                    {/* Right Lens Glare */}
                    <path d="M 133 20 L 150 44" stroke="#38CDBB" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                    {/* Bridge */}
                    <path d="M 80 25 C 92 18, 108 18, 120 25" strokeWidth="3.5" stroke="#B99A68" fill="none" />
                    {/* Temples */}
                    <path d="M 15 22 L 2 26" stroke="#B99A68" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 185 22 L 198 26" stroke="#B99A68" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  <span className="mt-3 text-[11px] font-mono tracking-widest text-brand-300">
                    STEPPER TITANIUM // 9.2 GRAMS
                  </span>
                </div>
              </div>

              {/* Right Column: Key Pillars Strip */}
              <div className="space-y-3 text-right max-w-xs z-10 hidden sm:block">
                <div className="p-3 rounded-xl bg-surface/80 border border-white/5">
                  <p className="text-white font-medium text-xs font-mono">60–70% Lens Specialization</p>
                  <p className="text-[11px] text-neutral-400">ZEISS DriveSafe, BlueProtect, Myopia</p>
                </div>
                <div className="p-3 rounded-xl bg-surface/80 border border-white/5">
                  <p className="text-champagne-300 font-medium text-xs font-mono">Global Eye Hospital Ground Floor</p>
                  <p className="text-[11px] text-neutral-400">Direct ophthalmologist prescription sync</p>
                </div>
                <div className="p-3 rounded-xl bg-surface/80 border border-white/5">
                  <p className="text-optic-blue font-medium text-xs font-mono">Corporate Allowance</p>
                  <p className="text-[11px] text-neutral-400">₹20,000 claim support with verified GST</p>
                </div>
              </div>
            </div>

            {/* Viewport Bottom Ticker */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs font-mono text-neutral-400">
              <span className="text-brand-300">SCROLL DOWN TO EXPLORE 3D ANATOMY</span>
              <span>LIVE INTERACTIVE PREVIEW</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex flex-col items-center justify-center gap-2 text-neutral-400">
          <span className="text-[10px] font-mono tracking-widest uppercase text-champagne-400">
            DISCOVER THE STORY
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-champagne-400" />
        </div>
      </div>
    </section>
  );
};
