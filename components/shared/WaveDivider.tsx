/**
 * @file components/shared/WaveDivider.tsx
 * @purpose A decorative SVG component used to create a wave-like transition between page sections.
 */
import React from 'react';

interface WaveDividerProps {
  topColor?: string;
  bottomColor?: string;
}

const WaveDivider: React.FC<WaveDividerProps> = ({ topColor = 'white', bottomColor = 'rgb(248 250 252)' }) => {
  return (
    <div style={{ backgroundColor: topColor }}>
        <div style={{ height: '100px', overflow: 'hidden' }}>
            <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
                <path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style={{ stroke: 'none', fill: bottomColor }}></path>
            </svg>
        </div>
    </div>
  );
};

export default WaveDivider;