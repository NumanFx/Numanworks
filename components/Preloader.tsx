import React from 'react';

const Preloader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[#07070a] flex flex-col items-center justify-center z-50 p-4 text-white">
      <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-3 tracking-widest uppercase">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
        <span>INITIALIZING STUDIO REELS</span>
      </div>
      <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white mb-2">
        NUMAN PATEL
      </h1>
      <div className="text-xs font-mono text-zinc-500 tracking-wider">
        4K DCI · 60 FPS · EDITORIAL SUITE
      </div>
    </div>
  );
};

export default Preloader;
