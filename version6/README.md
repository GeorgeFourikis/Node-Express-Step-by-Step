In this version it seems that we have lots of differences but lets take a closer look.

First of all, we got rid of the params route on /about page.

Second, we required BODY-PARSER, since its the way we will get data from
the body of a page from now on.
```
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
```

Third, we initiated an empty array which will imitate a DataBase.
```
var myDB = [];
```

Fourth, we split up the .about route to a POST and a GET methods.
```
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
```

Fifth, we make a FORM to the EJS template and from there we grab the data,
save them to an object and then to the DataBase we have.
```
<form method="POST" action="/about">
    <div>
      <label>Your first name</label>
      <input type="text" name="first" placeholder="First Name">
    </div>
    <div>
      <label>Your last name</label>
      <input type="text" name="last" placeholder="Last Name">
    </div>
    <div>
      <label>Email</label>
      <input type="email" name="email" placeholder="Email">
    </div>
    <input type="submit" name="Submit">
  </form>
```

Lastly,on the GET route, we need to show all the DataBase entries that already happened.
And also, after each POST happens, we redirect to the GET of the about route.
```
<% for(var i = 0; i < DB.length; i++) { %>
  <ul><h3>Person <%= i+1 %> Data</h3>
    <li>First Name: <b><%= DB[i].firstName %></li></b>
    <li>Last Name: <b><%= DB[i].lastName %></li></b>
    <li>Email: <b><%= DB[i].email %></li></b>
  </ul>
<% } %>
```
