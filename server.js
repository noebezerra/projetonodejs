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
// port
const port = 3000;
// routes
const auth = require('./routes/auth');
const profile = require('./routes/profile');
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
    secret: "purdow",
    resave: false,
    saveUninitialized: false
  }))
  .use(favicon(faviconPath))
  .use(flash())
  .use(passport.initialize())
  .use(passport.session())
  .use(auth)
  .use(profile)
  .use(users)
;

// Rotas
app
  .get('/', (req, res, next) => {
    res.render('index');
  })
;


app.listen( port, function functionName() {
    console.log('Server start port ' + port );
});
