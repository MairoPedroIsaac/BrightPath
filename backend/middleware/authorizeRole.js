const { Role } = require("../models");

const authorizeRole = (requiredRoles) => {
    return async (req, res, next) => {
        try {
            const userId = req.user.userId; // Get user ID from token

            // Fetch user's role using Sequelize
            const user = await User.findByPk(userId, {
                include: [{ model: Role, attributes: ["name"] }],
            });

            if (!user) {
                return res.status(403).json({ error: "User not found" });
            }

            const userRole = user.Role.name; // Get role name

            if (requiredRoles.includes(userRole)) {
                next();
            } else {
                res.status(403).json({ error: "Access denied" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
};

module.exports = authorizeRole;
