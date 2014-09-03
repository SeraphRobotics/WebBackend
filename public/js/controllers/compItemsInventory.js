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
  'Filament',
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
  Filament,
  Cartridge,
  alertModal
)
{
  initController();
  $scope.serialPaginations = serialPaginations;

  function serialPaginations (page) {
    var skip,
        limit = 10;
    page = page || 1;
    skip= (page - 1) * limit;

    $q.all({
      'scanner': Machine.query({
        filter: {
          where: {
            machineType: 'scanner',
            machineStatus: 'Operational in warehouse'
          },
          limit: limit,
          skip: skip
        }
      })
        .$promise,
      'printer': Machine.query({
        filter: {
          where: {
            machineType: 'printer',
            machineStatus: 'Operational in warehouse'
          },
          limit: limit,
          skip: skip
        }
      })
        .$promise,
      'tablet': Machine.query({
        filter: {
          where: {
            machineType: 'tablet',
            machineStatus: 'Operational in warehouse'
          },
          limit: limit,
          skip: skip
        }
      })
        .$promise,
      'filament': Filament.query({
        filter: {
          where: { isSold: false, },
          limit: limit,
          skip: skip
        }
      })
        .$promise,
      'cartridge': Cartridge.query({
        filter: {
          where: { isSold: false, },
          limit: limit,
          skip: skip
        }
      })
        .$promise
    })
      .then(function (ids) {
        $log.debug('Ids', ids);
        $scope.forSale.scanners.ids = _.map(ids.scanner, 'id');
        $scope.forSale.printers.ids = _.map(ids.printer, 'id');
        $scope.forSale.tablets.ids = _.map(ids.tablet, 'id');
        $scope.forSale.cartridges.ids = _.map(ids.cartridge, 'id');
        $scope.forSale.filaments.ids = _.map(ids.filament, 'id');
      })
      .catch(function (err) {
        if (err.data) {
          alertModal(err.data.error.message);
        } else {
          alertModal(err);
        }
      })
    ;
  }

  function initController () {
    $scope.serials = {};
    $scope.serials.page = 1;
    $scope.serials.itemsPerPage = 10;
    $scope.numOfPages = 5; //Does not watch variable

    $scope.forSale = {
      printers: {
        ids: [],
        count: 0
      },
      scanners: {
        ids: [],
        count: 0
      },
      tablets: {
        ids: [],
        count: 0
      },
      cartridges: {
        ids: [],
        count: 0
      },
      filaments: {
        ids: [],
        count: 0
      },
    };
    $scope.inTransit = {
      printer: [],
      scanner: [],
      tablet: []
    };
    $scope.brokenAtWarehouse = {
      printer: [],
      scanner: [],
      tablet: []
    };

    Filament.query().$promise
      .then(function (filaments) {
        $scope.filaments = filaments;
        $log.debug('Filaments', filaments);
      })
      .catch(function (err) {
        if (err.data) {
          alertModal(err.data.error.message);
        } else {
          alertModal(err);
        }
      })
    ;

    Cartridge.query().$promise
      .then(function (cartridges) {
        $log.debug('Cartridges', cartridges);
        $scope.cartridges = cartridges;
      })
      .catch(function (err) {
        if (err.data) {
          alertModal(err.data.error.message);
        } else {
          alertModal(err);
        }
      })
    ;

    $q.all({
      'printer': Machine.count({
        where: {
          machineType: 'printer',
          machineStatus: 'Operational in warehouse'
        }
      })
        .$promise,
      'scanner': Machine.count({
        where: {
          machineType: 'scanner',
          machineStatus: 'Operational in warehouse' }
      })
        .$promise,
      'tablet': Machine.count({
        where: {
          machineType: 'tablet',
          machineStatus: 'Operational in warehouse'
        }
      })
        .$promise,
      'filament': Filament.count({
        where: { isSold: false }
      })
        .$promise,
      'cartridge': Cartridge.count({
        where: { isSold: false }
      })
        .$promise
    })
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
        $scope.serials.totalItems = roundedTotalItems < totalItems?
          roundedTotalItems + 10: roundedTotalItems - 10;
        serialPaginations();
      })
      .catch(function (err) {
        if (err.data) {
          alertModal(err.data.error.message);
        } else {
          alertModal(err);
        }
      })
    ;

  }
}
