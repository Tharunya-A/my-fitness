import mongoose from 'mongoose';
import { env } from './env.config.js';
import { logger } from '../shared/logger/logger.js';

export const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI);
    logger.info(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`❌ MongoDB Atlas Connection Failed: ${error.message}`);
    process.exit(1);
  }
};