/**
 * @file components/landing/Footer.tsx
 * @purpose Renders the site's footer with contact details, social links, and copyright info.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { INITIAL_SITE_CONTENT } from '../../data/siteContent';

interface FooterProps {
    content: typeof INITIAL_SITE_CONTENT['footer'];
    contact: typeof INITIAL_SITE_CONTENT['contact'];
}

const Footer: React.FC<FooterProps> = ({ content, contact }) => (
    <footer className="bg-teal-600 text-white pt-12 pb-8 relative overflow-hidden">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                    <h3 className="text-2xl font-bold font-serif mb-2">{content.brandName}</h3>
                    <p className="text-teal-100">{content.brandSlogan}</p>
                    <Link to="/admin" className="text-xs text-teal-300 hover:text-white mt-4 inline-block">Area Riservata</Link>
                </div>
                <div>
                    <h4 className="font-bold text-lg mb-2">{content.contactTitle}</h4>
                    <ul className="text-teal-100 space-y-1">
                        <li>{contact.email}</li>
                        <li>{contact.phone}</li>
                        <li>Punta Prosciutto, LE</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-lg mb-2">{content.socialTitle}</h4>
                     <div className="flex justify-center md:justify-start gap-4">
                        <a href={content.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Seguici su Facebook" className="text-teal-100 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                        <a href={content.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Seguici su Instagram" className="text-teal-100 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                    </div>
                </div>
            </div>
            <div className="border-t border-teal-500 mt-8 pt-6 text-center text-sm text-teal-200">
                <p>{content.copyright}</p>
            </div>
        </div>
    </footer>
);

export default Footer;