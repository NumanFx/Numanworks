

import React from 'react';

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
  // FIX: Add `style` prop to allow passing inline styles.
  style?: React.CSSProperties;
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({ children, className = '', style }) => {
  return (
    <div
      className={`bg-gray-200/50 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-2xl shadow-lg p-8 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default GlassmorphicCard;
