/* globals angular */
'use strict';

angular.module('updateMachine', [
  'lbServices'
])
  .controller('updateMachine', function ($scope, $log, Machine) {
    $scope.updateSuccess = false;
    $scope.machine = {};
    $scope.master = {};
    $scope.machine.machineStatus = '';
    $scope.clearErr = function () {
      $scope.reset();
      $scope.machineNumErr = false;
      $scope.machineNumErrMessage = '';
      $scope.updateSuccess = false;
      $scope.machine.machineStatus = '';
      $scope.machine = {};
      $scope.comment = '';
    };
    $scope.reset = function () {
      $scope.master = angular.copy($scope.machine);
    };
    $scope.isChanged = function (machine) {
      return !angular.equals(machine, $scope.master);
    };
    $scope.findMachine = function (machineNum) {
      if (machineNum) {
        Machine.findById({id: machineNum}).$promise
           .then(function (machineIns) {
             $scope.clearErr();
             $log.debug(machineIns);
             $scope.machine = machineIns;
           })
           .catch(function (err) {
             $log.error(err);
             $scope.machineNumErr = true;
             $scope.machineNumErrMessage = err.statusText;
           })
        ;
      } else {
        $scope.machineNumErr = true;
        $scope.machineNumErrMessage = 'Serial Number Empty';
      }
    };
    $scope.initId = function (id) {
      if (id) {
        $scope.machineNum = id;
        $scope.findMachine(id);
      }
    };
    $scope.save = function () {
      Machine.customer({ id: $scope.machine.machineNum})
        .$promise
        .then(function (customer) {
          $log.debug('Found Customer');
          $scope.customer = customer;
          $log.debug(customer);
        })
        .catch($log.debug)
        .finally(function () {
          if ($scope.comment.length > 2 ) {
            var log = {};
            log.date = new Date();
            log.comments = $scope.comment.trim();
            log.status = $scope.machine.machineStatus;
            $scope.machine.logs.push(log);
            if ($scope.customer.length > 0) {
              $scope.log.custId = $scope.customer.id;
              $scope.log.custName = $scope.customer.name;
            }
          }
          $log.debug('finally');
          $scope.machine.$updateOrCreate()
            .then(function () {
              $log.info('success');
              $scope.updateSuccess = true;
            })
            .catch($log.error)
          ;
        }.bind(this))
      ;
    };
});
