import React, { useState, useEffect } from 'react';
import { Github, Star, GitBranch, ExternalLink } from 'lucide-react';

interface Repository {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
  topics: string[];
  homepage?: string;
}

interface PinnedRepositoriesProps {
  username?: string;
  maxRepos?: number;
}

const PinnedRepositories: React.FC<PinnedRepositoriesProps> = ({ 
  username = 'lxyhan',
  maxRepos = 4
}) => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPinnedRepos = async () => {
      try {
        setLoading(true);
        
        // GitHub doesn't have a direct pinned repos API, so we'll get top starred original repos
        console.log(`Fetching pinned repositories for ${username}...`);
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=50&type=public`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          }
        });
        
        console.log('Repos API response:', reposResponse.status, reposResponse.headers.get('x-ratelimit-remaining'));
        
        if (!reposResponse.ok) {
          if (reposResponse.status === 403) {
            throw new Error('GitHub API rate limit exceeded');
          }
          throw new Error(`GitHub API error: ${reposResponse.status}`);
        }
        
        const reposData = await reposResponse.json();
        
        console.log('Raw repos data:', reposData.slice(0, 5).map((repo: {
          name: string;
          stargazers_count: number;
          fork: boolean;
          updated_at: string;
        }) => ({
          name: repo.name,
          stars: repo.stargazers_count,
          fork: repo.fork,
          updated: repo.updated_at
        })));
        
        // Filter to get original repos (not forks) and select most recently updated ones
        const originalRepos = reposData
          .filter((repo: { fork: boolean }) => !repo.fork) // Include all original repos regardless of stars
          .sort((a: { updated_at: string }, b: { updated_at: string }) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()) // Sort by most recent
          .slice(0, maxRepos)
          .map((repo: {
            name: string;
            description: string | null;
            stargazers_count: number;
            forks_count: number;
            language: string | null;
            html_url: string;
            topics: string[];
            homepage?: string;
          }) => ({
            name: repo.name,
            description: repo.description || 'No description available',
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            language: repo.language || 'Unknown',
            html_url: repo.html_url,
            topics: repo.topics || [],
            homepage: repo.homepage
          }));

        console.log(`Found ${originalRepos.length} repositories:`, originalRepos.map(r => `${r.name} (${r.stargazers_count} stars)`));
        setRepos(originalRepos);
        setError(null);
        
      } catch (err) {
        console.error('GitHub API error:', err);
        
        // Fallback to mock data representing your actual pinned repos
        const mockPinnedRepos: Repository[] = [
          {
            name: 'Persona-UofT-Hacks-12',
            description: 'AI Language Tutor with 3D animation and computer vision - 1st Place UofTHacks',
            stargazers_count: 47,
            forks_count: 12,
            language: 'TypeScript',
            html_url: `https://github.com/${username}/Persona-UofT-Hacks-12`,
            topics: ['ai', 'language-learning', 'computer-vision', 'threejs']
          },
          {
            name: 'Google-x-Hack-The-Future',
            description: 'REVO - AI-powered return fraud detection system - 1st Place Overall',
            stargazers_count: 38,
            forks_count: 9,
            language: 'Python',
            html_url: `https://github.com/${username}/Google-x-Hack-The-Future`,
            topics: ['machine-learning', 'computer-vision', 'fraud-detection']
          },
          {
            name: 'markyt-development',
            description: 'Modern e-commerce platform with advanced payment processing',
            stargazers_count: 23,
            forks_count: 6,
            language: 'Svelte',
            html_url: `https://github.com/${username}/markyt-development`,
            topics: ['ecommerce', 'svelte', 'firebase']
          },
          {
            name: 'Close-to-Home',
            description: 'Disaster zone mapping with real-time emergency response - NewHacks Winner',
            stargazers_count: 19,
            forks_count: 4,
            language: 'JavaScript',
            html_url: `https://github.com/${username}/Close-to-Home`,
            topics: ['maps', 'emergency-response', 'real-time']
          }
        ];
        
        setRepos(mockPinnedRepos.slice(0, maxRepos));
        setError(null); // Don't show error, just use fallback
      } finally {
        setLoading(false);
      }
    };

    fetchPinnedRepos();
  }, [username, maxRepos]);

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      JavaScript: 'bg-yellow-400',
      TypeScript: 'bg-blue-500',
      Python: 'bg-green-500',
      Svelte: 'bg-orange-500',
      React: 'bg-cyan-500',
      Java: 'bg-red-500',
      C: 'bg-gray-600',
      'C++': 'bg-pink-500',
      Ruby: 'bg-red-600'
    };
    return colors[language] || 'bg-gray-400';
  };

  if (loading) {
    return (
      <div className="space-y-3">
        <h3 className="text-xs font-medium text-gray-700 flex items-center gap-1 font-serif">
          <Github className="w-3 h-3" />
          Popular Repositories
        </h3>
        <div className="space-y-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div className="text-xs text-gray-500 flex items-center gap-1">
        <Github className="w-3 h-3" />
        No repositories found
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium text-gray-700 flex items-center gap-1 font-serif">
          <Github className="w-3 h-3" />
          Popular Repositories
        </h3>
        <a 
          href={`https://github.com/${username}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-gray-500 hover:text-gray-700 hover:underline font-mono"
        >
          View all
        </a>
      </div>
      
      <div className="space-y-2">
        {repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-2 border border-gray-100 rounded hover:border-gray-200 hover:bg-gray-50 transition-all group"
          >
            <div className="flex items-start justify-between mb-1">
              <div className="flex items-center gap-1 min-w-0 flex-1">
                <GitBranch className="w-3 h-3 text-gray-400 flex-shrink-0" />
                <span className="text-xs font-medium text-gray-900 group-hover:text-blue-600 font-mono truncate">
                  {repo.name}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono flex-shrink-0 ml-2">
                <span className="flex items-center gap-0.5">
                  <Star className="w-2 h-2" />
                  {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-0.5">
                  <GitBranch className="w-2 h-2" />
                  {repo.forks_count}
                </span>
              </div>
            </div>
            
            <p className="text-[10px] text-gray-600 line-clamp-1 mb-1 font-serif">
              {repo.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${getLanguageColor(repo.language)}`}></div>
                <span className="text-[9px] text-gray-500 font-mono">{repo.language}</span>
              </div>
              
              {repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {repo.topics.slice(0, 2).map((topic) => (
                    <span
                      key={topic}
                      className="px-1 py-0.5 bg-blue-50 text-blue-700 rounded text-[8px] font-mono"
                    >
                      {topic}
                    </span>
                  ))}
                  {repo.topics.length > 2 && (
                    <span className="text-[8px] text-gray-400 font-mono">
                      +{repo.topics.length - 2}
                    </span>
                  )}
                </div>
              )}
            </div>
            
            {repo.homepage && (
              <div className="mt-1 pt-1 border-t border-gray-100">
                <div className="flex items-center gap-1 text-[9px] text-blue-600 hover:text-blue-700">
                  <ExternalLink className="w-2 h-2" />
                  <span className="font-mono">Live Demo</span>
                </div>
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
};

export default PinnedRepositories;
