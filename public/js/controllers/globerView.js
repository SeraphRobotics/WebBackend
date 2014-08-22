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
    Swap,
    Cartridge,
    CartridgeCredit,
    CartridgeReturn,
    Filament,
    FilamentChange,
    Shipment
  )
  {
    function isThisBeforeThat (startDate, endDate) {
      return new Date(startDate) < new Date(endDate);
    }

    $scope.currentDate = $filter('date')(new Date(), 'yyyy-MM-dd');
    $scope.startDate= $filter('date')(new Date(2012, 2, 15), 'yyyy-MM-dd');
    $scope.endDate = $scope.currentDate;

    $scope.initOverviewData = function () {
      $scope.printers = {
        made: 0,
        shipped: 0,
        returned: 0
      };

      $scope.scanners = {
        made: 0,
        shipped: 0,
        returned: 0
      };

      $scope.tablets = {
        made: 0,
        shipped: 0,
        returned: 0
      };
    };

    $scope.initOverviewData();

    $scope.updateData = function() {
      $scope.initOverviewData();
      $scope.machineMadeData();
      $scope.shippingData();
      $scope.swapData();
    };

    $scope.machineMadeData = function() {
      _.chain($scope.machines)
        .filter(function (machine) { //Start Date filter
          return new Date(machine.dateManufactured) > new Date($scope.startDate);
        })
        .filter(function (machine) { //End Date Filter
          return new Date(machine.dateManufactured) < new Date($scope.endDate);
        })
        .forEach(function (machine) {
          if (machine.machineType === 'printer') {
            $scope.printers.made += 1;
          } else if (machine.machineType === 'scanner'){
            $scope.scanners.made += 1;
          } else if (machine.machineType === 'tablet') {
            $scope.tablets.made += 1;
          } else {
            $log.debug('Unknown Type', machine);
          }
        })
      ;
    };

    $scope.shippingData = function() {
      _.chain($scope.shipments)
        .filter(function (shipment) { //Start Date filter
          return new Date(shipment.dateCreated) > new Date($scope.startDate);
        })
        .filter(function (shipment) { //End Date Filter
          return new Date(shipment.dateCreated) < new Date($scope.endDate);
        })
        .forEach(function (shipment) {
          _.chain(shipment.items)
            .forEach(function (item) {
              if (item.type === 'printer') {
                $scope.printers.shipped += 1;
              } else if (item.type === 'scanner'){
                $scope.scanners.shipped += 1;
              } else if (item.type === 'tablet') {
                $scope.tablets.shipped += 1;
              } else {
                $log.debug('Unknown Type', item);
              }
            })
          ;
        })
      ;
    };

    $scope.swapData = function() {
      _.chain($scope.swaps)
        .filter(function (swap) { //Start Date filter
          return new Date(swap.date) > new Date($scope.startDate);
        })
        .filter(function (swap) { //End Date Filter
          return new Date(swap.date) < new Date($scope.endDate);
        })
        .forEach(function (swap) {
          _.chain($scope.machines)
            .filter(function (machine) {
              return machine.id === swap.oldMachineNum;
            })
            .forEach(function (machine) {
              if (machine.machineType === 'printer') {
                $scope.printers.returned += 1;
              } else if (machine.machineType === 'scanner'){
                $scope.scanners.returned += 1;
              } else if (machine.machineType === 'tablet') {
                $scope.tablets.returned += 1;
              } else {
                $log.debug('Unknown Type', machine);
              }
            })
          ;
        })
      ;
    };

    $scope.filamentData = function() {
    };

    $scope.cartridgeData = function() {
    };

    $scope.startDateCap = function () {
      if (isThisBeforeThat($scope.startDate, $scope.endDate)) {
        return;
      } else {
        $scope.startDate = $filter('date')(new Date($scope.endDate), 'yyyy-MM-dd');
        return;
      }
    };

    $scope.endDateCap = function () {
      var isBeforeToday = isThisBeforeThat($scope.endDate, $scope.currentDate);
      if (isBeforeToday) {
        if (isThisBeforeThat($scope.startDate, $scope.endDate)) {
          return;
        } else {
          $scope.endDate = $filter('date')(new Date($scope.startDate), 'yyyy-MM-dd');
        }
      } else {
          $scope.endDate = $scope.currentDate;
      }
    };

    Machine.query().$promise
      .then(function (machines) {
        $log.debug('Machines', machines);
        $scope.machines = machines;
        $scope.machineMadeData();
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
        $scope.shippingData();
      })
      .catch(function (err) {
        $log.debug(err);
      })
    ;

    Swap.query().$promise
      .then(function (swaps) {
        $scope.swaps = swaps;
        $log.debug('Swaps', swaps);
        $scope.swapData();
      })
      .catch(function (err) {
        $log.debug(err);
      })
    ;
  })
;
