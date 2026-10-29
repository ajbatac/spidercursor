/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { SpiderCursor, DEFAULT_CONFIG } from './spider-cursor';
import { SpiderConfig, SpiderThemeMode } from './spider-cursor/types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PlaygroundDock } from './components/PlaygroundDock';
import { InteractiveTestBed } from './components/InteractiveTestBed';
import { Documentation } from './components/Documentation';
import { DownloadModal } from './components/DownloadModal';
import { CemeteryParallax } from './components/CemeteryParallax';

export default function App() {
  const spiderRef = useRef<SpiderCursor | null>(null);
  const [config, setConfig] = useState<SpiderConfig>({
    ...DEFAULT_CONFIG,
    size: 1.0,
    speed: 1.15,
    theme: 'auto',
    sound: false,
    webSilk: true,
  });

  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Track system theme changes for root HTML class
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      setIsDarkTheme(e.matches);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const activeDark =
    config.theme === 'dark' ||
    (config.theme === 'auto' && isDarkTheme);

  // Sync dark class on document root
  useEffect(() => {
    const root = document.documentElement;
    if (activeDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [activeDark]);

  // Mount SpiderCursor on body once
  useEffect(() => {
    const spider = new SpiderCursor(config);
    spiderRef.current = spider;

    return () => {
      spider.destroy();
      spiderRef.current = null;
    };
  }, []); // Run once on mount

  // Sync config updates to living spider instance without tearing down canvas
  const handleUpdateConfig = (partial: Partial<SpiderConfig>) => {
    setConfig((prev) => {
      const updated = { ...prev, ...partial };
      spiderRef.current?.updateConfig(updated);
      return updated;
    });
  };

  const handleThemeChange = (theme: SpiderThemeMode) => {
    handleUpdateConfig({ theme });
  };

  const handleScare = () => {
    spiderRef.current?.scare(1.4);
  };

  const handleDropBait = () => {
    // Drop bait at screen center or slightly offset
    const x = window.innerWidth * (0.35 + Math.random() * 0.3);
    const y = window.innerHeight * (0.35 + Math.random() * 0.3);
    spiderRef.current?.feed(x, y);
  };

  const handleRecenter = () => {
    spiderRef.current?.setTarget(window.innerWidth / 2, window.innerHeight / 2);
  };

  const scrollToDocs = () => {
    document.getElementById('docs')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTestbed = () => {
    document.getElementById('testbed')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors selection:bg-amber-500 selection:text-slate-950 dark:selection:bg-amber-400 dark:selection:text-slate-950">
      {/* Over-The-Top Halloween Cemetery Parallax Environment */}
      <CemeteryParallax onBaitSpider={handleDropBait} />

      {/* Navigation Header */}
      <Header
        currentTheme={config.theme}
        onThemeChange={handleThemeChange}
        onOpenDownload={() => setIsDownloadOpen(true)}
        onScrollToDocs={scrollToDocs}
        onScrollToTestbed={scrollToTestbed}
        isDarkActive={activeDark}
      />

      {/* Main Page Sections */}
      <main className="relative pb-36">
        <Hero
          onOpenDownload={() => setIsDownloadOpen(true)}
          onScrollToDocs={scrollToDocs}
          onScare={handleScare}
          onDropBait={handleDropBait}
        />

        <InteractiveTestBed />

        <Documentation />

        {/* Footer */}
        <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 py-8 text-center text-xs text-slate-500 dark:text-slate-400">
          <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800 dark:text-slate-200">SpiderCursor</span>
              <span>•</span>
              <span>High-performance Three.js procedural animation</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Zero external assets</span>
              <span>•</span>
              <span>Framework agnostic</span>
              <span>•</span>
              <span>Apache-2.0 License</span>
            </div>
          </div>
        </footer>
      </main>

      {/* Ergonomic Collapsible Bottom Dock (Zero Viewport Occlusion) */}
      <PlaygroundDock
        config={config}
        onUpdateConfig={handleUpdateConfig}
        onScare={handleScare}
        onDropBait={handleDropBait}
        onRecenter={handleRecenter}
      />

      {/* Download Package Modal */}
      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />
    </div>
  );
}
