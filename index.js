const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.render('index.ejs');
});

io.on('connection', function(socket) {
    socket.on('connect user', function(username) {
       socket.connect_user = username;
        io.emit('connect user', '🔵 <i>' + username + ' join the chat..</i>');
    });
    socket.on('disconnect', function(username) {
        io.emit('connect user', '🔴 <i>' + socket.connect_user + ' left the chat..</i>');
    })
    socket.on('chat message', function(msg) {
        console.log(msg);
        io.emit('chat message', '<strong>' + socket.connect_user + '</strong>: ' + msg);
    });

});
const server = http.listen(8080, function() {
    console.log('listening on *:8080');
});