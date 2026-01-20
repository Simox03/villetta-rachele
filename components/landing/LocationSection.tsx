
/**
 * @file components/landing/LocationSection.tsx
 * @purpose Shows the villa's location, a map, and nearby points of interest.
 */
import React, { useRef } from 'react';
import { INITIAL_SITE_CONTENT } from '../../data/siteContent';
import { useOnScreen } from '../../hooks/useOnScreen';

interface LocationSectionProps {
    content: typeof INITIAL_SITE_CONTENT['location'];
}

const LocationSection: React.FC<LocationSectionProps> = ({ content }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(sectionRef, '-100px');
    
    return (
        <section id="location" className="py-20 bg-white scroll-mt-24" ref={sectionRef}>
            <div className={`container mx-auto px-6 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 font-serif">{content.title}</h2>
                        <p className="text-lg text-slate-600 mb-6">
                            {content.description}
                        </p>
                        <h3 className="text-2xl font-semibold text-slate-700 mb-4">{content.nearbyTitle}</h3>
                        <ul className="list-disc list-inside text-slate-600 space-y-2 mb-8">
                            {content.places.map(place => (
                               <li key={place.name}>{place.name}: <strong>{place.distance}</strong></li>
                            ))}
                        </ul>
                        <a href={content.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                            {content.mapButtonText}
                        </a>
                    </div>
                    {/* Interattive Google Maps Iframe */}
                    <div className="rounded-lg overflow-hidden shadow-2xl h-[450px] border border-slate-100">
                        <iframe 
                            src={content.mapEmbedUrl} 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen={true} 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mappa Villetta Rachele"
                            className="grayscale hover:grayscale-0 transition-all duration-500"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LocationSection;
