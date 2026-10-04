
import React from 'react';

const iconSize = "h-8 w-8 md:h-10 md:w-10";

export const AfterEffectsIcon: React.FC = () => (
  <div className={`flex items-center justify-center rounded-lg bg-indigo-900 text-white font-bold text-lg ${iconSize}`}>Ae</div>
);

export const PremiereProIcon: React.FC = () => (
  <div className={`flex items-center justify-center rounded-lg bg-purple-900 text-white font-bold text-lg ${iconSize}`}>Pr</div>
);

export const IllustratorIcon: React.FC = () => (
  <div className={`flex items-center justify-center rounded-lg bg-orange-900 text-white font-bold text-lg ${iconSize}`}>Ai</div>
);

export const CapCutIcon: React.FC = () => (
  <svg className={`${iconSize} text-gray-800 dark:text-white`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M2 7L12 12L22 7" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 22V12" stroke="currentColor" strokeWidth="2"/>
    <path d="M17 4.5L7 9.5" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const CanvaIcon: React.FC = () => (
    <div className={`flex items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 text-white font-bold text-lg ${iconSize}`}>C</div>
);


export const InstagramIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
    </svg>
);