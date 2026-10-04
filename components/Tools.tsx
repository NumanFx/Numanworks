
import React from 'react';
import GlassmorphicCard from './GlassmorphicCard';
import { AfterEffectsIcon, PremiereProIcon, IllustratorIcon, CapCutIcon, CanvaIcon } from './Icons';

const tools = [
  { name: 'AFTER EFFECTS', icon: <AfterEffectsIcon /> },
  { name: 'PREMIERE PRO', icon: <PremiereProIcon /> },
  { name: 'ILLUSTRATOR', icon: <IllustratorIcon /> },
  { name: 'CAPCUT', icon: <CapCutIcon /> },
  { name: 'CANVA', icon: <CanvaIcon /> },
];

const Tools: React.FC = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
      <div className="md:col-span-1 text-center md:text-left scroll-animate">
        <h2 className="text-4xl lg:text-5xl font-bold">
          Editing &<br />Creative<br />Tools:
        </h2>
      </div>
      <div className="md:col-span-2 scroll-animate" style={{ transitionDelay: '150ms' }}>
        <GlassmorphicCard>
          <div className="space-y-6">
            {tools.map((tool, index) => (
              <div key={tool.name} className="flex items-center space-x-4 scroll-animate" style={{ transitionDelay: `${100 * index}ms`}}>
                {tool.icon}
                <span className="text-xl font-semibold tracking-wider text-gray-700 dark:text-white/90">{tool.name}</span>
              </div>
            ))}
          </div>
        </GlassmorphicCard>
      </div>
    </section>
  );
};

export default Tools;