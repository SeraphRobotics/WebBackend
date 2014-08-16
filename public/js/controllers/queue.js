/* globals _ */
'use strict';
angular.module('queue', [
  'lbServices'
])
  .controller('queue', function ($log, $scope, Order, Machine) {
    $scope.printers = 0;
    $scope.scanners = 0;
    $scope.tablets = 0;
    $scope.cartridges = 0;
    $scope.filaments = 0;
    $scope.repairs = {};

    Order.query({ isComplete: false })
      .$promise
      .then(function (orders) {
        $log.debug(orders);
        _.chain(orders)
          .forEach(function (order) {
            $scope.printers += order.printers;
            $scope.scanners += order.scanners;
            $scope.tablets += order.tablets;
            $scope.cartridges += order.cartridges;
            $scope.filaments += order.filaments;
          })
        ;
        $scope.orders = orders;
      })
      .catch(function (err) {
        $log.debug(err);
      })
    ;

    Machine.query() // Regex support missing for this version of LB datasource juggler
    .$promise
      .then(function (machines) {
        $scope.machines = _.chain(machines)
          .filter(function (machine) {
            return /Broken in warehouse/.exec(machine.machineStatus);
          })
          .value()
        ;
        $scope.repairs = {
          printers: _.chain($scope.machines)
            .filter(function (machine) {
              return machine.machineType === 'printer';
            })
            .reduce(function(sum) {
              sum += 1;
              return sum;
            }, 0)
            .value(),
          scanners: _.chain($scope.machines)
            .filter(function (machine) {
              return machine.machineType === 'scanner';
            })
            .reduce(function (sum) {
              sum++;
              return sum; }, 0)
            .value(),
          tablets: _.chain($scope.machines)
            .filter(function (machine) {
              return machine.machineType === 'tablet';
            })
            .reduce(function (sum) {
              sum += 1;
              return sum;
            }, 0)
            .value()
        };
        $log.debug('Machines', $scope.machines);
        $log.debug('Repairs', $scope.repairs);
      })
      .catch(function (err) {
        $log.debug(err);
      })
    ;
  })
;
