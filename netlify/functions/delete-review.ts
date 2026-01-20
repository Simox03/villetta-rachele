
/**
 * @file netlify/functions/delete-review.ts
 * @purpose Serverless function to delete a review by its ID in Postgres.
 */
import { Handler } from '@netlify/functions';
import { db } from '../../db';
import { reviews } from '../../db/schema';
import { eq } from 'drizzle-orm';

const handler: Handler = async (event) => {
    // Using POST for simplicity with JSON body
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }
    try {
        const { id } = JSON.parse(event.body || '{}');
        if (!id) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing review ID.' }) };
        }

        const result = await db.delete(reviews)
            .where(eq(reviews.id, id))
            .returning();

        if (result.length === 0) {
            return { statusCode: 404, body: JSON.stringify({ error: 'Review not found.' }) };
        }

        return { statusCode: 200, body: JSON.stringify({ success: true }) };
    } catch (error) {
        console.error('Error deleting review:', error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to delete review.' }) };
    }
};
export { handler };
