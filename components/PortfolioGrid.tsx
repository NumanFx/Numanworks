import React, { useState } from 'react';
import InlineVideoCard from './InlineVideoCard';
import { cleanMediaUrl } from '../utils/video';

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  let gridClasses = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
  let aspectRatioClass = 'aspect-video';

  if (title === 'Short-Form Videos') {
    gridClasses = 'grid-cols-2 md:grid-cols-3';
    aspectRatioClass = 'aspect-[9/16]';
  } else if (title === 'Long-Form Videos') {
    aspectRatioClass = 'aspect-[16/9]';
  } else if (isGraphicDesign) {
    gridClasses = 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4';
    aspectRatioClass = 'aspect-square';
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-8 scroll-animate">
        <h2 className="text-4xl lg:text-5xl font-bold">{title}</h2>
      </div>

      <div className={`grid gap-6 ${gridClasses}`}>
        {items.map((item, index) => {
          // If it's a video, render the high-performance inline auto-playing card (no popup!)
          if (item.videoUrl) {
            return (
              <InlineVideoCard
                key={item.id}
                id={item.id}
                thumbnail={item.thumbnail}
                videoUrl={item.videoUrl}
                title={item.title}
                aspectRatioClass={aspectRatioClass}
                previewDurationMs={2000} // Shows thumbnail for 2 seconds (1st 1-3 sec), then auto-plays inline!
                index={index}
              />
            );
          }

          // If graphic design static image
          return (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer scroll-animate bg-neutral-900 border border-black/10 dark:border-white/10 shadow-lg ${aspectRatioClass}`}
              style={{ transitionDelay: `${index * 80}ms` }}
              onClick={() => setSelectedImage(cleanMediaUrl(item.thumbnail))}
            >
              <img
                src={cleanMediaUrl(item.thumbnail)}
                alt={item.title || `Graphic design ${item.id}`}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300"></div>

              {item.title && (
                <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/60 to-transparent w-full">
                  <h3 className="text-lg font-semibold text-white drop-shadow">{item.title}</h3>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lightbox for static graphic design images only (not video) */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-orange-400 text-3xl font-light"
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Graphic Design Preview"
              className="max-h-[85vh] w-auto rounded-lg shadow-2xl object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioGrid;
