/**
 * @file netlify/functions/add-contact-submission.ts
 * @purpose Serverless function to add a new contact form submission.
 */
import { getStore } from '@netlify/blobs';
import { Handler } from '@netlify/functions';
import type { ContactSubmission } from '../../types';

const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

    try {
        const submissionData = JSON.parse(event.body || '{}');
        if (!submissionData.name || !submissionData.email || !submissionData.message) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing required contact fields.' }) };
        }

        const store = getStore('villetta-rachele-data');
        const submissions = await store.get('contactSubmissions', { type: 'json' }) as ContactSubmission[] || [];
        
        const newSubmission: ContactSubmission = {
            ...submissionData,
            id: Date.now(),
            submittedAt: new Date(),
        };

        submissions.unshift(newSubmission);
        await store.setJSON('contactSubmissions', submissions);

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
