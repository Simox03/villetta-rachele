
/**
 * @file netlify/functions/add-booking-request.ts
 * @purpose Serverless function to add a new booking request to Postgres.
 */
import { Handler } from '@netlify/functions';
import { db } from '../../db';
import { bookingRequests } from '../../db/schema';

const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

    try {
        console.log("Incoming booking request body:", event.body);
        const bookingData = JSON.parse(event.body || '{}');
        if (!bookingData.name || !bookingData.email || !bookingData.checkIn || !bookingData.checkOut) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing required booking fields.' }) };
        }

        const [newBooking] = await db.insert(bookingRequests).values({
            name: bookingData.name,
            email: bookingData.email,
            checkIn: new Date(bookingData.checkIn),
            checkOut: new Date(bookingData.checkOut),
            nights: bookingData.nights,
            totalPrice: bookingData.totalPrice,
            submittedAt: new Date(),
        }).returning();

        console.log("Booking added successfully:", newBooking);

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
