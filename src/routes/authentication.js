const express = require('express');
const router = express.Router();

const passport = require('passport');
const { TokenValidation } = require('../libs/verifyToken');
// const { isLoggedIn } = require('../libs/auth');

// SIGNUP
router.get('/signup', (req, res) => {
  console.log("signUp");
  // res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));

// SINGIN
router.get('/signin', (req, res) => {s
  console.log("signIn");
  // res.render('auth/signin');
});

router.post('/signin', (req, res, next) => {
  req.check('username', 'Username is Required').notEmpty();
  req.check('password', 'Password is Required').notEmpty();
  const errors = req.validationErrors();
  if (errors.length > 0) {
    req.flash('message', errors[0].msg);
    res.redirect('/signin');
  }
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

router.get('/profile', TokenValidation, profile);

// router.get('/profile', isLoggedIn, (req, res) => {
//   console.log("Profile");
//   // res.render('profile');
// });

module.exports = router;
