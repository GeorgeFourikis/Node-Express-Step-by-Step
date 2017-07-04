const express     = require('express');
const router      = express.Router();
const mongoose    = require("mongoose");
const Users       = mongoose.model("Users");

// ======================================================================
// ======================================================================
//                           RESTFUL - CRUD
// ======================================================================
// ======================================================================
// Index - view page(show all users)
router.get('/', function(req, res){
  Users.find({}, function(err, record){
    if(err){
      console.log(err);
    }else{
      res.render('users/index', { DB: record });    }
  })
});

// New -Show form to add a user
router.get('/new', function(req, res){
  res.render('users/new');
});

// New - Post form to DB
router.post('/new', function(req, res){
  var newUser =  {
    firstName: req.body.first,
    lastName: req.body.last,
    email: req.body.email
  }
  Users.create(newUser, function(err, record){
    if(err){
      console.log(err);
    }else{
      console.log(record);
    }
    res.redirect('/');
  })
});

// Show specific id and user information
router.get('/:id', function(req, res){
  var user_id = req.params.id;
  Users.findOne({_id: user_id}, function(err, user){
    if(err){
      console.log(err);
    }else{
      res.render('users/show', { user: user });
    }
  });
});

//Delete route - delete user
router.post('/:id/delete', function(req, res){
  var user_id = req.params.id;
    Users.remove({_id: user_id}, function(err, deleted){
    if(err){
      console.log(err);
    }else{
      console.log(deleted.result);
      res.redirect('/');
    }
  });
});

//Update route -show update form
router.get('/:id/update', function(req, res){
  var user_id = req.params.id;
  Users.findOne({_id: user_id}, function(err, user){
    if(err){
      console.log(err);
    }else{
      res.render('users/update', { user: user });
    }
  });
});

//Update route post - update the Database info for the user
router.post('/:id/update', function(req, res){
  var user_id = req.params.id;
  Users.findOneAndUpdate({_id: user_id},
    {$set: { firstName : req.body.first,
      lastName  : req.body.last,
      email     : req.body.email
    }}, function(err, user){
      console.log(user);

  })
  res.redirect('/' + user_id);
});


// ======================================================================
// ======================================================================
//                           END OF CRUD
// ======================================================================
// ======================================================================


module.exports = router;
