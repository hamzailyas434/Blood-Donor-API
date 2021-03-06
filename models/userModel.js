const mongoose = require("mongoose");
// Import Validator for email validation
const validator = require("validator");
//Add Hash Encryption in Password
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Please enter your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    photo: String,

    password: {
        type: String,
        required: [true, "Please provide a Password"],
        minlength: 8,
        // hide because we don't want to show password in Get all User Record
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your Password"],
        validate: {
            // This is only works on Create and SAVE !!
            validator: function (el) {
                return el === this.password; // abc === abc
            },
            message: "Passwords are not the same",
        },

    },
    passwordChangedAt: {
        type: Date,
        default: Date.now()
    },
});
// Encryption add Between getting the data and adding in the database
userSchema.pre("save", async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified("password")) return next();

    //  Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    // Delete the confirm password at this time we have the password in hash form
    this.passwordConfirm = undefined;
    //  call next()
    next();
});

// Instant Methods
userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
    if (this.passwordChangedAt) {
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimeStamp < changedTimeStamp;
    }
    //False means not change
    return false;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
