import React from 'react';

interface GlassSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  label?: string;
  className?: string;
}

export const GlassSelect: React.FC<GlassSelectProps> = ({
  value,
  onChange,
  options,
  label,
  className = '',
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-white/90">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className="
          backdrop-blur-xl bg-white/10 dark:bg-white/5
          border border-white/20 dark:border-white/10
          rounded-xl px-4 py-3
          text-white
          focus:outline-none focus:ring-2 focus:ring-blue-400/50
          transition-all duration-300
          cursor-pointer
        "
      >
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            className="bg-gray-900 text-white"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

