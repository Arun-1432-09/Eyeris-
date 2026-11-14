'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, MapPin, Eye, ChevronDown } from 'lucide-react';

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
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
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

  const rotX = 16 - scrollProgress * 14 + mousePos.y * -5;
  const rotY = -10 + scrollProgress * 10 + mousePos.x * 5;
  const rotZ = 2 - scrollProgress * 2;
  const scale = 1 + scrollProgress * 0.06;

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] lg:min-h-screen pt-28 pb-16 overflow-hidden bg-background flex flex-col justify-between"
    >
      {/* Cinematic Ambient Glows & Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[500px] bg-gradient-to-tr from-brand-400/15 via-optic-purple/10 to-champagne-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-10 -right-20 w-[380px] h-[380px] bg-champagne-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-optic-blue/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10 my-auto">
        
        {/* Top Editorial Pill */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-graphite/80 border border-brand-400/30 text-brand-300 text-xs font-mono tracking-wider shadow-lg backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-400"></span>
            </span>
            <span>KPHB ROAD NO. 1 • GLOBAL EYE HOSPITAL LINKED</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-champagne-500/10 border border-champagne-500/30 text-champagne-300 text-xs font-mono tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
            <span>40 YEARS FAMILY TRUST</span>
          </div>
        </div>

        {/* Central Master Headline (Clean & Minimalist) */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-white leading-[1.05] mb-5">
            VISION,{' '}
            <span className="italic font-light text-gold-gradient">REFINED.</span>
          </h1>

          <p className="text-ivory-200/90 text-lg sm:text-2xl max-w-2xl mx-auto leading-relaxed font-light mb-8">
            Timeless luxury design meets precision optical craftsmanship. Curated collections from{' '}
            <span className="text-white font-medium">Ray-Ban, Oakley, Prada</span> &amp;{' '}
            <span className="text-champagne-400 font-medium">Stepper Titanium</span>.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="#trending-frames"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-ivory-100 hover:bg-white text-black font-semibold text-xs font-mono tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg"
            >
              <span>TRENDING FRAMES</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-graphite hover:bg-surface-hover border border-champagne-500/40 hover:border-champagne-400 text-champagne-300 hover:text-white font-semibold text-xs font-mono tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
              <span>BOOK VISIT</span>
            </button>

            <button
              onClick={onOpenLensFinder}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-mono tracking-wider transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>AI LENS FINDER</span>
            </button>
          </div>
        </div>

        {/* 3D Tilted Perspective Viewport Stage (Reference Video Signature Aesthetic) */}
        <div className="w-full max-w-4xl mx-auto perspective-stage mt-4 sm:mt-6">
          <div
            ref={stageRef}
            style={{
              transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`,
            }}
            className="perspective-card relative rounded-3xl bg-gradient-to-b from-graphite via-surface to-background border border-white/15 p-5 sm:p-7 shadow-[0_35px_80px_rgba(0,0,0,0.85)] overflow-hidden transition-transform duration-150 ease-out"
          >
            {/* Viewport Top Bar */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-[11px] font-mono text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500/80" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                <span className="w-2 h-2 rounded-full bg-brand-400" />
                <span className="ml-2 text-ivory-200">EYERIS // 3D STAGE VIEWPORT</span>
              </div>
              <div className="flex items-center gap-3 text-champagne-400">
                <span>GERMAN FREEFORM OPTICS</span>
                <span>•</span>
                <span>FEATHERWEIGHT TITANIUM</span>
              </div>
            </div>

            {/* Viewport Centerpiece: Streamlined Wireframe & Telemetry */}
            <div className="py-4 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              
              {/* Left Column: Metric Cards */}
              <div className="text-left space-y-3 max-w-xs z-10">
                <div className="inline-block px-2.5 py-0.5 rounded bg-brand-500/10 border border-brand-400/20 text-brand-300 font-mono text-[10px]">
                  OPTICAL ACCURACY 100%
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-white font-bold leading-tight">
                  German Freeform Surfacing
                </h3>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  Sub-micron lens calibration tailored for software displays, night driving, and wide progressive corridors.
                </p>
              </div>

              {/* Center Eyewear Emblem & Orbital Rings */}
              <div className="relative w-56 h-44 sm:w-64 sm:h-52 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-brand-400/20 animate-spinSlow" />
                <div className="absolute inset-3 rounded-full border border-champagne-500/20" style={{ animation: 'spin 35s linear infinite reverse' }} />
                <div className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-brand-400/20 to-optic-purple/20 blur-2xl" />

                <div className="relative z-10 flex flex-col items-center">
                  <svg className="w-44 sm:w-52 text-white drop-shadow-[0_0_25px_rgba(56,205,187,0.5)]" viewBox="0 0 200 65" fill="none" stroke="currentColor">
                    <rect x="15" y="12" width="65" height="42" rx="12" strokeWidth="3" stroke="#B99A68" fill="rgba(8,9,11,0.7)" />
                    <path d="M 28 20 L 45 44" stroke="#38CDBB" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                    <rect x="120" y="12" width="65" height="42" rx="12" strokeWidth="3" stroke="#B99A68" fill="rgba(8,9,11,0.7)" />
                    <path d="M 133 20 L 150 44" stroke="#38CDBB" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                    <path d="M 80 25 C 92 18, 108 18, 120 25" strokeWidth="3.5" stroke="#B99A68" fill="none" />
                    <path d="M 15 22 L 2 26" stroke="#B99A68" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 185 22 L 198 26" stroke="#B99A68" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  <span className="mt-2 text-[10px] font-mono tracking-widest text-brand-300">
                    STEPPER TITANIUM // 8.9G
                  </span>
                </div>
              </div>

              {/* Right Column: Key Metrics */}
              <div className="space-y-2 text-right max-w-xs z-10 hidden sm:block">
                <div className="p-2.5 rounded-xl bg-surface/80 border border-white/5">
                  <p className="text-white font-medium text-xs font-mono">60–70% Lens Specialisation</p>
                  <p className="text-[10px] text-neutral-400">ZEISS DriveSafe &amp; Progressives</p>
                </div>
                <div className="p-2.5 rounded-xl bg-surface/80 border border-white/5">
                  <p className="text-champagne-300 font-medium text-xs font-mono">Global Eye Hospital Link</p>
                  <p className="text-[10px] text-neutral-400">Ground floor connected care</p>
                </div>
              </div>
            </div>

            {/* Viewport Bottom Ticker */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span className="text-brand-300">INTERACTIVE 3D PERSPECTIVE VIEWPORT</span>
              <span>SCROLL DOWN TO EXPLORE</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-10 flex flex-col items-center justify-center gap-1.5 text-neutral-400">
          <span className="text-[9px] font-mono tracking-widest uppercase text-champagne-400">
            SCROLL TO EXPLORE
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-champagne-400" />
        </div>
      </div>
    </section>
  );
};
