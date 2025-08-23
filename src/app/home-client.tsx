'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Import your existing components
import Projects from '../components/projects';
import Tech from '../components/tech';
import Blog from '../components/blog';
import About from '../components/about';
import Resume from '../components/resume';
import MobileNav from '../components/mobile-nav';
import { BlogPostDisplay, MobileBlogOverlay } from '../components/blog-post-display';
import type { BlogPost } from '@/types/blog';
import Gallery from '../components/gallery';

interface HomeClientProps {
  posts: BlogPost[];
}

export default function HomeClient({ posts }: HomeClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeSection, setActiveSection] = useState('about');
  const [isLoading, setIsLoading] = useState(false);

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

  const sections = [
    { id: 'about', label: 'About Me' },
    { id: 'projects', label: 'Recent Projects' },
    { id: 'writing', label: 'Writing' },
    { id: 'tech', label: 'Tech Stack' },
    { id: 'gallery', label: 'Camera Roll' },
    { id: 'resume', label: 'Resume / CV' }
  ];

  const renderContent = () => {
    if (selectedPost) {
      return <BlogPostDisplay post={selectedPost} onClose={handlePostClose} />;
    }

    switch (activeSection) {
      case 'about':
        return <About />;
      case 'projects':
        return <Projects />;
      case 'writing':
        return <Blog posts={posts} selectedPost={selectedPost} onPostClick={handlePostSelect} />;
      case 'tech':
        return <Tech />;
      case 'gallery':
        return <Gallery />;
      case 'resume':
        return <Resume />;
      default:
        return null;
    }
  };

  return (
    <>
      <main className="min-h-screen bg-white">
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
          
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          }

          .font-serif {
            font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
          }
        `}</style>

        {/* Mobile Navigation */}
        <MobileNav 
          activeSection={activeSection} 
          onSectionChange={(section) => {
            setIsLoading(true);
            setTimeout(() => {
              setActiveSection(section);
              setIsLoading(false);
            }, 200);
          }}
          sections={sections}
        />

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="max-w-5xl mx-auto px-8 lg:px-20 py-16 lg:py-24">
            <div className="flex">
              
              {/* Desktop sidebar */}
              <div className="w-64 flex-shrink-0">
                <div className="sticky top-8">
                  {/* Header with photo */}
                  <div className="mb-8">
                    <div className="flex gap-3 items-center mb-4">
                      <div className="w-16 h-16 bg-gray-50 rounded overflow-hidden flex-shrink-0">
                        <img
                          src="/profile-photo.jpg"
                          alt="James Han"
                          className="object-cover w-full h-full"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h1 className="font-serif text-xl font-medium text-gray-900 leading-tight">
                          James Han
                        </h1>
                        <div className="text-base text-gray-500 leading-tight font-serif">
                          Compsci & Stats @ UofT
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-base text-gray-600 leading-relaxed font-serif">
                      Building at the intersection of <span className="italic">machine learning</span> and <span className="italic">product design</span>. 
                      Currently studying computer science and statistics at UofT, with a focus on creating 
                      thoughtful digital experiences.
                    </p>
                  </div>

                  {/* Navigation */}
                  <nav className="mb-8">
                    <div className="space-y-2">
                      {sections.map((section) => (
                        <div key={section.id}>
                          <button
                            onClick={() => {
                              setIsLoading(true);
                              setTimeout(() => {
                                setActiveSection(section.id);
                                setIsLoading(false);
                              }, 200);
                            }}
                            className={`text-left text-base font-serif transition-colors ${
                              activeSection === section.id
                                ? 'text-gray-900 font-medium'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            {section.label}
                          </button>
                        </div>
                      ))}
                    </div>
                  </nav>

                  {/* Contact */}
                  <div className="space-y-2">
                    <div className="text-sm text-gray-400 font-serif">
                      jameshan.cs@gmail.com
                    </div>
                    <div className="flex gap-3 items-center">
                      <a 
                        href="https://linkedin.com/in/jameshan27" 
                        className="text-sm font-serif text-gray-600 hover:text-gray-800 hover:underline"
                      >
                        LinkedIn
                      </a>
                      <a 
                        href="https://github.com/lxyhan" 
                        className="text-sm font-serif text-gray-600 hover:text-gray-800 hover:underline"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Main Content Area */}
              <div className="flex-1 ml-12 relative">
                <div 
                  className={`transition-opacity duration-500 ease-in-out ${
                    isLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                  style={{
                    transform: isLoading ? 'translateY(10px)' : 'translateY(0)',
                    transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out'
                  }}
                >
                  {!isLoading && renderContent()}
                </div>
                
                {isLoading && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center min-h-96 transition-opacity duration-300 ease-in-out"
                    style={{
                      opacity: isLoading ? 1 : 0
                    }}
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <span className="text-base italic text-gray-600 font-serif">Loading</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Content Area */}
        <div className="lg:hidden">
          <div className="px-4 py-6 relative">
            <div 
              className={`transition-opacity duration-500 ease-in-out ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}
              style={{
                transform: isLoading ? 'translateY(10px)' : 'translateY(0)',
                transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out'
              }}
            >
              {!isLoading && renderContent()}
            </div>
            
            {isLoading && (
              <div 
                className="absolute inset-0 flex items-center justify-center min-h-96 transition-opacity duration-300 ease-in-out"
                style={{
                  opacity: isLoading ? 1 : 0
                }}
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-sm italic text-gray-600 font-serif">Loading</span>
                </div>
              </div>
            )}
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