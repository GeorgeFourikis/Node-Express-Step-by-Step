const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Students = require('../models/student')
const User = require('../models/user')


router.use('/', isLoggedIn, (req, res, next)=>{
	next()
})

router.get('/', function(req, res){
			console.log(req.user, req.user._id)

	Students.find({user: req.user._id}, (err, students)=>{
		User.find({}, function(err, user){
	    if(err){
	      console.log(err)
	    }else{
	      res.render('api/index', { user, students })    
	    }
  	})
	})
})

// New -Show form to add a user
router.get('/new', function(req, res){
  res.render('api/new')
})

// New - Post form to DB
router.post('/new', (req, res)=>{
  Students.create({
    firstName: req.body.first,
    lastName: req.body.last,
    email: req.body.email,
    user: req.user._id
  }, (err, record)=>{
    if(err){
      console.log(err)
    }else{
      User.update(req.session.user_id, {$push: {students: record._id}}, (err, userUpdate)=>{
      	res.redirect('/api')
      })
    }
  })
})


// Show specific id and user information
router.get('/:id', function(req, res){
  var student_id = req.params.id
  Students.findOne({_id: student_id}, function(err, student){
    if(err){
      console.log(err)
    }else{
      res.render('api/show', { student })
    }
  })
})

//Delete route - delete user
router.post('/:id/delete', function(req, res){
  var student_id = req.params.id
  Students.remove({_id: student_id}, function(err, deleted){
    if(err){
      console.log(err)
    }else{
      console.log(deleted)
      res.redirect('/api')
    }
  })
})

//Update route -show update form
router.get('/:id/update', function(req, res){
  var student_id = req.params.id
  Students.findOne({_id: student_id}, function(err, student){
    if(err){
      console.log(err)	
    }else{
      res.render('api/update', { student })
    }
  })
})

//Update route post - update the Database info for the user
router.post('/:id/update', function(req, res){
  var student_id = req.params.id
	Students.update({_id: student_id}, {$set: {firstName: req.body.first,lastName: req.body.last,email: req.body.email}}, (err, student)=>{
		if(err) {
			console.log(err)
		}else{
			res.redirect('/api/' + student_id)
		}
	})
})


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next()

    res.redirect('/')
}

module.exports = router
