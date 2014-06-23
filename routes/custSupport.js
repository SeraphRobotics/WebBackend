"use strict";
module.exports = function (app) {
  var custSupport = {};

  custSupport.custDetails = function (req, res) {
    res.render('custDetails');
  };
  custSupport.custSupport = function (req, res) {
    res.render('custDetails');
  };

  app.get('/customerDetails', custSupport.custDetails);
  app.get('/customerSupport', custSupport.custSupport);
};