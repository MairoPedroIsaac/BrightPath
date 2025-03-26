const express = require('express');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/profile', authenticate, (req, res) => {
  res.json({ message: `Welcome, User ${req.user.userId}` });
});

module.exports = router; // ✅ Correct export
