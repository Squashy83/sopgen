var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var sop = require('./routes/sop');
var user = require('./routes/user');
var createSop = require('./routes/createSop');

var app = express();

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/sopgen', {
    useMongoClient: true,
    promiseLibrary: require('bluebird')
  })
  .then(() => console.log('MongoDB connection successful'))
  .catch((err) => console.error(err));

app.use(logger('dev'));

//app.use(bodyParser.json());
/*app.use(bodyParser.urlencoded({
  'extended': 'false'
})); */

var rawBodySaver = function (req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
};

app.use(bodyParser.json({
  verify: rawBodySaver
}));
app.use(bodyParser.urlencoded({
  verify: rawBodySaver,
  extended: true
}));
app.use(bodyParser.raw({
  verify: rawBodySaver,
  type: 'application/json'
}));

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/sops', express.static(path.join(__dirname, 'dist')));
app.use('/sop', sop);

app.use('/users', express.static(path.join(__dirname, 'dist')));
app.use('/user', user);

app.use('/createSop', express.static(path.join(__dirname, 'dist')));
app.use('/createSop', createSop);

app.use('/public', express.static('public'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
});

module.exports = app;
