'use client';

import React, { useEffect, useState } from 'react';

export const CinematicPreloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check session storage so repeated visits load immediately
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
        return prev + Math.floor(Math.random() * 16) + 8;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between bg-white px-6 py-12 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] pointer-events-none select-none ${
        isDone ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Top Header */}
      <div className="w-full max-w-6xl flex items-center justify-between text-xs font-mono text-neutral-400">
        <span className="tracking-widest uppercase">EST. HYDERABAD</span>
        <span className="tracking-widest uppercase text-black font-semibold">PRECISION OPHTHALMICS</span>
      </div>

      {/* Center Monogram & Aperture */}
      <div className="flex flex-col items-center text-center my-auto space-y-6">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-neutral-200 border-t-black animate-spin" />
          <div className="w-12 h-12 rounded-full border border-neutral-300 flex items-center justify-center">
            <span className="text-xl font-bold text-black tracking-tight">EY</span>
          </div>
        </div>

        <div>
          <h1 className="text-3xl sm:text-5xl font-bold text-black tracking-tight">
            EYERIS <span className="font-light text-neutral-500">OPTICALS</span>
          </h1>
          <p className="text-xs font-mono tracking-widest text-neutral-500 uppercase mt-2">
            Personal Style Meets Clinical Vision
          </p>
        </div>
      </div>

      {/* Bottom Counter & Status */}
      <div className="w-full max-w-6xl flex items-end justify-between border-t border-neutral-200 pt-4 text-xs font-mono">
        <span className="text-neutral-400">KPHB ROAD NO. 1 // GLOBAL EYE HOSPITAL GROUND FLOOR</span>
        <div className="text-right">
          <span className="text-2xl font-mono font-bold text-black tracking-wider">
            {Math.min(100, progress)}%
          </span>
        </div>
      </div>
    </div>
  );
};
