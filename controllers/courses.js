'use strict';

var router = require('express').Router();

var courses = [
  {
    id: 1111,
    userID: 1111,
    languageID: 2222,
    lastVisited: ''
  },
  {
    id: 2222,
    userID: 1111,
    languageID: 1111,
    lastVisited: ''
  },
  {
    id: 3333,
    userID: 2222,
    languageID: 1111,
    lastVisited: ''
  },
];

function findCourse(courseID) {
  return courses.findIndex(function(course) {
    return course.id === courseID;
  });
}

function generateCourseID() {
  return courses[courses.length - 1].id + 1;
}

function getUserCourses(userID) {
  return courses.filter(function(course) {
    return course.userID === userID;
  });
}

router.get('/:userID', function(req, res, next) {
  var userID = parseInt(req.params.userID);
  if (userID) {
    var userCourses = getUserCourses(userID);
    res.status(200).send(userCourses);
  }
});

router.post('/', function(req, res, next) {
  var languageID = req.body.languageID;
  var userID = req.body.userID;
  try {
    if (!languageID) {
      throw new Error('language is not specified');
    }
    if (!userID) {
      throw new Error('user is not specified');
    }
    var newCourse = {
      id: generateCourseID(),
      userID: parseInt(userID),
      languageID: parseInt(languageID),
      lastVisited: (new Date()).getTime()
    }
    courses.push(newCourse);
    res.status(200).send('New course was added');
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

router.delete('/:id', function(req, res, next) {
  var id = parseInt(req.params.id);
  var courseIndex = findCourse(id);
  if (courseIndex !== -1) {
    var deletedCourses = courses.splice(courseIndex, 1);
    res.status(200).send(deletedCourses.length + ' courses has been deleted');
  } else {
    res.status(404).send('Course not found');
  }
});

module.exports = router;
