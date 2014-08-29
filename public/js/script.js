'use strict';
angular.module('app',[
  'helpers',
  'lbServices',
  'compOrdering',
  'customerDetails',
  'customerSupport',
  'globerView',
  'machineDetails',
  'masterList',
  'orderFulfill',
  'productGeneration',
  'subscriptionSettings',
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
/*  .directive('onBlur', function () {
    return {
      restrict: 'A',
      link: function(scope, el, attr) {
        el.bind('blur', function() {
          scope.$apply(attr.uiBlur);
        });
      }
    };
  })*/
  .controller('bookKeeping', function () {

  })
;

