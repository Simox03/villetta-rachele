
/**
 * @file netlify/functions/update-site-data.ts
 * @purpose A generic serverless function to update a specific key-value pair in the Postgres database.
 */
import { Handler } from '@netlify/functions';
import { db } from '../../db';
import { siteSettings } from '../../db/schema';
import { eq } from 'drizzle-orm';

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

        // Upsert logic: simple on conflict do update if supported, or check exists.
        // Postgres supports ON CONFLICT (key) DO UPDATE
        await db.insert(siteSettings)
            .values({ key, value })
            .onConflictDoUpdate({ target: siteSettings.key, set: { value } });

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
