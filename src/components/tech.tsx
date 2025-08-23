import React, { useState } from 'react';
import { Search } from 'lucide-react';
import PinnedRepositories from './pinned-repositories';

interface Technology {
  name: string;
  icon?: string;
}

interface TechCategory {
  title: string;
  items: Technology[];
}

const TechStackSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const leftColumnCategories: TechCategory[] = [
    {
      title: "Languages",
      items: [
        { icon: "python-plain", name: "Python" },
        { icon: "typescript-plain", name: "TypeScript" },
        { icon: "javascript-plain", name: "JavaScript" },
        { icon: "r-plain", name: "R" },
        { icon: "ruby-plain", name: "Ruby" },
        { icon: "java-plain", name: "Java" },
        { icon: "c-plain", name: "C" },
        { icon: "cplusplus-plain", name: "C++" }
      ]
    },
    {
      title: "ML & Data",
      items: [
        { name: "PyTorch" },
        { name: "Pandas" },
        { name: "NumPy" },
        { name: "Jupyter" },
        { name: "Databricks" }
      ]
    },
    {
      title: "Frontend",
      items: [
        { icon: "react-original", name: "React" },
        { icon: "nextjs-plain", name: "Next.js" },
        { icon: "svelte-plain", name: "Svelte" },
        { icon: "tailwindcss-plain", name: "Tailwind" },
        { name: "Three.js" }
      ]
    }
  ];

  const rightColumnCategories: TechCategory[] = [
    {
      title: "Design & Creative",
      items: [
        { icon: "figma-plain", name: "Figma" },
        { icon: "photoshop-plain", name: "Photoshop" },
        { icon: "aftereffects-plain", name: "Adobe AE" },
        { icon: "premierepro-plain", name: "Premiere" }
      ]
    },
    {
      title: "Backend & Cloud",
      items: [
        { icon: "nodejs-plain", name: "Node.js" },
        { icon: "spring-original", name: "Spring Boot" },
        { icon: "flask-original", name: "Flask" },
        { icon: "fastapi-plain", name: "FastAPI" },
        { icon: "postgresql-plain", name: "PostgreSQL" },
        { icon: "mongodb-plain", name: "MongoDB" },
        { icon: "redis-plain", name: "Redis" },
        { icon: "docker-plain", name: "Docker" },
        { icon: "amazonwebservices-plain", name: "AWS" }
      ]
    },
    {
      title: "DevOps",
      items: [
        { icon: "git-plain", name: "Git" },
        { name: "Linear" },
        { icon: "vercel-plain", name: "Vercel" }
      ]
    }
  ];

  const TechPill = ({ tech }: { tech: Technology }) => {
    const isMatched = searchQuery && 
      tech.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return (
      <div
        key={tech.name}
        className={`
          flex items-center gap-0.5 px-1.5 py-0.5 
          rounded text-xs
          transition-all duration-200 ease-in-out
          ${isMatched 
            ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' 
            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          }
          cursor-default
        `}
      >
        {tech.icon && (
          <i className={`devicon-${tech.icon} colored text-xs`} />
        )}
        <span className="text-xs font-serif">{tech.name}</span>
      </div>
    );
  };

  return (
    <section className="w-full mt-4">
      <div className="flex items-center justify-between mb-1.5">
        <h2 className="text-base font-medium text-gray-900 font-serif">Technical Stack</h2>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="
              pl-6 pr-2 py-0.5 text-xs font-serif
              border border-gray-200 rounded-md
              focus:outline-none focus:ring-1 focus:ring-blue-500
              placeholder:text-gray-400 w-20
            "
          />
          <Search className="w-3 h-3 text-gray-400 absolute left-1.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>
      
      <div className="bg-white rounded p-2.5 shadow-sm border border-gray-100 space-y-4">
        {/* Tech Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-3">
          {leftColumnCategories.map((category) => (
            <div key={category.title} className="space-y-1">
              <h3 className="text-xs font-medium text-gray-700 flex items-center gap-1 font-serif">
                {category.title}
                <span className="text-xs text-gray-400">({category.items.length})</span>
              </h3>
              <div className="flex flex-wrap gap-1">
                {category.items.map((tech) => (
                  <TechPill key={tech.name} tech={tech} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {rightColumnCategories.map((category) => (
            <div key={category.title} className="space-y-1">
              <h3 className="text-xs font-medium text-gray-700 flex items-center gap-1 font-serif">
                {category.title}
                <span className="text-xs text-gray-400">({category.items.length})</span>
              </h3>
              <div className="flex flex-wrap gap-1">
                {category.items.map((tech) => (
                  <TechPill key={tech.name} tech={tech} />
                ))}
              </div>
            </div>
          ))}
        </div>
        </div>
        
        {/* Popular Repositories */}
        <PinnedRepositories username="lxyhan" maxRepos={4} />
      </div>
    </section>
  );
};

export default TechStackSection;