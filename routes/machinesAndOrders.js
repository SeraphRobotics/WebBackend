'use strict';
module.exports = function(app) {
  var mNO = {};

  mNO.productGeneration = function(req, res) {
    res.render('productGeneration');
  };
  mNO.updateMachine = function(req, res) {
    var data = {id: req.params.id};
    res.render('updateMachine', data);
  };
  mNO.orderQueue = function(req, res) {
    res.render('orderQueue');
  };
  mNO.orderFulfill = function(req, res) {
    res.render('orderFulfill', { id: req.params.id });
  };
  mNO.machineDetails = function(req, res) {
    res.render('machineDetails', { id: req.params.id });
  };

  app.get('/productGeneration', mNO.productGeneration);
  app.get('/updateMachine/:id', mNO.updateMachine);
  app.get('/updateMachine', mNO.updateMachine);
  app.get('/orderQueue', mNO.orderQueue);
  app.get('/orderFulfill/:id', mNO.orderFulfill);
  app.get('/orderFulfill', mNO.orderFulfill);
  app.get('/machineDetails/:id', mNO.machineDetails);
  app.get('/machineDetails', mNO.machineDetails);
};
