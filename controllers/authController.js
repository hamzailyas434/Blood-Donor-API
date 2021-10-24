// Model Import
const User = require('./../models/userModel');
// Global Error
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
// Import Json web token library
const jwt = require('jsonwebtoken');

// Apply JWT token
const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
};
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
    const token = signToken(newUser._id);
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

exports.login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;
    // 1) Check if email and password exist
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }
    // 2) check if user exists && password is correct
    const user = await User.findOne({email}).select('+password');


    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect mail or password', 401));
    }
    // 3) If everything ok, send token to client
    const token = signToken(user._id);
    res.status(200).json({
        status: 'success',
        token
    });
});

// Protect Middleware
exports.protect = catchAsync(async (req, res, next) => {
    let token;

    // 1) Getting token and check of it's there
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    console.log(token);
    if (!token) {
        return next(new AppError('You are not logged in! Please log in get access', 401));
    }
    // 2) Valid token or not Verification
    // 3) Check if user still exists
    // 4) if user change password after the JWT token was issued

    // return next(new AppError('Unauthorize Access',404))
    next();
});