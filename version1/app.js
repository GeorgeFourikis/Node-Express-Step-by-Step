var express = require('express');
var app     = express();

app.get('/', function(req, res){
  res.send('Welcome to an Express App');
});


app.listen(3000, function(err){
  if(err){
    console.log(err);
  }else {
    console.log('Server is running on Port: 3000');
  }
});
