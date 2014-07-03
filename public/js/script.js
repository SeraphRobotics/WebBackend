'use strict';
angular.module('app',[
  'services',
  'lbServices',
  'mm.foundation.modal',
  'mm.foundation.tpls',
  'mm.foundation.accordion',
  'angular-lodash'
]).config(function($logProvider){
  $logProvider.debugEnabled(true);
  })
  .controller('masterList', function ($scope, $log, $modal, Part) {
    Part.query().$promise
      .then(function (partsList) {
        $log.debug(partsList);
        $scope.parts = partsList;
      })
      .catch($log.error)
    ;
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
    };
  })
  .controller('editPartModalController', function ($scope, $log, $modalInstance, part) {
    $scope.part = part;
    $scope.save = function () {
      $scope.part.$updateOrCreate()
        .then(function (success) {
          $log.debug(success);
          $modalInstance.close();
        })
        .catch(function (err) {
          $log.error(err);
        })
      ;
    };
  })
  .controller('compInventory', function ($scope, $log, Part) {
    Part.find().$promise
      .then(function (partsArr) {
        $log.debug(partsArr);
        $scope.parts = partsArr;
      })
      .catch(function (err) {
        $log.debug(err);
      })
    ;
  })
  .controller('compOrdering', function ($scope, $log, $filter, Vendor, VendorOrder, Part) {
    $scope.vendorOrder = {};
    Vendor.query().$promise.then(function (vendors) {
      $log.debug(vendors);
      $scope.vendors = vendors;
    });
    $scope.vendorOrder.dateCreated = $filter('date')(new Date(), 'yyyy-MM-dd');
    $scope.placeOrder = function (selectedVendor) {
      $scope.vendorOrder.vendor = selectedVendor.name;
      VendorOrder.create($scope.vendorOrder).$promise
        .then(function (instantceOf) {
          $log.debug(instantceOf);
          //setTimeout(function () {window.location.href = '/';}, 500);
        })
        .catch($log.error)
      ;
    };
    $scope.addItem = function () {
      $scope.parts.push({});
    };
    $scope.parts = Part.query()//returns array of parts
        .$promise
        .then(function (res) {
          $log.debug('success');
          $log.debug(res);
        })
        .catch(function (err) {
          $log.debug(err);
        })
    ;
  })
  .controller('compReceiving', function ($scope, $modal) {
    $scope.mockData = [
      {
        id: 42,
        orderNum: 1234,
        receivedInFull: false,
        partsOrdered: [
          {
            partNum: 48484,
            name: 'Coke+',
            batchesOrdered: 3,
            batchesReceived: 0
          },
          {
            partNum: 1337,
            name: 'Pepsi1',
            batchesOrdered: 3,
            batchesReceived: 0
          }
        ],
        datePlaced: new Date(2014, 12, 1)
      }
    ];
    $scope.editOrder = function (order) {
      var editOrderModal = $modal.open({
        templateUrl: 'editOrderModal.html',
        controller: 'editOrderModalController',
        resolve: {
          order: function () {
            return order;
          }
        }
      });
    };
  })
  .controller('editOrderModalController', function ($scope, $log, VendorOrder, $modalInstance, order) {
    $scope.order = order;
    $scope.saveChanges = function () {
      $log.debug('save');
    };
  })
  .controller('compCompleted', function ($scope) {
    $scope.InventoryRes = {
      scanners: {
        numInStock: 3,
        machineId: [
          125423,
          384924,
          393335
        ]
      },
      printers: {},
      cartridge: {},
      filament: {}
    };

  })
  .controller('productGeneration', function ($scope, $log, Machine, Filament, Cartridge) {
    $scope.hasSerialNumber = false;
    $scope.newProducts = [];
    function createMachine(id) {
      $log.debug('creating machine');
      var data = {
        machineType: $scope.type
      };
      if ($scope.type === 'Tablet') {
          if (!id) {
            $log.error('tablet and no id');
            return 1;
          } else {
            data.machineNum = id;
          }
      }
      Machine.create({}, data).$promise
        .then(function (machineInstance) {
          $scope.newProducts.push(machineInstance);
          $scope.serialNumber = machineInstance.machineNum;
          $log.debug(machineInstance);
        })
        .catch(function (err) {
          $log.error(err);
        })
      ;
    }
    var createProduct = {
      Printer: function () {
        createMachine();
      },
      Scanner: function () {
        createMachine();
      },
      Tablet: function () {
        createMachine($scope.setSerialNumber);
      },
      Cartridge: function () {
        var data = {
          machineType: $scope.productType
        };
        Cartridge.create({}, data).$promise
          .then(function (cartrideInstance) {
            $log.debug(cartrideInstance);
            $scope.newProducts.push(cartrideInstance);
            $scope.serialNumber = cartrideInstance.cartridgeNum;
          })
          .catch($log.debug)
        ;
      },
      Filament: function () {
        var data = {
          machineType: $scope.productType
        };
        Filament.create({}, data).$promise
          .then(function (filamentInstance) {
            $log.debug(filamentInstance);
            $scope.newProducts.push(filamentInstance);
            $scope.serialNumber = filamentInstance.filamentNum;
          })
          .catch(function (err) {
            $log.error(err);
          })
        ;
      }
    };
    $scope.submit = function (type) {
      if (createProduct[type]) {
        createProduct[type]();
      }
    };
  })
  .controller('updateMachine', function ($scope, $log, Machine) {
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
      if (machineNum) {
        Machine.findById({id: machineNum}).$promise
           .then(function (machineIns) {
             $scope.clearErr();
             $log.debug(machineIns);
             $scope.machine = machineIns;
           })
           .catch(function (err) {
             $log.error(err);
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
        .catch($log.error)
      ;
    };
  })
  .directive('onBlur', function () {
    return {
      restrict: 'A',
      link: function(scope, el, attr) {
        el.bind('blur', function() {
          scope.$apply(attr.uiBlur);
        });
      }
    };
  })
  .controller('orderQueue', function ($scope) {

  })
  .controller('orderFullfill', function ($scope) {

  })
  .controller('custDetails', function ($scope, $log, Customer, Order) {
    $scope.searchCust = function (custId) {
      if (custId && custId.length > 2) {
        $log.debug(custId);
        var id = {id: custId};
        Customer.findById(id).$promise.catch($log.debug)
          .then(function (customer) {
            $log.debug(customer);
            $scope.cust = customer;
          })
        ;
        Customer.subscription(id).$promise.catch($log.debug)
          .then(function (subscription) {
            $log.debug(subscription);
            $scope.subscription = subscription;
          })
        ;
        Customer.order(id).$promise.catch($log.debug)
          .then(function (orders) {
            $log.debug(orders);
            $scope.orders = orders;
          })
        ;
        Customer.filamentChange(id).$promise.catch($log.debug)
          .then(function (filamentChanges) {
            $log.debug(filamentChanges);
            $scope.filamentChange = filamentChanges;
          })
        ;
        Customer.machineSwap(id).$promise.catch($log.debug)
          .then(function (swaps) {
            $log.debug(swaps);
            $scope.swaps = swaps;
          })
        ;
     }
   };
   $scope.searchOrd = function (orderId) {
     $log.debug(orderId);
     if (orderId && orderId.length > 2) {
       $log.debug(orderId);
       Order.customer({orderId: orderId}).$promise.catch($log.error)
         .then(function (customer) {
           $log.debug(customer);
         })
       ;
     }
   };
  })
  .directive('updateCustomer', function ($log, Customer) {
    return {
      restrict: 'A',
      scope: {
        cust: '=cust'
      },
      link: function (scope, el) {
        el.bind('blur', function () {
          $log.debug(scope.cust);
          scope.cust.$updateOrCreate().catch($log.error)
            .then(function () {
              $log.debug('success');
            })
          ;
        });
      }
    };
  })
  .controller('custSupport', function ($scope, $log, Customer) {
    $scope.findMachineError = {};
    $scope.findCust = function () {
      var id = {id: $scope.custId};
      var machines = Customer.machinesOwned(id).$promise;
      Customer.findById({id: $scope.custId}).$promise
        .then(function (cust) {
          $log.debug(cust);
          $scope.customer = cust;
          $scope.swapCustError = false;
          machines.then(function (machines) {
            $log.debug(machines);
            $scope.machines = machines;
          });
        })
        .catch(function (err) {
          $log.debug(err);
          $scope.swapCustError = true;
        })
      ;
    };
    $scope.findMachine = function findMachine() {
      $log.debug('find machine');
      if ($scope.customer && $scope.machines) {
        $scope.machineReturn = _.find($scope.machines, function (machine) {
          return machine.machineNum === $scope.swapId;
        }, this);
      } else {
        $log.debug('No customer or machinelist');
        $scope.findMachineError.message = 'Customer not found yet';
      }
      if (!$scope.machineReturn) {
        $scope.findMachineError.message = 'Customer has no such machine';
      }
    };
    $scope.clearCustError = function () {
      $scope.swapCustError = false;
    };
    $scope.clearSwapSwapErr = function () {
      $scope.findMachineError.message = null;
    };
  })
  .controller('globerView', function ($scope) {
    $scope.dateSelected = false;
  })
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
  .controller('bookKeeping', function ($scope) {

  })
  .controller('portal', function ($scope) {

  })
  .controller('subscriptionSettings', function ($scope) {

  })
;

