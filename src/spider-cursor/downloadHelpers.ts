/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Instant 1-click download helpers for standalone files.
 */

import {
  STANDALONE_HTML_DEMO,
  TYPESCRIPT_DEFINITIONS,
  PACKAGE_JSON_CONTENT,
  README_MARKDOWN,
} from './package-files';

export function downloadStandaloneFile(filename: string, content: string, mimeType: string = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadFreeBundle() {
  downloadStandaloneFile('spider-demo.html', STANDALONE_HTML_DEMO, 'text/html');
  setTimeout(() => downloadStandaloneFile('spider-cursor.d.ts', TYPESCRIPT_DEFINITIONS, 'text/typescript'), 250);
  setTimeout(() => downloadStandaloneFile('README.md', README_MARKDOWN, 'text/markdown'), 500);
}
