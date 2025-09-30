'use client';

import React from 'react';
import type { WorkUpdate } from '@/types/work-update';

interface WorkUpdateDisplayProps {
  update: WorkUpdate;
  onClose: () => void;
}

export function WorkUpdateDisplay({ update, onClose }: WorkUpdateDisplayProps) {
  return (
    <div className="font-serif max-w-3xl">
      {/* Back Button */}
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm group mb-4"
      >
        <svg 
          className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Software Dev
      </button>

      {/* Header */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
          <span>{update.project}</span>
          <span>•</span>
          <span>{update.week}</span>
        </div>
        
        <h1 className="text-2xl font-medium text-gray-900">
          {update.title}
        </h1>
      </div>

      {/* Content */}
      <article 
        className="prose prose-sm max-w-none
          prose-headings:font-serif prose-headings:font-medium prose-headings:text-gray-900
          prose-h1:text-xl prose-h1:mb-3 prose-h1:mt-6 prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-2
          prose-h2:text-lg prose-h2:mb-2.5 prose-h2:mt-5 prose-h2:font-semibold
          prose-h3:text-base prose-h3:mb-2 prose-h3:mt-4 prose-h3:font-semibold
          prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-[15px] prose-p:my-3
          prose-a:text-gray-900 prose-a:underline prose-a:decoration-gray-400 prose-a:underline-offset-2 hover:prose-a:decoration-gray-600
          prose-strong:text-gray-900 prose-strong:font-semibold
          prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[13px] prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-gray-50 prose-pre:text-gray-800 prose-pre:rounded prose-pre:border prose-pre:border-gray-200 prose-pre:text-[13px] prose-pre:leading-relaxed prose-pre:my-4
          prose-blockquote:border-l-2 prose-blockquote:border-gray-300 prose-blockquote:pl-3 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:text-sm
          prose-ul:list-disc prose-ul:pl-5 prose-ul:my-3 prose-ul:space-y-1
          prose-ol:list-decimal prose-ol:pl-5 prose-ol:my-3 prose-ol:space-y-1
          prose-li:text-gray-700 prose-li:text-[15px] prose-li:leading-relaxed
          prose-hr:border-gray-200 prose-hr:my-6
          prose-img:rounded prose-img:border prose-img:border-gray-200"
        dangerouslySetInnerHTML={{ __html: update.content || '' }}
      />

      {/* Footer */}
      <div className="pt-6 mt-8 border-t border-gray-200">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm group"
        >
          <svg 
            className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Software Dev
        </button>
      </div>
    </div>
  );
}

// Mobile overlay version
export function MobileWorkUpdateOverlay({ update, onClose }: WorkUpdateDisplayProps) {
  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-6">
        <WorkUpdateDisplay update={update} onClose={onClose} />
      </div>
    </div>
  );
}
