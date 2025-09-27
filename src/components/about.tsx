import React from 'react';
import GitHubActivitySummary from './github-activity-summary';
import ContributionGraph from './contributions';

export default function About() {
  return (
    <div className="font-serif max-w-3xl">
      <h1 className="text-3xl font-medium mb-6 text-gray-900 border-b border-gray-200 pb-2">About</h1>
      <div className="space-y-5">
        
        <div className="space-y-6">
          {/* Software Work Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-3 tracking-wide">Current Software Work</h2>
            <div className="space-y-1.5 text-base text-gray-600 leading-relaxed">
              <div className="flex items-start gap-2">
                <span className="text-gray-400 font-mono text-sm mt-0.5">{'>'}</span>
                <span>Incoming SWE -> AI Team at TD</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400 font-mono text-sm mt-0.5">{'>'}</span>
                <span>SWE at Canada Life</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400 font-mono text-sm mt-0.5">{'>'}</span>
                <span>Building <a href="https://github.com/MarkUsProject/Markus" className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600">MarkUs</a> & <a href="https://github.com/pyta-uoft/pyta" className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600">PythonTA</a> with Prof. David Liu — open-source tools powering UofT and Waterloo&apos;s CS departments (used by 20,000+ students annually across CSC108, CSC110, CSC111, CSC148)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400 font-mono text-sm mt-0.5">{'>'}</span>
                <span><a href="#" className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600">Anthropic Builder Ambassador</a></span>
              </div>
            </div>
          </div>

          {/* Leadership Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-3 tracking-wide">Building Communities</h2>
            <div className="space-y-1.5 text-base text-gray-600 leading-relaxed">
              <div className="flex items-start gap-2">
                <span className="text-gray-400 font-mono text-sm mt-0.5">{'>'}</span>
                <span>VP at <a href="https://uoftblueprint.org/" className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600">UofT Blueprint</a>, organizing 4 production projects for Mozilla and City Services</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400 font-mono text-sm mt-0.5">{'>'}</span>
                <span>Director of Campus Strategy at <a href="https://www.uoft.ai/" className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600">UofT AI</a></span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400 font-mono text-sm mt-0.5">{'>'}</span>
                <span>Managing $130K budget as Trinity College Orientation Coordinator</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400 font-mono text-sm mt-0.5">{'>'}</span>
                <span>UofT Run Club Lead</span>
              </div>
            </div>
          </div>

          {/* Hackathons Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-3 tracking-wide"><a href="#" className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600">Hackathons and Case Competitions</a></h2>
            <div className="space-y-1.5 text-base text-gray-600 leading-relaxed">
              <div className="flex items-start gap-2">
                <span className="text-gray-400 font-mono text-sm mt-0.5">{'>'}</span>
                <span>2x Award Winner at <a href="https://devpost.com/software/orbit-59jths" className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600">Hack the North 2025</a> (Grok and Windsurf awards)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400 font-mono text-sm mt-0.5">{'>'}</span>
                <span>1st at <a href="https://dorahacks.io/buidl/21736" className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600">UofTHacks</a> with Persona, a language learning platform</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400 font-mono text-sm mt-0.5">{'>'}</span>
                <span>1st at <a href="https://devpost.com/software/close-to-home" className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600">NewHacks</a></span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400 font-mono text-sm mt-0.5">{'>'}</span>
                <span>1st at <a href="https://devpost.com/software/revo" className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600">Google x Hack the Future</a> with Revo, a return fraud detection system</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400 font-mono text-sm mt-0.5">{'>'}</span>
                <span>Best Game at <a href="https://devpost.com/software/polaris-vlp1wm" className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600">Hack the 6ix</a> with Polaris, fitness app with computer vision</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400 font-mono text-sm mt-0.5">{'>'}</span>
                <span>Finalist (top 7 teams) at <a href="#" className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600">AWS Cloud Case Competition</a></span>
              </div>
            </div>
          </div>

        {/* Personal Achievements */}
        <div>
        <h2 className="text-lg font-medium text-gray-900 mb-3 tracking-wide">Triathlon and Strength Training</h2>
        <div className="space-y-1.5 text-base text-gray-600 leading-relaxed">
            <div className="flex items-start gap-2">
            <span className="text-gray-400 font-mono text-xs mt-0.5">{'>'}</span>
            <span><a href="#" className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600">Ironman 70.3 Muskoka</a> July 2025</span>
            </div>
            <div className="flex items-start gap-2">
            <span className="text-gray-400 font-mono text-xs mt-0.5">{'>'}</span>
            <span><a href="#" className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600">Subaru Triathlon Series</a> May 2025</span>
            </div>
            <div className="flex items-start gap-2">
            <span className="text-gray-400 font-mono text-xs mt-0.5">{'>'}</span>
            <span><a href="#" className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600">Lake Erie Ultra 200</a> July 2025</span>
            </div>
            <div className="flex items-start gap-2">
            <span className="text-gray-400 font-mono text-xs mt-0.5">{'>'}</span>
            <span><a href="#" className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600">Toronto Spring Marathon</a> full (2025), half (2023, 2024)</span>
            </div>
            <div className="flex items-start gap-2">
            <span className="text-gray-400 font-mono text-xs mt-0.5">{'>'}</span>
            <span><a href="#" className="text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600">TCS Half Waterfront Marathon</a> 2024</span>
            </div>

        </div>
        </div>
    
        </div>
        
        <blockquote className="border-l-2 border-gray-300 pl-3 py-1 text-gray-600 italic text-base">
          I love building better systems for our lives—both technical and social. 
          Outside of code: long miles, heavy weights, and good music.
        </blockquote>

        {/* GitHub Contributions Graph */}
        <div className="pt-4 border-t border-gray-200">
          <div className="space-y-2">
            <h3 className="text-base font-medium text-gray-900 font-serif">GitHub Activity</h3>
            <ContributionGraph />
          </div>
        </div>
      </div>
    </div>
  );
}