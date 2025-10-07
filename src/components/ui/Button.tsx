import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  // Base styles for all buttons
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Variant styles - adaptados al esquema de colores azul
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-blue-100 text-blue-900 hover:bg-blue-200 focus:ring-blue-500',
    outline: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
  };
  
  // Size styles - optimizados para resoluciones pequeñas
  const sizeStyles = {
    xs: 'text-xs px-2 py-1',
    sm: 'text-xs lg:text-sm px-2.5 lg:px-3 py-1.5',
    md: 'text-sm px-3 lg:px-4 py-1.5 lg:py-2',
    lg: 'text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-3',
  };
  
  // Width styles
  const widthStyles = fullWidth ? 'w-full' : '';
  
  // Disabled styles
  const disabledStyles = (disabled || isLoading) ? 'opacity-60 cursor-not-allowed' : '';
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${disabledStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-1 lg:mr-2 h-3 w-3 lg:h-4 lg:w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {children}
        </>
      ) : (
        <>
          {leftIcon && <span className="mr-1 lg:mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-1 lg:ml-2">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
