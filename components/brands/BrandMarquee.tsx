'use client';

import React from 'react';

const BRANDS = [
  'RAY-BAN',
  'OAKLEY',
  'PRADA MILANO',
  'STEPPER TITANIUM',
  'ZEISS OPTICS',
  'TOMMY HILFIGER',
  'CALVIN KLEIN',
  'VOGUE EYEWEAR',
  'GLOBAL EYE HOSPITAL LINK',
];

export const BrandMarquee: React.FC = () => {
  return (
    <div className="w-full py-5 bg-black border-y border-apple-border overflow-hidden select-none">
      <div className="flex w-max items-center gap-12 animate-[marquee_28s_linear_infinite]">
        {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, idx) => (
          <div key={idx} className="flex items-center gap-12 shrink-0">
            <span className="text-xs sm:text-sm font-mono font-semibold tracking-[0.25em] text-apple-subtext hover:text-white transition-colors duration-200">
              {brand}
            </span>
            <span className="w-1 h-1 rounded-full bg-apple-blue-light/50" />
          </div>
        ))}
      </div>
    </div>
  );
};
