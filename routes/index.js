var express = require('express');
var router = express.Router();

const passport = require('passport')
const User = require('../models/user')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Store Inventory',
    user: req.user });
});

/* GET About page. */
router.get('/about', (req, res, next) => {
    res.render('about', { message: 'About',
    user: req.user })
});

//GET /register
router.get('/register',(req, res, next) => {
    res.render('register')
  })
  
  //POST /Register
  router.post('/register', (req, res, next) => {
    //Use the User model with passport to try a new user
    User.register(new User({
      username: req.body.username
    }), req.body.password, (err, user) => {
      if(err){
        console.log(err)
        res.end(err)
      }
      else
      {
        //Log the User in and redirect to /tasks
        req.login(user, (err) =>{
          res.redirect('/products')
        })
      }
    })
  })

  //GET/login
router.get('/login',(req, res, next) => {

    //Check for Invalid Login message and pass to the view to display
    let messages = req.session.messages || []
  
    //Clear the Session Message
    req.session.messages = []
    //Pass Local Message variable to the view for display
    res.render('login', {
      messages: messages
    })
  })
  
  //POST /Login
  router.post('/login', passport.authenticate('local', {
    successRedirect: '/products',
    failureRedirect: '/login',
    failureMessage: 'Invalid Login'
  }))
  
  //GET /Logout
  router.get('/logout', (req, res, next) => {
    //Call passport built-in logout method
    req.logout()
    res.redirect('/login')
  })
  

module.exports = router;
