const catchAsync = require("./../utils/catchAsync");
const User = require("./../models/userModel");


exports.getAllUsers = catchAsync(async (req, res) => {

    const users = await User.find();
    res.status(200).json({
        status: "success",
        results: users.length,
        data: {
            users,
        },
    });

});