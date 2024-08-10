// /src/routes/chatRoutes.js
const express = require('express');
const { getChatHistory, sendMessage } = require('../controllers/chatController');
const router = express.Router();

router.get('/history', getChatHistory);
router.post('/send', sendMessage); // New endpoint for sending messages

module.exports = router;
