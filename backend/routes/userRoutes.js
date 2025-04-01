const express = require('express');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Donation Route
router.post('/donations', authenticate, async (req, res) => {
    const { donorName, email, amount, paymentMethod } = req.body;

    // Simple validation
    if (!donorName || !email || !amount || !paymentMethod) {
        return res.status(400).json({ error: "All fields (donorName, email, amount, paymentMethod) are required." });
    }

    try {
        // Logic to handle the donation (store in the database, etc.)
        // Example: Add donation to a 'Donations' table (assuming such a table exists)
        const result = await pool.query(
            `INSERT INTO "Donations" (donor_name, email, amount, payment_method) VALUES ($1, $2, $3, $4) RETURNING id, donor_name, amount, payment_method`,
            [donorName, email, amount, paymentMethod]
        );

        res.status(200).json({ message: "Donation successful!", donation: result.rows[0] });
    } catch (error) {
        console.error("Donation Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});

module.exports = router;
