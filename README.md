

## Create Signup User

Add Password and Confirm Password Custom Validation

## Add Password Encryption Hash 
### install  bcryptjs
npm i bcryptjs

https://www.npmjs.com/package/bcryptjs

Add this into your model
const bcrypt = require('bcryptjs');

// Encryption add Between getting the data and adding in the database
userSchema.pre('save', async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();

    //  Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    // Delete the confirm password at this time we have the password in hash form
    this.passwordConfirm = undefined;
    //  call next()
    next();
});