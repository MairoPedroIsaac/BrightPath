const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

router.get("/:userId", notificationController.getUserNotifications);
router.post("/send", notificationController.sendNotification);

module.exports = router;
