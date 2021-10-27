const express = require("express");
const authController = require('./../controllers/authController');

// Add Donor Controller
const donorController = require('../controllers/donorController');

const router = express.Router();


// Signup
router.post('/signup', donorController.createDonor);
// router.route("/").get(authController.protect, donorController.getAllDonors).post(donorController.createDonor);
router.route("/").get(authController.protect, donorController.getAllDonors);
router.route("/:id").get(donorController.getDonor).delete(donorController.deleteDonor).patch(donorController.updateDonor);

module.exports = router;