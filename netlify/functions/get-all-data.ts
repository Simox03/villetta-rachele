/**
 * @file netlify/functions/get-all-data.ts
 * @purpose A single serverless function to fetch all application data from Netlify Blobs on initial load.
 */
import { getStore } from '@netlify/blobs';
import { Handler } from '@netlify/functions';
import { INITIAL_SITE_CONTENT } from '../../data/siteContent';
import { GALLERY_IMAGES } from '../../data/imageData';
import { INITIAL_REVIEWS } from '../../data/reviewData';

const handler: Handler = async () => {
    try {
        const store = getStore('villetta-rachele-data');

        const getDataWithFallback = async (key: string, fallback: any) => {
            try {
                const data = await store.get(key, { type: 'json' });
                return data !== null && data !== undefined ? data : fallback;
            } catch (error) {
                console.warn(`Could not retrieve '${key}' from blob store, using fallback. Error: ${error}`);
                return fallback;
            }
        };
    
        const [
            reviews,
            bookingRequests,
            contactSubmissions,
            userQuestions,
            siteContent,
            heroImage,
            galleryImages,
            isQuizEnabled,
            dateInfo,
            highSeasonRate,
            lowSeasonRate
        ] = await Promise.all([
            getDataWithFallback('reviews', INITIAL_REVIEWS),
            getDataWithFallback('bookingRequests', []),
            getDataWithFallback('contactSubmissions', []),
            getDataWithFallback('userQuestions', []),
            getDataWithFallback('siteContent', INITIAL_SITE_CONTENT),
            getDataWithFallback('heroImage', '/images/hero/hero_image_01.jpg'),
            getDataWithFallback('galleryImages', GALLERY_IMAGES),
            getDataWithFallback('isQuizEnabled', true),
            getDataWithFallback('dateInfo', {}),
            getDataWithFallback('highSeasonRate', 200),
            getDataWithFallback('lowSeasonRate', 120),
        ]);

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                reviews,
                bookingRequests,
                contactSubmissions,
                userQuestions,
                siteContent,
                heroImage,
                galleryImages,
                isQuizEnabled,
                dateInfo,
                highSeasonRate,
                lowSeasonRate
            }),
        };
    } catch (error) {
        console.error('Error in get-all-data function:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch data from store' }),
        };
    }
};

export { handler };