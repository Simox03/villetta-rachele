/**
 * @file netlify/functions/add-review.ts
 * @purpose Serverless function to add a new user review to the Netlify Blob store.
 */
import { getStore } from '@netlify/blobs';
import { Handler } from '@netlify/functions';
import type { Review } from '../../types';

const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { name, comment, rating } = JSON.parse(event.body || '{}');
        if (!name || !comment || rating === undefined) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields: name, comment, rating.' }) };
        }

        const store = getStore('villetta-rachele-data');
        const reviews = await store.get('reviews', { type: 'json' }) as Review[] || [];
        
        const newReview: Review = {
            id: Date.now(),
            name,
            comment,
            rating: Number(rating),
            submittedAt: new Date(),
            approved: false
        };

        reviews.unshift(newReview); // Add to the beginning

        await store.setJSON('reviews', reviews);

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, newItem: newReview }),
        };

    } catch (error) {
        console.error('Error adding review:', error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to add review.' }) };
    }
};
export { handler };
