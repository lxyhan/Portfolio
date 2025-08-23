import React from 'react';
import { Github, Video, Image, ExternalLink, Award, Code } from 'lucide-react';

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
  image?: string;
  devpost?: string;
  website?: string;
  award?: string;
  openSource?: boolean;
}

interface ProjectCardProps {
  project: Project;
}

const TechIcons: React.FC<{ technologies: Technology[] }> = ({ technologies }) => (
  <div className="flex flex-wrap gap-1">
    {technologies.map((tech, i) => (
      <i
        key={i}
        className={`devicon-${tech.icon} colored text-xs`}
        title={tech.name}
      />
    ))}
  </div>
);

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <div className="group py-2.5 border-b border-gray-100 last:border-b-0">
    <div className="flex gap-3">
      {/* Left side - Video/Media (35% width) */}
      <div className="flex-shrink-0 w-[35%] max-w-[140px] relative">
        {/* Award ribbon */}
        {project.award && (
          <div className="absolute -top-1 -left-1 z-10">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-2 py-0.5 text-[9px] font-bold rounded-br-lg rounded-tl-lg shadow-sm flex items-center gap-1">
              <Award className="w-2 h-2" />
              {project.award}
            </div>
          </div>
        )}
        
        {/* Open Source ribbon */}
        {project.openSource && !project.award && (
          <div className="absolute -top-1 -left-1 z-10">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-0.5 text-[9px] font-bold rounded-br-lg rounded-tl-lg shadow-sm flex items-center gap-1">
              <Code className="w-2 h-2" />
              Open Source
            </div>
          </div>
        )}
        
        {project.video ? (
          <a
            href={project.video}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full aspect-video bg-gray-900 rounded-lg overflow-hidden group/video hover:scale-[1.02] transition-transform cursor-pointer relative"
          >
            <img 
              src={`https://img.youtube.com/vi/${project.video.includes('youtu.be/') ? project.video.split('youtu.be/')[1] : project.video.split('v=')[1]?.split('&')[0]}/maxresdefault.jpg`}
              alt={`${project.title} video thumbnail`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://img.youtube.com/vi/${project.video?.includes('youtu.be/') ? project.video.split('youtu.be/')[1] : project.video?.split('v=')[1]?.split('&')[0] ?? ''}/hqdefault.jpg`;
              }}
            />
            <div className="absolute inset-0 bg-black/20 group-hover/video:bg-black/10 transition-colors flex items-center justify-center">
              <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1 drop-shadow-lg"></div>
            </div>
            <div className="absolute top-1 right-1 text-[9px] font-bold text-white bg-black/70 px-1.5 py-0.5 rounded text-center leading-none">HD</div>
          </a>
        ) : project.image ? (
          <div className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden group/image hover:scale-[1.02] transition-transform">
            <img 
              src={project.image}
              alt={`${project.title} screenshot`}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
              <Image className="w-6 h-6 text-gray-500" />
            </div>
          </div>
        )}
      </div>

      {/* Right side - Content (65% width) */}
      <div className="flex-1 min-w-0 space-y-1">
        {/* Title row with tech icons */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5">
            {project.icon && (
              <img 
                src={project.icon} 
                alt={`${project.title} logo`} 
                className="w-3.5 h-3.5 object-contain flex-shrink-0"
              />
            )}
            <h3 className="text-xs sm:text-sm font-medium text-gray-900 leading-tight font-serif">
              {project.title}
            </h3>
          </div>
          <TechIcons technologies={project.technologies} />
        </div>
        
        {/* Description - limited to 2 rows */}
        <p className="text-xs text-gray-600 leading-snug line-clamp-2 font-serif">
          {project.description}
        </p>
        
        {/* Links on 3rd row */}
        <div className="flex items-center gap-3 -mt-0.5">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-gray-700 transition-colors group/link font-serif"
            >
              <Github className="w-2.5 h-2.5" />
              <span className="group-hover/link:underline">Source</span>
            </a>
          )}
          {project.video && (
            <a
              href={project.video}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-gray-700 transition-colors group/link font-serif"
            >
              <Video className="w-2.5 h-2.5" />
              <span className="group-hover/link:underline">Demo</span>
            </a>
          )}
          {project.devpost && (
            <a
              href={project.devpost}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-gray-700 transition-colors group/link font-serif"
            >
              <ExternalLink className="w-2.5 h-2.5" />
              <span className="group-hover/link:underline">Devpost</span>
            </a>
          )}
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-gray-700 transition-colors group/link font-serif"
            >
              <ExternalLink className="w-2.5 h-2.5" />
              <span className="group-hover/link:underline">Live</span>
            </a>
          )}
        </div>
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
      "title": "1st Place Overall, UofTHacks 12",
      "description": "Persona - AI Language Tutor: Real-time AI language learning assistant combining computer vision, 3D animation, and natural conversation for personalized tutoring.",
      "github": "https://github.com/lxyhan/Persona-UofT-Hacks-12",
      "githubUsername": "lxyhan",
      "video": "https://youtu.be/i0L6Ytlljoc",
      "devpost": "https://dorahacks.io/buidl/21736",
      "technologies": [
        { "icon": "react-plain", "name": "React" },
        { "icon": "tensorflow-original", "name": "TensorFlow" },
        { "icon": "pytorch-original", "name": "PyTorch" },
        { "icon": "threejs-original", "name": "Three.js" },
        { "icon": "opencv-original", "name": "OpenCV" }
      ]
    },
    {
      "title": "1st Place Overall, Google x Hack the Future",
      "description": "REVO - Return Management System: AI-powered e-commerce return fraud detection using computer vision and pattern analysis. Achieved 76% reduction in wardrobing losses.",
      "github": "https://github.com/lxyhan/Google-x-Hack-The-Future",
      "githubUsername": "lxyhan",
      "video": "https://youtu.be/IwHUTAiYlBk",
      "devpost": "https://devpost.com/software/revo",
      "technologies": [
        { "icon": "nextjs-plain", "name": "Next.js" },
        { "icon": "python-plain", "name": "Python" },
        { "icon": "firebase-plain", "name": "Firebase" },
        { "icon": "react-plain", "name": "React" },
        { "icon": "opencv-original", "name": "Computer Vision" }
      ]
    },
    {
      "title": "1st Place Game Track - Hack the 6ix",
      "description": "Polaris - CV Fitness Game: Open-world collaborative fitness game using computer vision to track dual players from single camera. Custom 3D engine with sub-300ms latency.",
      "github": "https://github.com/qiuethan/Polaris/tree/main",
      "githubUsername": "qiuethan",
      "video": "https://youtu.be/PGPgzu2f-0Y",
      "devpost": "https://devpost.com/software/polaris-vlp1wm",
      "technologies": [
        { "icon": "threejs-original", "name": "Three.js" },
        { "icon": "opencv-original", "name": "OpenCV" },
        { "icon": "python-plain", "name": "Python" },
        { "icon": "javascript-plain", "name": "JavaScript" },
        { "icon": "nextjs-plain", "name": "Next.js" }
      ]
    },
    {
      "title": "1st Place Natural Disasters Track - NewHacks",
      "description": "Close to Home: Heatmaps and interactive disaster zone mapping with real-time emergency response coordination and community safety features.",
      "github": "https://github.com/lxyhan/Close-to-Home",
      "githubUsername": "lxyhan",
      "devpost": "https://devpost.com/software/close-to-home",
      "image": "/projects/newhacks-thumbnail.png",
      "technologies": [
        { "icon": "svelte-plain", "name": "Svelte" },
        { "icon": "python-plain", "name": "Python" },
        { "icon": "flask-plain", "name": "Flask" },
        { "icon": "mongodb-plain", "name": "MongoDB" },
        { "icon": "nextjs-plain", "name": "Next.js" }
      ]
    },
    {
      "title": "SpurHacks 2025",
      "description": "Conductor - AI Workflow Orchestrator: Revolutionary AI operator automating workflows across 15+ enterprise platforms with 3D avatar guidance and distributed microservices architecture.",
      "github": "https://github.com/lxyhan/Spurhacks-2025",
      "githubUsername": "lxyhan",
      "video": "https://youtu.be/V2578vWWx10",
      "devpost": "https://devpost.com/software/conductor-65x9i7",
      "technologies": [
        { "icon": "nextjs-plain", "name": "Next.js" },
        { "icon": "python-plain", "name": "Python" },
        { "icon": "threejs-original", "name": "Three.js" },
        { "icon": "opencv-original", "name": "OpenCV" },
        { "icon": "nodejs-plain", "name": "Node.js" }
      ]
    },
    {
      "title": "PythonTA - Open Source Static Analysis Tool",
      "description": "Production static analysis tool serving 1500+ UofT students. Added new checkers and overhauled the UI for better code quality feedback and educational insights.",
      "github": "https://github.com/pyta-uoft/pyta",
      "githubUsername": "pyta-uoft",
      "image": "/projects/pythonta-thumbnail.png",
      "website": "https://www.cs.toronto.edu/~david/pyta/",
      "openSource": false,
      "technologies": [
        { "icon": "python-plain", "name": "Python" },
        { "icon": "javascript-plain", "name": "JavaScript" },
        { "icon": "html5-plain", "name": "HTML" },
        { "icon": "css3-plain", "name": "CSS" },
        { "icon": "django-plain", "name": "Django" }
      ]
    },
    {
      "title": "Brampton Tennis Queue",
      "description": "Municipal Deployment: City of Brampton's recreation team to launch this queuing app in local courts by Summer 2025! Real-world government contract.",
      "openSource": false,
      "image": '/projects/btq-thumbnail.HEIC',
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
      "description": "Military equipment tracking system with intuitive UX for defense applications.",
      "video": 'https://youtu.be/PB_Fpdsk2N0',
      "technologies": [
        { "icon": "figma-plain", "name": "Figma" },
        { "icon": "react-original", "name": "React" },
        { "icon": "django-plain", "name": "Django" },
        { "icon": "docker-plain", "name": "Docker" },
        { "icon": "kubernetes-plain", "name": "K8s" }
      ]
    },
    {
      "title": "Markyt",
      "description": "E-commerce Platform: Advanced payment processing and real-time inventory management using modern web technologies with full-stack architecture.",
      "github": "https://github.com/lxyhan/markyt-development",
      "image": '/projects/markyt-thumbnail.png',
      "openSource": false,
      "githubUsername": "lxyhan",
      "technologies": [
        { "icon": "svelte-plain", "name": "Svelte" },
        { "icon": "firebase-plain", "name": "Firebase" },
        { "icon": "javascript-plain", "name": "Javascript" },
        { "icon": "tailwindcss-plain", "name": "Tailwind" },
        { "icon": "postgresql-plain", "name": "PostgreSQL" }
      ]
    }
  ];

  return (
    <section className="w-full h-full flex flex-col">
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
      
      <div className="flex-shrink-0 mb-2">
        <h1 className="text-lg font-large text-gray-900 mb-1 font-serif">Featured Projects</h1>
        <p className="text-sm text-gray-600 font-serif">My area of expertise is in backend web programming. I am also highly experienced
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