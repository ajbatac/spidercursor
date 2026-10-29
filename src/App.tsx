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
import { NotFound } from './components/NotFound';
import { Changelog } from './pages/Changelog';
import { PumpkinBaitOverlay, PumpkinBaitData } from './components/PumpkinBaitOverlay';

export default function App() {
  const spiderRef = useRef<SpiderCursor | null>(null);
  const [pumpkinBait, setPumpkinBait] = useState<PumpkinBaitData | null>(null);
  const [config, setConfig] = useState<SpiderConfig>({
    ...DEFAULT_CONFIG,
    size: 1.0,
    speed: 1.15,
    theme: 'auto',
    sound: false,
    webSilk: true,
  });

  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Track popstate for client-side routing
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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

  const handleDropBait = (customX?: number, customY?: number) => {
    // If coordinates specified, use them; otherwise, drop into clear, visible upper-middle viewport
    const x = typeof customX === 'number' ? customX : window.innerWidth * (0.32 + Math.random() * 0.36);
    const y = typeof customY === 'number' ? customY : Math.max(160, window.innerHeight * (0.28 + Math.random() * 0.34));

    const baitId = Date.now();
    setPumpkinBait({
      id: baitId,
      x,
      y,
      eaten: false,
    });

    spiderRef.current?.feed(x, y, () => {
      // Spider caught the pumpkin bait!
      setPumpkinBait((prev) => (prev && prev.id === baitId ? { ...prev, eaten: true } : prev));
      setTimeout(() => {
        setPumpkinBait((prev) => (prev && prev.id === baitId ? null : prev));
      }, 1200);
    });
  };

  const handleClearBait = () => {
    setPumpkinBait(null);
    spiderRef.current?.clearBait?.();
  };

  const handleRecenter = () => {
    spiderRef.current?.setTarget(window.innerWidth / 2, window.innerHeight / 2);
  };

  const scrollToDocs = () => {
    if (currentPath !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById('docs')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    document.getElementById('docs')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTestbed = () => {
    if (currentPath !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById('testbed')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    document.getElementById('testbed')?.scrollIntoView({ behavior: 'smooth' });
  };

  const isChangelog = currentPath === '/changelog' || currentPath === '/changelog/';
  const isHome = currentPath === '/' || currentPath === '';
  const isNotFound = !isHome && !isChangelog;

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
        onNavigateHome={() => navigate('/')}
        onNavigateChangelog={() => navigate('/changelog')}
        isNotFound={isNotFound}
        isChangelog={isChangelog}
      />

      {/* Main Page Sections */}
      <main className="relative pb-36 pt-16">
        {isChangelog ? (
          <Changelog onBackToHome={() => navigate('/')} />
        ) : isNotFound ? (
          <NotFound
            onBackToHome={() => navigate('/')}
            onScareSpider={handleScare}
            onDropBait={handleDropBait}
            onSwarm={() => handleUpdateConfig({ swarmCount: 6, speed: 2.2 })}
            currentPath={currentPath}
          />
        ) : (
          <>
            <Hero
              onOpenDownload={() => setIsDownloadOpen(true)}
              onScrollToDocs={scrollToDocs}
              onScare={handleScare}
              onDropBait={handleDropBait}
            />

            <InteractiveTestBed />

            <Documentation />
          </>
        )}

        {/* Footer */}
        <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 py-8 text-center text-xs text-slate-500 dark:text-slate-400">
          <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="font-bold text-slate-800 dark:text-slate-200">SpiderCursor</span>
              <span>•</span>
              <a
                href="/changelog"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/changelog');
                }}
                className="font-mono font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
                title="View v0.1.1 Changelog"
              >
                v0.1.1
              </a>
              <span>•</span>
              <span>
                Made by{' '}
                <a
                  href="https://ajbatac.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-slate-800 dark:text-slate-200 hover:text-amber-500 dark:hover:text-amber-400 underline decoration-amber-500/40"
                >
                  AJ Batac
                </a>
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://github.com/ajbatac/spidercursor"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-500 transition-colors underline decoration-amber-500/40 flex items-center gap-1 font-medium"
              >
                <span>GitHub Repo</span>
              </a>
              <span>•</span>
              <span>Zero assets</span>
              <span>•</span>
              <a
                href="/changelog"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/changelog');
                }}
                className="hover:text-amber-500 transition-colors underline decoration-amber-500/40"
              >
                Changelog
              </a>
              <span>•</span>
              <a
                href="/404"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/404');
                }}
                className="hover:text-amber-500 transition-colors underline decoration-amber-500/40"
              >
                404 Spider Den 🕸️
              </a>
              <span>•</span>
              <span>Apache-2.0</span>
            </div>
          </div>
        </footer>
      </main>

      {/* Visible Animated Pumpkin Bait Overlay */}
      <PumpkinBaitOverlay bait={pumpkinBait} onClearBait={handleClearBait} />

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
