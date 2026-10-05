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

  // Autoplay after thumbnail has been visibly loaded and displayed for delayMs
  useEffect(() => {
    if (!isInView || isPlaying || !thumbLoaded) return;

    const timer = setTimeout(() => {
      setIsPlaying(true);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [isInView, isPlaying, thumbLoaded, delayMs]);

  const handleCardClick = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleCardClick}
      className={`group relative overflow-hidden rounded-xl bg-neutral-900 border border-black/10 dark:border-white/10 ${aspectRatioClass} ${className} cursor-pointer`}
    >
      {/* 1. Base Thumbnail */}
      {currentThumb && (
        <img
          src={currentThumb}
          alt={title || 'Video thumbnail'}
          onLoad={() => setThumbLoaded(true)}
          onError={() => {
            if (fallbackThumb && currentThumb !== fallbackThumb) {
              setCurrentThumb(fallbackThumb);
            }
          }}
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out z-10 ${
            thumbLoaded ? 'opacity-100' : 'opacity-0'
          } ${isPlaying && iframeLoaded ? 'opacity-0 pointer-events-none' : ''}`}
          loading={eager ? 'eager' : 'lazy'}
        />
      )}

      {/* Clean minimal play button on thumbnail hover before play */}
      {(!isPlaying || !iframeLoaded) && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
        </div>
      )}

      {/* 2. Inline Muted Video Player */}
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

      {/* Clean title banner */}
      {title && (
        <div className="pointer-events-none absolute bottom-0 left-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent w-full z-30">
          <h3 className="text-sm font-medium text-white drop-shadow-sm">{title}</h3>
        </div>
      )}
    </div>
  );
};

export default AutoPlayVideoCard;
