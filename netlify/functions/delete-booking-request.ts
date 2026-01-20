/**
 * @file netlify/functions/delete-booking-request.ts
 * @purpose Serverless function to delete a booking request by its ID.
 */
import { getStore } from '@netlify/blobs';
import { Handler } from '@netlify/functions';
import type { BookingRequest } from '../../types';

const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }
    try {
        const { id } = JSON.parse(event.body || '{}');
        if (!id) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing booking ID.' }) };
        }
        const store = getStore('villetta-rachele-data');
        const bookings = await store.get('bookingRequests', { type: 'json' }) as BookingRequest[] || [];

        const updatedBookings = bookings.filter(b => b.id !== id);

        if (bookings.length === updatedBookings.length) {
            return { statusCode: 404, body: JSON.stringify({ error: 'Booking request not found.' }) };
        }
        
        await store.setJSON('bookingRequests', updatedBookings);

        return { statusCode: 200, body: JSON.stringify({ success: true }) };
    } catch (error) {
        console.error('Error deleting booking request:', error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to delete booking request.' }) };
    }
};
export { handler };
