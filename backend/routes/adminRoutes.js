const express = require("express");
const authorizeRole = require("../middleware/authorizeRole");
const authenticate = require("../middleware/authenticate");
const adminController = require("../controllers/adminController");

const router = express.Router();

// Admin Dashboard
router.get("/dashboard", authenticate, authorizeRole(["admin"]), (req, res) => {
    res.status(200).json({ message: "Welcome, Admin!" });
});

// Manage Users
router.get("/users", authenticate, authorizeRole(["admin"]), adminController.getAllUsers);
router.delete("/users/:userId", authenticate, authorizeRole(["admin"]), adminController.deleteUser);

module.exports = router;
