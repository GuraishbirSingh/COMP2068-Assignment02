var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var productsRouter = require('./routes/products');
//Ref for Auth
const passport = require('passport')
const session = require('express-session')
//const localStategy = require('passport-local').Strategy

var app = express();
const hbs = require('hbs');
//Database try to connect and log a result
const mongoose = require('mongoose')
const globals = require('./config/globals')
mongoose.connect(globals.db,  //Change test at the end to tasks-v2, and password
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(
    (res) => {
      console.log('Connected')
    }
).catch(() => {
  console.log('Error in connection')
})

//Passport Initialization
//1. Configure app to manage sessions
app.use(session({
    secret: 'MyOwnSecret',
    resave: true,
    saveUninitialized:false
}))

//2.  Set up Passport
app.use(passport.initialize())
app.use(passport.session())

//3.  Link Passport to our User Model
const User = require('./models/user')
passport.use(User.createStrategy())

//4. Set up Passport to Read /Write user data to the session object
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials');
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
