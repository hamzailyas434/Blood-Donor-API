const mongoose = require("mongoose");
// Import Validator for email validation
const validator = require("validator");
const bcrypt = require("bcryptjs");
const donorScheme = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, `A Donor must have a full name`],
    },
    gender: {
        type: String,
        trim: true,
        enum: ['male', 'female', 'others'],
        required: [true, `A Donor must select her gender`],
    },
    age: {
        type: Number,
        trim: true,
        required: [true, `A Donor must have a age`],
    },
    select_blood_group: {
        type: String,
        enum: ["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"],
        required: [true, `A Donor must have a Blood Group`],
    },
    contact_no: {
        type: Number,
        required: [true, `A Donor must have a Contact Number`],
    },
    cnic: {
        type: Number,
        required: [true, `A Donor must have a CNIC`],
        min: 13
    },
    city: {
        type: String,
        trim: true,
        required: [true, `A Donor must have a City Name`],
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Please enter your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },

    password: {
        type: String,
        required: [true, "Please provide a Password"],
        minlength: 8,
        // hide because we don't want to show password in Get all User Record
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please provide a Confirm Password"],
        validate: {
            // This is only works on Create and SAVE !!
            validator: function (el) {
                return el === this.password; // abc === abc
            },
            message: "Passwords are not the same",
        }
    },
});
// Encryption add Between getting the data and adding in the database
donorScheme.pre("save", async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified("password")) return next();

    //  Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    // Delete the confirm password at this time we have the password in hash form
    this.passwordConfirm = undefined;
    //  call next()
    next();
});
const Donor = mongoose.model("Doners", donorScheme);
module.exports = Donor;
