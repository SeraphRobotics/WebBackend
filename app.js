'use strict';
var loopback      = require('loopback'),
    path          = require('path'),
    fs            = require('fs'),
    mo            = require('method-override'),
    logger        = require('morgan'),
    body          = require('body-parser'),
    errorHandler  = require('errorhandler'),
    models        = require('./models.json'),
    DataSource    = require('loopback-datasource-juggler').DataSource,
    dataSources   = require('./datasources.json')
;

var app = module.exports = exports.app = loopback();

app.locals.siteName = "Seraph";

// Connect to database
//var db = require('./config/db');

var env = process.env.NODE_ENV || app.get('env') || 'development';
var port = process.env.PORT || app.get('port') || 9000;
console.log(env);
if ('development' === env) {
  dataSources.db = {
    "defaultForType": "db",
    "connector": "mongodb",
    "host": "localhost",
    "port": 27017,
    "database": "seraph"
  };
  app.use(logger('dev'));
  app.use(errorHandler({
      dumpExceptions: true,
      showStack: true
  }));
  app.locals.pretty = true;
} else {
  dataSources.db = {
    "defaultForType": "db",
    "connector": "mongodb",
    "database": "seraph",
    "host": "ds047427.mongolab.com",
    "username": "seraphAdmin",
    "password": "seraph1seraph1",
    "port": 47427
  };
  app.use(logger());
  app.use(errorHandler({
    dumpExceptions: false,
    showStack: false
  }));
}
/**
 * Add Loopback model schemas
 */
app.boot({
  models: models,
  datasources: dataSources
});

// Bootstrap models
var modelsPath = path.join(__dirname, 'models');
var modelName;

fs.readdirSync(modelsPath).forEach(function (file) {
  modelName = file.toString().replace('.js', '');
  app.model(modelName, require(modelsPath + '/' + file));
});

//var ds = new DataSource('mongodb');

app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');
app.use(loopback.cookieParser(app.get('cookieSecret')));
app.use(loopback.token({model: app.models.accessToken}));
app.use(mo());
app.use(body());

app.use(app.get('restApiRoot'), loopback.rest());

try {
  var explorer = require('loopback-explorer')(app);
  app.use('/explorer', explorer);
  app.once('started', function(baseUrl) {
    console.log('Browse your REST API at %s%s', baseUrl, explorer.route);
  });
} catch(e){
  console.log(
    'Run `npm install loopback-explorer` to enable the LoopBack explorer'
  );
}


// Bootstrap routes/api
var routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach(function(file) {
  require(routesPath + '/' + file)(app);
});
app.use(app.router);

// Serve files
app.use(loopback.static(__dirname + '/public'));
// Not found
app.use(loopback.urlNotFound());
// Start server
app.start = function() {
  return app.listen(function() {
    var baseUrl = 'http://' + app.get('host') + ':' + app.get('port');
    app.emit('started', baseUrl);
    console.log('LoopBack server listening @ %s%s', baseUrl, '/');
  });
};

if(require.main === module) {
  app.start();
}