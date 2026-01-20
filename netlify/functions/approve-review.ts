
/**
 * @file netlify/functions/approve-review.ts
 * @purpose Serverless function to approve a pending review by its ID in Postgres.
 */
import { Handler } from '@netlify/functions';
import { db } from '../../db';
import { reviews } from '../../db/schema';
import { eq } from 'drizzle-orm';

const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }
    try {
        const { id } = JSON.parse(event.body || '{}');
        if (!id) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing review ID.' }) };
        }

        const result = await db.update(reviews)
            .set({ approved: true })
            .where(eq(reviews.id, id))
            .returning();

        if (result.length === 0) {
            return { statusCode: 404, body: JSON.stringify({ error: 'Review not found.' }) };
        }

        return { statusCode: 200, body: JSON.stringify({ success: true }) };
    } catch (error) {
        console.error('Error approving review:', error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to approve review.' }) };
    }
};
export { handler };
