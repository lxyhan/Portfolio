import React, { useState } from 'react';

interface MobileNavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  sections: Array<{ id: string; label: string; disabled?: boolean }>;
}

export default function MobileNav({ activeSection, onSectionChange, sections }: MobileNavProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [photoProgress, setPhotoProgress] = useState(0);
  const photos = ['/Newpfp.JPG', '/Newpfp2.JPG', '/newpfp3.jpg'];

  // Auto-switch photo every 10 seconds with progress bar
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex(prev => (prev + 1) % 3);
      setPhotoProgress(0);
    }, 10000);

    const progressInterval = setInterval(() => {
      setPhotoProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="lg:hidden">
      {/* Mobile Header with Profile */}
      <div className="bg-white border-b border-gray-200 px-4 py-6">
        {/* Menu Button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="text-sm font-serif">Menu</span>
        </button>

        {/* Two Column Layout */}
        <div className="flex gap-4 mb-2">
          {/* Left Column - Portrait Photo */}
          <div 
            className="w-32 h-40 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200 shadow-sm cursor-pointer"
            onClick={() => {
              setCurrentPhotoIndex(prev => (prev + 1) % 3);
              setPhotoProgress(0);
            }}
          >
            <img
              src={photos[currentPhotoIndex]}
              alt="James Han"
              className="object-cover w-full h-full transition-opacity duration-500"
            />
          </div>

          {/* Right Column - Name and Bio */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-3">
              <h1 className="font-serif text-xl font-medium text-gray-900 mb-1 leading-tight">
                James Han
              </h1>
              <div className="text-sm text-gray-600 font-serif leading-tight">
                Computer Science & Statistics @ UofT
              </div>
            </div>

            <div className="text-xs text-gray-700 leading-relaxed font-serif space-y-1.5">
              <p>
                Triathlete, interested in product, machine learning, history, and economics.
              </p>
              <p>
                I love music and meeting new friends! Let&apos;s have a chat about your favorite song or book!
              </p>
            </div>
          </div>
        </div>
        
        {/* 3-Segment Progress Bar */}
        <div className="w-full flex gap-1">
          {[0, 1, 2].map((index) => (
            <div key={index} className="flex-1 h-0.5 bg-gray-50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gray-300 transition-all duration-100 ease-linear"
                style={{ 
                  width: currentPhotoIndex === index 
                    ? `${photoProgress}%` 
                    : currentPhotoIndex > index 
                    ? '100%' 
                    : '0%' 
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Overlay Sidebar */}
      {isSidebarOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-xl z-50 overflow-y-auto">
            <div className="p-6">
              {/* Close Button */}
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="mb-6 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Navigation */}
              <nav>
                <div className="space-y-3">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        if (section.disabled) return;
                        onSectionChange(section.id);
                        setIsSidebarOpen(false);
                      }}
                      disabled={section.disabled}
                      className={`w-full text-left px-4 py-3 text-base font-serif transition-all rounded-lg ${
                        section.disabled
                          ? 'text-gray-400 cursor-not-allowed opacity-50'
                          : activeSection === section.id
                          ? 'text-gray-900 font-medium bg-gray-100'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </div>
              </nav>

              {/* Contact Info in Sidebar */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="space-y-3">
                  <div className="text-sm text-gray-500 font-serif">
                    jameshan.cs@gmail.com
                  </div>
                  <div className="flex flex-col gap-2">
                    <a 
                      href="https://linkedin.com/in/jameshan27" 
                      className="text-sm font-serif text-gray-600 hover:text-gray-900 underline"
                    >
                      LinkedIn
                    </a>
                    <a 
                      href="https://github.com/lxyhan" 
                      className="text-sm font-serif text-gray-600 hover:text-gray-900 underline"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Contact Info - Mobile */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between text-xs">
          <div className="text-gray-500 font-serif">
            jameshan.cs@gmail.com
          </div>
          <div className="flex gap-4">
            <a 
              href="https://linkedin.com/in/jameshan27" 
              className="font-serif text-gray-600 hover:text-gray-800 underline"
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com/lxyhan" 
              className="font-serif text-gray-600 hover:text-gray-800 underline"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
