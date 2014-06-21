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
    config        = require('config'),
    dataSources   = config.dataSources
;

var app = module.exports = exports.app = loopback();

app.locals.siteName = "Seraph";

app.use(loopback.favicon(__dirname + '/public/favicon.ico'));
var env   = process.env.NODE_ENV  || app.get('env')   || 'development';
var port  = process.env.PORT      || app.get('port')  || 9000;

if ('development' === env) {
  app.use(logger('dev'));
  app.use(errorHandler({
      dumpExceptions: true,
      showStack: true
  }));
  app.locals.pretty = true;
} else {
  app.use(logger());
  app.use(errorHandler({
    dumpExceptions: false,
    showStack: false
  }));
}
/**
 * Add Loopback Models and Datasource
 */
app.boot({
  models: models,
  dataSources: dataSources
});

/**
 * Bootstrap ./models
 */
var modelsPath = path.join(__dirname, 'models');
var modelName;
fs.readdirSync(modelsPath).forEach(function (file) {
  modelName = file.toString().replace('.js', '');
  app.model(modelName, require(modelsPath + '/' + file));
});

/**
 * get a reference to the mongo database
 */
var db = loopback.getDefaultDataSourceForType('db'); //require('./config/db');

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


/**
 * Load ./routes
 */
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
app.set('host', process.env.HOST || app.get('host') || 'localhost');

app.start = function() {
  return app.listen(process.env.PORT, function() {
    var baseUrl = 'http://' + app.get('host') + ':' + app.get('port');
    app.emit('started', baseUrl);
    console.log('LoopBack server listening @ %s%s', baseUrl, '/');
  });
};

if(require.main === module) {
  app.start();
}