import React from 'react';
import type { BlogPost } from '@/types/blog';

interface BlogSectionProps {
  posts: BlogPost[];
  selectedPost: BlogPost | null;
  onPostClick: (post: BlogPost) => void;
}

interface BlogCardProps {
  post: BlogPost;
  onClick: () => void;
  index: number;
}

const BlogCard = ({ post, onClick, index }: BlogCardProps) => {
  const readingTime = Math.ceil((post.content?.split(' ').length || 500) / 200);
  
  return (
    <article 
      onClick={onClick}
      className="group flex gap-3 py-3 cursor-pointer hover:bg-gray-50 -mx-3 px-3 rounded transition-all"
      role="button"
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Compact image */}
      <div className="relative w-16 h-16 overflow-hidden bg-gray-100 flex-shrink-0">
        <img
          src={post.image}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-0.5">
          <span className="font-mono text-xs text-gray-400">
            {String(index).padStart(2, '0')}
          </span>
          <h3 className="font-serif text-base text-gray-900 line-clamp-1 group-hover:text-gray-600 transition-colors">
            {post.title}
          </h3>
        </div>
        
        <p className="text-xs text-gray-600 line-clamp-1 mb-1">
          {post.description}
        </p>
        
        <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: '2-digit'
            }).toUpperCase()}
          </time>
          <span>·</span>
          <span>{readingTime}M</span>
        </div>
      </div>
    </article>
  );
};

const Blog = ({ posts, onPostClick }: BlogSectionProps) => {
  const scrollbarStyles = `
    .blog-scrollbar::-webkit-scrollbar {
      width: 1px;
    }
    .blog-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .blog-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.05);
      border-radius: 0px;
    }
    .blog-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, 0.08);
    }
    .blog-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: rgba(0, 0, 0, 0.05) transparent;
    }
  `;

  return (
    <section className="w-full h-full flex flex-col">
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
      
      {/* Sticky Header */}
      <header className="flex-shrink-0 mb-4 pb-3 border-b border-gray-200 bg-white sticky top-0 z-10">
        <h2 className="font-serif text-xl text-gray-900 mb-0.5">
          Selected Writings
        </h2>
        <p className="text-xs text-gray-600">
          Essays on hackathons, endurance sports, strength training, and observations from UofT Compsci.
        </p>
      </header>
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden pr-1 blog-scrollbar">
        <div className="space-y-0">
          {posts.map((post, index) => (
            <BlogCard 
              key={post.slug} 
              post={post} 
              onClick={() => onPostClick(post)}
              index={index + 1}
            />
          ))}
        </div>
        
        {posts.length === 0 && (
          <p className="text-xs text-gray-500 italic py-3">
            No writings published yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default Blog;