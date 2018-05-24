const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/Message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket) => {
  console.log('New User Connected !');

  socket.emit('newMessage', generateMessage('Admin','Welcome to the chat App !'));

  socket.broadcast.emit('newMessage',generateMessage('Admin','New User joined !'));

  socket.on('createMessage',(message,callback) =>{
    console.log(message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback('This is from server !');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude,coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected !');
  });
});

server.listen(port,() => {
  console.log(`Server started on port ${port} !`);
});
