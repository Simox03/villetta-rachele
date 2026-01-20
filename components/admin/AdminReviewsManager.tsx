/**
 * @file components/admin/AdminReviewsManager.tsx
 * @purpose The admin panel for approving and deleting user-submitted reviews.
 */
import React from 'react';
import type { Review } from '../../types';
import StarRating from '../shared/StarRating';

interface AdminReviewsManagerProps {
    reviews: Review[];
    onApprove: (id: number) => void;
    onDelete: (id: number) => void;
}

const AdminReviewsManager: React.FC<AdminReviewsManagerProps> = ({ reviews, onApprove, onDelete }) => {
    const pendingReviews = reviews.filter(r => !r.approved).sort((a,b) => b.submittedAt.getTime() - a.submittedAt.getTime());
    const approvedReviews = reviews.filter(r => r.approved).sort((a,b) => b.submittedAt.getTime() - a.submittedAt.getTime());

    return (
        <div>
            <h3 className="text-2xl font-bold mb-4">Gestione Recensioni</h3>

            <div className="mb-12">
                <h4 className="text-xl font-semibold mb-3 border-b pb-2">In attesa di approvazione ({pendingReviews.length})</h4>
                {pendingReviews.length > 0 ? (
                    <div className="space-y-4 mt-4">
                        {pendingReviews.map(review => (
                            <div key={review.id} className="bg-white p-4 rounded-lg shadow-sm border border-yellow-300">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center mb-1">
                                            <StarRating rating={review.rating} />
                                            <strong className="ml-2">{review.name}</strong>
                                        </div>
                                        <p className="text-slate-600 italic">"{review.comment}"</p>
                                        <p className="text-xs text-slate-500 mt-2">Inviata il: {review.submittedAt.toLocaleString('it-IT')}</p>
                                    </div>
                                    <div className="flex flex-col md:flex-row items-center gap-2 flex-shrink-0 ml-4">
                                        <button onClick={() => onApprove(review.id)} className="bg-green-500 text-white text-sm py-1 px-3 rounded-md hover:bg-green-600">Approva</button>
                                        <button onClick={() => onDelete(review.id)} className="bg-red-500 text-white text-sm py-1 px-3 rounded-md hover:bg-red-600">Elimina</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : <p className="text-slate-500 mt-4">Nessuna recensione in attesa.</p>}
            </div>
            
            <div>
                <h4 className="text-xl font-semibold mb-3 border-b pb-2">Recensioni Approvate ({approvedReviews.length})</h4>
                {approvedReviews.length > 0 ? (
                     <div className="space-y-4 mt-4">
                        {approvedReviews.map(review => (
                            <div key={review.id} className="bg-white p-4 rounded-lg shadow-sm border">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center mb-1">
                                            <StarRating rating={review.rating} />
                                            <strong className="ml-2">{review.name}</strong>
                                        </div>
                                        <p className="text-slate-600 italic">"{review.comment}"</p>
                                        <p className="text-xs text-slate-500 mt-2">Inviata il: {review.submittedAt.toLocaleString('it-IT')}</p>
                                    </div>
                                     <button onClick={() => onDelete(review.id)} className="bg-red-500 text-white text-sm py-1 px-3 rounded-md hover:bg-red-600 flex-shrink-0 ml-4">Elimina</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : <p className="text-slate-500 mt-4">Nessuna recensione approvata.</p>}
            </div>
        </div>
    );
};

export default AdminReviewsManager;