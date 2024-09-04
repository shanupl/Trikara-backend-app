const asyncHandler = require('express-async-handler');
const { User } = require('../models/user.model');
const bcrypt = require('bcryptjs');

const { generateToken } = require("../utils/generateToken");

// Sign Up 
module.exports.signUp = asyncHandler(async (req, res) => {

    const { firstName, lastName, email, password, phoneNumber } = req.body;

    const salt = await bcrypt.genSalt(10);
    var hashedPassword = await bcrypt.hash(password, salt);

    const isExisting = await User.findOne({email:email});
    if(isExisting) {
        return res.json("User already exist");
    }

    const user = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        userType: 'candidate',
        status: 'active',
        password: hashedPassword,
    });

    let data = {
        user,
        token: generateToken(user._id),
    };

    res.status(200);
    return res.json({ data })
});


// User Login
module.exports.login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
        res.status(401);
        res.json({ error: 'Incorrect email or password' });
    } else {
        var isValidLogin = await bcrypt.compare(password, user.password);

        if (isValidLogin) {
            
            if (user.userType === 'candidate') {
                let data = {
                    user,
                    token: generateToken(user._id),
                };
                res.status(200);
                res.json({ data });
            } else {
                res.status(401);
                res.json({ error: 'Unauthorized.' });
            }
        } else {
            res.status(401);
            res.json({ error: 'Incorrect email or password' });
        }
    }
});
