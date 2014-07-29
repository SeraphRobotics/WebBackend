/* globals angular */
'use strict';
angular.module('machineDetails', [
  'lbServices'
])
  .controller('machineDetails', function ($scope, $log, Machine) {
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
      $log.debug('find machine');
      if (machineNum) {
        Machine.findById({id: machineNum}).$promise
           .then(function (machineIns) {
             $scope.clearErr();
             $log.debug(machineIns);
             $scope.machine = machineIns;
           })
           .catch(function (err) {
             $log.debug(err);
             $scope.machineNumErr = true;
             $scope.machineNumErrMessage = err.statusText;
           })
        ;
      } else {
        $scope.machineNumErr = true;
        $scope.machineNumErrMessage = 'Serial Number Empty';
      }
    };
    $scope.save = function () {
      if ($scope.comment.length > 2 ) {
        var date = new Date();
        var log = date.toLocaleDateString() + ':' +
          date.toLocaleTimeString() + ': ' + $scope.comment.trim();
        $scope.machine.logs.push(log);
      }
      $scope.machine.$updateOrCreate()
        .then(function () {
          $log.info('success');
          $scope.updateSuccess = true;
        })
        .catch($log.debug)
      ;
    };
  })
;
