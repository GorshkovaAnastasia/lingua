'use strict';

var router = require('express').Router();

var languages = [
  {
    id: 1111,
    name: 'Английский'
  },
  {
    id: 2222,
    name: 'Испанский'
  },
  {
    id: 3333,
    name: 'Китайский'
  },
];

function findLanguage(languageId) {
  return languages.findIndex(function(language) {
    return language.id === languageId;
  });
}

router.get('/:id?', function(req, res, next) {
  var id = req.params.id;
  if (id) {
    var languageIndex = findLanguage(parseInt(id));
    if (languageIndex !== -1) {
      var language = languages[languageIndex];
      res.status(200).send(language);
    } else {
      res.status(404).send('Language not found');
    }
  } else {
    res.status(200).send(languages);
  }
});

module.exports = router;
