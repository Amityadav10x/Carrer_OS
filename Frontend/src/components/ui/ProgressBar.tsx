import React from 'react';

interface ProgressBarProps {
    value: number; // 0-100
    label?: string;
    showValue?: boolean;
    color?: 'primary' | 'cyan' | 'purple' | 'success' | 'warning';
    size?: 'sm' | 'md' | 'lg';
}

const colorStyles = {
    primary: 'bg-gradient-to-r from-[#4F46E5] to-[#6366F1]',
    cyan: 'bg-gradient-to-r from-[#22D3EE] to-[#38BDF8]',
    purple: 'bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]',
    success: 'bg-gradient-to-r from-[#10B981] to-[#34D399]',
    warning: 'bg-gradient-to-r from-[#F59E0B] to-[#FCD34D]',
};

const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
    value,
    label,
    showValue = true,
    color = 'primary',
    size = 'md',
}) => {
    const clampedValue = Math.min(100, Math.max(0, value));

    return (
        <div className="w-full">
            {(label || showValue) && (
                <div className="flex justify-between items-center mb-1.5">
                    {label && <span className="text-sm text-[#94A3B8] font-medium">{label}</span>}
                    {showValue && <span className="text-sm text-[#F9FAFB] font-semibold">{clampedValue}%</span>}
                </div>
            )}
            <div className={`w-full bg-[#374151] rounded-full overflow-hidden ${sizeStyles[size]}`}>
                <div
                    className={`${sizeStyles[size]} ${colorStyles[color]} rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${clampedValue}%` }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
