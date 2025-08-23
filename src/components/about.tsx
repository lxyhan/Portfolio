import React from 'react';
import GitHubActivitySummary from './github-activity-summary';
import ContributionGraph from './contributions';

export default function About() {
  return (
    <div className="font-serif max-w-3xl">
      <h1 className="text-2xl font-medium mb-6 text-gray-900 border-b border-gray-200 pb-2">About</h1>
      <div className="space-y-5">
        <p className="text-gray-700 leading-relaxed text-sm">
          Computer Science at University of Toronto. Amateur triathlete. SWE at Canada Life.
        </p>
        
        <div>
          <h2 className="text-base font-medium text-gray-900 mb-3 tracking-wide">What I&apos;ve been up to</h2>
          <div className="space-y-1.5 text-sm text-gray-600 leading-relaxed">
            <div className="flex items-start gap-2">
              <span className="text-gray-400 font-mono text-xs mt-0.5">{'>'}</span>
              <span>Won <a href="#" className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600">UofTHacks</a> with Persona, a language learning platform</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400 font-mono text-xs mt-0.5">{'>'}</span>
              <span>1st at <a href="#" className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600">Google x Hack the Future</a> with Revo, reduced return fraud by 57%</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400 font-mono text-xs mt-0.5">{'>'}</span>
              <span>1st at <a href="#" className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600">Hack the 6ix</a> with Polaris, fitness app with computer vision</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400 font-mono text-xs mt-0.5">{'>'}</span>
              <span>VP at <a href="#" className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600">UofT Blueprint</a>, organizing 4 production projects for Mozilla and City Services</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400 font-mono text-xs mt-0.5">{'>'}</span>
              <span>Director at <a href="#" className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600">UofT AI</a>, leading education for 2300+ students</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400 font-mono text-xs mt-0.5">{'>'}</span>
              <span><a href="#" className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600">Anthropic Builder Ambassador</a></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400 font-mono text-xs mt-0.5">{'>'}</span>
              <span>Building <a href="#" className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600">MarkUs</a> and <a href="#" className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600">PythonTA</a> with Prof. David Liu (used by 3300+ students)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400 font-mono text-xs mt-0.5">{'>'}</span>
              <span>Built Next.js app for <a href="#" className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600">City of Brampton</a> at Blueprint</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400 font-mono text-xs mt-0.5">{'>'}</span>
              <span>Finished <a href="#" className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600">Ironman 70.3 Muskoka</a>, led UofT Run Club</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400 font-mono text-xs mt-0.5">{'>'}</span>
              <span>Managing $130K budget as Trinity College Orientation Coordinator</span>
            </div>
            <GitHubActivitySummary username="lxyhan" />
          </div>
        </div>
        
        <blockquote className="border-l-2 border-gray-300 pl-3 py-1 text-gray-600 italic text-sm">
          Always interested in building better systems for our lives—both technical and social. 
          Outside of code: bikepacking adventures, training for races, discovering new music, and getting through my reading pile.
        </blockquote>

        {/* GitHub Contributions Graph */}
        <div className="pt-4 border-t border-gray-200">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-900 font-serif">GitHub Activity</h3>
            <ContributionGraph />
          </div>
        </div>
      </div>
    </div>
  );
}
