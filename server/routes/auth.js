const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// POST route for registering a user
router.post('/register', async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;

        
        // Validate input
        if (!username || !password || !confirmPassword) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }
        let newUser = await User.findOne({ username: username });
        if (newUser) {
          return res.status(400).json({ error: "Sorry a user with this username already exists" })
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        // Create a new user
        newUser = new User({ username, password: hashedPass });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        res.status(500).json({ error: error.message });
    }
});

// POST route for user login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        // Find the user in the database
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        // Check if the password matches
        if (!passwordCompare) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check if the user is an admin
        if (user) {
            return res.status(200).json({
                message: 'Login successful',
                username: user.username,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;