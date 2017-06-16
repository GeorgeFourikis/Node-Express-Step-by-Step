var express = require('express');
var app     = express();
var bodyParser = require('body-parser');


app.set('view engine', 'ejs');
app.set('view cache', false);

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var myDB = [];

app.get('/', function(req, res){
  res.render('home');
});

// ======================================================================
// ======================================================================
//                           RESTFUL - CRUD
// ======================================================================
// ======================================================================

// Index - view page(show all users)
app.get('/about', function(req, res){
  res.render('about/index', { DB: myDB });
});

// New -Show form to add a user
app.get('/about/new', function(req, res){
  res.render('about/new', { DB: myDB });
  console.log(myDB);
});

// New - Post form to DB
app.post('/about/new', function(req, res){
  var firstName = req.body.first;
  var lastName = req.body.last;
  var email = req.body.email;
  var myObject = {
    firstName,
    lastName,
    email
  }
  myDB.push(myObject);
  res.redirect('/about');
});

// Show specific id and user information
app.get('/about/:id', function(req, res){
  var user_id = req.params.id;
  res.render('about/show', { user: user_id, DB: myDB });
  console.log(myDB);
});

//Delete route - delete user
app.post('/about/delete/:id', function(req, res){
  var user_id = req.params.id;
  myDB.splice(user_id, 1);
  res.redirect('/about');
});

//Update route -show update form
app.get('/about/update/:id', function(req, res){
  var user_id = req.params.id;
  res.render('about/update', {user: user_id, DB: myDB});
});

//Update route post - update the Database info for the user
app.post('/about/update/:id', function(req, res){
  var user_id = req.params.id;
  console.log(typeof(user_id, user_id));
  console.log(typeof(user_id));
  var firstName = req.body.first;
  var lastName = req.body.last;
  var email = req.body.email;
  var myObject = {
    firstName,
    lastName,
    email
  }
  myDB[user_id] = myObject;
  res.redirect('/about/' + user_id);
});


// ======================================================================
// ======================================================================
//                           END OF CRUD
// ======================================================================
// ======================================================================

app.get('/contact', function(req, res){
  res.render('contact');
});

app.listen(3000, function(err){
  if(err){
    console.log(err);
  }else {
    console.log('Server is running on Port: 3000');
  }
});
