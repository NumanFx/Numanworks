import React from 'react';
import GlassmorphicCard from './GlassmorphicCard';
import { AfterEffectsIcon, PremiereProIcon, IllustratorIcon, CapCutIcon, CanvaIcon } from './Icons';

const tools = [
  { name: 'After Effects', icon: <AfterEffectsIcon /> },
  { name: 'Premiere Pro', icon: <PremiereProIcon /> },
  { name: 'Illustrator', icon: <IllustratorIcon /> },
  { name: 'CapCut', icon: <CapCutIcon /> },
  { name: 'Canva', icon: <CanvaIcon /> },
];

const Tools: React.FC = () => {
  return (
    <section id="tools" className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-center scroll-animate">Tools I Use</h2>
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
        {tools.map((tool, index) => (
          <GlassmorphicCard
            key={tool.name}
            className="flex flex-col items-center justify-center p-6 w-32 h-32 sm:w-36 sm:h-36 scroll-animate hover:scale-105 transition-transform duration-300"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="w-12 h-12 mb-3 flex items-center justify-center">
              {tool.icon}
            </div>
            <span className="text-sm font-medium text-center">{tool.name}</span>
          </GlassmorphicCard>
        ))}
      </div>
    </section>
  );
};

export default Tools;
