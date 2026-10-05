import React from 'react';
import AutoPlayVideoCard from './AutoPlayVideoCard';

const Header: React.FC = () => {
  const videoUrl = 'https://vimeo.com/1136264632';
  const thumbnailUrl = '/thumbnails/header.png';

  return (
    <section className="min-h-[60vh] flex items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight scroll-animate">
            I'm Numan
          </h1>
          <h2 className="text-2xl lg:text-3xl font-medium text-gray-600 dark:text-white/80 scroll-animate" style={{ transitionDelay: '150ms' }}>
            A Video Editor & Motion Designer with 3+ years of experience.
          </h2>
          <p className="text-lg text-gray-500 dark:text-white/60 scroll-animate" style={{ transitionDelay: '300ms' }}>
            From snappy edits to smooth motion graphics, I craft visuals that speak louder than words. Whether it's a reel, ad, or explainer, I turn ideas into eye-catching content that moves minds.
          </p>
        </div>

        <div className="relative flex justify-center items-center h-full scroll-animate" style={{ transitionDelay: '400ms' }}>
          <style>
            {`
              @keyframes float {
                  0% { transform: translateY(0px); }
                  50% { transform: translateY(-10px); }
                  100% { transform: translateY(0px); }
              }
              .animate-float {
                  animation: float 6s ease-in-out infinite;
              }
            `}
          </style>

          {/* Hero Video Card - Shows thumbnail for 2s, then autoplays inline without popup */}
          <div className="relative group w-56 sm:w-64 aspect-[9/16] rounded-3xl p-1 bg-gradient-to-tr from-cyan-500/40 via-blue-500/30 to-purple-500/40 shadow-2xl z-10 animate-float backdrop-blur-md">
            <AutoPlayVideoCard
              videoUrl={videoUrl}
              thumbnail={thumbnailUrl}
              aspectRatioClass="aspect-[9/16]"
              delayMs={2000}
              eager={true}
              className="w-full h-full rounded-[22px]"
            />
            <div className="absolute inset-0 rounded-3xl pointer-events-none ring-1 ring-inset ring-white/20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
