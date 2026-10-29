/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Package source codes and documentation for user download and copying.
 */

export const TYPESCRIPT_DEFINITIONS = `/**
 * Type definitions for spider-cursor
 * Framework-agnostic Three.js animated spider with realistic inverse kinematics.
 */

import * as THREE from 'three';

export type SpiderThemeMode = 'auto' | 'light' | 'dark' | 'custom';
export type SpiderBehaviorMode = 'hunt' | 'flee' | 'wander' | 'perch';

export interface SpiderColorPalette {
  body: string;
  legs: string;
  joints: string;
  eyes: string;
  shadow: string;
  silk: string;
}

export interface SpiderConfig {
  /** Overall scale multiplier (default: 1.0) */
  size?: number;
  /** Crawling and gait speed multiplier (default: 1.0, range 0.2 - 3.0) */
  speed?: number;
  /** Theme mode: 'auto' | 'light' | 'dark' | 'custom' (default: 'auto') */
  theme?: SpiderThemeMode;
  /** Custom colors if theme is 'custom' */
  colors?: Partial<SpiderColorPalette>;
  /** Behavior mode: 'hunt' | 'flee' | 'wander' | 'perch' (default: 'hunt') */
  mode?: SpiderBehaviorMode;
  /** Distance in pixels to stop from cursor (default: 38) */
  stopDistance?: number;
  /** Whether to render trailing silk dragline (default: true) */
  webSilk?: boolean;
  /** Container element to append canvas to (default: document.body) */
  container?: HTMLElement;
  /** Canvas CSS z-index (default: 9999) */
  zIndex?: number;
  /** Whether canvas allows pointer events to pass through (default: true) */
  pointerEventsNone?: boolean;
  /** Enable organic procedural chitin sound effects (default: false) */
  sound?: boolean;
  /** Maximum rendering framerate (default: 60) */
  maxFps?: number;
  /** Pause rendering when tab is hidden (default: true) */
  pauseWhenHidden?: boolean;
  /** Initial starting position in viewport pixels [x, y] */
  initialPosition?: [number, number];
}

export interface SpiderInstance {
  readonly config: SpiderConfig;
  updateConfig(newConfig: Partial<SpiderConfig>): void;
  scare(force?: number): void;
  feed(x: number, y: number): void;
  pounce(x: number, y: number): void;
  getPosition(): { x: number; y: number; angle: number };
  setTarget(x: number, y: number): void;
  destroy(): void;
}

export declare class SpiderCursor implements SpiderInstance {
  readonly config: SpiderConfig;
  constructor(config?: SpiderConfig);
  updateConfig(newConfig: Partial<SpiderConfig>): void;
  scare(force?: number): void;
  feed(x: number, y: number): void;
  pounce(x: number, y: number): void;
  getPosition(): { x: number; y: number; angle: number };
  setTarget(x: number, y: number): void;
  destroy(): void;
  static init(config?: SpiderConfig): SpiderCursor;
}

export declare function init(config?: SpiderConfig): SpiderCursor;
export default SpiderCursor;
`;

export const PACKAGE_JSON_CONTENT = `{
  "name": "spider-cursor",
  "version": "1.0.0",
  "description": "Lightweight, embeddable Three.js procedural spider with realistic inverse kinematics, cursor tracking, and seamless light/dark mode adaptation.",
  "main": "dist/spider-cursor.cjs.js",
  "module": "dist/spider-cursor.esm.js",
  "browser": "dist/spider-cursor.umd.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "keywords": [
    "threejs",
    "spider",
    "cursor",
    "inverse-kinematics",
    "procedural-animation",
    "interactive",
    "halloween",
    "canvas",
    "webgl"
  ],
  "author": "SpiderCursor Contributors",
  "license": "Apache-2.0",
  "peerDependencies": {
    "three": ">=0.160.0"
  }
}
`;

