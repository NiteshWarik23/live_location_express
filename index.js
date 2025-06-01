const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const PORT = process.env.PORT || 4001;

const app = express();
app.use(express.static('public'));

const server = http.createServer(app);

const io = socketIo(server); // Attach socket.io to the server

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('sendLocation', (data) => {
        console.log('Received location:', data);
        io.emit('changeLocation', data);
        //io.emit('changeLocation', { latitude: 19.0482, longitude: 72.8940 });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));