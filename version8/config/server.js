var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app     = express();

app.use(logger('dev'));

app.set('view engine', 'ejs');
app.set('view cache', false);

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())  

var users = require('../Controllers/users.js');
app.use('/', users);


app.listen(3000, function(err){
  if(err){
    console.log(err);
  }else {
    console.log('Server is running on Port: 3000');
  }
});


