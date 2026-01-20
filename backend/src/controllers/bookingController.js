const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const Service = require('../models/Service');

exports.createBooking = async (req, res) => {
  try {
    console.log(' Request body:', req.body);
    const { serviceId, address, scheduledAt, notes } = req.body;
    
    if (!serviceId || !address || !scheduledAt) {
      return res.status(400).json({ 
        error: 'Missing required fields: serviceId, address, scheduledAt' 
      });
    }

    let service;
    try {
      service = await Service.findById(serviceId);
    } catch (err) {
      service = await Service.findOne();
    }

    if (!service) {
      return res.status(404).json({ 
        error: 'No services! Run: http://localhost:5000/api/services/seed'
      });
    }

    console.log(' Service OK:', service.name);

    const customerId = new mongoose.Types.ObjectId();
    const booking = new Booking({
      customer: customerId,
      service: service._id,
      address: address.trim(),
      scheduledAt: new Date(scheduledAt),
      notes: notes || '',
      status: 'pending',
      history: [{
        status: 'pending',
        changedBy: 'customer',
        timestamp: new Date(),
        notes: notes || 'Booking created'
      }]
    });

    await booking.save();
    const populatedBooking = await Booking.findById(booking._id).populate('service');
    
    console.log(' Booking CREATED:', booking._id);
    res.status(201).json(populatedBooking);
    
  } catch (error) {
    console.error(' CREATE ERROR:', error.message);
    res.status(500).json({ error: 'Booking creation failed', details: error.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    console.log(' GET bookings request');
    
    const { status } = req.query;
    const query = status ? { status } : {};
    
    const bookings = await Booking.find(query)
      .populate('service', 'name price duration') 
      .sort({ createdAt: -1 })
      .limit(50);
    
    console.log(` Found ${bookings.length} bookings`);
    res.json({ 
      success: true,
      bookings,
      total: bookings.length 
    });
  } catch (error) {
    console.error(' GET ERROR:', error.message);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch bookings',
      details: error.message 
    });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    booking.status = status;
    if (notes) booking.notes = notes;
    
    booking.history.unshift({
      status,
      changedBy: 'admin',
      notes: notes || '',
      timestamp: new Date()
    });
    
    await booking.save();
    const populatedBooking = await Booking.findById(id).populate('service');
    
    console.log(' Status updated:', status);
    res.json(populatedBooking);
    
  } catch (error) {
    console.error(' UPDATE ERROR:', error.message);
    res.status(500).json({ error: 'Failed to update booking' });
  }
};

exports.assignProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    
    if (!booking || booking.status !== 'pending') {
      return res.status(400).json({ error: 'Cannot assign non-pending booking' });
    }
    
    booking.status = 'assigned';
    booking.provider = new mongoose.Types.ObjectId();
    booking.history.unshift({
      status: 'assigned',
      changedBy: 'system',
      notes: 'Provider assigned',
      timestamp: new Date()
    });
    
    await booking.save();
    const populatedBooking = await Booking.findById(id).populate('service');
    
    console.log(' Provider assigned');
    res.json(populatedBooking);
  } catch (error) {
    console.error(' ASSIGN ERROR:', error.message);
    res.status(500).json({ error: 'Failed to assign provider' });
  }
};
