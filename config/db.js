'use strict';
var mongoose = require('mongoose');

var config = {
  "db": "seraph",
  "host": "ds047427.mongolab.com",
  "user": "seraphAdmin",
  "pw": "seraph1seraph1",
  "port": 47427
};

var login = (config.user.length > 0) ? config.user + ":" + config.pw + "@" : '';
if (process.env.NODE_ENV === 'development') {
  var uristring =  'mongodb://localhost:27017' + "/" + config.db;
} else {
  console.log(port);
  var uristring =  "mongodb://" + login + config.host + ':' + config.port + "/" + config.db;
}

var mongoOptions = {
  db: {
    safe: true
  }
};

// Connect to Database
mongoose.connect(uristring, mongoOptions, function (err, res) {
  if(err){
    console.log('ERROR connecting to: ' + uristring + '. ' + err);
    console.log(err);
  }else{
    console.log('Successfully connected to: ' + uristring);
  }
});


exports.mongoose = mongoose;
