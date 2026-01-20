const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bookingRoutes = require('./src/routes/bookings');
const serviceRoutes = require('./src/routes/services');

dotenv.config();

const app = express();

//  Middleware FIRST
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://full-stack-booking-application.onrender.com',
    'https://full-stack-booking-application-1.onrender.com'
  ]
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

//  ROUTES BEFORE 404 (CRITICAL ORDER!)
app.get('/', (req, res) => {
  res.json({ 
    message: ' Home Services Backend - Live on Render!',
    version: '1.0.0',
    status: 'success',
    apis: {
      bookings: '/api/bookings',
      services: '/api/services',
      test: '/api/test'
    }
  });
});

app.get('/api/test', (req, res) => {
  res.json({ message: ' Backend 100% working on Render!' });
});

//  API Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/services', serviceRoutes);

app.use((req, res) => {
  res.status(404).json({ 
    error: `Route ${req.originalUrl} not found`,
    available: ['/', '/api/bookings', '/api/services', '/api/test']
  });
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(' MongoDB Connected'))
  .catch(err => console.error(' MongoDB Error:', err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(` Server running on port ${PORT}`);
  console.log(`📱 Root: http://localhost:${PORT}/`);
  console.log(`📱 Test: http://localhost:${PORT}/api/test`);
});
