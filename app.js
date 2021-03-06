var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//Session
var session = require('express-session');
//Lenguaje
require('./system/prototype');
global.config = require('./config');
global.i18n = require('./system/helpers/i18n');
global.i18n.setLanguage();

//app.disable('etag');

//Base de Datos
var mongoose = require('mongoose');
mongoose.connect('mongodb://'+global.config.db.host+':'+global.config.db.port+'/'+global.config.db.database);
//mongoose.connect("mongodb://localhost:27017/test");
db = mongoose.connection;
var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('Conectado');
 // console.log(__dirname);
//console.log(__filename);
});


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: '123456', path    : '/', httpOnly: false,maxAge  : 24*60*60*1000, resave: true, saveUninitialized: true}));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

