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

app.get('/about', function(req, res){
  res.render('about', { DB: myDB });
  console.log(myDB);
});

app.post('/about', function(req, res){
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
