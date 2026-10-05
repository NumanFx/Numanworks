import React from 'react';
import { AfterEffectsIcon, PremiereProIcon, IllustratorIcon, CapCutIcon, CanvaIcon } from './Icons';

const tools = [
  {
    name: 'After Effects',
    role: 'Kinetic Motion & VFX',
    detail: 'Camera tracking, expression-based typography, screen replacements, and bespoke particle effects.',
    icon: <AfterEffectsIcon />,
    badge: 'Core VFX Suite',
  },
  {
    name: 'Premiere Pro',
    role: 'Master Editorial & Assembly',
    detail: 'Multi-cam synchronization, rhythm cutting, offline-to-online conforming, and project handoffs.',
    icon: <PremiereProIcon />,
    badge: 'Primary NLE',
  },
  {
    name: 'Adobe Illustrator',
    role: 'Vector & Graphic Assets',
    detail: 'Vector illustrations, logo cleanups, custom glyphs, and layered storyboard assets.',
    icon: <IllustratorIcon />,
    badge: 'Vector Design',
  },
  {
    name: 'CapCut Pro Desktop',
    role: 'High-Velocity Social Cuts',
    detail: 'Rapid trend formatting, dynamic auto-captions, vertical layout presets, and mobile sound bites.',
    icon: <CapCutIcon />,
    badge: 'Social Rapid Pro',
  },
  {
    name: 'Canva Pro',
    role: 'Brand Kits & Layouts',
    detail: 'Social thumbnail prototyping, client moodboards, and cross-platform promotional assets.',
    icon: <CanvaIcon />,
    badge: 'Prototyping',
  },
];

const Tools: React.FC = () => {
  return (
    <section id="tools" className="py-12 scroll-animate">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-500 uppercase tracking-widest mb-2">
            <span>STUDIO ARSENAL</span>
            <span>·</span>
            <span>INDUSTRY-STANDARD SOFTWARE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white">
            Editing & Creative Tools
          </h2>
        </div>
        <p className="text-sm text-gray-500 dark:text-zinc-400 max-w-md">
          Hardware-accelerated editing suite equipped for ProRes 422, RED RAW, and Sony S-Log3 native post workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="p-6 rounded-2xl bg-white/70 dark:bg-[#0c0c11]/80 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] shadow-[0_8px_25px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-amber-500/40 hover:-translate-y-0.5 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center p-2.5 border border-black/[0.06] dark:border-white/[0.08]">
                {tool.icon}
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-gray-600 dark:text-zinc-400">
                {tool.badge}
              </span>
            </div>

            <div className="text-xs font-mono text-amber-500 mb-1">
              {tool.role}
            </div>

            <h3 className="text-lg font-display font-bold text-gray-900 dark:text-white mb-2">
              {tool.name}
            </h3>

            <p className="text-xs text-gray-600 dark:text-zinc-400 leading-relaxed">
              {tool.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tools;
