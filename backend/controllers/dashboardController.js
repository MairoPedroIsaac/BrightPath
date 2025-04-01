const { HousingApplication } = require("../models");

// Get housing progress stats (Admin only)
exports.getHousingStats = async (req, res) => {
    try {
        const totalApplications = await HousingApplication.count();
        const approvedApplications = await HousingApplication.count({
            where: { status: "approved" },
        });
        res.json({ totalApplications, approvedApplications });
    } catch (error) {
        console.error("Stats Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};
