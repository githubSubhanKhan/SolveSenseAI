const express = require('express');
const User = require('../models/User'); // Import User model
const generateResponse = require('../utils/generateResponse'); // Import AI response function
const router = express.Router();

/**
 * @route   POST /api/chat/send-message
 * @desc    Process user input, generate AI response, and save in MongoDB
 */
router.post('/send-message', async (req, res) => {
  const { username, prompt } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate AI response using Cerebras SDK
    const response = await generateResponse(prompt);

    // Save chat entry in user history
    const chatEntry = { prompt, response, date: new Date() };
    user.aiResponses.push(chatEntry);
    await user.save();

    res.status(200).json({ message: 'Chat saved successfully', chat: chatEntry });
  } catch (error) {
    console.error('Chat Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/chat/fetch-chats
 * @desc    Fetch all previous chat history for a user
 */
router.get('/fetch-chats', async (req, res) => {
  const { username } = req.query;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ chats: user.aiResponses });
  } catch (error) {
    console.error('Fetch Chats Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;