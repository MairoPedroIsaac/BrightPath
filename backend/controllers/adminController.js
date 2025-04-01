const { User } = require("../models");

// Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ["id", "full_name", "email", "roleId"], // Exclude password
        });
        res.json(users);
    } catch (error) {
        console.error("Fetch Users Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};

// Delete a user (Admin only)
exports.deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        await user.destroy();
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete User Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};
