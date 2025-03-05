import express from 'express';
import { connectDB } from './config/connection.js'; // Import connectDB and mongoose
import dotenv from 'dotenv';
import routes from './routes/index.js';

dotenv.config();
await connectDB()
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use(routes);


app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));