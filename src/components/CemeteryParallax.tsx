/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Over-the-top Halloween Cemetery Parallax Environment:
 * Glowing moon, flying bats, floating ghosts, skeletons, crooked tombstones,
 * rolling ground mist, dangling spiders, and parallax cobwebs.
 */

import React, { useEffect, useState } from 'react';

interface CemeteryParallaxProps {
  onBaitSpider?: () => void;
}

export const CemeteryParallax: React.FC<CemeteryParallaxProps> = ({ onBaitSpider }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* ========================================================
          LAYER 0: DEEP SKY - HARVEST MOON & FLOCK OF BATS
          ======================================================== */}
      <div
        className="absolute top-6 right-6 sm:top-10 sm:right-16 transition-transform duration-75 ease-out"
        style={{ transform: `translateY(${scrollY * 0.08}px)` }}
      >
        {/* Giant Glowing Harvest Moon */}
        <div className="relative w-28 h-28 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-amber-100 via-amber-200 to-amber-400 dark:from-amber-200 dark:via-orange-300 dark:to-amber-500 shadow-[0_0_80px_rgba(245,158,11,0.35)] dark:shadow-[0_0_110px_rgba(245,158,11,0.5)] opacity-85 dark:opacity-90">
          {/* Moon craters */}
          <div className="absolute top-4 left-6 w-5 h-4 rounded-full bg-amber-300/40 dark:bg-amber-600/30 filter blur-[1px]" />
          <div className="absolute top-10 left-12 w-8 h-6 rounded-full bg-amber-300/35 dark:bg-amber-600/30 filter blur-[1px]" />
          <div className="absolute bottom-6 left-8 w-10 h-7 rounded-full bg-amber-300/40 dark:bg-amber-600/35 filter blur-[1px]" />
          <div className="absolute top-14 right-6 w-6 h-5 rounded-full bg-amber-300/30 dark:bg-amber-600/25 filter blur-[1px]" />
        </div>
      </div>

      {/* Flying Bats Across The Sky */}
      <div className="anim-bat-fly-1 absolute top-20 left-0 w-12 h-8 text-slate-800 dark:text-slate-900 opacity-70">
        <div className="anim-bat-wings">
          <svg viewBox="0 0 64 32" fill="currentColor">
            <path d="M 32,16 Q 22,0 8,4 Q 14,14 2,24 Q 16,20 24,28 Q 28,20 32,24 Q 36,20 40,28 Q 48,20 62,24 Q 50,14 56,4 Q 42,0 32,16 Z" />
          </svg>
        </div>
      </div>

      <div className="anim-bat-fly-2 absolute top-44 left-0 w-10 h-6 text-slate-800 dark:text-slate-950 opacity-60">
        <div className="anim-bat-wings">
          <svg viewBox="0 0 64 32" fill="currentColor">
            <path d="M 32,16 Q 22,0 8,4 Q 14,14 2,24 Q 16,20 24,28 Q 28,20 32,24 Q 36,20 40,28 Q 48,20 62,24 Q 50,14 56,4 Q 42,0 32,16 Z" />
          </svg>
        </div>
      </div>

      {/* ========================================================
          LAYER 1: DISTANT GOTHIC CASTLE & DEAD WILLOW TREES
          ======================================================== */}
      <div
        className="absolute bottom-0 left-0 right-0 h-96 opacity-20 dark:opacity-30 text-slate-700 dark:text-slate-600 transition-transform duration-75 ease-out"
        style={{ transform: `translateY(${scrollY * 0.14}px)` }}
      >
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          {/* Spooky dead tree silhouettes and spires */}
          <path d="M0,288L40,280C80,272,160,256,240,250C320,245,400,251,480,266C560,282,640,309,720,298C800,288,880,240,960,234C1040,229,1120,266,1200,277C1280,288,1360,272,1400,264L1440,256L1440,320L0,320Z" />
        </svg>
      </div>

      {/* ========================================================
          LAYER 2: CROOKED TOMBSTONES & CEMETERY IRON FENCE
          ======================================================== */}
      {/* Left Tombstones */}
      <div
        className="absolute bottom-12 left-4 sm:left-12 flex items-end gap-3 transition-transform duration-75 ease-out opacity-75 dark:opacity-85"
        style={{ transform: `translateY(${-scrollY * 0.08}px)` }}
      >
        {/* Tombstone 1: Cracked RIP Stone */}
        <div className="relative w-16 sm:w-20 h-24 sm:h-32 bg-gradient-to-t from-slate-400 to-slate-300 dark:from-slate-900 dark:to-slate-800 rounded-t-2xl border-t border-x border-slate-500 dark:border-slate-700 shadow-lg flex flex-col items-center justify-center p-2 rotate-[-4deg]">
          {/* Crack line */}
          <div className="absolute top-2 right-4 w-4 h-6 border-r border-b border-slate-600 dark:border-slate-950 rotate-12" />
          <span className="font-serif font-black text-xs sm:text-sm tracking-widest text-slate-700 dark:text-slate-400">
            R.I.P
          </span>
          <span className="text-[9px] text-slate-500 dark:text-slate-500 mt-1">1313</span>
        </div>

        {/* Tombstone 2: Peeking Skeleton Stone */}
        <div className="relative w-14 sm:w-16 h-20 sm:h-28 bg-gradient-to-t from-slate-400 to-slate-300 dark:from-slate-900 dark:to-slate-800 rounded-t-xl border-t border-x border-slate-500 dark:border-slate-700 shadow-md flex flex-col items-center justify-center rotate-[6deg]">
          {/* Peeking skeleton skull */}
          <div className="anim-skull-chatter absolute -top-7 left-2 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-200 border border-slate-400 dark:border-slate-500 relative flex items-center justify-center shadow-md">
              {/* Eye sockets */}
              <div className="absolute top-2.5 left-1.5 w-2 h-2.5 rounded-full bg-slate-900 dark:bg-slate-950 shadow-inner" />
              <div className="absolute top-2.5 right-1.5 w-2 h-2.5 rounded-full bg-slate-900 dark:bg-slate-950 shadow-inner" />
              {/* Nose hole */}
              <div className="absolute top-4 w-1 h-1.5 bg-slate-900 rounded-sm" />
              {/* Teeth */}
              <div className="absolute bottom-1 flex gap-0.5">
                <div className="w-1 h-1.5 bg-slate-900" />
                <div className="w-1 h-1.5 bg-slate-900" />
                <div className="w-1 h-1.5 bg-slate-900" />
              </div>
            </div>
          </div>
          <span className="font-serif font-bold text-xs text-slate-700 dark:text-slate-400">
            BOO
          </span>
        </div>
      </div>

      {/* Right Tombstones & Perched Pumpkin */}
      <div
        className="absolute bottom-12 right-4 sm:right-16 flex items-end gap-3 transition-transform duration-75 ease-out opacity-75 dark:opacity-85"
        style={{ transform: `translateY(${-scrollY * 0.1}px)` }}
      >
        {/* Tombstone with cross */}
        <div className="relative w-18 sm:w-24 h-28 sm:h-36 bg-gradient-to-t from-slate-400 to-slate-300 dark:from-slate-900 dark:to-slate-800 rounded-t-3xl border-t border-x border-slate-500 dark:border-slate-700 shadow-lg flex flex-col items-center justify-center rotate-[3deg]">
          {/* Engraved cross */}
          <div className="w-2 h-8 bg-slate-500/50 dark:bg-slate-950/70 rounded-full relative">
            <div className="absolute top-2 -left-2 w-6 h-2 bg-slate-500/50 dark:bg-slate-950/70 rounded-full" />
          </div>
          <span className="font-mono text-[10px] text-slate-600 dark:text-slate-400 mt-2">
            HERE LIES BUG
          </span>
        </div>

        {/* Little carved glowing pumpkin perched near gravestone */}
        <div className="anim-candle pb-1 cursor-pointer pointer-events-auto" onClick={onBaitSpider}>
          <div className="w-10 h-10 rounded-full bg-orange-600 border border-amber-900 relative shadow-lg flex items-center justify-center">
            {/* Stem */}
            <div className="absolute -top-2 left-4 w-2 h-3 bg-lime-900 rounded-sm" />
            {/* Glowing eyes & smile */}
            <div className="flex gap-1.5 mb-1">
              <div className="w-1.5 h-1.5 bg-amber-200 rotate-45" />
              <div className="w-1.5 h-1.5 bg-amber-200 rotate-45" />
            </div>
            <div className="absolute bottom-2 w-4 h-1.5 bg-amber-200 rounded-b-full" />
          </div>
        </div>
      </div>

      {/* ========================================================
          LAYER 3: FLOATING TRANSLUCENT GHOSTS
          ======================================================== */}
      {/* Ghost 1 (Left Side, floating higher with scroll) */}
      <div
        className="anim-ghost-a absolute top-1/4 left-3 sm:left-14 transition-transform duration-100 ease-out opacity-65 dark:opacity-75"
        style={{ transform: `translateY(${scrollY * 0.22}px)` }}
      >
        <div className="relative w-16 h-20 sm:w-20 sm:h-24">
          <svg viewBox="0 0 100 120" fill="none" className="w-full h-full filter drop-shadow-[0_4px_16px_rgba(255,255,255,0.4)]">
            {/* Ghost sheet body with wavy tail */}
            <path
              d="M 50,10 C 25,10 15,30 15,65 C 15,95 10,110 25,105 C 35,102 40,115 50,110 C 60,105 65,118 75,110 C 85,102 85,95 85,65 C 85,30 75,10 50,10 Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-slate-200/90 dark:text-slate-100/90 stroke-slate-400/60 dark:stroke-transparent"
            />
            {/* Big curious eyes */}
            <ellipse cx="40" cy="45" rx="5" ry="7" fill="#0f172a" />
            <ellipse cx="60" cy="45" rx="5" ry="7" fill="#0f172a" />
            {/* Eye glints */}
            <circle cx="42" cy="43" r="1.8" fill="#ffffff" />
            <circle cx="62" cy="43" r="1.8" fill="#ffffff" />
            {/* Surprised mouth */}
            <ellipse cx="50" cy="62" rx="4" ry="6" fill="#0f172a" />
          </svg>
        </div>
      </div>

      {/* Ghost 2 (Right Side, floating down with scroll) */}
      <div
        className="anim-ghost-b absolute top-1/2 right-3 sm:right-16 transition-transform duration-100 ease-out opacity-70 dark:opacity-75"
        style={{ transform: `translateY(${-scrollY * 0.16}px)` }}
      >
        <div className="relative w-14 h-18 sm:w-18 sm:h-22">
          <svg viewBox="0 0 100 120" fill="none" className="w-full h-full filter drop-shadow-[0_4px_16px_rgba(147,197,253,0.35)]">
            <path
              d="M 50,12 C 28,12 18,32 18,65 C 18,92 12,108 24,104 C 34,100 42,112 50,108 C 58,104 66,116 76,108 C 86,100 82,92 82,65 C 82,32 72,12 50,12 Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-slate-200/90 dark:text-indigo-100/80 stroke-slate-400/60 dark:stroke-transparent"
            />
            {/* Cheerful/spooky winking eye */}
            <ellipse cx="40" cy="48" rx="4" ry="6" fill="#090d16" />
            <path d="M 56,48 Q 62,44 68,48" stroke="#090d16" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 46,62 Q 52,68 58,62" stroke="#090d16" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      </div>

      {/* ========================================================
          LAYER 4: DANGLING BABY SPIDERS BOBBING ON SILK THREADS
          ======================================================== */}
      {/* Dangling Spider 1 (Left ceiling) */}
      <div
        className="anim-spider-dangle absolute top-0 left-24 sm:left-48 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${Math.min(90, scrollY * 0.12)}px)` }}
      >
        {/* Silk thread */}
        <div className="w-[1px] h-28 sm:h-36 bg-slate-400 dark:bg-slate-300 opacity-60 mx-auto" />
        {/* Hanging spider */}
        <div className="w-6 h-6 rounded-full bg-slate-900 dark:bg-slate-100 mx-auto relative shadow-md">
          {/* 8 cute miniature legs sticking out */}
          <div className="absolute -left-2 top-0 w-3 h-1 bg-slate-900 dark:bg-slate-100 -rotate-45" />
          <div className="absolute -left-2 top-2 w-3 h-1 bg-slate-900 dark:bg-slate-100" />
          <div className="absolute -left-2 top-4 w-3 h-1 bg-slate-900 dark:bg-slate-100 rotate-45" />
          <div className="absolute -right-2 top-0 w-3 h-1 bg-slate-900 dark:bg-slate-100 rotate-45" />
          <div className="absolute -right-2 top-2 w-3 h-1 bg-slate-900 dark:bg-slate-100" />
          <div className="absolute -right-2 top-4 w-3 h-1 bg-slate-900 dark:bg-slate-100 -rotate-45" />
          {/* Glowing tiny red eyes */}
          <div className="absolute bottom-1 left-1.5 w-1 h-1 rounded-full bg-rose-500" />
          <div className="absolute bottom-1 right-1.5 w-1 h-1 rounded-full bg-rose-500" />
        </div>
      </div>

      {/* Dangling Spider 2 (Right ceiling) */}
      <div
        className="anim-spider-dangle absolute top-0 right-32 sm:right-64 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${Math.min(110, scrollY * 0.15)}px)` }}
      >
        <div className="w-[1px] h-36 sm:h-48 bg-slate-400 dark:bg-slate-300 opacity-60 mx-auto" />
        <div className="w-5 h-5 rounded-full bg-slate-900 dark:bg-slate-100 mx-auto relative shadow-md">
          <div className="absolute -left-2 top-1 w-2.5 h-0.5 bg-slate-900 dark:bg-slate-100 -rotate-30" />
          <div className="absolute -left-2 top-3 w-2.5 h-0.5 bg-slate-900 dark:bg-slate-100 rotate-30" />
          <div className="absolute -right-2 top-1 w-2.5 h-0.5 bg-slate-900 dark:bg-slate-100 rotate-30" />
          <div className="absolute -right-2 top-3 w-2.5 h-0.5 bg-slate-900 dark:bg-slate-100 -rotate-30" />
          <div className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-amber-400" />
          <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-amber-400" />
        </div>
      </div>

      {/* ========================================================
          LAYER 5: PARALLAX CORNER COBWEBS WITH SWAY
          ======================================================== */}
      {/* Top Left Cobweb with Parallax Shift */}
      <div
        className="anim-web-sway absolute top-0 left-0 transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${scrollY * 0.04}px, ${scrollY * 0.08}px) rotate(${Math.min(6, scrollY * 0.01)}deg)`,
        }}
      >
        <svg
          className="w-56 h-56 sm:w-72 sm:h-72 opacity-65 dark:opacity-45 text-slate-600 dark:text-slate-400"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.9"
        >
          <line x1="0" y1="0" x2="200" y2="20" />
          <line x1="0" y1="0" x2="185" y2="65" />
          <line x1="0" y1="0" x2="160" y2="110" />
          <line x1="0" y1="0" x2="120" y2="155" />
          <line x1="0" y1="0" x2="70" y2="185" />
          <line x1="0" y1="0" x2="20" y2="200" />
          <path d="M 30,3 Q 28,10 24,17 Q 18,23 11,28 Q 3,30 0,30" strokeWidth="0.7" />
          <path d="M 60,6 Q 55,20 48,33 Q 36,46 21,55 Q 6,60 0,60" strokeWidth="0.7" />
          <path d="M 95,10 Q 88,31 76,52 Q 57,74 33,88 Q 10,95 0,95" strokeWidth="0.7" />
          <path d="M 135,14 Q 125,44 108,74 Q 81,105 47,125 Q 14,135 0,135" strokeWidth="0.8" />
          <path d="M 175,18 Q 162,57 140,96 Q 105,136 61,162 Q 18,175 0,175" strokeWidth="0.8" />
          <path d="M 108,74 Q 115,110 110,140 Q 105,170 108,190" strokeDasharray="3,2" strokeWidth="0.6" />
        </svg>
      </div>

      {/* Top Right Cobweb with Parallax Shift */}
      <div
        className="anim-web-sway absolute top-0 right-0 transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${-scrollY * 0.04}px, ${scrollY * 0.08}px) scaleX(-1) rotate(${Math.min(6, scrollY * 0.01)}deg)`,
        }}
      >
        <svg
          className="w-56 h-56 sm:w-72 sm:h-72 opacity-65 dark:opacity-45 text-slate-600 dark:text-slate-400"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.9"
        >
          <line x1="0" y1="0" x2="195" y2="25" />
          <line x1="0" y1="0" x2="175" y2="70" />
          <line x1="0" y1="0" x2="145" y2="120" />
          <line x1="0" y1="0" x2="105" y2="160" />
          <line x1="0" y1="0" x2="55" y2="190" />
          <line x1="0" y1="0" x2="15" y2="200" />
          <path d="M 35,4 Q 31,12 26,21 Q 19,29 10,34 Q 3,36 0,36" strokeWidth="0.7" />
          <path d="M 70,9 Q 63,25 52,43 Q 38,58 20,68 Q 5,72 0,72" strokeWidth="0.7" />
          <path d="M 110,14 Q 98,39 82,67 Q 59,91 31,107 Q 8,113 0,113" strokeWidth="0.7" />
          <path d="M 155,20 Q 138,55 115,95 Q 83,127 44,150 Q 12,158 0,158" strokeWidth="0.8" />
        </svg>
      </div>

      {/* ========================================================
          LAYER 6: CONTINUOUS GROUND CEMETERY MIST / FOG
          ======================================================== */}
      <div className="absolute bottom-0 left-0 right-0 h-44 overflow-hidden pointer-events-none opacity-40 dark:opacity-60">
        {/* Mist layer 1 (Slow) */}
        <div className="anim-mist-slow absolute bottom-0 left-0 w-[200%] h-36 bg-gradient-to-t from-slate-300/60 via-slate-200/30 to-transparent dark:from-slate-900/90 dark:via-slate-800/40 dark:to-transparent filter blur-md" />
        {/* Mist layer 2 (Faster counter-drift) */}
        <div className="anim-mist-fast absolute bottom-0 left-0 w-[200%] h-28 bg-gradient-to-t from-amber-100/40 via-slate-100/20 to-transparent dark:from-indigo-950/60 dark:via-purple-950/30 dark:to-transparent filter blur-lg" />
      </div>
    </div>
  );
};
