const expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message !', () => {
    var from = "Shivaay";
    var text = "Hello World !";
    var message = generateMessage(from,text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toHaveProperty('from', from);
    expect(message).toHaveProperty('text', text);
  });
});

describe('generateLocationMessage',() => {
  it('should generate correct location message !', () => {
    var from = 'Dev';
    var latitude = 32;
    var longitude = 34;
    var url = 'https://www.google.com/maps?q=32,34';
    var message = generateLocationMessage(from,latitude,longitude);
    expect(typeof message.createdAt).toBe('number');
    expect(message).toHaveProperty('from',from);
    expect(message).toHaveProperty('url',url);

  });

});
