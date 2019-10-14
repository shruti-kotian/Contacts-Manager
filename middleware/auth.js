const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    //Get token from header
    const token = req.header('x-auth-token');

    //check if no token
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    //If token present verify it
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        //Extract user portion from the decoded token and assign to user in request
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
}