const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;
const PASSWORD = "latroussekayak";

app.use(express.static(path.join(__dirname, 'public')));

// Liste des utilisateurs connectés (optionnel)
let users = {};

io.on('connection', (socket) => {
    console.log("Nouvelle connexion WebSocket");

    socket.on('join', ({ pseudo }) => {
        users[socket.id] = pseudo;
        io.emit('message', { pseudo: 'Serveur', message: `${pseudo} a rejoint le chat.` });
    });

    socket.on('message', (data) => {
        io.emit('message', data);
    });

    socket.on('disconnect', () => {
        const pseudo = users[socket.id];
        if (pseudo) {
            io.emit('message', { pseudo: 'Serveur', message: `${pseudo} a quitté le chat.` });
            delete users[socket.id];
        }
    });
});

server.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});