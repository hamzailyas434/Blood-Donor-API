// Model Import
const Blood_Request = require('./../models/requestModel');
// Global Error
const catchAsync = require('./../utils/catchAsync');

exports.getAllRequests = catchAsync(async (req, res, next) => {
    const requests = await Blood_Request.find();
    res.status(200).json({
        status: "success",
        results: requests.length,
        data: {
            requests,
        },
    });
});


exports.requestSignup = catchAsync(async (req, res) => {
    const requestBlood = await Blood_Request.create(req.body);
    res.status(200).json({
        status: "success",
        data: {
            requestBlood,
        },
    });
});