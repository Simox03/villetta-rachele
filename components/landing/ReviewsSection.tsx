/**
 * @file components/landing/ReviewsSection.tsx
 * @purpose Displays approved customer reviews in a carousel and provides a form to submit new ones.
 */
import React, { useState, useRef, useMemo, useEffect } from 'react';
import type { Review } from '../../types';
import { INITIAL_SITE_CONTENT } from '../../data/siteContent';
import StarRating from '../shared/StarRating';
import StarIcon from '../shared/StarIcon';
import { useOnScreen } from '../../hooks/useOnScreen';

interface ReviewsSectionProps {
    reviews: Review[];
    onReviewSubmit: (review: Omit<Review, 'id'|'submittedAt'|'approved'>) => void;
    content: typeof INITIAL_SITE_CONTENT['reviews'];
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, onReviewSubmit, content }) => {
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [showNavButtons, setShowNavButtons] = useState(false);

    const sectionRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(sectionRef, '-100px');

    const approvedReviews = useMemo(() => reviews.filter(r => r.approved), [reviews]);
    
    const averageRating = useMemo(() => {
        if (approvedReviews.length === 0) return 0;
        const total = approvedReviews.reduce((acc, review) => acc + review.rating, 0);
        return total / approvedReviews.length;
    }, [approvedReviews]);

    useEffect(() => {
        const checkScrollable = () => {
            const container = scrollContainerRef.current;
            if (container) {
                setShowNavButtons(container.scrollWidth > container.clientWidth);
            }
        };

        // A slight delay to ensure content is rendered before checking
        const timer = setTimeout(checkScrollable, 100);
        window.addEventListener('resize', checkScrollable);
        
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', checkScrollable);
        };
    }, [approvedReviews]);

    const handleScroll = (direction: 'left' | 'right') => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollAmount = container.offsetWidth * 0.9; // Scroll by 90% of the visible width
            container.scrollBy({ 
                left: direction === 'left' ? -scrollAmount : scrollAmount, 
                behavior: 'smooth' 
            });
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !comment || rating === 0) {
            alert('Per favore, compila tutti i campi e seleziona una valutazione.');
            return;
        }
        onReviewSubmit({ name, comment, rating });
        
        setName('');
        setComment('');
        setRating(0);
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setIsFormOpen(false);
        }, 3000);
    };

    return (
        <section id="reviews" className="py-20 bg-white scroll-mt-24" ref={sectionRef}>
            <div className={`container mx-auto px-6 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 font-serif">{content.title}</h2>
                    <p className="text-lg text-slate-600 mb-8">{content.description}</p>
                </div>

                {approvedReviews.length > 0 && (
                    <div className="text-center mb-10">
                        <div className="flex items-center justify-center gap-2">
                             <span className="text-4xl font-bold text-slate-800">{averageRating.toFixed(1)}</span>
                             <StarRating rating={averageRating} />
                        </div>
                         <p className="text-slate-600">Basato su {approvedReviews.length} recensioni</p>
                    </div>
                )}
                
                {approvedReviews.length > 0 ? (
                    <div className="relative max-w-6xl mx-auto">
                        <div 
                            ref={scrollContainerRef}
                            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth py-4 gap-6 scrollbar-hide"
                        >
                            {approvedReviews.map(review => (
                                <div key={review.id} className="snap-center flex-shrink-0 w-[90%] sm:w-1/2 lg:w-1/3">
                                    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 h-full flex flex-col justify-between">
                                        <div>
                                            <StarRating rating={review.rating} />
                                            <p className="text-slate-700 italic my-4 flex-grow">"{review.comment}"</p>
                                        </div>
                                        <p className="text-right font-semibold text-slate-800">- {review.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                         {showNavButtons && (
                            <>
                                <button onClick={() => handleScroll('left')} aria-label="Recensione precedente" className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-3 rounded-full shadow-md transition z-10 hidden sm:block">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="m15 18-6-6 6-6"/></svg>
                                </button>
                                <button onClick={() => handleScroll('right')} aria-label="Recensione successiva" className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-3 rounded-full shadow-md transition z-10 hidden sm:block">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="m9 18 6-6-6-6"/></svg>
                                </button>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="bg-slate-50 p-6 rounded-lg text-center max-w-md mx-auto">
                        <p className="text-slate-600">Non ci sono ancora recensioni.</p>
                    </div>
                )}
                
                <div className="text-center mt-12">
                    <button 
                        onClick={() => setIsFormOpen(true)}
                        className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                        {content.formTitle}
                    </button>
                </div>
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setIsFormOpen(false)}>
                    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold text-slate-800">{content.formTitle}</h3>
                            <button onClick={() => setIsFormOpen(false)} aria-label="Chiudi" className="text-slate-500 hover:text-slate-800 text-3xl leading-none">&times;</button>
                        </div>
                        <p className="text-slate-600 mb-6">{content.formDescription}</p>
                         <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="review-name" className="block text-slate-700 font-semibold mb-2">Il tuo nome</label>
                                <input type="text" id="review-name" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-slate-700 font-semibold mb-2">Valutazione</label>
                                <div className="flex items-center" onMouseLeave={() => setHoverRating(0)}>
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <StarIcon 
                                            key={star}
                                            filled={(hoverRating || rating) >= star}
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            className="w-8 h-8 text-yellow-400"
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="review-comment" className="block text-slate-700 font-semibold mb-2">Commento</label>
                                <textarea id="review-comment" value={comment} onChange={e => setComment(e.target.value)} required rows={4} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">Invia Recensione</button>
                             {isSubmitted && <p className="text-green-600 font-semibold mt-4 text-center">Grazie! La tua recensione è stata inviata per l'approvazione.</p>}
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ReviewsSection;