import React from 'react';
import { Github, Video, Image } from 'lucide-react';

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
  <div className="flex flex-col items-end gap-1.5">
    <div className="flex flex-wrap justify-end gap-2 max-w-[180px]">
      {technologies.map((tech, i) => (
        <i
          key={i}
          className={`devicon-${tech.icon} colored text-xl`}
          title={tech.name}
        />
      ))}
    </div>
    <div className="text-[10px] text-gray-500 text-right max-w-[150px] flex flex-wrap justify-end gap-x-1.5 leading-tight">
      {technologies.map((tech, i) => (
        <span key={i}>{tech.name}</span>
      ))}
    </div>
  </div>
);

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <div className="group py-3 border-b border-gray-100 last:border-b-0">
    <div className="flex items-start gap-4">
      {/* Left side - Media thumbnail */}
      <div className="flex-shrink-0 relative">
        {project.video ? (
          <a
            href={project.video}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-20 h-12 bg-gray-900 rounded-lg overflow-hidden group/video hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="w-full h-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center relative">
              <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
              <div className="absolute inset-0 bg-black/20 group-hover/video:bg-black/10 transition-colors"></div>
              <div className="absolute top-1 right-1 text-[8px] font-bold text-white bg-black/50 px-1 rounded">HD</div>
            </div>
          </a>
        ) : (
          <div className="w-20 h-12 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
              <Image className="w-6 h-6 text-gray-500" />
            </div>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex items-start justify-between gap-6 flex-1">
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-3">
            {project.icon && (
              <img 
                src={project.icon} 
                alt={`${project.title} logo`} 
                className="w-5 h-5 object-contain"
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
  </div>
);

const ProjectsSection: React.FC = () => {
  const scrollbarStyles = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 0.5px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.02);
      border-radius: 0px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, 0.04);
    }
    .custom-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: rgba(0, 0, 0, 0.02) transparent;
    }
  `;

  const projects: Project[] = [
    {
      "title": "UofTHacks 2025 1st Place",
      "description": "Persona - AI Language Tutor: Real-time AI language learning assistant combining computer vision, 3D animation, and natural conversation for personalized tutoring.",
      "github": "https://github.com/lxyhan/Persona-UofT-Hacks-12",
      "githubUsername": "lxyhan",
      "video": "https://example.com/persona-demo",
      "technologies": [
        { "icon": "react-plain", "name": "React" },
        { "icon": "tensorflow-original", "name": "TensorFlow" },
        { "icon": "pytorch-original", "name": "PyTorch" },
        { "icon": "threejs-original", "name": "Three.js" },
        { "icon": "opencv-original", "name": "OpenCV" }
      ]
    },
    {
      "title": "Hack the Future 1st Place",
      "description": "REVO - Return Management System: AI-powered e-commerce return fraud detection using computer vision and pattern analysis. Achieved 76% reduction in wardrobing losses.",
      "technologies": [
        { "icon": "nextjs-plain", "name": "Next.js" },
        { "icon": "python-plain", "name": "Python" },
        { "icon": "firebase-plain", "name": "Firebase" },
        { "icon": "react-plain", "name": "React" },
        { "icon": "opencv-original", "name": "Computer Vision" }
      ]
    },
    {
      "title": "Hack the 6ix 1st Place Game Track",
      "description": "Polaris - CV Fitness Game: Open-world collaborative fitness game using computer vision to track dual players from single camera. Custom 3D engine with sub-300ms latency.",
      "github": "https://github.com/lxyhan/polaris-fitness",
      "githubUsername": "lxyhan",
      "video": "https://example.com/polaris-demo",
      "technologies": [
        { "icon": "threejs-original", "name": "Three.js" },
        { "icon": "opencv-original", "name": "OpenCV" },
        { "icon": "python-plain", "name": "Python" },
        { "icon": "javascript-plain", "name": "JavaScript" },
        { "icon": "nextjs-plain", "name": "Next.js" }
      ]
    },
    {
      "title": "Brampton Tennis Queue",
      "description": "Municipal Deployment: City of Brampton's recreation team to launch this queuing app in local courts by Summer 2025! Real-world government contract.",
      "technologies": [
        { "icon": "nextjs-plain", "name": "Next.js" },
        { "icon": "react-plain", "name": "React" },
        { "icon": "typescript-plain", "name": "TypeScript" },
        { "icon": "nodejs-plain", "name": "Node.js" },
        { "icon": "tailwindcss-plain", "name": "Tailwind" }
      ]
    },
    {
      "title": "Harled Equipment Tracking",
      "description": "Military Contract: Military equipment tracking system with intuitive UX and strict security standards for defense applications.",
      "video": "https://example.com/harled-demo",
      "technologies": [
        { "icon": "figma-plain", "name": "Figma" },
        { "icon": "react-original", "name": "React" },
        { "icon": "django-plain", "name": "Django" },
        { "icon": "docker-plain", "name": "Docker" },
        { "icon": "kubernetes-plain", "name": "K8s" }
      ]
    },
    {
      "title": "SpurHacks",
      "description": "Conductor - AI Workflow Orchestrator: Revolutionary AI operator automating workflows across 15+ enterprise platforms with 3D avatar guidance and distributed microservices architecture.",
      "github": "https://github.com/lxyhan/conductor-spurhacks",
      "githubUsername": "lxyhan",
      "technologies": [
        { "icon": "nextjs-plain", "name": "Next.js" },
        { "icon": "python-plain", "name": "Python" },
        { "icon": "threejs-original", "name": "Three.js" },
        { "icon": "opencv-original", "name": "OpenCV" },
        { "icon": "nodejs-plain", "name": "Node.js" }
      ]
    },
    {
      "title": "NewHacks Winning Project",
      "description": "Close to Home: Heatmaps and interactive disaster zone mapping with real-time emergency response coordination and community safety features.",
      "github": "https://github.com/lxyhan/Close-to-Home",
      "githubUsername": "lxyhan",
      "technologies": [
        { "icon": "svelte-plain", "name": "Svelte" },
        { "icon": "python-plain", "name": "Python" },
        { "icon": "flask-plain", "name": "Flask" },
        { "icon": "mongodb-plain", "name": "MongoDB" },
        { "icon": "nextjs-plain", "name": "Next.js" }
      ]
    },
    {
      "title": "Markyt",
      "description": "E-commerce Platform: Advanced payment processing and real-time inventory management using modern web technologies with full-stack architecture.",
      "github": "https://github.com/lxyhan/markyt-development",
      "githubUsername": "lxyhan",
      "technologies": [
        { "icon": "svelte-plain", "name": "Svelte" },
        { "icon": "firebase-plain", "name": "Firebase" },
        { "icon": "javascript-plain", "name": "Javascript" },
        { "icon": "tailwindcss-plain", "name": "Tailwind" },
        { "icon": "postgresql-plain", "name": "PostgreSQL" }
      ]
    },
    {
      "title": "SpendSmart",
      "description": "CSC207 Project: AI powered finance management app for students, generating analytics on monthly spending patterns and budget optimization.",
      "github": "https://github.com/CSC207-NueralNova/group-project",
      "technologies": [
        { "icon": "svelte-plain", "name": "Svelte" },
        { "icon": "firebase-plain", "name": "Firebase" },
        { "icon": "java-plain", "name": "Java" },
        { "icon": "spring-plain", "name": "Spring Boot" },
        { "icon": "tailwindcss-plain", "name": "Tailwind" }
      ]
    }
  ];

  return (
    <section className="w-full h-full flex flex-col">
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
      
      <div className="flex-shrink-0 mb-4">
        <h2 className="text-lg font-medium text-gray-900 mb-2">Featured Projects</h2>
        <p className="text-sm text-gray-600">My area of expertise is in backend web programming. I am also highly experienced
            with modern frontend design and performance optimization tools and protocols.
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
        <div className="divide-y divide-gray-100">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;