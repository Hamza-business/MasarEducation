import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!); // Make sure .env.local contains this

export default sql;