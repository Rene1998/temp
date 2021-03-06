const path = require('path');
const http = require('http');
const express = require('express');

const publicPath = path.join(__dirname, '../vue-fe');
const port = 5000;
let app = express();
let server = http.createServer(app);
var io = require('socket.io')(server, {
    origins: 'http://localhost:8080',
    cors: {
        credentials: true,
        origin: "http://localhost:8080",
    },
    handlePreflightRequest: (req, res) => {
        res.header("Access-Control-Allow-Origin", "http://localhost:8080");
        res.header('Access-Control-Allow-Credentials', true);
    }
});


app.use(express.static(publicPath));

//socket setup
io.on('connection', (socket) => {



    console.log('socket connection established', socket.id);

    socket.on('chat', (messageReceivedFromClient) => {
        console.log(messageReceivedFromClient);
        io.emit('chatResponse', messageReceivedFromClient)
    })

    /*socket.on('message', (data) => {
        if(data != null || undefined) {
            chatMessages.push(data);
            console.log(data.message+'was emitted by'+data.handle);
            console.log(chatMessages)
        }else{console.log('There was an error receiving data');}

    })

    socket.on('chat', function(){
        console.log(chatMessages+'was emitted to the client');
        socket.broadcast.emit('chat', chatMessages);
    });*/

    /*socket.on('typing', function(data){
        console.log(data);
        socket.broadcast.emit('typing', data);
    });*/

},);

io.on('disconnect', () => {
    console.log(io.sockets.connected);
})

server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
})



