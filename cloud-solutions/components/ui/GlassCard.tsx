import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  hover = false 
}) => {
  return (
    <div
      className={`
        backdrop-blur-xl bg-white/10 dark:bg-white/5
        border border-white/20 dark:border-white/10
        rounded-2xl shadow-xl
        transition-all duration-300
        ${hover ? 'hover:bg-white/20 dark:hover:bg-white/10 hover:shadow-2xl hover:scale-[1.02]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

