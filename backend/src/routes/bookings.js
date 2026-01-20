const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

const authMiddleware = (req, res, next) => {
  req.userId = 'temp-user';
  next();
};

router.post('/', authMiddleware, bookingController.createBooking);
router.get('/', authMiddleware, bookingController.getBookings); 
router.patch('/:id/status', authMiddleware, bookingController.updateBookingStatus);
router.post('/:id/assign', authMiddleware, bookingController.assignProvider);

module.exports = router;
