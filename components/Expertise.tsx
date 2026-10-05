import React from 'react';
import { expertiseData } from '../constants';
import GlassmorphicCard from './GlassmorphicCard';

const Expertise: React.FC = () => {
  return (
    <section id="expertise" className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-center scroll-animate">Expertise</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {expertiseData.map((item, index) => {
          const [title, description] = item.split(': ');
          return (
            <GlassmorphicCard key={index} className="scroll-animate" style={{ transitionDelay: `${index * 150}ms` }}>
              <h3 className="text-xl font-bold mb-2 text-orange-500">{title}</h3>
              <p className="text-gray-600 dark:text-white/70">{description}</p>
            </GlassmorphicCard>
          );
        })}
      </div>
    </section>
  );
};

export default Expertise;
