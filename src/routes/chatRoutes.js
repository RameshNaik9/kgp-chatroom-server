// /src/routes/chatRoutes.js
const express = require('express');
const { getChatHistory, sendMessage, editMessage, deleteMessage } = require('../controllers/chatController');
const router = express.Router();

router.get('/history', getChatHistory);
router.post('/send', sendMessage);
router.put('/edit', editMessage); // New route for editing messages
router.delete('/delete', deleteMessage); // New route for deleting messages

module.exports = router;
