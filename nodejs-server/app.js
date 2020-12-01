const express = require('express');

const path = require('path');
var cors = require('cors')


//app setup
const app = express();
const PORT = 5000;
var server = app.listen(PORT, function () {
    console.log('listening on '+PORT);
})
var io = require('socket.io')(server, {
    origins: 'https://localhost:8080',
    handlePreflightRequest: (req, res) => {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "https://localhost:8080",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Methods": "GET,POST"
        });
        res.end();
    }
});

//static files setup
//app.use(express.static(path.join(__dirname, '../vue-fe/*')));


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
