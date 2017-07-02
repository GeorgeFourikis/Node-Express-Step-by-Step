const express = require('express')
var passport = require('passport')
var flash    = require('connect-flash')
var morgan       = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser   = require('body-parser')
var session      = require('express-session')
const app = express()

// set up our express application
app.use(morgan('dev')) // log every request to the console
app.use(cookieParser()) // read cookies (needed for auth)
app.use(bodyParser.json()) // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs') // set up ejs for templating

// required for passport
app.use(session({
    secret: 'shhhSecretHere', // session secret
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions
app.use(flash()) // use connect-flash for flash messages stored in session

require('./passport')(passport) // pass passport for configuration

var routes = require('../controllers/routes')
app.use('/', routes)
var api = require('../controllers/api')
app.use('/api', api)



app.listen(3000, ()=>{
	console.log('server is up on 3000')
})