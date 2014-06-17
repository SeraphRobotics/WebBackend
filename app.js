'use strict';
var loopback = require('loopback'),
    path = require('path'),
    fs = require('fs'),
    mo = require('method-override'),
    logger = require('morgan'),
    body = require('body-parser'),
    errorhandler = require('errorhandler');

var app = module.exports = exports.app = loopback();

app.locals.siteName = "Seraph";

// Connect to database
var db = require('./config/db');
app.use(loopback.static(__dirname + '/public'));


// Bootstrap models
var modelsPath = path.join(__dirname, 'models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3000;

if ('development' === env) {
  app.use(logger('dev'));
  app.use(errorhandler({
      dumpExceptions: true,
      showStack: true
  }));
  app.locals.pretty = true;
}

if ('test' === env) {
  port = 9997;
  app.use(logger('test'));
  app.use(errorhandler({
    dumpExceptions: true,
    showStack: true
  }));
  app.locals.pretty = true;
}

if ('production' === env) {
  app.use(logger());
  app.use(errorhandler({
    dumpExceptions: false,
    showStack: false
  }));
}

app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');
app.use(mo());
app.use(body());

// Bootstrap routes/api
var routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach(function(file) {
  require(routesPath + '/' + file)(app);
});

// Start server
app.listen(port, function () {
  console.log('LoopBack server listening on port %d in %s mode', port, app.get('env'));
});