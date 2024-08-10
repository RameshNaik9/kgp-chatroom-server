// /src/controllers/chatController.js
const chatService = require('../services/chatService');

exports.getChatHistory = async (req, res, next) => {
    try {
        const messages = await chatService.getAllMessages();
        res.status(200).json(messages);
    } catch (error) {
        next(error);
    }
};

exports.sendMessage = async (req, res, next) => {
    try {
        const { userId, message } = req.body;
        const savedMessage = await chatService.saveMessage(userId, message);
        res.status(201).json(savedMessage);
    } catch (error) {
        next(error);
    }
};
