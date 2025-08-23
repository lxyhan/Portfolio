import React from 'react';

interface MobileNavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  sections: Array<{ id: string; label: string }>;
}

export default function MobileNav({ activeSection, onSectionChange, sections }: MobileNavProps) {
  return (
    <div className="lg:hidden">
      {/* Mobile Header with Profile */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gray-50 rounded overflow-hidden flex-shrink-0">
            <img
              src="/profile-photo.jpg"
              alt="James Han"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h1 className="font-serif text-lg font-medium text-gray-900">
              James Han
            </h1>
            <div className="text-sm text-gray-500 font-serif">
              CompSci & Stats @ UofT
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation Tabs */}
        <div className="overflow-x-auto">
          <div className="flex space-x-1 min-w-max">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`px-4 py-2 text-sm font-serif transition-all whitespace-nowrap rounded-md ${
                  activeSection === section.id
                    ? 'text-gray-900 font-medium border border-gray-300'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-transparent'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
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
