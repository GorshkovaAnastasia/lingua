var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

var port = '8080';

var users = require('./controllers/users.js');
var words = require('./controllers/words.js');
var languages = require('./controllers/languages.js');
var dictionaries = require('./controllers/dictionaries.js');
var courses = require('./controllers/courses.js');

app.use(bodyParser.json());
app.use(cors());

app.use('/users', users);
app.use('/words', words);
app.use('/languages', languages);
app.use('/dictionaries', dictionaries);
app.use('/courses', courses);


app.listen(port, function () {
  console.log('Listening on port ', port)
});
