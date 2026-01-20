
/**
 * @file netlify/functions/get-all-data.ts
 * @purpose A single serverless function to fetch all application data from the Postgres database on initial load.
 */
import { Handler } from '@netlify/functions';
import { db } from '../../db';
import { siteSettings, contactSubmissions, bookingRequests, userQuestions, reviews } from '../../db/schema';
import { desc } from 'drizzle-orm';
import { INITIAL_SITE_CONTENT } from '../../data/siteContent';
import { GALLERY_IMAGES } from '../../data/imageData';
import { INITIAL_REVIEWS } from '../../data/reviewData';

const handler: Handler = async () => {
    try {
        // Fetch all data in parallel
        const [
            allSettings,
            allContactSubmissions,
            allBookingRequests,
            allUserQuestions,
            allReviews
        ] = await Promise.all([
            db.select().from(siteSettings),
            db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.submittedAt)),
            db.select().from(bookingRequests).orderBy(desc(bookingRequests.submittedAt)),
            db.select().from(userQuestions).orderBy(desc(userQuestions.submittedAt)),
            db.select().from(reviews).orderBy(desc(reviews.submittedAt)),
        ]);

        // Transform settings array to object map
        const settingsMap = allSettings.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {} as Record<string, any>);

        // helper to get with fallback
        const getSetting = (key: string, fallback: any) => settingsMap[key] !== undefined ? settingsMap[key] : fallback;

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                reviews: allReviews.length > 0 ? allReviews : INITIAL_REVIEWS, // Keep initial reviews if DB is empty, or maybe just empty list? Keeping logic similar to blob
                bookingRequests: allBookingRequests,
                contactSubmissions: allContactSubmissions,
                userQuestions: allUserQuestions,
                siteContent: getSetting('siteContent', INITIAL_SITE_CONTENT),
                heroImage: getSetting('heroImage', '/images/hero/hero_image_01.jpg'),
                galleryImages: getSetting('galleryImages', GALLERY_IMAGES),
                isQuizEnabled: getSetting('isQuizEnabled', true),
                dateInfo: getSetting('dateInfo', {}),
                highSeasonRate: getSetting('highSeasonRate', 200),
                lowSeasonRate: getSetting('lowSeasonRate', 120),
            }),
        };
    } catch (error) {
        console.error('Error in get-all-data function:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch data from database' }),
        };
    }
};

export { handler };