const express = require('express');
const cors = require('cors');
const path = require('path');
const flash = require('connect-flash');
const favicon = require('serve-favicon');
const bodyParse = require('body-parser');
const cons = require('consolidate');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
// passport authentication
const passport = require('passport');
require('./passport');
// cache
const cache = require('./cache');
// routes
const auth = require('./routes/auth');
const users = require('./routes/users');

const app = express();

const faviconPath = __dirname + '/public/favicon.ico';

app
  .use(cors())
  // view engine setup
  .engine('html', cons.swig)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'html')
  .use(bodyParse.json())
  .use(bodyParse.urlencoded({extended: false}))
  .use(session({
    store: new RedisStore(),
    secret: "i love dogs",
    resave: false,
    saveUninitialized: false
  }))
  .use(favicon(faviconPath))
  .use(flash())
  .use(passport.initialize())
  .use(passport.session())
  .use(auth)
  .use(users)
;

// Rotas
app
  .get('/', (req, res, next) => {
    res.render('index');
  })
;


app.listen(3000);
