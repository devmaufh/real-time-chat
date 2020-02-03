var socket = require('socket.io');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = socket.listen(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

var connected = {};

io.on('connection', function (socket) {
    connected[socket.id] = socket;
    socket.broadcast.emit('users', { connected: socket.id });
    socket.on('new_message', function (data) {
        connected[data.receipt].emit('new_message',{msg: data.msg})
    });
});