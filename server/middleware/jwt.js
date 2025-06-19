require("dotenv").config();
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.userId;
            next();
        } catch (err) {
            return res.status(401).json({ message: "invalid  token" });
        }
    } else {
        return res.status(401).json({ message: "token missing" });
    }
};


const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "3d",
    });
};

module.exports = { authMiddleware, generateToken };
