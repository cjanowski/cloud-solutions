import React from 'react';

interface GlassInputProps {
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
}

export const GlassInput: React.FC<GlassInputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  label,
  className = '',
  min,
  max,
  step,
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-white/90">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        className="
          backdrop-blur-xl bg-white/10 dark:bg-white/5
          border border-white/20 dark:border-white/10
          rounded-xl px-4 py-3
          text-white placeholder-white/50
          focus:outline-none focus:ring-2 focus:ring-blue-400/50
          transition-all duration-300
        "
      />
    </div>
  );
};

