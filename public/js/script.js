'use strict';
angular.module('app',[
  'services',
  'lbServices',
  'mm.foundation.modal',
  'mm.foundation.tpls',
  'mm.foundation.accordion'
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
  .controller('compInventory', function ($scope) {
  })
  .controller('compOrdering', function ($scope, $log, Part) {
    $scope.vendors = [
      'smith&Wessen',
      'coke'
    ];
    $scope.addItem = function () {
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
  .controller('custDetails', function ($scope) {

  })
  .controller('custSupport', function ($scope) {

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

