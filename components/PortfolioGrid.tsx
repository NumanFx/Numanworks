import React from 'react';
import AutoPlayVideoCard from './AutoPlayVideoCard';

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
  let gridClasses = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
  let itemClasses = 'aspect-video';

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
        {items.map((item, index) => {
          const cleanThumbnail = item.thumbnail ? item.thumbnail.replace(/^#/, '') : '';

          if (item.videoUrl) {
            return (
              <div
                key={item.id}
                className="scroll-animate"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <AutoPlayVideoCard
                  videoUrl={item.videoUrl}
                  thumbnail={cleanThumbnail}
                  title={item.title}
                  aspectRatioClass={itemClasses}
                  delayMs={2000}
                />
              </div>
            );
          }

          // Static images (e.g. Graphic Design)
          return (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-2xl scroll-animate shadow-lg bg-neutral-900 border border-black/10 dark:border-white/10 ${itemClasses}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <img
                src={cleanThumbnail}
                alt={item.title || `Portfolio item ${item.id}`}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 pointer-events-none"></div>
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-2xl pointer-events-none"></div>
              {item.title && (
                <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/60 to-transparent w-full">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PortfolioGrid;
