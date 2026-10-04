import React, { useState, useEffect } from 'react';

interface Item {
  id: number;
  title?: string;
  thumbnail: string;
  videoUrl?: string;
}

interface PortfolioGridProps {
  title: string;
  items: Item[];
  isGraphicDesign?: boolean;
}

const PortfolioGrid: React.FC<PortfolioGridProps> = ({ title, items, isGraphicDesign = false }) => {
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

  let gridClasses = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
  let itemClasses = '';

  if (title === 'Short-Form Videos') {
    gridClasses = 'grid-cols-2 md:grid-cols-3';
    itemClasses = 'aspect-[9/16]';
  } else if (title === 'Long-Form Videos') {
    itemClasses = 'aspect-[16/9]';
  } else if (isGraphicDesign) {
    gridClasses = 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4';
    itemClasses = 'aspect-square';
  }

  return (
    <section>
      <h2 className="text-4xl lg:text-5xl font-bold mb-8 scroll-animate">{title}</h2>
      <div className={`grid gap-6 ${gridClasses}`}>
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`group relative overflow-hidden rounded-2xl cursor-pointer scroll-animate ${itemClasses}`}
            onClick={() => item.videoUrl && setPlayingVideoUrl(item.videoUrl)}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <img
              src={item.thumbnail}
              alt={item.title || `Portfolio item ${item.id}`}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>

            {item.videoUrl && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 md:w-8 md:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
            )}

            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-2xl"></div>
            {item.title && (
              <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/50 to-transparent w-full">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              </div>
            )}
          </div>
        ))}
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

export default PortfolioGrid;