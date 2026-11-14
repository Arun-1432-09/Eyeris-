'use client';

import React, { useState } from 'react';
import { Calculator, ShieldCheck, Check, Sparkles, ArrowRight, Zap, Laptop, Moon, FileText } from 'lucide-react';
import { generateWhatsAppBookingUrl } from '@/components/booking/WhatsAppSync';

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
  let recommendedLens = "Digital Blue-Block Pro (1.67 High-Index)";
  let lensHighlights = ["Anti-reflective hydro coating", "Reduces screen headache & digital dry-eye"];

  if (ageGroup === 'above35') {
    lensCost += 6000;
    recommendedLens = "Digital Freeform Progressive + BlueProtect";
    lensHighlights = ["No demarcation lines", "Smooth focal shift between screen and reading distances"];
  }

  if (hasNightDriving) {
    lensCost += 3500;
    recommendedLens += " + DriveSafe Night Anti-Glare";
    lensHighlights.push("64% perceived reduction in oncoming LED headlight glare");
  }

  const totalPackageCost = baseFrameCost + lensCost;
  const corporateCovered = Math.min(totalPackageCost, corporateAllowance);
  const outOfPocket = Math.max(0, totalPackageCost - corporateAllowance);

  const recommendedFrame = preferredBrandTier === 'premium' 
    ? "Ray-Ban / Oakley O-Matter™ Titanium" 
    : "Prada Milano / Stepper Pure Titanium";

  const handleBookPackage = () => {
    const packageSummary = `Corporate Package: ${recommendedFrame} with ${recommendedLens} (Total: ₹${totalPackageCost.toLocaleString('en-IN')}, Corporate Allowance: ₹${corporateAllowance.toLocaleString('en-IN')})`;
    onOpenBookingWithPackage(packageSummary);
  };

  return (
    <section id="calculator" className="relative py-20 bg-surface-raised/40 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-mono uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>IT Corridor Optical Benefit Maximizer</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white mb-4">
            Corporate Optical <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-amber-200 bg-clip-text text-transparent">Benefit Calculator</span>
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            Working in Hyderabad tech hubs (Hitec City, Madhapur, Financial District, KPHB)? 
            Most companies provide <strong className="text-white">₹15,000–₹25,000</strong> annual optical reimbursement. 
            Configure your setup to utilize 100% of your insurance benefit.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 bg-surface/90 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 font-display pb-3 border-b border-white/10">
              <Calculator className="w-5 h-5 text-brand-400" />
              <span>Step 1: Your Daily Screen & Lifestyle Profile</span>
            </h3>

            {/* Daily Screen Hours */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-brand-400" />
                  <span>Daily Screen Time (Coding / Calls / Laptops):</span>
                </label>
                <span className="text-sm font-bold text-brand-300 bg-brand-500/10 px-2.5 py-0.5 rounded-md border border-brand-500/30 font-mono">
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
              <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
                <span>4 hrs (Casual)</span>
                <span>8-10 hrs (Standard IT Dev)</span>
                <span>14+ hrs (Heavy Sprints)</span>
              </div>
            </div>

            {/* Night Driving & Headlight Glare Toggle */}
            <div className="p-4 rounded-2xl bg-surface-raised border border-white/5 flex items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-optic-blue/10 border border-optic-blue/20 text-optic-blue shrink-0 mt-0.5">
                  <Moon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Night Commute / LED High-Beam Glare?</p>
                  <p className="text-xs text-neutral-400">Hyderabad traffic requires high-contrast ZEISS DriveSafe reflection reduction.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setHasNightDriving(!hasNightDriving)}
                className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  hasNightDriving ? 'bg-brand-500' : 'bg-neutral-700'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    hasNightDriving ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Age Profile & Vision Requirements */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Age & Visual Accommodation Profile:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAgeGroup('under35')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    ageGroup === 'under35'
                      ? 'bg-brand-950/60 border-brand-400 text-white shadow-[0_0_15px_rgba(0,196,159,0.2)]'
                      : 'bg-surface-raised border-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  <p className="text-xs font-bold font-display">Under 35 Years</p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">Single-vision digital relax & blue-filtration</p>
                </button>

                <button
                  type="button"
                  onClick={() => setAgeGroup('above35')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    ageGroup === 'above35'
                      ? 'bg-brand-950/60 border-brand-400 text-white shadow-[0_0_15px_rgba(0,196,159,0.2)]'
                      : 'bg-surface-raised border-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  <p className="text-xs font-bold font-display">35+ Years (Progressive)</p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">Seamless near, computer & distance focus</p>
                </button>
              </div>
            </div>

            {/* Frame Brand Tier */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Preferred Designer Frame Category:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPreferredBrandTier('premium')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    preferredBrandTier === 'premium'
                      ? 'bg-surface-border border-gold-400/80 text-white'
                      : 'bg-surface-raised border-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  <p className="text-xs font-bold font-display text-gold-300">Ray-Ban / Oakley</p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">Iconic lifestyle & sports engineering</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPreferredBrandTier('luxury')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    preferredBrandTier === 'luxury'
                      ? 'bg-surface-border border-gold-400/80 text-white'
                      : 'bg-surface-raised border-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  <p className="text-xs font-bold font-display text-gold-300">Prada / Stepper Titanium</p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">High couture & medical featherweight</p>
                </button>
              </div>
            </div>

            {/* Corporate Allowance Slider */}
            <div className="pt-2">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-neutral-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-gold-400" />
                  <span>Your Company Optical Allowance / Budget:</span>
                </label>
                <span className="text-sm font-bold text-gold-300 font-mono">
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
              <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
                <span>₹5,000</span>
                <span className="text-gold-400 font-medium">₹20,000 (Average Tech Limit)</span>
                <span>₹30,000+</span>
              </div>
            </div>
          </div>

          {/* Results & Recommendation Card (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-surface-raised via-surface to-surface-raised border border-brand-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-brand-300 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-brand-400" />
                <span>Tailored Optical Prescription</span>
              </span>
              <span className="text-[11px] bg-brand-500/20 text-brand-300 px-2.5 py-0.5 rounded-full border border-brand-500/30 font-medium">
                100% Tax & Claim Compliant
              </span>
            </div>

            {/* Recommended Combo */}
            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-2xl bg-surface/80 border border-white/10">
                <p className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono">Recommended Designer Frame</p>
                <p className="text-base font-bold text-white font-display mt-0.5">{recommendedFrame}</p>
                <p className="text-xs text-brand-300 mt-1 font-mono">Est. Frame Value: ₹{baseFrameCost.toLocaleString('en-IN')}</p>
              </div>

              <div className="p-4 rounded-2xl bg-surface/80 border border-white/10">
                <p className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono">Specialized Prescription Lenses</p>
                <p className="text-base font-bold text-white font-display mt-0.5">{recommendedLens}</p>
                <ul className="mt-2 space-y-1 text-xs text-neutral-300">
                  {lensHighlights.map((hl, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-brand-300 mt-2 font-mono">Est. Lens Value: ₹{lensCost.toLocaleString('en-IN')}</p>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="p-5 rounded-2xl bg-brand-950/40 border border-brand-500/30 space-y-2.5 mb-6">
              <div className="flex justify-between text-xs text-neutral-300">
                <span>Total Combined Package Value:</span>
                <span className="font-mono text-white">₹{totalPackageCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs text-brand-300 font-medium">
                <span>Covered by Corporate Optical Policy:</span>
                <span className="font-mono">- ₹{corporateCovered.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-2 border-t border-brand-500/20 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Your Net Out-of-Pocket:</span>
                <span className={`text-xl font-extrabold font-mono ${outOfPocket === 0 ? 'text-brand-300' : 'text-gold-300'}`}>
                  {outOfPocket === 0 ? '₹0 (100% Reimbursable)' : `₹${outOfPocket.toLocaleString('en-IN')}`}
                </span>
              </div>
            </div>

            {/* Corporate Claim Guarantee Stamp */}
            <div className="flex items-start gap-2.5 text-xs text-neutral-400 mb-6 bg-surface/40 p-3 rounded-xl border border-white/5">
              <FileText className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
              <span>
                Includes GST itemized invoice, optometrist eye test report &amp; Global Eye Hospital partner stamp required by corporate insurance desks.
              </span>
            </div>

            {/* Action CTA */}
            <button
              onClick={handleBookPackage}
              className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-brand-400 to-brand-500 hover:from-brand-300 hover:to-brand-400 text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(0,196,159,0.35)] transition-all transform hover:-translate-y-0.5"
            >
              <span>Book VIP Slot with this Package</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
