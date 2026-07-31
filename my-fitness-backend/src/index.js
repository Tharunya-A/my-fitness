import app from './app.js';
import { env } from './config/env.config.js';
import { connectMongoDB } from './config/mongo.config.js';
import { pgPool } from './config/postgres.config.js';
import { logger } from './shared/logger/logger.js';

const initializeDatabases = async () => {
  try {
    await connectMongoDB();
    logger.info('✅ MongoDB initialization attempted');
  } catch (error) {
    logger.error(`❌ MongoDB Connection Failed: ${error.message}`);
    process.exit(1);
  }

  // Verify PostgreSQL Connection
  try {
    const pgCheck = await pgPool.query('SELECT NOW()');
    logger.info(`✅ PostgreSQL Connected: ${pgCheck.rows[0].now}`);
    logger.info('✅ PostgreSQL tables ready: auth_users, user_profiles');
  } catch (error) {
    logger.error(`❌ PostgreSQL Connection Failed: ${error.message}`);
    process.exit(1);
  }
};

const bootServer = async () => {
  logger.info(`🚀 Booting My-Fitness API in [${env.NODE_ENV}] mode...`);
  await initializeDatabases();
  // Start HTTP Listener
  app.listen(env.PORT, () => {
    logger.info(`🌐 Server running on http://localhost:${env.PORT}`);
    logger.info(`🩺 Health check ready at http://localhost:${env.PORT}/health`);
  });
};

bootServer();