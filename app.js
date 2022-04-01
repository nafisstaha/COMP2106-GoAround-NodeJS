var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// uploading file/image with formidable package
const http = require('http');
const formidable = require('formidable');

const server = http.createServer((req, res) => {
  if (req.url === '/api/upload' && req.method.toLowerCase() === 'post') {
    // parse a file upload
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
        res.end(String(err));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ fields, files }, null, 2));
    });

    return;
  }
});


var index = require('./controller/index');
var users = require('./controller/users');
const landmarks = require('./controller/landmarks');
const auth = require('./controller/auth')

var app = express();

// use .env file for db connection
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// passport config 
const passport = require('passport')
const session = require('express-session')

// enable session
app.use(session({
  secret: 'could-hardcode-here-but-will-move-to-env',
  resave: true,
  saveUninitialized: false
}))

// passport initialization
app.use(passport.initialize())
app.use(passport.session())

// use user.js in model and enable mongodb
let User = require('./models/user')
passport.use(User.createStrategy()) 

// read and write user data
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// mongoose db connection
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://nafiss:nafisstaha@cluster0.q9ywc.mongodb.net/Cluster0?retryWrites=true&w=majority').then((res) => {
  console.log('Connected to MongoDB')
}).catch(() => {
  console.log('MongoDB connection failed')
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/landmarks', landmarks);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
