'use client';

import React from 'react';

const BRANDS = [
  'RAY-BAN',
  'OAKLEY',
  'PRADA MILANO',
  'STEPPER TITANIUM',
  'ZEISS PRECISION OPTICS',
  'TOMMY HILFIGER',
  'CALVIN KLEIN',
  'VOGUE EYEWEAR',
  'GLOBAL EYE HOSPITAL LINK',
];

export const BrandMarquee: React.FC = () => {
  return (
    <div className="w-full py-5 bg-[#FBFBFD] border-y border-neutral-200 overflow-hidden select-none">
      <div className="flex w-max items-center gap-12 animate-[marquee_28s_linear_infinite]">
        {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, idx) => (
          <div key={idx} className="flex items-center gap-12 shrink-0">
            <span className="text-xs sm:text-sm font-mono font-semibold tracking-[0.25em] text-neutral-400 hover:text-black transition-colors duration-200">
              {brand}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
          </div>
        ))}
      </div>
    </div>
  );
};
