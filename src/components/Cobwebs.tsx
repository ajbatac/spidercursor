/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Intricate procedural SVG cobwebs draped in viewport corners.
 */

import React from 'react';

export const Cobwebs: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden select-none">
      {/* Top-Left Cobweb */}
      <svg
        className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 opacity-60 dark:opacity-40 text-slate-600 dark:text-slate-400"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
      >
        {/* Radial Spokes */}
        <line x1="0" y1="0" x2="200" y2="20" />
        <line x1="0" y1="0" x2="185" y2="65" />
        <line x1="0" y1="0" x2="160" y2="110" />
        <line x1="0" y1="0" x2="120" y2="155" />
        <line x1="0" y1="0" x2="70" y2="185" />
        <line x1="0" y1="0" x2="20" y2="200" />

        {/* Concentric spiral web arcs */}
        <path d="M 30,3 Q 28,10 24,17 Q 18,23 11,28 Q 3,30 0,30" strokeWidth="0.6" />
        <path d="M 60,6 Q 55,20 48,33 Q 36,46 21,55 Q 6,60 0,60" strokeWidth="0.6" />
        <path d="M 95,10 Q 88,31 76,52 Q 57,74 33,88 Q 10,95 0,95" strokeWidth="0.6" />
        <path d="M 135,14 Q 125,44 108,74 Q 81,105 47,125 Q 14,135 0,135" strokeWidth="0.7" />
        <path d="M 175,18 Q 162,57 140,96 Q 105,136 61,162 Q 18,175 0,175" strokeWidth="0.7" />

        {/* Hanging loose silk filament */}
        <path d="M 108,74 Q 115,110 110,140 Q 105,170 108,190" strokeDasharray="3,2" strokeWidth="0.5" />
      </svg>

      {/* Top-Right Cobweb */}
      <svg
        className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 opacity-60 dark:opacity-40 text-slate-600 dark:text-slate-400 scale-x-[-1]"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
      >
        <line x1="0" y1="0" x2="195" y2="25" />
        <line x1="0" y1="0" x2="175" y2="70" />
        <line x1="0" y1="0" x2="145" y2="120" />
        <line x1="0" y1="0" x2="105" y2="160" />
        <line x1="0" y1="0" x2="55" y2="190" />
        <line x1="0" y1="0" x2="15" y2="200" />

        <path d="M 35,4 Q 31,12 26,21 Q 19,29 10,34 Q 3,36 0,36" strokeWidth="0.6" />
        <path d="M 70,9 Q 63,25 52,43 Q 38,58 20,68 Q 5,72 0,72" strokeWidth="0.6" />
        <path d="M 110,14 Q 98,39 82,67 Q 59,91 31,107 Q 8,113 0,113" strokeWidth="0.6" />
        <path d="M 155,20 Q 138,55 115,95 Q 83,127 44,150 Q 12,158 0,158" strokeWidth="0.7" />

        {/* Subtle dangling silk thread */}
        <path d="M 82,67 Q 88,105 84,135 Q 80,165 83,185" strokeDasharray="2,3" strokeWidth="0.5" />
      </svg>

      {/* Subtle border web corner bottom left */}
      <svg
        className="absolute bottom-0 left-0 w-36 h-36 opacity-40 dark:opacity-30 text-slate-600 dark:text-slate-400 scale-y-[-1]"
        viewBox="0 0 150 150"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.7"
      >
        <line x1="0" y1="0" x2="150" y2="20" />
        <line x1="0" y1="0" x2="130" y2="70" />
        <line x1="0" y1="0" x2="80" y2="120" />
        <line x1="0" y1="0" x2="20" y2="150" />
        <path d="M 50,7 Q 43,23 27,40 Q 7,50 0,50" />
        <path d="M 100,13 Q 87,47 53,80 Q 13,100 0,100" />
      </svg>
    </div>
  );
};
