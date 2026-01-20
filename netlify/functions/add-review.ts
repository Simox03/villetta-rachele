
/**
 * @file netlify/functions/add-review.ts
 * @purpose Serverless function to add a new user review to Postgres.
 */
import { Handler } from '@netlify/functions';
import { db } from '../../db';
import { reviews } from '../../db/schema';

const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { name, comment, rating } = JSON.parse(event.body || '{}');
        if (!name || !comment || rating === undefined) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields: name, comment, rating.' }) };
        }

        const [newReview] = await db.insert(reviews).values({
            name,
            comment,
            rating: Number(rating),
            submittedAt: new Date(),
            approved: false
        }).returning();

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
