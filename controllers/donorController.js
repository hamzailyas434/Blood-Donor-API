const Donor = require('./../models/donorModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllDonors = catchAsync(async (req, res, next) => {

    const donors = await Donor.find();
    res.status(200).json({
        status: "success",
        results: donors.length,
        data: {
            donors,
        },
    });

});
exports.getDonor = catchAsync(async (req, res, next) => {

    const donor = await Donor.findById(req.params.id);
    res.status(200).json({
        status: "success",
        data: {
            donor,
        },
    });

});

exports.createDonor = catchAsync(async (req, res, next) => {

    const createDonor = await Donor.create(req.body);
    res.status(200).json({
        status: "success",
        data: {
            createDonor,
        },
    });
});

exports.deleteDonor = catchAsync(async (req, res, next) => {

    const deleteDonor = await Donor.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status: "success",
        data: {
            deleteDonor,
        },
    });

});


exports.updateDonor = catchAsync(async (req, res, next) => {

    const updateDonor = await Donor.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
        status: "success",
        data: {
            updateDonor,
        },
    });

});

