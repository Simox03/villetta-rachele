/**
 * @file components/landing/ContactSection.tsx
 * @purpose Renders the contact information and a form for general inquiries.
 */
import React, { useState, useRef } from 'react';
import type { ContactSubmission } from '../../types';
import { INITIAL_SITE_CONTENT } from '../../data/siteContent';
import { useOnScreen } from '../../hooks/useOnScreen';

interface ContactSectionProps {
    onFormSubmit: (submission: Omit<ContactSubmission, 'id' | 'submittedAt'>) => void;
    content: typeof INITIAL_SITE_CONTENT['contact'];
}

const ContactSection: React.FC<ContactSectionProps> = ({ onFormSubmit, content }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(sectionRef, '-100px');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !message) {
            alert('Per favore, compila tutti i campi obbligatori.');
            return;
        }
        onFormSubmit({ name, email, phone, message });
        
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    return (
        <section id="contact" className="py-20 bg-slate-50 scroll-mt-24" ref={sectionRef}>
            <div className={`container mx-auto px-6 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 font-serif">{content.title}</h2>
                        <p className="text-lg text-slate-600 mb-8">{content.description}</p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-slate-700">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-teal-600"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                                <a href={`mailto:${content.email}`} className="hover:text-teal-600">{content.email}</a>
                            </div>
                            <div className="flex items-center gap-4 text-slate-700">
                               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-teal-600"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                <a href={`tel:${content.phone}`} className="hover:text-teal-600">{content.phone}</a>
                            </div>
                            <div className="flex items-center gap-4 text-slate-700">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-teal-600"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                <span>{content.address}</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-slate-700 font-semibold mb-2">Il tuo nome</label>
                                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-slate-900" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-slate-700 font-semibold mb-2">La tua email</label>
                                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-slate-900" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-slate-700 font-semibold mb-2">Telefono</label>
                                <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-slate-900" />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="message" className="block text-slate-700 font-semibold mb-2">Il tuo messaggio</label>
                                <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} required rows={4} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-slate-900" placeholder="Il tuo messaggio o richiesta di disponibilità..."></textarea>
                            </div>
                            <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">Invia Richiesta</button>
                             {isSubmitted && <p className="text-green-600 font-semibold mt-4 text-center">Richiesta inviata con successo!</p>}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;