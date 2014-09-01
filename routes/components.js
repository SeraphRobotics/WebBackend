'use strict';
module.exports = function (app) {
  var comp = {};
  comp.inventory = function (req, res) {
    res.render('compInventory');
  };
  comp.ordering = function (req, res) {
    res.render('compOrdering');
  };
  comp.receiving = function (req, res) {
    res.render('compReceiving');
  };
  comp.itemsInventory = function (req, res) {
    res.render('compItemsInventory');
  };
  app.use('/compInventory', comp.inventory);
  app.use('/compOrdering' , comp.ordering);
  app.use('/compReceiving', comp.receiving);
  app.use('/compItemsInventory', comp.itemsInventory);
};
