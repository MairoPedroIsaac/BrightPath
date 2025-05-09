const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const applicationRoutes = require('./routes/applicationRoutes'); // Require the application routes
const db = require("./models");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/applications", applicationRoutes); // Use the application routes

app.get("/", (req, res) => {
    res.send("BrightPath API is running...");
});

// Database Synchronization
db.sequelize
    .sync() // Remove `force: true` to avoid dropping tables
    .then(() => {
        console.log("Database synced successfully!");
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error syncing database:", error);
    });
