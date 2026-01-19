import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import workoutRoutes from './routes/workoutRoutes.js';
import exerciseRoutes from './routes/exerciseRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
// Load the frontend URL from environment variables
const clientOrigin = process.env.FRONTEND_URL;

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (origin !== clientOrigin) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // Required if you ever need to send cookies/headers securely
}));
app.use(express.json());

// Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/analytics', analyticsRoutes);

// Global Health Check
app.get('/', (req, res) => {
  res.send('Reps.io API v1.0 - Operational');
});

// Start
app.listen(PORT, () => {
  console.log(`Reps.io Server running on port ${PORT}`);
});