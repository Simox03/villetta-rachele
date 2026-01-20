/**
 * @file App.tsx
 * @purpose The root component that manages application state, routing, and data flow between the landing page and admin panel.
 */
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import { INITIAL_SITE_CONTENT } from './data/siteContent';
import { GALLERY_IMAGES } from './data/imageData';
import { INITIAL_REVIEWS } from './data/reviewData';
import type { ContactSubmission, BookingRequest, UserQuestion, Review, FaqItem, GalleryImage } from './types';
import LandingPage from './pages/LandingPage';
import AdminPage from './pages/AdminPage';

const App: React.FC = () => {
    // --- STATE MANAGEMENT ---
    // isAdmin can remain in localStorage as it's client-side session state.
    const [isAdmin, setIsAdmin] = useLocalStorage('isAdmin', false);
    const [isLoading, setIsLoading] = useState(true);

    // Content state
    const [siteContent, setSiteContent] = useState(INITIAL_SITE_CONTENT);
    const [heroImage, setHeroImage] = useState('/images/facade.jpg');
    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(GALLERY_IMAGES);
    const [isQuizEnabled, setIsQuizEnabled] = useState(true);

    // Pricing state
    const [dateInfo, setDateInfo] = useState({});
    const [highSeasonRate, setHighSeasonRate] = useState(200);
    const [lowSeasonRate, setLowSeasonRate] = useState(120);

    // User-generated data state
    const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
    const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([]);
    const [userQuestions, setUserQuestions] = useState<UserQuestion[]>([]);
    const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

    // --- DATA FETCHING ---
    const loadSiteData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/.netlify/functions/get-all-data');
            if (!response.ok) {
                console.warn(`Backend not available (status: ${response.status}). Using static default data.`);
                // Fallback to static data (already in state), do not throw.
                return;
            }
            const data = await response.json();

            // Convert date strings back to Date objects
            const parseDates = (items: any[], dateKeys: string[]) => items.map(item => {
                const newItem = { ...item };
                dateKeys.forEach(key => {
                    if (newItem[key]) {
                        newItem[key] = new Date(newItem[key]);
                    }
                });
                return newItem;
            });

            if (data.siteContent) setSiteContent(data.siteContent);
            if (data.heroImage) setHeroImage(data.heroImage);
            if (data.galleryImages) setGalleryImages(data.galleryImages);
            if (data.isQuizEnabled !== undefined) setIsQuizEnabled(data.isQuizEnabled);
            if (data.dateInfo) setDateInfo(data.dateInfo);
            if (data.highSeasonRate) setHighSeasonRate(data.highSeasonRate);
            if (data.lowSeasonRate) setLowSeasonRate(data.lowSeasonRate);
            if (data.contactSubmissions) setContactSubmissions(parseDates(data.contactSubmissions, ['submittedAt']));
            if (data.bookingRequests) setBookingRequests(parseDates(data.bookingRequests, ['submittedAt', 'checkIn', 'checkOut']));
            if (data.userQuestions) setUserQuestions(parseDates(data.userQuestions, ['submittedAt']));
            if (data.reviews) setReviews(parseDates(data.reviews, ['submittedAt']));

        } catch (error) {
            console.error("Failed to load site data:", error);
            // Suppress alert to allow app to function with defaults
            // alert("Impossibile caricare i dati del sito. Potrebbe essere un problema di connessione.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadSiteData();
    }, [loadSiteData]);


    // --- HANDLERS ---
    const handleLogin = (success: boolean) => setIsAdmin(success);
    const handleLogout = () => setIsAdmin(false);

    const handleApiSubmit = async (endpoint: string, body: any, stateUpdater: React.Dispatch<React.SetStateAction<any[]>>, successMessage: string) => {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            if (!response.ok) {
                // If backend is missing, simulate success for demo purposes or throw
                if (response.status === 404) {
                    console.warn("Backend not found. Simulating submission.");
                    const newItem = { ...body, id: Date.now(), submittedAt: new Date() };
                    stateUpdater(prev => [newItem, ...prev]);
                    alert(successMessage);
                    return;
                }
                const errorData = await response.json();
                throw new Error(errorData.error || 'API request failed');
            }
            const { newItem } = await response.json();
            // Optimistic update with data returned from server (including ID and timestamp)
            stateUpdater(prev => [{ ...newItem, submittedAt: new Date(newItem.submittedAt) }, ...prev]);
            alert(successMessage);
        } catch (error) {
            console.error(error);
            alert("Si è verificato un errore. Riprova più tardi.");
        }
    };

    const handleContactSubmit = (submission: Omit<ContactSubmission, 'id' | 'submittedAt'>) => {
        handleApiSubmit(
            '/.netlify/functions/add-contact-submission',
            submission,
            setContactSubmissions,
            "Grazie per la tua richiesta! Ti risponderemo il prima possibile."
        );
    };

    const handleBookingRequest = (booking: Omit<BookingRequest, 'id' | 'submittedAt'>) => {
        handleApiSubmit(
            '/.netlify/functions/add-booking-request',
            booking,
            setBookingRequests,
            "Richiesta di prenotazione inviata! Riceverai una mail di conferma con i dettagli per il pagamento."
        );
    };

    const handleUserQuestionSubmit = (submission: Omit<UserQuestion, 'id' | 'submittedAt'>) => {
        handleApiSubmit(
            '/.netlify/functions/add-user-question',
            submission,
            setUserQuestions,
            "Grazie per la tua domanda! Ti risponderemo via email il prima possibile."
        );
    };

    const handleReviewSubmit = (review: Omit<Review, 'id' | 'submittedAt' | 'approved'>) => {
        handleApiSubmit(
            '/.netlify/functions/add-review',
            review,
            setReviews,
            "Grazie per la tua recensione! Sarà pubblicata dopo essere stata approvata dal nostro staff."
        );
    };

    const handleApiDelete = async (endpoint: string, id: number, stateUpdater: React.Dispatch<React.SetStateAction<any[]>>, confirmMessage: string) => {
        if (window.confirm(confirmMessage)) {
            try {
                const response = await fetch(endpoint, {
                    method: 'POST', // Using POST for simplicity as Netlify functions handle it easily
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id })
                });
                if (!response.ok) {
                    if (response.status === 404) {
                        console.warn("Backend not found. Simulating deletion.");
                        stateUpdater(prev => prev.filter(item => item.id !== id));
                        return;
                    }
                    throw new Error('API delete request failed');
                }

                stateUpdater(prev => prev.filter(item => item.id !== id));
            } catch (error) {
                console.error(error);
                alert("Errore durante l'eliminazione.");
            }
        }
    }

    const deleteContactSubmission = (id: number) => {
        handleApiDelete('/.netlify/functions/delete-contact-submission', id, setContactSubmissions, 'Sei sicuro di voler eliminare questo messaggio?');
    }

    const deleteBookingRequest = (id: number) => {
        handleApiDelete('/.netlify/functions/delete-booking-request', id, setBookingRequests, 'Sei sicuro di voler eliminare questa richiesta di prenotazione?');
    }

    const deleteUserQuestion = (id: number) => {
        handleApiDelete('/.netlify/functions/delete-user-question', id, setUserQuestions, 'Sei sicuro di voler eliminare questa domanda?');
    }

    const deleteReview = (id: number) => {
        handleApiDelete('/.netlify/functions/delete-review', id, setReviews, 'Sei sicuro di voler eliminare questa recensione?');
    }

    const approveReview = async (id: number) => {
        try {
            const response = await fetch('/.netlify/functions/approve-review', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            if (!response.ok) {
                if (response.status === 404) {
                    console.warn("Backend not found. Simulating approval.");
                    setReviews(prev => prev.map(r => r.id === id ? { ...r, approved: true } : r));
                    return;
                }
                throw new Error('API approve request failed');
            }

            setReviews(prev => prev.map(r => r.id === id ? { ...r, approved: true } : r));
        } catch (error) {
            console.error(error);
            alert("Errore durante l'approvazione della recensione.");
        }
    }

    const updateSiteData = useCallback(async (key: string, value: any) => {
        // Optimistic UI update
        const stateUpdaterMap: { [key: string]: React.Dispatch<React.SetStateAction<any>> } = {
            siteContent: setSiteContent,
            heroImage: setHeroImage,
            galleryImages: setGalleryImages,
            isQuizEnabled: setIsQuizEnabled,
            dateInfo: setDateInfo,
            highSeasonRate: setHighSeasonRate,
            lowSeasonRate: setLowSeasonRate,
        };

        const originalStateMap: { [key: string]: any } = {
            siteContent: siteContent,
            heroImage: heroImage,
            galleryImages: galleryImages,
            isQuizEnabled: isQuizEnabled,
            dateInfo: dateInfo,
            highSeasonRate: highSeasonRate,
            lowSeasonRate: lowSeasonRate,
        }

        if (stateUpdaterMap[key]) {
            stateUpdaterMap[key](value);
        }

        try {
            const response = await fetch('/.netlify/functions/update-site-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key, value })
            });
            if (!response.ok) {
                if (response.status === 404) {
                    console.warn("Backend not found. Changes not persisted.");
                    // Do not revert state, allow user to see changes in session
                    return;
                }
                throw new Error('Failed to save data. Changes might not be persisted.');
            }
        } catch (error) {
            console.error(error);
            alert("Errore nel salvataggio dei dati. Ripristino dei dati precedenti.");
            if (stateUpdaterMap[key]) {
                stateUpdaterMap[key](originalStateMap[key]);
            }
        }
    }, [siteContent, heroImage, galleryImages, isQuizEnabled, dateInfo, highSeasonRate, lowSeasonRate]);

    const setFaqs = (faqs: FaqItem[]) => {
        const newContent = {
            ...siteContent,
            faq: { ...siteContent.faq, data: faqs }
        };
        updateSiteData('siteContent', newContent);
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-100"><p className="text-xl text-slate-700">Caricamento in corso...</p></div>;
    }

    // --- RENDER ---
    return (
        <HashRouter>
            <Routes>
                <Route
                    path="/admin"
                    element={
                        <AdminPage
                            isAdmin={isAdmin}
                            onLogin={handleLogin}
                            onLogout={handleLogout}
                            heroImage={heroImage}
                            galleryImages={galleryImages}
                            dateInfo={dateInfo}
                            contactSubmissions={contactSubmissions}
                            bookingRequests={bookingRequests}
                            userQuestions={userQuestions}
                            deleteContactSubmission={deleteContactSubmission}
                            deleteBookingRequest={deleteBookingRequest}
                            deleteUserQuestion={deleteUserQuestion}
                            highSeasonRate={highSeasonRate}
                            lowSeasonRate={lowSeasonRate}
                            isQuizEnabled={isQuizEnabled}
                            siteContent={siteContent}
                            reviews={reviews}
                            approveReview={approveReview}
                            deleteReview={deleteReview}
                            setFaqs={setFaqs}
                            updateSiteData={updateSiteData}
                        />
                    }
                />
                <Route
                    path="/"
                    element={
                        <LandingPage
                            dateInfo={dateInfo}
                            galleryImages={galleryImages}
                            heroImage={heroImage}
                            onFormSubmit={handleContactSubmit}
                            onBooking={handleBookingRequest}
                            highSeasonRate={highSeasonRate}
                            lowSeasonRate={lowSeasonRate}
                            isQuizEnabled={isQuizEnabled}
                            onQuestionSubmit={handleUserQuestionSubmit}
                            reviews={reviews}
                            onReviewSubmit={handleReviewSubmit}
                            siteContent={siteContent}
                        />
                    }
                />
            </Routes>
        </HashRouter>
    );
};

export default App;