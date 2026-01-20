
/**
 * @file components/landing/HeroSection.tsx
 * @purpose Renders the main "hero" section at the top of the landing page with the primary image and call-to-action buttons.
 */
import React, { useState } from 'react';
import { INITIAL_SITE_CONTENT } from '../../data/siteContent';

interface HeroSectionProps {
    heroImage: string;
    content: typeof INITIAL_SITE_CONTENT['hero'];
}

const HeroSection: React.FC<HeroSectionProps> = ({ heroImage, content }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activePlatform, setActivePlatform] = useState('');

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.replace('#', '');
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const handleBookingClick = (e: React.MouseEvent<HTMLAnchorElement>, platform: string) => {
        e.preventDefault();
        setActivePlatform(platform);
        setIsModalOpen(true);
    };

    return (
        <section
            id="home"
            className="relative h-screen flex items-center justify-center text-center text-white bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url('${heroImage}')` }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="relative z-10 p-4">
                <h1 className="text-6xl md:text-8xl font-bold font-serif mb-4 animate-fade-in-down drop-shadow-lg">{content.title}</h1>
                <p className="text-lg md:text-2xl max-w-3xl mx-auto mb-8 animate-fade-in-up drop-shadow-md font-light">
                    {content.subtitle}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <a
                        href="#availability"
                        onClick={(e) => handleNavClick(e, '#availability')}
                        className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center gap-2 shadow-lg hover:shadow-teal-500/50 transform hover:-translate-y-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        {content.cta1}
                    </a>
                    <a
                        href="#contact"
                        onClick={(e) => handleNavClick(e, '#contact')}
                        className="bg-white hover:bg-gray-200 text-teal-600 font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center gap-2 shadow-lg transform hover:-translate-y-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        {content.cta2}
                    </a>
                </div>
                <div className="mt-8 flex flex-wrap justify-center gap-4 opacity-90 hover:opacity-100 transition-opacity">
                    <a
                        href="#"
                        onClick={(e) => handleBookingClick(e, 'Booking.com')}
                        className="bg-blue-600/90 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md text-sm flex items-center gap-2 shadow-md backdrop-blur-sm"
                    >
                        {content.bookingLinkText}
                    </a>
                    <a
                        href="#"
                        onClick={(e) => handleBookingClick(e, 'Airbnb')}
                        className="bg-rose-500/90 hover:bg-rose-500 text-white font-semibold py-2 px-4 rounded-md text-sm flex items-center gap-2 shadow-md backdrop-blur-sm"
                    >
                        {content.airbnbLinkText}
                    </a>
                </div>
            </div>
            <a
                href="#property"
                onClick={(e) => handleNavClick(e, '#property')}
                className="absolute bottom-10 animate-bounce p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
                <svg className="w-8 h-8 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </a>

            {/* Coming Soon Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-slate-800 animate-scale-up">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-3 rounded-xl ${activePlatform === 'Booking.com' ? 'bg-blue-50 text-blue-600' : 'bg-rose-50 text-rose-600'}`}>
                                {activePlatform === 'Booking.com' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" /><path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" /><path d="M13 13h4" /><path d="M13 17h4" /><path d="M15 7v2" /></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 21v-8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8" /><path d="M14 21v-8a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v8" /><path d="M2.5 9h19" /><path d="M12 3v18" /></svg>
                                )}
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </div>

                        <h3 className="text-2xl font-bold mb-3 font-serif">Prossimamente!</h3>
                        <p className="text-slate-600 leading-relaxed mb-8">
                            Villetta Rachele sarà presto prenotabile su <span className="font-semibold">{activePlatform}</span>.
                            Nel frattempo, vi invitiamo a contattarci direttamente per informazioni e prenotazioni.
                            Saremo lieti di assistervi personalmente!
                        </p>

                        <div className="space-y-3">
                            <button
                                onClick={(e: any) => {
                                    setIsModalOpen(false);
                                    handleNavClick(e, '#contact');
                                }}
                                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-teal-500/25 active:scale-95"
                            >
                                Contattaci Ora
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-3 px-6 rounded-xl transition-all active:scale-95"
                            >
                                Chiudi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default HeroSection;
