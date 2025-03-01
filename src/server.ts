import express from 'express';
import { connectDB, mongoose } from './config/connection.js'; // Import connectDB and mongoose
import dotenv from 'dotenv';
import routes from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use(routes);

// Connect to the database and start the server
connectDB()
  .then(() => {
    mongoose.connection.once('open', () => {
      console.log('🟢 Connected to MongoDB');
      app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });