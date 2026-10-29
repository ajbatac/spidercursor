/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Spooky Interactive Testbed demonstrating seamless pointer-events: none pass-through.
 * Purely for fun, proving that inputs, buttons, and clicks work under the spider.
 */

import React, { useState } from 'react';
import { MousePointer, CheckCircle, Search, Skull, ExternalLink, Heart, Send, Ghost, Flame } from 'lucide-react';

export const InteractiveTestBed: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [sampleInput, setSampleInput] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [spookyMode, setSpookyMode] = useState<'prank' | 'treat'>('prank');

  return (
    <section id="testbed" className="py-16 px-4 sm:px-6 max-w-5xl mx-auto relative z-10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-[12px] py-1 rounded-[12px] text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-3">
          <MousePointer className="w-3.5 h-3.5" />
          <span>Interactive Click-Through Playground</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
          Try Clicking and Typing While It Crawls
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto mt-2">
          Notice how the spider walks smoothly over buttons, text, and inputs without blocking your clicks. 100% free fun for your site.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Interactive Form Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[12px] px-[12px] py-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-950 dark:text-white text-base mb-1">
              Input and Typing Test
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Type into this box while the spider crawls over it.
            </p>

            <div className="space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Type a spooky spell..."
                  value={sampleInput}
                  onChange={(e) => setSampleInput(e.target.value)}
                  className="w-full pl-9 pr-[12px] py-2 text-xs rounded-[12px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setClickCount(c => c + 1)}
                  className="flex-1 py-2 px-[12px] text-xs font-semibold bg-slate-950 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 rounded-[12px] transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Click Me</span>
                </button>
                <div className="px-[12px] py-2 bg-slate-100 dark:bg-slate-800 rounded-[12px] text-xs font-mono font-bold text-slate-700 dark:text-slate-300 flex items-center">
                  Clicks: {clickCount}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
            {sampleInput ? `Echo: "${sampleInput}"` : 'Native browser inputs remain fully responsive'}
          </div>
        </div>

        {/* Fun Spooky Mood Toggle */}
        <div className="bg-white dark:bg-slate-900 rounded-[12px] px-[12px] py-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-950 dark:text-white text-base mb-1">
              Trick or Treat Selector
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Select a mood to test clickable radio card components.
            </p>

            <div className="space-y-2">
              <label
                onClick={() => setSpookyMode('prank')}
                className={`flex items-center justify-between px-[12px] py-3 rounded-[12px] border text-xs cursor-pointer transition-colors ${
                  spookyMode === 'prank'
                    ? 'border-slate-950 dark:border-amber-500 bg-slate-100 dark:bg-slate-800 font-semibold'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <span className="text-slate-900 dark:text-white flex items-center gap-2">
                  <Skull className="w-3.5 h-3.5 text-amber-500" />
                  <span>Prank Mode (Jumpscare Crawl)</span>
                </span>
                <span className="text-[11px] font-mono text-amber-500">Fun</span>
              </label>

              <label
                onClick={() => setSpookyMode('treat')}
                className={`flex items-center justify-between px-[12px] py-3 rounded-[12px] border text-xs cursor-pointer transition-colors ${
                  spookyMode === 'treat'
                    ? 'border-slate-950 dark:border-amber-500 bg-slate-100 dark:bg-slate-800 font-semibold'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <span className="text-slate-900 dark:text-white flex items-center gap-2">
                  <Ghost className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Gentle Spider Pet Mode</span>
                </span>
                <span className="text-[11px] font-mono text-indigo-400">Calm</span>
              </label>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="flex items-center gap-1.5 px-[12px] py-1 rounded-[12px] text-xs text-slate-600 dark:text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'text-rose-500 fill-rose-500' : ''}`} />
              <span>{isLiked ? 'Loved!' : 'Like This'}</span>
            </button>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 px-[12px]">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Free and Open</span>
            </span>
          </div>
        </div>

        {/* Text Selection Test */}
        <div className="bg-white dark:bg-slate-900 rounded-[12px] px-[12px] py-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-950 dark:text-white text-base mb-1">
              Highlight and Select Text
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Drag your mouse to highlight this text while the spider scuttles across:
            </p>

            <blockquote className="px-[12px] py-3.5 bg-slate-100 dark:bg-slate-800 rounded-[12px] text-xs text-slate-800 dark:text-slate-200 italic border-l-4 border-amber-500 select-text">
              "Add this spider to any HTML page with one line of code. It crawls toward the visitor's cursor, casts real shadows, and brings spooky fun to any site for free."
            </blockquote>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Free for personal and commercial websites</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
      </div>
    </section>
  );
};
