'use client';

import React, { useState } from 'react';
import { X, Check, ArrowRight, ArrowLeft, Eye, Sparkles, ShieldAlert, Calendar, MessageCircle } from 'lucide-react';
import { createWhatsAppBookingLink } from '@/components/booking/WhatsAppSync';

interface LensFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

interface Answers {
  ageGroup: string;
  primaryNeed: string;
  screenTime: string;
  sunSensitivity: string;
  driving: string;
}

export const LensFinderModal: React.FC<LensFinderModalProps> = ({ isOpen, onClose, onOpenBooking }) => {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<Answers>({
    ageGroup: '18 – 35 years',
    primaryNeed: 'Digital eye fatigue & screen clarity (IT Developer / Professional)',
    screenTime: '8+ hours daily across multiple screens',
    sunSensitivity: 'Moderate outdoor commute & weekend glare',
    driving: 'Frequent night driving with high-beam LED headlight glare',
  });

  if (!isOpen) return null;

  const getRecommendations = () => {
    const isPresbyopic = answers.ageGroup.includes('36') || answers.ageGroup.includes('45+');
    const isHeavyScreen = answers.screenTime.includes('8+') || answers.primaryNeed.includes('Digital');
    const isNightDriver = answers.driving.includes('Frequent') || answers.driving.includes('high-beam');
    const isHighSun = answers.sunSensitivity.includes('High') || answers.sunSensitivity.includes('Sensitive');

    const recommended: Array<{
      title: string;
      category: string;
      why: string;
      badge: string;
    }> = [];

    if (isPresbyopic) {
      recommended.push({
        title: 'Personalized Freeform Progressive Lenses',
        category: 'Presbyopia Optical Architecture',
        why: 'Eliminates reading line barriers. Digital freeform calculations provide a seamless focal shift between laptop monitors, smartphone text, and room distance.',
        badge: 'Recommended for Age 35+',
      });
    }

    if (isHeavyScreen) {
      recommended.push({
        title: 'BlueProtect Digital Relax Optics',
        category: 'HEV 415–455nm Filtration',
        why: 'Filters high-energy blue-violet wavelengths emitted by LED backlights without skewing color accuracy, helping reduce ciliary muscle fatigue.',
        badge: 'IT & Developer Essential',
      });
    }

    if (isNightDriver) {
      recommended.push({
        title: 'ZEISS DriveSafe Luminance Optics',
        category: 'Anti-Glare High-Beam Filter',
        why: 'Minimizes perceived glare from oncoming modern LED and Xenon headlights, enhancing road contrast in rain and dusk conditions.',
        badge: 'Night Commute Pick',
      });
    }

    if (isHighSun) {
      recommended.push({
        title: 'Adaptive Photochromic Transitions®',
        category: 'Dynamic UV400 Matrix',
        why: 'Completely clear indoors, rapidly darkening to full Category-3 sunglasses within seconds of stepping into bright outdoor sunlight.',
        badge: 'All-Day Convenience',
      });
    }

    if (recommended.length === 0) {
      recommended.push({
        title: 'High-Definition Single-Vision Aspheric Lenses',
        category: 'Crisp Edge-to-Edge Clarity',
        why: 'Multi-layer anti-reflective and hydrophobic coating repels smudges while providing 99.6% light transmission.',
        badge: 'Everyday Standard',
      });
    }

    return recommended;
  };

  const recommendations = getRecommendations();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#101010] border border-[#292929] rounded-3xl p-6 sm:p-8 shadow-luxury-lg flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#292929] shrink-0">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-white" />
            <span className="font-mono text-sm tracking-wider uppercase font-bold text-white">
              5-Step Guided Lens Finder
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full border border-[#292929] text-[#A1A1A6] hover:text-white hover:bg-white/10 transition"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        {step <= 5 && (
          <div className="w-full bg-[#1C1C1C] h-1 rounded-full my-4 overflow-hidden shrink-0">
            <div
              className="bg-white h-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        )}

        {/* Scrollable Questions Body */}
        <div className="overflow-y-auto no-scrollbar py-2 flex-1">
          
          {/* STEP 1: Age Group */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#707070] tracking-[0.25em]">
                  STEP 01 OF 05 // AGE PROFILE
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  What is your age category?
                </h3>
                <p className="text-xs text-[#A1A1A6] mt-1 font-light">
                  Helps determine natural accommodative focus and progressive lens suitability.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  'Under 18 (Pediatric vision & student care)',
                  '18 – 35 years (Single-vision / Active digital screen use)',
                  '36 – 45 years (Early presbyopia / Intermediate laptop fatigue)',
                  '45+ years (Established presbyopia / Multi-distance reading)',
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, ageGroup: option })}
                    className={`w-full p-4 rounded-2xl text-left border text-xs sm:text-sm font-mono flex items-center justify-between transition-all ${
                      answers.ageGroup === option
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-[#171717] border-[#292929] text-[#A1A1A6] hover:text-white hover:border-neutral-500'
                    }`}
                  >
                    <span>{option}</span>
                    {answers.ageGroup === option && <Check className="w-4 h-4 text-black" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Primary Visual Need */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#707070] tracking-[0.25em]">
                  STEP 02 OF 05 // PRIMARY NEED
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  What is your primary visual requirement?
                </h3>
              </div>

              <div className="space-y-3">
                {[
                  'Digital eye fatigue & screen clarity (IT Developer / Professional)',
                  'Night driving glare reduction and high-beam deflection',
                  'Smooth transition between laptop, phone, and room distance',
                  'All-day outdoor sunlight protection with 1 pair of glasses',
                  'Everyday general optical reading and distance vision',
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, primaryNeed: option })}
                    className={`w-full p-4 rounded-2xl text-left border text-xs sm:text-sm font-mono flex items-center justify-between transition-all ${
                      answers.primaryNeed === option
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-[#171717] border-[#292929] text-[#A1A1A6] hover:text-white hover:border-neutral-500'
                    }`}
                  >
                    <span>{option}</span>
                    {answers.primaryNeed === option && <Check className="w-4 h-4 text-black" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Screen Time */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#707070] tracking-[0.25em]">
                  STEP 03 OF 05 // DIGITAL SCREEN HOURS
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  How many hours do you spend on digital screens daily?
                </h3>
              </div>

              <div className="space-y-3">
                {[
                  '8+ hours daily across multiple screens (Heavy tech workflow)',
                  '5–8 hours daily (Standard office & laptop use)',
                  '2–5 hours daily (Moderate browsing & mobile)',
                  'Under 2 hours daily (Casual use)',
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, screenTime: option })}
                    className={`w-full p-4 rounded-2xl text-left border text-xs sm:text-sm font-mono flex items-center justify-between transition-all ${
                      answers.screenTime === option
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-[#171717] border-[#292929] text-[#A1A1A6] hover:text-white hover:border-neutral-500'
                    }`}
                  >
                    <span>{option}</span>
                    {answers.screenTime === option && <Check className="w-4 h-4 text-black" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Sun Sensitivity & Outdoor Use */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#707070] tracking-[0.25em]">
                  STEP 04 OF 05 // OUTDOOR SUNLIGHT
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  How sensitive are your eyes to outdoor sunlight?
                </h3>
              </div>

              <div className="space-y-3">
                {[
                  'Highly sensitive / Want lenses that automatically darken to sunglasses',
                  'Moderate outdoor commute & weekend glare',
                  'Prefer separate dedicated polarized sunglasses',
                  'Spend mostly indoor time with minimal sunlight exposure',
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, sunSensitivity: option })}
                    className={`w-full p-4 rounded-2xl text-left border text-xs sm:text-sm font-mono flex items-center justify-between transition-all ${
                      answers.sunSensitivity === option
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-[#171717] border-[#292929] text-[#A1A1A6] hover:text-white hover:border-neutral-500'
                    }`}
                  >
                    <span>{option}</span>
                    {answers.sunSensitivity === option && <Check className="w-4 h-4 text-black" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: Driving & Night Commute */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#707070] tracking-[0.25em]">
                  STEP 05 OF 05 // DRIVING & COMMUTE
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  Do you experience glare while driving at night?
                </h3>
              </div>

              <div className="space-y-3">
                {[
                  'Frequent night driving with high-beam LED headlight glare',
                  'Moderate highway commuting in dusk or rain',
                  'Occasional night driving',
                  'Rarely or never drive after dark',
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, driving: option })}
                    className={`w-full p-4 rounded-2xl text-left border text-xs sm:text-sm font-mono flex items-center justify-between transition-all ${
                      answers.driving === option
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-[#171717] border-[#292929] text-[#A1A1A6] hover:text-white hover:border-neutral-500'
                    }`}
                  >
                    <span>{option}</span>
                    {answers.driving === option && <Check className="w-4 h-4 text-black" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* RESULTS VIEW (Step 6) */}
          {step === 6 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] block">
                  ANALYSIS COMPLETE
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  Educational Recommendations for Your Store Visit
                </h3>
                <p className="text-xs text-[#A1A1A6] font-light mt-1">
                  Ask our licensed optometrists about these lens configurations:
                </p>
              </div>

              <div className="space-y-3">
                {recommendations.map((rec, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#171717] border border-[#292929] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#D4AF37] uppercase">{rec.category}</span>
                      <span className="text-[10px] font-mono text-white bg-white/10 px-2 py-0.5 rounded">{rec.badge}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{rec.title}</h4>
                    <p className="text-xs text-[#A1A1A6] font-light leading-relaxed">{rec.why}</p>
                  </div>
                ))}
              </div>

              {/* Mandatory Prompt Disclaimer (Section 4, Item 8) */}
              <div className="p-3.5 rounded-xl bg-black/80 border border-[#292929] text-[11px] font-mono text-[#A1A1A6] flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>
                  <strong>Clinical Notice:</strong> This interactive questionnaire provides general guidance only, not a prescription or diagnosis. Your exact lens power, pantoscopic tilt, and fitting corridor must be verified by an eye-care professional at Eyeris Opticals or Global Eye Hospital.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={createWhatsAppBookingLink(
                    `Hi Eyeris Opticals! I completed the 5-Step Lens Finder. The guidance recommended: ${recommendations.map((r) => r.title).join(', ')}. I would like to schedule a private fitting at your KPHB Road No. 1 store.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 rounded-full bg-white text-black font-mono font-semibold text-xs tracking-wider flex items-center justify-center gap-2 hover:bg-neutral-200 transition text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>PRE-FILLED WHATSAPP ENQUIRY</span>
                </a>

                <button
                  onClick={() => {
                    onClose();
                    onOpenBooking();
                  }}
                  className="py-3.5 px-6 rounded-full border border-[#292929] hover:bg-white/5 text-white font-mono text-xs tracking-wider transition"
                >
                  SCHEDULE VISIT
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Navigation Buttons */}
        {step <= 5 && (
          <div className="pt-4 border-t border-[#292929] flex items-center justify-between shrink-0">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-1.5 text-xs font-mono text-[#A1A1A6] hover:text-white"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>PREVIOUS</span>
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-full bg-white hover:bg-neutral-200 text-black font-mono text-xs font-semibold tracking-wider flex items-center gap-1.5 transition"
            >
              <span>{step === 5 ? 'FIND YOUR LENS' : 'NEXT STEP'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
