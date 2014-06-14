"use strict";
module.exports = function (app) {
  var route = {};

  route.masterList = function (req, res) {
    res.render('masterList');
  };

  app.get('/masterList', route.masterList);
}