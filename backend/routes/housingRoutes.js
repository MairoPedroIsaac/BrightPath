const express = require("express");
const router = express.Router();
const housingController = require("../controllers/housingController");

router.post("/apply", housingController.applyForHousing);
router.get("/status/:userId", housingController.getApplicationStatus);

module.exports = router;
