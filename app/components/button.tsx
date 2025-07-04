interface ButtonProps {
      children: React.ReactNode;
      onClick?: () => void;
      variant?: 'blue' | 'green' | 'red' | 'purple' | 'yellow' | 'pink';
      size?: 'sm' | 'md' | 'lg';
      disabled?: boolean;
      type?: 'button' | 'submit' | 'reset';
      className?: string;
}

const Button = ({
      children,
      onClick,
      variant = 'blue',
      size = 'md',
      disabled = false,
      type = 'button',
      className = '',
}: ButtonProps) => {
      const baseStyles = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

      const variantStyles = {
            blue: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
            green: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
            red: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
            purple: 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500',
            yellow: 'bg-yellow-500 text-black hover:bg-yellow-600 focus:ring-yellow-500',
            pink: 'bg-pink-600 text-white hover:bg-pink-700 focus:ring-pink-500',
      };

      const sizeStyles = {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-4 py-2 text-base',
            lg: 'px-6 py-3 text-lg',
      };

      const disabledStyles = 'opacity-50 cursor-not-allowed';

      const buttonClasses = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${disabled ? disabledStyles : ''}
    ${className}
  `.trim();

      return (
            <button
                  type={type}
                  onClick={disabled ? undefined : onClick}
                  disabled={disabled}
                  className={buttonClasses}
            >
                  {children}
            </button>
      );
};

export default Button;