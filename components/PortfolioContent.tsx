import React, { useEffect } from 'react';
import Header from './Header';
import Expertise from './Expertise';
import Tools from './Tools';
import PortfolioGrid from './PortfolioGrid';
import FeaturedProject from './FeaturedProject';
import Contact from './Contact';
import { shortFormVideos, longFormVideos, graphicDesigns } from '../constants';

const PortfolioContent: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <main className="container mx-auto px-6 md:px-12 lg:px-24 space-y-24 md:space-y-36 py-12 md:py-24">
      <Header />
      <Expertise />
      <Tools />
      <PortfolioGrid title="Short-Form Videos" items={shortFormVideos} />
      <FeaturedProject />
      <PortfolioGrid title="Long-Form Videos" items={longFormVideos} />
      <PortfolioGrid title="Graphic Design" items={graphicDesigns} isGraphicDesign={true} />
      <Contact />
    </main>
  );
};

export default PortfolioContent;
