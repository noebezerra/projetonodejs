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
    failureRedirect: '/',
    failureFlash: true
  }))
  // Logout
  .get('/logout', (req, res, next) => {
    req.session.destroy((err) => {
      res.redirect('/')
    })
  })
  // Signup
  .get('/signup', (req, res, next) => {
    res.send(`
      <form action="/signup" method= "post">
        <div>
          <label>Nome:</label>
          <input type="text" name="nome">
        </div>
        <div>
          <label>Email</label>
          <input type="text" name="username">
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password">
        </div>
        <div>
          <label>Repeat Password</label>
          <input type="password" name="password2">
        </div>
        <input type="submit" value="Login">
      </form>
      `)
  })
  .post('/signup', passport.authenticate('local-register', {
    successRedirect: '/login',
    failureRedirect: '/signup',
  }))
;

module.exports = router;
