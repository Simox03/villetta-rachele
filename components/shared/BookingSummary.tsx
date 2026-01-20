/**
 * @file components/shared/BookingSummary.tsx
 * @purpose A side panel component summarizing booking details and collecting user information to confirm a reservation request.
 */
import React, { useState } from 'react';

interface BookingSummaryProps {
    checkIn: Date,
    checkOut: Date,
    nights: number,
    totalPrice: number, 
    onConfirm: (name: string, email: string) => void,
    onClose: () => void
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ checkIn, checkOut, nights, totalPrice, onConfirm, onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(name && email) {
            onConfirm(name, email);
        }
    }
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end" onClick={onClose}>
            <div className="bg-white w-full max-w-md h-full shadow-2xl p-8 transform transition-transform translate-x-0" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-slate-800 font-serif">Conferma Prenotazione</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800">&times;</button>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg mb-6">
                     <p><strong>Check-in:</strong> {checkIn.toLocaleDateString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                     <p><strong>Check-out:</strong> {checkOut.toLocaleDateString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                     <hr className="my-2"/>
                     <p><strong>Durata:</strong> {nights} notti</p>
                     <p className="text-2xl font-bold mt-2">Totale: <span className="text-teal-600">€{totalPrice}</span></p>
                </div>
                <form onSubmit={handleSubmit}>
                     <div className="mb-4">
                        <label htmlFor="book-name" className="block text-slate-700 font-semibold mb-2">Il tuo nome</label>
                        <input type="text" id="book-name" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-slate-900" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="book-email" className="block text-slate-700 font-semibold mb-2">La tua email</label>
                        <input type="email" id="book-email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-slate-900" />
                    </div>
                    <p className="text-xs text-slate-500 mb-6">Riceverai una mail di conferma con i dettagli per il pagamento. La prenotazione è confermata solo dopo il versamento della caparra.</p>
                    <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">Conferma Richiesta</button>
                </form>
            </div>
        </div>
    )
}

export default BookingSummary;