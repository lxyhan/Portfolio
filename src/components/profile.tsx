import React from 'react';
import { MapPin } from 'lucide-react';
import Image from 'next/image';

const LinkedInLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GitHubLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const DevpostLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M6.002 1.61L0 12.004L6.002 22.39h11.996L24 12.004L17.998 1.61zm1.06 4.39h9.878L19.785 12l-2.845 6H7.062L4.216 12Z"/>
  </svg>
);

const SoundCloudLogo = () => (
    <img 
    src="/soundcloud-icon.png" 
    alt="SoundCloud"
    className="w-5 h-5" 
    />
);

const StravaLogo = () => (
    <img 
    src="/strava-icon.svg" 
    alt="Strava"
    className="w-5 h-5" 
    />
);

const PersonalHeader = () => {
  const contactInfo = {
    email: "liangyu.han@mail.utoronto.ca",
    instagram: "@lxyhan"
  };

  const socialLinks = [
    { href: "https://www.linkedin.com/in/jameshan27/", icon: LinkedInLogo, label: "LinkedIn", color: "text-[#0A66C2] hover:text-[#004182]" },
    { href: "https://github.com/lxyhan", icon: GitHubLogo, label: "GitHub", color: "text-[#181717] hover:text-black" },
    { href: "https://devpost.com/hanlyu2005", icon: DevpostLogo, label: "Devpost", color: "text-[#003E54] hover:text-[#002937]" },
    { href: "https://soundcloud.com/jamie-han-71919096", icon: SoundCloudLogo, label: "SoundCloud", color: "text-black hover:text-[#E62E00]" },
    { href: "https://www.strava.com/athletes/134055041", icon: StravaLogo, label: "Strava", color: "text-[#FC4C02] hover:text-[#E34402]" }
  ];

  return (
    <section className="w-full">
      <div className="relative flex flex-col md:flex-row gap-6">
        {/* Decorative elements */}
        <div className="hidden md:block absolute -left-4 top-0 w-px h-16 bg-gradient-to-b from-gray-200 to-transparent" />
        <div className="hidden md:block absolute -left-4 top-0 w-1 h-1 bg-gray-200 rounded-full" />
        
        {/* Photo */}
        <div className="w-24 h-24 md:w-28 md:h-48 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 ring-1 ring-gray-100">
          <Image
            src="/profile-photo.jpg"
            alt="James Han"
            width={112}
            height={200}
            className="object-cover w-full h-full"
            quality={95}
          />
        </div>

        {/* Content */}
        <div className="space-y-3">
          {/* Name and title */}
          <div>
            <h1 className="font-mono text-xl md:text-2xl tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                James Han
              </span>
              <span className="block md:inline mt-1 md:mt-0 md:ml-3 font-sans text-sm text-gray-400 tracking-wider uppercase">
                CompSci & Economics @ UofT
              </span>
            </h1>
          </div>

          {/* Bio */}
          <p className="text-sm text-gray-500 leading-normal font-light max-w-xl">
            Exploring the convergence of{' '}
            <span className="font-medium text-gray-900">economics</span>,{' '}
            <span className="font-medium text-gray-900">statistics</span>, and{' '}
            <span className="font-medium text-gray-900">computer science</span>. 
            Experienced with {' '}
            <span className="font-medium text-gray-900">UX/UI design</span>
            {' '} and modern {' '}
            <span className="font-medium text-gray-900">web programming paradigms</span>.
            I enjoy endurance running, strength training, climbing, and music production.
          </p>

          {/* Contact info */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="font-mono">{contactInfo.email}</div>
            <div className="h-4 w-px bg-gray-100" />
            <div className="font-mono">{contactInfo.instagram} on Instagram</div>
          </div>
            
          {/* Social links in a new row */}
          <div className="flex flex-wrap gap-3 mt-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`group flex items-center gap-1.5 transition-all duration-200 ${link.color}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <link.icon />
                <span className="text-xs font-medium">{link.label}</span>
              </a>
            ))}
          </div>

          {/* Location */}
          <div className="flex items-center text-xs text-gray-400">
            <MapPin className="w-3 h-3 mr-1 opacity-50" />
            <span>
              Trinity College, University of Toronto ·{' '}
              <span className="font-mono">M5S 1H3</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalHeader;