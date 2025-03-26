const express = require('express');
const authorizeRole = require('../middleware/authorizeRole');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/dashboard', authenticate, authorizeRole(['admin']), (req, res) => {
  res.json({ message: 'Welcome, Admin!' });
});

module.exports = router; // ✅ Correct export
