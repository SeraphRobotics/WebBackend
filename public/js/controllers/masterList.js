'use strict';
angular.module('masterList', [
  'lbServices'
])
  .controller('masterList', function ($scope, $log, $modal, Part) {

    function queryParts() {
      Part.query().$promise
        .then(function (partsList) {
          $log.debug(partsList);
          $scope.parts = partsList;
        })
        .catch($log.error)
      ;
    }
    queryParts();

    $scope.editPart = function (part) {
      $log.debug('edit Part');
      $log.debug(part);
      var modalInstance = $modal.open({
        templateUrl: 'editPartModal.html',
        controller: 'editPartModalController',
        resolve: {
          part: function () {
            return part;
          }
        }
      });
      modalInstance
        .result
        .then(function () {
          queryParts();
        })
      ;
    };

    $scope.addNew = function () {
      $scope.editPart('new');
    };
  })
  .controller('editPartModalController', function ($scope, $log, $modalInstance, part, Part) {

    function setForMachine() {
      if ($scope.part.forMachine) {
        $scope.forMachine = 'Machine';
      } else {
        $scope.forMachine = 'Cartridge';
      }
    }

    $scope.partType = function () {
      $scope.part.forMachine = !$scope.part.forMachine;
      setForMachine();
    };

    var isNew = false;
    if (part === 'new') {
      $scope.part = {};
      $scope.partType();
      isNew = true;
    } else {
      $scope.part = part;
      setForMachine();
    }

    $scope.save = function () {
      if (isNew) {
        Part.create({}, $scope.part).$promise.then(function () {
          isNew = false;
          $modalInstance.close();
        }).catch($log.debug);
      } else {
        $scope.part.$save()
          .then(function (success) {
            $log.debug(success);
            $modalInstance.dismiss();
          })
          .catch($log.debug)
        ;
      }
    };

    $scope.deleteThis = function () {
      if (isNew) {
        $modalInstance.dismiss();
      } else {
        Part.destroyById({id: $scope.part.id})
          .$promise
          .then(function () {
            $modalInstance.close();
          })
          .catch($log.debug)
        ;
      }
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };
  })
;
