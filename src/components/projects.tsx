import React from 'react';
import { Github } from 'lucide-react';

interface Technology {
  icon: string;
  name: string;
}

interface Project {
  title: string;
  description: string;
  technologies: Technology[];
  github?: string;
  githubUsername?: string;
  icon?: string;
}

interface ProjectCardProps {
  project: Project;
}

const TechStack: React.FC<{ technologies: Technology[] }> = ({ technologies }) => (
    <div className="flex flex-col items-end gap-2">
    <div className="flex flex-wrap justify-end gap-2 max-w-[200px]">
      {technologies.map((tech, i) => (
        <i
          key={i}
          className={`devicon-${tech.icon} colored text-xl`}
          title={tech.name}
        />
      ))}
    </div>
    <div className="text-[11px] text-gray-500 text-right max-w-[150px] flex flex-wrap justify-end gap-x-2">
      {technologies.map((tech, i) => (
        <span key={i}>{tech.name}</span>
      ))}
    </div>
  </div>
);

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <div className="group py-4 border-b border-gray-100 last:border-b-0">
    <div className="flex items-start justify-between gap-8">
      <div className="space-y-1.5 flex-1">
        <div className="flex items-center gap-3">
          {project.icon && (
            <img 
              src={project.icon} 
              alt={`${project.title} logo`} 
              className="w-6 h-6 object-contain"
            />
          )}
          <h3 className="text-sm font-medium text-gray-900">{project.title}</h3>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 transition-colors group/link"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline group-hover/link:underline">View Source</span>
              {project.githubUsername && (
                <img 
                  src={`https://img.shields.io/github/commit-activity/t/${project.githubUsername}/${project.github.split('/').pop()}?style=flat-square&label=commits`}
                  alt="GitHub commit count"
                  className="h-4"
                />
              )}
            </a>
          )}
        </div>
        <p className="text-xs text-gray-600 leading-relaxed pr-4">{project.description}</p>
      </div>
      <TechStack technologies={project.technologies} />
    </div>
  </div>
);

const ProjectsSection: React.FC = () => {
  const projects: Project[] = [
    {
      title: "Markyt",
      description: "E-commerce platform with advanced payment processing and real-time inventory management.",
      github: "https://github.com/username/markyt",
      githubUsername: "username",
      technologies: [
        { icon: 'svelte-plain', name: 'Svelte' },
        { icon: 'firebase-plain', name: 'Firebase' },
        { icon: 'typescript-plain', name: 'TypeScript' },
        { icon: 'tailwindcss-plain', name: 'Tailwind' },
        { icon: 'postgresql-plain', name: 'PostgreSQL' }
      ]
    },
    {
      title: "Close to Home",
      description: "AI-powered disaster management platform with real-time heatmaps and interactive disaster zone mapping.",
      github: "https://github.com/lxyhan/Close-to-Home",
      githubUsername: "lxyhan",
      technologies: [
        { icon: 'react-original', name: 'React' },
        { icon: 'python-plain', name: 'Python' },
        { icon: 'tensorflow-plain', name: 'TensorFlow' },
        { icon: 'mongodb-plain', name: 'MongoDB' },
        { icon: 'nextjs-plain', name: 'Next.js' }
      ]
    },
    {
      title: "Harled Equipment Tracking",
      description: "Military equipment tracking system with intuitive UX and strict security standards.",
      technologies: [
        { icon: 'figma-plain', name: 'Figma' },
        { icon: 'react-original', name: 'React' },
        { icon: 'nodejs-plain', name: 'Node.js' },
        { icon: 'docker-plain', name: 'Docker' },
        { icon: 'kubernetes-plain', name: 'K8s' }
      ]
    },
    {
      title: "Weather Analytics",
      description: "Advanced weather visualization platform with real-time analytics and dynamic UI theming.",
      github: "https://github.com/username/weather-analytics",
      githubUsername: "username",
      technologies: [
        { icon: 'javascript-plain', name: 'JavaScript' },
        { icon: 'sass-original', name: 'Sass' },
        { icon: 'webpack-plain', name: 'Webpack' },
        { icon: 'bootstrap-plain', name: 'Bootstrap' }
      ]
    }
  ];

  return (
    <section className="max-w-3xl mx-auto">
      <div className="mb-1">
        <h2 className="text-lg font-medium text-gray-900 mb-2">Featured Projects</h2>
        <p className="text-sm text-gray-600">My area of expertise is in backend web programming. I am also highly experienced
            with modern frontend design and performance optimization tools and protocols.
        </p>
      </div>
      <div className="divide-y divide-gray-100">
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;