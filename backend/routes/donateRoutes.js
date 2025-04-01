const express = require("express");
const router = express.Router();
const donateController = require("../controllers/donateController");

router.post("/create", donateController.createDonation);

module.exports = router;
