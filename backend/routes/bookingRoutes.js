const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
} = require('../controllers/bookingController');

// Public: anyone can book a table
router.post('/', createBooking);

// Protected: admin-only routes
router.get('/', protect, getBookings);
router.get('/:id', protect, getBookingById);
router.patch('/:id/status', protect, updateBookingStatus);
router.delete('/:id', protect, deleteBooking);

module.exports = router;
