// In order to handle all the error we use 'AppError' class in our project
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        // If the statusCode is 404 then 'fail' else 'error'
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

        //  so what I'm gonna do now is to actually also create a .is operational property here. So this.is operational, and set it to true. So all of our errors
        //  will get this property set to true, and I'm doing that so that later we can then test for this property and only send error messages back to the client for these operational errors
        // that we created using this class.And this is useful because some other crazy unexpected errors that might happen in our application, for example a programming error,
        // or some bug in one of the packages that we require into our app, and these errors will then of course not have this .is operational property on them,
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;