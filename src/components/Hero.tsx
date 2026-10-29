/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Hero Section introducing SpiderCursor with instant 1-click free downloads.
 */

import React, { useState } from 'react';
import { Download, Terminal, Check, Copy, ArrowRight, Skull, Gift, Star, ExternalLink } from 'lucide-react';
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

        <div className="inline-flex items-center gap-2 px-[12px] py-1.5 rounded-[12px] text-xs font-semibold bg-slate-900/90 text-amber-400 border border-amber-500/30 shadow-sm">
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
          className="flex items-center gap-2 px-[12px] py-3.5 rounded-[12px] bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-950/20 transition-all active:scale-95 cursor-pointer"
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
          className="flex items-center gap-2 px-[12px] py-3.5 rounded-[12px] bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-800 transition-all active:scale-95 cursor-pointer"
        >
          <span>⚡ Startle Spider</span>
        </button>

        {/* View Code Modal */}
        <button
          onClick={onOpenDownload}
          className="flex items-center gap-1.5 px-[12px] py-3.5 rounded-[12px] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium text-sm transition-colors cursor-pointer"
        >
          <span>View Source & NPM Package</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* GitHub Repository Showcase Card */}
      <div className="mt-8 max-w-xl mx-auto">
        <a
          href="https://github.com/ajbatac/spidercursor"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block rounded-[12px] bg-white/90 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 hover:border-amber-500/70 dark:hover:border-amber-500/70 px-[12px] py-4 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-amber-500/5 text-left"
          title="Open ajbatac/spidercursor on GitHub"
        >
          {/* Top Row: GitHub Icon, Repo Slug, Public Badge, and Star CTA */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-[12px] bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-800 dark:text-slate-100 group-hover:text-amber-500 dark:group-hover:text-amber-400 group-hover:scale-105 transition-all shrink-0">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </div>

              <div className="truncate">
                <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                  <span className="text-slate-400 dark:text-slate-500">ajbatac</span>
                  <span className="text-slate-400">/</span>
                  <span className="text-slate-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                    spidercursor
                  </span>
                </div>
              </div>

              <span className="hidden sm:inline-block px-[12px] py-0.5 rounded-[12px] text-[10px] font-mono font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                Public
              </span>
            </div>

            {/* Star on GitHub CTA */}
            <div className="flex items-center gap-1.5 px-[12px] py-1.5 rounded-[12px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 text-xs font-semibold border border-slate-300 dark:border-slate-700 shadow-sm shrink-0 transition-colors">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="hidden xs:inline">Star on</span>
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Description */}
          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Lightweight, top-down procedural 3D arachnid with inverse kinematics and realistic leg gait. 100% free, zero asset dependencies, and embeddable in 1 line.
          </p>

          {/* Repo Badges / Stats Bar */}
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3178c6]" />
                <span className="text-slate-700 dark:text-slate-300 font-sans font-medium">TypeScript</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#049ef4]" />
                <span className="text-slate-700 dark:text-slate-300 font-sans font-medium">Three.js</span>
              </span>
              <span className="flex items-center gap-1">
                <span>Apache-2.0</span>
              </span>
              <span className="hidden sm:inline text-amber-600 dark:text-amber-400 font-semibold">
                v0.1.1
              </span>
            </div>

            <span className="text-xs font-sans font-semibold text-amber-600 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
              <span>View repository</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </a>
      </div>

      {/* Copyable 1-Liner Script Bar */}
      <div className="mt-8 max-w-xl mx-auto">
        <div className="bg-slate-950 text-slate-200 rounded-[12px] p-2.5 sm:p-3 border border-slate-800 shadow-xl flex items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none py-1">
            <Terminal className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="text-slate-400 select-none">&lt;body onload=&quot;</span>
            <span className="font-instrument italic font-bold">
              <span className="text-slate-400">Spider</span>
              <span className="text-orange-500">Cursor</span>
            </span>
            <span className="text-amber-400 font-semibold">.init()</span>
            <span className="text-slate-400 select-none">&quot;&gt;</span>
          </div>

          <button
            onClick={handleCopyOneLiner}
            className="flex items-center gap-1 px-[12px] py-1.5 rounded-[12px] bg-slate-800 hover:bg-slate-700 text-slate-200 font-sans font-medium text-xs transition-colors shrink-0 border border-slate-700 cursor-pointer"
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
        <div className="px-[12px] py-4 rounded-[12px] bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-sm shadow-sm">
          <div className="font-bold text-slate-900 dark:text-white text-sm">100% Free & Open</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            No accounts, no paywalls, no tracking. Built purely as a fun open-source web widget.
          </div>
        </div>

        <div className="px-[12px] py-4 rounded-[12px] bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-sm shadow-sm">
          <div className="font-bold text-slate-900 dark:text-white text-sm">Top-Down Perspective</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Realistic dorsal silhouette with tapered leg joints, carapace, and ground drop shadows.
          </div>
        </div>

        <div className="px-[12px] py-4 rounded-[12px] bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-sm shadow-sm">
          <div className="font-bold text-slate-900 dark:text-white text-sm">Non-Blocking UI</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Clicks pass straight through so your site buttons, inputs, and links work untouched.
          </div>
        </div>

        <div className="px-[12px] py-4 rounded-[12px] bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-sm shadow-sm">
          <div className="font-bold text-slate-900 dark:text-white text-sm">Zero 404 Assets</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pure procedural code. No external image files or 3D models to host or download.
          </div>
        </div>
      </div>
    </section>
  );
};
