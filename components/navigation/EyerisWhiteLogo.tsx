'use client';

import React from 'react';

interface EyerisWhiteLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const EyerisWhiteLogo: React.FC<EyerisWhiteLogoProps> = ({ className = '', size = 'md' }) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  return (
    <div className={`inline-flex flex-col items-start select-none ${className}`}>
      {/* Primary Wordmark: EYERIS */}
      <div className="flex items-center tracking-[0.28em] font-serif font-bold text-white leading-none">
        <span className={`${isSm ? 'text-base' : isLg ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}`}>
          EYERIS
        </span>
      </div>

      {/* Secondary Subtitle with Fine Horizontal Rules: — OPTICALS — */}
      <div className="flex items-center gap-1.5 w-full mt-1">
        <span className="h-[0.5px] flex-1 bg-white/40" />
        <span className={`tracking-[0.3em] font-sans uppercase font-medium text-white/70 ${isSm ? 'text-[8px]' : 'text-[9px]'}`}>
          OPTICALS
        </span>
        <span className="h-[0.5px] flex-1 bg-white/40" />
      </div>
    </div>
  );
};
