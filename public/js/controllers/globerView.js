'use strict';
angular.module('globerView', [
  'helpers',
  'lbServices'
])
  .controller('globerView', function
  (
    $log,
    $scope,
    $filter,
    Machine,
    Cartridge,
    CartridgeCredit,
    CartridgeReturn,
    Filament,
    FilamentChange,
    Shipment
  )
  {
    $scope.currentDate = $filter('date')(new Date(), 'yyyy-MM-dd');
    $scope.startDate= $filter('date')(new Date(1987, 2, 15), 'yyyy-MM-dd');
    $scope.endDate = $scope.currentDate;


    $scope.updateData = function(startDate, endDate) {
    };

    Machine.query().$promise
      .then(function (machines) {
        $log.debug('Machines', machines);
        $scope.machines = machines;
      })
      .catch(function (err) {
        $log.debug(err);
      })
    ;

    Cartridge.query().$promise
      .then(function (cartridges) {
        $log.debug('Cartridges', cartridges);
        $scope.cartridges = cartridges;
      })
      .catch(function (err) {
        $log.debug(err);
      })
    ;

    CartridgeCredit.query().$promise
      .then(function (cartridgeCredits) {
        $log.debug('cartridgeCredits', cartridgeCredits);
        $scope.cartridgeCredits = cartridgeCredits;
      })
      .catch(function (err) {
        $log.debug(err);
      })
    ;

    CartridgeReturn.query().$promise
      .then(function (cartridgeReturns) {
        $log.debug('cartridgeReturns', cartridgeReturns);
        $scope.cartridgeReturns = cartridgeReturns;
      })
      .catch(function (err) {
        $log.debug(err);
      })
    ;

    Filament.query().$promise
      .then(function (filaments) {
        $log.debug('filaments', filaments);
        $scope.filaments = filaments;
      })
      .catch(function (err) {
        $log.debug(err);
      })
    ;

    FilamentChange.query().$promise
      .then(function (filamentChanges) {
        $log.debug('filamentChanges', filamentChanges);
        $scope.filaments = filamentChanges;
      })
      .catch(function (err) {
        $log.debug(err);
      })
    ;

    Shipment.query().$promise
      .then(function (shipments) {
        $scope.shipments = shipments;
        $log.debug('Shipments', shipments);
      })
      .catch(function (err) {
        $log.debug(err);
      })
    ;
  })
;
