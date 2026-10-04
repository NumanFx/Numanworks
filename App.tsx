import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import PortfolioContent from './components/PortfolioContent';
import AiCreativeSuite from './components/AiCreativeSuite';
import AiImageGenerator from './components/AiImageGenerator';
import AiImageEditor from './components/AiImageEditor';

type Page = 'portfolio' | 'aiGenerator' | 'aiEditor' | 'aiSuite';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [currentPage, setCurrentPage] = useState<Page>('portfolio');
  const [glowProps, setGlowProps] = useState<{x: number; y: number; key: number} | null>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate loading time for 2 seconds
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

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="bg-white dark:bg-black text-gray-800 dark:text-white min-h-screen font-sans relative transition-colors duration-300">
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
      <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 dark:from-cyan-500/50 dark:to-blue-500/50 rounded-full filter blur-3xl opacity-50 dark:opacity-20 animate-orb-1"></div>
      <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-gradient-to-l from-orange-500/30 to-yellow-500/30 dark:from-orange-500/50 dark:to-yellow-500/50 rounded-full filter blur-3xl opacity-50 dark:opacity-20 animate-orb-2"></div>

      <div className="relative z-10 pt-20">
        {currentPage === 'portfolio' && <PortfolioContent />}
        {currentPage === 'aiGenerator' && <AiImageGenerator />}
        {currentPage === 'aiEditor' && <AiImageEditor />}
        {currentPage === 'aiSuite' && <AiCreativeSuite />}
      </div>
    </div>
  );
};

export default App;