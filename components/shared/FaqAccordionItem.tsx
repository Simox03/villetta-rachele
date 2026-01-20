/**
 * @file components/shared/FaqAccordionItem.tsx
 * @purpose A single, collapsible item for the FAQ section.
 */
import React from 'react';
import type { FaqItem } from '../../types';

interface FaqAccordionItemProps {
    faq: FaqItem;
    isOpen: boolean;
    onClick: () => void;
}

const FaqAccordionItem: React.FC<FaqAccordionItemProps> = ({ faq, isOpen, onClick }) => (
    <div className="border-b border-slate-200 py-4">
        <button onClick={onClick} className="w-full flex justify-between items-center text-left text-lg font-semibold text-slate-800 hover:text-teal-600 focus:outline-none">
            <span>{faq.question}</span>
            <svg className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <div style={{ transition: 'max-height 0.5s ease-in-out, margin-top 0.5s ease-in-out' }} className={`overflow-hidden ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
            <p className="text-slate-600 pr-4">{faq.answer}</p>
        </div>
    </div>
);

export default FaqAccordionItem;