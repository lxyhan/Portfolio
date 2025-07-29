import React, { useState } from 'react';
import { Search } from 'lucide-react';

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
        { icon: "java-plain", name: "Java" },
        { icon: "c-plain", name: "C" },
        { icon: "html5-plain", name: "HTML/CSS" }
      ]
    },
    {
      title: "Frontend",
      items: [
        { icon: "react-original", name: "React" },
        { icon: "nextjs-plain", name: "Next.js" },
        { icon: "vue-plain", name: "Vue.js" },
        { icon: "svelte-plain", name: "Svelte" },
        { icon: "tailwindcss-plain", name: "Tailwind" }
      ]
    },
    {
      title: "Design",
      items: [
        { icon: "figma-plain", name: "Figma" },
        { icon: "photoshop-plain", name: "Photoshop" },
        { icon: "premierepro-plain", name: "Premiere Pro" }
      ]
    }
  ];

  const rightColumnCategory: TechCategory = {
    title: "Backend & Cloud",
    items: [
      { icon: "nodejs-plain", name: "Node.js" },
      { icon: "spring-original", name: "Spring Boot" },
      { icon: "flask-original", name: "Flask" },
      { icon: "postgresql-plain", name: "PostgreSQL" },
      { icon: "mongodb-plain", name: "MongoDB" },
      { icon: "redis-plain", name: "Redis" },
      { icon: "docker-plain", name: "Docker" },
      { icon: "kubernetes-plain", name: "Kubernetes" },
      { icon: "amazonwebservices-plain", name: "AWS" },
      { icon: "firebase-plain", name: "Firebase" },
      { icon: "vercel-plain", name: "Vercel" },
      { icon: "git-plain", name: "Git" }
    ]
  };

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
        <span className="text-xs">{tech.name}</span>
      </div>
    );
  };

  return (
    <section className="w-full mt-4">
      <div className="flex items-center justify-between mb-1.5">
        <h2 className="text-base font-medium text-gray-900">Technical Stack</h2>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="
              pl-6 pr-2 py-0.5 text-xs
              border border-gray-200 rounded-md
              focus:outline-none focus:ring-1 focus:ring-blue-500
              placeholder:text-gray-400 w-20
            "
          />
          <Search className="w-3 h-3 text-gray-400 absolute left-1.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-white rounded p-2.5 shadow-sm border border-gray-100">
        <div className="space-y-3">
          {leftColumnCategories.map((category) => (
            <div key={category.title} className="space-y-1">
              <h3 className="text-xs font-medium text-gray-700 flex items-center gap-1">
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
        <div className="space-y-1">
          <h3 className="text-xs font-medium text-gray-700 flex items-center gap-1">
            {rightColumnCategory.title}
            <span className="text-xs text-gray-400">({rightColumnCategory.items.length})</span>
          </h3>
          <div className="flex flex-wrap gap-1">
            {rightColumnCategory.items.map((tech) => (
              <TechPill key={tech.name} tech={tech} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;