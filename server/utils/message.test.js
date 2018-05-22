const expect = require('expect');

var {generateMessage} = require('./message');

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
