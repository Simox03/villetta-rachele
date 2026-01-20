/**
 * @file netlify/functions/add-user-question.ts
 * @purpose Serverless function to add a new user question from the FAQ section.
 */
import { getStore } from '@netlify/blobs';
import { Handler } from '@netlify/functions';
import type { UserQuestion } from '../../types';

const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

    try {
        const questionData = JSON.parse(event.body || '{}');
        if (!questionData.email || !questionData.question) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing required question fields.' }) };
        }

        const store = getStore('villetta-rachele-data');
        const questions = await store.get('userQuestions', { type: 'json' }) as UserQuestion[] || [];
        
        const newQuestion: UserQuestion = {
            ...questionData,
            id: Date.now(),
            submittedAt: new Date(),
        };

        questions.unshift(newQuestion);
        await store.setJSON('userQuestions', questions);

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
