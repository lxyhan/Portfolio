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
        { icon: "r-original", name: "R" },
        { icon: "c-plain", name: "C" },
        { icon: "ruby-plain", name: "Ruby" },
        { icon: "html5-plain", name: "HTML/CSS" },
        { icon: "svelte-plain", name: "Svelte" },
        { icon: "latex-original", name: "LaTeX" }
      ]
    },
    {
      title: "Design",
      items: [
        { icon: "figma-plain", name: "Figma" },
        { icon: "premierepro-plain", name: "Adobe Premiere Pro" },
        { icon: "illustrator-plain", name: "Adobe Illustrator" },
        { icon: "photoshop-plain", name: "Adobe Photoshop" },
        { icon: "aftereffects-plain", name: "Adobe After Effects" },
        { icon: "lightroom-plain", name: "Adobe Lightroom" }
      ]
    }
  ];

  const rightColumnCategory: TechCategory = {
    title: "Frameworks & Tools",
    items: [
      { icon: "git-plain", name: "Git" },
      { icon: "react-original", name: "React" },
      { icon: "nextjs-plain", name: "Next.js" },
      { icon: "spring-original", name: "Spring Boot" },
      { icon: "rails-plain", name: "Rails" },
      { icon: "flask-original", name: "Flask" },
      { icon: "svelte-original", name: "SvelteKit" },
      { icon: "tailwindcss-plain", name: "Tailwind" },
      { icon: "bootstrap-plain", name: "Bootstrap" },
      { icon: "sass-original", name: "SASS" },
      { icon: "amazonwebservices-plain", name: "AWS" },
      { icon: "firebase-plain", name: "Firebase" },
      { icon: "docker-plain", name: "Docker" },
      { icon: "kubernetes-plain", name: "Kubernetes" },
      { icon: "webpack-plain", name: "Webpack" },
      { icon: "mongodb-plain", name: "MongoDB" },
      { icon: "postgresql-plain", name: "PostgreSQL" },
      { icon: "redux-original", name: "Redux" },
      { icon: "maven-plain", name: "Maven" },
      { icon: "vercel-plain", name: "Vercel" },
      { icon: "prisma-plain", name: "Prisma" },
      { icon: "stripe-original", name: "Stripe" },
      { icon: "auth0-plain", name: "Clerk Authentication" }
    ]
  };

  const TechPill = ({ tech }: { tech: Technology }) => {
    const isMatched = searchQuery && 
      tech.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return (
      <div
        key={tech.name}
        className={`
          flex items-center gap-1 px-2 py-0.5 
          rounded-full text-xs
          transition-all duration-200 ease-in-out
          ${isMatched 
            ? 'bg-blue-50 text-blue-700 ring-2 ring-blue-200 shadow-sm' 
            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-sm'
          }
          cursor-default
        `}
      >
        {tech.icon && (
          <i className={`
            devicon-${tech.icon} colored text-sm
            transition-transform duration-200
            group-hover:scale-110
          `} />
        )}
        <span>{tech.name}</span>
      </div>
    );
  };

  return (
    <section className="max-w-3xl mx-auto mt-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-medium text-gray-900">Technical Stack</h2>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills..."
            className="
              pl-8 pr-3 py-1 text-sm
              border border-gray-200 rounded-md
              focus:outline-none focus:ring-2 focus:ring-blue-500
              placeholder:text-gray-400
            "
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="space-y-6">
          {leftColumnCategories.map((category) => (
            <div key={category.title} className="space-y-2.5">
              <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                {category.title}
                <span className="text-xs text-gray-400">({category.items.length})</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {category.items.map((tech) => (
                  <TechPill key={tech.name} tech={tech} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-2.5">
          <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            {rightColumnCategory.title}
            <span className="text-xs text-gray-400">({rightColumnCategory.items.length})</span>
          </h3>
          <div className="flex flex-wrap gap-1.5">
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