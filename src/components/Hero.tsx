/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Hero Section introducing SpiderCursor with instant 1-click free downloads.
 */

import React, { useState } from 'react';
import { Download, Terminal, Check, Copy, ArrowRight, Skull, Gift } from 'lucide-react';
import { JackOLantern } from './JackOLantern';
import { downloadStandaloneFile } from '../spider-cursor/downloadHelpers';
import { STANDALONE_HTML_DEMO } from '../spider-cursor/package-files';

interface HeroProps {
  onOpenDownload: () => void;
  onScrollToDocs: () => void;
  onScare: () => void;
  onDropBait: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenDownload,
  onScrollToDocs,
  onScare,
  onDropBait,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const oneLiner = '<script src="https://unpkg.com/spider-cursor" onload="SpiderCursor.init()"></script>';

  const handleCopyOneLiner = () => {
    navigator.clipboard.writeText(oneLiner);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInstantDownload = () => {
    downloadStandaloneFile('spider-demo.html', STANDALONE_HTML_DEMO, 'text/html');
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <section className="pt-28 pb-16 px-4 sm:px-6 max-w-5xl mx-auto text-center relative z-10">
      {/* Top Pumpkin Accent and Free Tag */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <JackOLantern onSummonSpider={onDropBait} />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-900/90 text-amber-400 border border-amber-500/30 shadow-sm">
          <Gift className="w-3.5 h-3.5 text-amber-400" />
          <span>100% Free and Open Source Fun</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[11px] text-slate-400 font-mono">No Signups</span>
        </div>
      </div>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white max-w-4xl mx-auto leading-tight">
        A Realistic Top-Down Spider
        <span className="block text-slate-500 dark:text-slate-400 font-normal text-3xl sm:text-5xl mt-2">
          Add to any page in 1 line. Just for fun.
        </span>
      </h1>

      {/* Description */}
      <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
        Move your pointer around: the spider calculates realistic leg physics in real time and stalks your cursor across the screen. Drop it onto your personal site, blog, or Halloween prank for instant fun.
      </p>

      {/* Primary Action Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {/* Instant 1-Click Free Download */}
        <button
          onClick={handleInstantDownload}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-950/20 transition-all active:scale-95 cursor-pointer"
        >
          {downloadSuccess ? (
            <>
              <Check className="w-4 h-4 text-slate-950" />
              <span>Downloaded spider-demo.html!</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-slate-950" />
              <span>Instant Download (Free HTML Demo)</span>
            </>
          )}
        </button>

        {/* Startle Button */}
        <button
          onClick={onScare}
          className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-800 transition-all active:scale-95 cursor-pointer"
        >
          <span>⚡ Startle Spider</span>
        </button>

        {/* View Code Modal */}
        <button
          onClick={onOpenDownload}
          className="flex items-center gap-1.5 px-4 py-3.5 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium text-sm transition-colors cursor-pointer"
        >
          <span>View Source & NPM Package</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Copyable 1-Liner Script Bar */}
      <div className="mt-10 max-w-xl mx-auto">
        <div className="bg-slate-950 text-slate-200 rounded-xl p-2.5 sm:p-3 border border-slate-800 shadow-xl flex items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none py-1">
            <Terminal className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="text-slate-400 select-none">&lt;body onload=&quot;</span>
            <span className="text-amber-400 font-semibold">SpiderCursor.init()</span>
            <span className="text-slate-400 select-none">&quot;&gt;</span>
          </div>

          <button
            onClick={handleCopyOneLiner}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-sans font-medium text-xs transition-colors shrink-0 border border-slate-700 cursor-pointer"
            title="Copy script snippet"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
          Paste into any HTML document to test right in your browser.
        </p>
      </div>

      {/* Feature Highlights Grid */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
        <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-sm shadow-sm">
          <div className="font-bold text-slate-900 dark:text-white text-sm">100% Free & Open</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            No accounts, no paywalls, no tracking. Built purely as a fun open-source web widget.
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-sm shadow-sm">
          <div className="font-bold text-slate-900 dark:text-white text-sm">Top-Down Perspective</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Realistic dorsal silhouette with tapered leg joints, carapace, and ground drop shadows.
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-sm shadow-sm">
          <div className="font-bold text-slate-900 dark:text-white text-sm">Non-Blocking UI</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Clicks pass straight through so your site buttons, inputs, and links work untouched.
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-sm shadow-sm">
          <div className="font-bold text-slate-900 dark:text-white text-sm">Zero 404 Assets</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pure procedural code. No external image files or 3D models to host or download.
          </div>
        </div>
      </div>
    </section>
  );
};
