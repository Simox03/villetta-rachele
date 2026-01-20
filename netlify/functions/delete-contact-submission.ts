
/**
 * @file netlify/functions/delete-contact-submission.ts
 * @purpose Serverless function to delete a contact submission by its ID in Postgres.
 */
import { Handler } from '@netlify/functions';
import { db } from '../../db';
import { contactSubmissions } from '../../db/schema';
import { eq } from 'drizzle-orm';

const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }
    try {
        const { id } = JSON.parse(event.body || '{}');
        if (!id) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing submission ID.' }) };
        }

        const result = await db.delete(contactSubmissions)
            .where(eq(contactSubmissions.id, id))
            .returning();

        if (result.length === 0) {
            return { statusCode: 404, body: JSON.stringify({ error: 'Contact submission not found.' }) };
        }

        return { statusCode: 200, body: JSON.stringify({ success: true }) };
    } catch (error) {
        console.error('Error deleting contact submission:', error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to delete contact submission.' }) };
    }
};
export { handler };
