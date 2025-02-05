const connectToMongo = require('./config/db')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config({ path: '../.env' });

// Import routes
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

connectToMongo();


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/', (req, res) => {
    res.send('server is working');
});


// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});

module.exports = app;