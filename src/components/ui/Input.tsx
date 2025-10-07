import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <div className={`${widthClass} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-xs lg:text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative rounded-md shadow-sm">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-2 lg:pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={`
            block px-3 lg:px-4 py-1.5 lg:py-2 w-full rounded-md border text-sm
            ${error ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} 
            ${leftIcon ? 'pl-8 lg:pl-10' : ''} 
            ${rightIcon ? 'pr-8 lg:pr-10' : ''}
            transition-colors
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-description` : undefined}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-2 lg:pr-3 flex items-center">
            {rightIcon}
          </div>
        )}
      </div>
      {error ? (
        <p className="mt-1 text-xs lg:text-sm text-red-600" id={`${inputId}-error`}>
          {error}
        </p>
      ) : helperText ? (
        <p className="mt-1 text-xs lg:text-sm text-gray-500" id={`${inputId}-description`}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
};

export default Input;
