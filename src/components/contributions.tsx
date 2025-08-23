import React, { useEffect, useState } from 'react';

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface Week {
  contributionDays: ContributionDay[];
}

interface ContributionCalendar {
  totalContributions: number;
  weeks: Week[];
}

interface ContributionsCollection {
  contributionCalendar: ContributionCalendar;
}

interface User {
  contributionsCollection: ContributionsCollection;
}

interface GraphQLResponse {
  data: {
    user: User;
  };
}

const ContributionGraph: React.FC = () => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      const query = `
        query {
          user(login: "lxyhan") {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `;

      try {
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        if (!token) throw new Error('GitHub token not found');
        
        const response = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const data: GraphQLResponse = await response.json();
        const contributionDays = data.data.user.contributionsCollection
          .contributionCalendar.weeks
          .flatMap(week => week.contributionDays);
          
        // Show the full year instead of just 7 months
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        const filteredContributions = contributionDays.filter(
          day => new Date(day.date) >= oneYearAgo
        );
          
        setContributions(filteredContributions);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
        console.error('Error fetching contributions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  const getContributionColor = (count: number): string => {
    if (count === 0) return 'bg-gray-100';
    if (count <= 2) return 'bg-green-200';
    if (count <= 5) return 'bg-green-300';
    if (count <= 10) return 'bg-green-500';
    return 'bg-green-700';
  };

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) return <div className="w-full animate-pulse h-24 bg-gray-50 rounded" />;
  if (error) return <div className="w-full text-xs text-gray-500">Unable to load GitHub activity</div>;

  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  const totalContributions = contributions.reduce((sum, day) => sum + day.contributionCount, 0);

  return (
    <div className="w-full space-y-2">
      <div className="text-xs text-gray-600 font-serif">
        {totalContributions} contributions in the last year
      </div>
      
      <div className="w-full">
        <div className="grid gap-[1px]" style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}>
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-rows-7 gap-[1px]">
              {week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`w-full aspect-square rounded-[1px] ${getContributionColor(day.contributionCount)} transition-colors cursor-pointer`}
                  title={`${day.contributionCount} contributions on ${formatDate(day.date)}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono">
        <span>1 year ago</span>
        <div className="flex items-center gap-1">
          <span>Less</span>
          <div className="flex gap-[1px]">
            <div className="w-2.5 h-2.5 bg-gray-100 rounded-[1px]" />
            <div className="w-2.5 h-2.5 bg-green-200 rounded-[1px]" />
            <div className="w-2.5 h-2.5 bg-green-300 rounded-[1px]" />
            <div className="w-2.5 h-2.5 bg-green-500 rounded-[1px]" />
            <div className="w-2.5 h-2.5 bg-green-700 rounded-[1px]" />
          </div>
          <span>More</span>
        </div>
        <span>Today</span>
      </div>
    </div>
  );
};

export default ContributionGraph;