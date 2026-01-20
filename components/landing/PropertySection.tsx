/**
 * @file components/landing/PropertySection.tsx
 * @purpose Displays key features and information about the villa property.
 */
import React, { useRef } from 'react';
import { INITIAL_SITE_CONTENT } from '../../data/siteContent';
import type { InfoCardData } from '../../types';
import InfoCard from '../shared/InfoCard';
import { useOnScreen } from '../../hooks/useOnScreen';

interface PropertySectionProps {
    content: typeof INITIAL_SITE_CONTENT['property'];
    cards: InfoCardData[];
}

const PropertySection: React.FC<PropertySectionProps> = ({ content, cards }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(sectionRef, '-100px');

    return (
      <section id="property" className="py-20 bg-white scroll-mt-24" ref={sectionRef}>
        <div 
          className={`container mx-auto px-6 text-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 font-serif">{content.title}</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-12">
            {content.description}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {cards.map((card, index) => <InfoCard key={index} card={card} />)}
          </div>
        </div>
      </section>
    );
};

export default PropertySection;