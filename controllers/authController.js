// Model Import
const User = require('./../models/userModel');
// Global Error
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
// Import Json web token library
const jwt = require('jsonwebtoken');


exports.signup = catchAsync(async (req, res) => {

    // We just insert these 4 field in the database if the user enter the role then this will not insert into the database because
    // we only want these 4 fields in signup
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    // Apply JWT token
    const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
    // Now send token to client
    res.status(201).json({
        status: 'success',
        // Token is here
        token,
        data: {
            newUser
        }
    });
});