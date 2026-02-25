import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    elevated?: boolean;
    hoverable?: boolean;
    onClick?: () => void;
    glass?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    elevated = false,
    hoverable = false,
    onClick,
    glass = false,
}) => {
    const base = elevated
        ? 'bg-[#243041] border border-[#4F46E5]/20'
        : glass
            ? 'glass-card'
            : 'bg-[#1F2937]/50 border border-white/5';

    return (
        <div
            onClick={onClick}
            className={`rounded-2xl p-6 ${base} ${hoverable ? 'card-hover cursor-pointer' : ''} transition-all duration-300 ${className}`}
        >
            {children}
        </div>
    );
};

export default Card;
