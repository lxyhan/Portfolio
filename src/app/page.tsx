'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Profile from '../components/profile';
import Projects from '../components/projects';
import Tech from '../components/tech';
import Contributions from '../components/contributions';
import Blog from '../components/blog';
import type { BlogPost } from '@/types/blog';
import { useRouter } from 'next/navigation';
import { slugify } from '@/utils/slug';


const BlogContent = ({ post, onClose }: { post: BlogPost; onClose: () => void }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(post.contentPath);
        const html = await response.text();
        setContent(html);
      } catch (error) {
        console.error('Error loading blog post:', error);
        setContent('<p>Failed to load blog post content.</p>');
      }
    };

    fetchContent();
  }, [post.contentPath]);

  return (
    <div className="w-full">
      <div className="relative">
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="flex items-center gap-1 px-3 py-1 text-sm text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-md shadow-sm transition-all"
            aria-label="Close blog post"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Back to Featured Projects</span>
          </button>
        </div>

        <div className="w-full h-40 mb-6 overflow-hidden rounded-lg bg-gray-50">
          <img
            src={post.image}
            alt={`Cover image for the blog post`}
            className="w-full h-full object-cover"
          />
        </div>

        <article
          className="prose prose-sm prose-gray max-w-none prose-headings:font-medium prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-gray-900 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

const MobileBlogOverlay = ({ post, onClose }: { post: BlogPost; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="max-w-lg mx-auto px-4 py-8">
        <BlogContent post={post} onClose={onClose} />
      </div>
    </div>
  );
};

export default function Home() {
  const router = useRouter();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handlePostSelect = (post: BlogPost) => {
    router.push(`/?post=${slugify(post.title)}`, { scroll: false });
    setSelectedPost(post);
  };

  const handlePostClose = () => {
    setSelectedPost(null);
    router.push('/', { scroll: false });
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="min-h-screen bg-white selection:bg-gray-100">
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

        <div className="flex flex-col items-center">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-12 py-6 xl:py-16 px-4 sm:px-6 w-full max-w-[1264px]">
            <div className="relative w-full max-w-[920px] mx-auto xl:mx-0 space-y-6">
              <Profile />
              <Tech />
              <div className="hidden xl:block">
                <Blog selectedPost={selectedPost} onPostClick={handlePostSelect} />
              </div>
            </div>

            <div className="relative w-full mx-auto xl:mx-0">
              {selectedPost ? (
                <div
                  className="w-full space-y-6"
                  style={{
                    maxHeight: 'calc(100vh - 4rem)',
                    overflowY: 'auto',
                  }}
                >
                  <BlogContent post={selectedPost} onClose={handlePostClose} />
                </div>
              ) : (
                <div className="space-y-6">
                  <Projects />
                  <Contributions />
                </div>
              )}
            </div>
          </div>

          <div className="xl:hidden w-full max-w-[620px] space-y-6 px-4">
            <Blog selectedPost={selectedPost} onPostClick={handlePostSelect} />
          </div>
        </div>

        {selectedPost && (
          <div className="xl:hidden">
            <MobileBlogOverlay post={selectedPost} onClose={handlePostClose} />
          </div>
        )}
      </main>
    </Suspense>
  );
}
