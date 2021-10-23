const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({path: './config.env'});
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.connect(DB, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to DB");
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(` app listening at http://localhost:${port}`);
});
