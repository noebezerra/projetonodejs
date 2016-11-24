const db = require('../db');
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const router = express.Router();

router
  // Login
  .get('/login', (req, res, next) => {
    res.send({
      session: req.session,
      user: req.user,
      authenticated: req.isAuthenticated(),
    })
  })
  .post('/login', passport.authenticate('local', {
    successRedirect: '/login',
    failureRedirect: '/login',
    failureFlash: true
  }))
  // Logout
  .get('/logout', (req, res, next) => {
    req.session.destroy((err) => {
      if (!err) {
        return res.send({ message: true })
      }
      return res.send({ message: false })
    })
  })
  // Signup
  .get('/signup', (req, res, next) => {
    res.render('teste', req.flash('message'));
  })
  .post('/signup', passport.authenticate('local-register', {
    successRedirect: '/login',
    failureRedirect: '/signup',
  }))
;

module.exports = router;
