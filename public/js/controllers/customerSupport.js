/* globals angular, _  */
'use strict';
angular.module('customerSupport', [
  'lbServices',
  'helpers'
])
  .controller('customerSupport', function ($scope, $log, Customer, Machine, Shipment, Swap, machineTypes, Cartridge, CartridgeCredit) {
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
        customerId: $scope.customer.id,
        oldMachineNum: $scope.ownedMachine.id
      };

      // A shipment with fedex needs to be made here
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
          machineTypes.forEach(function (type) {
            if (/(?=.*transit)(?=.*warehouse)/.exec(type.toLowerCase())) {
              $log.debug(type);
              $scope.ownedMachine.machineStatus = type;
            }
          });
          return $scope.ownedMachine.$save();
        })
        .then(function (ownedMachine) {
          $log.debug('oMachine updated');
          $log.debug(ownedMachine);
        })
        .catch($log.debug)
      ;
    };

    $scope.findCartridge = function(id) {
      $log.debug('find cart');
      Cartridge.findById({ id: id})
        .$promise
        .then(function (cartridge) {
          $log.debug('Success');
          $log.debug(cartridge);
          $scope.cartridge = cartridge;
        })
        .catch(function (err) {
          $log.debug(err);
          $scope.cartridgeErr = 'No Cartridge Found';
        })
      ;
    };

    $scope.clearCartridge = function() {
      $scope.cartridge = null;
      $scope.cartridgeErr = null;
    };

    $scope.submitCartridgeCredit = function(id) {
      id = id || null;
      $log.debug(id);
      var data = {
        customerId: $scope.customer.id,
        numOfCartridges: $scope.numOfCartridges,
        cartridgeId: id
      };
      CartridgeCredit.create(data)
        .$promise
        .then(function (credit) {
          $log.debug('credit Success');
          $scope.credit = credit;
        })
        .catch(function (err) {
          $log.debug(err);
          $scope.submitCartridgeCreditErr = 'Err';
        })
      ;
    };

    $scope.clearSubmitCartridgeErr = function() {
      $scope.submitCartirdgeCreditErr = null;
    };
  })
;
