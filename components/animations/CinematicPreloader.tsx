'use client';

import React, { useEffect, useState } from 'react';
import { EyerisWhiteLogo } from '@/components/navigation/EyerisWhiteLogo';

export const CinematicPreloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('eyeris_preloader_seen');
    if (hasVisited) {
      setShouldRender(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsDone(true), 250);
          setTimeout(() => {
            setShouldRender(false);
            sessionStorage.setItem('eyeris_preloader_seen', 'true');
          }, 900);
          return 100;
        }
        return prev + Math.floor(Math.random() * 18) + 10;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between bg-white text-[#111111] px-6 py-12 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none select-none ${
        isDone ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Top Header */}
      <div className="w-full max-w-6xl flex items-center justify-between text-[11px] font-mono text-[#888888]">
        <span className="tracking-[0.25em] uppercase">EST. HYDERABAD</span>
        <span className="tracking-[0.25em] uppercase text-[#111111] font-semibold">40 YEARS OPTICAL EXPERTISE</span>
      </div>

      {/* Center Logo & Statement */}
      <div className="flex flex-col items-center text-center my-auto space-y-6">
        <EyerisWhiteLogo size="lg" theme="light" />

        <p className="text-xs font-mono tracking-[0.25em] text-[#666666] uppercase max-w-sm mt-3">
          Where Personal Style Meets Clinical Vision
        </p>
      </div>

      {/* Bottom Counter & Corridor Notice */}
      <div className="w-full max-w-6xl flex items-end justify-between border-t border-[#E5E5E5] pt-4 text-[11px] font-mono">
        <span className="text-[#888888]">KPHB ROAD NO. 1 // GLOBAL EYE HOSPITAL GROUND CORRIDOR</span>
        <div className="text-right">
          <span className="text-xl sm:text-2xl font-mono font-bold text-[#111111] tracking-wider">
            {Math.min(100, progress)}%
          </span>
        </div>
      </div>
    </div>
  );
};
