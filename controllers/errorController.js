const AppError = require('./../utils/appError');
const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 404);
};
const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    console.log(value);

    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
};
const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);

    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};
// JWT Error
const handleJWTError = () => new AppError('Invalid Token. Please log in again!', 401);
// JWT Expired Error
const handleJWTExpiredError = () => new AppError('Your Token is expired! Please log in again!', 401);


const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};
const sendErrorProd = (err, res) => {
    // Operational, Trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
        //     Programming or other unknown error: don't leak error details
    } else {
        // 1) Log Error
        console.error('Error 🤔', err);
        // 1) Send Generic Message
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong',
        });
    }

};
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        // if (err.code === '11000') err = handleDuplicateFieldsDB(err);
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error;
        if (err.name === 'CastError')
            error = handleCastErrorDB(err);

        if (err.code === 11000)
            error = handleDuplicateFieldsDB(err);

        if (err.name === 'ValidationError')
            error = handleValidationErrorDB(err);
        //     Json web token error

        if (err.name === 'JsonWebTokenError')
            error = handleJWTError(err);

        if (err.name === 'TokenExpiredError')
            error = handleJWTExpiredError();

        sendErrorProd(err, res);
    }

};