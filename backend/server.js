const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bookingRoutes = require('./src/routes/bookings');
const serviceRoutes = require('./src/routes/services');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/bookings', bookingRoutes);
app.use('/api/services', serviceRoutes);

app.get('/api/test', (req, res) => {
  res.json({ message: ' Backend 100% working!' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(' MongoDB Connected'))
  .catch(err => console.log(' MongoDB Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
  console.log(` Test: http://localhost:${PORT}/api/test`);
});
