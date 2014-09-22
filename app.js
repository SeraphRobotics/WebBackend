'use strict';
var q = require('q'),
    fs = require('fs'),
    path = require('path'),
    config = require('config'),
    logger = require('morgan'),
    Bunyan = require('bunyan'),
    loopback = require('loopback'),
    body = require('body-parser'),
    debug = require('debug')('app'),
    errorHandler = require('errorhandler'),
    models = require('./models.json'),
    mo = require('method-override'),
    dataSources = config.dataSources;

var log = Bunyan.createLogger({name: 'app.js'});
function debugIt(arg) {
  log.debug(arg);
  debug(arg);
}

var app = module.exports = exports.app = loopback();

app.locals.siteName = 'Seraph';

app.use(loopback.favicon(__dirname + '/public/favicon.ico'));
var env = process.env.NODE_ENV || app.get('env') || 'development';

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
try {
  fs.readdirSync(modelsPath).forEach(function(file) {
    modelName = file.toString().replace('.js', '');
    app.model(modelName, require(modelsPath + '/' + file));
  });
} catch (e) {
  debug('Models failed to load');
}

/**
 * get a reference to the mongo database
 */
//var db = loopback.getDefaultDataSourceForType('db'); //require('./config/db');
var fedex = loopback.createDataSource({
  security: {
    type: 'BasicAuth',
    key: 'TI25Dcc7s9hlsDgD',
    password: 'hJTaRd22bvm9J2vIvQ2jV273h'
  },
  connector: 'loopback-connector-soap',
  remotingEnabled: true,
  wsdl: './config/fedex/ShipService_v13.wsdl',
  operations: {
    processShipment: {
      service: 'ShipService',
      port: 'ShipServicePort',
      operation: 'processShipment'
    }
  }
});


fedex.on('connected', function() {
  log.info('connected to Fedex Soap.');
  var Customer = app.models.Customer,
      findCustById = q.nbind(Customer.findById, Customer),
      shipSchema = require('./config/fedex/request'),
      ShipService = fedex.createModel('ShipService', shipSchema);

  ShipService.makeShipment = function(custId, cb) {
    var customerPromise = findCustById(custId)
      .catch(function(err) {
        debugIt(err);
      });
    customerPromise.then(function(customer) {
      var data = {
        DropoffType: 'REGULAR_PICKUP',
        ServiceType: 'STANDARD_OVERNIGHT',
        PackagingType: 'YOUR_PACKAGING',
        Shipper: {
          Contact: {
            CompanyName: 'Seraph Robotics',
            PhoneNumber: '5551231234'
          },
          Address: {
            StreetLines: '123 fake street',
            City: 'Oakland',
            StateOrProvinceCode: 'California',
            PostalCode: 94132,
            CountryCode: 'USA'
          }
        },
        Recipient: {
          Contact: {
            CompanyName: customer.companyName,
            PersonName: customer.name,
            PhoneNumber: customer.phoneNumber
          },
          Address: {
            StreetLines: customer.address.street,
            City: customer.address.city,
            PostalCode: customer.address.zip,
            CountryCode: 'USA',
            Residential: true
          }
        },
        ShippingChargesPayment: {
          PaymentType: 'SENDER',
          Payor: {
            ResponsibleParty: {
              AccountNumber: 510087585,
              Contact: ''
            }
          }
        },
        LabelSpecification: {
          LabelFormatType: 'COMMON2D',
          ImageType: 'EPL2',
          LabelStockType: 'STOCK_4X6.75_LEADING_DOC_TAB',
          LabelPrintingOrientation: 'TOP_EDGE_OF_TEXT_FIRST'
        },
        RateRequestTypes: 'ACCOUNT',
        PackageCount: 1,
        RequestedPackageLineItems: {
          SequenceNumber: 1,
          Weight: {
            Units: 'LB',
            weight: '8.0'
          }
        }
      };
      ShipService.processShipment(data, function(err, res) {
        if (err) {
          debugIt(err);
          return cb(err);
        } else {
          debugIt(res);
          cb(null, res);
        }
      });
    });
  };
  loopback.remoteMethod(ShipService.makeShipment, {
    accepts: {
      arg: 'customerId',
      type: 'string',
      required: true
    },
    returns: {arg: 'result', type: 'Object', root: true},
    http: {
      verb: 'PUT',
      path: '/createShipment'
    }
  });

  app.model(ShipService);

  app.engine('jade', require('jade').__express);
  app.set('view engine', 'jade');
  app.use(loopback.cookieParser(app.get('cookieSecret')));
  app.use(loopback.token({model: app.models.accessToken}));
  app.use(mo());
  app.use(body.urlencoded({extended: true}));
  app.use(body.json());
  app.use(app.get('restApiRoot'), loopback.rest());

  try {
    var explorer = require('loopback-explorer')(app);
    app.use('/explorer', explorer);
    app.once('started', function(baseUrl) {
      console.log('Browse your REST API at %s%s', baseUrl, explorer.route);
    });
  } catch (e) {
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
  app.enableAuth();

  app.start = function() {
    return app.listen(process.env.PORT, function() {
      var baseUrl = 'http://' + app.get('host') + ':' + app.get('port');
      app.emit('started', baseUrl);
      console.log('LoopBack server listening @ %s%s', baseUrl, '/');
    });
  };

  if (require.main === module) {
    app.start();
  }
});
