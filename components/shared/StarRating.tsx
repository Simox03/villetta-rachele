/**
 * @file components/shared/StarRating.tsx
 * @purpose A component that displays a rating using a series of StarIcon components.
 */
import React from 'react';
import StarIcon from './StarIcon';

const StarRating: React.FC<{ rating: number; className?: string }> = ({ rating, className }) => (
    <div className={`flex items-center ${className}`}>
        {[...Array(5)].map((_, i) => (
            <StarIcon key={i} filled={i < rating} />
        ))}
    </div>
);

export default StarRating;