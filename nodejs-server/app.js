const path = require('path');
const http = require('http');
const express = require('express');

const publicPath = path.join(__dirname, '../vue-fe');
const port = 5000;
let app = express();
let server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "https://localhost:8080",
        methods: ["GET", "POST"]
    }
});

let chatMessages = [];

app.use(express.static(publicPath));

//socket setup
io.on('connection', (socket) => {
    console.log('socket connection established', socket.id);

    socket.on('chat', function(data){
        console.log(data);
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        console.log(data);
        socket.broadcast.emit('typing', data);
    });
},);

server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
})



