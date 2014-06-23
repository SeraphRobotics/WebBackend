"use strict";
module.exports = function (app) {
  var bNO = {};

  bNO.bookKeeping = function (req, res) {
    res.render('bookKeeping');
  };
  bNO.globerView = function (req, res) {
    res.render('globerView');
  };
  bNO.masterList = function (req, res) {
    res.render('masterList');
  };

  app.get('/bookKeeping', bNO.bookKeeping);
  app.get('/globalOverview', bNO.globerView);
  app.get('/masterList', bNO.masterList);
};