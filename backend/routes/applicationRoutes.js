const express = require('express');
const router = express.Router();
const db = require('../models');

// Submit Application
router.post('/apply', async (req, res) => {
  try {
    const { fullName, email, phone, reason } = req.body;
    
    const application = await db.HousingApplication.create({
      fullName,
      email,
      phone,
      reason
    });

    res.status(201).json({
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Application submission failed' });
  }
});

// Get All Applications
router.get('/', async (req, res) => {
  try {
    const applications = await db.HousingApplication.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
});

// Update Application Status
router.put('/:id', async (req, res) => {
  try {
    const application = await db.HousingApplication.findByPk(req.params.id);
    if (!application) return res.status(404).json({ message: 'Application not found' });

    application.status = req.body.status;
    await application.save();

    res.json({ message: 'Status updated successfully', application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update status' });
  }
});

module.exports = router;
