/**
 * @file components/admin/AdminRequests.tsx
 * @purpose The admin panel for viewing and deleting booking requests, contact messages, and user questions.
 */
import React from 'react';
import type { ContactSubmission, BookingRequest, UserQuestion } from '../../types';

interface AdminRequestsProps {
    contactSubmissions: ContactSubmission[];
    bookingRequests: BookingRequest[];
    userQuestions: UserQuestion[];
    deleteContactSubmission: (id: number) => void;
    deleteBookingRequest: (id: number) => void;
    deleteUserQuestion: (id: number) => void;
}

const AdminRequests: React.FC<AdminRequestsProps> = ({ contactSubmissions, bookingRequests, userQuestions, deleteContactSubmission, deleteBookingRequest, deleteUserQuestion }) => (
    <div>
        <h3 className="text-2xl font-bold mb-4">Richieste Ricevute</h3>
        
        <div className="mb-8">
            <h4 className="text-xl font-semibold mb-3">Richieste di Prenotazione ({bookingRequests.length})</h4>
            {bookingRequests.length > 0 ? (
                 <div className="space-y-4">
                    {bookingRequests.map(req => (
                        <div key={req.id} className="bg-white p-4 rounded-lg shadow-sm border">
                           <div className="flex justify-between items-start">
                                <div>
                                    <p><strong>Nome:</strong> {req.name} (<a href={`mailto:${req.email}`} className="text-teal-600 hover:underline">{req.email}</a>)</p>
                                    <p><strong>Periodo:</strong> {req.checkIn.toLocaleDateString('it-IT')} - {req.checkOut.toLocaleDateString('it-IT')} ({req.nights} notti)</p>
                                    <p><strong>Totale Preventivato:</strong> €{req.totalPrice}</p>
                                    <p className="text-xs text-slate-500">Inviata il: {req.submittedAt.toLocaleString('it-IT')}</p>
                                </div>
                                <button onClick={() => deleteBookingRequest(req.id)} className="text-red-500 hover:text-red-700 text-sm font-semibold">Elimina</button>
                           </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-slate-500">Nessuna richiesta di prenotazione ricevuta.</p>
            )}
        </div>
        
        <div className="mb-8">
            <h4 className="text-xl font-semibold mb-3">Messaggi dal Form Contatti ({contactSubmissions.length})</h4>
             {contactSubmissions.length > 0 ? (
                 <div className="space-y-4">
                    {contactSubmissions.map(sub => (
                        <div key={sub.id} className="bg-white p-4 rounded-lg shadow-sm border">
                           <div className="flex justify-between items-start">
                               <div>
                                    <p><strong>Nome:</strong> {sub.name} (<a href={`mailto:${sub.email}`} className="text-teal-600 hover:underline">{sub.email}</a>)</p>
                                    {sub.phone && <p><strong>Telefono:</strong> {sub.phone}</p>}
                                    <p className="mt-2 bg-slate-50 p-3 rounded-md text-slate-700">{sub.message}</p>
                                    <p className="text-xs text-slate-500 mt-2">Inviato il: {sub.submittedAt.toLocaleString('it-IT')}</p>
                               </div>
                               <button onClick={() => deleteContactSubmission(sub.id)} className="text-red-500 hover:text-red-700 text-sm font-semibold">Elimina</button>
                           </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-slate-500">Nessun messaggio ricevuto.</p>
            )}
        </div>

        <div>
            <h4 className="text-xl font-semibold mb-3">Domande degli Utenti dalla FAQ ({userQuestions.length})</h4>
             {userQuestions.length > 0 ? (
                 <div className="space-y-4">
                    {userQuestions.map(q => (
                        <div key={q.id} className="bg-white p-4 rounded-lg shadow-sm border">
                           <div className="flex justify-between items-start">
                               <div>
                                    <p><strong>Email:</strong> <a href={`mailto:${q.email}`} className="text-teal-600 hover:underline">{q.email}</a></p>
                                    <p className="mt-2 bg-slate-50 p-3 rounded-md text-slate-700">{q.question}</p>
                                    <p className="text-xs text-slate-500 mt-2">Inviato il: {q.submittedAt.toLocaleString('it-IT')}</p>
                               </div>
                               <button onClick={() => deleteUserQuestion(q.id)} className="text-red-500 hover:text-red-700 text-sm font-semibold">Elimina</button>
                           </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-slate-500">Nessuna domanda ricevuta.</p>
            )}
        </div>
    </div>
);

export default AdminRequests;