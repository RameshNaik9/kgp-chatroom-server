// server.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const connectDB = require('./src/db/db');
const routes = require('./src/routes');
const { errorHandler } = require('./src/middleware/errorHandler');
const { handleNewMessage } = require('./src/controllers/chatController');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

// Middleware
app.use(express.json());

// CORS Middleware
app.use(cors({ origin: '*', credentials: true }));

// Routes
app.use('/api', routes);

// Error Handling Middleware
app.use(errorHandler);

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('New client connected');
    handleNewMessage(socket, io);

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Connect to MongoDB
connectDB();

// Start Server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
