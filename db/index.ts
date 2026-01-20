
import { neon } from '@netlify/neon';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon(process.env.NETLIFY_DATABASE_URL);
export const db = drizzle(sql, { schema });
