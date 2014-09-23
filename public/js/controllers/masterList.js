'use strict';
angular.module('app')
  .controller('MasterList', MasterList)
  .controller('editPartModalController', editPartModalController);

MasterList.$injector = [
  '$log',
  '$scope',
  '$modal',
  'Part'
];

function MasterList($log, $scope, $modal, Part) {

  $scope.editPart = function(part, $index) {
    $log.debug('edit Part', part);
    $modal.open({
      templateUrl: 'editPartModal.html',
      controller: 'editPartModalController',
      resolve: {
        part: function() {
          return part;
        }
      }
    })
      .result
      .then(function(part) {
        $log.debug('PartUpdate', part);
        if (part === 'delete') {
          $scope.parts.splice($index, 1);
        } else if (part && $index) {
          $scope.parts[$index] = part;
        } else if (part) {
          $scope.parts.push(part);
        } else if (part === 'delete') {
          $scope.parts.slice($index, 1);
          $scope.$apply();
        }
      });
  };

  $scope.addNew = function() {
    $scope.editPart('new');
  };

  Part.query().$promise
    .then(function(parts) {
      $log.debug('Parts', parts);
      $scope.parts = parts;
    })
    .catch(function(err) {
      if (err.data) {
        $scope.genErr = err.data.error.message;
      } else {
        $scope.genErr = err;
      }
    });
}

editPartModalController.$injector = [
  '$q',
  '$log',
  '$scope',
  '$modalInstance',
  'part',
  'Part'
];

function editPartModalController(
  $q,
  $log,
  $scope,
  $modalInstance,
  part,
  Part
) {

  function setForMachine() {
    if ($scope.part.forMachine) {
      $scope.forMachine = 'Machine';
    } else {
      $scope.forMachine = 'Cartridge';
    }
  }

  $scope.partType = function() {
    $scope.part.forMachine = !$scope.part.forMachine;
    setForMachine();
  };

  var isNew = false;
  if (part === 'new') {
    $scope.part = { forMachine: false };
    $scope.partType();
    isNew = true;
  } else {
    $scope.part = part;
    setForMachine();
  }

  $scope.save = function() {
    $q.when(true)
      .then(function() {
        if (isNew) {
          return Part.create({}, $scope.part).$promise;
        } else {
          return $scope.part.$save();
        }
      })
      .then(function(part) {
        isNew = false;
        $modalInstance.close(part);
      })
      .catch(function(err) {
        $log.debug(err);
      });
  };

  $scope.deleteThis = function() {
    if (isNew) {
      $modalInstance.close(false);
    } else {
      Part.destroyById({id: $scope.part.id})
        .$promise
        .then(function() {
          $modalInstance.close('delete');
        })
        .catch($log.debug);
    }
  };

  $scope.cancel = function() {
    $modalInstance.dismiss();
  };
}
