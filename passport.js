const db = require('./db');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({passReqToCallback: true}, authenticate));
passport.use('local-register', new LocalStrategy({passReqToCallback: true}, register));

// verifica se é número
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
// authentication
function authenticate(req, res, next, done) {
  var username = req.body.username;
  var password = String(req.body.password);
  const query = db('users');
  if (username.substring(0,1) === 'V') {
    query.where('cod_integracao', username);
  }
  else if (isNumber(username)) {
    query.where('cpf', username);
  } else {
    query.where('email', username);
  }
  query.first().then((user) => {
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return done(null, false, { message: 'invalid user and password combination' });
    }
    done(null, user);
  }, done)
}

function register(req, username, password, done) {
  db('users').where('email', username).first().then((user) => {
    if (user) {
      return done(null, done, req.flash('message', 'Já existe uma conta de usuário com este email'));
    }
    if (password !== req.body.password2) {
      return done(null, done, req.flash('message', 'As senhas não combinam!'));
    }

    const newUser = {
      nome: req.body.nome,
      email: username,
      password: bcrypt.hashSync(password)
    };
    db('users').insert(newUser).then((ids) => {
      newUser.id = ids[0];
      done(null, newUser);
    })
  })
}

passport.serializeUser(function (user, done) {
  done(null, user.id);
})

passport.deserializeUser(function (id, done) {
  db('users').where('id', id).first().then((user) => {
      done(null, user);
  }, done)
})
