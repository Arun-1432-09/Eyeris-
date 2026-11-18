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

  const rotX = 14 - scrollProgress * 12 + mousePos.y * -4;
  const rotY = -8 + scrollProgress * 8 + mousePos.x * 4;
  const rotZ = 1.5 - scrollProgress * 1.5;
  const scale = 1 + scrollProgress * 0.05;

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] pt-28 pb-16 overflow-hidden bg-black flex flex-col justify-between"
    >
      {/* Apple Subtle Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-apple-blue/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10 my-auto">
        
        {/* Top Apple Pill */}
        <ScrollReveal variant="fadeUp" className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full apple-glass text-apple-text text-xs font-mono tracking-wider shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-apple-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-apple-blue"></span>
            </span>
            <span>KPHB ROAD NO. 1 • GLOBAL EYE HOSPITAL LINKED</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full apple-glass text-apple-subtext text-xs font-mono tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-apple-green" />
            <span>40 YEARS FAMILY TRUST</span>
          </div>
        </ScrollReveal>

        {/* Central Master Headline (Apple Keynote Minimalism) */}
        <ScrollReveal variant="fadeUp" delay={0.1} className="text-center max-w-4xl mx-auto mb-8 sm:mb-10">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05] mb-5">
            Vision.{' '}
            <span className="text-apple-gradient">
              Perfected.
            </span>
          </h1>

          <p className="text-apple-subtext text-lg sm:text-2xl max-w-2xl mx-auto leading-relaxed font-normal mb-8">
            Iconic design from <span className="text-white font-medium">Ray-Ban, Oakley &amp; Prada</span> paired with hospital-grade German optical precision.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="#anatomy-3d"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-apple-blue hover:bg-apple-blue-hover text-white font-semibold text-xs font-mono tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-apple-blue/25"
            >
              <span>EXPERIENCE 3D OPTICS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full apple-glass hover:bg-white/10 text-white font-semibold text-xs font-mono tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>BOOK VIP VISIT</span>
            </button>

            <button
              onClick={onOpenLensFinder}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full apple-glass text-apple-blue-light text-xs font-mono tracking-wider hover:bg-white/10 transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>LENS FINDER</span>
            </button>
          </div>
        </ScrollReveal>

        {/* 3D Tilted Perspective Stage (Apple Pro Hardware Viewport) */}
        <ScrollReveal variant="scaleIn" delay={0.2} className="w-full max-w-4xl mx-auto perspective-stage mt-6">
          <div
            ref={stageRef}
            style={{
              transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`,
            }}
            className="perspective-card relative rounded-3xl apple-glass-elevated p-5 sm:p-7 shadow-[0_35px_80px_rgba(0,0,0,0.9)] overflow-hidden transition-transform duration-150 ease-out"
          >
            {/* Viewport Top Bar */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-[11px] font-mono text-apple-subtext">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500/80" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                <span className="w-2 h-2 rounded-full bg-green-500/80" />
                <span className="ml-2 text-white font-medium">EYERIS // OPTICAL PHYSICS VIEWPORT</span>
              </div>
              <div className="flex items-center gap-3 text-apple-blue-light">
                <span>GERMAN FREEFORM SURFACING</span>
                <span>•</span>
                <span>SUB-9G TITANIUM</span>
              </div>
            </div>

            {/* Viewport Centerpiece: Telemetry & Specs */}
            <div className="py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
              
              {/* Left Column: Metric Cards */}
              <div className="text-left space-y-2.5 max-w-xs z-10">
                <div className="inline-block px-2.5 py-0.5 rounded-full apple-glass text-apple-blue-light font-mono text-[10px]">
                  100% CLINICAL ACCURACY
                </div>
                <h3 className="text-xl sm:text-2xl text-white font-bold leading-tight">
                  Hospital-Grade Vision Calibration
                </h3>
                <p className="text-xs text-apple-subtext leading-relaxed">
                  Direct ground-floor link to Global Eye Hospital ophthalmologists ensures your focal corridor is calibrated to fractions of a millimeter.
                </p>
              </div>

              {/* Center Graphic */}
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-apple-blue/20 animate-spin-slow" />
                <div className="absolute inset-4 rounded-full border border-white/10" />
                <div className="relative text-center z-10">
                  <span className="text-3xl sm:text-4xl font-bold font-mono text-white block">
                    60-70%
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-apple-subtext font-mono">
                    Lens Specialisation
                  </span>
                </div>
              </div>

              {/* Right Column: Key Differentiators */}
              <div className="text-left sm:text-right space-y-2.5 max-w-xs z-10">
                <div className="inline-block px-2.5 py-0.5 rounded-full apple-glass text-amber-400 font-mono text-[10px]">
                  TRANSITIONS® GEN S™
                </div>
                <h3 className="text-xl sm:text-2xl text-white font-bold leading-tight">
                  Dynamic Sunlight Shading
                </h3>
                <p className="text-xs text-apple-subtext leading-relaxed">
                  Lenses darken in seconds under outdoor UV sunlight, providing 100% UV400 sunglass protection without changing frames.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
