var socket = io();
console.log('Inside index.js');
socket.on('connect', () => {
  console.log('Connected to the server !');


  socket.emit('createMessage',{
    from:'Browser',
    text:'Hello Server !'
  })
});

socket.on('newMessage',function(message){
  console.log(message);
});
socket.on('disconnect',() => {
  console.log('Disconnected from the server !');
});
