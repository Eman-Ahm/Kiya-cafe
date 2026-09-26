const db = require('../db');

// ── Create booking (public) ───────────────────────────────
const createBooking = async (req, res) => {
  try {
    const { name, phone, email, tableNumber, guests, foodPreference, date, time, notes } = req.body;

    if (!name || !phone || !email || !tableNumber || !guests || !date || !time) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    const [result] = await db.query(
      `INSERT INTO bookings
         (name, phone, email, table_number, guests, food_preference, date, time, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        phone,
        email,
        parseInt(tableNumber),
        parseInt(guests),
        foodPreference || 'No preference',
        date,
        time,
        notes || '',
      ]
    );

    const [rows] = await db.query('SELECT * FROM bookings WHERE id = ?', [result.insertId]);

    res.status(201).json({ message: 'Booking created successfully', booking: rows[0] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── Get all bookings (admin) ──────────────────────────────
const getBookings = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM bookings ORDER BY created_at DESC');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── Get single booking ────────────────────────────────────
const getBookingById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM bookings WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Booking not found.' });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── Update booking status (admin) ─────────────────────────
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['Pending', 'Confirmed', 'Cancelled'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    const [result] = await db.query(
      'UPDATE bookings SET status = ? WHERE id = ?',
      [status, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    const [rows] = await db.query('SELECT * FROM bookings WHERE id = ?', [req.params.id]);
    res.status(200).json({ message: 'Status updated', booking: rows[0] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── Delete booking (admin) ────────────────────────────────
const deleteBooking = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM bookings WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Booking not found.' });
    }
    res.status(200).json({ message: 'Booking deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createBooking, getBookings, getBookingById, updateBookingStatus, deleteBooking };
