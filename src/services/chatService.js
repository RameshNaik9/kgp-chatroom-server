// /src/services/chatService.js
const ChatMessage = require('../models/ChatMessage');

exports.saveMessage = async (userId, message, replyTo = null) => {
    const chatMessage = new ChatMessage({ user: userId, message, replyTo });
    await chatMessage.save();
    return chatMessage;
};

exports.getAllMessages = async () => {
    return ChatMessage.find().populate('user', 'fullName').populate('replyTo').sort({ createdAt: 1 });
};

exports.editMessage = async (messageId, newMessage) => {
    const updatedMessage = await ChatMessage.findByIdAndUpdate(
        messageId,
        { message: newMessage, isEdited: true },
        { new: true }
    );
    return updatedMessage;
};

exports.deleteMessage = async (messageId) => {
    const deletedMessage = await ChatMessage.findByIdAndUpdate(
        messageId,
        { message: "This message was deleted", isDeleted: true },
        { new: true }
    );
    return deletedMessage;
};
