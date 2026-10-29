/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Download modal with package files, bundle exports, and zero-setup downloads.
 */

import React, { useState } from 'react';
import { X, Download, FileText, Check, Copy, Package, FileCode } from 'lucide-react';
import {
  TYPESCRIPT_DEFINITIONS,
  PACKAGE_JSON_CONTENT,
  README_MARKDOWN,
  STANDALONE_HTML_DEMO,
} from '../spider-cursor/package-files';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<'demo' | 'types' | 'package' | 'readme'>('demo');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const downloadFile = (filename: string, content: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getActiveFileContent = () => {
    switch (selectedFile) {
      case 'demo':
        return STANDALONE_HTML_DEMO;
      case 'types':
        return TYPESCRIPT_DEFINITIONS;
      case 'package':
        return PACKAGE_JSON_CONTENT;
      case 'readme':
        return README_MARKDOWN;
    }
  };

  const getFilename = () => {
    switch (selectedFile) {
      case 'demo':
        return 'spider-demo.html';
      case 'types':
        return 'spider-cursor.d.ts';
      case 'package':
        return 'package.json';
      case 'readme':
        return 'README.md';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveFileContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAll = () => {
    downloadFile('spider-demo.html', STANDALONE_HTML_DEMO, 'text/html');
    setTimeout(() => downloadFile('spider-cursor.d.ts', TYPESCRIPT_DEFINITIONS, 'text/typescript'), 300);
    setTimeout(() => downloadFile('package.json', PACKAGE_JSON_CONTENT, 'application/json'), 600);
    setTimeout(() => downloadFile('README.md', README_MARKDOWN, 'text/markdown'), 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-100 flex items-center justify-center text-white dark:text-slate-900 font-bold">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Free Download and Source Code
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                100% free open-source fun. No accounts, no paywalls. Grab the code and enjoy.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={downloadAll}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download All (Free)</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* File selector tabs */}
        <div className="flex items-center gap-1 px-5 pt-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 overflow-x-auto">
          {[
            { id: 'demo' as const, label: 'spider-demo.html', icon: FileCode },
            { id: 'types' as const, label: 'spider-cursor.d.ts', icon: FileText },
            { id: 'package' as const, label: 'package.json', icon: Package },
            { id: 'readme' as const, label: 'README.md', icon: FileText },
          ].map((file) => {
            const Icon = file.icon;
            return (
              <button
                key={file.id}
                onClick={() => setSelectedFile(file.id)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium rounded-t-lg border-b-2 transition-colors whitespace-nowrap ${
                  selectedFile === file.id
                    ? 'border-slate-900 dark:border-slate-100 text-slate-900 dark:text-white bg-white dark:bg-slate-900 font-semibold'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{file.label}</span>
              </button>
            );
          })}
        </div>

        {/* Code Preview Viewer */}
        <div className="flex-1 overflow-auto p-4 sm:p-5 bg-slate-950 font-mono text-xs text-slate-200 leading-relaxed select-text">
          <pre>{getActiveFileContent()}</pre>
        </div>

        {/* Footer with actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/50">
          <span className="text-xs text-slate-500 font-mono">
            {getFilename()}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy File'}</span>
            </button>

            <button
              onClick={() => downloadFile(getFilename(), getActiveFileContent(), 'text/plain')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-lg shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download {getFilename()}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
