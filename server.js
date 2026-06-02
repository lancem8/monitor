const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

// Serve the HTML files
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'monitor.html')));
app.get('/control', (req, res) => res.sendFile(path.join(__dirname, 'controller.html')));

// Handle real-time communication
io.on('connection', (socket) => {
    console.log('A device connected');

    socket.on('updateVitals', (data) => {
        io.emit('vitalsChanged', data);
    });
});

// Cloud platforms assign dynamic ports via process.env.PORT
const PORT = process.env.PORT || 3000;
http.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
