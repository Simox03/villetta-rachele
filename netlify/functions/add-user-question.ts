
/**
 * @file netlify/functions/add-user-question.ts
 * @purpose Serverless function to add a new user question to Postgres.
 */
import { Handler } from '@netlify/functions';
import { db } from '../../db';
import { userQuestions } from '../../db/schema';

const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

    try {
        const questionData = JSON.parse(event.body || '{}');
        if (!questionData.email || !questionData.question) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing required question fields.' }) };
        }

        const [newQuestion] = await db.insert(userQuestions).values({
            email: questionData.email,
            question: questionData.question,
            submittedAt: new Date(),
        }).returning();

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, newItem: newQuestion }),
        };
    } catch (error) {
        console.error('Error adding user question:', error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to add user question.' }) };
    }
};
export { handler };
