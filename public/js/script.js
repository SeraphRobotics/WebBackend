'use strict';
angular
 .module('app.core', [
    'helpers',
    'lbServices',
    'app.paginateData',
    'mm.foundation.modal',
    'mm.foundation.tpls',
    'mm.foundation.accordion',
    'mm.foundation.pagination'
  ])
;

angular.module('app',[
  'app.core',
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
  'updateMachine'
])
  .config(function($logProvider){
    $logProvider.debugEnabled(true);
  })
;

