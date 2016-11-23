const express = require('express');
// const path = require('path');
// const cons = require('consolidate');
const favicon = require('serve-favicon');
const bodyParse = require('body-parser');
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

// const staticAssets = __dirname + '/public'
const faviconPath = __dirname + '/public/favicon.ico';

app
  // .use(express.static(path.join(__dirname, 'public')))
  // .set('views', __dirname + '/views')
  // .set('view engine', 'html')
  // .use(express.static(staticAssets))
  .use(bodyParse.json())
  .use(bodyParse.urlencoded({extended: false}))
  .use(session({
    store: new RedisStore(),
    secret: "i love dogs",
    resave: false,
    saveUninitialized: false
  }))
  .use(favicon(faviconPath))
  .use(passport.initialize())
  .use(passport.session())
  .use(auth)
  .use(users)
;


app
  .get('/', cache.route({expire: 5, prefix: 'home'}), (req, res, next) => {
    res.send(`
        <h3>Hi! Welcome to REST (video aula tutorial)</h3>
        <h4>How to works!</h4>
        <ol>
          <li>Method GET:</li>
          <ul>
            <li>/users/:id for view one user specific</li>
            <li>/tweets for view all tweets</li>
            <li>/users for view all users</li>
            <li>/login verify of user is loged</li>
            <li>/logout logout user</li>
          </ul>
          <li>Method POST:</li>
          <ul>
            <li>/users send an json to insert user in database ex: {"username": "name_fuffly"}</li>
            <li>/login use form method post with type username and password</li>
          </ul>
          <li>Method PUT:</li>
          <ul>
            <li>/users/:id send an json to update user in database ex: {"username": "new_name_fuffly"}</li>
          </ul>
          <li>Method DELETE:</li>
          <ul>
            <li>/users/:id for delete user</li>
          </ul>
        </ol>

        <form action="/login" method= "post">
          <label>Username</label>
          <input type="text" name="username" placeholder="CPF, COD, EMAIL">
          <input type="submit" value="Login">
        </form>
        <p>############################</p>
        <p>PROJETCT MY PATRION - PMP</p>
        use:<br>$ brew install redis<br>
        $ sudo apt install redis-tools<br>
        $ sudo apt install redis-server<br>
        $ redis-cli
        <p>############################</p>
        <h4>How to works!</h4>
        <ol>
          <li>SIGNUP</li>
          <b>POST:</b>
          <ul>
            <li>/signup | create new user (type: first_name, last_name, username, password, password2)</li>
          </ul>
          <li>LOGIN</li>
          <b>POST:</b>
          <ul>
            <li>/login | send username and password for validate access</li>
          </ul>
          <li>FORGET PASSORD</li>
          <b>POST:</b>
          <ul>
            <li>/forgepassword | informe o endereço de email, será enviado um email para redefinição de senha</li>
          </ul>
          <li>STATUS USER</li>
          <b>GET:</b>
          <ul>
            <li>/users/:id | status user</li>
          </ul>
          <b>PUT:</b>
          <ul>
            <li>/users/:id | update status user</li>
          </ul>
          <li>CARD</li>
          <b>GET:</b>
          <ul>
            <li>/cards | all cards</li>
            <li>/cards/:id | view card specific of user</li>
            <li>/cards/:team | all cards for team</li>
            <li>/cards/:team/:id | view card specific of user for the team</li>
          </ul>
          <b>POST:</b>
          <ul>
            <li>/cards/:team/:id/:newid | alteração de vendedor. Solicitar troca o vendendor do meu time pelo vendedor do time de outra pessoa</li>
          </ul>
          <li>RANK GLOBAL</li>
          <b>GET:</b>
          <ul>
            <li>/rank | all rank</li>
          </ul>
          <li>RANK TEAM</li>
          <b>GET:</b>
          <ul>
            <li>/rank/:id | rank of team</li>
          </ul>
          <li>RANK WEEKLY</li>
          <b>GET:</b>
          <ul>
            <li>/rank/weekly | global rank of week</li>
            <li>/rank/weekly/mvp | top 10 best of week</li>
            <li>/rank/weekly/wvp | top 10 worse of week</li>
          </ul>
        </ol>
    `);
  })
;


app.listen(3000);
