const { Donation } = require("../models");

// Create donation
exports.createDonation = async (req, res) => {
    try {
        const { userId, amount, message } = req.body;
        const donation = await Donation.create({ userId, amount, message });
        res.status(201).json(donation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all donations (Admin only)
exports.getAllDonations = async (req, res) => {
    try {
        const donations = await Donation.findAll();
        res.json(donations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
