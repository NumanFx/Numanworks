import React from 'react';

interface LoaderProps {
  large?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ large = false }) => {
  const sizeClasses = large ? 'w-10 h-10' : 'w-5 h-5';
  const borderClasses = large ? 'border-4' : 'border-2';

  return (
    <div className={`animate-spin rounded-full ${sizeClasses} ${borderClasses} border-t-transparent border-white`}></div>
  );
};

export default Loader;
