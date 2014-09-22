'use strict';
angular.module('globerView', [
  'ngCsv',
  'helpers',
  'app.paginateData',
  'lbServices'
])
  .controller('globerView', globerView);

function globerView(
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
  filamentPage,
  FilamentChange,
  Shipment
)
{
  $scope.machinePage = machinePage;

  $scope.currentDate = $filter('date')(new Date(), 'yyyy-MM-dd');
  $scope.startDate = $filter('date')(new Date(2014, 2, 15), 'yyyy-MM-dd');
  $scope.endDate = $scope.currentDate;

  function initOverviewData() {
    $scope.printers = { made: 0, shipped: 0, returned: 0 };
    $scope.scanners = { made: 0, shipped: 0, returned: 0 };
    $scope.tablets = { made: 0, shipped: 0, returned: 0 };
    $scope.cartridgesOverview = { made: 0, shipped: 0, returned: 0 };
    $scope.filamentsOverview = { made: 0, shipped: 0, returned: 0 };
  }

  initOverviewData();

  $scope.updateData = function updateData() {
    initOverviewData();
    pageData();
    machinePage();
  };

  $scope.machineMadeData = function machineMadeData() {
    _.forEach($scope.machines, function(machine) {
      if (machine.machineType === 'printer') {
        $scope.printers.made += 1;
      } else if (machine.machineType === 'scanner') {
        $scope.scanners.made += 1;
      } else if (machine.machineType === 'tablet') {
        $scope.tablets.made += 1;
      } else {
        $log.debug('Unknown Type', machine);
      }
    });
  };

  $scope.shippingData = function shippingData() {
    _.forEach($scope.shipments, function(shipment) {

      _.forEach(shipment.items, function(item) {
        if (item.type === 'printer') {
          $scope.printers.shipped += 1;
        } else if (item.type === 'scanner') {
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
      });

    });
  };

  $scope.swapData = function swapData() {
    _.forEach($scope.swaps, function(swap) {
      var type = swap.oldMachine.machineType;
      if (type === 'printer') {
        $scope.printers.returned += 1;
      } else if (type === 'scanner') {
        $scope.scanners.returned += 1;
      } else if (type === 'tablet') {
        $scope.tablets.returned += 1;
      } else {
        $log.debug('Unknown Type', type);
      }
    });
  };

  $scope.cartsAndFilData = function cartsAndFilData() {
    _.forEach($scope.cartridges, function() {
      $scope.cartridgesOverview.made += 1;
    });

    _.forEach($scope.cartridgeReturns, function() {
      $scope.cartridges.returned += 1;
    });

    _.forEach($scope.filamentFil, function() {
      $scope.filamentsOverview.made += 1;
    });

    _.forEach($scope.filamentChanges, function() {
      $scope.filamentsOverview.returned += 1;
    });
  };

  $scope.startDateCap = function startDateCap() {
    if (isThisBeforeThat($scope.startDate, $scope.endDate)) {
      return;
    } else {
      $scope.startDate =
        $filter('date')(new Date($scope.endDate), 'yyyy-MM-dd');
      return;
    }
  };

  $scope.endDateCap = function endDateCap() {
    var isBeforeToday = isThisBeforeThat($scope.endDate, $scope.currentDate);
    if (isBeforeToday) {
      if (isThisBeforeThat($scope.startDate, $scope.endDate)) {
        return;
      } else {
        $scope.endDate =
          $filter('date')(new Date($scope.startDate), 'yyyy-MM-dd');
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

  $scope.getOverviewData = function getOverviewData() {
    var data = _.chain($scope.machines)
      .filter(function(machine) {
        if ($scope.productType && $scope.productType.length > 2) {
          return machine.machineType === $scope.productType;
        } else {
          return true;
        }
      })
      .map(function(machine) {
        return {
          id: machine.id,
          status: machine.machineStatus,
          manufactured: $filter('date')(machine.dateManufactured, 'MM/dd/yyyy'),
          numOfServices: machine.numOfServices || '0',
          currentCustomer: machine.ownedBy || 'None',
          previousCustomer: machine.prevCust || 'None'
        };
      })
      .value();
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

  $scope.getCustomerReport = function getCustomerReport() {
    return _.chain($scope.customers)
      .map(function(customer) {
        return {
          id: customer.id,
          date: customer.dateAquired,
          subscription: customer.currentSubscriptionId || 'None',
          cartridgeUsage: customer.cartridge.length || '0',
          estimatedInventory: 'TODO: Est, Inv', //TODO: How to find this

          numberOfReturns: (function() {
            var numOfReturns = 0;
            numOfReturns += customer.machinesReturned ?
              customer.machinesReturned.length : 0;
            numOfReturns += customer.cartridgesReturned ?
              customer.cartridgesReturned.length : 0;
            numOfReturns += customer.filamentChanges ?
              customer.filamentChanges.length : 0;
            return numOfReturns;
          }()),

          totMatUsed: (function() {
            var volUsed = 0;
            _.forEach(customer.filamentChanges, function(filamentChange) {
              volUsed += filamentChange.volUsed;
            });
            return volUsed;
          }()),

          totMatDel: (function() {
            var del = 0;
            _.forEach(customer.filaments, function(filament) {
                del += filament.volume;
            });
            return del;
          }()),

          totMatWasted: (function() {
            var wasted = 0;
            _.forEach(customer.filaments, function(filament) {
              wasted += filament.wasted;
            });
            return wasted;
          }()),

          numOfPrinterSwaps: (function() {
            var printSwaps = 0;
            _.forEach(customer.swaps, function(swap) {
              if (swap.type === 'printer') {
                printSwaps += 1;
                return;
              } else {
                return;
              }
            });
            return printSwaps;
          }()),

          numOfTabletSwaps: (function() {
            var tabletSwaps = 0;
            _.forEach(customer.swaps, function(swap) {
              if (swap.type === 'printer') {
                tabletSwaps += 1;
                return;
              } else {
                return;
              }
            });
            return tabletSwaps;
          }()),

          numOfScannerSwaps: (function() {
            var scannerSwaps = 0;
            _.forEach(customer.swaps, function(swap) {
              if (swap.type === 'scanner') {
                scannerSwaps += 1;
                return;
              } else {
                return;
              }
            });
            return scannerSwaps;
          }()),

          averageScannerUpTime: (function() {
            var scannerOnTime,
                scannerTotalTime,
                upTimeAvg = 0,
                numberOfScanners = customer.scannersOwned.length || 1;

            _.forEach(customer.scannersOwned, function(scanner) {
              scannerOnTime += _.chain(scanner.scanTimes)
                .filter(function(scanTime) { return scanTime.type; })
                .reduce(function(onTime, scanTime) {
                  onTime += scanTime.time;
                  return onTime;
                }, 0);

              scannerTotalTime +=
                _.reduce(scanner.scantTime, function(totalTime, scanTime) {
                  totalTime += scanTime;
                }, 0);

              upTimeAvg += scannerTotalTime && scannerTotalTime > 0 ?
                (scannerOnTime / scannerTotalTime * 100) : 0;
            });
            return upTimeAvg / numberOfScanners;
          }()),

          averageNumOfScansPer: (function() {
            var totalScans = 0;
            var numberOfScanners = customer.scannersOwned.length || 1;
            _.forEach(customer.scannersOwned, function(scanner) {
                totalScans += _.reduce(scanner.scanTimes, function(count) {
                  count += 1;
                  return count;
                }, 0);
            });
            return totalScans / numberOfScanners;
          }()),

          totalScans: (function() {
            var totalScans = 0;
            _.forEach(customer.scannersOwned, function(scanner) {
              totalScans += _.reduce(scanner.scanTimes, function(count) {
                count += 1;
                return count;
              }, 0);
            });
            return totalScans;
          }())

        };
      }).value();
  };


  pageData();
  machineCount();
  machinePage();

  function pageData() {
    var between = {
      between: [new Date($scope.startDate), new Date($scope.endDate)]
    };

    $q.all({
      machines: Machine.query({
        filter: { where: { dateManufactured: between } }
      }).$promise,
      shipments: Shipment.query({
        filter: { where: { dateCreated: between } }
      }).$promise,
      swaps: Swap.query({
        filter: { include: 'oldMachine', where: { date: between } }
      }).$promise
    })
      .then(function(promises) {
        $log.debug('MacPromises', promises);
        $scope.machines = promises.machines;
        $scope.shipments = promises.shipments;
        $scope.swaps = promises.swaps;
        $scope.machineMadeData();
        $scope.swapData();
        $scope.shippingData();
      })
      .catch(function(err) {
        $log.debug(err);
        if (err.data) {
          $scope.machinesAndShipmentsErr = err.data.error.message;
        } else {
          $scope.machinesAndShipmentsErr = err;
        }
      });

    $q.all({
      cartridge: Cartridge.query({
        filter: { where: { manufactureDate: between } }
      }).$promise,
      cartridgeCredit: CartridgeCredit.query({
        filter: { where: { date: between } }
      }).$promise,
      cartridgeReturn: CartridgeReturn.query({
        filter: { where: { date: between } }
      }).$promise,
      filaments: Filament.query({
        filter: { where: { importDate: between } }
      }).$promise,
      filamentChanges: FilamentChange.query({
        filter: { where: { importDate: between } }
      }).$promise
    })
      .then(function(promises) {
        $log.debug('Promises', promises);
        $scope.cartridges = promises.cartridge;
        $scope.cartridgeCredits = promises.cartridgeCredit;
        $scope.cartridgeReturns = promises.cartridgeReturn;
        $scope.filamentFil = promises.filaments;
        $scope.filamentChanges = promises.filamentChanges;
        $scope.cartsAndFilData();
      })
      .catch(function(err) {
        $log.debug('PromisesErr', err);
        if (err.data) {
          $scope.cartsAndFilsErr = err.data.error.message;
        } else {
          $scope.cartsAndFilsErr = err;
        }
      });

    Customer.query({
      filter: {
        include: [
          'cartridge',
          'cartridgesReturned',
          'filament',
          'filamentChange',
          'scannersOwned',
          'machinesReturned',
          'swaps'
        ],
        where: { dateAquired: between }
      }
    }).$promise
      .then(function(customers) {
        $log.debug('Customers', customers);
        $scope.customers = customers;
      })
      .catch(function(err) {
        $log.debug(err);
      });
  }

  function isThisBeforeThat(startDate, endDate) {
    return new Date(startDate) <= new Date(endDate);
  }

  function machinePage(page) {
    page = page || 1;
    var where = {
      dateManufactured: {
        between: [new Date($scope.startDate), new Date($scope.endDate)]
      }
    };

    var limit = 10;
    var skip = (page - 1) * limit;

    Machine.query({
      filter: { limit: limit, skip: skip, where: where }
    }).$promise
      .then(function(machines) {
        $log.debug('MachinesPage', machines);
        $scope.machinesPage = machines;
      })
      .catch(function(err) {
        if (err.data) {
          $scope.cartsAndFilsErr = err.data.error.message;
        } else {
          $scope.cartsAndFilsErr = err;
        }
      });
  }

  function machineCount() {
    var where = {
      manufactureDate:
        { between: [new Date($scope.startDate), new Date($scope.endDate)]
      }
    };

    Machine.count({ filter: where }).$promise
      .then(function(count) {
        $scope.totalItems = count.count;
      })
      .catch(function(err) {
        $log.debug(err);
      });
  }
}