export const README_MARKDOWN = `# spider-cursor 🕷️

> A lightweight, framework-agnostic Three.js procedural spider with realistic 8-legged inverse kinematics (IK) gait, smooth cursor tracking, and automatic light/dark mode adaptation.

- **Zero Asset Dependencies**: 100% procedurally generated geometry, materials, and audio. No external .gltf or .png files.
- **Realistic Kinematics**: 8-jointed legs with true alternating tetrapod gait, upward-arching knees, and predictive foot planting.
- **Lightweight & High-FPS**: Pre-allocated math structures (0 garbage collection in render loop), paused automatically when tab is hidden.
- **Seamless Light & Dark Mode**: Automatically matches \`prefers-color-scheme\` or custom hex colors.
- **Non-Intrusive Overlay**: Pure CSS \`pointer-events: none\` overlay that never blocks links, inputs, or buttons.

## 🚀 Quick Start (Vanilla HTML)

Include Three.js and SpiderCursor directly in your HTML:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Spider Cursor Demo</title>
</head>
<body onload="SpiderCursor.init({ theme: 'auto', size: 1.0, speed: 1.2 })">
  <h1>Hover anywhere and watch the spider stalk your cursor!</h1>

  <!-- CDN scripts -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://unpkg.com/spider-cursor/dist/spider-cursor.umd.js"></script>
</body>
</html>
\`\`\`

## 📦 NPM Installation

\`\`\`bash
npm install spider-cursor three
# or
pnpm add spider-cursor three
# or
yarn add spider-cursor three
\`\`\`

### ES Module Usage

\`\`\`ts
import { SpiderCursor } from 'spider-cursor';

const spider = new SpiderCursor({
  size: 1.0,          // scale factor (0.5 - 2.5)
  speed: 1.1,         // crawling speed
  theme: 'auto',      // 'auto' | 'light' | 'dark' | 'custom'
  mode: 'hunt',       // 'hunt' | 'flee' | 'wander' | 'perch'
  webSilk: true,      // draws organic trailing silk thread
  sound: false,       // procedural chitin footstep audio
});

// React to page events
window.addEventListener('click', (e) => {
  spider.feed(e.clientX, e.clientY);
});

// Clean up when needed
// spider.destroy();
\`\`\`

### React Integration

\`\`\`tsx
import { useEffect, useRef } from 'react';
import { SpiderCursor } from 'spider-cursor';

export function SpiderBackground() {
  const spiderRef = useRef<SpiderCursor | null>(null);

  useEffect(() => {
    spiderRef.current = new SpiderCursor({
      theme: 'auto',
      size: 1.0,
      sound: false,
    });

    return () => {
      spiderRef.current?.destroy();
    };
  }, []);

  return null; // The spider mounts its own fixed overlay canvas
}
\`\`\`

## ⚙️ Configuration Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| \`size\` | \`number\` | \`1.0\` | Overall scale multiplier (e.g. \`0.8\` to \`2.0\`) |
| \`speed\` | \`number\` | \`1.0\` | Crawling & gait speed multiplier |
| \`theme\` | \`'auto' \\| 'light' \\| 'dark' \\| 'custom'\` | \`'auto'\` | Color mode. 'auto' reacts to system dark mode |
| \`colors\` | \`Partial<SpiderColorPalette>\` | \`undefined\` | Custom palette ({ body, legs, joints, eyes, shadow, silk }) |
| \`mode\` | \`'hunt' \\| 'flee' \\| 'wander' \\| 'perch'\` | \`'hunt'\` | Behavior style |
| \`stopDistance\` | \`number\` | \`38\` | Pixel distance to stop from cursor |
| \`webSilk\` | \`boolean\` | \`true\` | Render dynamic trailing dragline silk |
| \`zIndex\` | \`number\` | \`9999\` | Canvas CSS z-index |
| \`pointerEventsNone\` | \`boolean\` | \`true\` | Keep underlying page clickable |
| \`sound\` | \`boolean\` | \`false\` | Procedural Web Audio chitin footsteps |
| \`pauseWhenHidden\` | \`boolean\` | \`true\` | Pauses render loop when tab inactive |

## 🎮 Public API Methods

- \`spider.updateConfig(options)\`: Update parameters on the fly without tearing down the canvas.
- \`spider.scare(force?)\`: Startle the spider; it immediately scrambles backwards.
- \`spider.feed(x, y)\`: Drop bait or inspect coordinates on screen.
- \`spider.pounce(x, y)\`: Rapid burst sprint toward coordinate.
- \`spider.getPosition()\`: Returns current \`{ x, y, angle }\`.
- \`spider.destroy()\`: Disposes Three.js geometries, materials, listeners, and removes canvas.

## 📄 License
Apache-2.0
`;

export const STANDALONE_HTML_DEMO = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SpiderCursor Standalone HTML Demo</title>
  <style>
    :root {
      --bg: #f8fafc;
      --text: #0f172a;
      --card: #ffffff;
      --border: #e2e8f0;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #090d16;
        --text: #f8fafc;
        --card: #131b2e;
        --border: #1e293b;
      }
    }
    body {
      margin: 0;
      padding: 3rem 1.5rem;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 1rem;
      padding: 2.5rem;
      max-width: 580px;
      text-align: center;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08);
      position: relative;
      z-index: 10;
    }
    h1 {
      margin: 0 0 1rem;
      font-size: 2rem;
    }
    p {
      color: #64748b;
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    .btn-row {
      display: flex;
      gap: 0.75rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    button {
      padding: 0.75rem 1.25rem;
      border-radius: 0.5rem;
      font-weight: 600;
      cursor: pointer;
      border: none;
      background: #0284c7;
      color: white;
      transition: transform 0.1s, background 0.2s;
    }
    button:hover {
      background: #0369a1;
      transform: translateY(-1px);
    }
    button.secondary {
      background: var(--border);
      color: var(--text);
    }
    button.secondary:hover {
      background: #cbd5e1;
    }
  </style>
  <!-- Three.js CDN -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
</head>
<body>
  <div class="card">
    <h1>SpiderCursor Embed Demo</h1>
    <p>Move your cursor anywhere across the viewport. The procedural 8-legged spider computes inverse kinematics in real time and crawls toward your pointer.</p>
    <div class="btn-row">
      <button onclick="window.spider?.scare(1.2)">Startle Spider</button>
      <button class="secondary" onclick="toggleMode()">Toggle Hunt/Flee</button>
      <button class="secondary" onclick="toggleSize()">Toggle Size</button>
    </div>
  </div>

  <!-- Inline standalone implementation of SpiderCursor -->
  <script>
    // Paste compiled spider-cursor.umd.js or load via CDN
    // window.onload = () => { window.spider = new SpiderCursor({ theme: 'auto', size: 1.0 }); };
    console.log("SpiderCursor ready to embed!");
  </script>
</body>
</html>
`;
