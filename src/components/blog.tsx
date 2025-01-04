import React from 'react';
import { Calendar, ArrowUpRight } from 'lucide-react';
import type { BlogPost } from '@/types/blog';
import type { Dispatch, SetStateAction } from 'react';

interface BlogSectionProps {
  selectedPost: BlogPost | null;
  onPostClick: (post: BlogPost) => void;
}

interface BlogCardProps {
  post: BlogPost;
  onClick: () => void;
}

const BlogCard = ({ post, onClick }: BlogCardProps) => (
  <div 
    onClick={onClick}
    className="group relative flex gap-4 py-3 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors"
    role="button"
    tabIndex={0}
    onKeyDown={(e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    }}
  >
    <div className="relative w-24 h-24 overflow-hidden rounded-md flex-shrink-0">
      <img
        src={post.image}
        alt={`Cover image for ${post.title}`}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="flex-1 min-w-0 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
          <Calendar className="w-3 h-3" />
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>
        <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">
          {post.title}
        </h3>
        <p className="text-xs text-gray-600 line-clamp-2">
          {post.description}
        </p>
      </div>
      <div className="mt-1">
        <span className="inline-flex items-center gap-1 text-xs text-gray-900 group-hover:text-gray-600 transition-colors">
          Read post
          <ArrowUpRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  </div>
);

const Blog = ({ selectedPost, onPostClick }: BlogSectionProps) => {
  const posts: BlogPost[] = [
    {
      title: "On Distance Running: Reflections from the UofT Run Club",
      description: "4 Months ago I started organizing runs for the UofT Run Club, Here's the story.",
      date: "2024-09-01",
      image: "/Running.JPG",
      contentPath: "/blog-posts/running-revolution.html"
    },
    {
      title: "Surviving (and Winning!) my first University Hackathon",
      description: "24 hours of pure chaos and creativity: no registration, an impromptu team that clicked instantly, and a git reset that wiped my laptop keychain clean five minutes in.",
      date: "2024-10-28",
      image: "/Newhacks.png",
      contentPath: "/blog-posts/surviving-newhacks.html"
    }
  ];

  return (
    <section className="max-w-3xl mx-auto order-last xl:order-none">
      <div className="mb-4">
        <h2 className="text-lg font-medium text-gray-900 mb-1">
          Essays
        </h2>
        <p className="text-sm text-gray-600">
          Selected writings on software design, athletics, and university life.
        </p>
      </div>
      <div className="divide-y divide-gray-100">
        {posts.map((post, i) => (
          <BlogCard 
            key={i} 
            post={post} 
            onClick={() => onPostClick(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Blog;