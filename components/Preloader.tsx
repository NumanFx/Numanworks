import React from 'react';

const Preloader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-black flex items-center justify-center z-50 p-4">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fadeIn 1.5s ease-in-out forwards;
          }
        `}
      </style>
      <h1 className="text-5xl md:text-7xl font-bold text-gray-800 dark:text-white animate-fade-in text-center">
        Hi, I'm Numan
      </h1>
    </div>
  );
};

export default Preloader;