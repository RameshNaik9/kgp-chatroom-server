// server.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const connectDB = require('./src/db/db');
const routes = require('./src/routes');
const { errorHandler } = require('./src/middleware/errorHandler');
const chatService = require('./src/services/chatService');

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());

// CORS Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));  // Enable CORS

// Socket.io setup
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for chat messages
    socket.on('chatMessage', async (msg, callback) => {
        try {
            const savedMessage = await chatService.saveMessage(msg.userId, msg.message);
            
            // Emit back with the localId and set status to delivered
            io.emit('chatMessage', {
                user: savedMessage.user,
                message: savedMessage.message,
                localId: msg.localId, // Include the localId to match the original message
                status: 'delivered'
            });

            // Respond to the client that the message was saved successfully
            callback({ status: 'ok' });
        } catch (error) {
            console.error('Error saving message:', error.message);
            // Respond to the client with an error status
            callback({ status: 'error' });
        }
    });



    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Routes
app.use('/api', routes);

// Error Handling Middleware
app.use(errorHandler);

// Connect to MongoDB
connectDB();

// Start Server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
