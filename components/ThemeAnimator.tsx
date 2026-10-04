import React, { useEffect, useState } from 'react';

interface ThemeAnimatorProps {
  x: number;
  y: number;
  theme: 'light' | 'dark';
  onAnimationEnd: () => void;
}

const ThemeAnimator: React.FC<ThemeAnimatorProps> = ({ x, y, theme, onAnimationEnd }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Trigger the exit animation shortly after mount to ensure the transition is applied
    requestAnimationFrame(() => {
      setIsExiting(true);
    });
  }, []);

  const bgColor = theme === 'light' ? 'bg-white' : 'bg-black';
  const animationClass = isExiting ? 'exit' : '';

  return (
    <div
      className={`theme-animator ${bgColor} ${animationClass}`}
      style={{ '--x': `${x}px`, '--y': `${y}px` } as React.CSSProperties}
      onTransitionEnd={onAnimationEnd}
    />
  );
};

export default ThemeAnimator;
