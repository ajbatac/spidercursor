/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 404 Not Found Page: Spooky, hilarious, and interactive spider-infested dead end.
 */

import React, { useState } from 'react';
import { Home, Zap, Flame, Bug, Terminal, AlertTriangle, ArrowLeft, RefreshCw, Skull, Sparkles } from 'lucide-react';

interface NotFoundProps {
  onBackToHome: () => void;
  onScareSpider?: () => void;
  onDropBait?: () => void;
  onSwarm?: () => void;
  currentPath?: string;
}

export const NotFound: React.FC<NotFoundProps> = ({
  onBackToHome,
  onScareSpider,
  onDropBait,
  onSwarm,
  currentPath = typeof window !== 'undefined' ? window.location.pathname : '/404',
}) => {
  const [clickCount, setClickCount] = useState(0);
  const [panicMode, setPanicMode] = useState(false);
  const [fliesEaten, setFliesEaten] = useState(0);
  const [baitDroppedMessage, setBaitDroppedMessage] = useState<string | null>(null);

  const handleBait = () => {
    onDropBait?.();
    setFliesEaten((prev) => prev + 1);
    setBaitDroppedMessage('Pumpkin bait tossed! The spider is sprinting across your screen!');
    setTimeout(() => setBaitDroppedMessage(null), 3500);
  };

  const handleScare = () => {
    onScareSpider?.();
    setClickCount((c) => c + 1);
  };

  const handleSwarmToggle = () => {
    setPanicMode(true);
    onSwarm?.();
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onBackToHome();
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-16 overflow-hidden select-none">
      {/* Background Ambience: Spooky spiderweb glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-amber-500/15 via-rose-600/10 to-violet-600/15 blur-3xl rounded-full" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-amber-500/10 blur-3xl rounded-full" />
      </div>

      {/* Spider Eyes Blinking in the Dark */}
      <div className="flex items-center gap-1.5 mb-6 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 shadow-inner backdrop-blur-sm">
        <span className="text-[11px] font-mono font-medium text-slate-400">Arachnid Ocelli:</span>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_#f43f5e]" />
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping shadow-[0_0_6px_#f43f5e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_#fbbf24]" />
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_6px_#f43f5e]" />
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_#f43f5e]" />
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_#fbbf24]" />
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_#f43f5e]" />
        </div>
        <span className="text-[10px] uppercase tracking-widest font-bold text-amber-500 ml-1">
          8 Eyes Locked On You
        </span>
      </div>

      {/* GIANT CRAZY 404 DISPLAY WITH SVG COBWEBS */}
      <div className="relative text-center my-2">
        {/* Decorative SVG silk draped across the 404 */}
        <svg
          className="absolute -top-12 left-1/2 -translate-x-1/2 w-80 sm:w-96 h-28 pointer-events-none opacity-50 text-slate-400 dark:text-slate-500"
          viewBox="0 0 300 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M 10,10 Q 75,60 150,20 Q 225,65 290,10" strokeDasharray="3 2" />
          <path d="M 50,15 Q 150,85 250,15" />
          <path d="M 150,20 L 150,90" strokeWidth="1" strokeDasharray="2 3" />
          <circle cx="150" cy="92" r="4" fill="#f97316" className="animate-bounce" />
        </svg>

        <div className="relative inline-block font-black font-mono tracking-tighter text-8xl sm:text-9xl md:text-[13rem] leading-none text-transparent bg-clip-text bg-gradient-to-b from-amber-400 via-orange-500 to-rose-600 drop-shadow-[0_15px_35px_rgba(249,115,22,0.35)] select-none">
          404
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-6deg] px-4 py-1.5 rounded-xl bg-slate-950/90 text-amber-400 border border-amber-500/40 shadow-2xl backdrop-blur-md text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 animate-bounce" />
          <span>Web Devoured By Spider</span>
        </div>
      </div>

      {/* Main Headline & Relatable Subtitle */}
      <div className="max-w-2xl text-center z-10 mt-4 space-y-3">
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          The Spider Chewed Through This Route
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          We computed <span className="font-semibold text-slate-900 dark:text-slate-200">60 FPS inverse kinematics</span> for all 8 multi-jointed chitin legs, solved real-time gait trigonometry every frame, and rendered physics-based drop shadows... but even Three.js could not locate{' '}
          <code className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-xs border border-amber-500/20">
            {currentPath}
          </code>
          .
        </p>
      </div>

      {/* Fun Relatable Arachnid Server Incident Log */}
      <div className="w-full max-w-xl mt-6 rounded-2xl bg-slate-900/90 border border-slate-800 p-4 font-mono text-xs text-slate-300 shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>server_incident_report_404.log</span>
          </div>
          <span className="text-rose-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
            ARACHNID_INTERCEPT
          </span>
        </div>
        <div className="space-y-1 text-slate-400">
          <p className="text-emerald-400">&gt; GET {currentPath} HTTP/1.1</p>
          <p>&gt; Looking up route in virtual DOM tree... <span className="text-rose-400 font-bold">FAILED (0 bytes found)</span></p>
          <p>&gt; Inspecting spider spinneret dragline... <span className="text-amber-400 font-bold">CAUGHT IN WEB</span></p>
          <p>&gt; Digestive enzymes dissolved URL at byte offset 404.</p>
          <p className="text-slate-500 text-[10px]">
            &gt; Recommendation: Keep moving your cursor. The spider stalks dormant prey.
          </p>
        </div>
      </div>

      {/* Interactive Chaos Buttons (Go Big & Go Crazy) */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 z-10 max-w-lg">
        {/* Pumpkin Bait Summon */}
        <button
          onClick={handleBait}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs shadow-lg shadow-orange-600/30 active:scale-95 transition-all cursor-pointer"
        >
          <span className="text-base">🎃</span>
          <span>Toss Bait ({fliesEaten} Fed)</span>
        </button>

        {/* Startle Recoil */}
        <button
          onClick={handleScare}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 dark:text-amber-400 border border-amber-500/30 font-semibold text-xs active:scale-95 transition-all cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>Startle Spider ({clickCount})</span>
        </button>

        {/* Swarm Panic */}
        <button
          onClick={handleSwarmToggle}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs border border-slate-300 dark:border-slate-700 active:scale-95 transition-all cursor-pointer"
        >
          <Bug className="w-3.5 h-3.5 text-rose-500" />
          <span>{panicMode ? 'Swarm Unleashed! 🕷️' : 'Spawn Swarm Chaos'}</span>
        </button>
      </div>

      {/* Bait alert banner */}
      {baitDroppedMessage && (
        <div className="mt-4 px-4 py-2 rounded-lg bg-orange-500/20 border border-orange-500/40 text-orange-600 dark:text-orange-300 text-xs font-medium animate-bounce flex items-center gap-2">
          <span>🕷️</span>
          <span>{baitDroppedMessage}</span>
        </div>
      )}

      {/* PRIMARY LINK BACK TO / "Back to home" (As requested) */}
      <div className="mt-10 z-10 flex flex-col items-center gap-3">
        <a
          href="/"
          onClick={handleLinkClick}
          className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 font-bold text-sm shadow-xl shadow-slate-900/20 dark:shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to home</span>
        </a>

        {/* Basic plain HTML link fallback */}
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Or return to safety: <a href="/" onClick={handleLinkClick} className="underline hover:text-amber-500 transition-colors">Back to home</a>
        </p>
      </div>

      {/* Relatable Footer Joke */}
      <div className="mt-12 text-center text-xs text-slate-500 dark:text-slate-500 max-w-md">
        <p>
          "I didn't choose the 404 life. The spider inverse-kinematically chased me into it."
        </p>
      </div>
    </div>
  );
};

