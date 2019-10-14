const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

// @route GET api/auth
// @desc Get Logged in user
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

// @route POST api/auth
// @desc Log in
// @access Public 
router.post('/', [
    check('email', 'Enter Enter Valid Email').isEmail(),
    check('password', 'Password is required').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });
        //if user with that email does not exist return Invalid Credentials
        if (!user) {
            return res.status(404).json({ msg: "Invalid Credentials" })
        }
        //isMatch compares password from request with user's stored password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(404).json({ msg: "Invalid Credentials" })
        }

        //payload needed for jwt, here we only use id which is created in Mongodb
        const payload = {
            user: {
                id: user.id
            }
        }

        //method to create token
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {
                expiresIn: 360000
            },
            (err, token) => {
                if (err) throw err;
                res.json({ token })
            });

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }

});

module.exports = router;