"use strict";
module.exports = function (app) {
  var comp = {};
  comp.inventory = function (req, res) {
    res.render('compInventory');
  };
  comp.ordering = function (req, res) {

  };
  comp.receiving = function (req, res) {

  };
  comp.completed = function (req, res) {

  };
  app.use('/compInventory', comp.inventory);
};
