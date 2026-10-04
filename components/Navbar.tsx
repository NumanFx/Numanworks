import React, { useState, useEffect, useRef } from 'react';
import ThemeToggle from './ThemeToggle';

type Page = 'portfolio' | 'aiGenerator' | 'aiEditor' | 'aiSuite';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  theme: string;
  onToggle: (event: React.MouseEvent) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage, theme, onToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAiMenuOpen, setIsAiMenuOpen] = useState(false);
  const aiMenuRef = useRef<HTMLLIElement>(null);

  const aiNavItems = [
    { id: 'aiGenerator', label: 'AI Image Generator' },
    { id: 'aiEditor', label: 'AI Image Editor' },
    { id: 'aiSuite', label: 'AI Creative Suite (Public)' },
  ];

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false); // Close main mobile menu
    setIsAiMenuOpen(false); // Close AI dropdown
  };
  
  // Close AI dropdown when clicking outside on desktop
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (aiMenuRef.current && !aiMenuRef.current.contains(event.target as Node)) {
        setIsAiMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [aiMenuRef]);

  const isAiPageActive = aiNavItems.some(item => item.id === currentPage);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/50 dark:bg-black/50 backdrop-blur-md animate-fade-in-down">
      <nav className="container mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-center h-16">
        <div 
          className="text-2xl font-bold tracking-wider cursor-pointer z-50"
          onClick={() => handleNavClick('portfolio')}
        >
          N<span className="text-orange-500">.</span>
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-6">
            <li>
              <button
                onClick={() => handleNavClick('portfolio')}
                className={`text-lg font-medium transition-colors duration-300 ${
                  currentPage === 'portfolio'
                    ? 'text-orange-500 dark:text-orange-400'
                    : 'text-gray-600 dark:text-white/70 hover:text-orange-500 dark:hover:text-orange-400'
                }`}
              >
                Portfolio
              </button>
            </li>
            <li className="relative" ref={aiMenuRef}>
               <button
                  onClick={() => setIsAiMenuOpen(!isAiMenuOpen)}
                  className={`flex items-center text-lg font-medium transition-colors duration-300 ${
                    isAiPageActive
                      ? 'text-orange-500 dark:text-orange-400'
                      : 'text-gray-600 dark:text-white/70 hover:text-orange-500 dark:hover:text-orange-400'
                  }`}
                >
                  AI Tools
                  <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${isAiMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {isAiMenuOpen && (
                  <ul className="absolute top-full right-0 mt-2 w-64 bg-white/80 dark:bg-black/80 backdrop-blur-lg rounded-lg shadow-lg border border-black/10 dark:border-white/10 p-2 space-y-1 z-10">
                     {aiNavItems.map((item) => (
                      <li key={item.id}>
                         <button
                           onClick={() => handleNavClick(item.id as Page)}
                           className={`w-full text-left py-2 px-3 rounded-md text-base font-medium transition-colors duration-300 ${
                             currentPage === item.id
                               ? 'text-white bg-orange-500'
                               : 'text-gray-600 dark:text-white/70 hover:bg-gray-200 dark:hover:bg-gray-700'
                           }`}
                         >
                           {item.label}
                         </button>
                      </li>
                    ))}
                  </ul>
                )}
            </li>
          </ul>

          <ThemeToggle theme={theme} onToggle={onToggle} />

          {/* Mobile Menu Button */}
          <div className="md:hidden z-50">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 dark:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div className={`transition-all duration-300 ease-in-out md:hidden overflow-hidden ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <ul className="bg-white/80 dark:bg-black/80 backdrop-blur-lg flex flex-col items-center space-y-1 py-4 border-t border-black/10 dark:border-white/10">
          <li>
            <button
              onClick={() => handleNavClick('portfolio')}
              className={`w-full text-center py-2 px-4 text-lg font-medium transition-colors duration-300 ${
                currentPage === 'portfolio'
                  ? 'text-orange-500 dark:text-orange-400'
                  : 'text-gray-600 dark:text-white/70 hover:text-orange-500 dark:hover:text-orange-400'
              }`}
            >
              Portfolio
            </button>
          </li>
          {aiNavItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.id as Page)}
                className={`w-full text-center py-2 px-4 text-lg font-medium transition-colors duration-300 ${
                  currentPage === item.id
                    ? 'text-orange-500 dark:text-orange-400'
                    : 'text-gray-600 dark:text-white/70 hover:text-orange-500 dark:hover:text-orange-400'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;