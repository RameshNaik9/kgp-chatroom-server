// /src/services/chatService.js
const ChatMessage = require('../models/ChatMessage');

exports.saveMessage = async (userId, message) => {
    const chatMessage = new ChatMessage({ user: userId, message });
    await chatMessage.save();
    return chatMessage;
};

exports.getAllMessages = async () => {
    return ChatMessage.find().populate('user', 'fullName').sort({ createdAt: 1 });
};
