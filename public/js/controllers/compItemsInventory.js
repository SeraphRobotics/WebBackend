'use strict';
angular
  .module('app')
  .controller('compItemsInventory', compItemsInventory)
;

compItemsInventory.$inject = [
  '$q',
  '$log',
  '$scope',
  'Order',
  'Machine',
  'machinePage',
  'inventoryCount',
  'inventoryPageInterface',
  'Filament',
  'filamentPage',
  'Cartridge',
  'alertModal'
];

function compItemsInventory
(
  $q,
  $log,
  $scope,
  Order,
  Machine,
  machinePage,
  inventoryCount,
  inventoryPageInterface,
  Filament,
  filamentPage,
  Cartridge,
  alertModal
)
{
  initController();
  $scope.forSalePagination = forSalePagination;
  $scope.inTransitPagination = inTransitPagination;
  $scope.brokenInWarehousePagination = brokenInWarehousePagination;
  $scope.filamentPagination = filamentPagination;

  function initController () {

    $scope.forSale = {
      totalItems: 0,
      itemsPerPage: 10,
      printers:   { ids: [], count: 0 },
      scanners:   { ids: [], count: 0 },
      tablets:    { ids: [], count: 0 },
      cartridges: { ids: [], count: 0 },
      filaments:  { ids: [], count: 0 },
    };

    $scope.inTransit = {
      totalItems: 0,
      itemsPerPage: 10,
      printers:   { ids: [], count: 0 },
      scanners:   { ids: [], count: 0 },
      tablets:    { ids: [], count: 0 },
    };

    $scope.brokenInWarehouse = {
      totalItems: 0,
      itemsPerPage: 10,
      printers:   { ids: [], count: 0 },
      scanners:   { ids: [], count: 0 },
      tablets:    { ids: [], count: 0 },
    };

    $scope.filament = {
      totalItems: 0,
      itemsPerPage: 10
    };

    Filament.count().$promise
      .then(function (count) {
        $log.debug('FilCount', count);
        $scope.filament.totalItems = count.count;
        filamentPagination();
      })
      .catch(alertErr)
    ;

    inventoryCount('Operational in warehouse', { isSold: false })
      .then(function (counts) {
        $log.debug('Counts', counts);

        $scope.forSale.scanners.count = counts.scanner.count;
        $scope.forSale.printers.count = counts.printer.count;
        $scope.forSale.tablets.count = counts.tablet.count;
        $scope.forSale.filaments.count = counts.filament.count;
        $scope.forSale.cartridges.count = counts.cartridge.count;

        var totalItems = Math.max(
          counts.printer.count,
          counts.scanner.count,
          counts.tablet.count,
          counts.filament.count,
          counts.cartridge.count
        );

        var roundedTotalItems = Math.round(totalItems / 10) * 10;

        $scope.forSale.totalItems = roundedTotalItems < totalItems?
          roundedTotalItems + 10: roundedTotalItems - 10;

        forSalePagination();
      })
      .catch(alertErr)
    ;

    inventoryCount('In transit to warehouse')
      .then(function inTransitThen (counts) {
        $log.debug('inTransitCounts', counts);
        $scope.inTransit.scanners.count = counts.scanner.count;
        $scope.inTransit.printers.count = counts.printer.count;
        $scope.inTransit.tablets.count = counts.tablet.count;

        var totalItems = Math.max(
          counts.printer.count,
          counts.scanner.count,
          counts.tablet.count
        );

        var roundedTotalItems = Math.round(totalItems / 10) * 10;

        $scope.inTransit.totalItems = roundedTotalItems < totalItems?
          roundedTotalItems + 10: roundedTotalItems - 10;

        inTransitPagination();
      })
      .catch(alertErr)
    ;

    inventoryCount('Broken in warehouse')
      .then(function brokenInWarehouseThen (counts) {
        $log.debug('brokenCounts', counts);
        $scope.brokenInWarehouse.scanners.count = counts.scanner.count;
        $scope.brokenInWarehouse.printers.count = counts.printer.count;
        $scope.brokenInWarehouse.tablets.count = counts.tablet.count;

        var totalItems = Math.max(
          counts.printer.count,
          counts.scanner.count,
          counts.tablet.count
        );

        var roundedTotalItems = Math.round(totalItems / 10) * 10;

        $scope.brokenInWarehouse.totalItems = roundedTotalItems < totalItems?
          roundedTotalItems + 10: roundedTotalItems - 10;

        brokenInWarehousePagination();
      })
      .catch(alertErr)
    ;
  }

  function forSalePagination (page) {
    page = page || 1;
    var limit = 10;
    var skip = (page - 1) * limit;
    var status = 'Operational in warehouse';

    inventoryPageInterface(limit, skip, status, { isSold: false })
      .then(function (ids) {
        $log.debug('Ids', ids);
        $scope.forSale.scanners.ids = _.map(ids.scanner, 'id');
        $scope.forSale.printers.ids = _.map(ids.printer, 'id');
        $scope.forSale.tablets.ids = _.map(ids.tablet, 'id');
        $scope.forSale.filaments.ids = _.map(ids.filament, 'id');
        $scope.forSale.cartridges.ids = _.map(ids.cartridge, 'id');
      })
      .catch(alertErr)
    ;
  }

  function inTransitPagination (page) {
    page = page || 1;
    var limit = 10;
    var skip= (page - 1) * limit;
    var status = 'In transit to warehouse';

    machinePage(limit, skip, status)
      .then(function (ids) {
        $log.debug('Ids', ids);
        $log.debug('scanner id', _.map(ids.scanner, 'id'));
        $scope.inTransit.scanners.ids = _.map(ids.scanner, 'id');
        $scope.inTransit.printers.ids = _.map(ids.printer, 'id');
        $scope.inTransit.tablets.ids = _.map(ids.tablet, 'id');
      })
      .catch(alertErr)
    ;
  }

  function brokenInWarehousePagination (page) {
    page = page || 1;
    var limit = 10;
    var skip= (page - 1) * limit;
    var status = 'Broken in warehouse';

    machinePage(limit, skip, status)
      .then(function (ids) {
        $log.debug('Ids', ids);
        $scope.brokenInWarehouse.scanners.ids = _.map(ids.scanner, 'id');
        $scope.brokenInWarehouse.printers.ids = _.map(ids.printer, 'id');
        $scope.brokenInWarehouse.tablets.ids = _.map(ids.tablet, 'id');
      })
      .catch(alertErr)
    ;
  }

  function filamentPagination (page) {
    page = page || 1;
    var limit = 10;
    var skip= (page - 1) * limit;

    filamentPage(limit, skip)
      .then(function (filaments) {
        $scope.filaments = filaments;
      })
      .catch(alertErr)
    ;
  }

  function alertErr (err) {
    if (err.data) {
      alertModal(err.data.error.message);
    } else {
      alertModal(err);
    }
  }
}
