var express = require('express');
var app     = express();

app.get('/', function(req, res){
  res.send('Welcome to an Express App');
});

app.get('/about', function(req, res){
  res.send('About Page');
});

app.get('/contact', function(req, res){
  res.send('Contact Page');
});


app.listen(3000, function(err){
  if(err){
    console.log(err);
  }else {
    console.log('Server is running on Port: 3000');
  }
});
