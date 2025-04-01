const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models"); // Import the User model
const dotenv = require("dotenv");

dotenv.config();

// Register function
const register = async (req, res) => {
    let { full_name, email, password } = req.body;
    console.log("Received Data:", req.body);

    try {
        if (!full_name || !email || !password) {
            return res.status(400).json({ error: "All fields (full_name, email, password) are required." });
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ error: "Email already registered." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        const newUser = await User.create({
            full_name,
            email,
            password_hash: hashedPassword,
            roleId: 2, // Default role ID
        });

        res.status(201).json({ message: 'User registered successfully', user: newUser.get({ exclude: ['password_hash'] }) }); // ✅ Respond with new user data
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};

// Login function
const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("Login Attempt:", email);

    try {
        // Find the user by email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, roleId: user.roleId },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token, roleId: user.roleId, userId: user.id }); // ✅ Include roleId and userId
        console.log("Login Successful. Token Generated.");
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};

module.exports = { register, login };
