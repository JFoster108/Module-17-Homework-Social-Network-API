import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

const connectionString = process.env.MONGODB_CONNECTION_STRING;

if (!connectionString) {
  throw new Error('MONGODB_CONNECTION_STRING is not defined in .env');
}

const connectDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log('MongoDB connected...');
    return mongoose.connection
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

export { connectDB, mongoose };