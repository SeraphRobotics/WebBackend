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
  .controller('bookKeeping', function () {

  })
;

