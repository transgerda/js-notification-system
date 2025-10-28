const types = Object.freeze({
    'TEST': 'test',
    'INFO': 'info',
    'WARNING': 'warning',
    'DEFAULT': 'default'
})

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Dummy list of known users
const validUsers = ['75', '1'];

// POST endpoint to send notification
app.post('/notify', (req, res) => {
    const { userId, title, content, icon, type, restrictionUrl, duration } = req.body;
    // Basic user check
    if (!validUsers.includes(userId)) {
        return res.status(403).json({ error: 'Invalid userId' });
    }

    const key = String(type || '').trim().toUpperCase();
    const selectedType = types[key] || types.DEFAULT;

    const notification = {
        title,
        content,
        icon,
        type: selectedType,
        restrictionUrl,
        duration,
        timestamp: new Date()
    };

    // Emit to that user's socket
    io.to(userId).emit('notification', notification);

    res.json({ success: true });
});

// Handle socket connections
io.on('connection', (socket) => {
    const {userId} = socket.handshake.query;

    if (!userId || !validUsers.includes(userId)) {
        console.log('Invalid or missing userId, disconnecting...');
        return socket.disconnect();
    }

    socket.join(userId);
    console.log(`User id: ${userId} connected via WebSocket`);
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
