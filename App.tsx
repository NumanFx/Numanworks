import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import PortfolioContent from './components/PortfolioContent';
import CreatorVault from './components/CreatorVault';

type Page = 'portfolio' | 'creatorVault';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [currentPage, setCurrentPage] = useState<Page>('portfolio');
  const [glowProps, setGlowProps] = useState<{x: number; y: number; key: number} | null>(null);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    // Non-blocking quick intro transition (400ms) while DOM and assets mount in parallel
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const handleThemeToggle = (event: React.MouseEvent) => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    setGlowProps({
      x: event.clientX,
      y: event.clientY,
      key: Date.now(), // Unique key to re-trigger the animation
    });
  };

  return (
    <div className="bg-white dark:bg-black text-gray-800 dark:text-white min-h-screen font-sans relative transition-colors duration-300">
      {showPreloader && (
        <div className="fixed inset-0 z-50 pointer-events-none transition-opacity duration-300">
          <Preloader />
        </div>
      )}
      {glowProps && (
        <div
          key={glowProps.key}
          className="theme-glow"
          style={
            {
              '--x': `${glowProps.x}px`,
              '--y': `${glowProps.y}px`,
            } as React.CSSProperties
          }
        />
      )}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} theme={theme} onToggle={handleThemeToggle} />
      
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 dark:from-cyan-500/50 dark:to-blue-500/50 rounded-full filter blur-3xl opacity-50 dark:opacity-20 animate-orb-1 pointer-events-none"></div>
      <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-gradient-to-l from-orange-500/30 to-yellow-500/30 dark:from-orange-500/50 dark:to-yellow-500/50 rounded-full filter blur-3xl opacity-50 dark:opacity-20 animate-orb-2 pointer-events-none"></div>

      <div className="relative z-10 pt-20">
        {currentPage === 'portfolio' && <PortfolioContent />}
        {currentPage === 'creatorVault' && <CreatorVault />}
      </div>
    </div>
  );
};

export default App;
