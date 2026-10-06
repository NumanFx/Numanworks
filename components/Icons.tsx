import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * Adobe After Effects CC official logo matching user upload:
 * Deep midnight navy squircle with signature lavender "Ae" glyph
 */
export const AfterEffectsIcon: React.FC<IconProps> = ({ className = 'w-12 h-12', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`rounded-2xl shadow-lg shrink-0 transition-transform duration-300 group-hover:scale-105 ${className}`}
  >
    <rect width="100" height="100" rx="22" fill="#00005b" />
    <text
      x="50"
      y="66"
      fill="#9999ff"
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      fontSize="46"
      fontWeight="900"
      letterSpacing="-2"
      textAnchor="middle"
    >
      Ae
    </text>
  </svg>
);

/**
 * Adobe Premiere Pro CC official logo matching user upload:
 * Deep midnight blue squircle with signature lavender "Pr" glyph
 */
export const PremiereProIcon: React.FC<IconProps> = ({ className = 'w-12 h-12', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`rounded-2xl shadow-lg shrink-0 transition-transform duration-300 group-hover:scale-105 ${className}`}
  >
    <rect width="100" height="100" rx="22" fill="#00005b" />
    <text
      x="50"
      y="66"
      fill="#9999ff"
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      fontSize="46"
      fontWeight="900"
      letterSpacing="-2"
      textAnchor="middle"
    >
      Pr
    </text>
  </svg>
);

/**
 * Adobe Illustrator CC official logo matching user upload:
 * Dark chocolate/black squircle with bright amber-orange "Ai" glyph
 */
export const IllustratorIcon: React.FC<IconProps> = ({ className = 'w-12 h-12', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`rounded-2xl shadow-lg shrink-0 transition-transform duration-300 group-hover:scale-105 ${className}`}
  >
    <rect width="100" height="100" rx="22" fill="#330000" />
    <text
      x="50"
      y="66"
      fill="#ff9a00"
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      fontSize="46"
      fontWeight="900"
      letterSpacing="-2"
      textAnchor="middle"
    >
      Ai
    </text>
  </svg>
);

/**
 * CapCut official logo matching user upload:
 * Crisp white squircle with black dual-interlocking geometric ribbon mark
 */
export const CapCutIcon: React.FC<IconProps> = ({ className = 'w-12 h-12', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`rounded-2xl shadow-lg shrink-0 transition-transform duration-300 group-hover:scale-105 border border-black/10 dark:border-white/10 ${className}`}
  >
    <rect width="100" height="100" rx="22" fill="#FFFFFF" />
    {/* CapCut dual ribbon loops */}
    <g transform="translate(14, 18) scale(0.72)">
      {/* Upper loop */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 18C15 18 11 22 11 27V42C11 47 15 51 20 51H55L82 24C85 21 83 18 78 18H20ZM23 30H50L38 42H23V30Z"
        fill="#000000"
      />
      {/* Lower loop */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M80 72C85 72 89 68 89 63V48C89 43 85 39 80 39H45L18 66C15 69 17 72 22 72H80ZM77 60H50L62 48H77V60Z"
        fill="#000000"
      />
    </g>
  </svg>
);

/**
 * Canva official logo matching user upload:
 * Rounded squircle with cyan-to-violet gradient (#00c4cc -> #1d68ed -> #7d2ae8)
 * with the signature white Canva calligraphy script
 */
export const CanvaIcon: React.FC<IconProps> = ({ className = 'w-12 h-12', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`rounded-2xl shadow-lg shrink-0 transition-transform duration-300 group-hover:scale-105 ${className}`}
  >
    <defs>
      <linearGradient id="canvaGradOfficial" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00c4cc" />
        <stop offset="45%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#7d2ae8" />
      </linearGradient>
      <filter id="canvaShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="1.5" stdDeviation="1" floodColor="#000000" floodOpacity="0.25" />
      </filter>
    </defs>
    <rect width="100" height="100" rx="22" fill="url(#canvaGradOfficial)" />
    {/* Canva Script Logo */}
    <g filter="url(#canvaShadow)">
      <path
        d="M28.5 54.8C27.2 56.4 25.4 57.3 23.3 57.3C19.7 57.3 17.5 54.3 17.5 49.6C17.5 43.1 22.1 36.8 28.7 36.8C32.4 36.8 34.6 39.1 34.6 42.6C34.6 44.8 33.7 46.8 31.9 48.8L28.5 54.8ZM28.8 42.1C28.8 40.5 27.6 39.5 25.8 39.5C23 39.5 20.9 43.4 20.9 48C20.9 51.5 22.3 53.7 24.6 53.7C26.5 53.7 28.2 51.9 29.5 49.3L28.8 42.1Z"
        fill="#FFFFFF"
      />
      <text
        x="54"
        y="60"
        fill="#FFFFFF"
        fontFamily="'Brush Script MT', 'Dancing Script', 'Caveat', 'Segoe Script', cursive, sans-serif"
        fontSize="34"
        fontWeight="bold"
        fontStyle="italic"
        letterSpacing="-0.5"
        textAnchor="middle"
      >
        Canva
      </text>
    </g>
  </svg>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);
