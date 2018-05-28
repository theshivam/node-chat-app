var socket = io();
console.log('Inside index.js');

function scrollToBottom(){
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var prevMessageHeight = newMessage.prev().innerHeight();
  if (clientHeight + scrollTop + newMessageHeight + prevMessageHeight >= scrollHeight){
     messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function() {
  console.log('Connected to the server !');

  var params = $.deparam(window.location.search);

  socket.emit('join', params, function(error){
    if (error){
      alert(error);
      window.location.href = '/';
    }else{
      console.log('No error! Joining chat room');
    }
  });
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
  scrollToBottom();
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

socket.on('updateUserList', function(userList){
    var ol = $('<ol></ol>');
    userList.forEach(function (user){
      ol.append($('<li></li>').text(user));
    });
    $('#users').html(ol);
});

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
  scrollToBottom();
});

$('#message-form').on('submit',function(e){
  e.preventDefault();
  var messageTextBox = $('[name=message]');
  socket.emit('createMessage',{
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
