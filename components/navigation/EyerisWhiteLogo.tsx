'use client';

import React from 'react';

interface EyerisWhiteLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark';
}

export const EyerisWhiteLogo: React.FC<EyerisWhiteLogoProps> = ({
  className = '',
  size = 'md',
  theme = 'light',
}) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';
  const isDarkTheme = theme === 'dark';

  return (
    <div className={`inline-flex flex-col items-start select-none ${className}`}>
      {/* Primary Wordmark: EYERIS */}
      <div
        className={`flex items-center tracking-[0.28em] font-serif font-bold leading-none ${
          isDarkTheme ? 'text-white' : 'text-[#111111]'
        }`}
      >
        <span className={`${isSm ? 'text-base' : isLg ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}`}>
          EYERIS
        </span>
      </div>

      {/* Secondary Subtitle with Fine Horizontal Rules: — OPTICALS — */}
      <div className="flex items-center gap-1.5 w-full mt-1">
        <span className={`h-[0.5px] flex-1 ${isDarkTheme ? 'bg-white/40' : 'bg-[#111111]/30'}`} />
        <span
          className={`tracking-[0.3em] font-sans uppercase font-medium ${
            isDarkTheme ? 'text-white/70' : 'text-[#666666]'
          } ${isSm ? 'text-[8px]' : 'text-[9px]'}`}
        >
          OPTICALS
        </span>
        <span className={`h-[0.5px] flex-1 ${isDarkTheme ? 'bg-white/40' : 'bg-[#111111]/30'}`} />
      </div>
    </div>
  );
};
