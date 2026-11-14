'use client';

import React from 'react';

const BRANDS = [
  'RAY-BAN',
  'OAKLEY',
  'PRADA MILANO',
  'STEPPER TITANIUM',
  'ZEISS OPTICS',
  'TOMMY HILFIGER',
  'VOGUE EYEWEAR',
  'CALVIN KLEIN',
  'GLOBAL EYE HOSPITAL LINK',
];

export const BrandMarquee: React.FC = () => {
  return (
    <div className="w-full py-6 bg-graphite/80 border-y border-white/10 overflow-hidden select-none">
      <div className="flex w-max items-center gap-12 animate-[marquee_30s_linear_infinite]">
        {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, idx) => (
          <div key={idx} className="flex items-center gap-12 shrink-0">
            <span className="text-sm sm:text-base font-serif font-bold tracking-[0.25em] text-neutral-400 hover:text-white transition-colors duration-200">
              {brand}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-champagne-500/50" />
          </div>
        ))}
      </div>
    </div>
  );
};
