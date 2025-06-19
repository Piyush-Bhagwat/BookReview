const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { generateToken } = require("../middleware/jwt");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "User already exists" });

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, passwordHash });
        await newUser.save();

        const token = generateToken(newUser._id);
        res.status(201).json({
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (err) {
        res.status(500).json({ message: "server error" });
        console.log("Error register", err);
    }
});

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        const token = generateToken(user._id);
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        res.status(500).json({ message: "server error" });
    }
});

module.exports = userRouter;
