const express = require('express');
const Service = require('../models/Service');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const services = await Service.find({});
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

router.get('/seed', async (req, res) => {
  try {
    await Service.deleteMany({});
    await Service.insertMany([
      { name: 'House Cleaning', description: 'Deep cleaning', price: 1500, duration: 120 },
      { name: 'AC Repair', description: 'AC service', price: 800, duration: 90 },
      { name: 'Plumbing', description: 'Fix leaks', price: 1200, duration: 60 },
      { name: 'Painting', description: 'Wall painting', price: 2500, duration: 180 }
    ]);
    res.json({ message: ' Services seeded!' });
  } catch (error) {
    res.status(500).json({ error: 'Seed failed' });
  }
});

module.exports = router;
