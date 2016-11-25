const db = require('../db');
const bcrypt = require('bcrypt-nodejs');
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
  .get('/profile', loginRequired,(req, res, next) => {
    db('users').where('id', req.user.id).first().then((user) => {
        res.send(user);
    })
  })
  .put('/changepassword', loginRequired, (req, res, next) => {
    db('users').where('id', req.user.id).update({
      password: bcrypt.hashSync(req.body.newpassword)
    }).then((user) => {
      if (!user) {
        return res.send({message: 'Houve um error ao alterar a senha'});
      }
      return res.send({message: 'Senha alterada com sucesso!'})
    })

  })
;

module.exports = router;
