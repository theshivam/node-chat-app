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
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template,{
    from:message.from,
    text:message.text,
    createdAt:formattedTime
  });
  $('#messages').append(html);
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
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template,{
    from : message.from,
    url : message.url,
    createdAt : formattedTime
  });

  // var li = $('<li></li>');
  // var a = $('<a >My Current Location</a>');
  //
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href',message.url);
  // li.append(a);
  jQuery('#messages').append(html);
});

$('#message-form').on('submit',function(e){
  e.preventDefault();
  var messageTextBox = $('[name=message]');
  socket.emit('createMessage',{
    from: 'User',
    text: messageTextBox.val()
  },function(){
    messageTextBox.val('');
  });
});

var locationButton = $('#send-location');
locationButton.on('click', function(e){
  if (!navigator.geolocation){
    return alert('Geolocation not supported by browser !')
  }
  locationButton.attr('disabled','disabled').text('Sending Location');
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(){
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location !')
  });
});
