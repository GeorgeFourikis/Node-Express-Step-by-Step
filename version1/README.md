Lets break down the code we use to this app.js file that gives us a page
and a server running on port 3000
========================================================================
  1)First we need to require the express and also have an app variable that
    runs an instance of it each time we call it.
  ```
  var express = require('express');
  var app     = express();
  ```

  2)Then we need to put the route.We need the .get since its a GET request.
  As we see, we have a callback function that runs after we reach the "/"
  route.The function has a REQUEST(req) and a RESPONSE(res), in this case we want to
  send something so we use the RESPONSE,and we send a plain text to the Browser

  ```
  app.get('/', function(req, res){
    res.send('Welcome to an Express App');
  });
  ```

  3)Last step is to set up the Server.

    ```
    app.listen(3000, function(err){
      if(err){
        console.log(err);
      }else {
        console.log('Server is running on Port: 3000');
      }
    });
    ```

    OR

    ```
    app.listen(3000);
    ```

    The difference is that in the first case we have a callback that handles errors.
