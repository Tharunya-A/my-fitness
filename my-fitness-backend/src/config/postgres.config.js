import pg from 'pg';
import { env } from './env.config.js';
import { logger } from '../shared/logger/logger.js';

const { Pool } = pg;

export const pgPool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

pgPool.on('connect', () => {
  logger.info('Connected to PostgreSQL database successfully.');
});

pgPool.on('error', (err) => {
  logger.error('Unexpected error on idle PostgreSQL client:', err);
  process.exit(-1);
});