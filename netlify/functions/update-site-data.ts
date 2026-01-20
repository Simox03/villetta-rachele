/**
 * @file netlify/functions/update-site-data.ts
 * @purpose A generic serverless function to update a specific key-value pair in the Netlify Blob store.
 */
import { getStore } from '@netlify/blobs';
import { Handler } from '@netlify/functions';

// Whitelist of keys that can be updated to prevent arbitrary writes.
const VALID_KEYS = [
    'siteContent',
    'heroImage',
    'galleryImages',
    'isQuizEnabled',
    'dateInfo',
    'highSeasonRate',
    'lowSeasonRate'
];

const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }
    try {
        const { key, value } = JSON.parse(event.body || '{}');
        if (!key || !VALID_KEYS.includes(key)) {
            return { 
                statusCode: 400, 
                body: JSON.stringify({ error: `Invalid or missing key. Must be one of: ${VALID_KEYS.join(', ')}` }) 
            };
        }

        const store = getStore('villetta-rachele-data');
        await store.setJSON(key, value);

        return { 
            statusCode: 200, 
            body: JSON.stringify({ success: true, message: `Successfully updated '${key}'.` }) 
        };
    } catch (error) {
        console.error(`Error updating site data for key:`, error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to update data.' }) };
    }
};

export { handler };
