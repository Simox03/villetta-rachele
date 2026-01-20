/**
 * @file pages/AdminPage.tsx
 * @purpose The main component for the admin area, handling login and routing to the admin layout.
 */
import React from 'react';
import type { ContactSubmission, BookingRequest, UserQuestion, Review, GalleryImage, FaqItem } from '../types';
import { INITIAL_SITE_CONTENT } from '../data/siteContent';
import AdminLogin from '../components/admin/AdminLogin';
import AdminLayout from '../components/admin/AdminLayout';

export interface AdminPageProps {
    isAdmin: boolean;
    onLogin: (success: boolean) => void;
    onLogout: () => void;
    heroImage: string;
    galleryImages: GalleryImage[];
    dateInfo: { [key: string]: { occupied?: boolean, price?: number } };
    contactSubmissions: ContactSubmission[];
    bookingRequests: BookingRequest[];
    userQuestions: UserQuestion[];
    deleteContactSubmission: (id: number) => void;
    deleteBookingRequest: (id: number) => void;
    deleteUserQuestion: (id: number) => void;
    highSeasonRate: number;
    lowSeasonRate: number;
    isQuizEnabled: boolean;
    siteContent: typeof INITIAL_SITE_CONTENT;
    reviews: Review[];
    approveReview: (id: number) => void;
    deleteReview: (id: number) => void;
    setFaqs: (faqs: FaqItem[]) => void;
    updateSiteData: (key: string, value: any) => Promise<void>;
}

const AdminPage: React.FC<AdminPageProps> = (props) => {
    if (!props.isAdmin) {
        return <AdminLogin onLogin={props.onLogin} />;
    }

    return <AdminLayout {...props} />;
};

export default AdminPage;