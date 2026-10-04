
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [playingVideoUrl, setPlayingVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPlayingVideoUrl(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const getEmbedUrl = (url: string | null): string => {
    if (!url) return '';
    if (url.includes('vimeo.com')) {
      const videoId = url.split('/').pop()?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`;
    }
    return `${url}?autoplay=1`;
  };

  const videoUrl = 'https://vimeo.com/1136264632';
  const thumbnailUrl = 'https://i.ibb.co/ymWVhWCx/Untitled-design.png';

  return (
    <>
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
            <div
              className="group relative overflow-hidden rounded-2xl cursor-pointer w-48 md:w-56 aspect-[9/16] shadow-2xl z-10 animate-float"
              onClick={() => setPlayingVideoUrl(videoUrl)}
            >
              <img
                src={thumbnailUrl}
                alt="Numan's Profile Video Thumbnail"
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 md:w-8 md:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {playingVideoUrl && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setPlayingVideoUrl(null)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="relative w-full max-w-sm aspect-[9/16] bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPlayingVideoUrl(null)}
              className="absolute -top-2 -right-2 text-white bg-black rounded-full h-8 w-8 flex items-center justify-center text-2xl z-20 leading-none"
              aria-label="Close video player"
            >
              &times;
            </button>
            <iframe
              src={getEmbedUrl(playingVideoUrl)}
              title="Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
