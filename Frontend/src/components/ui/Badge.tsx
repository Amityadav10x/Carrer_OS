import React from 'react';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'cyan' | 'purple' | 'ghost';

interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    className?: string;
}

const badgeStyles: Record<BadgeVariant, string> = {
    primary: 'bg-[#4F46E5]/20 text-[#4F46E5] border border-[#4F46E5]/30',
    success: 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30',
    warning: 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30',
    error: 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30',
    cyan: 'bg-[#22D3EE]/20 text-[#22D3EE] border border-[#22D3EE]/30',
    purple: 'bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/30',
    ghost: 'bg-[#1F2937] text-[#94A3B8] border border-[#374151]',
};

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'ghost', className = '' }) => {
    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${badgeStyles[variant]} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
