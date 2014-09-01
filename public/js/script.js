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
  .controller('bookKeeping', function () {

  })
;

