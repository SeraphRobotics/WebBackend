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
    Customer,
    Cartridge,
    CartridgeCredit,
    CartridgeReturn,
    Filament,
    FilamentChange,
    Shipment
  )
  {
    function isThisBeforeThat (startDate, endDate) {
      return new Date(startDate) <= new Date(endDate);
    }

    function vice(start, end, mid) {
      mid = $filter('date')(mid, 'yyyy-MM-dd');
      return isThisBeforeThat(start, mid) && isThisBeforeThat(mid, end);
    }

    $scope.betweenTwoDates = _.curry(vice);

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
      var withinDateRange = $scope.betweenTwoDates($scope.startDate, $scope.endDate);
      _.chain($scope.shipments)
        .filter(function (shipment) {
          return withinDateRange(shipment.dateCreated);
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
      var withinDateRange = $scope.betweenTwoDates($scope.startDate, $scope.endDate);
      _.chain($scope.swaps)
        .filter(function (swap) {
          return withinDateRange(swap.date);
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
      var withinDateRange = $scope.betweenTwoDates($scope.startDate, $scope.endDate);
      _.chain($scope.cartridges)
        .filter(function (cartridge) {
          return withinDateRange(cartridge.manufactureDate);
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
          return withinDateRange(filament.date);
        })
        .forEach(function () {
          $scope.filamentsOverview.made += 1;
        })
      ;

      _.chain($scope.filamentChanges)
        .filter(function (filamentChange) {
          return withinDateRange(filamentChange.date);
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

    $scope.overViewDataHeaders = [
      'id',
      'status',
      'manufactured',
      'number of services',
      'Current Customer',
      'Previous Customer'
      ];

    $scope.getOverviewData = function () {
      var withinDateRange = $scope.betweenTwoDates($scope.startDate, $scope.endDate);
      var data = _.chain($scope.machines)
        .filter(function (machine) {
          return withinDateRange(machine.dateManufactured);
        })
        .filter(function (machine) {
          if ($scope.productType && $scope.productType.length > 2) {
            return machine.machineType === $scope.productType;
          } else {
            return true;
          }
        })
        .map(function (machine) {
          return {
            id: machine.id,
            status: machine.machineStatus,
            manufactured: $filter('date')(machine.dateManufactured, 'MM/dd/yyyy'),
            numOfServices: machine.numOfServices || '0',
            currentCustomer: machine.ownedBy || 'None',
            previousCustomer: machine.prevCust || 'None'
          };
        })
        .value()
      ;
      return data;
    };

    $scope.customerReportHeaders = [
      'id',
      'Date Acquired',
      'Cartridge Usage',
      'Estimated Inventory',
      'Number of Returns',
      'Total Material Used',
      'Total Material Delivered',
      'Total Material Wasted',
      'Numper of Printer Swaps',
      'Number of Tablet Swaps',
      'Number of Scanner Swaps',
      'Average Scanner Uptime',
      'Average Number of Scans Per Uptime',
      'total scans'
    ];

    $scope.getCustomerReport = function () {
      var withinDateRange = $scope.betweenTwoDates($scope.startDate, $scope.endDate);
      return _.chain($scope.customers)
        .filter(function (customer) {
          return withinDateRange(customer.dateAquired);
        })
        .map(function (customer) {
          return {
            id: customer.id,
            date: customer.dateAquired,
            subscription: customer.currentSubscriptionId || 'None',
            cartridgeUsage: customer.cartridge.length || '0',
            estimatedInventory: 'Est, Inv',
            numberOfReturns: (function () {
              var numOfReturns = 0;
              //var machinesReturned = _.chain(
              numOfReturns += customer.machinesReturned? customer.machinesReturned.length: 0;
              numOfReturns += customer.cartridgesReturned? customer.cartridgesReturned.length: 0;
              numOfReturns += customer.filamentChanges? customer.filamentChanges.length: 0;
              return numOfReturns;
            }()),
            totMatUsed: (function () {
              var volUsed = 0;
              _.chain(customer.filamentChanges)
                .forEach(function (filamentChange) {
                  volUsed += filamentChange.volUsed;
                })
              ;
              return volUsed;
            }()),
            totMatDel: (function () {
              var del = 0;
              _.chain(customer.filaments)
                .forEach(function (filament) {
                  del += filament.volume;
                })
              ;
              return del;
            }()),
            totMatWasted: 'totMatWasted',
            numOfPrinterSwaps: (function () {
              var printSwaps = 0;
              _.chain(customer.swaps)
                .forEach(function (swap) {
                  if (swap.type === 'printer') {
                    printSwaps += 1;
                    return;
                  } else {
                    return;
                  }
                })
              ;
              return printSwaps;
            }()),
            numOfTabletSwaps: (function () {
              var tabletSwaps = 0;
              _.chain(customer.swaps)
                .forEach(function (swap) {
                  if (swap.type === 'printer') {
                    tabletSwaps += 1;
                    return;
                  } else {
                    return;
                  }
                })
              ;
              return tabletSwaps;
            }()),
            numOfScannerSwaps: (function () {
              var scannerSwaps = 0;
              _.chain(customer.swaps)
                .forEach(function (swap) {
                  if (swap.type === 'scanner') {
                    scannerSwaps += 1;
                    return ;
                  } else {
                    return;
                  }
                })
              ;
              return scannerSwaps;
            }()),
            averageScannerUpTime: 'scannerUpTime',
            averageNumOfScansPer: 'scansPerUptime',
            totalScans: 'totScans'
          };
        }).value();
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

    Customer.query({
      filter: {
        include: [
          'cartridge',
          'cartridgesReturned',
          'filament',
          'filamentChange',
          'machinesReturned',
          'swaps'
        ]
      }
    }).$promise
      .then(function (customers) {
        $log.debug(customers);
        $scope.customers = customers;
      })
      .catch(function (err) {
        $log.debug(err);
      })
    ;

  })
;
