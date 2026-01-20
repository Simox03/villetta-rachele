/**
 * @file netlify/functions/approve-review.ts
 * @purpose Serverless function to approve a pending review by its ID.
 */
import { getStore } from '@netlify/blobs';
import { Handler } from '@netlify/functions';
import type { Review } from '../../types';

const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }
    try {
        const { id } = JSON.parse(event.body || '{}');
        if (!id) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing review ID.' }) };
        }
        const store = getStore('villetta-rachele-data');
        const reviews = await store.get('reviews', { type: 'json' }) as Review[] || [];
        
        let reviewFound = false;
        const updatedReviews = reviews.map(r => {
            if (r.id === id) {
                reviewFound = true;
                return { ...r, approved: true };
            }
            return r;
        });

        if (!reviewFound) {
            return { statusCode: 404, body: JSON.stringify({ error: 'Review not found.' }) };
        }
        
        await store.setJSON('reviews', updatedReviews);

        return { statusCode: 200, body: JSON.stringify({ success: true }) };
    } catch (error) {
        console.error('Error approving review:', error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to approve review.' }) };
    }
};
export { handler };
