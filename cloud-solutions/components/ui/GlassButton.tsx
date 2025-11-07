import React from 'react';

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
  type = 'button',
}) => {
  const variantStyles = {
    primary: 'bg-blue-500/20 hover:bg-blue-500/30 border-blue-400/30',
    secondary: 'bg-purple-500/20 hover:bg-purple-500/30 border-purple-400/30',
    accent: 'bg-green-500/20 hover:bg-green-500/30 border-green-400/30',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        backdrop-blur-xl ${variantStyles[variant]}
        border rounded-xl px-6 py-3
        font-medium text-white
        transition-all duration-300
        hover:shadow-lg hover:scale-105
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${className}
      `}
    >
      {children}
    </button>
  );
};

