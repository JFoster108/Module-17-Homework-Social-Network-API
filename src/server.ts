import express from 'express';
import mongooseConnection from './config/connection';
import apiRoutes from './routes';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', apiRoutes);

// Start server after DB connects
mongooseConnection.once('open', () => {
  console.log('🟢 Connected to MongoDB');
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
});
