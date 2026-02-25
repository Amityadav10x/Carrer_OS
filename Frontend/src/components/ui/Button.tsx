import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'cyan' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children: React.ReactNode;
    icon?: React.ReactNode;
    fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-[#4F46E5] hover:bg-[#4338CA] text-white shadow-lg hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all duration-200',
    secondary: 'bg-[#1F2937] hover:bg-[#243041] text-[#F9FAFB] border border-[#374151] hover:border-[#4F46E5]/50 transition-all duration-200',
    ghost: 'bg-transparent hover:bg-[#1F2937] text-[#94A3B8] hover:text-[#F9FAFB] transition-all duration-200',
    outline: 'bg-transparent border border-[#4F46E5] text-[#4F46E5] hover:bg-[#4F46E5]/10 hover:shadow-[0_0_16px_rgba(79,70,229,0.3)] transition-all duration-200',
    cyan: 'bg-transparent border border-[#22D3EE] text-[#22D3EE] hover:bg-[#22D3EE]/10 hover:shadow-[0_0_16px_rgba(34,211,238,0.3)] transition-all duration-200',
    danger: 'bg-[#EF4444] hover:bg-[#DC2626] text-white transition-all duration-200',
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2.5 text-sm rounded-xl',
    lg: 'px-6 py-3.5 text-base rounded-xl',
};

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    children,
    icon,
    fullWidth = false,
    className = '',
    ...props
}) => {
    return (
        <button
            className={`inline-flex items-center gap-2 font-semibold ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full justify-center' : ''} disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            {...props}
        >
            {icon && <span className="flex-shrink-0">{icon}</span>}
            {children}
        </button>
    );
};

export default Button;
