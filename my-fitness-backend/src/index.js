import { env } from './config/env.config.js';
import { connectMongoDB } from './config/mongo.config.js';
import { pgPool } from './config/postgres.config.js';

const bootServer = async () => {
  console.log(`🚀 Booting My-Fitness API in [${env.NODE_ENV}] mode...`);

  // Connect MongoDB
  await connectMongoDB();

  // Verify PostgreSQL Connection
  try {
    const pgCheck = await pgPool.query('SELECT NOW()');
    console.log(`✅ Neon PostgreSQL Connected: ${pgCheck.rows[0].now}`);
  } catch (error) {
    console.error(`❌ PostgreSQL Connection Failed: ${error.message}`);
    process.exit(1);
  }

  console.log(`🎉 Configuration & Database bootstrapper successfully verified!`);
};

bootServer();