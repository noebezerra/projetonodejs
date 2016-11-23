const db = require('../db');
const express = require('express');
const passport = require('passport');
const cache = require('../cache');
const localStrategy = require('passport-local');

const router = express.Router();

function loginRequired(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

function adminRequired(req, res, next) {
  if (!req.user.is_admin) {
    return res.render('403');
  }
  next();
}

router
  .get('/tweets', loginRequired,(req, res, next) => {
      db('tweets').then((tweets) => {
        res.send(tweets);
      })
  })
  .get('/tweets/:user_id', (req, res, next) => {
      const { user_id } = req.params;
      db('tweets').where('user_id', user_id).then((tweets) => {
        res.send(tweets);
      })
  })
  .get('/deletetweets/:id', (req, res, next) => {
    const { id } = req.params;
    const query = db('tweets').where('id', id);
    if (!req.user.is_admin) {
      query.where('user_id', req.user.id);
    }
    query.delete().then((result) => {
      if (result === 0) {
        return res.send('Error, não é possível deletar o post');
      }
      res.redirect('/tweets');
    })
  })
  .get('/users', loginRequired, adminRequired, (req, res, next) => {
      db('users').then((users) => {
        res.send(users);
      })
      .catch((err) => {
        res.send(err);
      })
  })
  .get('/users/:id', loginRequired, (req, res, next) => {
    const { id } = req.params;
    db('users').where('id', id).first().then((users) => {
      if (!users) {
        return res.sendStatus(400);
      }
      res.send(users);
    }, next)
  })
  .post('/users', (req, res, next) => {
    db('users').insert(req.body).then((usersIds) => {
      res.send(usersIds);
    }, next)
  })
  .put('/users/:id', (req, res, next) => {
    const { id } = req.params;
    db('users').where('id', id).update(req.body).then((result) => {
      if (result === 0) {
        return res.sendStatus(400);
      }
      res.sendStatus(200);
    }, next)
  })
  .delete('/users/:id', (req, res, next) => {
    const { id } = req.params;
    db('users').where('id', id).delete().then((result) => {
      if (result === 0) {
        return res.sendStatus(400);
      }
      res.sendStatus(200);
    }, next)
  })
;

module.exports = router;
