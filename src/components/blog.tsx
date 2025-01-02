import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  notionUrl: string;
  tags: string[];
}

const BlogSection: React.FC<{ posts?: BlogPost[] }> = ({ 
  posts = [
    {
      id: '1',
      title: 'Building a Type-safe API with tRPC',
      description: 'Exploring the benefits of end-to-end type safety in modern web applications',
      date: '2024-01-15',
      imageUrl: '/api/placeholder/800/400',
      notionUrl: 'https://notion.so/your-post-1',
      tags: ['TypeScript', 'API']
    },
    {
      id: '2',
      title: 'State Management in 2024',
      description: 'A deep dive into modern state management approaches',
      date: '2024-01-02',
      imageUrl: '/api/placeholder/800/400',
      notionUrl: 'https://notion.so/your-post-2',
      tags: ['React', 'State']
    }
  ]
}) => {
  return (
    <div className="space-y-4 w-full">
      {posts.map((post) => (
        <a
          key={post.id}
          href={post.notionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <article className="relative grid grid-cols-3 sm:grid-cols-4 gap-3 p-2 transition-all duration-300 rounded-lg hover:bg-gray-50">
            <div className="col-span-1">
              <div className="relative aspect-square sm:aspect-[4/3] overflow-hidden rounded-md">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
            
            <div className="col-span-2 sm:col-span-3 flex flex-col justify-between py-0.5">
              <div className="space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-600 line-clamp-1">
                    {post.title}
                  </h3>
                  <ArrowUpRight className="w-3 h-3 flex-shrink-0 text-gray-400 transition-colors group-hover:text-gray-900" />
                </div>
                
                <p className="text-xs text-gray-600 line-clamp-2 sm:line-clamp-1">
                  {post.description}
                </p>
              </div>
              
              <div className="flex items-center justify-between mt-1">
                <div className="flex gap-1">
                  {post.tags.map(tag => (
                    <span 
                      key={tag}
                      className="px-1.5 py-0.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <time className="text-xs text-gray-500">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </div>
          </article>
        </a>
      ))}
    </div>
  );
};

export default BlogSection;