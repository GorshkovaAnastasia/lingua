'use strict';

var router = require('express').Router();

var words = [
  {
    id: 1111,
    word: 'wind',
    translation: 'ветер',
    transcription: '',
    languageID: ''
  },
  {
    id: 2222,
    word: 'application',
    translation: 'приложение',
    transcription: '',
    languageID: ''
  },
  {
    id: 3333,
    word: 'cucumber',
    translation: 'огурец',
    transcription: '',
    languageID: ''
  },
];

function findWord(wordId) {
  return words.findIndex(function(word) {
    return word.id === wordId;
  });
}

router.get('/:id?', function(req, res, next) {
  var id = req.params.id;
  if (id) {
    var wordIndex = findWord(parseInt(id));
    if (wordIndex !== -1) {
      var word = words[wordIndex];
      res.status(200).send(word);
    } else {
      res.status(404).send('Word not found');
    }
  } else {
    res.status(200).send(words);
  }
});

module.exports = router;
