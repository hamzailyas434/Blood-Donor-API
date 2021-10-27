const mongoose = require("mongoose");
const requestScheme = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, `Please enter your name`],
    },
    gender: {
        type: String,
        trim: true,
        enum: ['male', 'female', 'others'],
        required: [true, `Select your gender`],
    },
    age: {
        type: String,
        trim: true,
        required: [true, `Please select your age`],
    },
    contact_no: {
        type: Number,
        required: [true, `Please enter your Contact Number`],
    },
    select_blood_group: {
        type: String,
        enum: ["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"],
        required: [true, `Select your Blood Group`],
    },
    required_date: Date,
    detail: {
        type: String,
        trim: true,
        required: [true, `Please Enter Your Details`],
    },
});

const requestBlood = mongoose.model("REQUEST_BLOOD", requestScheme);
module.exports = requestBlood;
