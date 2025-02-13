import React from 'react';
import { Github, Video } from 'lucide-react';

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
  video?: string;
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
          <div className="flex items-center gap-2">
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
            {project.video && (
              <a
                href={project.video}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 transition-colors group/link"
              >
                <Video className="w-3.5 h-3.5" />
                <span className="hidden sm:inline group-hover/link:underline">Watch Demo</span>
              </a>
            )}
          </div>
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
      "title": "Persona - AI Language Tutor",
      "description": "UofTHacks 2025 1st Place: Real-time AI language learning assistant combining computer vision, 3D animation, and natural conversation for personalized tutoring.",
      "github": "https://github.com/lxyhan/Persona-UofT-Hacks-12",
      "githubUsername": "lxyhan",
      "technologies": [
        { "icon": "react-plain", "name": "React" },
        { "icon": "tensorflow-original", "name": "TensorFlow" },
        { "icon": "pytorch-original", "name": "PyTorch" },
        { "icon": "threejs-original", "name": "Three.js" },
        { "icon": "opencv-original", "name": "OpenCV" }
      ]
    },
    {
        title: "Brampton Tennis Queue",
        description: "City of Brampton's recreation team to launch this Queuing app in local courts by Summer 2025!",
        technologies: [
          { icon: 'nextjs-plain', name: 'Next.js' },
          { icon: 'react-plain', name: 'React' },
          { icon: 'typescript-plain', name: 'TypeScript' },
          { icon: 'nodejs-plain', name: 'Node.js' },
          { icon: 'tailwindcss-plain', name: 'Tailwind' }
        ]
      },
    {
      title: "Close to Home",
      description: "New Hacks Winning Project: heatmaps and interactive disaster zone mapping.",
      github: "https://github.com/lxyhan/Close-to-Home",
      githubUsername: "lxyhan",
      technologies: [
        { icon: 'svelte-plain', name: 'Svelte' },
        { icon: 'python-plain', name: 'Python' },
        { icon: 'flask-plain', name: 'Flask' },
        { icon: 'mongodb-plain', name: 'MongoDB' },
        { icon: 'nextjs-plain', name: 'Next.js' }
      ]
    },
    {
        title: "SpendSmart",
        description: "CSC207 Project: AI powered finance management app for students, generating analytics on monthly spending",
        github: "https://github.com/CSC207-NueralNova/group-project",
        technologies: [
          { icon: 'svelte-plain', name: 'Svelte' },
          { icon: 'firebase-plain', name: 'Firebase' },
          { icon: 'java-plain', name: 'Java' },
          { icon: 'spring-plain', name: 'Spring Boot' },
          { icon: 'tailwindcss-plain', name: 'Tailwind' }
        ]
      },
      {
        title: "Markyt",
        description: "E-commerce platform with advanced payment processing and real-time inventory management.",
        github: "https://github.com/lxyhan/markyt-development",
        githubUsername: "lxyhan",
        technologies: [
          { icon: 'svelte-plain', name: 'Svelte' },
          { icon: 'firebase-plain', name: 'Firebase' },
          { icon: 'javascript-plain', name: 'Javascript' },
          { icon: 'tailwindcss-plain', name: 'Tailwind' },
          { icon: 'postgresql-plain', name: 'PostgreSQL' }
        ]
      },
    {
      title: "Harled Equipment Tracking",
      description: "Military equipment tracking system with intuitive UX and strict security standards.",
      video: "https://example.com/harled-demo",
      technologies: [
        { icon: 'figma-plain', name: 'Figma' },
        { icon: 'react-original', name: 'React' },
        { icon: 'django-plain', name: 'Django' },
        { icon: 'docker-plain', name: 'Docker' },
        { icon: 'kubernetes-plain', name: 'K8s' }
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