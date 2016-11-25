const db = require('../db');
const express = require('express');
const bcrypt = require('bcrypt-nodejs')
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
      res.redirect('/')
    })
  })
  // Signup
  .get('/signup', (req, res, next) => {
    res.render('teste', req.flash('message'));
  })
  .post('/signup', (req, res, next) => {
    if (!req.body.password) {
      db('users').where('cpf', req.body.cpf).first().then((user) => {
        if (!user) {
          return res.send({message: 'CPF não encontrado ou incorreto'})
        } else if (user.password) {
          return res.send({message: 'Usuário já foi registrado'})
        }
        return res.send({
          user:{
            id: user.id,
            nome: user.nome,
            cpf: user.cpf,
            email: user.email,
            cod_integracao: user.cod_integracao,
            dta_nasc: user.dta_nasc,
            loja: user.loja,
            situacao: user.situacao,
            is_admin: user.is_admin,
          }
        })
      })
    } else {
      db('users').where('cpf', req.body.cpf).first().then((user) => {
        if (user.password) {
          return res.send({message: 'Usuário já foi registrado'})
        }
        if (req.body.password !== req.body.password2) {
          return res.send({message: 'As senhas não combinam!'});
        }
        db('users').where('cpf', req.body.cpf).update({
          nome: req.body.nome,
          cpf: req.body.cpf,
          rg: req.body.rg,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password)
        }).then((count) => {
          return res.send({message: count});
        })
      })
    }
  })
;

module.exports = router;
