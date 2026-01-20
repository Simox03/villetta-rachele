
import { pgTable, serial, text, timestamp, boolean, integer, jsonb } from 'drizzle-orm/pg-core';

export const siteSettings = pgTable('site_settings', {
    key: text('key').primaryKey(),
    value: jsonb('value').notNull(),
});

export const contactSubmissions = pgTable('contact_submissions', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    phone: text('phone'),
    message: text('message').notNull(),
    submittedAt: timestamp('submitted_at').defaultNow().notNull(),
});

export const bookingRequests = pgTable('booking_requests', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    checkIn: timestamp('check_in').notNull(),
    checkOut: timestamp('check_out').notNull(),
    nights: integer('nights').notNull(),
    totalPrice: integer('total_price').notNull(),
    submittedAt: timestamp('submitted_at').defaultNow().notNull(),
});

export const userQuestions = pgTable('user_questions', {
    id: serial('id').primaryKey(),
    email: text('email').notNull(),
    question: text('question').notNull(),
    submittedAt: timestamp('submitted_at').defaultNow().notNull(),
});

export const reviews = pgTable('reviews', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    rating: integer('rating').notNull(),
    comment: text('comment').notNull(),
    submittedAt: timestamp('submitted_at').defaultNow().notNull(),
    approved: boolean('approved').default(false).notNull(),
});
