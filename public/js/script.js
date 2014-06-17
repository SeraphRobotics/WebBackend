"use strict";
angular.module('app',[
  'services'
])
  .controller('masterList', function ($scope) {
    console.log('here');
  })
  .controller('compInventory', function ($scope) {

  })
  .controller('compOrdering', function ($scope, Parts) {
    $scope.vendors = [
      'smith&Wessen',
      'coke'
    ];

    $scope.parts = Parts.query()//returns array of parts
        .$promise
        .then(function () {
          console.log('success');
        })
        .catch(function (err) {
          console.log(err);
        })
    ;
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
