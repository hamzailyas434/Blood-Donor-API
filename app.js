const express = require('express');
// Add morgan Middleware
const morgan = require("morgan");
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
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    });
    next();
});

module.exports = app;