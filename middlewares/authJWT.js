require('dotenv').config();
const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};

module.exports = verifyToken;