/* globals angular */
'use strict';

angular.module('updateMachine', [
  'lbServices',
  'helpers'
])
  .controller('updateMachine', UpdateMachine);

UpdateMachine.$injector = [
  '$q',
  '$log',
  '$scope',
  '$timeout',
  'Machine',
  'machineTypes'
];

function UpdateMachine(
  $q,
  $log,
  $scope,
  $timeout,
  Machine,
  machineTypes //machineTypes needs to be changed to machineStats
) {
  $scope.updateSuccess = false;
  $scope.machine = {};
  $scope.master = {};
  $scope.machine.machineStatus = '';
  $scope.machineTypes = machineTypes;

  $scope.clearErr = function() {
    $scope.reset();
    $scope.machineNumErr = false;
    $scope.machineNumErrMessage = '';
    $scope.updateSuccess = false;
    $scope.machine.machineStatus = '';
    $scope.machine = {};
    $scope.comment = '';
  };

  $scope.reset = function() {
    $scope.master = angular.copy($scope.machine);
  };

  $scope.isChanged = function(machine) {
    return !angular.equals(machine, $scope.master);
  };

  $scope.findMachine = function(machineNum) {
    if (machineNum) {
      Machine.findById({id: machineNum})
        .$promise
        .then(function(machine) {
          $scope.clearErr();
          $log.debug(machine);
          $scope.machine = machine;
        })
        .catch(function(err) {
          $log.error(err);
          $scope.machineNumErr = true;
          $scope.machineNumErrMessage = err.statusText;
        });
    } else {
      $scope.machineNumErr = true;
      $scope.machineNumErrMessage = 'Serial Number Empty';
    }
  };

  $scope.initId = function(id) {
    if (id !== 'undefined') {
      $scope.machineNum = id;
      $scope.findMachine(id);
    }
  };

  $scope.save = function() {
    $q
      .when((function() {
        if ($scope.machine.ownedBy) {
          return Machine.currentCustomer({ id: $scope.machine.id }).$promise;
        } else {
          return null;
        }
      }()))
      .then(function(customer) {
        if (customer) {
          $scope.customer = customer;
          $log.debug('Customer', customer);
        }
      })
      .catch($log.debug)
      .finally(function() {
        $log.debug('finally');
        if ($scope.comment.length > 2) {
          var log = {};
          log.date = new Date();
          log.comments = $scope.comment.trim();
          log.status = $scope.machine.machineStatus;
          if (!$scope.machine.logs) {
            $scope.machine.logs = [];
          }
          $scope.machine.logs.push(log);
          if ($scope.customer && $scope.customer.length > 0) {
            $scope.log.custId = $scope.customer.id;
            $scope.log.custName = $scope.customer.name;
          }
        }
        return $scope.machine.$save();
      })
      .then(function() {
        $log.info('success');
        $scope.updateSuccess = true;
        $timeout(function() {
          $scope.updateSuccess = null;
        }, 1000);
      })
      .catch($log.debug);
  };
}
