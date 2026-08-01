import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('5000').transform((val) => parseInt(val, 10)),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // Databases
  DATABASE_URL: z.string().url({ message: 'DATABASE_URL must be a valid PostgreSQL connection string' }),
  MONGO_URI: z.string().min(1, { message: 'MONGO_URI is required' }),
  
  // AWS S3 Storage
  AWS_REGION: z.string().min(1, { message: 'AWS_REGION is required' }),
  AWS_ACCESS_KEY_ID: z.string().min(1, { message: 'AWS_ACCESS_KEY_ID is required' }),
  AWS_SECRET_ACCESS_KEY: z.string().min(1, { message: 'AWS_SECRET_ACCESS_KEY is required' }),
  AWS_S3_BUCKET_NAME: z.string().min(1, { message: 'AWS_S3_BUCKET_NAME is required' }),
  
  // JWT Authentication Security
  JWT_SECRET: z.string().min(10, { message: 'JWT_SECRET must be at least 10 characters long' }),
  JWT_EXPIRES_IN: z.string().default('7d'),

  // External APIs (RapidAPI - ExerciseDB)
  RAPIDAPI_KEY: z.string().min(1, { message: 'RAPIDAPI_KEY is required' }),
  RAPIDAPI_HOST: z.string().default('exercisedb.p.rapidapi.com'),

  // Razorpay Billing
  RAZORPAY_KEY_ID: z.string().default(''),
  RAZORPAY_KEY_SECRET: z.string().default(''),
  RAZORPAY_WEBHOOK_SECRET: z.string().default(''),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid or missing Environment Variables:');
  console.error(_env.error.format());
  process.exit(1);
}

export const env = _env.data;