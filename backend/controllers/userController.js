const { User } = require("../models");

// Get user profile
exports.getProfile = async (req, res) => {
    const userId = req.user.userId; // From JWT token

    try {
        const user = await User.findByPk(userId, {
            attributes: ["id", "full_name", "email", "roleId"], // Exclude password
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Profile Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    const userId = req.user.userId;
    const { full_name, email } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.full_name = full_name || user.full_name;
        user.email = email || user.email;
        await user.save();

        res.json({ id: user.id, full_name: user.full_name, email: user.email });
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};
