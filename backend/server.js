const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// ── Connect to MySQL (runs the pool test on require) ──────
require('./db');

// ── Health check ──────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'Kiya Cafe API is running 🍽️', status: 'ok' });
});

// ── Routes ────────────────────────────────────────────────
app.use('/api/auth',     require('./routes/authRoutes'));
app.use('/api/recipes',  require('./routes/recipeRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// ── 404 handler ───────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ── Global error handler ──────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// ── Start ─────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
