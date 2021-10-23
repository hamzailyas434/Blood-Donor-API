const express = require("express");


// Add Donor Controller
const donorController = require('../controllers/donorController');

const router = express.Router();

router.route("/").get(donorController.getAllDonors).post(donorController.createDonor);
router.route("/:id").get(donorController.getDonor).delete(donorController.deleteDonor).patch(donorController.updateDonor);

module.exports = router;