// /src/models/ChatMessage.js
const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    isDeleted: { type: Boolean, default: false }, // New field for deletion status
    isEdited: { type: Boolean, default: false },  // New field for edited status
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatMessage' }, // New field for replies
}, { timestamps: true });

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
