'use client';

import React, { useState } from 'react';
import { Eye, Shield, Sparkles, Sun, Moon, Laptop, Activity, Check, ArrowRight, Zap } from 'lucide-react';
import { createWhatsAppBookingLink } from '@/components/booking/WhatsAppSync';

interface LensLabProps {
  onOpenBooking: () => void;
  onOpenLensFinder: () => void;
}

export const InteractiveLensLab: React.FC<LensLabProps> = ({ onOpenBooking, onOpenLensFinder }) => {
  const [selectedTech, setSelectedTech] = useState<'digital' | 'progressive' | 'drivesafe' | 'photochromic' | 'myopia'>('digital');
  const [simulationActive, setSimulationActive] = useState<boolean>(true);
  const [uvExposure, setUvExposure] = useState<number>(85); // For photochromic slider

  return (
    <section id="lens-lab" className="py-24 bg-graphite/40 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-400/30 text-brand-300 text-xs font-mono tracking-wider mb-4">
              <Eye className="w-3.5 h-3.5" />
              <span>SECTION 06 // INTERACTIVE LENS LAB</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1]">
              The Optical Engineering{' '}
              <span className="text-teal-gradient italic font-light">Laboratory.</span>
            </h2>
          </div>

          <div className="text-left md:text-right">
            <span className="text-xs font-mono text-champagne-400 block mb-1">
              60–70% OF EYERIS CRAFT
            </span>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-sm">
              We engineer lenses around your prescription, posture, and screen habits—not just frame sales.
            </p>
          </div>
        </div>

        {/* Tech Selection Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          <button
            onClick={() => setSelectedTech('digital')}
            className={`p-4 rounded-2xl text-left border transition-all duration-200 ${
              selectedTech === 'digital'
                ? 'bg-brand-500/15 border-brand-400 text-white shadow-[0_0_25px_rgba(0,196,159,0.25)]'
                : 'bg-surface/70 border-white/5 text-neutral-400 hover:text-white hover:bg-surface'
            }`}
          >
            <Laptop className={`w-5 h-5 mb-2 ${selectedTech === 'digital' ? 'text-brand-300' : 'text-neutral-500'}`} />
            <p className="text-xs font-mono tracking-wider text-brand-300">IT & CODE WORK</p>
            <h4 className="text-sm font-semibold text-white mt-1">Digital BlueProtect</h4>
          </button>

          <button
            onClick={() => setSelectedTech('progressive')}
            className={`p-4 rounded-2xl text-left border transition-all duration-200 ${
              selectedTech === 'progressive'
                ? 'bg-champagne-500/15 border-champagne-400 text-white shadow-[0_0_25px_rgba(185,154,104,0.25)]'
                : 'bg-surface/70 border-white/5 text-neutral-400 hover:text-white hover:bg-surface'
            }`}
          >
            <Sparkles className={`w-5 h-5 mb-2 ${selectedTech === 'progressive' ? 'text-champagne-400' : 'text-neutral-500'}`} />
            <p className="text-xs font-mono tracking-wider text-champagne-400">AGE 35+ PRESBYOPIA</p>
            <h4 className="text-sm font-semibold text-white mt-1">Freeform Progressives</h4>
          </button>

          <button
            onClick={() => setSelectedTech('drivesafe')}
            className={`p-4 rounded-2xl text-left border transition-all duration-200 ${
              selectedTech === 'drivesafe'
                ? 'bg-optic-blue/15 border-optic-blue text-white shadow-[0_0_25px_rgba(56,189,248,0.25)]'
                : 'bg-surface/70 border-white/5 text-neutral-400 hover:text-white hover:bg-surface'
            }`}
          >
            <Moon className={`w-5 h-5 mb-2 ${selectedTech === 'drivesafe' ? 'text-optic-blue' : 'text-neutral-500'}`} />
            <p className="text-xs font-mono tracking-wider text-optic-blue">NIGHT COMMUTE</p>
            <h4 className="text-sm font-semibold text-white mt-1">ZEISS DriveSafe</h4>
          </button>

          <button
            onClick={() => setSelectedTech('photochromic')}
            className={`p-4 rounded-2xl text-left border transition-all duration-200 ${
              selectedTech === 'photochromic'
                ? 'bg-gold-500/15 border-gold-400 text-white shadow-[0_0_25px_rgba(245,158,11,0.25)]'
                : 'bg-surface/70 border-white/5 text-neutral-400 hover:text-white hover:bg-surface'
            }`}
          >
            <Sun className={`w-5 h-5 mb-2 ${selectedTech === 'photochromic' ? 'text-gold-400' : 'text-neutral-500'}`} />
            <p className="text-xs font-mono tracking-wider text-gold-400">INDOOR / OUTDOOR</p>
            <h4 className="text-sm font-semibold text-white mt-1">Transitions® Gen S</h4>
          </button>

          <button
            onClick={() => setSelectedTech('myopia')}
            className={`p-4 rounded-2xl text-left border transition-all duration-200 ${
              selectedTech === 'myopia'
                ? 'bg-optic-purple/15 border-optic-purple text-white shadow-[0_0_25px_rgba(168,85,247,0.25)]'
                : 'bg-surface/70 border-white/5 text-neutral-400 hover:text-white hover:bg-surface'
            }`}
          >
            <Activity className={`w-5 h-5 mb-2 ${selectedTech === 'myopia' ? 'text-optic-purple' : 'text-neutral-500'}`} />
            <p className="text-xs font-mono tracking-wider text-optic-purple">PEDIATRIC HEALTH</p>
            <h4 className="text-sm font-semibold text-white mt-1">Myopia Management</h4>
          </button>
        </div>

        {/* Live Interactive Simulation Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-surface rounded-3xl border border-white/10 p-6 sm:p-10 relative overflow-hidden">
          
          {/* Left Column: Visual Simulator Display */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-neutral-400 tracking-wider">
                  OPTICAL SIMULATION DEMO // {selectedTech.toUpperCase()}
                </span>
                
                {/* Simulation Toggle Switch */}
                <button
                  onClick={() => setSimulationActive(!simulationActive)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                    simulationActive
                      ? 'bg-brand-500/20 text-brand-300 border border-brand-400/40'
                      : 'bg-neutral-800 text-neutral-400 border border-white/10'
                  }`}
                >
                  <Zap className={`w-3.5 h-3.5 ${simulationActive ? 'text-brand-400 fill-brand-400' : ''}`} />
                  <span>{simulationActive ? 'EYERIS COATING: ACTIVE' : 'UNCOATED: RAW LENS'}</span>
                </button>
              </div>

              {/* Viewport Canvas Screen */}
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/15 bg-black flex items-center justify-center p-6 text-center">
                
                {/* Simulation Mode: Digital BlueProtect */}
                {selectedTech === 'digital' && (
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    {/* Simulated Code / Terminal Screen in background */}
                    <div className="absolute inset-2 rounded-xl bg-neutral-950 p-4 font-mono text-[11px] text-left overflow-hidden border border-white/5 opacity-80">
                      <p className="text-brand-400">// High-Frequency 415-455nm Blue-Violet Spectrum</p>
                      <p className="text-neutral-400">const eyeFatigueIndex = analyzeCiliaryStrain();</p>
                      <p className="text-champagne-300">if (screenHours &gt; 8) dispatchAccommodativeBoost();</p>
                      <p className="text-neutral-500">// Hydrophobic Oleophobic AR Nanocoating layer enabled</p>
                    </div>

                    {/* Lens Overlay */}
                    <div
                      className={`relative z-10 w-48 h-48 rounded-full border-2 transition-all duration-500 flex flex-col items-center justify-center backdrop-blur-xs ${
                        simulationActive
                          ? 'border-brand-400 bg-brand-500/10 shadow-[0_0_35px_rgba(0,196,159,0.3)]'
                          : 'border-blue-400/30 bg-blue-500/25'
                      }`}
                    >
                      <span className="text-xs font-mono font-bold text-white">
                        {simulationActive ? 'BLUE SPIKE FILTERED' : 'EXCESSIVE BLUE GLARE'}
                      </span>
                      <span className="text-[10px] text-brand-300 font-mono mt-1">
                        {simulationActive ? 'Zero Color Distortion • 99.6% Clarity' : 'Ciliary Muscle Fatigue'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Simulation Mode: Progressive Freeform */}
                {selectedTech === 'progressive' && (
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    <div className="w-56 h-full flex flex-col justify-between py-4 text-xs font-mono">
                      <div className={`p-2.5 rounded-xl border text-center transition-all ${simulationActive ? 'bg-champagne-500/20 border-champagne-400 text-white' : 'bg-surface border-white/10 text-neutral-400'}`}>
                        DISTANCE ZONE (Driving & Walking)
                      </div>
                      <div className="h-10 flex items-center justify-center text-[10px] text-brand-400">
                        ↓ WIDE INTERMEDIATE CORRIDOR (Laptop & Desk) ↓
                      </div>
                      <div className={`p-2.5 rounded-xl border text-center transition-all ${simulationActive ? 'bg-brand-500/20 border-brand-400 text-white' : 'bg-surface border-white/10 text-neutral-400'}`}>
                        NEAR VISION ZONE (Mobile & Reading)
                      </div>
                    </div>
                  </div>
                )}

                {/* Simulation Mode: ZEISS DriveSafe */}
                {selectedTech === 'drivesafe' && (
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black" />
                    
                    {/* Simulated oncoming headlight glare */}
                    <div
                      className={`relative z-10 rounded-full transition-all duration-500 flex items-center justify-center ${
                        simulationActive
                          ? 'w-24 h-24 bg-optic-blue/30 blur-md border border-optic-blue text-white'
                          : 'w-44 h-44 bg-yellow-100/70 blur-2xl text-slate-900'
                      }`}
                    />
                    <div className="relative z-20 mt-4 text-xs font-mono text-white">
                      {simulationActive ? 'Glare Reduced by up to 64% • Safe Night Driving' : 'Dangerous LED Glare & Halo Effect'}
                    </div>
                  </div>
                )}

                {/* Simulation Mode: Transitions Gen S */}
                {selectedTech === 'photochromic' && (
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    <div
                      style={{
                        backgroundColor: simulationActive
                          ? `rgba(20, 20, 25, ${uvExposure / 100})`
                          : 'rgba(255, 255, 255, 0.05)',
                      }}
                      className="w-56 h-36 rounded-2xl border border-gold-400/40 transition-all duration-300 flex flex-col items-center justify-center shadow-lg"
                    >
                      <span className="text-xs font-mono font-bold text-white">
                        {uvExposure > 50 ? 'OUTDOOR SUNGLASS TINT' : 'INDOOR CRYSTAL CLARITY'}
                      </span>
                      <span className="text-[10px] text-champagne-300 font-mono mt-1">
                        UV Absorption: {uvExposure}%
                      </span>
                    </div>

                    <div className="w-64 mt-4 flex items-center gap-3">
                      <span className="text-[10px] font-mono text-neutral-400">Indoor</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={uvExposure}
                        onChange={(e) => setUvExposure(Number(e.target.value))}
                        className="w-full accent-champagne-500 cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-champagne-400">Sunlight</span>
                    </div>
                  </div>
                )}

                {/* Simulation Mode: Myopia Control */}
                {selectedTech === 'myopia' && (
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    <div className="w-52 h-52 rounded-full border-2 border-dashed border-optic-purple/60 flex items-center justify-center relative">
                      <div className="w-24 h-24 rounded-full bg-optic-purple/20 border border-optic-purple flex items-center justify-center text-center">
                        <span className="text-[10px] font-mono text-white">CENTRAL CLEAR FOCUS</span>
                      </div>
                      <span className="absolute bottom-2 text-[9px] font-mono text-optic-purple">
                        PERIPHERAL MYOPIC DEFOCUS RING
                      </span>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Technical Index Strip */}
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs font-mono text-neutral-400">
              <span>AVAILABLE INDEXES: 1.50 • 1.60 THIN • 1.67 ULTRA-THIN • 1.74 HI-INDEX</span>
              <span className="text-brand-300">100% UV400 PROTECTED</span>
            </div>
          </div>

          {/* Right Column: Educational Breakdown & Prescription Action */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {selectedTech === 'digital' && (
              <div className="space-y-4">
                <span className="text-xs font-mono text-brand-300">FOR IT WORKERS & DEVELOPERS</span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white font-bold">
                  Digital Relax & Blue-Block Pro
                </h3>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  Engineered specifically for tech workers in KPHB and HITEC City spending 8+ hours on IDEs and dual displays. Incorporates a micro-accommodative boost (+0.40D to +0.80D) that relieves ciliary spasm and stops evening migraines.
                </p>
                <div className="space-y-2 pt-1 text-xs text-neutral-200">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-400" /> Filters harmful 415-455nm blue spike</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-400" /> No sickly yellow tint or color distortion</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-400" /> Fully claimable under IT optical allowances</div>
                </div>
              </div>
            )}

            {selectedTech === 'progressive' && (
              <div className="space-y-4">
                <span className="text-xs font-mono text-champagne-400">NATURAL MULTI-FOCAL SIGHT</span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white font-bold">
                  Personalized Digital Progressives
                </h3>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  Zero visible lines. Unlike older bifocals, modern German freeform technology models your exact eye rotation centers and posture to guarantee seamless clarity from your smartphone to your car dashboard.
                </p>
                <div className="space-y-2 pt-1 text-xs text-neutral-200">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-champagne-400" /> Zero "swim" distortion when walking down stairs</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-champagne-400" /> Instant 48-hour adaptation guarantee</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-champagne-400" /> Free in-store trial with trial lenses</div>
                </div>
              </div>
            )}

            {selectedTech === 'drivesafe' && (
              <div className="space-y-4">
                <span className="text-xs font-mono text-optic-blue">COMMUTE SAFETY</span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white font-bold">
                  ZEISS DriveSafe Optics
                </h3>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  Hyderabad's aggressive high-beam LED traffic causes blinding pupil constriction. ZEISS DriveSafe lenses incorporate Luminance Design® technology to give high contrast in low-light and rainy conditions.
                </p>
                <div className="space-y-2 pt-1 text-xs text-neutral-200">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-optic-blue" /> Up to 64% glare reduction from oncoming traffic</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-optic-blue" /> Rapid focal shift between road, GPS & mirrors</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-optic-blue" /> All-day all-weather clear prescription lens</div>
                </div>
              </div>
            )}

            {selectedTech === 'photochromic' && (
              <div className="space-y-4">
                <span className="text-xs font-mono text-gold-400">SMART ADAPTIVE TINT</span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white font-bold">
                  Adaptive Transitions® Gen S
                </h3>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  One pair of glasses for your entire day. Clear as crystal under indoor LED lights, darkening within seconds of stepping out into bright Hyderabad sunlight. Available in Sapphire, Emerald, Amber, and Graphite Green.
                </p>
                <div className="space-y-2 pt-1 text-xs text-neutral-200">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-gold-400" /> Darkens in &lt;25 seconds outdoors</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-gold-400" /> Returns completely clear indoors in ~2 minutes</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-gold-400" /> 100% UVA & UVB blocking</div>
                </div>
              </div>
            )}

            {selectedTech === 'myopia' && (
              <div className="space-y-4">
                <span className="text-xs font-mono text-optic-purple">PEDIATRIC PROTECTION</span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white font-bold">
                  Pediatric Myopia Management
                </h3>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  Clinically proven optical defocus technology that slows axial eye elongation in children aged 6–16 with rapidly climbing power numbers. Fitted in impact-resistant Trivex for physical playground safety.
                </p>
                <div className="space-y-2 pt-1 text-xs text-neutral-200">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-optic-purple" /> Decelerates power increase significantly</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-optic-purple" /> Shatterproof polycarbonate safety certification</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-optic-purple" /> Supervised by Global Eye Hospital pediatricians</div>
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={onOpenLensFinder}
                className="w-full py-3.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs font-mono tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <span>RUN INTERACTIVE LENS FINDER</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenBooking}
                className="w-full py-3 rounded-xl bg-surface hover:bg-surface-hover border border-white/15 text-neutral-200 hover:text-white font-mono text-xs tracking-wider transition-all"
              >
                BOOK FREE IN-STORE TRIAL
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
