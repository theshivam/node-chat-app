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

socket.on('newLocationMessage', function(message){
  var li = $('<li></li>');
  var a = $('<a >My Current Location</a>');

  li.text(`${message.from}: `);
  a.attr('href',message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

$('#message-form').on('submit',function(e){
  e.preventDefault();

  socket.emit('createMessage',{
    from: 'User',
    text: $('[name=message]').val()
  },function(){

  });
});

var locationButton = $('#send-location');
locationButton.on('click', function(e){
  if (!navigator.geolocation){
    return alert('Geolocation not supported by browser !')
  }

  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(){
    alert('Unable to fetch location !')
  });
});
