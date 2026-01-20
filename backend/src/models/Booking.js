const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  address: { type: String, required: true },
  scheduledAt: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'assigned', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  notes: String,
  history: [{
    status: String,
    changedBy: String,
    timestamp: { type: Date, default: Date.now },
    notes: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
