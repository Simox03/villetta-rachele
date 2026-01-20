
/**
 * @file netlify/functions/delete-user-question.ts
 * @purpose Serverless function to delete a user question by its ID in Postgres.
 */
import { Handler } from '@netlify/functions';
import { db } from '../../db';
import { userQuestions } from '../../db/schema';
import { eq } from 'drizzle-orm';

const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }
    try {
        const { id } = JSON.parse(event.body || '{}');
        if (!id) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing question ID.' }) };
        }

        const result = await db.delete(userQuestions)
            .where(eq(userQuestions.id, id))
            .returning();

        if (result.length === 0) {
            return { statusCode: 404, body: JSON.stringify({ error: 'User question not found.' }) };
        }

        return { statusCode: 200, body: JSON.stringify({ success: true }) };
    } catch (error) {
        console.error('Error deleting user question:', error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to delete user question.' }) };
    }
};
export { handler };
