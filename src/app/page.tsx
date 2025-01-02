'use client';

import React from 'react';
import Profile from '../components/profile';
import Projects from '../components/projects';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Global scrollbar styles - slim and subtle */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 3px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #E5E7EB;
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #D1D5DB;
        }
        * {
          scrollbar-width: thin;
          scrollbar-color: #E5E7EB transparent;
        }
      `}</style>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 xl:grid-cols-[640px_1fr] gap-16 py-16">
          {/* Profile section */}
          <div className="relative">
            <div className="xl:sticky xl:top-16">
              <Profile />
            </div>
          </div>

          {/* Projects section */}
          <div className="relative">
            <Projects />
          </div>
        </div>
      </div>
    </main>
  );
}