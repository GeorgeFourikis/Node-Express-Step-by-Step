var express = require('express');
var router  = express.Router();
var myDB = require('../Models/users.js');

var count = 0;

// ======================================================================
// ======================================================================
//                           RESTFUL - CRUD
// ======================================================================
// ======================================================================

// Index - view page(show all users)
router.get('/', function(req, res){
  res.render('about/index', { DB: myDB });
});

// New -Show form to add a user
router.get('/new', function(req, res){
  res.render('about/new', { DB: myDB });
  console.log(myDB);
});

// New - Post form to DB
router.post('/new', function(req, res){
	var id  = count;
  var firstName = req.body.first;
  var lastName = req.body.last;
  var email = req.body.email;
  var myObject = {
  	id,
    firstName,
    lastName,
    email
  }
  myDB.users.push(myObject);
  count++
  console.log(myDB);
  res.redirect('/about');
});

// Show specific id and user information
router.get('/:id', function(req, res){
  var user_id = req.params.id;
  res.render('about/show', { user: user_id, DB: myDB });
  console.log(myDB);
});

//Delete route - delete user
router.post('/:id/delete', function(req, res){
  var user_id = req.params.id;
  myDB.destroy(user_id);
  res.redirect('/about');
});

//Update route -show update form
router.get('/:id/update', function(req, res){
  var user_id = req.params.id;
  res.render('about/update', {user: user_id, DB: myDB});
});

//Update route post - update the Database info for the user
router.post('/:id/update', function(req, res){
  var user_id = req.params.id;
  console.log(typeof(user_id, user_id));
  console.log(typeof(user_id));
  var firstName = req.body.first;
  var lastName = req.body.last;
  var email = req.body.email;
  var myObject = {
  	id: user_id,
    firstName,
    lastName,
    email
  }
  myDB.users[user_id] = myObject;
  res.redirect('/about/' + user_id);
});


// ======================================================================
// ======================================================================
//                           END OF CRUD
// ======================================================================
// ======================================================================

module.exports = router;