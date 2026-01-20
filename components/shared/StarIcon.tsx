/**
 * @file components/shared/StarIcon.tsx
 * @purpose A reusable SVG component for a single star, used in ratings.
 */
import React from 'react';

const StarIcon: React.FC<{
    filled?: boolean;
    className?: string;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}> = ({ filled = false, className = 'w-6 h-6 text-yellow-400', onClick, onMouseEnter, onMouseLeave }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill={filled ? 'currentColor' : 'none'} 
        stroke="currentColor" 
        strokeWidth="1.5"
        className={`${className} ${onClick ? 'cursor-pointer' : ''}`}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
);

export default StarIcon;