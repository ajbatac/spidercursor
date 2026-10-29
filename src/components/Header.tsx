/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Download, Sun, Moon, BookOpen, Layers } from 'lucide-react';
import { SpiderThemeMode } from '../spider-cursor/types';

interface HeaderProps {
  currentTheme: SpiderThemeMode;
  onThemeChange: (theme: SpiderThemeMode) => void;
  onOpenDownload: () => void;
  onScrollToDocs: () => void;
  onScrollToTestbed: () => void;
  isDarkActive: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTheme,
  onThemeChange,
  onOpenDownload,
  onScrollToDocs,
  onScrollToTestbed,
  isDarkActive,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-white/85 dark:bg-slate-950/85 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-950 dark:bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-500 shadow-sm font-black text-xl select-none">
            🕷
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-slate-950 dark:text-white text-lg">
                SpiderCursor
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                v1.0.0
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Top-Down Procedural IK Arachnid for the Web
            </p>
          </div>
        </div>

        {/* Navigation & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onScrollToTestbed}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Testbed</span>
          </button>

          <button
            onClick={onScrollToDocs}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Docs & API</span>
          </button>

          {/* Direct 1-Click Light / Dark Switcher */}
          <button
            onClick={() => onThemeChange(isDarkActive ? 'light' : 'dark')}
            title={isDarkActive ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg border border-slate-300 dark:border-slate-800 shadow-sm transition-all cursor-pointer"
          >
            {isDarkActive ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-500" />
                <span>Dark Mode</span>
              </>
            )}
          </button>

          {/* Download button */}
          <button
            onClick={onOpenDownload}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Get Code</span>
          </button>
        </div>
      </div>
    </header>
  );
};
