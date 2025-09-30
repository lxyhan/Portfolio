'use client';

import React, { useState } from 'react';
import type { WorkUpdate } from '@/types/work-update';

interface WorkUpdatesProps {
  updates: WorkUpdate[];
  onUpdateClick: (update: WorkUpdate) => void;
}

export default function WorkUpdates({ updates, onUpdateClick }: WorkUpdatesProps) {
  const [selectedProject, setSelectedProject] = useState<'all' | 'MarkUs' | 'PythonTA'>('all');

  const filteredUpdates = selectedProject === 'all' 
    ? updates 
    : updates.filter(u => u.project === selectedProject);

  const markusCount = updates.filter(u => u.project === 'MarkUs').length;
  const pythontaCount = updates.filter(u => u.project === 'PythonTA').length;

  return (
    <div className="font-serif max-w-3xl">
      <h1 className="text-3xl font-medium mb-6 text-gray-900 border-b border-gray-200 pb-2">Open-Source Software Engineering with Prof. David Liu</h1>
      
      <div className="space-y-5">
        {/* Description */}
        <p className="text-base text-gray-600 leading-relaxed">
          Weekly development logs from my work on <a href="https://github.com/MarkUsProject/Markus" className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600">MarkUs</a> and <a href="https://github.com/pyta-uoft/pyta" className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600">PythonTA</a> — open-source educational tools used by 20,000+ students annually at UofT and Waterloo.
        </p>

        {/* Project Filter */}
        <div className="flex gap-2 text-sm">
          <button
            onClick={() => setSelectedProject('all')}
            className={`px-3 py-1 rounded font-serif transition-colors ${
              selectedProject === 'all'
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            All ({updates.length})
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => setSelectedProject('MarkUs')}
            className={`px-3 py-1 rounded font-serif transition-colors ${
              selectedProject === 'MarkUs'
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            MarkUs ({markusCount})
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => setSelectedProject('PythonTA')}
            className={`px-3 py-1 rounded font-serif transition-colors ${
              selectedProject === 'PythonTA'
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            PythonTA ({pythontaCount})
          </button>
        </div>

        {/* Updates List */}
        <div className="space-y-1.5">
          {filteredUpdates.length === 0 ? (
            <p className="text-gray-500 font-serif italic text-sm">No updates found.</p>
          ) : (
            filteredUpdates.map((update) => (
              <button
                key={`${update.project}-${update.slug}`}
                onClick={() => onUpdateClick(update)}
                className="w-full text-left group flex items-start gap-2 py-1.5 hover:bg-gray-50 -mx-2 px-2 rounded transition-colors"
              >
                <span className="text-gray-400 font-mono text-sm mt-0.5 flex-shrink-0">{'>'}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-base text-gray-900 group-hover:underline decoration-gray-400 underline-offset-2">
                      {update.title}
                    </span>
                    <span className="text-xs text-gray-500">({update.project}, {update.week})</span>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
