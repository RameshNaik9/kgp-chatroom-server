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
        const { userId, message, replyTo } = req.body; // Include replyTo field
        const savedMessage = await chatService.saveMessage(userId, message, replyTo);
        res.status(201).json(savedMessage);
    } catch (error) {
        next(error);
    }
};

exports.editMessage = async (req, res, next) => {
    try {
        const { messageId, newMessage } = req.body;
        const updatedMessage = await chatService.editMessage(messageId, newMessage);
        res.status(200).json(updatedMessage);
    } catch (error) {
        next(error);
    }
};

exports.deleteMessage = async (req, res, next) => {
    try {
        const { messageId } = req.body;
        const deletedMessage = await chatService.deleteMessage(messageId);
        res.status(200).json(deletedMessage);
    } catch (error) {
        next(error);
    }
};
