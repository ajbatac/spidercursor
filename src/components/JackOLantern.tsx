/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Spooky carved Jack-o'-Lantern pumpkin with flickering candlelight.
 */

import React, { useState } from 'react';

interface JackOLanternProps {
  onSummonSpider?: () => void;
}

export const JackOLantern: React.FC<JackOLanternProps> = ({ onSummonSpider }) => {
  const [isFlickering, setIsFlickering] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    setIsFlickering(true);
    setTimeout(() => setIsFlickering(false), 900);
    if (onSummonSpider) {
      onSummonSpider();
    }
  };

  return (
    <div
      onClick={handleClick}
      title="Click the Jack-o'-lantern to bait the spider!"
      className="group relative cursor-pointer select-none inline-block transition-transform hover:scale-105 active:scale-95"
    >
      {/* Dynamic Candle Glow Aura */}
      <div
        className={`absolute -inset-2 rounded-full blur-xl transition-opacity duration-300 pointer-events-none ${
          isFlickering
            ? 'opacity-90 bg-amber-500/60 scale-110'
            : 'opacity-40 group-hover:opacity-75 bg-amber-600/40'
        }`}
      />

      <svg
        className="w-14 h-14 sm:w-16 sm:h-16 relative z-10 filter drop-shadow-md"
        viewBox="0 0 100 100"
        fill="none"
      >
        {/* Curved gnarled stem */}
        <path
          d="M 48,18 C 47,8 55,4 58,2 C 54,6 52,12 53,18 Z"
          fill="#3f6212"
          stroke="#1a2e05"
          strokeWidth="1.2"
        />

        {/* Pumpkin Ribs & Body */}
        {/* Back lobes */}
        <ellipse cx="32" cy="56" rx="20" ry="29" fill="#c2410c" />
        <ellipse cx="68" cy="56" rx="20" ry="29" fill="#c2410c" />
        {/* Mid lobes */}
        <ellipse cx="38" cy="57" rx="19" ry="31" fill="#ea580c" />
        <ellipse cx="62" cy="57" rx="19" ry="31" fill="#ea580c" />
        {/* Front center lobe */}
        <ellipse cx="50" cy="58" rx="21" ry="32" fill="#f97316" />

        {/* Outer pumpkin contour stroke */}
        <path
          d="M 50,26 C 26,26 12,38 12,58 C 12,78 28,90 50,90 C 72,90 88,78 88,58 C 88,38 74,26 50,26 Z"
          stroke="#7c2d12"
          strokeWidth="2.5"
          fill="none"
        />

        {/* Internal subtle rib shadow creases */}
        <path d="M 36,29 C 27,42 27,74 37,88" stroke="#9a3412" strokeWidth="1.5" fill="none" />
        <path d="M 64,29 C 73,42 73,74 63,88" stroke="#9a3412" strokeWidth="1.5" fill="none" />

        {/* Carved Glowing Eyes (Sinister Triangular Cuts) */}
        {/* Left eye */}
        <polygon
          points="31,44 42,52 32,54"
          fill={isFlickering ? '#fef08a' : '#fde047'}
          stroke="#451a03"
          strokeWidth="1.5"
          className="transition-colors"
        />
        {/* Right eye */}
        <polygon
          points="69,44 58,52 68,54"
          fill={isFlickering ? '#fef08a' : '#fde047'}
          stroke="#451a03"
          strokeWidth="1.5"
          className="transition-colors"
        />

        {/* Carved Nose */}
        <polygon
          points="50,53 46,60 54,60"
          fill={isFlickering ? '#fef08a' : '#fde047'}
          stroke="#451a03"
          strokeWidth="1.2"
        />

        {/* Carved Jagged Sinister Grin */}
        <path
          d="M 26,67 L 34,73 L 40,68 L 47,75 L 53,68 L 60,75 L 66,68 L 74,73 L 71,78 L 63,74 L 57,80 L 50,74 L 43,80 L 37,74 L 29,78 Z"
          fill={isFlickering ? '#fef08a' : '#fde047'}
          stroke="#451a03"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* Internal flickering candle shadow */}
        <ellipse cx="50" cy="72" rx="4" ry="2" fill="#ea580c" opacity="0.4" />
      </svg>
    </div>
  );
};
