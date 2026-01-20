/**
 * @file components/admin/AdminLayout.tsx
 * @purpose The main layout for the authenticated admin area, including navigation and content panels.
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminRequests from './AdminRequests';
import AdminReviewsManager from './AdminReviewsManager';
import AdminPriceCalendarManager from './AdminPriceCalendarManager';
import AdminGalleryManager from './AdminGalleryManager';
import AdminContentManager from './AdminContentManager';
import AdminFaqManager from './AdminFaqManager';
import AdminSettings from './AdminSettings';
import type { AdminPageProps } from '../../pages/AdminPage';

type AdminLayoutProps = Omit<AdminPageProps, 'isAdmin' | 'onLogin' | 'setHeroImage' | 'setGalleryImages' | 'setDateInfo' | 'setHighSeasonRate' | 'setLowSeasonRate' | 'setIsQuizEnabled' | 'setSiteContent' >;


const AdminLayout: React.FC<AdminLayoutProps> = (props) => {
    const [activeTab, setActiveTab] = useState('richieste');

    const tabs = {
        richieste: 'Richieste',
        recensioni: 'Recensioni',
        calendario: 'Calendario e Prezzi',
        contenuti: 'Gestione Contenuti',
        galleria: 'Galleria',
        faq: 'Gestione FAQ',
        impostazioni: 'Impostazioni'
    };
    
    return (
        <div className="min-h-screen bg-slate-100">
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-slate-800">Pannello Admin</h1>
                    <div>
                         <Link to="/" className="text-sm text-teal-600 hover:underline mr-4">Vedi Sito</Link>
                         <button onClick={props.onLogout} className="text-sm bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-md">Logout</button>
                    </div>
                </div>
            </header>
            <main className="container mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <aside className="md:w-1/4">
                        <nav className="bg-white p-4 rounded-lg shadow-md">
                            <ul>
                                {Object.entries(tabs).map(([key, value]) => (
                                    <li key={key}>
                                        <button 
                                            onClick={() => setActiveTab(key)} 
                                            className={`w-full text-left px-4 py-3 rounded-md font-semibold transition-colors ${activeTab === key ? 'bg-teal-500 text-white' : 'text-slate-700 hover:bg-teal-50'}`}
                                        >
                                            {value}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </aside>
                    <section className="md:w-3/4">
                         <div className="bg-white p-8 rounded-lg shadow-md">
                            {activeTab === 'richieste' && <AdminRequests 
                                contactSubmissions={props.contactSubmissions}
                                bookingRequests={props.bookingRequests}
                                userQuestions={props.userQuestions}
                                deleteContactSubmission={props.deleteContactSubmission}
                                deleteBookingRequest={props.deleteBookingRequest}
                                deleteUserQuestion={props.deleteUserQuestion}
                            />}
                            {activeTab === 'recensioni' && <AdminReviewsManager reviews={props.reviews} onApprove={props.approveReview} onDelete={props.deleteReview} />}
                            {activeTab === 'calendario' && <AdminPriceCalendarManager 
                                dateInfo={props.dateInfo}
                                highSeasonRate={props.highSeasonRate}
                                lowSeasonRate={props.lowSeasonRate}
                                updateSiteData={props.updateSiteData}
                            />}
                            {activeTab === 'galleria' && <AdminGalleryManager 
                                galleryImages={props.galleryImages}
                                heroImage={props.heroImage}
                                updateSiteData={props.updateSiteData}
                            />}
                            {activeTab === 'contenuti' && <AdminContentManager siteContent={props.siteContent} updateSiteData={props.updateSiteData} />}
                            {activeTab === 'faq' && <AdminFaqManager faqs={props.siteContent.faq.data} setFaqs={props.setFaqs} />}
                            {activeTab === 'impostazioni' && <AdminSettings 
                                isQuizEnabled={props.isQuizEnabled}
                                updateSiteData={props.updateSiteData}
                            />}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;