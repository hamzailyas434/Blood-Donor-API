const mongoose = require("mongoose");
const donorScheme = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, `A Donor must have a Name`],
    },
    blood_group: {
        type: String,
        trim: true,
        required: [true, `A Donor must have a Blood Group`],
    },
    last_donation_date: {
        type: String,
        trim: true,
        required: [true, `A Donor must have a Last Donation Date`],
    },
    contact_no: {
        type: Number,
        required: [true, `A Donor must have a Contact Number`],
    },
    cnic: {
        type: Number,
        required: [true, `A Donor must have a CNIC`],
    },
    location: {
        type: String,
        trim: true,
        required: [true, `A Donor must have a Location`],
    },
    city: {
        type: String,
        trim: true,
        required: [true, `A Donor must have a City Name`],
    },
});

const Donor = mongoose.model("Doners", donorScheme);
module.exports = Donor;
