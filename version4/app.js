var express = require('express');
var app     = express();

app.set('view engine', 'ejs')
app.set('view cache', false)

app.get('/', function(req, res){
  res.render('home');
});

app.get('/about/:name', function(req, res){
  var name = req.params.name;
  res.render('about', {name: name});
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
