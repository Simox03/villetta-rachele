
/**
 * @file netlify/functions/delete-booking-request.ts
 * @purpose Serverless function to delete a booking request by its ID in Postgres.
 */
import { Handler } from '@netlify/functions';
import { db } from '../../db';
import { bookingRequests } from '../../db/schema';
import { eq } from 'drizzle-orm';

const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }
    try {
        const { id } = JSON.parse(event.body || '{}');
        if (!id) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing booking ID.' }) };
        }

        const result = await db.delete(bookingRequests)
            .where(eq(bookingRequests.id, id))
            .returning();

        if (result.length === 0) {
            return { statusCode: 404, body: JSON.stringify({ error: 'Booking request not found.' }) };
        }

        return { statusCode: 200, body: JSON.stringify({ success: true }) };
    } catch (error) {
        console.error('Error deleting booking request:', error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to delete booking request.' }) };
    }
};
export { handler };
