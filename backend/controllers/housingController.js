const { HousingApplication } = require("../models");

// Apply for housing
exports.applyForHousing = async (req, res) => {
    const { userId, housingDetails } = req.body;

    try {
        const application = await HousingApplication.create({
            userId,
            details: housingDetails,
        });
        res.status(201).json(application);
    } catch (error) {
        console.error("Application Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};

// Get all housing applications (Admin only)
exports.getAllApplications = async (req, res) => {
    try {
        const applications = await HousingApplication.findAll();
        res.json(applications);
    } catch (error) {
        console.error("Fetch Applications Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};
