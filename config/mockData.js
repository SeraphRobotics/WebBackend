"use strict";
var mongoose      = require('mongoose'),
    Schema        = mongoose.Schema,
    ObjectId      = Schema.ObjectId,
    Part          = require('../models/part'),
    Vendor        = require('../models/vendor'),
    VendorOrder  = require('../models/vendorOrder')
;

var config = {
  "db": "sereph",
  "host": "localhost",
  "user": "user",
  "pw": "password",
  "port": 27017
};

var port = (config.port.length > 0) ? ":" + config.port : '';
var login = (config.user.length > 0) ? config.user + ":" + config.pw + "@" : '';

var uriString = '';

if (process.env.NODE_ENV === 'development') {
  uriString = "mongodb://" + config.host + port + "/" + config.db;
} else {
  uriString =  "mongodb://" + login + config.host + port + "/" + config.db;
}

var mongoOptions = {
  db: {
    safe: true
  }
};

// Connect to Database
mongoose.connect(uriString, mongoOptions, function (err, res) {
  if(err){
    console.log('ERROR connecting to: ' + uriString + '. ' + err);
  }else{
    console.log('Successfully connected to: ' + uriString);
  }
});


var part = new Part({
  name: 'Coke+',
  partNum: 42,
  vendor: 'coke, Inc',
  numInStock: 2,
  machineUsage: [
    {
      type: 'Printer',
      quantity: 4
    }
  ],
  costPer: 400,
  batchSize: 3,
  expectedLeadTime: 5
});

part.save(function (err, doc) {
    if(!err) {console.log(doc);}
    else {console.log(err);}
  })
;

var vendorOrder = new VendorOrder({
  date: Date.now(),
  name: 'Coke Inc',
  orderNum: 11235813,
  compOrder: [
    {
      partNum: 42,
      quantity: 3
    }
  ],
  CompReceived: []
});

vendorOrder.save(function (err, doc) {
  if(!err) {console.log(doc);}
  else {console.log(err);}
});

var vendor = new Vendor({
  name: 'Coke, Inc',
  date: Date.now()
});

vendor.save(function (err, doc) {
  if (!err) {console.log(doc);}
  else {console.log(err);}
});