<!-- markdownlint-disable MD033 MD041 -->

<div align="center">

```
  ██████╗ ██████╗ ██╗██████╗ ███████╗██████╗  ██████╗██╗   ██╗██████╗ ███████╗ ██████╗ ██████╗ 
 ██╔════╝ ██╔══██╗██║██╔══██╗██╔════╝██╔══██╗██╔════╝██║   ██║██╔══██╗██╔════╝██╔═══██╗██╔══██╗
 ╚█████╗  ██████╔╝██║██║  ██║█████╗  ██████╔╝██║     ██║   ██║██████╔╝███████╗██║   ██║██████╔╝
  ╚═══██╗ ██╔═══╝ ██║██║  ██║██╔══╝  ██╔══██╗██║     ██║   ██║██╔══██╗╚════██║██║   ██║██╔══██╗
 ██████╔╝ ██║     ██║██████╔╝███████╗██║  ██║╚██████╗╚██████╔╝██║  ██║███████║╚██████╔╝██║  ██║
 ╚═════╝  ╚═╝     ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝
```

**🕷️ A Realistic Top-Down Procedural Spider That Stalks Your Cursor 🕷️**

_Add to any page in 1 line. Just for fun._

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-orange.svg?style=for-the-badge)](https://opensource.org/licenses/Apache-2.0)
[![100% Free](https://img.shields.io/badge/Price-FREE%20🎃-brightgreen?style=for-the-badge)](https://github.com/ajbatac/spidercursor)
[![No Signups](https://img.shields.io/badge/Signups-NONE-blueviolet?style=for-the-badge)](https://github.com/ajbatac/spidercursor)
[![Powered By](https://img.shields.io/badge/Powered%20By-Three.js%20%26%20IK%20Math-f59e0b?style=for-the-badge)](https://threejs.org)
[![Framework](https://img.shields.io/badge/Framework-Agnostic-64748b?style=for-the-badge)](https://github.com/ajbatac/spidercursor)
[![Version](https://img.shields.io/badge/Version-v0.1.1-amber?style=for-the-badge)](https://spidercursor.techhive.net/changelog)
[![Halloween](https://img.shields.io/badge/🎃-Halloween%20Ready-orange?style=for-the-badge)](https://github.com/ajbatac/spidercursor)

---

_"I just wanted cursor effects. I ended up learning inverse kinematics."_  
- Every developer who has touched this repo 🕷️

</div>

---

## 🕸️ What Is This?

**SpiderCursor** is a lightweight, framework-agnostic, fully procedural **8-legged arachnid** rendered in Three.js that crawls across your web page, stalks your cursor with uncanny inverse-kinematics leg physics, casts real drop shadows, and trails silk from its spinnerets.

It is, quite possibly, the **most unnecessary and most delightful** thing you will ever add to a website.

> **Zero images. Zero 3D model files. Zero external assets. Pure math. Pure chaos.**

Drop it on your:
- 🏠 Personal portfolio (terrify your recruiters)
- 🎃 Halloween prank page (obviously)
- 📝 Blog (watch readers forget what they were reading)
- 💼 Company site (legal has been informed and is still processing)

---

## 📌 Release Summary (v0.1.1 - Oct 29, 2026)

- **Interactive 404 Experience**: Dedicated spider-infested error route (`/404`) with interactive bait tossing and startle reactions.
- **Enhanced Web Discovery**: Full search and AI answer engine optimizations (rich JSON-LD schemas, sitemap, robots, and llms.txt).
- **Public Changelog & RSS Feed**: Live changelog available at `/changelog` with an automated RSS feed at `/changelog/rss`.

---

## 🚀 Instant 30-Second Setup

### Option A - The One Liner (You're Welcome)

```html
<!-- 1. Include Three.js & SpiderCursor -->
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
</body>
```

That's it. You're done. The spider is now on your website. Close the laptop. It's still in there.

---

### Option B - NPM / ES Modules (for the `package.json` enjoyers)

```bash
# Install with npm
npm install spider-cursor three

# Or using pnpm
pnpm add spider-cursor three

# Or using yarn
yarn add spider-cursor three
```

```ts
import { SpiderCursor } from 'spider-cursor';

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
// spider.destroy();
```

---

### Option C - React / Next.js (Modern Framework Edition™)

```tsx
import { useEffect, useRef } from 'react';
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
}
```

Render `<SpiderBackground />` once at the root level (e.g. in `_app.tsx` or root `layout.tsx`) and forget about it. The spider definitely hasn't forgotten about _you_.

---

### Option D - Vue / Svelte / Angular / Vanilla JS

SpiderCursor is **100% framework-agnostic**. As long as you have a browser and a `window`, you have a spider.

```js
// Vue 3 - composable
import { onMounted, onUnmounted } from 'vue';
import { SpiderCursor } from 'spider-cursor';

export function useSpider(config = {}) {
  let spider;
  onMounted(() => { spider = new SpiderCursor(config); });
  onUnmounted(() => spider?.destroy());
}
```

```js
// Svelte - lifecycle
import { onMount, onDestroy } from 'svelte';
import { SpiderCursor } from 'spider-cursor';

let spider;
onMount(() => { spider = new SpiderCursor({ theme: 'auto' }); });
onDestroy(() => spider?.destroy());
```

---

## Features

### 🦴 Core Architecture

| Feature | Details |
|---|---|
| **100% Free & Open Source** | No accounts, no paywalls, no VC-funded "freemium" tiers. Built purely as a fun open-source web widget. Apache-2.0 licensed. |
| **Top-Down Perspective** | Realistic dorsal silhouette with tapered leg joints, carapace body shape, and ground drop shadows - like a spider actually walking on glass above your screen. |
| **Inverse Kinematics** | 8 legs, each driven by real IK math. The spider calculates limb joint angles, step cadence, stride length, and ground contact in real time. Every frame. Because why not. |
| **Non-Blocking UI** | Clicks pass straight through (`pointer-events: none`) so your site buttons, inputs, and links work completely untouched. Nobody can tell the spider is there. Except for the spider. |
| **Zero 404 Assets** | Pure procedural geometry. No external image files, no GLTF models, no spritesheet PNGs to 404 at 2 AM in production. |
| **Web Silk Dragline** | Procedural silk trail rendered from the spinnerets as the spider moves. Toggle it on or off. It's just silk. Probably. |

### 🧠 Rendering & Performance

| Feature | Details |
|---|---|
| **Three.js WebGL Canvas** | Hardware-accelerated rendering overlaid on the page at `z-index: 9999`. |
| **Tab Pause** | Pauses the render loop when the user switches browser tabs. Saves battery. The spider is resting, not dead. |
| **Configurable FPS Cap** | `maxFps` defaults to 60. Lower it to save GPU budget or raise it if you want the spider to be _especially_ fast. |
| **Single Canvas Instance** | Mounts once to `document.body`. Destroy it with `.destroy()` when you're done traumatizing your users. |

### 🎭 Behavior Modes

The spider has moods. Respect them.

| Mode | Description |
|---|---|
| **`hunt`** (default) | Smoothly tracks and stalks your cursor. Keeps a configurable `stopDistance` from it, like a polite predator. |
| **`flee`** | Scurries away whenever the cursor gets close. Great for users who have an uncontrollable urge to catch things. |
| **`wander`** | Ignores the cursor entirely and explores the viewport autonomously. Chaotic neutral. |
| **`perch`** | Sits completely still until startled. Reacts to `.scare()` calls and clicks only. The spider equivalent of "go away I'm in sleep mode." |

### 🎨 Theme System

| Theme | Description |
|---|---|
| **`auto`** (default) | Dynamically syncs with the OS `prefers-color-scheme`. Changes in real time if the user switches. |
| **`light`** | Charcoal chitin on light surfaces. Professional-looking for a venomous arthropod. |
| **`dark`** | Ghost-bone chitin on dark parchment. Extremely dramatic. Recommended. |
| **`custom`** | Full palette override. You supply hex codes. The spider complies. |

#### 🦇 Built-In Spooky Species Presets

| Species | Body | Joints | Eyes | Silk |
|---|---|---|---|---|
| 🖤 **Black Widow** | `#0f172a` | `#e11d48` | `#f43f5e` | `#f43f5e` |
| 🎃 **Pumpkin Spider** | `#1c1917` | `#f97316` | `#fbbf24` | `#ea580c` |
| 🌿 **Venom Forest** | `#064e3b` | `#10b981` | `#34d399` | `#6ee7b7` |
| 👻 **Ghost Steel** | `#334155` | `#94a3b8` | `#60a5fa` | `#93c5fd` |

---

## ⚙️ Full Configuration Reference (`SpiderConfig`)

```ts
interface SpiderConfig {
  size: number;                                    // Scale multiplier (default: 1.0, range: 0.5-2.5)
  speed: number;                                   // Movement & gait speed (default: 1.0, range: 0.2-3.0)
  theme: 'auto' | 'light' | 'dark' | 'custom';   // Color theme mode (default: 'auto')
  colors?: Partial<SpiderColorPalette>;            // Custom hex palette when theme is 'custom'
  mode: 'hunt' | 'flee' | 'wander' | 'perch';    // Behavior mode (default: 'hunt')
  stopDistance: number;                            // Pixel distance to stall near cursor (default: 38)
  webSilk: boolean;                               // Render silk dragline (default: true)
  container?: HTMLElement;                         // Mount target (default: document.body)
  zIndex: number;                                  // Canvas CSS z-index (default: 9999)
  pointerEventsNone: boolean;                      // Click-through canvas overlay (default: true)
  sound: boolean;                                  // Procedural Web Audio chitin steps (default: false)
  maxFps: number;                                  // Render loop FPS cap (default: 60)
  pauseWhenHidden: boolean;                        // Pause on tab switch (default: true)
  swarmCount?: number;                             // Number of baby spiderlings in swarm (default: 0)
  initialPosition?: [number, number];              // Starting viewport coords [x, y]
}
```

### Property-by-Property Breakdown

| Property | Type | Default | Description |
|---|---|---|---|
| `size` | `number` | `1.0` | Scale multiplier. Sets size of body, leg reaches, and stride lengths. |
| `speed` | `number` | `1.0` | Movement and leg gait step frequency multiplier (0.2x to 3.0x). |
| `theme` | `'auto' \| 'light' \| 'dark' \| 'custom'` | `'auto'` | Color theme mode. `'auto'` dynamically synchronizes with OS dark mode. |
| `colors` | `Partial<SpiderColorPalette>` | `undefined` | Custom hex colors for body, legs, joints, eyes, shadow, and silk. |
| `mode` | `'hunt' \| 'flee' \| 'wander' \| 'perch'` | `'hunt'` | Behavior style. `'hunt'` follows cursor, `'flee'` runs away, `'wander'` crawls freely. |
| `stopDistance` | `number` | `38` | Distance in pixels to stalk and pause from the cursor. |
| `webSilk` | `boolean` | `true` | Renders dynamic silk dragline trailing behind spinnerets. |
| `pointerEventsNone` | `boolean` | `true` | Applies CSS `pointer-events: none` so clicks pass straight through to page. |
| `sound` | `boolean` | `false` | Procedural Web Audio chitin footstep clicks. Zero audio files needed. |
| `pauseWhenHidden` | `boolean` | `true` | Pauses render loop when user switches browser tabs to save battery. |
| `swarmCount` | `number` | `0` | Spawns N baby spiderlings that swarm around the main spider. Range: 0-6. |
| `initialPosition` | `[number, number]` | `undefined` | Starting pixel position `[x, y]` in viewport coordinates. |
| `container` | `HTMLElement` | `document.body` | DOM element to append the canvas to. |
| `zIndex` | `number` | `9999` | CSS `z-index` of the canvas overlay. |
| `maxFps` | `number` | `60` | Maximum render loop framerate. Lower for battery savings. |

---

## 🩸 Custom Color Palette (`SpiderColorPalette`)

```ts
interface SpiderColorPalette {
  body: string;    // Main abdomen / carapace fill color (hex)
  legs: string;    // Leg segment color (hex)
  joints: string;  // Joint sphere accent color (hex)
  eyes: string;    // Eye highlight color (hex)
  shadow: string;  // Drop shadow color (hex, usually darkened body)
  silk: string;    // Silk dragline trail color (hex)
}
```

#### Example: Build Your Own Species

```ts
new SpiderCursor({
  theme: 'custom',
  colors: {
    body: '#2d1b69',    // Deep violet
    legs: '#4c1d95',    // Purple
    joints: '#c084fc',  // Lavender
    eyes: '#e879f9',    // Fuchsia
    shadow: '#0d0221',  // Near-black
    silk: '#f0abfc',    // Pink silk
  },
});
```

---

## 🕹️ SpiderInstance API

All methods are available on the instance returned by `new SpiderCursor(config)`.

```ts
interface SpiderInstance {
  readonly config: SpiderConfig;

  // Update live configuration without destroying the canvas
  updateConfig(newConfig: Partial<SpiderConfig>): void;

  // Startle the spider, causing a brief recoil burst
  // force: 0.5-2.0 multiplier for how far it flies back (default: 1.0)
  scare(force?: number): void;

  // Drop virtual "bait" at pixel coords - the spider rushes to eat it
  feed(x: number, y: number): void;

  // Pounce immediately to pixel coords (ignores normal movement speed)
  pounce(x: number, y: number): void;

  // Get current spider position and rotation angle
  getPosition(): { x: number; y: number; angle: number };

  // Override the hunt target manually (overrides cursor tracking)
  setTarget(x: number, y: number): void;

  // Tear down Three.js scene, canvas, and all event listeners
  destroy(): void;
}
```

### Usage Examples

```ts
const spider = new SpiderCursor({ mode: 'hunt' });

// Live-update size without destroying the canvas
spider.updateConfig({ size: 2.0, speed: 2.5 });

// Startle the spider on a button press (great for pranks)
document.getElementById('prank-btn').onclick = () => spider.scare(1.4);

// Drop bait at a random position in the center of the screen
const x = window.innerWidth * (0.35 + Math.random() * 0.3);
const y = window.innerHeight * (0.35 + Math.random() * 0.3);
spider.feed(x, y);

// Read the spider's current world position
const { x, y, angle } = spider.getPosition();
console.log(`Spider is at (${x.toFixed(0)}, ${y.toFixed(0)}) facing ${angle.toFixed(2)}rad`);

// Move the spider to the center of the viewport
spider.setTarget(window.innerWidth / 2, window.innerHeight / 2);

// Clean up everything when navigating away
window.addEventListener('beforeunload', () => spider.destroy());
```

---

## 🎮 Interactive Playground Dock

The live demo includes an **ergonomic collapsible bottom dock** (zero viewport occlusion) with real-time controls:

### Kinematics & Size Panel
- **Spider Scale** - Slider from `0.5x` (tiny) to `2.2x` (huge, terrifying)
- **Crawl Pace** - Slider from `0.3x` (stealthy stalk) to `2.8x` (full scuttle)
- **Spider Swarm** - Spawn 0-6 baby spiderlings that orbit the main spider
- **Cobweb Silk** - Toggle the trailing silk dragline `ON / OFF`
- **Pass-thru** - Toggle `pointer-events: none` to see the spider consume your clicks (or not)

### Theme & Colors Panel
- Switch between **Light Mode**, **Dark Mode**, and **Auto (System)**
- One-click **Spooky Species** presets: Black Widow, Pumpkin Spider, Venom Forest, Ghost Steel

### Behavior Mode Panel
- Switch between **Hunt**, **Flee**, **Free Roam**, and **Perch & Rest** in real time

### Quick Actions (always visible)
| Button | Action |
|---|---|
| ⚡ **Startle** | Triggers `spider.scare(1.4)` - the spider recoils dramatically |
| 🎃 **Pumpkin Bait** | Drops bait at a random position - the spider rushes over |
| ✛ **Recenter** | Teleports the hunt target to the viewport center |
| 🔊 **Chitin Audio** | Toggles procedural Web Audio footstep sounds |

---

## 🧪 Interactive Click-Through Testbed

The demo site includes a **"Try Clicking and Typing While It Crawls"** testbed proving that the spider is purely cosmetic and blocks absolutely nothing:

- **Input & Typing Test** - Type into an input, click a button, watch the counter increment while the spider crawls over it.
- **Trick or Treat Selector** - Click radio cards to toggle between `Prank Mode (Jumpscare Crawl)` and `Gentle Spider Pet Mode`. Clickable under the spider. Always.
- **Highlight & Select Text** - Drag to select a text blockquote while the spider scuttles across it. Text selection works perfectly.

> "Notice how the spider walks smoothly over buttons, text, and inputs without blocking your clicks. 100% free fun for your site."

---

## 🌐 Browser Compatibility

| Browser | Status |
|---|---|
| Chrome / Edge | ✅ Full support |
| Firefox | ✅ Full support |
| Safari 16+ | ✅ Full support |
| Safari < 16 | ⚠️ WebGL may vary; falls back gracefully |
| Mobile browsers | ✅ Renders fine; cursor tracks touch events |
| IE 11 | 💀 Absolutely not. The spider refuses. |

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **3D Engine** | [Three.js](https://threejs.org) r128 - WebGL scene, camera, renderer |
| **Animation** | Procedural IK solver - no animation clips, pure math every frame |
| **Audio** | Web Audio API - procedural chitin click synthesis, zero audio files |
| **Demo Framework** | React 19 + Vite 8 |
| **Language** | TypeScript 7 |
| **Styling** | Tailwind CSS v4 |
| **Motion** | [Motion](https://motion.dev) for UI micro-animations |
| **Icons** | [Lucide React](https://lucide.dev) |
| **License** | Apache-2.0 |

---

## 🔧 Local Development

```bash
# Clone the repo
git clone https://github.com/ajbatac/spidercursor.git
cd spidercursor

# Install dependencies (uses Bun)
bun install

# Start the dev server on :3000
bun run dev

# Type-check (no emit)
bun run lint

# Build for production
bun run build

# Preview the production build
bun run preview
```

The dev server runs at `http://localhost:3000`.

---

## 📦 Project Structure

```
spidercursor/
├── src/
│   ├── spider-cursor/              # 🕷️ Core library (ship this anywhere)
│   │   ├── SpiderCursor.ts         # Main class: Three.js scene, render loop, IK solver
│   │   ├── SpiderModel.ts          # Procedural geometry: body, legs, joints, silk
│   │   ├── audio.ts                # Procedural Web Audio chitin step synthesis
│   │   ├── types.ts                # TypeScript interfaces: SpiderConfig, SpiderInstance, etc.
│   │   ├── index.ts                # Public exports + window.SpiderCursor UMD shim
│   │   ├── downloadHelpers.ts      # Standalone HTML file download utility
│   │   └── package-files.ts        # Bundled TS definitions + standalone HTML template
│   │
│   ├── components/                 # 🌐 Demo site React components
│   │   ├── Header.tsx              # Fixed navbar: brand, theme toggle, download button
│   │   ├── Hero.tsx                # Main landing section: title, one-liner, feature grid
│   │   ├── InteractiveTestBed.tsx  # Click-through proof-of-concept cards
│   │   ├── Documentation.tsx       # Code snippets + full config API table
│   │   ├── PlaygroundDock.tsx      # Collapsible bottom dock: all live controls
│   │   ├── DownloadModal.tsx       # Package download modal
│   │   ├── CemeteryParallax.tsx    # 🎃 Halloween cemetery parallax background
│   │   ├── Cobwebs.tsx             # Decorative SVG cobweb overlays
│   │   └── JackOLantern.tsx        # Animated jack-o'-lantern hero accent
│   │
│   ├── App.tsx                     # Root app: spider instance lifecycle, theme sync
│   ├── index.css                   # Global styles, Tailwind directives
│   └── main.tsx                    # React entry point
│
├── index.html                      # HTML shell
├── vite.config.ts                  # Vite + React plugin config
├── tsconfig.json                   # TypeScript config
├── package.json                    # Dependencies and scripts
└── README.md                       # You are here. The spider is also here.
```

---

## 🎃 Halloween Mode

The demo site ships with an **over-the-top Halloween Cemetery Parallax Environment** including:

- 🪦 **Cemetery Parallax** - Layered gravestones drifting at different scroll speeds
- 🕸️ **SVG Cobwebs** - Corner cobweb overlays
- 🎃 **Animated Jack-o'-Lantern** - Click the pumpkin in the hero to drop bait and summon the spider
- 🦇 **Dark ambient atmosphere** - Full `prefers-color-scheme: dark`-aware Halloween palette

> This README was written at 1:15 AM on the night before Halloween, 2026. The commit is going out tonight. The spider is already on your screen.

---

## 🤔 Frequently Asked Questions

**Q: Does this slow down my page?**  
A: The Three.js canvas is hardware-accelerated WebGL. It pauses when the tab is hidden. It won't tank your Core Web Vitals. Your 4MB hero image is more of a problem.

**Q: Will the spider block my buttons and links?**  
A: No. `pointer-events: none` is applied by default. The spider is a ghost. A very fast, physically accurate, 8-legged ghost.

**Q: Can I have multiple spiders?**  
A: `new SpiderCursor()` as many times as you want. Your users will not be okay. You will be fine.

**Q: What about mobile / touch devices?**  
A: The spider tracks `touchmove` events. It will follow fingers. Users will have feelings about this.

**Q: Does the `sound` option mean I'm adding audio files?**  
A: Zero audio files. Everything is synthesized procedurally via the Web Audio API. The chitin click is a tuned noise envelope. We spent more time on it than we'd like to admit.

**Q: Is this production-ready?**  
A: It is ready for any production website that wants a spider on it. Whether _wanting a spider_ is production-appropriate is your call, counsellor.

**Q: Why Three.js for a 2D-looking spider?**  
A: Top-down perspective, real drop shadows, WebGL performance, and the author already knew Three.js. Also it's funnier to use a 3D engine for this.

**Q: Is the spider sentient?**  
A: The spider cannot answer this question at this time.

---

## 🤝 Contributing

Contributions welcome! Found a bug? Open an issue. Have a feature? Open a PR.

```bash
# Fork, clone, then:
bun install
bun run dev

# Before pushing:
bun run lint
```

Potential contribution ideas:
- 🕸️ Web-building mode (spider spins actual webs between DOM elements)
- 🥚 Egg sac attachment to stationary elements
- 🦟 Prey system (SVG flies that get caught)
- 🕷️ Additional species presets
- 🌐 Svelte / Vue wrapper packages
- 📱 Mobile touch gesture interactions (pinch to startle, etc.)

---

## 📜 License

```
Copyright 2026 ajbatac

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
```

**TL;DR:** Free forever. Use it for anything. Put it on your company's investor relations page. We dare you.

---

<div align="center">

**🕷️ SpiderCursor**  
_High-performance Three.js procedural animation · Zero external assets · Framework agnostic · Apache-2.0_

Made with 🖤 and an unhealthy interest in arthropod locomotion

_The spider is still watching._

</div>
