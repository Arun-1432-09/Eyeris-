'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, Compass, Eye, Shield } from 'lucide-react';
import { createWhatsAppBookingLink } from '@/components/booking/WhatsAppSync';

interface FaceShapeAdvisorProps {
  onOpenBooking: () => void;
}

interface ShapeData {
  shape: string;
  tagline: string;
  bestShapes: string[];
  recommendedFrames: string[];
  stylingTip: string;
  imagePreview: string;
}

const SHAPES: Record<string, ShapeData> = {
  Square: {
    shape: 'Square Jawline',
    tagline: 'Strong, defined angles and prominent jaw',
    bestShapes: ['Round Metal', 'Classic Aviator', 'Oval Panto'],
    recommendedFrames: ['Ray-Ban Round Metal Classic', 'Ray-Ban Aviator Gold', 'Vogue Geometric Oval'],
    stylingTip:
      'Curved and teardrop silhouettes soften strong jawlines and create balanced facial harmony.',
    imagePreview: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
  },
  Round: {
    shape: 'Round Face',
    tagline: 'Equal width & length with softer cheek curves',
    bestShapes: ['Rectangular O-Matter', 'Square Geometric', 'Wayfarer'],
    recommendedFrames: ['Oakley Holbrook Prizm™', 'Ray-Ban Original Wayfarer', 'Oakley Hex Jector'],
    stylingTip:
      'Angular and geometric rectangular frames add structure, elongating the face with sharp definition.',
    imagePreview: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
  },
  Oval: {
    shape: 'Oval Face',
    tagline: 'Naturally balanced proportions with gently curved jaw',
    bestShapes: ['Haute Couture Geometric', 'Bold Acetate', 'Aviators'],
    recommendedFrames: ['Prada Symbole Sculpted', 'Stepper Pure Titanium', 'Ray-Ban Clubmaster'],
    stylingTip:
      'The most versatile face contour. Sculpted statement acetates and architectural temples look distinguished.',
    imagePreview: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80',
  },
  Heart: {
    shape: 'Heart / Inverted Triangle',
    tagline: 'Wider forehead tapering into a slender chin',
    bestShapes: ['Featherweight Rimless', 'Classic Browline', 'Light Acetate'],
    recommendedFrames: ['Stepper Executive Titanium (<9g)', 'Ray-Ban Clubmaster Classic', 'Vogue Chic'],
    stylingTip:
      'Light bottom rims and featherweight titanium frames keep the lower face light and proportioned.',
    imagePreview: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80',
  },
};

export const FaceShapeAdvisor: React.FC<FaceShapeAdvisorProps> = ({ onOpenBooking }) => {
  const [activeShape, setActiveShape] = useState<string>('Square');
  const current = SHAPES[activeShape];

  return (
    <section id="face-shape-advisor" className="py-20 bg-background relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-champagne-500/10 border border-champagne-500/30 text-champagne-400 text-xs font-mono tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>INTERACTIVE STYLING ADVISOR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Find the Frame Built for{' '}
            <span className="text-gold-gradient italic font-light">Your Face Shape.</span>
          </h2>
          <p className="text-neutral-400 text-sm mt-2">
            Never guess which frame fits. Match your jawline to masterfully engineered international styles.
          </p>
        </div>

        {/* Shape Selector Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10 overflow-x-auto no-scrollbar pb-2">
          {Object.keys(SHAPES).map((shapeKey) => (
            <button
              key={shapeKey}
              onClick={() => setActiveShape(shapeKey)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-mono tracking-wider transition-all ${
                activeShape === shapeKey
                  ? 'bg-ivory-100 text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                  : 'bg-graphite text-neutral-400 hover:text-white border border-white/5 hover:border-white/20'
              }`}
            >
              {shapeKey} Face
            </button>
          ))}
        </div>

        {/* Feature Display Card */}
        <div className="max-w-5xl mx-auto bg-surface rounded-3xl border border-white/10 p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-2xl">
          
          {/* Left: Image Preview */}
          <div className="md:col-span-5 relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-black/60 border border-white/10">
            <img
              src={current.imagePreview}
              alt={current.shape}
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-mono text-brand-300 block">IDEAL PROPORTION</span>
              <p className="text-sm font-serif font-bold text-white">{current.recommendedFrames[0]}</p>
            </div>
          </div>

          {/* Right: Recommendations & Details */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <span className="text-xs font-mono text-champagne-400 tracking-wider">RECOMMENDED SILHOUETTES</span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                {current.shape}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">{current.tagline}</p>
            </div>

            <div className="p-4 rounded-xl bg-graphite border border-white/5 space-y-1">
              <span className="text-[11px] font-mono text-champagne-300 font-semibold">OPTICIAN STYLING RULE:</span>
              <p className="text-xs text-neutral-300 leading-relaxed font-sans">{current.stylingTip}</p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-neutral-400">BEST MATCHING BRANDS AT EYERIS:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {current.bestShapes.map((shape, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-surface border border-white/10 text-xs font-mono text-white flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                    <span className="truncate">{shape}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-xl bg-champagne-500 hover:bg-champagne-400 text-slate-950 font-bold text-xs font-mono tracking-wider transition-all"
              >
                BOOK IN-STORE FACE STYLING
              </button>

              <a
                href={createWhatsAppBookingLink(
                  `Hi EYERIS Opticals! I have a ${current.shape}. Could you suggest trending in-stock frames like ${current.recommendedFrames[0]}?`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-graphite hover:bg-surface border border-white/15 text-neutral-200 hover:text-white font-mono text-xs tracking-wider transition-all"
              >
                ASK STYLIST ON WHATSAPP
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
