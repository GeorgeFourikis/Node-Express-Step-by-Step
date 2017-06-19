The main difference from Version 3 is that now we are able to pass and parse data
from the URL.
=================================================================================

By using this route the way we do it is this.First we use a paramname  `:name`,
then we save to a variable using `req.params.name` and then we pass it as an
argument to our EJS file.
```
app.get('/about/:name', function(req, res){
  var name = req.params.name;
  res.render('about', {name: name});
});
```
Then, we need to find a way to show what we pass:

```
<h1>This is the About Page <em><%= name %></em></h1>
```

In EJS, we pass variables by using <% aVariable %>, in case we want the EJS to give
a value to be used and shown then we use <%= myVariableGoesHere %>.
