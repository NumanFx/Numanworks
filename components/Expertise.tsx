import React from 'react';
import { expertiseData } from '../constants';

const Expertise: React.FC = () => {
  return (
    <section id="expertise" className="py-12 scroll-animate">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-500 uppercase tracking-widest mb-2">
            <span>DISCIPLINES & EXPERTISE</span>
            <span>·</span>
            <span>STUDIO POST-PRODUCTION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white">
            Technical Capabilities
          </h2>
        </div>
        <p className="text-sm text-gray-500 dark:text-zinc-400 max-w-md">
          A disciplined end-to-end post-production workflow designed for narrative clarity, visceral pacing, and maximum audience engagement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {expertiseData.map((item, index) => (
          <div
            key={item.title}
            className="p-6 sm:p-8 rounded-2xl bg-white/70 dark:bg-[#0c0c11]/80 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-black/20 dark:hover:border-white/20 group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-amber-500 dark:text-amber-400">
                0{index + 1} //
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-gray-600 dark:text-zinc-400">
                {item.tag}
              </span>
            </div>

            <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-2 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
              {item.title}
            </h3>

            <p className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Expertise;
