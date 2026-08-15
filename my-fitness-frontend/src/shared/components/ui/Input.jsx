import React, { forwardRef } from 'react';

export const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      icon: Icon,
      className = '',
      id,
      required,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[11px] font-extrabold uppercase tracking-wider text-gray-700"
          >
            {label} {required && <span className="text-brand-red">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {Icon && (
            <div className="absolute left-3.5 pointer-events-none text-gray-400">
              <Icon className="w-4 h-4" />
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            required={required}
            className={`w-full bg-gray-50/80 border text-gray-900 text-xs font-semibold rounded-xl placeholder:text-gray-400 focus:outline-none focus:bg-white transition-all ${
              Icon ? 'pl-10' : 'px-3.5'
            } py-2.5 ${
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                : 'border-gray-200 focus:border-brand-red focus:ring-1 focus:ring-brand-red'
            } ${className}`}
            {...props}
          />
        </div>

        {error ? (
          <p className="text-[10px] font-bold text-brand-red">{error}</p>
        ) : helperText ? (
          <p className="text-[10px] font-medium text-gray-400">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';