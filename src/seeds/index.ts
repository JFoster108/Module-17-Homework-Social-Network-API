// seeds/index.ts
import mongoose from 'mongoose';
import { seedDatabase } from './seed.js';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.MONGODB_CONNECTION_STRING;

if (!connectionString) {
  throw new Error('MONGODB_CONNECTION_STRING is not defined in .env');
}

mongoose
  .connect(connectionString)
  .then(async () => {
    console.log('📡 Connected to MongoDB');
    await seedDatabase();
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('❌ Seeding failed:', err);
  });