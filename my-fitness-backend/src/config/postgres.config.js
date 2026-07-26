import pg from 'pg';
import { env } from './env.config.js';
import { logger } from '../shared/utils/logger.js';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

pool.on('connect', () => {
  logger.info('Connected to PostgreSQL database successfully.');
});

pool.on('error', (err) => {
  logger.error('Unexpected error on idle PostgreSQL client:', err);
  process.exit(-1);
});