/**
 * @file components/shared/ServiceCard.tsx
 * @purpose A reusable card component for displaying a service with an icon.
 */
import React from 'react';
import type { ServiceData } from '../../types';

const ServiceCard: React.FC<{ service: ServiceData }> = ({ service }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center border border-slate-200 transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
        {service.icon}
        <h3 className="text-lg font-semibold text-slate-700 mt-4">{service.title}</h3>
    </div>
);

export default ServiceCard;