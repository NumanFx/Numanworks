import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';

type Page = 'portfolio' | 'aiCreativeSuite';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  theme: string;
  onToggle: (event: React.MouseEvent) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage, theme, onToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/70 dark:bg-black/70 backdrop-blur-md border-b border-black/5 dark:border-white/5">
      <nav className="container mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-center h-16">
        <div 
          className="text-2xl font-bold tracking-wider cursor-pointer z-50"
          onClick={() => handleNavClick('portfolio')}
        >
          N<span className="text-orange-500">.</span>
        </div>
        
        <div className="flex items-center space-x-6 md:space-x-8">
          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-8">
            <li>
              <button
                onClick={() => handleNavClick('portfolio')}
                className={`text-base font-medium transition-colors duration-200 ${
                  currentPage === 'portfolio'
                    ? 'text-orange-500 dark:text-orange-400'
                    : 'text-gray-600 dark:text-white/70 hover:text-orange-500 dark:hover:text-orange-400'
                }`}
              >
                Portfolio
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('aiCreativeSuite')}
                className={`text-base font-medium transition-colors duration-200 ${
                  currentPage === 'aiCreativeSuite'
                    ? 'text-orange-500 dark:text-orange-400'
                    : 'text-gray-600 dark:text-white/70 hover:text-orange-500 dark:hover:text-orange-400'
                }`}
              >
                AI Tools
              </button>
            </li>
          </ul>

          <ThemeToggle theme={theme} onToggle={onToggle} />

          {/* Mobile Menu Button */}
          <div className="md:hidden z-50">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 dark:text-white focus:outline-none p-1"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div className={`transition-all duration-300 ease-in-out md:hidden overflow-hidden ${isMenuOpen ? 'max-h-60' : 'max-h-0'}`}>
        <ul className="bg-white/95 dark:bg-black/95 backdrop-blur-lg flex flex-col items-center space-y-3 py-5 border-t border-black/10 dark:border-white/10">
          <li>
            <button
              onClick={() => handleNavClick('portfolio')}
              className={`w-full text-center py-2 px-4 text-base font-medium transition-colors duration-200 ${
                currentPage === 'portfolio'
                  ? 'text-orange-500 dark:text-orange-400'
                  : 'text-gray-600 dark:text-white/70 hover:text-orange-500 dark:hover:text-orange-400'
              }`}
            >
              Portfolio
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavClick('aiCreativeSuite')}
              className={`w-full text-center py-2 px-4 text-base font-medium transition-colors duration-200 ${
                currentPage === 'aiCreativeSuite'
                  ? 'text-orange-500 dark:text-orange-400'
                  : 'text-gray-600 dark:text-white/70 hover:text-orange-500 dark:hover:text-orange-400'
              }`}
            >
              AI Tools
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
