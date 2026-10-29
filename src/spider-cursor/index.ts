/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SpiderCursor: Framework-agnostic Three.js procedural spider.
 */

import { SpiderCursor, DEFAULT_CONFIG, THEME_PALETTES } from './SpiderCursor';
import { SpiderConfig, SpiderInstance, SpiderThemeMode, SpiderBehaviorMode, SpiderColorPalette } from './types';

export { SpiderCursor, DEFAULT_CONFIG, THEME_PALETTES };
export type { SpiderConfig, SpiderInstance, SpiderThemeMode, SpiderBehaviorMode, SpiderColorPalette };

/**
 * Convenience static initializer for vanilla HTML / CDN usage
 */
export function init(config?: Partial<SpiderConfig>): SpiderCursor {
  return new SpiderCursor(config);
}

// Bind to window for UMD / script tag consumers if in browser
if (typeof window !== 'undefined') {
  (window as unknown as { SpiderCursor: typeof SpiderCursor & { init: typeof init } }).SpiderCursor = Object.assign(
    SpiderCursor,
    { init }
  );
}

export default SpiderCursor;
