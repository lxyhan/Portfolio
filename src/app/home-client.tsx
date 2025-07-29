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

// Import your gallery component for the third column
import Gallery from '../components/gallery';

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
      <main className="min-h-screen bg-white lg:h-screen lg:overflow-hidden">
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
            width: 4px;
          }

          ::-webkit-scrollbar-track {
            background: transparent;
          }

          ::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 2px;
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

          /* Single column gallery */
          .gallery-single-column img {
            width: 100% !important;
            margin-bottom: 0.75rem;
          }
        `}</style>

        <div className="lg:h-screen lg:flex lg:justify-center">
          {/* Container with uniform padding */}
          <div className="grid grid-cols-1 gap-4 p-6 lg:gap-2 lg:p-6 max-w-none mx-auto w-full lg:grid-cols-[420px_1fr_280px] lg:grid-rows-1">
            
            {/* Left Column - Profile, Blog (scrollable), Tech Stack */}
            <div className="lg:h-screen lg:py-6 lg:-my-6 flex-shrink-0">
              <div className="lg:h-full lg:flex lg:flex-col lg:border-r lg:border-gray-100 lg:pr-2">
                {/* Profile - fixed at top */}
                <div className="lg:flex-shrink-0">
                  <Profile />
                </div>
                
                {/* Subtle divider */}
                <div className="hidden lg:block border-t border-gray-100"></div>
                
                {/* Blog - scrollable middle section */}
                <div className="lg:flex-1 lg:min-h-0 lg:overflow-y-auto lg:pr-2 lg:pt-2">
                  <Blog posts={posts} selectedPost={selectedPost} onPostClick={handlePostSelect} />
                </div>
                
                {/* Subtle divider */}
                <div className="hidden lg:block border-t border-gray-100"></div>
                
                {/* Tech Stack - fixed at bottom */}
                <div className="lg:flex-shrink-0">
                  <Tech />
                </div>
              </div>
            </div>

            {/* Middle Column - Projects & Tech or Blog Post (gets most space) */}
            <div className="lg:h-screen lg:py-6 lg:-my-6 flex-shrink-0 lg:min-w-0 lg:overflow-hidden">
              <div className="lg:h-full lg:flex lg:flex-col lg:px-2 lg:border-r lg:border-gray-100">
                {selectedPost ? (
                  <div className="animate-in h-[calc(100vh-12rem)] lg:h-[calc(100vh-6rem)]">
                    <BlogPostDisplay post={selectedPost} onClose={handlePostClose} />
                  </div>
                ) : (
                  <>
                    {/* Projects component - now gets much more space! */}
                    <div className="lg:flex-1 lg:min-h-0 lg:mb-4 lg:mt-0">
                      <Projects />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Column - Gallery (narrow, single column) */}
            <div className="lg:h-screen lg:overflow-y-auto lg:py-6 lg:-my-6 flex-shrink-0">
              <div className="h-full lg:gallery-single-column lg:pl-2">
                <Gallery />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Blog Overlay */}
        {selectedPost && (
          <div className="lg:hidden">
            <MobileBlogOverlay post={selectedPost} onClose={handlePostClose} />
          </div>
        )}
      </main>
    </>
  );
}