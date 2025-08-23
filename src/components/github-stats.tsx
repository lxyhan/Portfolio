import React, { useState, useEffect } from 'react';
import { Github, GitBranch, Star, TrendingUp } from 'lucide-react';

interface GitHubProfile {
  login: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface Repository {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
  topics: string[];
}

interface GitHubStatsProps {
  username?: string;
  showProfile?: boolean;
  showTopRepos?: boolean;
  maxRepos?: number;
}

const GitHubStats: React.FC<GitHubStatsProps> = ({ 
  username = 'lxyhan',
  showProfile = true,
  showTopRepos = true,
  maxRepos = 4
}) => {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        
        // Fetch real data from GitHub API
        const profileResponse = await fetch(`https://api.github.com/users/${username}`);
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=${maxRepos}&type=public`);
        
        if (!profileResponse.ok || !reposResponse.ok) {
          if (profileResponse.status === 403 || reposResponse.status === 403) {
            throw new Error('GitHub API rate limit exceeded');
          }
          throw new Error(`GitHub API error: ${profileResponse.status}`);
        }
        
        const profileData = await profileResponse.json();
        const reposData = await reposResponse.json();
        
        // Filter out forked repos and get only original repos
        const originalRepos = reposData.filter((repo: { fork: boolean }) => !repo.fork);
        
        setProfile({
          login: profileData.login,
          name: profileData.name || profileData.login,
          bio: profileData.bio || '',
          public_repos: profileData.public_repos,
          followers: profileData.followers,
          following: profileData.following,
          created_at: profileData.created_at
        });
        
        setRepos(originalRepos.slice(0, maxRepos).map((repo: {
          name: string;
          description: string | null;
          stargazers_count: number;
          forks_count: number;
          language: string | null;
          html_url: string;
          topics: string[];
        }) => ({
          name: repo.name,
          description: repo.description || 'No description available',
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          language: repo.language || 'Unknown',
          html_url: repo.html_url,
          topics: repo.topics || []
        })));
        
        setError(null);
      } catch (err) {
        setError('Failed to load GitHub data');
        console.error('GitHub API error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
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
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Github className="w-4 h-4 text-gray-400" />
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="text-xs text-gray-500 flex items-center gap-1">
        <Github className="w-3 h-3" />
        GitHub data unavailable
      </div>
    );
  }

  const yearsActive = new Date().getFullYear() - new Date(profile.created_at).getFullYear();

  return (
    <div className="space-y-4">
      {showProfile && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Github className="w-4 h-4 text-gray-700" />
            <h3 className="text-sm font-medium text-gray-900 font-serif">GitHub Profile</h3>
            <div className="flex items-center gap-2 ml-auto">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" title="Live GitHub data"></div>
              <a 
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-gray-700 hover:underline font-mono"
              >
                @{username}
              </a>
            </div>
          </div>

          {/* Profile stats */}
          <div className="grid grid-cols-4 gap-2">
            <div className="text-center">
              <div className="text-sm font-bold text-gray-900 font-mono">{profile.public_repos}</div>
              <div className="text-[10px] text-gray-500 font-serif">Repos</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-gray-900 font-mono">{profile.followers}</div>
              <div className="text-[10px] text-gray-500 font-serif">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-gray-900 font-mono">{profile.following}</div>
              <div className="text-[10px] text-gray-500 font-serif">Following</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-gray-900 font-mono">{yearsActive}+</div>
              <div className="text-[10px] text-gray-500 font-serif">Years</div>
            </div>
          </div>
        </div>
      )}

      {showTopRepos && repos.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-medium text-gray-700 flex items-center gap-1 font-serif">
            <Star className="w-3 h-3" />
            Popular Repositories
          </h4>
          
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
              </a>
            ))}
          </div>
          
          <div className="text-center">
            <a
              href={`https://github.com/${username}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-gray-500 hover:text-gray-700 hover:underline font-serif inline-flex items-center gap-1"
            >
              View all repositories
              <TrendingUp className="w-2 h-2" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubStats;
