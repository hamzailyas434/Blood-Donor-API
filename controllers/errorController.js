const AppError = require('./../utils/appError');
const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 404);
};
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
            message: err.message,
        });
        //     Programming or other unknown error: don't leak error details
    } else {
        // 1) Log Error
        console.log('Error 🤔', err);
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
        if (err.name === 'CastError') {
            error = handleCastErrorDB(err);
        } 

        sendErrorProd(error, res);
    }

};