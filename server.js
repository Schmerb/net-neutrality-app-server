'use strict';

const express          = require('express'),
      morgan           = require('morgan'),
      mongoose         = require('mongoose'),
      bodyParser       = require('body-parser'),
      cookieParser     = require('cookie-parser'),
      path             = require('path'),
      cors             = require('cors'),
      engine           = require('ejs-mate');

const router                 = require('routes');
const { DATABASE_URL, PORT, CLIENT_ORIGIN } = require('./config/database');


// Use ES6 promises
mongoose.Promise = global.Promise;

// create express app instance
const app = express();


// CONFIGURE APP
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));


// MIDDLEWARE

// CORS
app.use(
  cors({
      origin: [  // Whitelist 
          CLIENT_ORIGIN,
          'https://suspicious-franklin-d3316b.netlify.com'
      ]
  })
);

C.O.R.S.
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

app.use(express.static(path.join(__dirname, 'public'))); // root folder for static files
app.use(morgan('common')); // log the http layer
app.use(cookieParser()); // parses and handles cookies
app.use(bodyParser.json()); // parses request and exposes it on req.body


// ROUTES
app.use(router);


// fallback error message for all non-existant endpoints
app.use('*', (req, res) => {
    res.status(404).json({message: 'Not Found'});
});


// SERVER / DB CONNECTION

// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run
let server;

// connects to db, starts server
function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        console.log('\n\n\MONGO ERROR \n\n\n');
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
       
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// closes server, returns promise for testing purposes
function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
              console.log('\n\n\MONGO ON ERROR \n\n\n');
               return reject(err);
           }
           resolve();
       });
     });
  });
}

// server is ran if file called directly, not for tests
if (require.main === module) {
    runServer().catch(err => console.error(err));
}

// for testing
module.exports = {app, runServer, closeServer};