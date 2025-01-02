'use client';

import React from 'react';
import Profile from '../components/profile';
import Projects from '../components/projects';
import Tech from '../components/tech';
import Contributions from '../components/contributions';

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-gray-100">
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        ::-webkit-scrollbar {
          width: 2px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #E5E7EB;
          border-radius: 2px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #D1D5DB;
        }
        * {
          scrollbar-width: thin;
          scrollbar-color: #E5E7EB transparent;
        }
        
        .animate-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>

<div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Subtle background gradient decoration */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-96 bg-gradient-to-r from-gray-50 via-white to-gray-50 blur-3xl opacity-80 pointer-events-none" />
    
    <div className="flex justify-center">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-24 py-12 xl:py-16 w-full max-w-[1264px] relative">
        {/* Left column */}
        <div className="relative w-full max-w-[620px] mx-auto xl:mx-0">
          <div className="xl:sticky xl:top-8 space-y-6 animate-in" style={{ animationDelay: '0.1s' }}>
            {/* Subtle section indicator */}
            <div className="absolute -left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent opacity-0 xl:opacity-30" />
            
            <Profile />
            <Tech />
            {/* <Blog //> */ }
          </div>
        </div>

        {/* Center divider */}
        <div className="hidden xl:block absolute left-1/2 top-12 -translate-x-1/2 w-px h-[calc(100%-6rem)] bg-gradient-to-b from-transparent via-gray-200 to-transparent opacity-30" />

        {/* Right column */}
        <div className="relative w-full max-w-[520px] mx-auto xl:mx-0">
          <div className="space-y-6 animate-in" style={{ animationDelay: '0.2s' }}>
            {/* Subtle section indicator */}
            <div className="absolute -left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent opacity-0 xl:opacity-30" />
            
            <Projects />
            <Contributions />
          </div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-gray-50 to-transparent opacity-60 pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gray-50 to-transparent opacity-60 pointer-events-none" />
      </div>
    </div>
  </div>
</main>
  );
}