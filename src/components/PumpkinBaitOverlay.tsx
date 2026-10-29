/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Visible, animated Pumpkin Bait overlay.
 * Renders an appetizing glowing Jack-o'-Lantern morsel that drops onto the page,
 * casts an aroma aura, and gets crunched/devoured when the spider reaches it.
 */

import React from 'react';
import { X } from 'lucide-react';

export interface PumpkinBaitData {
  id: number;
  x: number;
  y: number;
  eaten: boolean;
}

interface PumpkinBaitOverlayProps {
  bait: PumpkinBaitData | null;
  onClearBait: () => void;
}

export const PumpkinBaitOverlay: React.FC<PumpkinBaitOverlayProps> = ({
  bait,
  onClearBait,
}) => {
  if (!bait) return null;

  return (
    <div
      className="fixed z-50 pointer-events-auto transition-transform select-none"
      style={{
        left: `${bait.x}px`,
        top: `${bait.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {!bait.eaten ? (
        <div className="relative group flex flex-col items-center">
          {/* Scent / Aroma pulse wave attracting the spider */}
          <div className="absolute -inset-4 rounded-full border-2 border-amber-500/50 animate-ping opacity-60 pointer-events-none" />
          <div className="absolute -inset-8 rounded-full border border-orange-500/30 animate-pulse opacity-40 pointer-events-none" />

          {/* Candlelight Warmth Aura */}
          <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-amber-500/40 via-orange-500/50 to-amber-300/30 blur-md pointer-events-none" />

          {/* Glowing Carved Pumpkin Bait Model */}
          <div className="relative z-10 transition-transform hover:scale-110 active:scale-95 cursor-grab">
            <svg
              className="w-14 h-14 filter drop-shadow-xl animate-bounce"
              style={{ animationDuration: '1.2s' }}
              viewBox="0 0 100 100"
              fill="none"
            >
              {/* Stem */}
              <path
                d="M 48,16 C 47,6 56,2 59,1 C 55,5 53,10 54,16 Z"
                fill="#3f6212"
                stroke="#1a2e05"
                strokeWidth="1.5"
              />

              {/* Pumpkin Lobes */}
              <ellipse cx="30" cy="54" rx="20" ry="28" fill="#c2410c" />
              <ellipse cx="70" cy="54" rx="20" ry="28" fill="#c2410c" />
              <ellipse cx="38" cy="55" rx="19" ry="30" fill="#ea580c" />
              <ellipse cx="62" cy="55" rx="19" ry="30" fill="#ea580c" />
              <ellipse cx="50" cy="56" rx="21" ry="31" fill="#f97316" />

              {/* Contour outline */}
              <path
                d="M 50,25 C 26,25 10,37 10,56 C 10,75 26,87 50,87 C 74,87 90,75 90,56 C 90,37 74,25 50,25 Z"
                stroke="#7c2d12"
                strokeWidth="2.2"
                fill="none"
              />

              {/* Glowing Eyes */}
              <polygon points="30,42 41,50 31,52" fill="#fef08a" stroke="#451a03" strokeWidth="1.2" />
              <polygon points="70,42 59,50 69,52" fill="#fef08a" stroke="#451a03" strokeWidth="1.2" />

              {/* Nose */}
              <polygon points="50,51 46,58 54,58" fill="#fef08a" stroke="#451a03" strokeWidth="1" />

              {/* Grin */}
              <path
                d="M 25,65 L 33,71 L 39,66 L 46,73 L 54,66 L 61,73 L 67,66 L 75,71 L 71,76 L 64,72 L 58,78 L 50,72 L 42,78 L 36,72 L 28,76 Z"
                fill="#fde047"
                stroke="#451a03"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Interactive Status Pill */}
          <div className="mt-1 flex items-center gap-1.5 px-[12px] py-0.5 rounded-[12px] bg-slate-950/90 text-amber-300 border border-amber-500/40 text-[10px] font-mono shadow-lg backdrop-blur-md whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            <span>Pumpkin Bait</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClearBait();
              }}
              className="text-slate-400 hover:text-white ml-1 p-0.5 rounded hover:bg-slate-800 transition-colors"
              title="Remove bait"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      ) : (
        /* Devoured Crunch Splash Animation */
        <div className="relative flex flex-col items-center animate-out zoom-out-50 duration-700">
          <div className="px-[12px] py-1.5 rounded-[12px] bg-amber-500 text-slate-950 font-black text-xs shadow-2xl border border-amber-300 flex items-center gap-1.5 scale-110 animate-bounce">
            <span>CHOMP!</span>
            <span>🕷️</span>
            <span className="text-[10px] font-mono font-normal">Devoured!</span>
          </div>

          {/* Flying Pumpkin Crumbs */}
          <div className="relative w-16 h-8 pointer-events-none mt-1">
            <span className="absolute top-0 left-2 w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span className="absolute top-2 right-3 w-2 h-2 rounded-full bg-orange-600 animate-ping" />
            <span className="absolute bottom-0 left-6 w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            <span className="absolute top-1 left-8 w-1 h-1 rounded-full bg-yellow-300 animate-ping" />
          </div>
        </div>
      )}
    </div>
  );
};
