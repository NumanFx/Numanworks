import React, { useState, useEffect } from 'react';
import { featuredProjectImages } from '../constants';

const FeaturedProject: React.FC = () => {
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
    if (url.includes('youtube.com')) {
      return `${url}?autoplay=1&rel=0`;
    }
    if (url.includes('vimeo.com')) {
      const videoId = url.split('/').pop()?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`;
    }
    return `${url}?autoplay=1`;
  };


  const staticImage = featuredProjectImages.find(img => !img.isVideo);
  const videoImages = featuredProjectImages.filter(img => img.isVideo);

  return (
    <section className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-100 to-blue-50 dark:from-[#0a2033] dark:to-black overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
        <div className="lg:col-span-2 space-y-6 scroll-animate">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Featured Project:<br />Kangana Ranaut Event
          </h2>
          <ul className="space-y-4 text-lg text-gray-600 dark:text-white/80">
            <li className="flex items-start">
              <span className="text-cyan-500 dark:text-cyan-400 mr-4 mt-1.5">&#9679;</span>
              <span>
                <strong>Intro Typography Video:</strong> Designed a striking, cinematic typography video to introduce the event, setting the tone for the audience.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-500 dark:text-cyan-400 mr-4 mt-1.5">&#9679;</span>
              <span>
                <strong>Event Coverage:</strong> Edited engaging, dynamic footage to capture the key moments of the event.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-500 dark:text-cyan-400 mr-4 mt-1.5">&#9679;</span>
              <span>
                <strong>Creative Motion Graphics:</strong> Added unique motion graphics to enhance the storytelling and visuals, making every clip memorable.
              </span>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-3 space-y-6 scroll-animate" style={{ transitionDelay: '200ms' }}>
          {staticImage && (
            <div className="rounded-2xl overflow-hidden shadow-lg border border-black/10 dark:border-white/10">
              <img
                src={staticImage.src}
                alt={`Featured project image ${staticImage.id}`}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {videoImages.map((image) => (
              <div 
                key={image.id} 
                className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-video"
                onClick={() => image.videoUrl && setPlayingVideoUrl(image.videoUrl)}
              >
                <img
                  src={image.src}
                  alt={`Featured project video ${image.id}`}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors duration-300 group-hover:bg-black/10">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-7 h-7 md:w-8 md:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
       {playingVideoUrl && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setPlayingVideoUrl(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
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
    </section>
  );
};

export default FeaturedProject;