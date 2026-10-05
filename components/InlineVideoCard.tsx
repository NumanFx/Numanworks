import React, { useState, useEffect, useRef } from 'react';
import { cleanMediaUrl, getFallbackThumbnail, getVimeoEmbedUrl } from '../utils/video';

interface InlineVideoCardProps {
  id?: number | string;
  thumbnail: string;
  videoUrl: string;
  title?: string;
  aspectRatioClass?: string;
  previewDurationMs?: number;
  index?: number;
  className?: string;
}

export const InlineVideoCard: React.FC<InlineVideoCardProps> = ({
  thumbnail,
  videoUrl,
  title,
  aspectRatioClass = 'aspect-video',
  previewDurationMs = 2000, // 2 seconds (within 1st 1-3 sec)
  index = 0,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [imgSrc, setImgSrc] = useState<string>(() => cleanMediaUrl(thumbnail));
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  // Sync image source if thumbnail prop changes
  useEffect(() => {
    setImgSrc(cleanMediaUrl(thumbnail));
    setIsImgLoaded(false);
  }, [thumbnail]);

  // Viewport intersection observer for high performance lazy playing
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else {
            // When scrolled away, stop playback to free memory & CPU
            setIsInView(false);
            setIsPlaying(false);
            setProgress(0);
          }
        });
      },
      {
        threshold: 0.35, // Trigger when at least 35% is visible
        rootMargin: '50px 0px 50px 0px',
      }
    );

    observer.observe(element);
    return () => {
      observer.unobserve(element);
    };
  }, []);

  // 1-3 second thumbnail countdown before playing video automatically
  useEffect(() => {
    if (!isInView || isPlaying) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / previewDurationMs) * 100));
      setProgress(pct);

      if (elapsed >= previewDurationMs) {
        clearInterval(interval);
        setIsPlaying(true);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isInView, isPlaying, previewDurationMs]);

  const handleStartPlayingImmediately = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  const handleToggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const handleImgError = () => {
    const fallback = getFallbackThumbnail(videoUrl);
    if (fallback && imgSrc !== fallback) {
      setImgSrc(fallback);
    }
  };

  const embedUrl = getVimeoEmbedUrl(videoUrl, {
    autoplay: true,
    muted: isMuted,
    loop: true,
    controls: true,
  });

  return (
    <div
      ref={containerRef}
      className={`group relative overflow-hidden rounded-2xl bg-neutral-900 border border-black/10 dark:border-white/10 shadow-lg scroll-animate transition-all duration-300 ${aspectRatioClass} ${className}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Background shimmer placeholder while thumbnail loads */}
      {!isImgLoaded && (
        <div className="absolute inset-0 bg-neutral-800 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-cyan-400 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Primary Thumbnail Image: visible initially & smooth fade */}
      <img
        src={imgSrc}
        alt={title || 'Portfolio video thumbnail'}
        onLoad={() => setIsImgLoaded(true)}
        onError={handleImgError}
        loading="lazy"
        decoding="async"
        className={`w-full h-full object-cover transition-all duration-500 ${
          isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100 group-hover:scale-105'
        }`}
      />

      {/* Inline Video Player: mounted & plays automatically without opening a popup */}
      {isPlaying && (
        <div className="absolute inset-0 w-full h-full z-10 bg-black animate-fade-in">
          <iframe
            key={`${videoUrl}-${isMuted ? 'muted' : 'unmuted'}`}
            src={embedUrl}
            title={title || 'Video Player'}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      )}

      {/* Thumbnail Stage Controls & Countdown Indicator (1st 1-3 seconds) */}
      {!isPlaying && (
        <>
          {/* Subtle dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>

          {/* Center Play Button (Click to start immediately without waiting 2s) */}
          <div
            onClick={handleStartPlayingImmediately}
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            title="Click to play immediately"
          >
            <div className="w-14 h-14 md:w-16 md:h-16 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 active:scale-95">
              <svg className="w-7 h-7 md:w-8 md:h-8 text-white ml-1 drop-shadow" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
          </div>

          {/* Countdown & Status Badge */}
          {isInView && (
            <div className="absolute top-3 left-3 z-20 flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-medium text-white/90">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>Playing in {Math.max(1, Math.ceil((previewDurationMs * (100 - progress)) / (1000 * 100)))}s</span>
            </div>
          )}

          {/* 1-3s Progress bar indicator at bottom */}
          {isInView && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </>
      )}

      {/* Floating Overlay Controls when Video is Playing */}
      {isPlaying && (
        <div className="absolute top-3 right-3 z-30 flex items-center space-x-2">
          {/* Sound Mute / Unmute Button */}
          <button
            onClick={handleToggleMute}
            aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            className="p-2 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 shadow-md transition-transform hover:scale-105 active:scale-95"
            title={isMuted ? 'Click to unmute' : 'Muted'}
          >
            {isMuted ? (
              <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={handleToggleFullscreen}
            aria-label="Toggle Fullscreen"
            className="p-2 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 shadow-md transition-transform hover:scale-105 active:scale-95"
            title="Toggle fullscreen"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </div>
      )}

      {/* Card Title if provided */}
      {title && (
        <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
          <h3 className="text-lg font-semibold text-white drop-shadow">{title}</h3>
        </div>
      )}
    </div>
  );
};

export default InlineVideoCard;
