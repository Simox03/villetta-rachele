/**
 * @file types.ts
 * @purpose Defines shared TypeScript interfaces for data structures used throughout the application.
 */
// Fix: Import React types to use React.ReactNode.
import type React from 'react';

export interface InfoCardData {
  // Fix: Replace JSX.Element with React.ReactNode to resolve namespace error.
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface GalleryImage {
  id: number;
  category: 'camere' | 'bagni' | 'soggiorno' | 'veranda' | 'cucina' | 'esterno';
  src: string;
  alt: string;
  description?: string;
}

export interface ServiceData {
  // Fix: Replace JSX.Element with React.ReactNode to resolve namespace error.
  icon: React.ReactNode;
  title: string;
}

export interface QuizOption {
  text: string;
  correct: boolean;
  feedback: string;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
  incorrectFeedback: string;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  submittedAt: Date;
}

export interface BookingRequest {
  id: number;
  name: string;
  email: string;
  checkIn: Date;
  checkOut: Date;
  nights: number;
  totalPrice: number;
  submittedAt: Date;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface UserQuestion {
  id: number;
  email: string;
  question: string;
  submittedAt: Date;
}

export interface Review {
  id: number;
  name: string;
  rating: number; // 1 to 5
  comment: string;
  submittedAt: Date;
  approved: boolean;
}