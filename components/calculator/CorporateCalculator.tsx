'use client';

import React, { useState } from 'react';
import { Calculator, ShieldCheck, Check, Sparkles, ArrowRight, Zap, Laptop, Moon, FileText } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface CorporateCalculatorProps {
  onOpenBookingWithPackage: (packageDetails: string) => void;
}

export const CorporateCalculator: React.FC<CorporateCalculatorProps> = ({ onOpenBookingWithPackage }) => {
  const [screenHours, setScreenHours] = useState<number>(9);
  const [hasNightDriving, setHasNightDriving] = useState<boolean>(true);
  const [ageGroup, setAgeGroup] = useState<'under35' | 'above35'>('under35');
  const [corporateAllowance, setCorporateAllowance] = useState<number>(20000);
  const [preferredBrandTier, setPreferredBrandTier] = useState<'premium' | 'luxury'>('premium');

  // Dynamic calculations based on user input
  const baseFrameCost = preferredBrandTier === 'premium' ? 8500 : 14500;
  
  let lensCost = 6500;
  let recommendedLens = "ZEISS BlueProtect Pro (1.67 High-Index)";
  let lensHighlights = ["Anti-reflective hydro coating", "Reduces screen headache & digital dry-eye"];

  if (ageGroup === 'above35') {
    lensCost += 6000;
    recommendedLens = "German Freeform Progressive + BlueProtect";
    lensHighlights = ["No demarcation lines", "Smooth focal shift between screen and reading distances"];
  }

  if (hasNightDriving) {
    lensCost += 3500;
    recommendedLens += " + ZEISS DriveSafe Night Anti-Glare";
    lensHighlights.push("64% perceived reduction in oncoming LED headlight glare");
  }

  const totalPackageCost = baseFrameCost + lensCost;
  const corporateCovered = Math.min(totalPackageCost, corporateAllowance);
  const outOfPocket = Math.max(0, totalPackageCost - corporateAllowance);

  const recommendedFrame = preferredBrandTier === 'premium' 
    ? "Ray-Ban / Oakley O-Matter™" 
    : "Prada Milano / Stepper Pure Titanium";

  const handleBookPackage = () => {
    const packageSummary = `Corporate Package: ${recommendedFrame} with ${recommendedLens} (Total: ₹${totalPackageCost.toLocaleString('en-IN')}, Corporate Allowance: ₹${corporateAllowance.toLocaleString('en-IN')})`;
    onOpenBookingWithPackage(packageSummary);
  };

  return (
    <section id="calculator" className="relative py-20 bg-background border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header: Short, Clear, Minimal */}
        <ScrollReveal variant="fadeUp" className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-mono uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>IT Corridor Optical Benefit</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Claim Your ₹20,000{' '}
            <span className="bg-gradient-to-r from-gold-300 to-amber-200 bg-clip-text text-transparent">
              Corporate Allowance.
            </span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2">
            Most tech companies in Hyderabad provide ₹15,000–₹25,000 annual optical insurance. Configure your setup for 100% reimbursement with zero out-of-pocket cost.
          </p>
        </ScrollReveal>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 cols) */}
          <ScrollReveal variant="fadeUp" delay={0.1} className="lg:col-span-7 bg-surface/90 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-serif pb-3 border-b border-white/10">
              <Calculator className="w-4 h-4 text-brand-400" />
              <span>Configure Your Daily Visual Profile</span>
            </h3>

            {/* Daily Screen Hours */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-medium text-neutral-300 flex items-center gap-2">
                  <Laptop className="w-3.5 h-3.5 text-brand-400" />
                  <span>Daily Screen Time (Coding / Calls / Laptops):</span>
                </label>
                <span className="text-xs font-bold text-brand-300 bg-brand-500/10 px-2 py-0.5 rounded-md border border-brand-500/30 font-mono">
                  {screenHours} Hours / Day
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="14"
                step="1"
                value={screenHours}
                onChange={(e) => setScreenHours(parseInt(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand-400"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                <span>4 hrs (Casual)</span>
                <span>8-10 hrs (Standard Dev)</span>
                <span>14+ hrs (Heavy Sprints)</span>
              </div>
            </div>

            {/* Night Driving & Headlight Glare Toggle */}
            <div className="p-3.5 rounded-2xl bg-surface-raised border border-white/5 flex items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-xl bg-optic-blue/10 border border-optic-blue/20 text-optic-blue shrink-0 mt-0.5">
                  <Moon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Night Commute &amp; High-Beam Glare?</p>
                  <p className="text-[11px] text-neutral-400">Adds ZEISS DriveSafe reflection reduction for night driving in Hyderabad.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setHasNightDriving(!hasNightDriving)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                  hasNightDriving ? 'bg-brand-500' : 'bg-neutral-700'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out ${
                    hasNightDriving ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Age Profile */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-2">
                Age &amp; Focus Requirements:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAgeGroup('under35')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    ageGroup === 'under35'
                      ? 'bg-brand-950/60 border-brand-400 text-white shadow-md'
                      : 'bg-surface-raised border-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  <p className="text-xs font-bold font-serif">Under 35 Years</p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">Single-vision digital relax &amp; blue-cut</p>
                </button>

                <button
                  type="button"
                  onClick={() => setAgeGroup('above35')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    ageGroup === 'above35'
                      ? 'bg-brand-950/60 border-brand-400 text-white shadow-md'
                      : 'bg-surface-raised border-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  <p className="text-xs font-bold font-serif">35+ Years (Progressive)</p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">Seamless near, computer &amp; distance</p>
                </button>
              </div>
            </div>

            {/* Frame Brand Tier */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-2">
                Preferred Frame Brand Category:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPreferredBrandTier('premium')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    preferredBrandTier === 'premium'
                      ? 'bg-surface-raised border-gold-400 text-white'
                      : 'bg-surface-raised/50 border-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  <p className="text-xs font-bold text-gold-300 font-serif">Ray-Ban / Oakley</p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">Iconic lifestyle &amp; active tech</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPreferredBrandTier('luxury')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    preferredBrandTier === 'luxury'
                      ? 'bg-surface-raised border-gold-400 text-white'
                      : 'bg-surface-raised/50 border-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  <p className="text-xs font-bold text-gold-300 font-serif">Prada / Stepper Titanium</p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">Haute couture &amp; sub-9g titanium</p>
                </button>
              </div>
            </div>

            {/* Corporate Allowance Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                  <span>Company Insurance Allowance / Budget:</span>
                </label>
                <span className="text-xs font-bold text-gold-300 font-mono">
                  ₹{corporateAllowance.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="30000"
                step="2500"
                value={corporateAllowance}
                onChange={(e) => setCorporateAllowance(parseInt(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-gold-400"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                <span>₹5,000</span>
                <span className="text-gold-400 font-medium">₹20,000 (Average Tech Limit)</span>
                <span>₹30,000+</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Results Card (5 cols) */}
          <ScrollReveal variant="fadeUp" delay={0.2} className="lg:col-span-5 bg-gradient-to-b from-surface-raised via-surface to-surface-raised border border-brand-500/30 rounded-3xl p-6 sm:p-7 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-5">
              <span className="text-xs font-mono uppercase tracking-wider text-brand-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-brand-400" />
                <span>Tailored Package</span>
              </span>
              <span className="text-[10px] bg-brand-500/20 text-brand-300 px-2.5 py-0.5 rounded-full border border-brand-500/30 font-medium font-mono">
                100% GST Claimable
              </span>
            </div>

            {/* Recommended Combo */}
            <div className="space-y-3 mb-5">
              <div className="p-3.5 rounded-2xl bg-surface/80 border border-white/10">
                <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono">Recommended Frame</p>
                <p className="text-sm font-bold text-white font-serif mt-0.5">{recommendedFrame}</p>
                <p className="text-xs text-brand-300 mt-0.5 font-mono">Est. Value: ₹{baseFrameCost.toLocaleString('en-IN')}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-surface/80 border border-white/10">
                <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono">Prescription Optics</p>
                <p className="text-sm font-bold text-white font-serif mt-0.5">{recommendedLens}</p>
                <ul className="mt-1.5 space-y-1 text-[11px] text-neutral-300">
                  {lensHighlights.map((hl, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-brand-400 shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-brand-300 mt-1.5 font-mono">Est. Value: ₹{lensCost.toLocaleString('en-IN')}</p>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="p-4 rounded-2xl bg-brand-950/40 border border-brand-500/30 space-y-2 mb-5">
              <div className="flex justify-between text-xs text-neutral-300">
                <span>Total Combined Package:</span>
                <span className="font-mono text-white">₹{totalPackageCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs text-brand-300 font-medium">
                <span>Covered by Corporate Policy:</span>
                <span className="font-mono">- ₹{corporateCovered.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-2 border-t border-brand-500/20 flex justify-between items-baseline">
                <span className="text-xs font-bold text-white">Net Out-of-Pocket:</span>
                <span className={`text-lg font-extrabold font-mono ${outOfPocket === 0 ? 'text-brand-300' : 'text-gold-300'}`}>
                  {outOfPocket === 0 ? '₹0 (100% Covered)' : `₹${outOfPocket.toLocaleString('en-IN')}`}
                </span>
              </div>
            </div>

            {/* Itemized Invoice Note */}
            <div className="flex items-start gap-2 text-[11px] text-neutral-400 mb-5 bg-surface/40 p-2.5 rounded-xl border border-white/5">
              <FileText className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
              <span>
                Includes GST medical prescription bill &amp; Global Eye Hospital partner stamp for direct HR/insurance desk clearance.
              </span>
            </div>

            {/* Action CTA */}
            <button
              onClick={handleBookPackage}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-brand-400 to-brand-500 hover:from-brand-300 hover:to-brand-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
            >
              <span>Book VIP Slot with this Package</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
