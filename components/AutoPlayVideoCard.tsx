import React, { useState, useEffect, useRef } from 'react';
import { getEmbedUrl, getVimeoThumbnailUrl } from '../utils/video';

interface AutoPlayVideoCardProps {
  videoUrl: string;
  thumbnail?: string;
  title?: string;
  aspectRatioClass?: string;
  delayMs?: number;
  eager?: boolean;
  className?: string;
}

const AutoPlayVideoCard: React.FC<AutoPlayVideoCardProps> = ({
  videoUrl,
  thumbnail,
  title,
  aspectRatioClass = 'aspect-video',
  delayMs = 2000,
  eager = false,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(eager);
  const [isPlaying, setIsPlaying] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [thumbLoaded, setThumbLoaded] = useState(false);

  // Clean initial thumbnail and provide Vimeo Edge CDN fallback
  const cleanThumb = thumbnail ? thumbnail.replace(/^#/, '') : '';
  const fallbackThumb = getVimeoThumbnailUrl(videoUrl);
  const [currentThumb, setCurrentThumb] = useState(cleanThumb || fallbackThumb);

  // Sync if props change
  useEffect(() => {
    const nextThumb = thumbnail ? thumbnail.replace(/^#/, '') : '';
    setCurrentThumb(nextThumb || getVimeoThumbnailUrl(videoUrl));
    setThumbLoaded(false);
  }, [thumbnail, videoUrl]);

  // Viewport observation: Only active when card is on-screen
  useEffect(() => {
    if (eager) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else {
            // Unload iframe when scrolled away to save bandwidth & CPU
            setIsInView(false);
            setIsPlaying(false);
            setIframeLoaded(false);
          }
        });
      },
      { rootMargin: '100px 0px 100px 0px', threshold: 0.1 }
    );

    const el = containerRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [eager]);

  // CRITICAL: ONLY start countdown AFTER thumbnail is fully loaded and visible on screen!
  // This guarantees the video CANNOT play until the user has seen the thumbnail for the full delay.
  useEffect(() => {
    if (!isInView || isPlaying || !thumbLoaded) return;

    const timer = setTimeout(() => {
      setIsPlaying(true);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [isInView, isPlaying, thumbLoaded, delayMs]);

  // Fast manual immediate play on click
  const handleCardClick = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleCardClick}
      className={`group relative overflow-hidden rounded-2xl bg-neutral-900 shadow-lg border border-black/10 dark:border-white/10 ${aspectRatioClass} ${className} cursor-pointer will-change-transform`}
    >
      {/* 1. Base Thumbnail: Shown first. Timer ONLY runs after this loads */}
      {currentThumb && (
        <img
          src={currentThumb}
          alt={title || 'Video thumbnail'}
          onLoad={() => {
            setThumbLoaded(true);
          }}
          onError={() => {
            if (fallbackThumb && currentThumb !== fallbackThumb) {
              setCurrentThumb(fallbackThumb);
            }
          }}
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out z-10 ${
            thumbLoaded ? 'opacity-100' : 'opacity-0'
          } ${isPlaying && iframeLoaded ? 'opacity-0 pointer-events-none' : ''}`}
          loading={eager ? 'eager' : 'lazy'}
        />
      )}

      {/* Loading Skeleton while thumbnail loads */}
      {!thumbLoaded && (
        <div className="absolute inset-0 bg-neutral-800 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-orange-500 animate-spin" />
        </div>
      )}

      {/* Visual countdown overlay: Active only while thumbnail is visible */}
      {(!isPlaying || !iframeLoaded) && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-between p-4 pointer-events-none">
          <div className="self-end bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-medium text-white/90 flex items-center gap-1.5 shadow-sm">
            <span className={`w-1.5 h-1.5 rounded-full ${thumbLoaded ? 'bg-orange-400 animate-ping' : 'bg-gray-400'}`}></span>
            <span>{thumbLoaded ? 'Auto-plays in 2s' : 'Loading...'}</span>
          </div>

          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-xl">
            <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>

          {/* Progress bar: ONLY fills once thumbnail is loaded */}
          <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full ${
                isInView && thumbLoaded ? 'transition-all ease-linear' : 'w-0'
              }`}
              style={{
                width: isInView && thumbLoaded ? '100%' : '0%',
                transitionDuration: `${delayMs}ms`,
              }}
            />
          </div>
        </div>
      )}

      {/* 2. Embedded Inline Video Player: Mounts and transitions in ONLY after thumbnail is shown for delayMs */}
      {isInView && thumbLoaded && isPlaying && (
        <iframe
          src={getEmbedUrl(videoUrl, true, true)}
          title={title || 'Video Player'}
          onLoad={() => setIframeLoaded(true)}
          className={`w-full h-full border-0 absolute inset-0 z-10 transition-opacity duration-700 ${
            iframeLoaded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="eager"
        />
      )}

      {/* Title banner */}
      {title && (
        <div className="pointer-events-none absolute bottom-0 left-0 p-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent w-full z-30">
          <h3 className="text-sm md:text-base font-semibold text-white drop-shadow">{title}</h3>
        </div>
      )}
    </div>
  );
};

export default AutoPlayVideoCard;
