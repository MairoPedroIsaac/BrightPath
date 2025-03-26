const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

// Register function
const register = async (req, res) => {
    let { full_name, email, password, roleId } = req.body;
    console.log("Received Data:", req.body);

    try {
        if (!full_name || !email || !password) {
            return res.status(400).json({ error: "All fields (full_name, email, password) are required." });
        }

        const existingUser = await pool.query(`SELECT * FROM "Users" WHERE email = $1`, [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: "Email already registered." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        roleId = roleId || 1;

        const result = await pool.query(
            `INSERT INTO "Users" (full_name, email, password_hash, "roleId") VALUES ($1, $2, $3, $4) RETURNING id, full_name, email, "roleId"`,
            [full_name, email, hashedPassword, roleId]
        );

        res.status(201).json(result.rows[0]);
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
        const user = await pool.query(`SELECT * FROM "Users" WHERE email = $1`, [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.rows[0].password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user.rows[0].id, roleId: user.rows[0].roleId },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token, roleId: user.rows[0].roleId }); // ✅ Added roleId

        console.log("Login Successful. Token Generated.");
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};

module.exports = { register, login }; // ✅ Correct export
