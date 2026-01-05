
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import progressRoutes from './routes/progress.js';
import mindmapRoutes from './routes/mindmap.js';
import patternRoutes from './routes/pattern.js';
import statsRoutes from './routes/stats.js';
import userRoutes from './routes/user.js';
import Problem from './models/Problem.js';

const app = express();

// CORS configuration - allow all origins for Vercel
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// Test endpoint for MongoDB connectivity
app.get('/api/test', async (req, res) => {
  try {
    const count = await Problem.countDocuments();
    res.json({ 
      message: 'MongoDB connected successfully', 
      problemCount: count,
      timestamp: new Date()
    });
  } catch (err) {
    res.status(500).json({ 
      error: err.message,
      message: 'Failed to connect to MongoDB'
    });
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/mindmap', mindmapRoutes);
app.use('/api/pattern', patternRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/user', userRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    path: req.path,
    method: req.method,
    availableRoutes: [
      'GET /health',
      'GET /api/test',
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api/mindmap',
      'GET /api/pattern',
      'GET /api/progress',
      'PUT /api/progress',
      'GET /api/stats',
      'GET /api/user/profile'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

export default app;
