const db = require('../db');
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const router = express.Router();

router
  // GET all
  .get('/signup', (req, res, next) => {
    res.send(`
      <form action="/signup" method= "post">
        <div>
          <label>Nome:</label>
          <input type="text" name="first_name">
        </div>
        <div>
          <label>Sobrenome:</label>
          <input type="text" name="last_name">
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
