const mysql = require('mysql2/promise');
require('dotenv').config();

// Create a connection pool — reuses connections efficiently
const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'kiyacafe',
  port:     process.env.DB_PORT     || 3306,
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
});

// Test connection on startup
pool.getConnection()
  .then((conn) => {
    console.log('✅ MySQL connected — database:', process.env.DB_NAME || 'kiyacafe');
    conn.release();
  })
  .catch((err) => {
    console.error('❌ MySQL connection error:', err.message);
    console.error('   → Make sure XAMPP MySQL is running and your .env DB_ values are correct.');
  });

module.exports = pool;
