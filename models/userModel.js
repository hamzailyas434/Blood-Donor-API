const mongoose = require('mongoose');
// Import Validator for email validation
const validator = require('validator');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please tell us your name']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Please provide a Password'],
        minlength: 8
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your Password']
    }

});

const User = mongoose.model('User', userSchema);
module.exports = User;