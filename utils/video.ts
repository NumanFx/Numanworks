/**
 * Clean any accidental hash symbols or whitespace from media URLs
 */
export const cleanMediaUrl = (url?: string | null): string => {
  if (!url) return '';
  return url.trim().replace(/^#+/, '');
};

/**
 * Extract Vimeo video ID from various URL formats:
 * - https://player.vimeo.com/video/1136231248
 * - https://vimeo.com/1136777764?fl=tl&fe=ec
 * - https://vimeo.com/1136253618?share=copy&fl=sv&fe=ci
 */
export const extractVimeoId = (url?: string | null): string | null => {
  if (!url) return null;
  const clean = cleanMediaUrl(url);
  const match = clean.match(/(?:vimeo\.com\/(?:video\/)?|player\.vimeo\.com\/video\/)(\d+)/);
  return match ? match[1] : null;
};

/**
 * Returns a fallback thumbnail URL from Vimeo CDN / vumbnail service
 * in case the primary image hosting fails.
 */
export const getFallbackThumbnail = (url?: string | null): string => {
  const videoId = extractVimeoId(url);
  if (videoId) {
    return `https://vumbnail.com/${videoId}.jpg`;
  }
  return '';
};

/**
 * Generate an optimized Vimeo embed URL with inline autoplay, muted by default for browser compliance,
 * loop enabled, and dnt (Do Not Track) enabled for faster loading.
 */
export const getVimeoEmbedUrl = (
  videoUrl?: string | null,
  options: {
    autoplay?: boolean;
    muted?: boolean;
    loop?: boolean;
    controls?: boolean;
  } = {}
): string => {
  if (!videoUrl) return '';
  const videoId = extractVimeoId(videoUrl);
  if (!videoId) return cleanMediaUrl(videoUrl);

  const {
    autoplay = true,
    muted = true,
    loop = true,
    controls = true,
  } = options;

  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    muted: muted ? '1' : '0',
    loop: loop ? '1' : '0',
    autopause: '0',
    playsinline: '1',
    title: '0',
    byline: '0',
    portrait: '0',
    dnt: '1', // Prevents tracking scripts, speeds up load time significantly
    transparent: '0',
    controls: controls ? '1' : '0',
  });

  return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
};
