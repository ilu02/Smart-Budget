const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const authenticateToken = require('./middleware/authMiddleware'); //Add middleware

app.use(cors());
app.use(express.json());

// Auth routes (register/login)
app.use('/api/auth', require('./app/routes/auth'));

// Protected route example
app.get('/api/dashboard', authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.name}, this is your protected dashboard.` });
});

module.exports = app;