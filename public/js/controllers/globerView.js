'use strict';
angular.module('globerView', [
  'ngCsv',
  'helpers',
  'lbServices'
])
  .controller('globerView', function
  (
    $q,
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
    $scope.startDate= $filter('date')(new Date(2014, 2, 15), 'yyyy-MM-dd');
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

      $scope.cartridgesOverview = {
        made: 0,
        shipped: 0,
        returned: 0
      };

      $scope.filamentsOverview = {
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
      $scope.cartsAndFilData();
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
              } else if (item.type === 'cartridge') {
                $scope.cartridgesOverview.shipped += 1;
              } else if (item.type === 'filament') {
                $scope.filamentsOverview.shipped += 1;
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

    $scope.cartsAndFilData = function() {
      _.chain($scope.cartridges)
        .filter(function (cartridge) {
          return isThisBeforeThat($scope.startDate, cartridge.manufactureDate);
        })
        .filter(function (cartridge) {
          return isThisBeforeThat(cartridge.manufactureDate, $scope.endDate);
        })
        .forEach(function () {
          $scope.cartridgesOverview.made += 1;
        })
      ;
      _.chain($scope.cartridgeReturns)
        .filter(function (cartridgeReturn) {
          return isThisBeforeThat($scope.startDate, cartridgeReturn.date);
        })
        .filter(function (cartridgeReturn) {
          return isThisBeforeThat(cartridgeReturn.date, $scope.endDate);
        })
        .forEach(function () {
          $scope.cartridges.returned += 1;
        })
      ;
      _.chain($scope.filaments)
        .filter(function (filament) {
          return isThisBeforeThat($scope.startDate, filament.date);
        })
        .filter(function (filament) {
          return isThisBeforeThat(filament.date, $scope.endDate);
        })
        .forEach(function () {
          $scope.filamentsOverview.made += 1;
        })
      ;

      _.chain($scope.filamentChanges)
        .filter(function (filamentChange) {
          return isThisBeforeThat($scope.startDate, filamentChange.date);
        })
        .filter(function (filamentChange) {
          return isThisBeforeThat(filamentChange.date, $scope.endDate);
        })
        .forEach(function () {
          $scope.filamentsOverview.returned += 1;
        })
      ;
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

    $q.all({
      machines: Machine.query().$promise,
      shipment: Shipment.query().$promise,
      swap: Swap.query().$promise
    })
      .then(function (promises) {
        $log.debug('MacPromises', promises);
        $scope.machines = promises.machines;
        $scope.shipments = promises.shipments;
        $scope.swaps = promises.swaps;
        $scope.machineMadeData();
        $scope.shippingData();
      })
      .catch(function (err) {
        $scope.waitForShipmentToCome.reject('Oh Noooooooeeess!');
        $log.debug(err);
        if (err.data) {
          $scope.machinesAndShipmentsErr = err.data.error.message;
        } else {
          $scope.machinesAndShipmentsErr = err;
        }
      })
    ;

    $q.all({
      cartridge:       Cartridge.query().$promise,
      cartridgeCredit: CartridgeCredit.query().$promise,
      cartridgeReturn: CartridgeReturn.query().$promise,
      filaments:       Filament.query().$promise,
      filamentChanges: FilamentChange.query().$promise,
    })
      .then(function (promises) {
        $log.debug('Promises', promises);
        $scope.cartridges = promises.cartridge;
        $scope.cartridgeCredits = promises.cartridgeCredit;
        $scope.cartridgeReturns = promises.cartridgeReturn;
        $scope.filaments = promises.filaments;
        $scope.filamentChanges = promises.filamentChanges;
        $scope.cartsAndFilData();
      })
      .catch(function (err) {
        $log.debug('PromisesErr', err);
        if (err.data) {
          $scope.cartsAndFilsErr = err.data.error.message;
        } else {
          $scope.cartsAndFilsErr = err;
        }
      })
    ;

  })
;
