const mongoose = require('mongoose');

// Define the schema for a user
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    aiResponses: [
        {
            prompt: String,
            response: String,
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});

// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;