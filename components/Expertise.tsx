
import React from 'react';
import GlassmorphicCard from './GlassmorphicCard';
import { expertiseData } from '../constants';

const Expertise: React.FC = () => {
  return (
    <section className="flex justify-center items-center">
      <div className="relative w-full max-w-4xl scroll-animate">
        <div className="absolute -inset-4 bg-gradient-to-r from-orange-600 to-yellow-400 rounded-3xl blur-xl opacity-20"></div>
        <GlassmorphicCard className="relative z-10">
          <h2 className="text-4xl font-bold mb-6 text-center">My Expertise</h2>
          <ul className="space-y-4 text-lg text-gray-600 dark:text-white/80">
            {expertiseData.map((item, index) => (
              <li key={index} className="flex items-start scroll-animate" style={{ transitionDelay: `${100 * (index + 1)}ms` }}>
                <span className="text-orange-500 dark:text-orange-400 mr-3 mt-1">◆</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </GlassmorphicCard>
      </div>
    </section>
  );
};

export default Expertise;