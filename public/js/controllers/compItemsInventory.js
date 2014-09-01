'use strict';
angular
  .module('app')
  .controller('compItemsInventory', compItemsInventory)
;

compItemsInventory.$inject = [
  '$q',
  '$log',
  '$scope',
  'Machine',
  'Filament',
  'alertModal'
];

function compItemsInventory ($q, $log, $scope, Machine, Filament, alertModal) {

  initController();

  function initController () {

    Filament.query().$promise
      .then(function (filaments) {
        $scope.filaments = filaments;
        $log.debug('Filaments', filaments);
      })
      .catch(function (err) {
        if (err.data) {
          alertModal(err.data.error.message);
        } else {
          alertModal(err);
        }
      })
    ;

    Machine.query().$promise
      .then(function (machines) {
        $log.debug('Machines', machines);
        $scope.machines = machines;
      })
      .catch(function (err) {
        if (err.data) {
          alertModal(err.data.error.message);
        } else {
          alertModal(err);
        }
      })
    ;
  }
}
