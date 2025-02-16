require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test route
app.get('/', (req, res) => {
  res.send('Guestbook API is running');
});

// Register user route
app.post('/register', async (req, res) => {
  const { fullName, email } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO guests (full_name, email) VALUES ($1, $2) RETURNING *',
      [fullName, email]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'DB connected!', time: result.rows[0] });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).send('Database connection error');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
