/**
 * @file netlify/functions/delete-user-question.ts
 * @purpose Serverless function to delete a user question by its ID.
 */
import { getStore } from '@netlify/blobs';
import { Handler } from '@netlify/functions';
import type { UserQuestion } from '../../types';

const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }
    try {
        const { id } = JSON.parse(event.body || '{}');
        if (!id) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing question ID.' }) };
        }
        const store = getStore('villetta-rachele-data');
        const questions = await store.get('userQuestions', { type: 'json' }) as UserQuestion[] || [];

        const updatedQuestions = questions.filter(q => q.id !== id);

        if (questions.length === updatedQuestions.length) {
            return { statusCode: 404, body: JSON.stringify({ error: 'User question not found.' }) };
        }
        
        await store.setJSON('userQuestions', updatedQuestions);

        return { statusCode: 200, body: JSON.stringify({ success: true }) };
    } catch (error) {
        console.error('Error deleting user question:', error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to delete user question.' }) };
    }
};
export { handler };
