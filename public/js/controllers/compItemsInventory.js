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

  function initController () {
    $scope.forSale = {
      printers: [],
      scanners: [],
      tablets: [],
      cartridges: [],
      filaments: []
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

    Order.query({
      filter: { include: 'shipments' }
    }).$promise
      .then(function (orders) {
        $scope.orders = orders;
        $log.debug('Orders', orders);
        return Machine.query().$promise;
      })
      .then(function (machines) {
        $log.debug('Machines', machines);
        $scope.machines = machines;
        _.forEach(machines, function (machine) {
          var status = machine.machineStatus;
          var type = machine.machineType;
          if (status === 'Operational in warehouse') {
            $scope.forSale[type + 's'].push(machine);
          } else if (status === 'In transit to warehouse') {
            $scope.inTranit[type + 's'].push(machine);
          } else if (status === 'Broken at Warehouse') {
            $scope.brokenAtWarehouse[type + 's'].push(machine);
          }
        });
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
