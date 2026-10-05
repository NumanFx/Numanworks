import React from 'react';

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({ children, className = '', style }) => {
  return (
    <div
      className={`bg-white/75 dark:bg-[#0d0d12]/80 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] p-6 md:p-8 transition-all duration-300 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default GlassmorphicCard;
