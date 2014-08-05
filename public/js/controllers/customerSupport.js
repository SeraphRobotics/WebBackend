/* globals angular, _  */
'use strict';
angular.module('customerSupport', [
  'lbServices'
])
  .controller('customerSupport', function ($scope, $log, Customer, Machine, Shipment, Swap) {

    $scope.findCust = function () {
      var id = {id: $scope.custId};
      Customer.findById({id: $scope.custId}).$promise
        .then(function (cust) {
          $log.debug(cust);
          $scope.customer = cust;
          $scope.swapCustError = false;
          return Customer.hasMachines(id).$promise;
        })
        .then(function (machines) {
          $log.debug(machines);
          if (machines.length === 1) {
            $scope.oldMachId = machines[0].id;
            $scope.ownedMachine = machines[0];
          }
          $scope.machines = machines;
        })
        .catch(function (err) {
          $log.debug(err);
          $scope.swapCustError = true;
        })
      ;
    };

    $scope.clearCustErr = function () {
      $scope.customer = undefined;
      $scope.swapCustError = false;
    };

    $scope.findOwnedMachine = function () {
      var machineReturn = null;
      $log.debug('find machine');
      if ($scope.customer && $scope.machines) {
        $log.debug('Searching');
        machineReturn = _.find($scope.machines, function (machine) {
          return machine.id === $scope.oldMachId;
        }, this) ;
      } else if (!$scope.customer) {
        $log.debug('No customer');
        $scope.findOwnedMachineError = 'Find customer first';
      }
      if (!machineReturn) {
        $log.debug('No Machine match');
        $scope.findOwnedMachineError = 'Customer does not currently own machine';
      } else {
        $scope.ownedMachine = machineReturn;
        machineReturn = undefined;
      }
    };

    $scope.clearOwnedMachineErr = function () {
      $scope.ownedMachine = null;
      $scope.findOwnedMachineError = null;
    };

    $scope.findNewMachine = function () {
      Machine.findById({id: $scope.newMachId})
        .$promise
        .then(function (machine) {
          $log.debug('machine found');
          $scope.newMachine = machine;
        })
        .catch(function (err) {
          $log.debug(err);
          $scope.findNewMachineErr = 'Machine does not exist';
        })
      ;
    };

    $scope.clearNewMachineErr = function () {
      $scope.newMachine = null;
      $scope.findNewMachineErr = null;
    };

    $scope.submitSwap = function() {
      var swapData = {
        custId: $scope.customer.custId,
        oldMachineNum: $scope.ownedMachine.id,
        newMachineNum: $scope.newMachine.id,
      };
      Shipment.create({}, {trackingNum: 'test' + Math.floor((Math.random() * 100))})
        .$promise
        .then(function (shipment) {
          $log.debug(shipment);
          $scope.trackingNum = shipment.trackingNum;
          swapData.shipmentNum = shipment.id;
          return Swap.create({}, swapData).$promise;
        })
        .then(function (swap) {
          $log.debug(swap);
          delete $scope.ownedMachine.ownedBy;
          return $scope.ownedMachine.$save();
        })
        .then(function (ownedMachine) {
          $log.debug('oMachine updated');
          $log.debug(ownedMachine);
          $scope.newMachine.ownedBy = $scope.customer.custId;
          return $scope.newMachine.$save();
        })
        .then(function (newMachine) {
          $log.debug('nMachine updated');
          $log.debug(newMachine);
        })
        .catch($log.debug)
      ;
    };
  })
;
