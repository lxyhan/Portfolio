import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function Resume() {
  return (
    <div className="font-serif max-w-4xl">
      {/* Minimal Header */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-medium text-gray-900">Resume</h1>
      </div>

      {/* PDF Viewer */}
      <div className="w-full">
        <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
          <iframe
            src="/resume.pdf"
            className="w-full h-[800px] border-0"
            title="James Han Resume"
          />
        </div>
        
        {/* Fallback message */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-base text-gray-600 mb-2">
            Can&apos;t view the PDF? 
          </p>
          <div className="flex gap-3">
            <a 
              href="/resume.pdf" 
              download="James_Han_Resume.pdf"
              className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600 text-base"
            >
              Download Resume PDF
            </a>
            <span className="text-gray-400">•</span>
            <a 
              href="/resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600 text-base inline-flex items-center gap-1"
            >
              Open in new tab
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
