const express = require('express');
// Add morgan Middleware
const morgan = require("morgan");

// Adding AppError Class
const AppError = require('./utils/appError');
// Add Global Error Handler
const globalErrorHandler = require('./controllers/errorController');
// Add Route
const donorRoute = require('./routes/donorRoute');

const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
app.use(express.json());

app.use('/api/v1/donors', donorRoute);

// Global Error Handling  Original: 127.0.0.1:3000/api/v1/donors Error: 127.0.0.1:3000/api/v1/donor
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;