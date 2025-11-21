import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-cyber-gray rounded-full"></div>
        <div className="absolute inset-0 border-t-4 border-cyber-neonCyan rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-t-4 border-cyber-neonPink rounded-full animate-spin-reverse"></div>
      </div>
      <p className="font-mono text-cyber-neonCyan animate-pulse">ESTABLISHING UPLINK...</p>
    </div>
  );
};