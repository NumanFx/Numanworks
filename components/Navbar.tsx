import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  theme: string;
  onToggle: (event: React.MouseEvent) => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, onToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Expertise', href: '#expertise' },
    { label: 'Tools', href: '#tools' },
    { label: 'Short-Form', href: '#short-form' },
    { label: 'Featured', href: '#featured' },
    { label: 'Long-Form', href: '#long-form' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-black/5 dark:border-white/10 animate-fade-in-down transition-colors duration-300">
      <nav className="container mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-center h-16">
        <div
          className="text-2xl font-bold tracking-wider cursor-pointer z-50 flex items-center select-none"
          onClick={scrollToTop}
        >
          <span>Numan</span>
          <span className="text-orange-500 font-extrabold text-3xl leading-none">.</span>
        </div>

        <div className="flex items-center space-x-4 md:space-x-8">
          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-sm font-medium text-gray-600 dark:text-white/70 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <ThemeToggle theme={theme} onToggle={onToggle} />

          {/* Mobile Menu Button */}
          <div className="md:hidden z-50">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 focus:outline-none transition-colors"
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
      <div
        className={`transition-all duration-300 ease-in-out md:hidden overflow-hidden ${
          isMenuOpen ? 'max-h-96 border-b border-black/10 dark:border-white/10' : 'max-h-0'
        }`}
      >
        <ul className="bg-white/95 dark:bg-black/95 backdrop-blur-2xl flex flex-col items-center space-y-3 py-6 px-4">
          {navLinks.map((link) => (
            <li key={link.label} className="w-full text-center">
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="block w-full py-2 text-base font-medium text-gray-700 dark:text-white/80 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
