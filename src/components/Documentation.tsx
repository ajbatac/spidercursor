/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Comprehensive Documentation and Code Examples for SpiderCursor
 */

import React, { useState } from 'react';
import { Copy, Check, Terminal, Code2, Globe, Cpu, FileCode } from 'lucide-react';
import { TYPESCRIPT_DEFINITIONS } from '../spider-cursor/package-files';

export const Documentation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'html' | 'npm' | 'react' | 'types'>('html');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const htmlSnippet = `<!-- 1. Include Three.js & SpiderCursor -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://unpkg.com/spider-cursor@1.0.0/dist/spider-cursor.umd.js"></script>

<!-- 2. Initialize on body load with custom config -->
<body onload="SpiderCursor.init({
  theme: 'auto',   // Adapts automatically to light/dark mode
  size: 1.0,       // Size scale (0.5 to 2.5)
  speed: 1.2,      // Crawling speed multiplier
  mode: 'hunt',    // 'hunt' | 'flee' | 'wander' | 'perch'
  webSilk: true,   // Trailing silk thread
  sound: false     // Procedural chitin step audio
})">
  <!-- Your existing website content remains 100% clickable! -->
</body>`;

  const npmSnippet = `# Install with npm
npm install spider-cursor three

# Or using pnpm
pnpm add spider-cursor three

# Or using yarn
yarn add spider-cursor three`;

  const esmSnippet = `import { SpiderCursor } from 'spider-cursor';

// Instantiate anywhere in your client application
const spider = new SpiderCursor({
  size: 1.0,
  speed: 1.2,
  theme: 'auto',
  mode: 'hunt',
  stopDistance: 38,
  webSilk: true,
});

// React to user interactions or buttons
document.getElementById('scare-btn')?.addEventListener('click', () => {
  spider.scare();
});

// Clean up when leaving page or unmounting
// spider.destroy();`;

  const reactSnippet = `import { useEffect, useRef } from 'react';
import { SpiderCursor } from 'spider-cursor';

export function SpiderBackground() {
  const spiderRef = useRef<SpiderCursor | null>(null);

  useEffect(() => {
    // Mounts high-performance non-blocking Three.js overlay
    spiderRef.current = new SpiderCursor({
      theme: 'auto',
      size: 1.0,
      speed: 1.1,
      webSilk: true,
      sound: false,
    });

    return () => {
      spiderRef.current?.destroy();
    };
  }, []);

  return null; // Canvas is appended to body with pointer-events: none
}`;

  return (
    <section id="docs" className="py-16 px-4 sm:px-6 max-w-5xl mx-auto relative z-10">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Free Integration Guide and Simple Setup
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto mt-2">
          Completely free and open-source web widget. Embed onto any website in under 30 seconds with plain HTML, React, Vue, Next.js, or Svelte.
        </p>
      </div>

      {/* Code Snippet Box */}
      <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 shadow-xl overflow-hidden mb-12">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2.5 bg-slate-950/60 flex-wrap gap-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('html')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'html' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span>HTML &lt;script&gt; (1-Liner)</span>
            </button>

            <button
              onClick={() => setActiveTab('npm')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'npm' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>NPM / ES Modules</span>
            </button>

            <button
              onClick={() => setActiveTab('react')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'react' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>React / Next.js</span>
            </button>

            <button
              onClick={() => setActiveTab('types')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'types' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-amber-400" />
              <span>TypeScript Definitions</span>
            </button>
          </div>

          {/* Copy Button */}
          <button
            onClick={() => {
              const text =
                activeTab === 'html'
                  ? htmlSnippet
                  : activeTab === 'npm'
                  ? `${npmSnippet}\n\n${esmSnippet}`
                  : activeTab === 'react'
                  ? reactSnippet
                  : TYPESCRIPT_DEFINITIONS;
              copyToClipboard(text, activeTab);
            }}
            className="flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors border border-slate-700"
          >
            {copiedKey === activeTab ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Code Content */}
        <div className="p-4 sm:p-6 overflow-x-auto font-mono text-xs leading-relaxed max-h-96">
          {activeTab === 'html' && <pre className="text-slate-300">{htmlSnippet}</pre>}
          {activeTab === 'npm' && (
            <div className="space-y-4">
              <pre className="text-emerald-400">{npmSnippet}</pre>
              <div className="border-t border-slate-800 pt-3">
                <span className="text-slate-500 text-[11px] block mb-2">// In your main JavaScript/TypeScript file:</span>
                <pre className="text-slate-300">{esmSnippet}</pre>
              </div>
            </div>
          )}
          {activeTab === 'react' && <pre className="text-slate-300">{reactSnippet}</pre>}
          {activeTab === 'types' && <pre className="text-slate-300">{TYPESCRIPT_DEFINITIONS}</pre>}
        </div>
      </div>

      {/* Configuration Table */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Cpu className="w-4 h-4 text-indigo-500" />
          <span>Configuration Options (\`SpiderConfig\`)</span>
        </h3>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4 font-semibold">Property</th>
                  <th className="py-3 px-4 font-semibold">Type</th>
                  <th className="py-3 px-4 font-semibold">Default</th>
                  <th className="py-3 px-4 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-900 dark:text-white">size</td>
                  <td className="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400">number</td>
                  <td className="py-3 px-4 font-mono text-slate-500">1.0</td>
                  <td className="py-3 px-4">Scale multiplier. Sets size of body, leg reaches, and stride lengths.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-900 dark:text-white">speed</td>
                  <td className="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400">number</td>
                  <td className="py-3 px-4 font-mono text-slate-500">1.0</td>
                  <td className="py-3 px-4">Movement and leg gait step frequency multiplier (0.2x to 3.0x).</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-900 dark:text-white">theme</td>
                  <td className="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400">'auto' | 'light' | 'dark' | 'custom'</td>
                  <td className="py-3 px-4 font-mono text-slate-500">'auto'</td>
                  <td className="py-3 px-4">Color theme mode. 'auto' dynamically synchronizes with OS dark mode.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-900 dark:text-white">colors</td>
                  <td className="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400">Partial&lt;SpiderColorPalette&gt;</td>
                  <td className="py-3 px-4 font-mono text-slate-500">undefined</td>
                  <td className="py-3 px-4">Custom hex colors for body, legs, joints, eyes, shadow, and silk.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-900 dark:text-white">mode</td>
                  <td className="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400">'hunt' | 'flee' | 'wander' | 'perch'</td>
                  <td className="py-3 px-4 font-mono text-slate-500">'hunt'</td>
                  <td className="py-3 px-4">Behavior style. 'hunt' follows cursor, 'flee' runs away, 'wander' crawls freely.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-900 dark:text-white">stopDistance</td>
                  <td className="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400">number</td>
                  <td className="py-3 px-4 font-mono text-slate-500">38</td>
                  <td className="py-3 px-4">Distance in pixels to stalk and pause from the cursor.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-900 dark:text-white">webSilk</td>
                  <td className="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400">boolean</td>
                  <td className="py-3 px-4 font-mono text-slate-500">true</td>
                  <td className="py-3 px-4">Renders dynamic silk dragline trailing behind spinnerets.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-900 dark:text-white">pointerEventsNone</td>
                  <td className="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400">boolean</td>
                  <td className="py-3 px-4 font-mono text-slate-500">true</td>
                  <td className="py-3 px-4">Applies CSS pointer-events: none so clicks pass straight through to page.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-900 dark:text-white">sound</td>
                  <td className="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400">boolean</td>
                  <td className="py-3 px-4 font-mono text-slate-500">false</td>
                  <td className="py-3 px-4">Procedural Web Audio chitin footstep clicks (zero audio files needed).</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-900 dark:text-white">pauseWhenHidden</td>
                  <td className="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400">boolean</td>
                  <td className="py-3 px-4 font-mono text-slate-500">true</td>
                  <td className="py-3 px-4">Pauses render loop when user switches browser tabs to save battery.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
