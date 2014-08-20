/* globals _  */
'use strict';
angular.module('app',[
  'helpers',
  'lbServices',
  'customerDetails',
  'customerSupport',
  'machineDetails',
  'masterList',
  'orderFulfill',
  'productGeneration',
  'queue',
  'updateMachine',
  'mm.foundation.modal',
  'mm.foundation.tpls',
  'mm.foundation.accordion'
])
  .config(function($logProvider){
    $logProvider.debugEnabled(true);
  })
  .controller('compInventory', function ($scope, $log, Part) {
    Part.query().$promise
      .then(function (parts) {
        $log.debug(parts);
        $scope.mParts = _.remove(parts, function (part) {
          return part.forMachine;
        });
        $scope.cParts = parts;
      })
      .catch($log.debug)
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
      $modal.open({ //Returns modal instance
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
  .controller('globerView', function ($scope) {
    $scope.dateSelected = false;
  })
  .controller('bookKeeping', function () {

  })
  .controller('portal', function () {

  })
  .controller('subscriptionSettings', function () {

  })
;

