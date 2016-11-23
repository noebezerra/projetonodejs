const db = require('./db');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(authenticate));
passport.use('local-register', new LocalStrategy({passReqToCallback: true}, register));


// authentication
function authenticate(email, password, done) {
  db('users').where('email', email).first().then((user) => {
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return done(null, done, { message: 'invalid user and password combination' });
    }
    done(null, user);
  }, done)
}

function register(req, email, password, done) {
  db('users').where('email', email).first().then((user) => {
    if (user) {
      return done(null, done, { message: 'Já existe uma conta de usuário com este email' });
    }
    if (password !== req.body.password2) {
      return done(null, done, { message: 'As senhas não combinam!' });
    }

    const newUser = {
      nome: req.body.nome,
      email: email,
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
