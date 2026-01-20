/**
 * @file components/landing/FaqSection.tsx
 * @purpose Displays frequently asked questions in an accordion and includes a form for users to ask new questions.
 */
import React, { useState, useRef } from 'react';
import type { UserQuestion } from '../../types';
import { INITIAL_SITE_CONTENT } from '../../data/siteContent';
import FaqAccordionItem from '../shared/FaqAccordionItem';
import { useOnScreen } from '../../hooks/useOnScreen';

interface FaqSectionProps {
    onQuestionSubmit: (submission: Omit<UserQuestion, 'id' | 'submittedAt'>) => void;
    content: typeof INITIAL_SITE_CONTENT['faq'];
}

const FaqSection: React.FC<FaqSectionProps> = ({ onQuestionSubmit, content }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [email, setEmail] = useState('');
    const [question, setQuestion] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(sectionRef, '-100px');
    
    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !question) return;
        onQuestionSubmit({ email, question });
        setEmail('');
        setQuestion('');
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    return (
        <section id="faq" className="py-20 bg-slate-50 scroll-mt-24" ref={sectionRef}>
            <div className={`container mx-auto px-6 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                 <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 text-center font-serif">{content.title}</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-12 text-center">
                    {content.description}
                </p>
                <div className="grid md:grid-cols-5 gap-12">
                    <div className="md:col-span-3">
                        {content.data.map((faq, index) => (
                            <FaqAccordionItem key={faq.id} faq={faq} isOpen={openIndex === index} onClick={() => handleToggle(index)} />
                        ))}
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-lg md:col-span-2">
                        <h3 className="text-2xl font-bold text-slate-800 mb-4">{content.formTitle}</h3>
                        <p className="text-slate-600 mb-6">{content.formDescription}</p>
                         <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="faq-email" className="block text-slate-700 font-semibold mb-2">La tua email</label>
                                <input type="email" id="faq-email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-slate-900" />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="faq-question" className="block text-slate-700 font-semibold mb-2">La tua domanda</label>
                                <textarea id="faq-question" value={question} onChange={e => setQuestion(e.target.value)} required rows={3} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-slate-900"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">Invia Domanda</button>
                             {isSubmitted && <p className="text-green-600 font-semibold mt-4 text-center">Domanda inviata con successo!</p>}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FaqSection;