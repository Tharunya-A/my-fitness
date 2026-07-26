import pg from 'pg';
import { env } from './env.config.js';

const { Pool } = pg;

export const pgPool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for cloud databases like Neon
  },
  max: 10, // Max concurrent connections in pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 sec
});

pgPool.on('error', (err) => {
  console.error('❌ Unexpected error on idle PostgreSQL client', err);
});