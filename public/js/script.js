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

