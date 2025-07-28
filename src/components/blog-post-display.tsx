// components/blog-post-display.tsx
import React from 'react';
import type { BlogPost } from '@/types/blog';

interface BlogPostDisplayProps {
  post: BlogPost;
  onClose: () => void;
}

export const BlogPostDisplay: React.FC<BlogPostDisplayProps> = ({ post, onClose }) => {
  const readingTime = Math.ceil((post.content?.split(' ').length || 0) / 200);
  
  // Debug log
  console.log('Rendering post content:', post.content?.substring(0, 200));
  
  return (
    <div className="h-full flex flex-col">
      {/* Fixed header */}
      <header className="flex-shrink-0 bg-white border-b border-gray-200 pb-2 mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
            <button 
              onClick={onClose}
              className="hover:text-gray-900 transition-colors"
            >
              Index
            </button>
            <span>/</span>
            <span className="text-gray-900">{post.slug}</span>
          </div>
          
          {/* Close button in header */}
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <h1 className="text-xl md:text-2xl font-serif text-gray-900 mb-1.5 leading-tight">
          {post.title}
        </h1>
        
        <div className="flex items-center gap-3 text-xs text-gray-600 font-mono mb-2">
          <span>JAMES HAN</span>
          <span>·</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric'
            }).toUpperCase()}
          </time>
          <span>·</span>
          <span>{readingTime}M READ</span>
        </div>
        
        {/* Compact abstract */}
        <div className="pl-2 border-l-2 border-gray-300">
          <p className="text-xs leading-relaxed text-gray-600 italic">
            {post.description}
          </p>
        </div>
      </header>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto">

      {/* Featured Image */}
      <figure className="mb-4">
        <div className="relative w-full h-48 md:h-64 overflow-hidden bg-gray-100">
          <img
            src={post.image}
            alt={`Figure 1: ${post.title}`}
            className="w-full h-full object-cover"
          />
        </div>
        <figcaption className="mt-0.5 text-xs text-gray-500 font-mono">
          Fig. 1
        </figcaption>
      </figure>

      {/* Article Content */}
      {post.content && (
        <div 
          className="prose prose-sm prose-gray max-w-none 
            prose-headings:font-serif prose-headings:font-normal prose-headings:text-gray-900
            prose-h1:text-lg prose-h1:mt-6 prose-h1:mb-2 prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-1
            prose-h2:text-base prose-h2:mt-4 prose-h2:mb-1.5 prose-h2:tracking-wide
            prose-h3:text-sm prose-h3:mt-3 prose-h3:mb-1 prose-h3:italic
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-2 prose-p:text-sm
            prose-a:text-gray-900 prose-a:underline prose-a:decoration-gray-400 prose-a:underline-offset-2 hover:prose-a:decoration-gray-600
            prose-strong:text-gray-900 prose-strong:font-medium
            prose-ul:my-2 prose-li:my-0 prose-li:marker:text-gray-400 prose-li:text-sm
            prose-blockquote:border-l-2 prose-blockquote:border-gray-300 prose-blockquote:pl-3 prose-blockquote:py-1 prose-blockquote:my-3 prose-blockquote:text-gray-600 prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:text-sm
            prose-code:bg-gray-100 prose-code:text-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-sm prose-code:font-mono prose-code:text-xs prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-gray-50 prose-pre:text-gray-800 prose-pre:border prose-pre:border-gray-200 prose-pre:rounded-none prose-pre:shadow-none prose-pre:text-xs
            prose-hr:my-4 prose-hr:border-gray-200"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      )}

      {/* End mark */}
      <div className="text-center my-4 text-gray-400">
        <span className="font-serif">◊</span>
      </div>
      </div>
    </div>
  );
};

// Mobile blog overlay component
export const MobileBlogOverlay: React.FC<BlogPostDisplayProps> = ({ post, onClose }) => {
  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
          <span className="text-sm text-gray-500">Article</span>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <BlogPostDisplay post={post} onClose={onClose} />
      </div>
    </div>
  );
};