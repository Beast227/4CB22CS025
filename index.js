const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
const { connectDB } = require('./config/db');
connectDB();

// Importing the user routes
app.use('/', require('./routes/users'));
app.use('/', require('./routes/posts'));
app.use('/', require('./routes/comment'));

// Checking the connection is connected or not with the database
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');

    // Start server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
});