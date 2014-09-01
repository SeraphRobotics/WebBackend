'use strict';
angular
  .module('app')
  .controller('compInventory', compInventory)
;

compInventory.$inject = [
  '$log',
  '$scope',
  'Part'
];

function compInventory ($log, $scope, Part) {
  initController();

  function initController () {
    Part.query().$promise
      .then(function (parts) {
        $log.debug('Parts', parts);
        $scope.mParts = _.remove(parts, function (part) {
          return part.forMachine;
        });
        $scope.cParts = parts;
      })
      .catch(function (err) {
        if (err.data) {
          $scope.genErr = err.data.error.message;
        } else {
          $scope.genErr = err;
        }
      })
    ;
  }
}

