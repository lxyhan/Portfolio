// src/app/home-client.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Import your existing components
import Profile from '../components/profile';
import Projects from '../components/projects';
import Tech from '../components/tech';
// import Contributions from '../components/contributions';
import Blog from '../components/blog';
import { BlogPostDisplay, MobileBlogOverlay } from '../components/blog-post-display';
import type { BlogPost } from '@/types/blog';

interface HomeClientProps {
  posts: BlogPost[];
}

export default function HomeClient({ posts }: HomeClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Handle URL params on mount and when they change
  useEffect(() => {
    const postSlug = searchParams.get('post');
    if (postSlug && posts.length > 0) {
      const post = posts.find(p => p.slug === postSlug);
      if (post) {
        setSelectedPost(post);
      }
    } else {
      setSelectedPost(null);
    }
  }, [searchParams, posts]);

  const handlePostSelect = (post: BlogPost) => {
    setSelectedPost(post);
    router.push(`/?post=${post.slug}`, { scroll: false });
  };

  const handlePostClose = () => {
    setSelectedPost(null);
    router.push('/', { scroll: false });
  };

  return (
    <>
      <main className="min-h-screen bg-white xl:h-screen xl:overflow-hidden">
        <style jsx global>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          ::-webkit-scrollbar {
            width: 6px;
          }

          ::-webkit-scrollbar-track {
            background: transparent;
          }

          ::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 3px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.3);
          }

          * {
            scrollbar-width: thin;
            scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
          }

          .animate-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
        `}</style>

        <div className="xl:h-screen xl:flex xl:justify-center">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12 p-6 xl:p-12 max-w-[1400px] mx-auto w-full">
            {/* Left Column - Fixed width */}
            <div className="xl:w-[600px] xl:h-screen xl:py-12 xl:-my-12 flex-shrink-0">
              <div className="xl:sticky xl:top-12 space-y-8">
                <Profile />
                <div className="xl:min-h-[400px]">
                  <Blog posts={posts} selectedPost={selectedPost} onPostClick={handlePostSelect} />
                </div>
              </div>
            </div>

            {/* Right Column - Fixed width, left aligned */}
            <div className="xl:w-[700px] xl:h-screen xl:overflow-y-auto xl:py-12 xl:-my-12 flex-shrink-0">
              <div className="space-y-8 xl:pr-4">
                {selectedPost ? (
                  <div className="animate-in h-[calc(100vh-12rem)] xl:h-[calc(100vh-8rem)]">
                    <BlogPostDisplay post={selectedPost} onClose={handlePostClose} />
                  </div>
                ) : (
                  <>
                    <Projects />
                    <Tech />
                    {/* <Contributions /> */}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Blog Overlay */}
        {selectedPost && (
          <div className="xl:hidden">
            <MobileBlogOverlay post={selectedPost} onClose={handlePostClose} />
          </div>
        )}
      </main>
    </>
  );
}