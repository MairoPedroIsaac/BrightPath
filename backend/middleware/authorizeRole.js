const pool = require('../config/db'); // PostgreSQL database connection

const authorizeRole = (requiredRoles) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.userId; // Get user ID from token
      const result = await pool.query("SELECT roleId FROM Users WHERE id = $1", [userId]);

      if (result.rows.length === 0) {
        return res.status(403).json({ error: "User not found" });
      }

      const userRoleId = result.rows[0].roleId;

      // Fetch role name from the roles table
      const roleResult = await pool.query("SELECT name FROM roles WHERE id = $1", [userRoleId]);
      const userRole = roleResult.rows[0].name;

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
