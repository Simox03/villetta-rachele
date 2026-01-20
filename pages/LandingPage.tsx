/**
 * @file pages/LandingPage.tsx
 * @purpose The main public-facing page component, assembling all the landing sections.
 */
import React, { useMemo } from 'react';
import type { ContactSubmission, BookingRequest, UserQuestion, Review, GalleryImage } from '../types';
import { INITIAL_SITE_CONTENT } from '../data/siteContent';
import { PROPERTY_INFO_CARDS_STRUCTURE, SERVICES_LIST_STRUCTURE } from '../constants';

import Header from '../components/landing/Header';
import HeroSection from '../components/landing/HeroSection';
import PropertySection from '../components/landing/PropertySection';
import AvailabilitySection from '../components/landing/AvailabilitySection';
import GallerySection from '../components/landing/GallerySection';
import VideoSection from '../components/landing/VideoSection';
import ServicesSection from '../components/landing/ServicesSection';
import ReviewsSection from '../components/landing/ReviewsSection';
import QuizSection from '../components/landing/QuizSection';
import LocationSection from '../components/landing/LocationSection';
import FaqSection from '../components/landing/FaqSection';
import ContactSection from '../components/landing/ContactSection';
import Footer from '../components/landing/Footer';
import WaveDivider from '../components/shared/WaveDivider';

interface LandingPageProps {
    dateInfo: { [key: string]: { occupied?: boolean, price?: number } };
    galleryImages: GalleryImage[];
    heroImage: string;
    onFormSubmit: (submission: Omit<ContactSubmission, 'id' | 'submittedAt'>) => void;
    onBooking: (booking: Omit<BookingRequest, 'id' | 'submittedAt'>) => void;
    highSeasonRate: number;
    lowSeasonRate: number;
    isQuizEnabled: boolean;
    onQuestionSubmit: (submission: Omit<UserQuestion, 'id' | 'submittedAt'>) => void;
    reviews: Review[];
    onReviewSubmit: (review: Omit<Review, 'id' | 'submittedAt' | 'approved'>) => void;
    siteContent: typeof INITIAL_SITE_CONTENT;
}

const LandingPage: React.FC<LandingPageProps> = ({
    dateInfo, galleryImages, heroImage, onFormSubmit, onBooking,
    highSeasonRate, lowSeasonRate, isQuizEnabled, onQuestionSubmit,
    reviews, onReviewSubmit, siteContent
}) => {

    const propertyInfoCards = useMemo(() => PROPERTY_INFO_CARDS_STRUCTURE.map(structure => {
        const content = siteContent.property.infoCards.find(c => c.id === structure.id);
        return { ...structure, title: content?.title || '', description: content?.description || '' };
    }), [siteContent.property.infoCards]);

    const services = useMemo(() => SERVICES_LIST_STRUCTURE.map(structure => {
        const content = siteContent.services.serviceList.find(c => c.id === structure.id);
        return { ...structure, title: content?.title || '' };
    }), [siteContent.services.serviceList]);

    return (
        <div className="bg-warm-white">
            <Header hasVideo={!!siteContent.video.videoUrl} />
            <HeroSection heroImage={heroImage} content={siteContent.hero} />
            <main>
                <PropertySection content={siteContent.property} cards={propertyInfoCards} />
                <WaveDivider topColor="white" bottomColor="rgb(248 250 252)" />
                <AvailabilitySection dateInfo={dateInfo} onBooking={onBooking} highSeasonRate={highSeasonRate} lowSeasonRate={lowSeasonRate} content={siteContent.availability} />
                <WaveDivider topColor="rgb(248 250 252)" bottomColor="white" />
                <GallerySection galleryImages={galleryImages} content={siteContent.gallery} />
                <WaveDivider topColor="white" bottomColor="rgb(248 250 252)" />
                <VideoSection content={siteContent.video} />
                <ServicesSection content={siteContent.services} services={services} />
                <WaveDivider topColor="rgb(248 250 252)" bottomColor="white" />
                <ReviewsSection reviews={reviews} onReviewSubmit={onReviewSubmit} content={siteContent.reviews} />
                {isQuizEnabled && <QuizSection content={siteContent.quiz} />}
                <WaveDivider topColor={isQuizEnabled ? 'rgb(248 250 252)' : 'white'} bottomColor="white" />
                <LocationSection content={siteContent.location} />
                <WaveDivider topColor="white" bottomColor="rgb(248 250 252)" />
                <FaqSection onQuestionSubmit={onQuestionSubmit} content={siteContent.faq} />
                <ContactSection onFormSubmit={onFormSubmit} content={siteContent.contact} />
            </main>
            <Footer content={siteContent.footer} contact={siteContent.contact} />
        </div>
    )
};

export default LandingPage;