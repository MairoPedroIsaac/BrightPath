const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Access Denied. No Token Provided." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user from database
        const user = await User.findByPk(decoded.userId);
        if (!user) {
            return res.status(401).json({ error: "Invalid token" });
        }

        req.user = user; // Attach user to request object
        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid Token" });
    }
};
