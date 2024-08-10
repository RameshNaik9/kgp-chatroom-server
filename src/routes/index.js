// /src/routes/index.js
const express = require('express');
const authRoutes = require('./authRoutes');
const chatRoutes = require('./chatRoutes'); // Import the chat routes

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/chat', chatRoutes); 

module.exports = router;
