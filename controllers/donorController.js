const Donor = require('./../models/donorModel');

exports.getAllDonors = async (req, res) => {
    try {
        const donors = await Donor.find();
        res.status(200).json({
            status: "success",
            results: donors.length,
            data: {
                donors,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err,
        });
    }
};
exports.getDonor = async (req, res) => {
    try {
        const donor = await Donor.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: {
                donor,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};

exports.createDonor = async (req, res) => {
    try {
        const createDonor = await Donor.create(req.body);
        res.status(200).json({
            status: "success",
            data: {
                createDonor,
            },
        });

    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};

exports.deleteDonor = async (req, res) => {
    try {
        const deleteDonor = await Donor.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success",
            data: {
                deleteDonor,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};

exports.updateDonor = async (req, res) => {
    try {
        const updateDonor = await Donor.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({
            status: "success",
            data: {
                updateDonor,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};