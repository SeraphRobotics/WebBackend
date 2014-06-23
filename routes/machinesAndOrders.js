"use strict";
module.exports = function (app) {
  var mNO = {};

  mNO.productGeneration = function (req, res) {
    res.render('productGeneration');
  };
  mNO.updateMachine = function (req, res) {
    res.render('updateMachine');
  };
  mNO.orderQueue = function (req, res) {
    res.render('orderQueue');
  };
  mNO.orderFulfill = function (req, res) {
    res.render('orderFulfill');
  };
  mNO.machineDetails = function (req, res) {
    res.render('machineDetails');
  };

  app.get('/productGeneration', mNO.productGeneration);
  app.get('/updateMachine', mNO.updateMachine);
  app.get('/orderQueue', mNO.orderQueue);
  app.get('/orderFulfill', mNO.orderFulfill);
  app.get('/machineDetails', mNO.machineDetails);
};