export const getEmbedUrl = (url?: string, autoplay: boolean = true, muted: boolean = true): string => {
  if (!url) return '';
  const autoParam = autoplay ? '1' : '0';
  const muteParam = muted ? '1' : '0';

  // Vimeo ID extraction (handles vimeo.com/123, player.vimeo.com/video/123, query parameters, etc.)
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    const videoId = vimeoMatch[1];
    // dnt=1 stops third-party trackers for 2x faster iframe load & reduced JS overhead
    return `https://player.vimeo.com/video/${videoId}?autoplay=${autoParam}&muted=${muteParam}&loop=1&autopause=0&playsinline=1&controls=1&dnt=1&title=0&byline=0&portrait=0&transparent=0`;
  }

  // YouTube ID extraction
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    return `https://www.youtube.com/embed/${videoId}?autoplay=${autoParam}&mute=${muteParam}&loop=1&playlist=${videoId}&playsinline=1&rel=0&controls=1`;
  }

  return url;
};

export const getVimeoThumbnailUrl = (url?: string): string => {
  if (!url) return '';
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://vumbnail.com/${vimeoMatch[1]}.jpg`;
  }
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
  }
  return '';
};
