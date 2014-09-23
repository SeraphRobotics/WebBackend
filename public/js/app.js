'use strict';
angular.module('app.core', [
  'helpers',
  'lbServices',
  'ngCsv',
  'ngTable',
  'mm.foundation.modal',
  'mm.foundation.tpls',
  'mm.foundation.accordion',
  'mm.foundation.pagination'
]);

angular.module('app', [
  'app.core',
  'app.filters',
  'app.constants',
  'app.paginateData',
])
  .config(function($logProvider) {
    $logProvider.debugEnabled(true);
  });
