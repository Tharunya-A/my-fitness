import React from 'react';
import { cn } from '../../utils/cn';

export const Input = ({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  className,
  ...props
}) => {
  const fieldId = id || name;

  return (
    <div className="flex flex-col gap-1.5 w-full mb-4">
      {label && (
        <label htmlFor={fieldId} className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={fieldId}
        name={name || id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          'w-full px-3.5 py-2.5 text-sm border font-normal rounded-lg transition-colors focus:outline-none',
          error
            ? 'border-red-500 bg-red-50 focus:border-red-600'
            : 'border-gray-300 focus:border-indigo-600 focus:bg-white',
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-xs font-medium text-red-600 mt-0.5">
          {error}
        </span>
      )}
    </div>
  );
};