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
          
        const fourMonthsAgo = new Date();
        fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 7);
        const filteredContributions = contributionDays.filter(
          day => new Date(day.date) >= fourMonthsAgo
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
    if (count <= 3) return 'bg-green-200';
    if (count <= 6) return 'bg-green-400';
    if (count <= 9) return 'bg-green-600';
    return 'bg-green-800';
  };

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) return <div className="w-full animate-pulse h-32 bg-gray-100" />;
  if (error) return <div className="w-full text-red-500 text-sm">Failed to load contribution data</div>;

  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto px-0.5 py-0.5">
        <div className="w-full grid grid-flow-col auto-cols-fr gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`w-3 h-3 rounded-sm outline outline-1 outline-gray-200 ${getContributionColor(day.contributionCount)}`}
                  title={`${day.contributionCount} contributions on ${formatDate(day.date)}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex items-center text-xs text-gray-600 space-x-2">
        <span>Less</span>
        <div className="w-3 h-3 bg-gray-100 rounded-sm outline outline-1 outline-gray-200" />
        <div className="w-3 h-3 bg-green-200 rounded-sm outline outline-1 outline-gray-200" />
        <div className="w-3 h-3 bg-green-400 rounded-sm outline outline-1 outline-gray-200" />
        <div className="w-3 h-3 bg-green-600 rounded-sm outline outline-1 outline-gray-200" />
        <div className="w-3 h-3 bg-green-800 rounded-sm outline outline-1 outline-gray-200" />
        <span>More</span>
      </div>
    </div>
  );
};

export default ContributionGraph;