const express = require("express");

// Add Request Controller
const requestController = require('../controllers/requestController');

const router = express.Router();

// Send Request Form
router.post('/request', requestController.requestSignup);

router.route('/').get(requestController.getAllRequests);

module.exports = router;