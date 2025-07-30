const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) 
            return res.status(400).json({ error: "Email already registered" });

        const user = new User({ email, password });
        await user.save();

        return res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Error registering user:", err);
        return res.status(500).json({ error: "Server error" });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) 
            return res.status(400).json({ error: "Invalid email or password" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) 
            return res.status(400).json({ error: "Invalid email or password" });

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return res.status(200).json({ token });
    } catch (err) {
        console.error("Error logging in:", err);
        return res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;