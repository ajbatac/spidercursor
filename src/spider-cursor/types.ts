/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
  size: number;
  /** Crawling and gait speed multiplier (default: 1.0, range 0.2 - 3.0) */
  speed: number;
  /** Theme mode or preset: 'auto' | 'light' | 'dark' | 'custom' */
  theme: SpiderThemeMode;
  /** Custom colors if theme is 'custom' */
  colors?: Partial<SpiderColorPalette>;
  /** Behavior mode: 'hunt' (follows cursor), 'flee' (escapes), 'wander' (ambient walk), 'perch' (stays still until startled) */
  mode: SpiderBehaviorMode;
  /** Distance in pixels to stop from cursor (default: 35) */
  stopDistance: number;
  /** Whether to render dynamic trailing silk dragline (default: true) */
  webSilk: boolean;
  /** Container element to append canvas to (default: document.body) */
  container?: HTMLElement;
  /** Canvas CSS z-index (default: 9999) */
  zIndex: number;
  /** Whether canvas allows pointer events to pass through to underlying elements (default: true) */
  pointerEventsNone: boolean;
  /** Enable organic procedural chitin sound effects (default: false) */
  sound: boolean;
  /** Maximum rendering framerate (default: 60) */
  maxFps: number;
  /** Whether to pause when tab or window is inactive (default: true) */
  pauseWhenHidden: boolean;
  /** Number of baby spiderlings in swarm (default: 0) */
  swarmCount?: number;
  /** Initial starting position in viewport pixels [x, y] */
  initialPosition?: [number, number];
}

export interface SpiderInstance {
  readonly config: SpiderConfig;
  updateConfig(newConfig: Partial<SpiderConfig>): void;
  scare(force?: number): void;
  feed(x: number, y: number, onConsumed?: () => void): void;
  clearBait?(): void;
  pounce(x: number, y: number): void;
  getPosition(): { x: number; y: number; angle: number };
  setTarget(x: number, y: number): void;
  destroy(): void;
}
