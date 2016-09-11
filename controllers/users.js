'use strict';

var router = require('express').Router();

var users = [
  {
    id: 1111,
    name: 'Anastasia',
    password: 'password'
  },
  {
    id: 2222,
    name: 'Alexander',
    password: 'password'
  },
  {
    id: 3333,
    name: 'Antonina',
    password: 'password'
  },
];

function findUser(userId) {
  return users.findIndex(function(user) {
    return user.id === userId;
  });
}

function nameIsUnique(userName) {
  return users.findIndex(function(user) {
    return user.name === userName;
  }) === -1;
}

function generateUserID() {
  return users[users.length - 1].id + 1;
}

router.get('/:id', function(req, res, next) {
  var id = parseInt(req.params.id);
  var userIndex = findUser(id);
  if (userIndex !== -1) {
    var user = users[userIndex];
    res.status(200).send('Hello ' + user.name + '!!!');
  } else {
    res.status(404).send('User not found');
  }
});

router.post('/', function(req, res, next) {
  var userName = req.body.name;
  var userPassword = req.body.password;
  try {
    if (!userName) {
      throw new Error('user name is empty');
    }
    if (!userPassword) {
      throw new Error('password is empty');
    }
    if (!nameIsUnique(userName)) {
      throw new Error('name is not unique')
    }
    var newUser = {
      name: userName,
      password: userPassword,
      id: generateUserID()
    }
    users.push(newUser);
    res.status(200).send('New user was added!!! Name: ' + newUser.name + ' ID: ' + newUser.id);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

router.delete('/:id', function(req, res, next) {
  var id = parseInt(req.params.id);
  var userIndex = findUser(id);
  if (userIndex !== -1) {
    var deletedUsers = users.splice(userIndex, 1);
    res.status(200).send(deletedUsers.length + ' users has been deleted');
  } else {
    res.status(404).send('User not found');
  }
});

router.patch('/:id', function(req, res, next) {
  var id = parseInt(req.params.id);
  var userIndex = findUser(id);
  if (userIndex !== -1) {
    var user = users[userIndex];
    var newPassword = req.body.password;
    try {
      if (!newPassword) {
        throw new Error('password is empty');
      }
      user.password = newPassword;
      res.status(200).send('Password has been changed');
    } catch (e) {
      console.log(e);
      res.status(400).send(e.message);
    }
  } else {
    res.status(404).send('User not found');
  }
});

module.exports = router;
