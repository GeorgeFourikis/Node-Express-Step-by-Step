What changes from Version 1 here is that we see how we
handle the routes that we want to add.
=========================================================

  So if we want to add a route that will work under the url: localhost:3000/about,
  then we need this code:

  ```
  app.get('/about', function(req, res){
    res.send('About Page');
  });
  ```

  Again, this is a GET method.
