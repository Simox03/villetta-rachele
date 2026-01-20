
/**
 * @file netlify/functions/add-contact-submission.ts
 * @purpose Serverless function to add a new contact form submission to Postgres.
 */
import { Handler } from '@netlify/functions';
import { db } from '../../db';
import { contactSubmissions } from '../../db/schema';

const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

    try {
        const submissionData = JSON.parse(event.body || '{}');
        if (!submissionData.name || !submissionData.email || !submissionData.message) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing required contact fields.' }) };
        }

        const [newSubmission] = await db.insert(contactSubmissions).values({
            name: submissionData.name,
            email: submissionData.email,
            phone: submissionData.phone || null,
            message: submissionData.message,
            submittedAt: new Date(),
        }).returning();

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, newItem: newSubmission }),
        };
    } catch (error) {
        console.error('Error adding contact submission:', error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to add contact submission.' }) };
    }
};
export { handler };
