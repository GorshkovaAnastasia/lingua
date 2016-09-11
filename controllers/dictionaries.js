'use strict';

var router = require('express').Router();

var dictionaries = [
  {
    id: 1111,
    userID: 1111,
    word: '',
    learned: 90
  },
  {
    id: 2222,
    userID: 1111,
    word: '',
    learned: 50
  },
  {
    id: 3333,
    userID: 1111,
    word: '',
    learned: 88
  },
  {
    id: 4444,
    userID: 2222,
    word: '',
    learned: 90
  },
  {
    id: 5555,
    userID: 2222,
    word: '',
    learned: 50
  },
  {
    id: 6666,
    userID: 2222,
    word: '',
    learned: 80
  },
];

function findWordInDictionary(wordID) {
  return dictionaries.findIndex(function(word) {
    return word.id === wordID;
  });
}

function generateWordID() {
  return dictionaries[dictionaries.length - 1].id + 1;
}

function getUserDictionary(userID) {
  return dictionaries.filter(function(word) {
    return word.userID === userID;
  });
}

router.get('/:userID', function(req, res, next) {
  var userID = parseInt(req.params.userID);
  if (userID) {
    var userDictionary = getUserDictionary(userID);
    res.status(200).send(userDictionary);
  }
});

router.post('/', function(req, res, next) {
  var word = req.body.word;
  var userID = req.body.userID;
  try {
    if (!word) {
      throw new Error('word is not specified');
    }
    if (!userID) {
      throw new Error('user is not specified');
    }
    var newWord = {
      id: generateWordID(),
      userID: parseInt(userID),
      word: word,
      learned: 0
    }
    dictionaries.push(newWord);
    res.status(200).send('New word was added in your dictionary');
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

router.delete('/:id', function(req, res, next) {
  var id = parseInt(req.params.id);
  var wordIndex = findWordInDictionary(id);
  if (wordIndex !== -1) {
    var deletedWords = dictionaries.splice(wordIndex, 1);
    res.status(200).send(deletedWords.length + ' words has been deleted');
  } else {
    res.status(404).send('Word not found');
  }
});

module.exports = router;
