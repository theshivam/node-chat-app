const expect = require('expect');

const {Users} = require('./users');

describe('Users',() => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Shivam',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Himanshu',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Shivaay',
      room: 'Node Course'
    }];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id:'1',
      name:'SHiv',
      room: 'NodeJS'
    };
    var resUser = users.addUser(user.id,user.name,user.room);
    expect(users.users).toEqual([user]);
  });

  it('should remove a user',() => {
    var userId = '2';
    var user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });
  it('should not remove a user',() => {
    var userId = '299';
    var user = users.removeUser(userId);
    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should fetch a user',() => {
    var userId = '2';
    var user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });
  it('should not fetch a user',() => {
    var userId = '233';
    var user = users.getUser(userId);
    expect(user).toBeFalsy();
  });

  it('should return correct names for node course',() => {
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Shivam','Shivaay']);
  });
  it('should return correct names for React course',() => {
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Himanshu']);
  });

});
