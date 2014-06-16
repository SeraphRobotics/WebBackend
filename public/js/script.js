"use strict";
angular.module('app',[
  'mm.foundation'
])
  .controller('masterList', function ($scope) {
    console.log('here');
  })
  .controller('inventoryView', function ($scope) {

  })
  .controller('compOrdering', function ($scope) {
    $scope.vendors = [
      'smith&Wessen',
      'coke'
    ];
  })
  .controller('compReceiving', function ($scope) {
  })
/*
  .controller('compCompInventory', function ($scope) {

  })
  .controller('itemFin', function ($scope) {

  })
  .controller('updateMachineStat', function ($scope) {

  })
  .controller('repairManufactureQue', function ($scope) {

  })
  .controller('orderStatAndUpdate', function ($scope) {

  })
  .controller('custDetails', function ($scope) {

  })
  .controller('customerSupport', function ($scope) {

  })
  .controller('globOverview', function ($scope) {

  })
  .controller('machineDetails', function ($scope) {

  })
  .controller('bookKeeping', function ($scope) {

  })
  .controller('portal', function ($scope) {

  })
  .controller('subSetting', function ($scope) {

  })*/
;
