import React from 'react';

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  glow?: boolean;
}

export const CyberButton: React.FC<CyberButtonProps> = ({ 
  children, 
  variant = 'primary', 
  glow = false, 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "relative px-6 py-3 font-display font-bold uppercase tracking-widest transition-all duration-200 clip-path-polygon disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-cyber-neonCyan text-cyber-black hover:bg-white hover:shadow-[0_0_15px_#00ffff]",
    secondary: "bg-transparent border border-cyber-neonPink text-cyber-neonPink hover:bg-cyber-neonPink hover:text-cyber-black hover:shadow-[0_0_15px_#ff00ff]",
    danger: "bg-red-600 text-white hover:bg-red-500",
  };

  const glowStyle = glow ? (variant === 'primary' ? 'shadow-[0_0_10px_#00ffff]' : 'shadow-[0_0_10px_#ff00ff]') : '';

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${glowStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {/* Decorative corners */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current opacity-50"></span>
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current opacity-50"></span>
      {children}
    </button>
  );
};