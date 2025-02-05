const connectToMongo = require('./config/db')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config({ path: '../.env' });

const app = express();

// Import routes
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

connectToMongo();

app.use(bodyParser.json());


// Enable CORS only for your frontend origin
const corsOptions = {
    origin: ['http://localhost:3000', 'solve-sense-ai.vercel.app'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

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