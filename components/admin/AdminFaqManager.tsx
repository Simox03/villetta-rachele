/**
 * @file components/admin/AdminFaqManager.tsx
 * @purpose The admin panel for adding and deleting FAQ items.
 */
import React, { useState } from 'react';
import type { FaqItem } from '../../types';

interface AdminFaqManagerProps {
    faqs: FaqItem[];
    setFaqs: (faqs: FaqItem[]) => void;
}

const AdminFaqManager: React.FC<AdminFaqManagerProps> = ({ faqs, setFaqs }) => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleAddFaq = (e: React.FormEvent) => {
        e.preventDefault();
        if (!question || !answer) return;
        const newFaq: FaqItem = {
            id: Date.now(),
            question,
            answer
        };
        const newFaqs = [newFaq, ...faqs];
        setFaqs(newFaqs);
        setQuestion('');
        setAnswer('');
    };
    
    const handleDeleteFaq = (id: number) => {
        if(window.confirm('Sei sicuro di voler eliminare questa FAQ?')) {
            const newFaqs = faqs.filter(faq => faq.id !== id);
            setFaqs(newFaqs);
        }
    };
    
    return (
        <div>
            <h3 className="text-2xl font-bold mb-4">Gestione Domande Frequenti (FAQ)</h3>
             <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-8">
                 <h4 className="text-xl font-semibold mb-3">Aggiungi Nuova FAQ</h4>
                 <form onSubmit={handleAddFaq}>
                    <div className="mb-4">
                        <label htmlFor="faq-q" className="block text-slate-700 font-semibold mb-1">Domanda</label>
                        <input id="faq-q" type="text" value={question} onChange={e => setQuestion(e.target.value)} required className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white text-slate-900" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="faq-a" className="block text-slate-700 font-semibold mb-1">Risposta</label>
                        <textarea id="faq-a" value={answer} onChange={e => setAnswer(e.target.value)} required rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white text-slate-900" />
                    </div>
                    <button type="submit" className="w-full md:w-auto bg-teal-500 text-white py-2 px-6 rounded-md hover:bg-teal-600">Aggiungi FAQ</button>
                 </form>
             </div>
             
             <div className="space-y-4">
                <h4 className="text-xl font-semibold mb-3">FAQ Esistenti</h4>
                {faqs && faqs.length > 0 ? faqs.map(faq => (
                    <div key={faq.id} className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-bold text-slate-800">{faq.question}</p>
                                <p className="text-slate-600 mt-1">{faq.answer}</p>
                            </div>
                            <button onClick={() => handleDeleteFaq(faq.id)} className="text-red-500 hover:text-red-700 text-sm font-semibold ml-4 flex-shrink-0">Elimina</button>
                        </div>
                    </div>
                )) : (
                    <p className="text-slate-500">Nessuna FAQ trovata.</p>
                )}
             </div>
        </div>
    );
};

export default AdminFaqManager;