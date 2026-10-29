/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Ergonomic Collapsible Bottom Dock for Three.js Spider Control
 * Consolidates all controls to the bottom with zero viewport occlusion.
 */

import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Volume2,
  VolumeX,
  Zap,
  Crosshair,
  Compass,
  Palette,
  Sliders,
  MousePointer2,
  Bug,
} from 'lucide-react';
import {
  SpiderBehaviorMode,
  SpiderConfig,
  SpiderThemeMode,
} from '../spider-cursor/types';

interface PlaygroundDockProps {
  config: SpiderConfig;
  onUpdateConfig: (partial: Partial<SpiderConfig>) => void;
  onScare: () => void;
  onDropBait: () => void;
  onRecenter: () => void;
}

export const PlaygroundDock: React.FC<PlaygroundDockProps> = ({
  config,
  onUpdateConfig,
  onScare,
  onDropBait,
  onRecenter,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'kinematics' | 'theme' | 'behavior'>('kinematics');
  const [baitActive, setBaitActive] = useState(false);

  const themePresets = [
    { id: 'light' as SpiderThemeMode, label: 'Light Mode', desc: 'Charcoal chitin on light surfaces' },
    { id: 'dark' as SpiderThemeMode, label: 'Dark Mode', desc: 'Ghost bone chitin on dark parchment' },
    { id: 'auto' as SpiderThemeMode, label: 'Auto (System)', desc: 'Matches device dark/light setting' },
  ];

  return (
    <aside
      aria-label="Spider Controls Dock"
      className={`fixed left-1/2 -translate-x-1/2 z-30 transition-transform duration-300 ease-out ${
        isCollapsed ? 'translate-y-[calc(100%-36px)]' : 'translate-y-0'
      }`}
      style={{
        bottom: '16px',
        width: 'min(960px, 95vw)',
      }}
    >
      {/* Collapse Handle Button */}
      <div className="flex justify-center -mb-[1px]">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-1.5 px-[12px] py-1 text-xs font-semibold rounded-t-[12px] bg-slate-950 text-amber-400 border-t border-x border-slate-800 shadow-md backdrop-blur-md cursor-pointer hover:bg-slate-900 transition-colors"
        >
          {isCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Show Controls</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              <span>Hide Controls</span>
            </>
          )}
        </button>
      </div>

      {/* Main Glassmorphic Dock Container */}
      <div className="bg-white/95 dark:bg-slate-950/95 text-slate-900 dark:text-slate-100 rounded-[12px] border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-xl px-[12px] py-4 sm:py-5">
        {/* Top Dock Bar: Tabs and Quick Action Triggers */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-[12px]">
            <button
              onClick={() => setActiveTab('kinematics')}
              className={`flex items-center gap-1.5 px-[12px] py-1.5 text-xs font-semibold rounded-[12px] transition-all ${
                activeTab === 'kinematics'
                  ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-amber-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Kinematics and Size</span>
            </button>

            <button
              onClick={() => setActiveTab('theme')}
              className={`flex items-center gap-1.5 px-[12px] py-1.5 text-xs font-semibold rounded-[12px] transition-all ${
                activeTab === 'theme'
                  ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-amber-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Theme and Colors</span>
            </button>

            <button
              onClick={() => setActiveTab('behavior')}
              className={`flex items-center gap-1.5 px-[12px] py-1.5 text-xs font-semibold rounded-[12px] transition-all ${
                activeTab === 'behavior'
                  ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-amber-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Behavior Mode</span>
            </button>
          </div>

          {/* Quick Real-Time Action Triggers */}
          <div className="flex items-center gap-2">
            <button
              onClick={onScare}
              className="flex items-center gap-1 px-[12px] py-1.5 text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50 hover:bg-rose-100 dark:hover:bg-rose-900/40 rounded-[12px] transition-colors active:scale-95"
              title="Scare the spider backwards"
            >
              <Zap className="w-3.5 h-3.5 text-rose-500" />
              <span>Startle</span>
            </button>

            <button
              onClick={() => {
                setBaitActive(true);
                setTimeout(() => setBaitActive(false), 2400);
                onDropBait();
              }}
              className={`flex items-center gap-1.5 px-[12px] py-1.5 text-xs font-semibold rounded-[12px] border transition-all active:scale-95 cursor-pointer ${
                baitActive
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20 scale-105'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/50 hover:bg-amber-100 dark:hover:bg-amber-900/40'
              }`}
              title="Drop delicious pumpkin bait to summon the spider"
            >
              <span>🎃</span>
              <span>{baitActive ? 'Bait Dropped!' : 'Pumpkin Bait'}</span>
            </button>

            <button
              onClick={onRecenter}
              className="flex items-center gap-1 px-[12px] py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-[12px] transition-colors cursor-pointer"
              title="Center in viewport"
            >
              <Crosshair className="w-3.5 h-3.5" />
            </button>

            {/* Audio Toggle */}
            <button
              onClick={() => onUpdateConfig({ sound: !config.sound })}
              className={`flex items-center gap-1 px-[12px] py-1.5 text-xs font-semibold rounded-[12px] border transition-colors cursor-pointer ${
                config.sound
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
              }`}
              title="Toggle procedural Web Audio chitin footsteps"
            >
              {config.sound ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{config.sound ? 'Chitin Audio On' : 'Muted'}</span>
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <div className="pt-3">
          {activeTab === 'kinematics' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              {/* Size Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-slate-600 dark:text-slate-400">Spider Scale</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{config.size.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.2"
                  step="0.05"
                  value={config.size}
                  onChange={(e) => onUpdateConfig({ size: parseFloat(e.target.value) })}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-900 dark:accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Small (0.5x)</span>
                  <span>Normal (1.0x)</span>
                  <span>Huge (2.2x)</span>
                </div>
              </div>

              {/* Speed Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-slate-600 dark:text-slate-400">Crawl Pace</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{config.speed.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.3"
                  max="2.8"
                  step="0.1"
                  value={config.speed}
                  onChange={(e) => onUpdateConfig({ speed: parseFloat(e.target.value) })}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-900 dark:accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Stalk (0.3x)</span>
                  <span>Natural (1.0x)</span>
                  <span>Scuttle (2.8x)</span>
                </div>
              </div>

              {/* Baby Spiderlings Swarm Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                    <Bug className="w-3.5 h-3.5 text-amber-500" />
                    <span>Spider Swarm</span>
                  </span>
                  <span className="font-mono font-bold text-amber-500">
                    {config.swarmCount || 0} spiderlings
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="6"
                  step="1"
                  value={config.swarmCount || 0}
                  onChange={(e) => onUpdateConfig({ swarmCount: parseInt(e.target.value, 10) })}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Solo</span>
                  <span>3 Nestlings</span>
                  <span>6 Swarm</span>
                </div>
              </div>

              {/* Silk and Click-through toggles */}
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => onUpdateConfig({ webSilk: !config.webSilk })}
                  className={`flex-1 flex items-center justify-between px-[12px] py-2 rounded-[12px] border text-xs font-medium transition-colors ${
                    config.webSilk
                      ? 'bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white'
                      : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-400'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span>Cobweb Silk</span>
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-[12px] bg-slate-200 dark:bg-slate-800 font-mono">
                    {config.webSilk ? 'ON' : 'OFF'}
                  </span>
                </button>

                <button
                  onClick={() => onUpdateConfig({ pointerEventsNone: !config.pointerEventsNone })}
                  className={`flex-1 flex items-center justify-between px-[12px] py-2 rounded-[12px] border text-xs font-medium transition-colors ${
                    config.pointerEventsNone
                      ? 'bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white'
                      : 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                  }`}
                  title="When Click-Through is enabled, the spider overlay doesn't block any page interaction"
                >
                  <span className="flex items-center gap-1.5">
                    <MousePointer2 className="w-3.5 h-3.5" />
                    <span>Pass-thru</span>
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-[12px] bg-slate-200 dark:bg-slate-800 font-mono">
                    {config.pointerEventsNone ? 'YES' : 'NO'}
                  </span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'theme' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {themePresets.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => onUpdateConfig({ theme: t.id })}
                    className={`flex flex-col text-left px-[12px] py-2.5 rounded-[12px] border transition-all ${
                      config.theme === t.id
                        ? 'border-slate-950 dark:border-amber-500 bg-slate-100 dark:bg-slate-900 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{t.label}</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">{t.desc}</span>
                  </button>
                ))}
              </div>

              {/* Custom Theme Palettes */}
              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Spooky Species:</span>

                <button
                  onClick={() =>
                    onUpdateConfig({
                      theme: 'custom',
                      colors: {
                        body: '#0f172a',
                        legs: '#334155',
                        joints: '#e11d48',
                        eyes: '#f43f5e',
                        shadow: '#000000',
                        silk: '#f43f5e',
                      },
                    })
                  }
                  className="px-[12px] py-1 text-xs rounded-[12px] border border-rose-300 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 font-medium hover:bg-rose-100"
                >
                  Black Widow
                </button>

                <button
                  onClick={() =>
                    onUpdateConfig({
                      theme: 'custom',
                      colors: {
                        body: '#1c1917',
                        legs: '#44403c',
                        joints: '#f97316',
                        eyes: '#fbbf24',
                        shadow: '#000000',
                        silk: '#ea580c',
                      },
                    })
                  }
                  className="px-[12px] py-1 text-xs rounded-[12px] border border-amber-300 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 font-medium hover:bg-amber-100"
                >
                  Pumpkin Spider
                </button>

                <button
                  onClick={() =>
                    onUpdateConfig({
                      theme: 'custom',
                      colors: {
                        body: '#064e3b',
                        legs: '#047857',
                        joints: '#10b981',
                        eyes: '#34d399',
                        shadow: '#022c22',
                        silk: '#6ee7b7',
                      },
                    })
                  }
                  className="px-[12px] py-1 text-xs rounded-[12px] border border-emerald-300 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 font-medium hover:bg-emerald-100"
                >
                  Venom Forest
                </button>

                <button
                  onClick={() =>
                    onUpdateConfig({
                      theme: 'custom',
                      colors: {
                        body: '#334155',
                        legs: '#64748b',
                        joints: '#94a3b8',
                        eyes: '#60a5fa',
                        shadow: '#0f172a',
                        silk: '#93c5fd',
                      },
                    })
                  }
                  className="px-[12px] py-1 text-xs rounded-[12px] border border-sky-300 dark:border-sky-900 bg-sky-50 dark:bg-sky-950/30 text-sky-700 dark:text-sky-300 font-medium hover:bg-sky-100"
                >
                  Ghost Steel
                </button>
              </div>
            </div>
          )}

          {activeTab === 'behavior' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'hunt' as SpiderBehaviorMode, name: 'Hunt (Follow)', desc: 'Smoothly tracks and stalks your cursor' },
                { id: 'flee' as SpiderBehaviorMode, name: 'Flee (Avoid)', desc: 'Scurries away whenever cursor gets close' },
                { id: 'wander' as SpiderBehaviorMode, name: 'Free Roam', desc: 'Explores the viewport autonomously' },
                { id: 'perch' as SpiderBehaviorMode, name: 'Perch and Rest', desc: 'Stationary, reacts only to clicks and taps' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => onUpdateConfig({ mode: m.id })}
                  className={`px-[12px] py-2.5 rounded-[12px] border text-left transition-all ${
                    config.mode === m.id
                      ? 'border-slate-950 dark:border-amber-500 bg-slate-100 dark:bg-slate-900 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100">{m.name}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">{m.desc}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
