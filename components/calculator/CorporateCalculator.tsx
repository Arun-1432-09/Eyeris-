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
    <section id="calculator" className="relative py-24 sm:py-32 bg-[#FBFBFD] text-black border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header: Short, Clear, Apple Minimal */}
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200 text-apple-subtext text-xs font-mono uppercase tracking-wider mb-4 shadow-apple-sm">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Hyderabad IT Corridor Benefit</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-black tracking-tight leading-tight">
              Claim Your ₹20,000{' '}
              <span className="text-neutral-500 font-light block sm:inline">
                Optical Allowance.
              </span>
            </h2>
            <p className="text-apple-subtext text-sm sm:text-base mt-3">
              Configure your setup for 100% corporate insurance reimbursement with itemized hospital GST bills and zero out-of-pocket cost.
            </p>
          </div>
        </ScrollReveal>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 cols) */}
          <ScrollReveal animation="fade-up" delay={0.1} className="lg:col-span-7">
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-apple-sm space-y-6">
              <h3 className="text-base font-bold text-black flex items-center gap-2 pb-3 border-b border-neutral-200">
                <Calculator className="w-4 h-4 text-black" />
                <span>Configure Visual Workload Profile</span>
              </h3>

              {/* Daily Screen Hours */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-medium text-apple-text flex items-center gap-2">
                    <Laptop className="w-3.5 h-3.5 text-black" />
                    <span>Daily Screen Time (Coding / Calls / Laptops):</span>
                  </label>
                  <span className="text-xs font-bold text-black bg-neutral-100 px-2.5 py-0.5 rounded-md border border-neutral-200 font-mono">
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
                  className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
                <div className="flex justify-between text-[10px] text-apple-subtext mt-1 font-mono">
                  <span>4 hrs (Casual)</span>
                  <span>8-10 hrs (Standard Dev)</span>
                  <span>14+ hrs (Heavy Sprints)</span>
                </div>
              </div>

              {/* Night Driving & Headlight Glare Toggle */}
              <div className="p-4 rounded-2xl bg-[#FBFBFD] border border-neutral-200 flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-neutral-100 border border-neutral-200 text-black shrink-0 mt-0.5">
                    <Moon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-black">Night Commute &amp; LED High-Beam Glare?</p>
                    <p className="text-[11px] text-apple-subtext">Adds ZEISS DriveSafe reflection reduction for night highway driving.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setHasNightDriving(!hasNightDriving)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    hasNightDriving ? 'bg-black' : 'bg-neutral-300'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out ${
                      hasNightDriving ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Age Profile */}
              <div>
                <label className="block text-xs font-medium text-apple-text mb-2">
                  Age &amp; Focus Requirements:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAgeGroup('under35')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      ageGroup === 'under35'
                        ? 'bg-black text-white border-black shadow-apple-sm'
                        : 'bg-[#FBFBFD] border-neutral-200 text-apple-subtext hover:text-black hover:border-neutral-300'
                    }`}
                  >
                    <p className="text-xs font-bold">Under 35 Years</p>
                    <p className={`text-[10px] mt-0.5 ${ageGroup === 'under35' ? 'text-neutral-300' : 'text-apple-subtext'}`}>
                      Single-vision digital relax &amp; blue-cut
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAgeGroup('above35')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      ageGroup === 'above35'
                        ? 'bg-black text-white border-black shadow-apple-sm'
                        : 'bg-[#FBFBFD] border-neutral-200 text-apple-subtext hover:text-black hover:border-neutral-300'
                    }`}
                  >
                    <p className="text-xs font-bold">35+ Years (Progressive)</p>
                    <p className={`text-[10px] mt-0.5 ${ageGroup === 'above35' ? 'text-neutral-300' : 'text-apple-subtext'}`}>
                      Seamless near, computer &amp; distance
                    </p>
                  </button>
                </div>
              </div>

              {/* Frame Brand Tier */}
              <div>
                <label className="block text-xs font-medium text-apple-text mb-2">
                  Preferred Frame Tier:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPreferredBrandTier('premium')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      preferredBrandTier === 'premium'
                        ? 'bg-black text-white border-black shadow-apple-sm'
                        : 'bg-[#FBFBFD] border-neutral-200 text-apple-subtext hover:text-black hover:border-neutral-300'
                    }`}
                  >
                    <p className="text-xs font-bold">Ray-Ban / Oakley</p>
                    <p className={`text-[10px] mt-0.5 ${preferredBrandTier === 'premium' ? 'text-neutral-300' : 'text-apple-subtext'}`}>
                      Iconic lifestyle &amp; active tech
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPreferredBrandTier('luxury')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      preferredBrandTier === 'luxury'
                        ? 'bg-black text-white border-black shadow-apple-sm'
                        : 'bg-[#FBFBFD] border-neutral-200 text-apple-subtext hover:text-black hover:border-neutral-300'
                    }`}
                  >
                    <p className="text-xs font-bold">Prada / Stepper Titanium</p>
                    <p className={`text-[10px] mt-0.5 ${preferredBrandTier === 'luxury' ? 'text-neutral-300' : 'text-apple-subtext'}`}>
                      Milanese couture &amp; sub-8.6g titanium
                    </p>
                  </button>
                </div>
              </div>

              {/* Corporate Allowance Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-medium text-apple-text flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-black" />
                    <span>Company Allowance / Annual Policy Limit:</span>
                  </label>
                  <span className="text-xs font-bold text-black font-mono">
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
                  className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
                <div className="flex justify-between text-[10px] text-apple-subtext mt-1 font-mono">
                  <span>₹5,000</span>
                  <span className="text-black font-semibold">₹20,000 (Average Tech Limit)</span>
                  <span>₹30,000+</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Results Card (5 cols) */}
          <ScrollReveal animation="fade-up" delay={0.2} className="lg:col-span-5">
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-apple-md relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-5">
                <span className="text-xs font-mono uppercase tracking-wider text-black font-bold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-black" />
                  <span>Calculated Package</span>
                </span>
                <span className="text-[10px] bg-neutral-100 text-black px-2.5 py-0.5 rounded-full border border-neutral-200 font-mono font-semibold">
                  100% GST Claimable
                </span>
              </div>

              {/* Recommended Combo */}
              <div className="space-y-3 mb-5">
                <div className="p-4 rounded-2xl bg-[#FBFBFD] border border-neutral-200">
                  <p className="text-[10px] text-apple-subtext uppercase tracking-wider font-mono">Recommended Frame</p>
                  <p className="text-sm font-bold text-black mt-0.5">{recommendedFrame}</p>
                  <p className="text-xs text-neutral-500 mt-0.5 font-mono">Est. Value: ₹{baseFrameCost.toLocaleString('en-IN')}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FBFBFD] border border-neutral-200">
                  <p className="text-[10px] text-apple-subtext uppercase tracking-wider font-mono">Prescription Optics</p>
                  <p className="text-sm font-bold text-black mt-0.5">{recommendedLens}</p>
                  <ul className="mt-2 space-y-1 text-[11px] text-apple-subtext">
                    {lensHighlights.map((hl, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-black shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-neutral-500 mt-1.5 font-mono">Est. Value: ₹{lensCost.toLocaleString('en-IN')}</p>
                </div>
              </div>

              {/* Financial Summary */}
              <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-neutral-200 space-y-2 mb-5">
                <div className="flex justify-between text-xs text-apple-subtext">
                  <span>Total Combined Package:</span>
                  <span className="font-mono text-black font-medium">₹{totalPackageCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs text-apple-subtext">
                  <span>Covered by Corporate Policy:</span>
                  <span className="font-mono text-black font-medium">- ₹{corporateCovered.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t border-neutral-300 flex justify-between items-baseline">
                  <span className="text-xs font-bold text-black">Net Out-of-Pocket:</span>
                  <span className={`text-lg font-bold font-mono ${outOfPocket === 0 ? 'text-emerald-600' : 'text-black'}`}>
                    {outOfPocket === 0 ? '₹0 (100% Reimbursed)' : `₹${outOfPocket.toLocaleString('en-IN')}`}
                  </span>
                </div>
              </div>

              {/* Itemized Invoice Note */}
              <div className="flex items-start gap-2 text-[11px] text-apple-subtext mb-5 bg-[#FBFBFD] p-3 rounded-xl border border-neutral-200">
                <FileText className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                <span>
                  Includes itemized GST medical prescription bill with Global Eye Hospital partner stamp for direct HR/insurance desk clearance.
                </span>
              </div>

              {/* Action CTA */}
              <button
                onClick={handleBookPackage}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-black hover:bg-neutral-800 text-white font-medium text-xs tracking-wide shadow-apple-sm transition active:scale-95"
              >
                <span>Book VIP Slot with this Package</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
