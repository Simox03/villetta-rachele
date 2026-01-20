/**
 * @file netlify/functions/add-booking-request.ts
 * @purpose Serverless function to add a new booking request.
 */
import { getStore } from '@netlify/blobs';
import { Handler } from '@netlify/functions';
import type { BookingRequest } from '../../types';

const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

    try {
        const bookingData = JSON.parse(event.body || '{}');
        if (!bookingData.name || !bookingData.email || !bookingData.checkIn || !bookingData.checkOut) {
             return { statusCode: 400, body: JSON.stringify({ error: 'Missing required booking fields.' }) };
        }

        const store = getStore('villetta-rachele-data');
        const bookings = await store.get('bookingRequests', { type: 'json' }) as BookingRequest[] || [];
        
        const newBooking: BookingRequest = {
            ...bookingData,
            id: Date.now(),
            submittedAt: new Date(),
        };

        bookings.unshift(newBooking);
        await store.setJSON('bookingRequests', bookings);

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, newItem: newBooking }),
        };
    } catch (error) {
        console.error('Error adding booking request:', error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to add booking request.' }) };
    }
};
export { handler };
