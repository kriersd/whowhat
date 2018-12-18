
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const fs = require('fs');
var moment = require('moment');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch everything else -  handler   (Normally this is a 404 handler)
app.use(function(req, res, next) {
  //next(createError(404));
  if (req.originalUrl != "/favicon.ico") {
    var htm = "";
    htm = htm + "<p>" + "URL Path Requested: " + req.originalUrl + "</p>";
    htm = htm + "<p>" + "IP Address of Requestor: " + req.ip + "</p>";
    htm = htm + "<p>" + "Host Name: " + req.hostname + "</p>";
    htm = htm + "<p>" + "body: " + JSON.stringify(req.body) + "</p>";
    htm = htm + "<p>" + "Headers: " + JSON.stringify(req.headers) + "</p>";
    res.send(htm);

    var myfilename = '/whowhat-logs/requestLog-' + moment() + '.txt';

    fs.writeFile(myfilename, htm, function (err) {
      if (err) throw err;
      //console.log('Saved!');
    });
  };

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
