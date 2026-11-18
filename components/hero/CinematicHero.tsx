'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, MapPin, Eye, Zap, ShieldCheck } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

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

  const rotX = 10 - scrollProgress * 10 + mousePos.y * -3;
  const rotY = -6 + scrollProgress * 6 + mousePos.x * 3;
  const rotZ = 1.0 - scrollProgress * 1.0;
  const scale = 1 + scrollProgress * 0.04;

  return (
    <section
      ref={containerRef}
      className="relative min-h-[88vh] pt-28 sm:pt-36 pb-20 overflow-hidden bg-white text-black flex flex-col justify-between border-b border-neutral-200"
    >
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FBFBFD] via-white to-white pointer-events-none" />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10 my-auto">
        
        {/* Top Apple Status Pills */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-apple-text text-xs font-mono tracking-wider shadow-apple-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>KPHB ROAD NO. 1 • GLOBAL EYE HOSPITAL GROUND FLOOR</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-apple-subtext text-xs font-mono tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-black" />
              <span>40 YEARS FAMILY TRUST</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Central Master Headline (Apple Light Typography) */}
        <ScrollReveal animation="fade-up" delay={0.1}>
          <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-black leading-[1.04] mb-5">
              Vision.{' '}
              <span className="text-neutral-500 font-light">
                Perfected.
              </span>
            </h1>

            <p className="text-apple-subtext text-lg sm:text-2xl max-w-2xl mx-auto leading-relaxed font-normal mb-8">
              Curated collections from <span className="text-black font-semibold">Ray-Ban, Oakley, Prada &amp; Stepper</span> paired with hospital-grade German optical calibration.
            </p>

            {/* Primary Action Buttons (Clean Black & White Pills) */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                href="#runway-lookbook"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-black hover:bg-neutral-800 text-white font-medium text-xs font-mono tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 shadow-apple-md"
              >
                <span>EXPLORE RUNWAY 2026</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-neutral-50 text-black border border-neutral-300 font-medium text-xs font-mono tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 shadow-apple-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span>BOOK VIP VISIT</span>
              </button>

              <button
                onClick={onOpenLensFinder}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-black border border-neutral-200 text-xs font-mono tracking-wider transition-all"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>LENS FINDER</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* 3D Tilted Perspective Stage (Apple Clean White Studio Viewport) */}
        <ScrollReveal animation="scale-in" delay={0.2}>
          <div className="w-full max-w-4xl mx-auto perspective-stage mt-4 sm:mt-6">
            <div
              ref={stageRef}
              style={{
                transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`,
              }}
              className="perspective-card relative rounded-3xl bg-white border border-neutral-200 p-6 sm:p-8 shadow-apple-xl overflow-hidden transition-transform duration-150 ease-out"
            >
              {/* Viewport Top Bar */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200 text-[11px] font-mono text-apple-subtext">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                  <span className="ml-2 text-black font-semibold">EYERIS // CLINICAL HARDWARE SPEC</span>
                </div>
                <div className="flex items-center gap-3 text-black font-semibold">
                  <span>GERMAN FREEFORM OPTICS</span>
                  <span>•</span>
                  <span>SUB-8.6G TITANIUM</span>
                </div>
              </div>

              {/* Viewport Centerpiece: Telemetry & Specs */}
              <div className="py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                
                {/* Left Column: Metric Cards */}
                <div className="text-left space-y-2 max-w-xs z-10">
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-black font-mono text-[10px] font-semibold">
                    100% CLINICAL ACCURACY
                  </div>
                  <h3 className="text-xl sm:text-2xl text-black font-bold leading-tight">
                    Hospital-Grade Vision Calibration
                  </h3>
                  <p className="text-xs text-apple-subtext leading-relaxed">
                    Direct ground-floor link to Global Eye Hospital ophthalmologists ensures your focal corridor is calibrated with zero prescription drift.
                  </p>
                </div>

                {/* Center Graphic */}
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-neutral-300 animate-spin-slow" />
                  <div className="absolute inset-4 rounded-full border border-neutral-200" />
                  <div className="relative text-center z-10">
                    <span className="text-3xl sm:text-4xl font-bold font-mono text-black block">
                      60-70%
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-apple-subtext font-mono">
                      Lens Specialisation
                    </span>
                  </div>
                </div>

                {/* Right Column: Key Differentiators */}
                <div className="text-left sm:text-right space-y-2 max-w-xs z-10">
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-amber-700 font-mono text-[10px] font-semibold">
                    TRANSITIONS® GEN S™
                  </div>
                  <h3 className="text-xl sm:text-2xl text-black font-bold leading-tight">
                    Dynamic Sunlight Shading
                  </h3>
                  <p className="text-xs text-apple-subtext leading-relaxed">
                    Lenses darken in seconds under outdoor UV sunlight, providing 100% UV400 sunglass protection without changing frames.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
