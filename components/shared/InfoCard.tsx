/**
 * @file components/shared/InfoCard.tsx
 * @purpose A reusable card component for displaying key property features with an icon.
 */
import React from 'react';
import type { InfoCardData } from '../../types';

const InfoCard: React.FC<{ card: InfoCardData }> = ({ card }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg border border-slate-100 text-center transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
    <div className="flex justify-center items-center mb-4">{card.icon}</div>
    <h3 className="text-xl font-semibold text-slate-800 mb-2">{card.title}</h3>
    <p className="text-slate-600">{card.description}</p>
  </div>
);

export default InfoCard;