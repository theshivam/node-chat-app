var socket = io();
console.log('Inside index.js');
socket.on('connect', function() {
  console.log('Connected to the server !');

  //
  // socket.emit('createMessage',{
  //   from:'Browser',
  //   text:'Hello Server !'
  // })
});

socket.on('newMessage',function(message){
  console.log(message);
  var li = $('<li></li>');
  li.text(`${message.from} : ${message.text}`);
  $('#messages').append(li);
});
socket.on('disconnect',function() {
  console.log('Disconnected from the server !');
});
//
// socket.emit('createMessage',{
//   from:'Shiv',
//   text: 'Hi'
// }, function(data){
//   console.log('Got it !',data);
// });

$('#message-form').on('submit',function(e){
  e.preventDefault();

  socket.emit('createMessage',{
    from: 'User',
    text: $('[name=message]').val()
  },function(){

  });
});
