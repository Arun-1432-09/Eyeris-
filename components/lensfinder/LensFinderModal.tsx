'use client';

import React, { useState } from 'react';
import { X, Check, ArrowRight, ArrowLeft, Eye, Sparkles, Laptop, Moon, Sun, ShieldAlert, Calendar } from 'lucide-react';
import { createWhatsAppBookingLink } from '@/components/booking/WhatsAppSync';

interface LensFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

interface Answers {
  screenHours: string;
  driving: string;
  ageGroup: string;
  outdoorSun: string;
  budgetGoal: string;
}

export const LensFinderModal: React.FC<LensFinderModalProps> = ({ isOpen, onClose, onOpenBooking }) => {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<Answers>({
    screenHours: '8+ hours (IT / Developer / Office)',
    driving: 'Frequent night driving with high-beam LED glare',
    ageGroup: '25 – 35 years',
    outdoorSun: 'Moderate (Commute & Weekend outdoors)',
    budgetGoal: 'Corporate Insurance Claim (~₹15,000–₹20,000)',
  });

  if (!isOpen) return null;

  // Recommendations generator
  const getRecommendation = () => {
    const isHeavyScreen = answers.screenHours.includes('8+') || answers.screenHours.includes('5-8');
    const isNightDriver = answers.driving.includes('night') || answers.driving.includes('Frequent');
    const isPresbyopic = answers.ageGroup.includes('36') || answers.ageGroup.includes('45+');
    const isHighSun = answers.outdoorSun.includes('High') || answers.outdoorSun.includes('Frequent');

    const recommended: Array<{
      title: string;
      category: string;
      why: string;
      badge: string;
    }> = [];

    if (isPresbyopic) {
      recommended.push({
        title: 'Personalized Digital Freeform Progressives',
        category: 'Near + Intermediate + Distance Natural Focus',
        why: 'Eliminates having separate reading specs. German freeform digital surfacing customizes the reading corridor to your exact laptop distance with zero head-bobbing dizziness.',
        badge: 'Essential for Age 35+',
      });
    }

    if (isHeavyScreen) {
      recommended.push({
        title: 'Digital Relax & Blue-Block Pro (Index 1.60/1.67)',
        category: 'Ciliary Muscle Fatigue Relief & Blue Cut',
        why: 'Relieves eye strain and post-work headaches by filtering harsh 415-455nm blue-violet rays without changing natural colors on your display.',
        badge: 'Recommended for IT Pros',
      });
    }

    if (isNightDriver) {
      recommended.push({
        title: 'ZEISS DriveSafe Optics',
        category: 'High-Contrast Headlight Glare Reduction',
        why: 'Minimizes perceived glare from oncoming LED headlights by up to 64%, keeping pupil size optimized in dusk and rainy road conditions.',
        badge: 'Hyderabad Commute Pick',
      });
    }

    if (isHighSun) {
      recommended.push({
        title: 'Adaptive Transitions® Gen S',
        category: 'Fast-Fade Nanocrystal Matrix',
        why: 'Crystal clear in the office, instantaneously darkening within 25 seconds when stepping out into bright sunlight.',
        badge: 'All-Day Convenience',
      });
    }

    // Fallback if none matched
    if (recommended.length === 0) {
      recommended.push({
        title: 'High-Definition Single-Vision Anti-Reflective Lenses',
        category: 'Crisp Optics & Scratch Resistance',
        why: 'Super hydrophobic multi-layer anti-reflective coating ensuring 99.6% light transmission and smudge repulsion.',
        badge: 'Everyday Essential',
      });
    }

    return recommended;
  };

  const handleFinish = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('eyeris_lens_finder_leads') || '[]');
      const newLead = {
        id: 'LF-' + Date.now().toString().slice(-5),
        date: new Date().toISOString(),
        answers,
        recommendation: getRecommendation().map((r) => r.title).join(', '),
        status: 'New Lead',
      };
      localStorage.setItem('eyeris_lens_finder_leads', JSON.stringify([newLead, ...stored]));
    } catch (e) {
      console.error(e);
    }
    setStep(5);
  };

  const recommendedLenses = getRecommendation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-apple-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Top Header & Progress */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200 shrink-0">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-black" />
            <span className="font-bold text-lg text-black">EYERIS Precision Lens Finder</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 text-apple-subtext hover:text-black transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {step <= 4 && (
          <div className="w-full bg-neutral-100 h-1.5 rounded-full my-4 overflow-hidden shrink-0">
            <div
              className="bg-black h-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto no-scrollbar py-2 flex-1">
          
          {/* STEP 1: Screen & Coding */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-apple-subtext uppercase">Question 1 of 4</span>
                <h3 className="text-2xl font-bold text-black mt-1">
                  How many hours do you spend on screens daily?
                </h3>
                <p className="text-xs text-apple-subtext mt-1">
                  Including laptops, dual monitors, tablets, and mobile phones.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  '8+ hours (IT / Developer / Office Professional)',
                  '5–8 hours (Moderate digital workflow)',
                  '2–5 hours (General browsing & casual use)',
                  'Under 2 hours (Minimal screen time)',
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, screenHours: option })}
                    className={`w-full p-4 rounded-2xl text-left border text-sm flex items-center justify-between transition-all ${
                      answers.screenHours === option
                        ? 'bg-black text-white border-black font-medium shadow-apple-sm'
                        : 'bg-[#FBFBFD] border-neutral-200 text-apple-text hover:border-neutral-400'
                    }`}
                  >
                    <span>{option}</span>
                    {answers.screenHours === option && <Check className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Night Driving & Commute */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-apple-subtext uppercase">Question 2 of 4</span>
                <h3 className="text-2xl font-bold text-black mt-1">
                  Do you experience glare while driving or commuting at night?
                </h3>
                <p className="text-xs text-apple-subtext mt-1">
                  High-beam LEDs, rainy road reflections, or halo rings around street lights.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  'Frequent night driving with high-beam LED glare',
                  'Moderate highway or city driving after sunset',
                  'Occasional night driving',
                  'Rarely or never drive at night',
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, driving: option })}
                    className={`w-full p-4 rounded-2xl text-left border text-sm flex items-center justify-between transition-all ${
                      answers.driving === option
                        ? 'bg-black text-white border-black font-medium shadow-apple-sm'
                        : 'bg-[#FBFBFD] border-neutral-200 text-apple-text hover:border-neutral-400'
                    }`}
                  >
                    <span>{option}</span>
                    {answers.driving === option && <Check className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Age & Reading Focus */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-apple-subtext uppercase">Question 3 of 4</span>
                <h3 className="text-2xl font-bold text-black mt-1">
                  What is your age category?
                </h3>
                <p className="text-xs text-apple-subtext mt-1">
                  Determines whether accommodative support or freeform progressive corridors are optimal.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  'Under 18 (Student / Pediatric vision)',
                  '18 – 35 years (Active single-vision / Digital fatigue)',
                  '36 – 45 years (Early presbyopia / Intermediate screen focus)',
                  '45+ years (Established presbyopia / Near & distance vision)',
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, ageGroup: option })}
                    className={`w-full p-4 rounded-2xl text-left border text-sm flex items-center justify-between transition-all ${
                      answers.ageGroup === option
                        ? 'bg-black text-white border-black font-medium shadow-apple-sm'
                        : 'bg-[#FBFBFD] border-neutral-200 text-apple-text hover:border-neutral-400'
                    }`}
                  >
                    <span>{option}</span>
                    {answers.ageGroup === option && <Check className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Outdoor Sun & Budget Goal */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-apple-subtext uppercase">Question 4 of 4</span>
                <h3 className="text-2xl font-bold text-black mt-1">
                  Outdoor UV exposure & Corporate allowance goal?
                </h3>
              </div>

              <div className="space-y-3">
                {[
                  'Corporate Insurance Claim (~₹15,000–₹20,000) • High screen & daily commute',
                  'Adaptive photochromic transitions (Want 1 pair for indoor & outdoor)',
                  'Ultra-light premium featherweight titanium & thin high-index lens',
                  'Standard everyday high-clarity single vision pair',
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, budgetGoal: option })}
                    className={`w-full p-4 rounded-2xl text-left border text-sm flex items-center justify-between transition-all ${
                      answers.budgetGoal === option
                        ? 'bg-black text-white border-black font-medium shadow-apple-sm'
                        : 'bg-[#FBFBFD] border-neutral-200 text-apple-text hover:border-neutral-400'
                    }`}
                  >
                    <span>{option}</span>
                    {answers.budgetGoal === option && <Check className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: RESULTS SCREEN */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="text-center max-w-md mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-black text-xs font-mono mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  <span>ANALYSIS COMPLETE</span>
                </div>
                <h3 className="text-3xl font-bold text-black">
                  Your Bespoke Optical Profile
                </h3>
                <p className="text-xs text-apple-subtext mt-1">
                  Based on your screen duration ({answers.screenHours.split(' ')[0]}) and lifestyle requirements.
                </p>
              </div>

              {/* Recommended Lenses Cards */}
              <div className="space-y-4">
                {recommendedLenses.map((rec, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-[#FBFBFD] border border-neutral-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-black font-semibold px-2.5 py-0.5 rounded bg-neutral-200/70">
                        {rec.badge}
                      </span>
                      <span className="text-[11px] font-mono text-apple-subtext">{rec.category}</span>
                    </div>
                    <h4 className="text-lg font-bold text-black">{rec.title}</h4>
                    <p className="text-xs text-apple-subtext leading-relaxed">{rec.why}</p>
                  </div>
                ))}
              </div>

              {/* Verified Medical Disclaimer */}
              <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-start gap-2.5 text-xs text-apple-subtext">
                <ShieldAlert className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <span>
                  <strong>Clinical Notice:</strong> This interactive questionnaire provides educational recommendations only and does not constitute a clinical medical prescription. Final lens power and corridor calibration will be precisely verified by our optometrists at KPHB Road No. 1 or Global Eye Hospital.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onOpenBooking();
                  }}
                  className="flex-1 py-3.5 rounded-full bg-black hover:bg-neutral-800 text-white font-medium text-xs font-mono tracking-wider flex items-center justify-center gap-2 transition-all shadow-apple-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>SCHEDULE IN-STORE TRY-ON</span>
                </button>

                <a
                  href={createWhatsAppBookingLink(
                    `Hi EYERIS Opticals! I completed the Lens Finder test for: ${recommendedLenses.map((r) => r.title).join(' & ')}. I'd like to consult with an optometrist and explore available frame pairings.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 text-black font-medium text-xs font-mono tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <span>SHARE ON WHATSAPP</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        {step <= 4 && (
          <div className="pt-4 border-t border-neutral-200 flex items-center justify-between shrink-0">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 text-xs font-mono text-apple-subtext hover:text-black"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>PREVIOUS</span>
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={() => {
                if (step < 4) setStep(step + 1);
                else handleFinish();
              }}
              className="px-6 py-3 rounded-full bg-black hover:bg-neutral-800 text-white font-medium text-xs font-mono tracking-wider flex items-center gap-2 transition-all shadow-apple-sm"
            >
              <span>{step === 4 ? 'GENERATE RECOMMENDATIONS' : 'NEXT STEP'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
