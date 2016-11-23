const db = require('../db');
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const router = express.Router();

router
  // GET all
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
  .get('/logout', (req, res, next) => {
    req.session.destroy((err) => {
      res.redirect('/')
    })
  })
;

module.exports = router;
