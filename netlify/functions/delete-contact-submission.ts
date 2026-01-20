/**
 * @file netlify/functions/delete-contact-submission.ts
 * @purpose Serverless function to delete a contact submission by its ID.
 */
import { getStore } from '@netlify/blobs';
import { Handler } from '@netlify/functions';
import type { ContactSubmission } from '../../types';

const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }
    try {
        const { id } = JSON.parse(event.body || '{}');
        if (!id) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing submission ID.' }) };
        }
        const store = getStore('villetta-rachele-data');
        const submissions = await store.get('contactSubmissions', { type: 'json' }) as ContactSubmission[] || [];

        const updatedSubmissions = submissions.filter(s => s.id !== id);

        if (submissions.length === updatedSubmissions.length) {
            return { statusCode: 404, body: JSON.stringify({ error: 'Contact submission not found.' }) };
        }
        
        await store.setJSON('contactSubmissions', updatedSubmissions);

        return { statusCode: 200, body: JSON.stringify({ success: true }) };
    } catch (error) {
        console.error('Error deleting contact submission:', error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to delete contact submission.' }) };
    }
};
export { handler };
