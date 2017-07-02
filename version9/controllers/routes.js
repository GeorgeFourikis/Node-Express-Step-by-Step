const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose')
const LocalStrategy = require('passport-local').Strategy;
const Students = require('../models/student')
const User = require('../models/user')



router.get('/', function(req, res) {
    res.render('index.ejs');
});

// PROFILE SECTION =========================
router.get('/profile', isLoggedIn, function(req, res) {
    console.log(req.user, req.user._id)
    res.render('profile.ejs', {
        user : req.user
    });
});

// LOGOUT ==============================
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


// LOGIN ===============================
// show the login form
router.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
});

// process the login form
router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

// SIGNUP =================================
// show the signup form
router.get('/signup', function(req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
});

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}


module.exports = router