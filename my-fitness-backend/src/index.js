import app from './app.js';
import { env } from './config/env.config.js';
import { connectMongoDB } from './config/mongo.config.js';
import { pgPool } from './config/postgres.config.js';
import { logger } from './shared/logger/logger.js';

const bootServer = async () => {
  logger.info(`🚀 Booting My-Fitness API in [${env.NODE_ENV}] mode...`);

  // Connect MongoDB
  await connectMongoDB();

  // Verify PostgreSQL Connection
  try {
    const pgCheck = await pgPool.query('SELECT NOW()');
    logger.info(`✅ Neon PostgreSQL Connected: ${pgCheck.rows[0].now}`);
  } catch (error) {
    logger.error(`❌ PostgreSQL Connection Failed: ${error.message}`);
    process.exit(1);
  }

  // Start HTTP Listener
  app.listen(env.PORT, () => {
    logger.info(`🌐 Server running on http://localhost:${env.PORT}`);
    logger.info(`🩺 Health check ready at http://localhost:${env.PORT}/health`);
  });
};

bootServer();