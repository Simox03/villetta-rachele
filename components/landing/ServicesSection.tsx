/**
 * @file components/landing/ServicesSection.tsx
 * @purpose Showcases the services and amenities offered at the villa.
 */
import React, { useRef } from 'react';
import { INITIAL_SITE_CONTENT } from '../../data/siteContent';
import type { ServiceData } from '../../types';
import ServiceCard from '../shared/ServiceCard';
import { useOnScreen } from '../../hooks/useOnScreen';

interface ServicesSectionProps {
    content: typeof INITIAL_SITE_CONTENT['services'];
    services: ServiceData[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ content, services }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(sectionRef, '-100px');

    return (
        <section id="services" className="py-20 bg-slate-50 scroll-mt-24" ref={sectionRef}>
            <div className={`container mx-auto px-6 text-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 font-serif">{content.title}</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-12">{content.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {services.map((service, index) => <ServiceCard key={index} service={service} />)}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;