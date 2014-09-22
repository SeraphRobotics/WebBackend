'use strict';
angular.module('queue', [
  'lbServices'
])
  .controller('queue', Queue);

Queue.$injector = [
  '$log',
  '$scope',
  'Order',
  'Machine'
];

function Queue($log, $scope, Order, Machine) {
  $scope.printers = 0;
  $scope.scanners = 0;
  $scope.tablets = 0;
  $scope.cartridges = 0;
  $scope.filaments = 0;
  $scope.repairs = {};

  Order.query({ isComplete: false })
    .$promise
    .then(function(orders) {
      $log.debug(orders);
      _.chain(orders)
        .forEach(function(order) {
          _.chain(order.items)
            .forEach(function(item) {
              var type = item.type + 's';
              $scope[type] += 1;
              if (order[type]) {
                order[type] += 1;
              } else {
                order[type] = 1;
              }
            });
        });
      $scope.orders = orders;
    })
    .catch(function(err) {
      $log.debug(err);
    });

  //Regex support missing for this version of LB datasource juggler
  Machine.query()
    .$promise
    .then(function(machines) {
      $scope.machines = _.chain(machines)
        .filter(function(machine) {
          return /Broken in warehouse/.exec(machine.machineStatus);
        })
        .value();
      $scope.repairs = {
        printers: _.chain($scope.machines)
          .filter(function(machine) {
            return machine.machineType === 'printer';
          })
          .reduce(function(sum) {
            sum += 1;
            return sum;
          }, 0)
          .value(),
        scanners: _.chain($scope.machines)
          .filter(function(machine) {
            return machine.machineType === 'scanner';
          })
          .reduce(function(sum) {
            sum++;
            return sum; }, 0)
          .value(),
        tablets: _.chain($scope.machines)
          .filter(function(machine) {
            return machine.machineType === 'tablet';
          })
          .reduce(function(sum) {
            sum += 1;
            return sum;
          }, 0)
          .value()
      };
      $log.debug('Machines', $scope.machines);
      $log.debug('Repairs', $scope.repairs);
    })
    .catch(function(err) {
      $log.debug(err);
    });
}
