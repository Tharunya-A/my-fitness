import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-bold uppercase tracking-wider transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    primary:
      'bg-brand-red text-white hover:bg-brand-red-hover focus:ring-red-500 shadow-md shadow-red-500/20 active:scale-[0.98]',
    secondary:
      'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900 shadow-md active:scale-[0.98]',
    outline:
      'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-400 active:scale-[0.98]',
    ghost:
      'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-300',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600 shadow-md active:scale-[0.98]',
  };

  const sizes = {
    sm: 'text-[11px] px-3 py-1.5 rounded-lg gap-1.5',
    md: 'text-xs px-4 py-2.5 rounded-xl gap-2',
    lg: 'text-sm px-6 py-3.5 rounded-xl gap-2.5',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
      {children}
    </button>
  );
};