var express = require('express');
var app     = express();
var bodyParser = require('body-parser');


app.set('view engine', 'ejs');
app.set('view cache', false);

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.get('/', function(req, res){
  res.render('home');
});

app.get('/contact', function(req, res){
  res.render('contact');
});

var about = require('./config/server');
app.use('/about', about);

app.listen(3000, function(err){
  if(err){
    console.log(err);
  }else {
    console.log('Server is running on Port: 3000');
  }
});
