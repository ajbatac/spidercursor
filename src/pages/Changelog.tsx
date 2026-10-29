/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Public-facing Changelog: High-level, beautifully formatted, security-safe version history.
 * NOTE: Omits all internal paths, filenames, and sensitive implementation details.
 */

import React from 'react';
import { ArrowLeft, Rss, Sparkles, CheckCircle2, Calendar, ShieldCheck, Zap } from 'lucide-react';

interface ChangelogProps {
  onBackToHome: () => void;
}

interface ReleaseEntry {
  version: string;
  date: string;
  title: string;
  badge: string;
  highlights: string[];
}

const releases: ReleaseEntry[] = [
  {
    version: 'v0.1.1',
    date: 'October 29, 2026',
    title: 'Interactive 404 Experience, Search Discovery, and RSS Feed',
    badge: 'Latest Release',
    highlights: [
      'Interactive 404 Experience: Added an atmospheric, playful error page where the spider reacts to pumpkin bait and startle gestures when you wander off path.',
      'Improved Search & AI Assistant Discovery: Made SpiderCursor easier to discover on major search engines and modern AI assistants with rich answer snippets and metadata.',
      'Public Changelog & RSS Feed: Introduced this visual update log along with an automated RSS feed so users can subscribe to new releases.',
      'High-Resolution Iconography & PWA Support: Added crisp vector and mobile icons for bookmarking and mobile home screen installation.',
    ],
  },
  {
    version: 'v0.1.0',
    date: 'October 29, 2026',
    title: 'Initial Release of Procedural 8-Legged Web Arachnid',
    badge: 'Launch',
    highlights: [
      'Initial Public Release: The debut of SpiderCursor, a realistic top-down 8-legged procedural spider that stalks your cursor on any web page.',
      '4 Distinct Arachnid Behaviors: Added Hunt, Flee, Free Roam, and Perch modes with live switching.',
      'Non-Blocking Click-Through Technology: Engineered the overlay so every button, link, and input on your website remains 100% interactive.',
      'Procedural Chitin Footsteps: Zero audio files to download; footstep clicks are synthesized mathematically directly in the browser.',
      'Playground Dock & Spooky Species: Real-time controls to change scale, speed, colors, and spooky presets like Black Widow and Pumpkin Spider.',
    ],
  },
];

export const Changelog: React.FC<ChangelogProps> = ({ onBackToHome }) => {
  return (
    <div className="relative min-h-[90vh] px-4 sm:px-6 py-12 max-w-4xl mx-auto">
      {/* Top Navigation & RSS Subscription Badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-slate-200 dark:border-slate-800">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onBackToHome();
          }}
          className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to home</span>
        </a>

        {/* Pill / Badge: "Subscribe to this feed" */}
        <a
          href="/changelog/rss"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/20 text-xs font-semibold shadow-sm transition-all hover:scale-105 active:scale-95"
          title="Subscribe to RSS Feed"
        >
          <Rss className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
          <span>Subscribe to this feed</span>
        </a>
      </div>

      {/* Header Banner */}
      <div className="my-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
          <span>Official Releases</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Changelog
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          Stay up to date with new features, visual improvements, behavioral modes, and interactive additions to SpiderCursor.
        </p>
      </div>

      {/* Timeline Releases */}
      <div className="space-y-12">
        {releases.map((release, index) => (
          <article
            key={release.version}
            id={release.version}
            className="relative p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/5 dark:shadow-none backdrop-blur-sm transition-all"
          >
            {/* Version & Date Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">
                  {release.version}
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                  {release.badge}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <Calendar className="w-3.5 h-3.5" />
                <span>{release.date}</span>
              </div>
            </div>

            {/* Release Title */}
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4">
              {release.title}
            </h2>

            {/* Release Highlights (Bulleted list matching RSS) */}
            <ul className="space-y-3">
              {release.highlights.map((highlight, hIdx) => {
                const [title, ...rest] = highlight.split(': ');
                const details = rest.join(': ');
                return (
                  <li key={hIdx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      {details ? (
                        <>
                          <strong className="text-slate-900 dark:text-white font-semibold">{title}:</strong>{' '}
                          <span>{details}</span>
                        </>
                      ) : (
                        <span>{highlight}</span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>

      {/* Footer Return */}
      <div className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onBackToHome();
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to home</span>
        </a>
      </div>
    </div>
  );
};

